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
import ReturnButton from '../components/widgets/ReturnButton';
import { useFetchUsers } from '../hooks/useFetchUsers';
import UsersList from '../components/widgets/UsersList';
import UserActions from '../components/widgets/UserActions';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const {
    characters,
    loading: charactersLoading,
    error: charactersError,
  } = useFetchCharacters(user, 3);
  const { users, loading: usersLoading, error: usersError } = useFetchUsers(user, 3);
  const { goToCharacters, goToCharacterCreation, goToUsers } = useNavigate();

  const handleViewAllCharacters = () => goToCharacters();
  const handleViewAllUsers = () => goToUsers();
  const handleCreateCharacter = () => goToCharacterCreation();

  return (
    <div
      className="min-h-screen justify-content-center align-content-center bg-cover">
      <Container className="pt-4 mt-5 justify-content-center d-flex flex-column">
        <Row className="mt-1">
          <Col>
            <ReturnButton />
          </Col>
        </Row>
        {user?.role === ROLES.ADMIN && (
          <Row className="align-items-center m-0 text-center py-4 bg-white shadow-sm rounded">
            <Col md={12} lg={12} className="d-flex justify-between">
              <Header
                title={user?.role === ROLES.ADMIN ? 'Admin Panel' : 'Dashboard'}
                username={user?.username}
                onLogout={logout}
              />
            </Col>
          </Row>
        )}

        <Row className="mb-4">
          {user?.role === ROLES.ADMIN ? (
            <>
              <Col sm={12} md={6} lg={6} className="mt-2">
                <Card className="shadow-lg h-100">
                  <Card.Header className="bg-white">
                    <h2 className="mb-0">Users</h2>
                  </Card.Header>
                  <Card.Body>
                    <UserActions onViewAll={handleViewAllUsers} />
                    <UsersList users={users} loading={usersLoading} error={usersError} />
                  </Card.Body>
                </Card>
              </Col>
              <Col className="mt-2" sm={12} md={6} lg={6}>
                <Card className="shadow-lg h-100">
                  <Card.Header className="bg-white">
                    <h2 className="text-xxl mb-0">Characters</h2>
                  </Card.Header>
                  <Card.Body>
                    <CharacterActions onViewAll={handleViewAllCharacters} />
                    <CharacterList
                      characters={characters}
                      loading={charactersLoading}
                      error={charactersError}
                    />
                  </Card.Body>
                </Card>
              </Col>
            </>
          ) : (
            <Container className="d-flex flex-column align-items-center">
              <Col
                md={12}
                lg={8}
                sm={12}
                xs={12}
                className="d-flex p-4 mb-2 justify-between align-items-center mt-0 text-center py-4 bg-white shadow-sm rounded"
              >
                <Header
                  title={user?.role === ROLES.ADMIN ? 'Admin Panel' : 'Dashboard'}
                  username={user?.username}
                  onLogout={logout}
                />
              </Col>
              <Col md={12} lg={8} sm={12} xs={12}>
                <Card className="shadow-lg">
                  <Card.Header className="bg-white">
                    <h2 className="mb-0">Characters</h2>
                  </Card.Header>
                  <Card.Body>
                    <CharacterActions
                      onViewAll={handleViewAllCharacters}
                      onCreate={handleCreateCharacter}
                    />
                    <CharacterList
                      characters={characters}
                      loading={charactersLoading}
                      error={charactersError}
                    />
                  </Card.Body>
                </Card>
              </Col>
            </Container>
          )}
        </Row>
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
