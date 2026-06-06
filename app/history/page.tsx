'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './history.module.css';

interface Email {
  id: string;
  recipient: string;
  subject: string;
  message: string;
  has_attachment: boolean;
  attachment_name: string | null;
  sent_at: string;
  resend_id: string;
}

const HISTORY_PASSWORD = '2280'; // Same password as system

export default function HistoryPage() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    // Check if already authenticated in session
    const auth = sessionStorage.getItem('historyAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchEmails();
    } else {
      setLoading(false);
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === HISTORY_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('historyAuth', 'true');
      setPasswordError('');
      fetchEmails();
    } else {
      setPasswordError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const fetchEmails = async () => {
    try {
      const response = await fetch('/api/emails');
      if (response.ok) {
        const data = await response.json();
        setEmails(data.emails || []);
      }
    } catch (error) {
      // Silently fail
    } finally {
      setLoading(false);
    }
  };

  const deleteEmail = async (id: string) => {
    if (!confirm('Are you sure you want to delete this email record?')) {
      return;
    }

    setDeleteLoading(id);
    try {
      const response = await fetch(`/api/emails/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEmails(emails.filter(email => email.id !== id));
      } else {
        alert('Failed to delete email record');
      }
    } catch (error) {
      console.error('Error deleting email:', error);
      alert('Error deleting email record');
    } finally {
      setDeleteLoading(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Password protection screen
  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.passwordScreen}>
          <div className={styles.passwordCard}>
            <div className={styles.lockIcon}>🔒</div>
            <h1 className={styles.passwordTitle}>Protected Area</h1>
            <p className={styles.passwordSubtitle}>Enter 4-digit password to access email history</p>
            
            <form onSubmit={handlePasswordSubmit} className={styles.passwordForm}>
              <input
                type="password"
                maxLength={4}
                pattern="[0-9]{4}"
                value={password}
                onChange={(e) => setPassword(e.target.value.replace(/\D/g, ''))}
                placeholder="••••"
                className={styles.passwordInput}
                autoFocus
                required
              />
              
              {passwordError && (
                <div className={styles.passwordError}>
                  {passwordError}
                </div>
              )}
              
              <button type="submit" className={styles.passwordButton}>
                Unlock
              </button>
            </form>
            
            <Link href="/" className={styles.passwordBackLink}>
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading email history...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Email History</h1>
          <p className={styles.subtitle}>View and manage sent emails</p>
        </div>
        <Link href="/" className={styles.backButton}>
          ← Back to Sender
        </Link>
      </div>

      {emails.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📭</div>
          <h2>No emails sent yet</h2>
          <p>Your email history will appear here once you send your first email.</p>
          <Link href="/" className={styles.sendButton}>
            Send Your First Email
          </Link>
        </div>
      ) : (
        <div className={styles.emailList}>
          {emails.map((email) => (
            <div key={email.id} className={styles.emailCard}>
              <div className={styles.emailHeader}>
                <div className={styles.emailMeta}>
                  <span className={styles.recipient}>To: {email.recipient}</span>
                  <span className={styles.date}>{formatDate(email.sent_at)}</span>
                </div>
                <button
                  onClick={() => deleteEmail(email.id)}
                  className={styles.deleteButton}
                  disabled={deleteLoading === email.id}
                >
                  {deleteLoading === email.id ? 'Deleting...' : '🗑️ Delete'}
                </button>
              </div>

              <h3 className={styles.subject}>{email.subject}</h3>
              
              <p className={styles.message}>
                {email.message.substring(0, 150)}
                {email.message.length > 150 ? '...' : ''}
              </p>

              <div className={styles.emailFooter}>
                {email.has_attachment && (
                  <span className={styles.attachment}>
                    📎 {email.attachment_name}
                  </span>
                )}
                {email.resend_id && (
                  <span className={styles.resendId}>
                    ID: {email.resend_id.substring(0, 12)}...
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
