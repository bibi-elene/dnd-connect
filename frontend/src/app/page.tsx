'use client';

import { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from './context/AuthContext';
import Loading from './components/widgets/Loading';
import ReviewForm from './components/landingPage/ReviewForm';
import About from './components/landingPage/About';
import Testimonials from './components/landingPage/Testimonials';
import FramerButton from './components/widgets/FramerButton';
import './page.styles.scss';

export default function Home() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <Loading message="" size="sm" />
      </div>
    );
  }

  return (
    <section className="relative">
      <div>
        <div className="flex items-center min-h-[85vh] relative">
          <Container className="position-relative text-white">
            <Row className="justify-content-center">
              <Col lg={8}>
                <h1 className="display-3 fw-bold mb-4" style={{ fontFamily: 'Montserrat' }}>
                  Forge Your Next Great Adventure
                </h1>
                <p className="font-italic">
                  Manage your campaigns, track quests, and bring your party together—all in one
                  place.
                </p>
                <FramerButton text="Start Adventure" />
              </Col>
            </Row>
          </Container>
        </div>
        <About />
        <Testimonials />
        <ReviewForm />
      </div>
    </section>
  );
}
