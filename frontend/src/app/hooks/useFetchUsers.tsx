import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import { User } from '../utils/types';
import { apiRoutes } from '../api/apiRoutes';

export const useFetchUsers = (user: User | null, limit?: number) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(apiRoutes.users.all, {
          params: limit ? { limit } : undefined,
          withCredentials: true,
        });

        setUsers(response.data);
      } catch (err) {
        setError('Oops! Looks like something went wrong.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUsers();
    }
  }, [user, limit]);

  const memoizedData = useMemo(
    () => ({
      users,
      loading,
      error,
    }),
    [users, loading, error]
  );

  return memoizedData;
};
