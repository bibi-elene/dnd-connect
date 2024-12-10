'use client';

import { useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loading message="Fetching data..." size="lg" />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
