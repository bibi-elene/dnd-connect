import { Button, Row, Col } from 'react-bootstrap';

interface HeaderProps {
  title: string;
  username?: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, username, onLogout }) => (
  <>
    <h1 className="text-2xl fw-semibold mb-0">{title}</h1>
    <div>
    <span className="me-3 fw-medium fs-5 text-muted">Hello, {username}</span>
    <Button onClick={onLogout} variant="danger" className="text-white shadow rounded-lg px-4 py-2">
      Log out
    </Button>
    </div>
  </>
);

export default Header;
