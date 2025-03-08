'use client';

import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from '@/app/utils/navigation';
import '../DiceRoller/DiceRoller.styles.scss';

const JoinUsButton: React.FC<{ homeButtonText?: string | null }> = ({ homeButtonText }) => {
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
    <div className="py-10 flex justify-start w-100">
      <button type="button" onClick={handleClick} className="main-button">
        {homeButtonText}
      </button>
    </div>
  );
};

export default JoinUsButton;
