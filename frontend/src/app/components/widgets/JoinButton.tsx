'use client';

import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate } from '@/app/utils/navigation';
import '../DiceRoller/DiceRoller.styles.scss';

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
    <div className="p-10 flex justify-center w-100 justify-center">
      <button type="button" onClick={handleClick} className="main-button p-10">
        {user ? '🚀 Sign Up' : '🚀 Explore'}
      </button>
    </div>
  );
};

export default JoinUsButton;
