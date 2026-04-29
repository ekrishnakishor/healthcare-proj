import { useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { MOCK_PATIENTS } from '../patients/mockData';
import { registerServiceWorker, requestNotificationPermission, sendLocalNotification } from '../../shared/utils/notifications';
import styles from './Dashboard.module.css';

export const Dashboard = () => {
  const { user } = useAuthStore();
  
  const totalPatients = MOCK_PATIENTS.length;
  const criticalCount = MOCK_PATIENTS.filter(p => p.status === 'Critical').length;
  const stableCount = MOCK_PATIENTS.filter(p => p.status === 'Stable').length;

  useEffect(() => {
    const initNotifications = async () => {
      await registerServiceWorker();
      const granted = await requestNotificationPermission();
      
      if (granted && criticalCount > 0) {
        const hasNotified = sessionStorage.getItem('critical_notified');
        if (!hasNotified) {
          sendLocalNotification(
            'Action Required', 
            `You have ${criticalCount} patients in critical condition.`
          );
          sessionStorage.setItem('critical_notified', 'true');
        }
      }
    };
    
    initNotifications();
  }, [criticalCount]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const displayName = user?.email?.split('@')[0] || 'User';

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{getGreeting()}, {displayName}</h1>
        <p className={styles.subtitle}>Here is your system overview for today.</p>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Patients</span>
          <span className={styles.statValue}>{totalPatients}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Critical Condition</span>
          <span className={styles.statValue} style={{ color: '#ef4444' }}>{criticalCount}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Stable</span>
          <span className={styles.statValue} style={{ color: '#10b981' }}>{stableCount}</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;