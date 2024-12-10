'use client';

import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate } from '@/app/utils/navigation';

const JoinUsButton = () => {
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
    <div className="p-10 flex justify-center">
      <button
        type="button"
        onClick={handleClick}
        className="btn btn-primary px-5 py-3 text-lg font-semibold shadow-lg rounded-full transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
        style={{
          border: 'none',
        }}
      >
        🚀 Start Exploring
      </button>
    </div>
  );
};

export default JoinUsButton;
