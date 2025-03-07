'use client';

import { useContext, useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from './context/AuthContext';
import DiceRoller from './components/DiceRoller/DiceRoller';
import JoinUsButton from './components/widgets/JoinButton';
import Loading from './components/widgets/Loading';
import './page.styles.scss';
// import CharacterClassesCards from './components/landingPage/CharacterClassesCards';
// import CharacterRacesCards from './components/landingPage/CharacterRacesCards';
import ReviewForm from './components/landingPage/ReviewForm';

import { Sidebar, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ui/app-sidebar';
import About from './components/landingPage/About';
import Testimonials from './components/landingPage/Testimonials';

export default function Home() {
  const { user, loading } = useContext(AuthContext);
  const homeButtonText = useMemo(() => (user ? '🚀 Explore' : '🚀 Sign Up'), [user]);
  // const [isDiceVisible, setIsDiceVisible] = useState(true);

  // useEffect(() => {
  //   const diceVisibleCookie = Cookies.get('diceVisible');
  //   setIsDiceVisible(diceVisibleCookie !== 'false');
  // }, []);

  // const toggleDiceDisplay = () => {
  //   const newValue = !isDiceVisible;
  //   setIsDiceVisible(newValue);
  //   Cookies.set('diceVisible', newValue.toString(), { expires: 1 });
  // };

  if (loading) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <Loading message="" size="sm" />
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="relative">
        <Sidebar collapsible="offcanvas">
          <AppSidebar />
        </Sidebar>
        <SidebarTrigger />
        <div className="relative">
          <section className="d-flex align-items-center justify-content-center text-center mt-60">
            {/* <div className="position-absolute top-0 start-0 end-0 bottom-0"></div> */}
            <Container className="position-relative text-white">
              <Row className="justify-content-center">
                <Col lg={8}>
                  <h1
                    className="display-3 fw-bold mb-4"
                    style={{ fontFamily: 'Montserrat' }}
                  >
                    Forge Your Next Great Adventure
                  </h1>
                  <p className="font-italic">
                    Manage your campaigns, track quests, and bring your party together—all in one
                    place.
                  </p>
                  <JoinUsButton homeButtonText={homeButtonText} />
                  <DiceRoller />
                </Col>
              </Row>
            </Container>
          </section>
          <About />
          <Testimonials />
          {/* <CharacterClassesCards />
          <CharacterRacesCards /> */}
          <ReviewForm />
        </div>
      </div>
    </SidebarProvider>
  );
}
