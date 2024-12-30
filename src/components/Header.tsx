import React from 'react';
import skullLogo from '../images/skull-svg.png';

export function Header() {
  return (
    <header className="w-full bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-center items-center">
          <img src={skullLogo} alt="Logo" className="w-32 h-auto object-contain" />
        </div>
      </div>
    </header>
  );
}