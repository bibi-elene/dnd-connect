import { Container, Row, Col } from 'react-bootstrap';

const Contact = () => (
  <section id="contact" className="py-5 bg-secondary text-white">
    <Container>
      <Row className="justify-content-center text-center">
        <Col md={10} lg={8}>
          <h2
            className="display-4 fw-bold mb-4 text-uppercase"
            style={{ fontFamily: 'Cinzel Decorative' }}
          >
            Contact Us
          </h2>
          <p className="lead mb-4">
            Have questions, feedback, or just want to say hello? We’d love to hear from you!
          </p>
          <p className="lead">
            📧 Email us at:{' '}
            <a href="mailto:bibi.elene21@gmail.com" className="text-warning fw-bold">
              bibi.elene21@gmail.com
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  </section>
);

export default Contact;
