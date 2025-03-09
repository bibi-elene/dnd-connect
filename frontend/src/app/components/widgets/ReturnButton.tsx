'use client';

import { useNavigate } from '@/app/utils/navigation';
import { useRouter } from 'next/navigation';
import { Container } from 'react-bootstrap';
import './FramerButton.styles.scss';

interface ReturnButtonProps {
  className?: string;
  buttonText?: string;
  withDashboardButton?: boolean;
}

const ReturnButton: React.FC<ReturnButtonProps> = ({
  className = '',
  buttonText = 'Back',
  withDashboardButton = false,
}) => {
  const router = useRouter();
  const { goToDashboard } = useNavigate();

  const handleBack = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      goToDashboard();
    }
  };

  return (
    <Container
      fluid
      className={`fixed bottom-0 start-10 p-3 d-flex gap-2 ${className}`}
      style={{ zIndex: 15 }}
    >
      <button
        onClick={handleBack}
        className="relative overflow-hidden px-4 py-2 text-sm font-bold text-white bg-transparent border-2 border-white/40 rounded-md transition-all duration-300 group hover:border-white"
      >
        <span className="flex items-center gap-1 transition-all duration-300 group-hover:gap-2">
          <span className="w-4 h-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-full h-full"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </span>
          {buttonText}
        </span>
      </button>

      {withDashboardButton && (
        <button
          onClick={goToDashboard}
          className="relative overflow-hidden px-4 py-2 text-sm font-bold text-white bg-transparent border-2 border-white/40 rounded-md transition-all duration-300 group hover:border-white"
        ></button>
      )}
    </Container>
  );
};

export default ReturnButton;
