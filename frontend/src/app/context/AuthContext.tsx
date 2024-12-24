'use client';

import { createContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { useNavigate } from '../utils/navigation';
import { User } from '../utils/types';
import { apiRoutes } from '../api/apiRoutes';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { goToDashboard, goToHome } = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(apiRoutes.auth.me);

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(apiRoutes.auth.login, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          errorResponse.message.message || 'Failed to log in. Please try again later.'
        );
      }

      const userResponse = await fetch(apiRoutes.auth.me);

      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUser(userData);
        goToDashboard();
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (username: string, password: string) => {
    try {
      const response = await fetch(apiRoutes.auth.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      goToDashboard();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };
  const logout = async () => {
    try {
      const response = await fetch(apiRoutes.auth.logout, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setUser(null);
        goToHome();
      } else {
        throw new Error('Failed to logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const contextValue = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
