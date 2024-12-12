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
import { Container, Row, Col, Card } from 'react-bootstrap';
import './dashboard.styles.scss';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const { characters, loading, error } = useFetchCharacters(user, 3);
  const { users } = useFetchUsers(user, 3);
  const { goToCharacters, goToCharacterCreation, goToCharacter, goToUser, goToUsers } =
    useNavigate();

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
    <div
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `url('/assets/camp.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <Container className="d-flex justify-center">
        <ReturnButtons withDashboardButton={false} buttonText="Home" />
        <Card className="shadow-lg col-md-8 p-4 rounded">
          <Header
            title={user?.role === ROLES.ADMIN ? 'Admin Panel' : 'Dashboard'}
            username={user?.username}
            onLogout={logout}
          />
          <main>
            {user?.role === ROLES.ADMIN ? (
              <Row>
                <Col md={6}>
                  <h2 className="h5 mb-3">Characters</h2>
                  <CharacterActions onViewAll={handleViewAllCharacters} />
                  <CharacterList
                    characters={characters}
                    loading={loading}
                    error={error}
                    onEdit={handleEditCharacter}
                  />
                </Col>
                <Col md={6}>
                  <h2 className="h5 mb-3">Users</h2>
                  <UserActions onViewAll={handleViewAllUsers} />
                  <UsersList
                    users={users}
                    loading={loading}
                    error={error}
                    onEditUser={handleEditUser}
                  />
                </Col>
              </Row>
            ) : (
              <Row>
                <Col>
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
                </Col>
              </Row>
            )}
          </main>
        </Card>
      </Container>
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
