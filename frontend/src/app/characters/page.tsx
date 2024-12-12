'use client';

import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import Loading from '../components/widgets/Loading';
import Image from 'next/image';
import EditButton from '../components/widgets/EditButton';
import ReturnButtons from '../components/widgets/ReturnButtons';
import { useNavigate } from '../utils/navigation';
import { useFetchCharacters } from '../hooks/useFetchCharacters';

const CharactersList = () => {
  const { user } = useContext(AuthContext);
  const [errorMessage] = useState('');
  const { goToCharacter } = useNavigate();
  const { characters, loading } = useFetchCharacters(user);

  if (!user || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loading message="Loading your characters..." size="lg" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-5 flex items-center justify-center">
      <ReturnButtons fallbackUrl="/dashboard" />
      <div className="w-full max-w-2xl bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4 text-center text-black">Your Characters</h2>
        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
        {characters.length === 0 ? (
          <p className="text-black">No characters found.</p>
        ) : (
          <ul className="text-black space-y-4 px-0">
            {characters.map((character) => (
              <li
                key={character.id}
                className="bg-gray-100 p-3 rounded-lg shadow hover:bg-gray-200 transition flex items-center justify-between"
              >
                <div className="flex">
                  {character.image && (
                    <Image
                      src={character.image}
                      alt={character.name}
                      width={100}
                      height={100}
                      className="w-16 h-16 rounded-full object-contain"
                    />
                  )}
                  <div className="ml-5">
                    <p className="text-lg font-semibold">{character.name}</p>
                    <p>
                      {character.class} (Level: {character.level})
                    </p>
                    <p>{character.race}</p>
                  </div>
                </div>

                <EditButton onClick={() => goToCharacter(character.id)} />
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
