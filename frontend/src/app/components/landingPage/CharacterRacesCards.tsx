import { useState } from 'react';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';
import Image from 'next/image';
import data from '@/app/data/data.json';

interface CharacterRace {
  name: string;
  img: string;
  description: string;
  traits: string[];
}

const traitIcons: Record<string, string> = {
  Darkvision: 'bi bi-eye-fill',
  'Keen Senses': 'bi bi-bullseye',
  Lucky: 'bi bi-star-fill',
  Brave: 'bi bi-shield-fill-check',
  'Breath Weapon': 'bi bi-fire',
  Resistance: 'bi bi-shield-shaded',
  'Extra Skill': 'bi bi-lightbulb-fill',
  'Flexible Stats': 'bi bi-sliders',
};

const CharacterRacesCards = () => {
  const [selectedRace, setSelectedRace] = useState<CharacterRace | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleShow = (race: CharacterRace) => {
    setSelectedRace(race);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedRace(null);
  };

  return (
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
      <div className="position-absolute top-0 start-0 end-0 bottom-0 bg-black bg-opacity-75"></div>
      <Container className="position-relative text-white">
        <h2
          className="text-center display-4 fw-bold mb-5"
          style={{ fontFamily: 'Cinzel Decorative' }}
        >
          Species
        </h2>
        <Row>
          {data.metadata.species.map((race, idx) => (
            <Col md={6} lg={3} key={idx} className="mb-4">
              <Card
                className="bg-dark text-white border-0 card-img"
                onClick={() => handleShow(race)}
                style={{ cursor: 'pointer' }}
              >
                <Card.Img src={race.img} alt={race.name} />
                <Card.ImgOverlay className="card-img-overlay">
                  <Card.Title className="display-6 fw-bold">{race.name}</Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {selectedRace && (
        <Modal size="lg" show={showModal} onHide={handleClose} centered className="custom-modal">
          <Modal.Header closeButton className="text-white">
            <Modal.Title className="text-white">{selectedRace.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container fluid>
              <Row className="align-items-center">
                <Col md={6} className="text-center">
                  <Image
                    src={selectedRace.img}
                    alt={selectedRace.name}
                    className="img-fluid rounded shadow"
                    width={400}
                    height={100}
                    loading="lazy"
                  />
                </Col>
                <Col md={6}>
                  <h5 className="text-white mb-3">{selectedRace.description}</h5>
                  <div className="traits-container">
                    <h6 className="text-warning mb-2">Traits:</h6>
                    <ul className="list-unstyled">
                      {selectedRace.traits.map((trait, index) => (
                        <li key={index} className="d-flex align-items-start mb-2">
                          <span className="badge bg-primary me-2">
                            <i className={traitIcons[trait] || 'bi bi-check-circle'}></i>
                          </span>
                          <span className="text-white">{trait}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
      )}
    </section>
  );
};

export default CharacterRacesCards;
