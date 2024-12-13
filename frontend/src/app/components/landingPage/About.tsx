import { Container, Row, Col } from 'react-bootstrap';

const About = () => (
  <section
    id="about"
    className="py-5 vh-100"
    style={{
      background: 'linear-gradient(135deg, rgba(30, 59, 114, 0.38), #2a5298)', // Gradient background
      color: 'white',
    }}
  >
    <Container>
      <Row className="justify-content-center text-center">
        <Col md={10} lg={8}>
          <h2
            className="display-4 fw-bold mb-4 text-uppercase"
            style={{ fontFamily: 'Cinzel Decorative' }}
          >
            About Us
          </h2>
          <p className="lead" style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
            D&D Connect is your gateway to a world of adventures, where players and Dungeon Masters
            come together to share their passion for storytelling. Join us and embark on
            unforgettable campaigns!
          </p>
        </Col>
      </Row>
    </Container>
  </section>
);

export default About;
