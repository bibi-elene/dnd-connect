'use client';

import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from '@/app/utils/navigation';
import './FramerButton.styles.scss';

const FramerButton = ({ text }: { text: string }) => {
  const { goToDashboard, goToRegister } = useNavigate();
  const { user } = useContext(AuthContext);

  const handleClick = () => {
    if (user) {
      goToDashboard();
    } else {
      goToRegister();
    }
  };

  return (
    <button
      className="relative overflow-hidden px-6 py-3 mt-7 text-lg font-bold text-white bg-transparent border-4 border-white/40 rounded-lg transition-all duration-300 group hover:border-white button"
      aria-label="Join D&D Connect"
      onClick={handleClick}
    >
      <span className="flex items-center gap-2 transition-all duration-300">
        {/* Left Icon */}
        <span className="w-5 h-5 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-x-2">
          <svg viewBox="0 0 10 15" fill="currentColor" className="w-full h-full">
            <path d="M 10 0 L 10 5 L 5 5 L 0 0 Z M 0 5 L 5 5 L 10 10 L 5 10 L 5 15 L 0 10 Z" />
          </svg>
        </span>

        {text}

        {/* Right Arrow Icon */}
        <span className="w-5 h-5 arrow-icon">
          <svg
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-full h-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </span>
      </span>
    </button>
  );
};

export default FramerButton;
