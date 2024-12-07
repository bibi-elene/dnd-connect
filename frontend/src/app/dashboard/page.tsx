'use client';

import ProtectedRoute from '../components/ProtectedRoute';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/AuthContext';
import { useRouter } from 'next/navigation';
import { ROLES } from '../utils/constants';
import Loading from '../components/widgets/Loading';

interface Character {
  id: number;
  name: string;
  class: string;
  level: number;
  race: string;
  background: string;
}

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loadingCharacters, setLoadingCharacters] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const url =
          user?.role === ROLES.ADMIN
            ? '/api/characters?fetchAll=true'
            : '/api/characters/me';

        const response = await fetch(url, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch characters');
        }

        const data = await response.json();
        setCharacters(data);
      } catch (err) {
        setError('Oops! Looks like you need to create a champion. You have 0');
        console.error('Error:', err);
      } finally {
        setLoadingCharacters(false);
      }
    };

    if (user) {
      fetchCharacters();
    }
  }, [user]);

  const handleViewAllCharacters = () => {
    router.push('/characters');
  };

  const handleCreateCharacter = () => {
    router.push('/characters/create');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6 flex items-center justify-center">
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <header className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-3xl font-semibold text-gray-700">
            {user?.role === ROLES.USER ? 'Dashboard' : 'Admin Panel'}
          </h1>
          <div>
            <span className="mr-4 text-gray-700 font-medium">
              Hello, {user?.username}
            </span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
            >
              Log out
            </button>
          </div>
        </header>

        <main>
          {user?.role === 'admin' ? (
            <div>
              <button
                onClick={handleViewAllCharacters}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition mb-6"
              >
                View All Characters
              </button>
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">
                  All Characters:
                </h3>
                {loadingCharacters ? (
                  <Loading message="Fetching characters..." size="sm" />
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : (
                  <ul className="space-y-2">
                    {characters.map((character) => (
                      <li
                        key={character.id}
                        className="bg-gray-100 p-3 rounded-lg shadow hover:bg-gray-200 transition"
                      >
                        <strong className="text-gray-700">
                          {character.name}
                        </strong>{' '}
                        - {character.class} (Level {character.level})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Your Characters
              </h2>
              <button
                onClick={handleCreateCharacter}
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition mb-6"
              >
                Create New Character
              </button>
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">
                  Your Characters:
                </h3>
                {loadingCharacters ? (
                  <p>Loading characters...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : (
                  <ul className="space-y-2">
                    {characters.map((character) => (
                      <li
                        key={character.id}
                        className="bg-gray-100 p-3 rounded-lg shadow hover:bg-gray-200 transition"
                      >
                        <strong className="text-gray-700">
                          {character.name}
                        </strong>{' '}
                        - {character.class} (Level {character.level})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}
