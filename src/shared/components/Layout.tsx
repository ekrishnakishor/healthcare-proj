import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useAuth } from '../../features/auth/useAuth';
import styles from './Layout.module.css';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  // Extract first letter of email for a clean avatar
  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : 'U';

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>CareOS</div>
        
        <nav className={styles.nav}>
          <Link 
            to="/dashboard" 
            className={`${styles.navLink} ${isActive('/dashboard') ? styles.navLinkActive : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/patients" 
            className={`${styles.navLink} ${isActive('/patients') ? styles.navLinkActive : ''}`}
          >
            People
          </Link>
          <Link 
            to="/analytics" 
            className={`${styles.navLink} ${isActive('/analytics') ? styles.navLinkActive : ''}`}
          >
            Analytics
          </Link>
        </nav>

        <button onClick={handleLogout} className={styles.logoutBtn}>
          Sign Out
        </button>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.userProfile}>
            <span className={styles.userEmail}>{user?.email}</span>
            <div className={styles.avatar}>{userInitial}</div>
          </div>
        </header>
        <section className={styles.content}>
          {children}
        </section>
      </main>
    </div>
  );
};