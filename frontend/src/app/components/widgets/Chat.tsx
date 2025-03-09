'use client';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import API_BASE_URL from '@/config';

const socket = io(API_BASE_URL || 'http://localhost:3001', {
  transports: ['websocket'],
  path: '/socket.io/',
  withCredentials: true,
});

const Chat = ({ username }: { username: string }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ username: string; message: string }[]>([]);
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    socket.emit('joinChat', username);

    socket.on('chatHistory', (history) => {
      console.log('Chat history:', history);
      setMessages(history);
    });

    socket.on('message', (data) => {
      console.log('New message:', data);
      setMessages((prev) => [...prev, data]);
    });

    socket.on('userList', (userList) => {
      setUsers(userList);
    });

    return () => {
      socket.off('chatHistory');
      socket.off('message');
      socket.off('userList');
    };
  }, [username]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('sendMessage', { username, message });
      setMessage('');
    }
  };

  return (
    <Card className="w-full max-w-xl p-4 shadow-lg bg-white">
      <h2 className="text-xl font-semibold mb-3">Live Chat</h2>
      <ScrollArea className="h-72 border rounded p-2 mb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.username === username ? 'text-right' : ''}`}>
            <span className="text-sm font-medium text-red">{msg.username}</span>
            <p className="bg-gray-100 p-2 rounded inline-block">{msg.message}</p>
          </div>
        ))}
      </ScrollArea>
      <div className="flex gap-2 text-black">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="text-black"
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
      <div className="mt-2 text-xs text-gray-400">Online: {users.join(', ')}</div>
    </Card>
  );
};

export default Chat;
