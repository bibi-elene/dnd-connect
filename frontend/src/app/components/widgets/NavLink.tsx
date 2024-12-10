'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from '@/app/utils/navigation';
import { LogoutIcon } from '../icons/LogoutIcon';
import { AccountSettingsIcon } from '../icons/AccountSettingsIcon';
import { DropDownArrowIcon } from '../icons/DropDownArrowIcon';

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
    <nav
      className="fixed top-0 left-0 w-full text-white shadow-md z-50"
      style={{ background: '#852e33' }}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Navigation Links */}
        <div
          className="flex items-center space-x-4"
          style={{ fontFamily: 'Cinzel Decorative' }}
        >
          <a href="#" className="text-lg font-bold hover:text-gray-300">
            Home
          </a>
          <a href="#features" className="hover:text-gray-300">
            Features
          </a>
          <a href="#about" className="hover:text-gray-300">
            About
          </a>
          <a href="#contact" className="hover:text-gray-300">
            Contact
          </a>
        </div>

        {/* User Dropdown or Login Button */}
        <div id="account-dropdown">
          {user ? (
            <div>
              <button
                className="flex items-center space-x-2 focus:outline-none"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="text-xl hover:text-gray-300">
                  {user.username}
                </span>
                <DropDownArrowIcon />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden w-48">
                  <button
                    onClick={goToDashboard}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <AccountSettingsIcon />
                    <span>Account Settings</span>
                  </button>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <LogoutIcon />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={goToLogin}
              className="hover:text-gray-300 text-xl"
              style={{ fontFamily: 'Cinzel' }}
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
