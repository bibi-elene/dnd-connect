'use client';

import { useContext } from 'react';
import { AuthContext } from './components/AuthContext';
import DiceRoller from './components/DiceRoller/DiceRoller';
import Navbar from './components/widgets/NavBar';

export default function Home() {
  const { user, logout } = useContext(AuthContext);

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
        <DiceRoller />
      </div>
    </div>
  );
}
