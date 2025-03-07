import { Container, Row, Col, Form } from 'react-bootstrap';
import './LandingPage.styles.scss';

const ReviewForm = () => (
  <section
    id="review"
    className="relative py-20 text-white overflow-hidden"
    style={{
      backgroundImage: `url('/assets/topography.svg')`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}
  >
    {/* Top gradient */}
    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"></div>

    {/* Bottom gradient */}
    {/* <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none"></div> */}

    <Container className="relative text-white">
      <h2
        className="text-center display-4 fw-bold mb-5"
      >
        Leave a Review
      </h2>
      <Row className="justify-content-center">
        <Col md={6} lg={6} sm={8}>
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
            <button type="submit" className="secondary-custom-button">
              Submit Review
            </button>
          </Form>
        </Col>
      </Row>
    </Container>
  </section>
);

export default ReviewForm;
