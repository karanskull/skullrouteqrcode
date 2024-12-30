import React from 'react';
import { ScratchCard } from './components/ScratchCard';
import { Header } from './components/Header';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-black px-6 py-5">
            <h1 className="text-white text-xl font-medium">Special Reward</h1>
            <p className="text-zinc-400 text-sm mt-1">Reveal your exclusive offer</p>
          </div>
          
          <div className="p-6">
            <ScratchCard 
              code="SPECIAL20"
              amount="20% OFF"
              description="on your next purchase"
            />
          </div>
        </div>
      </div>
    </div>
  );
}