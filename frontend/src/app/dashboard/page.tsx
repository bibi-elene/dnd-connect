'use client';

import ProtectedRoute from '../components/ProtectedRoute';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ROLES } from '../utils/constants';
import { useFetchCharacters } from '../hooks/useFetchCharacters';
import Header from '../components/widgets/Header';
import CharacterList from '../components/widgets/CharacterList';
import CharacterActions from '../components/widgets/CharacterActions';
import { useNavigate } from '../utils/navigation';
import ReturnButtons from '../components/widgets/ReturnButtons';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const { characters, loading, error } = useFetchCharacters(user);
  const { goToCharacters, goToCharacterCreation, goToCharacter } =
    useNavigate();

  const handleViewAllCharacters = () => {
    goToCharacters();
  };

  const handleCreateCharacter = () => {
    goToCharacterCreation();
  };

  const handleEditCharacter = (id: number) => {
    goToCharacter(id);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6 flex items-center justify-center">
      <ReturnButtons withDashboardButton={false} buttonText="Home" />
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <Header
          title={user?.role === ROLES.ADMIN ? 'Admin Panel' : 'Dashboard'}
          username={user?.username}
          onLogout={logout}
        />

        <main>
          {user?.role === ROLES.ADMIN ? (
            <div>
              <CharacterActions onViewAll={handleViewAllCharacters} />
              <CharacterList
                characters={characters}
                loading={loading}
                error={error}
                onEdit={handleEditCharacter}
              />
            </div>
          ) : (
            <div>
              <CharacterActions
                onViewAll={handleViewAllCharacters}
                onCreate={handleCreateCharacter}
              />
              <CharacterList
                characters={characters}
                loading={loading}
                error={error}
                onEdit={handleEditCharacter}
              />
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
