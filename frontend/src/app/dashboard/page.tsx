// src/app/dashboard/page.tsx
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
          // Assuming your backend returns only user's characters when not admin
          const response = await axios.get('/characters/me'); // Implement this endpoint in backend
          setCharacters(response.data);
        }
      } catch (err) {
        setError('Failed to fetch characters.');
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
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center bg-white p-4 rounded shadow-md mb-6">
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
      <main className="text-black">
        {user?.role === 'admin' ? (
          <div>
            <h2 className="text-xl mb-4">Admin Panel</h2>
            <button
              onClick={handleViewAllCharacters}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
            >
              View All Characters
            </button>
            {/* Add more admin-specific functionalities here */}
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
                      <strong>{character.name}</strong> - {character.class} (Level {character.level})
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
                      <strong>{character.name}</strong> - {character.class} (Level {character.level})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </main>
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
