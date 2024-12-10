import { useState, useEffect, useMemo } from 'react';
import { ROLES } from '../utils/constants';
import { Character, User } from '../utils/types';
import { apiRoutes } from '../api/apiRoutes';

export const useFetchCharacters = (user: User | null) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const url =
          user?.role === ROLES.ADMIN ? apiRoutes.characters.all : apiRoutes.characters.userCharacters;

        const response = await fetch(url, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch characters');
        }

        const data = await response.json();
        setCharacters(data.slice(-3));
      } catch (err) {
        setError('Oops! Looks like you need to create a champion. You have 0');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCharacters();
    }
  }, [user]);

  const memoizedData = useMemo(
    () => ({
      characters,
      loading,
      error,
    }),
    [characters, loading, error]
  );

  return memoizedData;
};
