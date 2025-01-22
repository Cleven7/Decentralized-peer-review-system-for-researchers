import { useState } from 'react';
import { Send, MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: Date;
}

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    user: {
      name: 'Dr. Sarah Chen',
      avatar: 'SC',
    },
    content: 'Has anyone worked with transformer models for climate prediction? Looking for insights on handling temporal dependencies.',
    timestamp: new Date('2024-03-20T10:30:00'),
  },
  {
    id: '2',
    user: {
      name: 'Prof. John Smith',
      avatar: 'JS',
    },
    content: "Yes, we've had success using attention mechanisms for long-term patterns. Happy to share our approach.",
    timestamp: new Date('2024-03-20T10:35:00'),
  },
];

export function ChatForum() {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      user: {
        name: 'Current User',
        avatar: 'CU',
      },
      content: newMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  return (
    <div className="gradient-border h-[600px] flex flex-col">
      <div className="p-4 border-b border-dark-700">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-emerald-400" />
          Research Discussion Forum
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-400/10 flex items-center justify-center text-sm font-medium text-emerald-400">
              {message.user.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-medium text-white">{message.user.name}</span>
                <span className="text-xs text-gray-400">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <p className="text-gray-300 mt-1">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-dark-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-dark-800 border border-dark-700 rounded-md px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-400 text-dark-900 rounded-md hover:bg-emerald-500 transition-colors emerald-glow"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}