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
      <button onClick={onLogout} className="danger-custom-button">
        Log out
      </button>
    </div>
  </>
);

export default Header;
