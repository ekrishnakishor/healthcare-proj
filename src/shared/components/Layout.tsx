import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useAuth } from '../../features/auth/useAuth';
import styles from './Layout.module.css';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;
  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : 'U';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
            Patients
          </Link>
          <Link 
            to="/analytics" 
            className={`${styles.navLink} ${isActive('/analytics') ? styles.navLinkActive : ''}`}
          >
            Analytics
          </Link>
        </nav>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          
          {/* We attach the ref here so we can track clicks inside this specific div */}
          <div className={styles.userProfile} ref={menuRef}>
            <span className={styles.userEmail}>{user?.email}</span>
            
            <button 
              className={styles.avatarBtn} 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className={styles.avatar}>{userInitial}</div>
            </button>

            {/* The Dropdown Menu */}
            {isMenuOpen && (
              <div className={styles.dropdownMenu}>
                <button onClick={handleLogout} className={styles.dropdownItem}>
                  Sign Out
                </button>
              </div>
            )}
          </div>

        </header>
        <section className={styles.content}>
          {children}
        </section>
      </main>
    </div>
  );
};