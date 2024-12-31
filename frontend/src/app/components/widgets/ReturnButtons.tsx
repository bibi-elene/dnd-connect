'use client';

import { useNavigate } from '@/app/utils/navigation';
import { useRouter } from 'next/navigation';
import { ButtonGroup, Container } from 'react-bootstrap';

interface ReturnButtonsProps {
  fallbackUrl?: string;
  className?: string;
  buttonText?: string;
  withDashboardButton?: boolean;
}

const ReturnButtons: React.FC<ReturnButtonsProps> = ({
  className = '',
  buttonText = 'Back',
  withDashboardButton = true,
}) => {
  const router = useRouter();
  const { goToHome, goToDashboard } = useNavigate();

  const handleBack = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      goToHome();
    }
  };

  return (
    <Container
      fluid
      className={`position-fixed top-0 start-0 p-3 d-flex ${className}`}
      style={{ zIndex: 3 }}
    >
      <ButtonGroup>
        <button
          onClick={withDashboardButton ? handleBack : () => router.push('/')}
          className="return-cancel-button"
        >
          &#8592; {buttonText}
        </button>
        {withDashboardButton && (
          <button onClick={goToDashboard} className="return-primary-button ms-2">
            Dashboard
          </button>
        )}
      </ButtonGroup>
    </Container>
  );
};

export default ReturnButtons;
