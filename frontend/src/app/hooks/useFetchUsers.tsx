import { useState, useEffect, useMemo } from 'react';
import { User } from '../utils/types';
import { apiRoutes } from '../api/apiRoutes';

export const useFetchUsers = (user: User | null) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const url = apiRoutes.users.all;

        const response = await fetch(url, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch characters');
        }

        const data = await response.json();
        setUsers(data.slice(-3));
      } catch (err) {
        setError('Oops! Looks like you need to create a champion. You have 0');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUsers();
    }
  }, [user]);

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
