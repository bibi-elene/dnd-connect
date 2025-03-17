'use client';

import { createContext, useState, useEffect, useMemo, ReactNode, useContext } from 'react';
import axios from 'axios';
import { User } from '../utils/types';
import { apiRoutes } from '../api/apiRoutes';
import { ROLES } from '../utils/constants';
import { AuthContext } from './AuthContext';

interface UsersContextType {
  users: User[];
  loading: boolean;
  error: string;
  refetchUsers: () => Promise<void>;
}

export const UsersContext = createContext<UsersContextType>({
  users: [],
  loading: true,
  error: '',
  refetchUsers: async () => {},
});

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    if (user?.role !== ROLES.ADMIN) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(apiRoutes.users.all, {
        withCredentials: true,
      });

      setUsers(response.data);
    } catch (err) {
      setError('Oops! Looks like something went wrong.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user]);

  const refetchUsers = async () => {
    if (user) {
      await fetchUsers();
    }
  };

  const contextValue = useMemo(
    () => ({
      users,
      loading,
      error,
      refetchUsers,
    }),
    [users, loading, error]
  );

  return <UsersContext.Provider value={contextValue}>{children}</UsersContext.Provider>;
};
