'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from '@/app/utils/navigation';
import { DropDownArrowIcon } from '../icons/DropDownArrowIcon';
import './NavBar.styles.scss';

interface NavbarProps {
  user: { username: string } | null;
  logout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, logout }) => {
  const { goToLogin, goToDashboard } = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('#account-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isDropdownOpen]);

  return (
    <nav className="navbar fixed top-0 left-0 w-full z-50">
      <div className="navbar-container container mx-auto">
        {/* Navigation Links */}
        <div className="navbar-links">
          <a href="#" className="navbar-link">
            Home
          </a>
          <a href="#features" className="navbar-link">
            Features
          </a>
          <a href="#about" className="navbar-link">
            About
          </a>
          <a href="#contact" className="navbar-link">
            Contact
          </a>
        </div>

        <div id="account-dropdown" className="account-dropdown">
          {user ? (
            <div>
              <button
                className="flex navbar-user items-center space-x-2 focus:outline-none group"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {user.username}
                <DropDownArrowIcon />
              </button>
              {isDropdownOpen && (
                <div className="account-dropdown-menu">
                  <button onClick={goToDashboard}>
                    <span>Account Settings</span>
                  </button>
                  <button onClick={logout}>
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={goToLogin} className="navbar-user">
              Log In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
