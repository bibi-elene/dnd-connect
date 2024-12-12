'use client';

import { useNavigate } from '@/app/utils/navigation';
import { useRouter } from 'next/navigation';
import { Button, ButtonGroup, Container } from 'react-bootstrap';

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
        <Button
          variant="secondary"
          onClick={withDashboardButton ? handleBack : () => router.push('/')}
          className="me-2 rounded pe-4"
        >
          &#8592; {buttonText}
        </Button>
        {withDashboardButton && (
          <Button variant="primary" onClick={goToDashboard} className="rounded">
            Dashboard
          </Button>
        )}
      </ButtonGroup>
    </Container>
  );
};

export default ReturnButtons;
