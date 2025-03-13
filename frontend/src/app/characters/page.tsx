'use client';

import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import Loading from '../components/widgets/Loading';
import Image from 'next/image';
import ReturnButton from '../components/widgets/ReturnButton';
import { useNavigate } from '../utils/navigation';
import { useFetchCharacters } from '../hooks/useFetchCharacters';
import EditButton from '../components/widgets/EditButton';
import { Badge } from '@/components/ui/badge';

const CharactersList = () => {
  const { user } = useContext(AuthContext);
  const [errorMessage] = useState('');
  const { goToCharacter } = useNavigate();
  const { characters, loading } = useFetchCharacters(user);

  if (!user || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading message="Loading your characters..." size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <ReturnButton />
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h2 className="text-2xl font-semibold text-center mb-4">Your Characters</h2>

          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

          {characters.length === 0 ? (
            <p className="text-center text-gray-500">No characters found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="hidden md:table w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr className="border-none">
                    <th className="p-3 text-left">Avatar</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Class</th>
                    <th className="p-3 text-left">Race</th>
                    <th className="p-3 text-left">Level</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {characters.map((character) => (
                    <tr key={character.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3">
                        {character.image && (
                          <Image
                            src={character.image}
                            alt={character.name}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                            loading="lazy"
                          />
                        )}
                      </td>
                      <td className="p-3 font-medium">{character.name}</td>
                      <td className="p-3">
                        <Badge variant="default">{character.class}</Badge>
                      </td>
                      <td className="p-3">
                        <Badge variant="outline">{character.race}</Badge>
                      </td>
                      <td className="p-3">{character.level}</td>
                      <td className="p-3 text-right">
                        <EditButton onEdit={() => goToCharacter(character.id)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile View: Card Layout */}
              <div className="md:hidden flex flex-col gap-4">
                {characters.map((character) => (
                  <div
                    key={character.id}
                    className="bg-gray-100 p-4 rounded-lg mt-2 shadow-sm flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      {character.image && (
                        <Image
                          src={character.image}
                          alt={character.name}
                          width={50}
                          height={50}
                          className="rounded-full object-cover"
                          loading="lazy"
                        />
                      )}
                      <div>
                        <p className="text-lg font-semibold">{character.name}</p>
                        <p className="text-sm text-gray-600">
                          <Badge variant="default" className="mr-2">
                            {character.class}
                          </Badge>
                          <Badge variant="outline">{character.race}</Badge>
                        </p>
                        <p className="text-sm text-gray-500">Level {character.level}</p>
                      </div>
                    </div>
                    <EditButton onEdit={() => goToCharacter(character.id)} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
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
