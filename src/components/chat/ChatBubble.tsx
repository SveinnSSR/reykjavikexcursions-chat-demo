// src/components/chat/ChatBubble.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
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

    console.log('Making request to:', process.env.NEXT_PUBLIC_API_URL + '/chat');
    console.log('Using API key:', process.env.NEXT_PUBLIC_API_KEY);

    setMessages(prev => [...prev, { type: 'user', content: input }]);
    setInput('');
    setIsLoading(true);

    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
        },
        body: JSON.stringify({ message: input }),
      });

      console.log('Response status:', response.status);

      const data = await response.json();
      setMessages(prev => [...prev, { type: 'bot', content: data.message }]);
    } catch (error) {
      console.error('Error:', error);
        // Add more detailed error logging
        if (error instanceof Error) {
            console.error('Error details:', error.message);
        }
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
          className="bg-[#4AA19E]/90 hover:bg-[#4AA19E] text-white rounded-full px-6 py-3 shadow-lg transition-all duration-200 flex items-center gap-2 backdrop-blur-md"
          style={{
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2), 0 0 15px rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="relative h-8 w-8">
            <Image 
              src="/images/logo.png" 
              alt="RE Logo" 
              fill
              className="rounded-full bg-white p-1 object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Chat with us</span>
            <span className="text-xs opacity-80">Online</span>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="bg-white rounded-3xl shadow-2xl w-[400px] flex flex-col overflow-hidden"
          style={{
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2), 0 0 15px rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Header */}
          <div 
            className="text-white p-4 flex flex-col items-center gap-2"
            style={{
              background: 'rgba(74, 161, 158, 0.95)',
              backdropFilter: 'blur(8px)'
            }}
          >
            <div className="relative h-14 w-14 mb-1">
              <Image 
                src="/images/logo.png" 
                alt="RE Logo" 
                fill
                className="rounded-full bg-white p-1 object-contain"
              />
            </div>
            <div className="text-center">
              <h3 className="font-medium">Reykjavík Excursions</h3>
              <p className="text-xs opacity-80">Online</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 hover:bg-[#4AA19E] p-2 rounded-full transition-colors"
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
                  <div className="relative h-8 w-8 rounded-full bg-[#4AA19E] flex items-center justify-center text-white mr-2 flex-shrink-0">
                    <Image 
                      src="/images/logo.png" 
                      alt="RE Logo" 
                      fill
                      className="rounded-full bg-white p-1 object-contain"
                    />
                  </div>
                )}
                <div
                  className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-[#4AA19E] text-white ml-4'
                      : 'bg-white text-gray-800'
                  }`}
                  style={{
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    border: message.type === 'user' ? 
                      '1px solid rgba(255, 255, 255, 0.1)' : 
                      '1px solid rgba(0, 0, 0, 0.05)'
                  }}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl px-4 py-2">
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
                style={{
                  border: '1px solid #ddd',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#4AA19E] hover:bg-[#3a8f8c] text-white rounded-full px-6 h-10 flex items-center justify-center disabled:opacity-50 transition-colors text-sm font-medium"
                style={{
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
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
