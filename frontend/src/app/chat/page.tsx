'use client';

import { useContext } from 'react';
import Chat from '@/app/components/widgets/Chat';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { AuthContext } from '@/app/context/AuthContext';

export default function ChatPage() {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center">
        <Chat username={user.username} />
      </div>
    </ProtectedRoute>
  );
}
