'use client';

import { Navbar, Nav, Container, Dropdown, Form } from 'react-bootstrap';
import { useNavigate } from '@/app/utils/navigation';
import { DropDownArrowIcon } from '../icons/DropDownArrowIcon';
import Image from 'next/image';
import './NavBar.styles.scss';

interface NavbarProps {
  user: { username: string } | null;
  logout: () => void;
  toggleDiceDisplay: () => void;
  isDiceVisible: boolean;
}
const CustomNavbar: React.FC<NavbarProps> = ({
  user,
  logout,
  toggleDiceDisplay,
  isDiceVisible,
}) => {
  const { goToLogin, goToDashboard } = useNavigate();
  return (
    <Navbar variant="dark" expand="lg" fixed="top" className="shadow">
      <Container>
        <Image
          width={100}
          height={100}
          src="/assets/dnd-logo.png"
          alt="D&D Connect Logo"
          className="h-10 me-2"
        />
        <Navbar.Brand href="#">D&D Connect</Navbar.Brand>
        <Form.Check
          type="switch"
          id="dice-visibility-toggle"
          label="🎲"
          className="text-white me-3"
          checked={isDiceVisible}
          onChange={toggleDiceDisplay}
        />
        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#classes">Classes</Nav.Link>
            <Nav.Link href="#races">Species</Nav.Link>
            <Nav.Link href="#review">Contacts</Nav.Link>
          </Nav>

          <Nav className="align-items-center flex-row justify-between">
            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="outline-light"
                  id="account-dropdown"
                  className="d-flex align-items-center"
                >
                  {user.username}
                  <DropDownArrowIcon />
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-end">
                  <Dropdown.Item onClick={goToDashboard}>Account Settings</Dropdown.Item>
                  <Dropdown.Item onClick={logout}>Log Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <button className="primary-custom-button" onClick={goToLogin}>
                Log In
              </button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
