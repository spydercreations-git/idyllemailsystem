'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

const SYSTEM_PASSWORD = '2280';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === SYSTEM_PASSWORD) {
      // Set cookie
      document.cookie = 'systemAuth=true; path=/; max-age=86400'; // 24 hours
      sessionStorage.setItem('systemAuth', 'true');
      router.push('/');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <img 
          src="https://res.cloudinary.com/dxd79mrse/image/upload/v1772161578/Idyll_Productions_Black_ty3r3d.png" 
          alt="Idyll Productions"
          className={styles.logo}
        />
        
        <h1 className={styles.title}>Welcome to</h1>
        <h2 className={styles.subtitle}>Idyll Productions Email System</h2>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="password"
            maxLength={4}
            pattern="[0-9]{4}"
            value={password}
            onChange={(e) => setPassword(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter Password"
            className={styles.passwordInput}
            autoFocus
            required
          />
          
          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}
          
          <button type="submit" className={styles.submitButton}>
            Access System
          </button>
        </form>
        
        <p className={styles.footer}>
          Secure access required
        </p>
      </div>
    </div>
  );
}

