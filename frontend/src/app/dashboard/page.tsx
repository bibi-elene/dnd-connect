'use client';

import ProtectedRoute from '../components/ProtectedRoute';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/AuthContext';
import { useRouter } from 'next/navigation';
import axios from '../utils/axios';

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
        if (user?.role === 'admin') {
          const response = await axios.get('/characters');
          setCharacters(response.data);
        } else {
          const response = await axios.get('/characters/me');
          setCharacters(response.data);
        }
      } catch (err) {
        setError('Oops! Looks like you need to create a champion. You have 0');
        console.error(err);
      } finally {
        setLoadingCharacters(false);
      }
    };

    fetchCharacters();
  }, [user]);

  const handleViewAllCharacters = () => {
    router.push('/characters');
  };

  const handleCreateCharacter = () => {
    router.push('/characters/create');
  };

  return (
    <div
      className="relative min-h-screen bg-gray-100 p-4"
      style={{
        backgroundImage: `url('/assets/tavern.jpg')`, // Correct path to your image
        backgroundSize: 'cover', // Ensures the image covers the whole screen
        backgroundRepeat: 'no-repeat', // Prevents the image from repeating
        backgroundPosition: 'center', // Centers the image on the screen
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative">
        <header className="flex justify-between items-center bg-white bg-opacity-90 p-4 rounded shadow-md mb-6">
          <h1 className="text-2xl font-bold text-black">Dashboard</h1>
          <div>
            <span className="mr-4 text-black">Hello, {user?.username}</span>
            <button
              onClick={() => {
                logout();
              }}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </header>
        <main className="text-black bg-white bg-opacity-90 p-4 rounded">
          {user?.role === 'admin' ? (
            <div>
              <h2 className="text-xl mb-4">Admin Panel</h2>
              <button
                onClick={handleViewAllCharacters}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
              >
                View All Characters
              </button>
              <div>
                <h3 className="text-lg mb-2">All Characters:</h3>
                {loadingCharacters ? (
                  <p>Loading characters...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : (
                  <ul className="list-disc pl-5">
                    {characters.map((character) => (
                      <li key={character.id} className="mb-1">
                        <strong>{character.name}</strong> - {character.class}{' '}
                        (Level {character.level})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl mb-4">Your Characters</h2>
              <button
                onClick={handleCreateCharacter}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
              >
                Create New Character
              </button>
              <div>
                <h3 className="text-lg mb-2">Your Characters:</h3>
                {loadingCharacters ? (
                  <p>Loading characters...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : (
                  <ul className="list-disc pl-5">
                    {characters.map((character) => (
                      <li key={character.id} className="mb-1">
                        <strong>{character.name}</strong> - {character.class}{' '}
                        (Level {character.level})
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
