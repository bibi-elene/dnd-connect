'use client';

import { useRouter } from 'next/navigation';

const JoinUsButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/auth/login');
  };

  return (
    <div className="p-10 flex justify-center">
      <button
        type="button"
        onClick={handleClick}
        className="btn btn-primary px-5 py-3 text-lg font-semibold shadow-lg rounded-full transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
        style={{
          background:
            'linear-gradient(90deg, rgba(33, 150, 243, 1) 0%, rgba(30, 136, 229, 1) 50%, rgba(21, 101, 192, 1) 100%)',
          border: 'none',
        }}
      >
        🚀 Join Us Now
      </button>
    </div>
  );
};

export default JoinUsButton;
