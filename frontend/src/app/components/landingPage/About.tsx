import { Container, Row, Col } from 'react-bootstrap';
import PortalAnimation from '../widgets/PortalAnimation';

const About = () => {
  return (
    <section className="py-20 bg-[#0f131a] text-white">
      <Container>
        <Row className="justify-content-center text-center">
        <PortalAnimation />

          <Col lg={8}>
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: 'Cinzel Decorative' }}>
              Your Party's New HQ
            </h2>
            <p className="text-lg text-gray-400 mb-12">
              D&D Connect is your all-in-one toolkit to manage campaigns, track quests, and stay in
              sync with your party. Whether you're a Dungeon Master or an adventurer, we've got the
              tools you need to make every session legendary.
            </p>
          </Col>
        </Row>

        <Row className="text-center mt-12 flex flex-wrap">
          <Col md={3} className="mb-8 flex">
            <div className="flex flex-col p-6 bg-[#1a1f29] rounded-lg shadow-md hover:shadow-lg transition w-full">
              <div className="text-4xl mb-4">🎲</div>
              <h3 className="text-xl font-semibold mb-2">Campaign Tracking</h3>
              <p className="text-gray-400 mt-auto">Keep your adventures accessible all times.</p>
            </div>
          </Col>
          <Col md={3} className="mb-8 flex">
            <div className="flex flex-col p-6 bg-[#1a1f29] rounded-lg shadow-md hover:shadow-lg transition w-full">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold mb-2">Quest & NPC Management</h3>
              <p className="text-gray-400 mt-auto">
                Never lose track of vital storylines or characters again.
              </p>
            </div>
          </Col>
          <Col md={3} className="mb-8 flex">
            <div className="flex flex-col p-6 bg-[#1a1f29] rounded-lg shadow-md hover:shadow-lg transition w-full">
              <div className="text-4xl mb-4">🧙</div>
              <h3 className="text-xl font-semibold mb-2">Character Sheets & Tools</h3>
              <p className="text-gray-400 mt-auto">
                Access your stats, inventory, and spells in a click.
              </p>
            </div>
          </Col>
          <Col md={3} className="mb-8 flex">
            <div className="flex flex-col p-6 bg-[#1a1f29] rounded-lg shadow-md hover:shadow-lg transition w-full">
              <div className="text-4xl mb-4">🔔</div>
              <h3 className="text-xl font-semibold mb-2">Session Reminders</h3>
              <p className="text-gray-400 mt-auto">
                Stay synced with your party with timely notifications.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
