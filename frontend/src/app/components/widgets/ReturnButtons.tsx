'use client';

import { useNavigate } from '@/app/utils/navigation';
import { useRouter } from 'next/navigation';

interface ReturnButtonsProps {
  fallbackUrl?: string;
  className?: string;
}

const ReturnButtons: React.FC<ReturnButtonsProps> = ({ className = '' }) => {
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
    <div className="absolute top-10 left-10 flex space-x-4">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className={`bg-gray-500 text-white px-3 py-1.5 rounded shadow-lg hover:bg-gray-600 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${className}`}
      >
        &#8592; Back
      </button>

      {/* Dashboard Button */}
      <button
        onClick={goToDashboard}
        className="bg-blue-500 text-white px-3 py-1.5 rounded shadow-lg hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Dashboard
      </button>
    </div>
  );
};

export default ReturnButtons;