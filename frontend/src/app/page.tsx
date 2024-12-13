'use client';

import { useContext, useMemo } from 'react';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import { AuthContext } from './context/AuthContext';
import DiceRoller from './components/DiceRoller/DiceRoller';
import Navbar from './components/widgets/NavBar';
import JoinUsButton from './components/widgets/JoinButton';
import Loading from './components/widgets/Loading';
import { characterClasses, characterRaces } from './utils/constants';
import './page.styles.scss';
import CharacterClassesCards from './components/landingPage/CharacterClassesCards';
import CharacterRacesCards from './components/landingPage/CharacterRacesCards';
import ReviewForm from './components/landingPage/ReviewForm';

export default function Home() {
  const { user, logout, loading } = useContext(AuthContext);
  const homeButtonText = useMemo(() => (user ? '🚀 Explore' : '🚀 Sign Up'), [user]);

  if (loading) {
    return (
      <div className="absolute inset-0 bg-black bg-opacity-50 d-flex align-items-center justify-content-center z-10">
        <Loading message="" size="sm" />
      </div>
    );
  }

  return (
    <div className="relative">
      <header>
        <Navbar user={user} logout={logout} />
      </header>

      <section
        className="d-flex align-items-center justify-content-center text-center position-relative vh-100"
        style={{
          backgroundImage: `url('/assets/tavern.jpg')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <div className="position-absolute top-0 start-0 end-0 bottom-0 bg-black bg-opacity-50"></div>
        <Container className="position-relative z-10 text-white">
          <Row className="justify-content-center">
            <Col lg={8}>
              <h1 className="display-3 fw-bold mb-4" style={{ fontFamily: 'Cinzel Decorative' }}>
                Welcome to D&D Connect!
              </h1>
              <JoinUsButton homeButtonText={homeButtonText} />
              <DiceRoller />
              <p className="lead mb-4">
                Your gateway to thrilling adventures and a vibrant D&D community.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <CharacterClassesCards />
      <CharacterRacesCards />
      <ReviewForm />
    </div>
  );
}
