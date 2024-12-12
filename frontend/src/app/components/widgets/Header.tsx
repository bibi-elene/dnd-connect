import { Button, Container, Row, Col } from 'react-bootstrap';

interface HeaderProps {
  title: string;
  username?: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, username, onLogout }) => (
  <header className="border-bottom pb-4 mb-6">
    <Container fluid>
      <Row className="align-items-center">
        <Col>
          <h1 className="text-3xl fw-semibold text-gray-700">{title}</h1>
        </Col>
        <Col className="text-end">
          <span className="me-3 text-gray-700 fw-medium fs-5">Hello, {username}</span>
          <Button
            onClick={onLogout}
            variant="danger"
            className="text-white shadow rounded-lg px-4 py-2 transition hover:bg-red-600"
          >
            Log out
          </Button>
        </Col>
      </Row>
    </Container>
  </header>
);

export default Header;
