import { Container, Row, Col } from 'react-bootstrap';

const Features = () => (
  <section id="features" className="py-5 bg-dark text-white">
    <Container>
      <Row className="justify-content-center text-center">
        <Col md={10} lg={8}>
          <h2
            className="display-4 fw-bold mb-4 text-uppercase"
            style={{ fontFamily: 'Cinzel Decorative' }}
          >
            Features
          </h2>
          <ul className="list-unstyled lead">
            <li className="mb-3">🎲 Connect with players and Dungeon Masters worldwide</li>
            <li className="mb-3">🗺️ Easily create and join campaigns</li>
            <li className="mb-3">📜 Access character creation and world-building resources</li>
            <li className="mb-3">💬 Real-time chat and collaboration with your party</li>
          </ul>
        </Col>
      </Row>
    </Container>
  </section>
);

export default Features;
