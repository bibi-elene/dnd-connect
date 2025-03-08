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
        <Loading message="Please wait..." size="lg" />
      </div>
    );
  }

  return (
    <div
      className="relative bg-cover bg-center min-h-screen"
      style={{ backgroundImage: 'url(/assets/signup.png)' }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default ProtectedRoute;
