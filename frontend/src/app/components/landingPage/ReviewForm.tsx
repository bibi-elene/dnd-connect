import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const ReviewForm = () => (
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
            <Button variant="primary" type="submit">
              Submit Review
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  </section>
);

export default ReviewForm;
