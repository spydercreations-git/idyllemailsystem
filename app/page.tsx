'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  const [formData, setFormData] = useState({
    recipient: '',
    subject: '',
    message: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const data = new FormData();
      data.append('recipient', formData.recipient);
      data.append('subject', formData.subject);
      data.append('message', formData.message);
      
      if (file) {
        data.append('attachment', file);
      }

      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: '✓ Email sent successfully!' });
        setFormData({ recipient: '', subject: '', message: '' });
        setFile(null);
      } else {
        setStatus({ type: 'error', message: result.error || 'Failed to send email' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainCard}>
        
        {/* Left Section - Form */}
        <div className={styles.leftSection}>
          <div className={styles.header}>
            <img 
              src="https://res.cloudinary.com/dxd79mrse/image/upload/v1772161578/Idyll_Productions_Black_ty3r3d.png" 
              alt="Idyll Productions"
              className={styles.logoImg}
            />
            <h1 className={styles.title}>Idyll Workspace</h1>
            <p className={styles.subtitle}>Email Dispatcher</p>
            <Link href="/history" className={styles.historyLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
              View History
            </Link>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Recipient Email</label>
              <input
                type="email"
                className={styles.input}
                placeholder="client@example.com"
                value={formData.recipient}
                onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Subject</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Project Update: Post-Production Phase II"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Message</label>
              <textarea
                className={styles.textarea}
                placeholder="Write your message here..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Attachment (Optional)</label>
              <div className={styles.fileUploadWrapper}>
                <label className={styles.fileLabel}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  {file ? 'Change File' : 'Attach File'}
                  <input
                    type="file"
                    className={styles.fileInput}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                </label>
                {file && (
                  <div className={styles.fileName}>
                    <span>📎 {file.name}</span>
                    <button
                      type="button"
                      className={styles.removeFile}
                      onClick={() => setFile(null)}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

            {status && (
              <div className={`${styles.status} ${styles[status.type]}`}>
                {status.message}
              </div>
            )}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Email'}
            </button>
          </form>
        </div>

        {/* Right Section - Preview */}
        <div className={styles.rightSection}>
          <div className={styles.previewSection}>
            <div className={styles.previewHeader}>
              <h2 className={styles.previewTitle}>Live Preview</h2>
              <p className={styles.previewSubtitle}>See how your email will look</p>
            </div>

            <div className={styles.previewContent}>
              <div className={styles.emailPreview}>
                <div className={styles.emailHeader}>
                  <img 
                    src="https://res.cloudinary.com/dxd79mrse/image/upload/v1772161578/Idyll_Productions_Black_ty3r3d.png" 
                    alt="Idyll Productions"
                    className={styles.emailLogoImg}
                  />
                  <div className={styles.emailDate}>
                    {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>

                <h2 className={styles.emailTitle}>
                  {formData.subject || 'Project Update: Post-Production Phase II'}
                </h2>

                <div className={styles.emailContent}>
                  {formData.message || 'Dear Marcus,\n\nWe have successfully completed the initial edit for the upcoming campaign. The color grading is now underway. Please find the production summary attached for your review.\n\nBest regards,\nThe Idyll Team'}
                </div>

                <a 
                  href="https://idyllproductions.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.contactButton}
                >
                  Contact Us
                </a>

                <div className={styles.emailFooter}>
                  <div className={styles.footerMain}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: '8px' }}>
                      <path d="M12 2L3 7V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V7L12 2Z" fill="#1DA1F2" stroke="#1DA1F2" strokeWidth="1.5"/>
                      <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    This email was generated by the Idyll Productions Workspace
                  </div>
                  <div className={styles.footerCopyright}>
                    © 2026 Idyll Productions Email System. All rights reserved.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
