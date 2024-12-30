import React from 'react';
import { Copy } from 'lucide-react';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import skullLogo from '../images/skull-svg.png';

interface RewardDisplayProps {
  amount: string;
  description: string;
  code: string;
  isRevealed: boolean;
}

export function RewardDisplay({ amount, description, code, isRevealed }: RewardDisplayProps) {
  const { copy, copied } = useCopyToClipboard();

  if (!isRevealed) {
    return null;
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white animate-fade-in">
      <img 
        src={skullLogo} 
        alt="Logo" 
        className="w-16 h-auto object-contain mb-6" 
      />
      <div className="text-4xl font-bold text-black tracking-tight">{amount}</div>
      <div className="text-zinc-600 mt-2">{description}</div>
      <div className="text-zinc-500 mt-3">Use code: <span className="font-mono font-medium text-black">{code}</span></div>
      
      <div className="flex flex-col gap-3 mt-6">
        <button
          onClick={() => copy(code)}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-black rounded-full 
                   text-sm font-medium border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 
                   transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-200"
        >
          <Copy size={16} />
          {copied ? 'Copied!' : 'Copy Code'}
        </button>

        <a 
          href="https://skullroute.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-2.5 bg-black text-white rounded-full 
                   text-sm font-medium hover:bg-zinc-800 transition-colors focus:outline-none 
                   focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Shop Now
        </a>
      </div>
    </div>
  );
}