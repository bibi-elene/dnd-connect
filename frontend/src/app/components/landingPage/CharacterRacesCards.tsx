import { characterRaces } from '@/app/utils/constants';
import { Container, Row, Col, Card } from 'react-bootstrap';

const CharacterRacesCards = () => (
  <section
    id="races"
    className="py-5 position-relative"
    style={{
      backgroundImage: `url('/assets/adventure2.jpg')`,
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
        Races
      </h2>
      <Row>
        {characterRaces.map((cls, idx) => (
          <Col md={6} lg={3} key={idx} className="mb-4">
            <Card className="bg-dark text-white border-0 card-img">
              <Card.Img src={cls.img} alt={cls.name} />
              <Card.ImgOverlay className="card-img-overlay">
                <Card.Title className="display-6 fw-bold">{cls.name}</Card.Title>
                <Card.Text>{cls.description}</Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  </section>
);

export default CharacterRacesCards;
