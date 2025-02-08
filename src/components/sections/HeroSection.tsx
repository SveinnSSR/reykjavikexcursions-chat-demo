// src/components/sections/HeroSection.tsx
import React from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image 
          src="/images/hero/background.webp"
          alt="Iceland Landscape"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl sm:text-6xl font-bold mb-12 tracking-tight">
            START YOUR ADVENTURE NOW
          </h1>

          {/* Search Box */}
          <div className="bg-white rounded-lg shadow-xl p-6 mx-auto max-w-3xl">
            <div className="grid md:grid-cols-3 gap-4">
              {/* When */}
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-2">
                  When
                </label>
                <button className="w-full flex items-center justify-between px-4 py-3 border rounded-md bg-white text-gray-700 hover:border-gray-400 transition-colors">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span>Any Time</span>
                  </div>
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              {/* Type of Tour */}
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-2">
                  Type of Tour
                </label>
                <button className="w-full flex items-center justify-between px-4 py-3 border rounded-md bg-white text-gray-700 hover:border-gray-400 transition-colors">
                  <span>All Tours</span>
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-4 rounded-md transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Special Offer Badge */}
        <div className="absolute top-1/4 right-8 md:right-24">
          <div className="bg-teal-500 text-white p-4 rounded-lg transform rotate-6 shadow-lg">
            <div className="text-2xl font-bold leading-none">SPECIAL</div>
            <div className="text-2xl font-bold leading-none">OFFER</div>
            <div className="text-5xl font-bold leading-tight">15%</div>
            <div className="text-2xl font-bold leading-none">OFF</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
