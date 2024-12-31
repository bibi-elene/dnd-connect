'use client';

import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import Loading from './widgets/Loading';
import { useNavigate } from '../utils/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useContext(AuthContext);
  const { goToLogin } = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      goToLogin();
    }
  }, [user, loading, goToLogin]);

  if (loading || !user) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <Loading message="Fetching data..." size="lg" />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
