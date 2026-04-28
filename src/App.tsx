import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './shared/config/firebase';
import { useAuthStore } from './store/useAuthStore';
import { Login } from './features/auth/Login';
import { Layout } from './shared/components/Layout';

// Lazy load the heavy modules
const Patients = lazy(() => import('./features/patients/Patients'));

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuthStore();
  
  if (isLoading) return null; 
  if (!user) return <Navigate to="/login" replace />;
  
  return <Layout>{children}</Layout>;
};

// A clean loading state for code-splitting
const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    <p style={{ color: 'var(--text-secondary)' }}>Loading module...</p>
  </div>
);

export default function App() {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [setUser, setLoading]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <h1>Dashboard Overview</h1>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/patients" 
          element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoader />}>
                <Patients />
              </Suspense>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/analytics" 
          element={
            <ProtectedRoute>
              <h1>Analytics</h1>
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}