'use client';

import { useContext, useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from './context/AuthContext';
import DiceRoller from './components/DiceRoller/DiceRoller';
import Navbar from './components/widgets/NavBar';
import JoinUsButton from './components/widgets/JoinButton';
import Loading from './components/widgets/Loading';
import About from './components/landingPage/About';
import Features from './components/landingPage/Features';
import Contact from './components/landingPage/Contacts';

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
      {/* Navbar */}
      <header>
        <Navbar user={user} logout={logout} />
      </header>

      {/* Hero Section */}
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
              <h1 className="display-4 fw-bold" style={{ fontFamily: 'Cinzel Decorative' }}>
                Welcome to D&D Connect!
              </h1>
              <JoinUsButton homeButtonText={homeButtonText} />
              <DiceRoller />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Additional Sections */}
      <main>
        <section id="about" className="py-5 bg-light">
          <Container>
            <Row>
              <Col>
                <About />
              </Col>
            </Row>
          </Container>
        </section>

        <section id="features" className="py-5">
          <Container>
            <Row>
              <Col>
                <Features />
              </Col>
            </Row>
          </Container>
        </section>

        <section id="contact" className="py-5 bg-light">
          <Container>
            <Row>
              <Col>
                <Contact />
              </Col>
            </Row>
          </Container>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-4 bg-dark text-white text-center">
        <Container>
          <Row>
            <Col>
              <p className="mb-0">© 2024 D&D Connect. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}
