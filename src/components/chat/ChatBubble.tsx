// src/components/chat/ChatBubble.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { MessageCircle, ChevronUp } from 'lucide-react';
import Image from 'next/image';

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{type: 'user' | 'bot', content: string}>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          type: 'bot',
          content: "Hello! I'm your AI chatbot at Reykjavík Excursions. I can help you with tour information, bookings, and schedules. What would you like to know? 😊"
        }
      ]);
    }
  }, [isOpen, messages.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { type: 'user', content: input }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://reykjavikexcursions-chat-2025.vercel.app/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_CHAT_CLIENT_ID || '',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { type: 'bot', content: data.message }]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#4AA19E] hover:bg-[#3a8f8c] text-white rounded-full px-6 py-3 shadow-lg transition-all duration-200 flex items-center gap-2"
        >
          <MessageCircle size={20} />
          <span className="text-sm font-medium">Chat with us</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-3xl shadow-2xl w-[400px] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#003976] text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8">
                <Image 
                  src="/images/logo.png" 
                  alt="RE Logo" 
                  fill
                  className="rounded-full bg-white p-1 object-contain"
                />
              </div>
              <div>
                <h3 className="font-medium">Reykjavík Excursions</h3>
                <p className="text-xs opacity-80">Online</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:bg-[#004a99] p-2 rounded-full transition-colors"
            >
              <ChevronUp size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[400px] max-h-[400px] bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'bot' && (
                  <div className="h-8 w-8 rounded-full bg-[#4AA19E] flex items-center justify-center text-white mr-2 flex-shrink-0">
                    RE
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.type === 'user'
                      ? 'bg-[#4AA19E] text-white ml-4'
                      : 'bg-white text-gray-800 shadow-sm'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl px-4 py-2 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4AA19E]"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#4AA19E] hover:bg-[#3a8f8c] text-white rounded-full px-6 h-10 flex items-center justify-center disabled:opacity-50 transition-colors text-sm font-medium"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
