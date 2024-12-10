'use client';

import { useContext, useMemo } from 'react';
import { AuthContext } from './context/AuthContext';
import DiceRoller from './components/DiceRoller/DiceRoller';
import Navbar from './components/widgets/NavBar';
import JoinUsButton from './components/widgets/JoinButton';
import Loading from './components/widgets/Loading';

export default function Home() {
  const { user, logout, loading } = useContext(AuthContext);
  const homeButtonText = useMemo(
    () => (user ? '🚀 Explore' : '🚀 Sign Up'),
    [user]
  );

  if (loading) {
    return (
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
        <Loading message="" size="sm" />
      </div>
    );
  }

  return (
    <div
      className="relative flex flex-col min-h-screen"
      style={{
        backgroundImage: `url('/assets/tavern.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <Navbar user={user} logout={logout} />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative flex flex-grow flex-col items-center justify-center text-center">
        <h1
          className="text-4xl font-bold text-white"
          style={{ fontFamily: 'Cinzel Decorative' }}
        >
          Welcome to D&D Connect!
        </h1>
        <JoinUsButton homeButtonText={homeButtonText} />
        <DiceRoller />
      </div>
    </div>
  );
}
