'use client';

import { useContext } from 'react';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { AuthContext } from '@/app/context/AuthContext';
import Chat from '@/app/components/widgets/Chat';
import Loading from '@/app/components/widgets/Loading';
import ReturnButton from '../components/widgets/ReturnButton';

export default function ChatPage() {
  return (
    <ProtectedRoute>
      <ChatContainer />
    </ProtectedRoute>
  );
}

const ChatContainer = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading message="Please wait..." size="sm" />;
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <ReturnButton />
      <Chat username={user.username} />
    </div>
  );
};
