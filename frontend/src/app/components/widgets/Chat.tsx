'use client';

import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import API_BASE_URL from '@/config';

const socket = io(API_BASE_URL || 'http://localhost:3001');

const Chat = ({ username }: { username: string }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ username: string; message: string }[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.emit('joinChat', username);

    socket.on('chatHistory', (history) => {
      setMessages(history);
      scrollToBottom();
    });

    socket.on('message', (data) => {
      setMessages((prev) => [...prev, data]);
      scrollToBottom();
    });

    socket.on('userList', (userList) => {
      setUsers(userList);
    });

    return () => {
      socket.emit('leaveChat', username);
      socket.off('chatHistory');
      socket.off('message');
      socket.off('userList');
    };
  }, [username]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('sendMessage', { username, message });
      setMessage('');
    }
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  return (
    <Card className="w-full max-w-xl p-4 shadow-lg bg-white">
      <h2 className="text-xl font-semibold mb-3">Live Chat</h2>
      <div
        className="h-72 border rounded p-2 mb-2 overflow-y-auto" // Make it scrollable
        ref={scrollRef}
      >
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.username === username ? 'text-right' : ''}`}>
            <span className="text-sm font-medium text-red">{msg.username}</span>
            <p className="bg-gray-100 p-2 rounded inline-block">{msg.message}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
      <div className="mt-2 text-xs text-gray-400">Online: {users.join(', ')}</div>
    </Card>
  );
};

export default Chat;
