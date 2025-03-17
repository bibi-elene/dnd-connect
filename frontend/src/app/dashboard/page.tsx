'use client';

import ProtectedRoute from '../components/ProtectedRoute';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ROLES } from '../utils/constants';
import Header from '../components/widgets/Header';
import CharacterList from '../components/widgets/CharacterList';
import CharacterActions from '../components/widgets/CharacterActions';
import ReturnButton from '../components/widgets/ReturnButton';
import UsersList from '../components/widgets/UsersList';
import UserActions from '../components/widgets/UserActions';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DiceRoller from '../components/DiceRoller/DiceRoller';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen justify-content-center align-content-center bg-cover">
      <DiceRoller />
      <Container className="pt-4 mt-5 justify-content-center d-flex flex-column">
        <Row className="mt-1">
          <Col>
            <ReturnButton />
          </Col>
        </Row>
        {user?.role === ROLES.ADMIN && (
          <Row className="align-items-center m-0 text-center py-4 bg-white shadow-sm rounded">
            <Col md={12} lg={12} className="d-flex justify-between">
              <Header />
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
                    <UserActions />
                    <UsersList />
                  </Card.Body>
                </Card>
              </Col>
              <Col className="mt-2" sm={12} md={6} lg={6}>
                <Card className="shadow-lg h-100">
                  <Card.Header className="bg-white">
                    <h2 className="text-xxl mb-0">Characters</h2>
                  </Card.Header>
                  <Card.Body>
                    <CharacterActions />
                    <CharacterList />
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
                <Header />
              </Col>
              <Col md={12} lg={8} sm={12} xs={12}>
                <Card className="shadow-lg">
                  <Card.Header className="bg-white">
                    <h2 className="mb-0">Characters</h2>
                  </Card.Header>
                  <Card.Body>
                    <CharacterActions />
                    <CharacterList />
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
