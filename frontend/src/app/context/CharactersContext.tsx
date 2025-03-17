'use client';

import { createContext, useState, useEffect, useMemo, ReactNode, useContext } from 'react';
import axios from 'axios';
import { ROLES } from '../utils/constants';
import { Character } from '../utils/types';
import { apiRoutes } from '../api/apiRoutes';
import { AuthContext } from './AuthContext'; // Ensure you're getting the user from AuthContext

interface CharactersContextType {
  characters: Character[];
  loading: boolean;
  error: string;
  fetchCharacterById: (id: any) => Promise<Character | null>;
  refetchCharacters: () => Promise<void>;
}

export const CharactersContext = createContext<CharactersContextType>({
  characters: [],
  loading: true,
  error: '',
  fetchCharacterById: async () => null,
  refetchCharacters: async () => {},
});

export const CharactersProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(AuthContext);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const baseUrl =
        user?.role === ROLES.ADMIN ? apiRoutes.characters.all : apiRoutes.characters.userCharacters;

      const response = await axios.get(baseUrl, {
        withCredentials: true,
      });

      setCharacters(response.data);
    } catch (err) {
      setError(`You don't have characters yet`);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCharacters();
    }
  }, [user]);

  const refetchCharacters = async () => {
    if (user) {
      await fetchCharacters();
    }
  };

  const fetchCharacterById = async (id: any): Promise<Character | null> => {
    setLoading(true);
    try {
      const response = await axios.get(apiRoutes.characters.character(id), {
        withCredentials: true,
      });

      if (!response.data) throw new Error('Character not found');
      return response.data;
    } catch (error) {
      console.error(`Error fetching character with ID ${id}:`, error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const contextValue = useMemo(
    () => ({
      characters,
      loading,
      error,
      fetchCharacterById,
      refetchCharacters,
    }),
    [characters, loading, error]
  );

  return <CharactersContext.Provider value={contextValue}>{children}</CharactersContext.Provider>;
};
