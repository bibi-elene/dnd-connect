'use client';

import { useContext, useState, useEffect } from 'react';
import { AuthContext } from './components/AuthContext';
import DiceRoller from './components/widgets/DiceRoller';
import { useNavigate } from './utils/navigation';

export default function Home() {
  const { user, logout } = useContext(AuthContext);
  const { goToDashboard, goToLogin } = useNavigate();
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
    <div
      className="relative flex flex-col min-h-screen"
      style={{
        backgroundImage: `url('/assets/tavern.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <nav
        className="fixed top-0 left-0 w-full text-white shadow-md z-50"
        style={{ background: '#852e33' }}
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
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

          <div id="account-dropdown" className="relative">
            {user ? (
              <div>
                <button
                  className="flex items-center space-x-2 focus:outline-none"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="text-xl hover:text-gray-300">
                    {user.username}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06 0L10 10.94l3.71-3.73a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden w-48">
                    <button
                      onClick={() => goToDashboard()}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 8a2 2 0 114 0 2 2 0 01-4 0zm2 6a4.978 4.978 0 01-3.125-1.164.75.75 0 01.906-1.219A3.482 3.482 0 0010 13.5c.893 0 1.715-.293 2.219-.883a.75.75 0 011.062.052.75.75 0 01-.053 1.062A4.978 4.978 0 0110 14z" />
                      </svg>
                      <span>Account Settings</span>
                    </button>
                    <button
                      onClick={() => logout()}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 5a1 1 0 011-1h6a1 1 0 011 1v1h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-1H4a2 2 0 01-2-2V8a2 2 0 012-2h2V5zm2 3a1 1 0 100 2h4a1 1 0 100-2H8z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => goToLogin()}
                className="hover:text-gray-300 text-xl"
                style={{ fontFamily: 'Cinzel' }}
              >
                Log In
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative flex flex-grow flex-col items-center justify-center text-center">
        <h1
          className="text-4xl font-bold text-white"
          style={{ fontFamily: 'Cinzel Decorative' }}
        >
          Welcome to D&D Connect!
        </h1>
        <DiceRoller />
      </div>
    </div>
  );
}
