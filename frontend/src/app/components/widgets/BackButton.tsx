'use client';

import { useRouter } from 'next/navigation';

interface BackButtonProps {
  fallbackUrl?: string;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  fallbackUrl = '/',
  className = '',
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push(fallbackUrl);
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`absolute top-10 left-10 bg-gray-500 text-white px-3 py-1.5 rounded shadow-lg hover:bg-gray-600 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${className}`}
    >
      &#8592; Back
    </button>
  );
};

export default BackButton;
