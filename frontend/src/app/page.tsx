'use client';

import { useContext, useMemo } from 'react';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import { AuthContext } from './context/AuthContext';
import DiceRoller from './components/DiceRoller/DiceRoller';
import Navbar from './components/widgets/NavBar';
import JoinUsButton from './components/widgets/JoinButton';
import Loading from './components/widgets/Loading';
import About from './components/landingPage/About';
import Features from './components/landingPage/Features';
import Contact from './components/landingPage/Contacts';
import { characterClasses } from './utils/constants';
import './page.styles.scss';

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

      {/* Classes Section */}
      <section
        id="classes"
        className="py-5 position-relative"
        style={{
          backgroundImage: `url('/assets/adventure.jpg')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <div className="position-absolute top-0 start-0 end-0 bottom-0 bg-black bg-opacity-50"></div>
        <Container className="position-relative text-white">
          <h2
            className="text-center display-4 fw-bold mb-5"
            style={{ fontFamily: 'Cinzel Decorative' }}
          >
            Classes
          </h2>
          <Row>
            {characterClasses.map((cls, idx) => (
              <Col md={6} lg={4} key={idx} className="mb-4">
                <Card className="bg-dark text-white border-0">
                  <Card.Img
                    src={cls.img}
                    alt={cls.name}
                    style={{ opacity: 0.5, width: '100%', height: '450px', objectFit: 'cover' }}
                  />
                  <Card.ImgOverlay>
                    <Card.Title className="display-6 fw-bold">{cls.name}</Card.Title>
                    <Card.Text>{cls.description}</Card.Text>
                  </Card.ImgOverlay>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Races Section */}
      <section
        id="races"
        className="py-5 position-relative"
        style={{
          backgroundImage: `url('/assets/adventure2.jpg')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <div className="position-absolute top-0 start-0 end-0 bottom-0 bg-black bg-opacity-50"></div>
        <Container className="position-relative text-white">
          <h2
            className="text-center display-4 fw-bold mb-5"
            style={{ fontFamily: 'Cinzel Decorative' }}
          >
            Races
          </h2>
          <Row>
            {[
              { name: 'Elf', description: 'Graceful and wise.', img: '/assets/fighter_human.jpg' },
              { name: 'Dwarf', description: 'Stout and sturdy.', img: '/assets/fighter_human.jpg' },
              { name: 'Dwarf', description: 'Stout and sturdy.', img: '/assets/fighter_human.jpg' },
              { name: 'Dwarf', description: 'Stout and sturdy.', img: '/assets/fighter_human.jpg' },
              { name: 'Dwarf', description: 'Stout and sturdy.', img: '/assets/fighter_human.jpg' },
              {
                name: 'Human',
                description: 'Versatile and ambitious.',
                img: '/assets/fighter_human.jpg',
              },
            ].map((race, idx) => (
              <Col md={6} lg={4} key={idx} className="mb-4">
                <Card className="bg-dark text-white border-0">
                  <Card.Img
                    src={race.img}
                    alt={race.name}
                    className='card-img'
                    style={{ opacity: 0.5, width: '100%', height: '450px', objectFit: 'cover' }}
                  />
                  <Card.ImgOverlay>
                    <Card.Title className="display-6 fw-bold">{race.name}</Card.Title>
                    <Card.Text>{race.description}</Card.Text>
                  </Card.ImgOverlay>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Review Section */}
      <section
        id="review"
        className="py-5 position-relative"
        style={{
          backgroundImage: `url('/assets/camp1.jpg')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <div className="position-absolute top-0 start-0 end-0 bottom-0 bg-black bg-opacity-50"></div>
        <Container className="position-relative text-white">
          <h2
            className="text-center display-4 fw-bold mb-5"
            style={{ fontFamily: 'Cinzel Decorative' }}
          >
            Leave a Review
          </h2>
          <Row className="justify-content-center">
            <Col md={8}>
              <Form
                action="mailto:bibi.elene21@gmail.com"
                method="post"
                encType="text/plain"
                className="p-4 rounded"
              >
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Your Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Your Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Your Review</Form.Label>
                  <Form.Control as="textarea" rows={4} placeholder="Write your review here..." />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit Review
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
