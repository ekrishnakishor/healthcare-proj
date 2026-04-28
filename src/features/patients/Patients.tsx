import { useState, useEffect } from 'react';
import { MOCK_PATIENTS } from './mockData';
import type { Patient } from './types';
import styles from './Patients.module.css';
import { useUIStore } from '../../store/useUIStore';

const ITEMS_PER_PAGE = 4;

export const Patients = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Filter the patients based on search
  const filteredPatients = MOCK_PATIENTS.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 2. Reset to page 1 whenever search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // 3. Calculate pagination constraints
  const totalPages = Math.ceil(filteredPatients.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  
  // 4. Slice the data for the current page
  const paginatedPatients = filteredPatients.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const getStatusClass = (status: Patient['status']) => {
    switch (status) {
      case 'Stable': return styles.statusStable;
      case 'Critical': return styles.statusCritical;
      case 'Discharged': return styles.statusDischarged;
      default: return '';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>People Directory</h1>
        
        <div className={styles.toggleGroup}>
          <button 
            className={`${styles.toggleBtn} ${viewMode === 'grid' ? styles.toggleBtnActive : ''}`}
            onClick={() => setViewMode('grid')}
          >
            Grid
          </button>
          <button 
            className={`${styles.toggleBtn} ${viewMode === 'list' ? styles.toggleBtnActive : ''}`}
            onClick={() => setViewMode('list')}
          >
            List
          </button>
        </div>
      </div>

      <div className={styles.searchContainer}>
        <input 
          type="text" 
          placeholder="Search by name or ID..." 
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Render Grid or List using paginatedPatients instead of filteredPatients */}
      {viewMode === 'grid' ? (
        <div className={styles.grid}>
          {paginatedPatients.map((patient) => (
            <div key={patient.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.patientName}>{patient.name}</span>
                <span className={styles.patientId}>{patient.id}</span>
              </div>
              <div className={styles.details}>
                <span className={styles.detailItem}>Age: {patient.age}</span>
                <span className={styles.detailItem}>{patient.condition}</span>
                <div>
                  <span className={`${styles.status} ${getStatusClass(patient.status)}`}>
                    {patient.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.listContainer}>
          {paginatedPatients.map((patient) => (
            <div key={patient.id} className={styles.listRow}>
              <div className={styles.listProfile}>
                <div className={styles.listAvatar}>
                  {patient.name.charAt(0).toUpperCase()}
                </div>
                <div className={styles.listMeta}>
                  <span className={styles.listName}>{patient.name}</span>
                  <span className={styles.listId}>{patient.id}</span>
                </div>
              </div>
              <div className={styles.listData}>
                <div className={styles.dataGroup}>
                  <span className={styles.dataLabel}>Age</span>
                  <span className={styles.dataValue}>{patient.age} yrs</span>
                </div>
                <div className={styles.dataGroup}>
                  <span className={styles.dataLabel}>Condition</span>
                  <span className={styles.dataValue}>{patient.condition}</span>
                </div>
              </div>
              <div className={styles.listAction}>
                <span className={`${styles.status} ${getStatusClass(patient.status)}`}>
                  {patient.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 0 && (
        <div className={styles.pagination}>
          <span className={styles.pageInfo}>
            Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredPatients.length)} of {filteredPatients.length} entries
          </span>
          
          <div className={styles.pageControls}>
            <button 
              className={styles.pageBtn}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            
            <div className={`${styles.pageNumber} ${styles.pageNumberActive}`}>
              {currentPage}
            </div>

            <button 
              className={styles.pageBtn}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Add default export for lazy loading
export default Patients;