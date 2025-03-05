'use client';

import { useContext, useEffect, useMemo, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from './context/AuthContext';
import DiceRoller from './components/DiceRoller/DiceRoller';
import JoinUsButton from './components/widgets/JoinButton';
import Loading from './components/widgets/Loading';
import './page.styles.scss';
import CharacterClassesCards from './components/landingPage/CharacterClassesCards';
import CharacterRacesCards from './components/landingPage/CharacterRacesCards';
import ReviewForm from './components/landingPage/ReviewForm';
import Cookies from 'js-cookie';

import { Sidebar, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ui/app-sidebar';
import { Menu } from 'lucide-react';

export default function Home() {
  const { user, loading } = useContext(AuthContext);
  const homeButtonText = useMemo(() => (user ? '🚀 Explore' : '🚀 Sign Up'), [user]);
  const [isDiceVisible, setIsDiceVisible] = useState(true);

  useEffect(() => {
    const diceVisibleCookie = Cookies.get('diceVisible');
    setIsDiceVisible(diceVisibleCookie !== 'false');
  }, []);

  const toggleDiceDisplay = () => {
    const newValue = !isDiceVisible;
    setIsDiceVisible(newValue);
    Cookies.set('diceVisible', newValue.toString(), { expires: 1 });
  };

  if (loading) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <Loading message="" size="sm" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="relative">
        <Sidebar collapsible="offcanvas">
          <AppSidebar />
        </Sidebar>

        {/* Trigger button (always visible) */}
        <button
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
          aria-label="Toggle Menu"
        >
          <SidebarTrigger>
            <Menu className="w-6 h-6 text-black" />
          </SidebarTrigger>
        </button>

        {/* Main content (no margin or shift) */}
        <div className="relative">
          <section className="d-flex align-items-center justify-content-center text-center position-relative vh-100">
            <div className="position-absolute top-0 start-0 end-0 bottom-0 bg-black bg-opacity-50"></div>
            <Container className="position-relative z-10 text-white">
              <Row className="justify-content-center">
                <Col lg={8}>
                  <h1
                    className="display-3 fw-bold mb-4"
                    style={{ fontFamily: 'Cinzel Decorative' }}
                  >
                    Welcome to D&D Connect!
                  </h1>
                  <JoinUsButton homeButtonText={homeButtonText} />
                  <DiceRoller isDiceVisible={isDiceVisible} />
                  <p className="lead mb-4">
                    Your gateway to exciting adventures and a vibrant D&D community
                  </p>
                </Col>
              </Row>
            </Container>
          </section>
          <CharacterClassesCards />
          <CharacterRacesCards />
          <ReviewForm />
        </div>
      </div>
    </SidebarProvider>
  );
}
