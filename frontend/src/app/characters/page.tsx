'use client';

import { useContext, useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Alert, Badge } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import Loading from '../components/widgets/Loading';
import Image from 'next/image';
import ReturnButtons from '../components/widgets/ReturnButtons';
import { useNavigate } from '../utils/navigation';
import { useFetchCharacters } from '../hooks/useFetchCharacters';
import EditButton from '../components/widgets/EditButton';

const CharactersList = () => {
  const { user } = useContext(AuthContext);
  const [errorMessage] = useState('');
  const { goToCharacter } = useNavigate();
  const { characters, loading } = useFetchCharacters(user);

  if (!user || loading) {
    return (
      <Container fluid className="vh-100 d-flex align-items-center justify-content-center">
        <Loading message="Loading your characters..." size="lg" />
      </Container>
    );
  }

  return (
    <Container fluid className="relative min-h-screen p-5 mt-3 flex items-center justify-center align-items-center">
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col md={12} lg={6}>
            <ReturnButtons fallbackUrl="/dashboard" />
            <Card className="shadow-lg h-100 rounded-lg mt-4">
              <Card.Body>
                <Card.Title
                  className="text-center text-xxl text-dark mb-4"
                  style={{ fontSize: '1.5rem' }}
                >
                  Your Characters
                </Card.Title>
                {errorMessage && (
                  <Alert variant="danger" className="text-center">
                    {errorMessage}
                  </Alert>
                )}
                {characters.length === 0 ? (
                  <Card.Text className="text-center text-dark">No characters found.</Card.Text>
                ) : (
                  <ListGroup variant="flush">
                    {characters.map((character) => (
                      <ListGroup.Item
                        key={character.id}
                        className="d-flex align-items-center justify-content-between p-3 rounded shadow-sm mb-3 bg-light"
                      >
                        <Row className="align-items-center w-100">
                          <Col xs={3} md={3} className="d-flex justify-content-center">
                            {character.image && (
                              <Image
                                src={character.image}
                                alt={character.name}
                                width={100}
                                height={100}
                                className="rounded-full object-fit-cover w-16 h-16"
                                loading="lazy"
                              />
                            )}
                          </Col>
                          <Col xs={6} md={6}>
                            <Card.Text className="fw-bold mb-1">{character.name}</Card.Text>
                            <Badge bg="info" className="me-2">
                              {character.class}
                            </Badge>
                            <Badge bg="success" className="me-2">
                              (Lvl: {character.level})
                            </Badge>
                            <Badge bg="info" className="me-2">
                              {character.race}
                            </Badge>
                          </Col>
                          <Col xs={3} md={3} className="d-flex justify-content-end">
                            <EditButton onEdit={() => goToCharacter(character.id)} />
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default function CharactersPage() {
  return (
    <ProtectedRoute>
      <CharactersList />
    </ProtectedRoute>
  );
}
