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
import { useFetchUsers } from '../hooks/useFetchUsers';
import UsersList from '../components/widgets/UsersList';
import UserActions from '../components/widgets/UserActions';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const { characters, loading, error } = useFetchCharacters(user, 3);
  const { users } = useFetchUsers(user, 3);
  const {
    goToCharacters,
    goToCharacterCreation,
    goToCharacter,
    goToUser,
    goToUsers,
  } = useNavigate();

  const handleViewAllCharacters = () => {
    goToCharacters();
  };

  const handleViewAllUsers = () => {
    goToUsers();
  };

  const handleCreateCharacter = () => {
    goToCharacterCreation();
  };

  const handleEditCharacter = (id: number) => {
    goToCharacter(id);
  };

  const handleEditUser = (id: number) => {
    goToUser(id);
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
            <div className="flex">
              <div className="w-1/2 pr-4">
                <h2 className="text-xl font-semibold mb-4">Characters</h2>
                <CharacterActions onViewAll={handleViewAllCharacters} />
                <CharacterList
                  characters={characters}
                  loading={loading}
                  error={error}
                  onEdit={handleEditCharacter}
                />
              </div>
              <div className="w-1/2 pl-4">
                <h2 className="text-xl font-semibold mb-4">Users</h2>
                <UserActions onViewAll={handleViewAllUsers} />
                <UsersList
                  users={users}
                  loading={loading}
                  error={error}
                  onEditUser={handleEditUser}
                />
              </div>
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
