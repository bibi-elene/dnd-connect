'use client';

import { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from './context/AuthContext';
import Loading from './components/widgets/Loading';
import './page.styles.scss';
// import CharacterClassesCards from './components/landingPage/CharacterClassesCards';
// import CharacterRacesCards from './components/landingPage/CharacterRacesCards';
import ReviewForm from './components/landingPage/ReviewForm';

import { Sidebar, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ui/app-sidebar';
import About from './components/landingPage/About';
import Testimonials from './components/landingPage/Testimonials';
import FramerButton from './components/widgets/FramerButton';

export default function Home() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <Loading message="" size="sm" />
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <section className="relative">
        <Sidebar collapsible="offcanvas">
          <AppSidebar />
        </Sidebar>
        <SidebarTrigger />
        <div>
          <div className="flex items-center min-h-[85vh] relative">
            {/* <div className="position-absolute top-0 start-0 end-0 bottom-0"></div> */}
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
          {/* <CharacterClassesCards />
          <CharacterRacesCards /> */}
          <ReviewForm />
        </div>
      </section>
    </SidebarProvider>
  );
}
