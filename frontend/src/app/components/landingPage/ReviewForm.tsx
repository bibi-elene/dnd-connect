'use client';

import { Container, Row, Col, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './LandingPage.styles.scss';

const ReviewForm = () => (
  <section id="review" className="relative py-20 text-white overflow-hidden">
    {/* Top gradient */}
    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"></div>

    <Container className="relative text-white">
      <motion.h2
        className="cursor-pointer text-center display-4 fw-bold mb-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        whileHover={{
          scale: 1.05,
        }}
      >
        Leave a Review
      </motion.h2>
      <Row className="justify-content-center">
        <Col md={6} lg={6} sm={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            whileHover={{ scale: 1.02 }}
          >
            <Form
              action="mailto:bibi.elene21@gmail.com"
              method="post"
              encType="text/plain"
              className="p-5 rounded-lg bg-black/40 backdrop-blur-md shadow-lg"
            >
              <Form.Group className="mb-4">
                <Form.Label className="text-white">Your Name</Form.Label>
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    className="input-effect text-white"
                  />
                </motion.div>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="text-white">Your Email</Form.Label>
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    className="input-effect"
                  />
                </motion.div>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="text-white">Your Review</Form.Label>
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Write your review here..."
                    className="input-effect"
                  />
                </motion.div>
              </Form.Group>
              <motion.button
                type="submit"
                className="secondary-custom-button w-full py-3 mt-3"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: '#ff6b6b',
                }}
                whileTap={{ scale: 0.95 }}
              >
                Submit Review
              </motion.button>
            </Form>
          </motion.div>
        </Col>
      </Row>
    </Container>
  </section>
);

export default ReviewForm;
