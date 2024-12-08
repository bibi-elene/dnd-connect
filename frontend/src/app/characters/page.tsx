'use client';

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import { ROLES } from '../utils/constants';
import Loading from '../components/widgets/Loading';
import { Character } from '../utils/types';
import Image from 'next/image';

const CharactersList = () => {
  const { user } = useContext(AuthContext);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const url =
          user?.role === ROLES.ADMIN ? '/api/characters' : '/api/characters/me';

        const response = await fetch(url, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch characters');
        }

        const data = await response.json();
        setCharacters(data);
      } catch (error) {
        setErrorMessage('Failed to fetch characters.');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCharacters();
    }
  }, [user]);

  if (!user || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loading message="Loading your characters..." size="lg" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4 text-center text-black">
          Your Characters
        </h2>
        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
        {characters.length === 0 ? (
          <p className="text-black">No characters found.</p>
        ) : (
          <ul className="text-black space-y-4">
            {characters.map((character) => (
              <li
                key={character.id}
                className="flex items-center space-x-4 border-b pb-2"
              >
                {character.image && (
                  <Image
                    src={character.image}
                    alt={character.name}
                    width={100}
                    height={100}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="text-lg font-semibold">{character.name}</p>
                  <p>
                    {character.class} (Level: {character.level})
                  </p>
                  <p>{character.race}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default function CharactersPage() {
  return (
    <ProtectedRoute>
      <CharactersList />
    </ProtectedRoute>
  );
}
