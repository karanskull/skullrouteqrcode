import React from 'react';
import { ScratchArea } from './ScratchArea';
import { RewardDisplay } from './RewardDisplay';

interface ScratchCardProps {
  code: string;
  amount: string;
  description: string;
}

export function ScratchCard({ code, amount, description }: ScratchCardProps) {
  const [isRevealed, setIsRevealed] = React.useState(false);

  return (
    <div className="space-y-3 sm:space-y-6">
      <div className="relative bg-gray-50 rounded-lg overflow-hidden" 
           style={{ 
             minHeight: "280px", 
             height: "calc(100vw - 24px)",
             maxHeight: "340px" 
           }}>
        <RewardDisplay 
          amount={amount}
          description={description}
          code={code}
          isRevealed={isRevealed}
        />
        {!isRevealed && <ScratchArea onRevealed={() => setIsRevealed(true)} />}
      </div>
      
      <div className="text-center text-[11px] sm:text-sm text-gray-500">
        {!isRevealed ? 'Scratch the card to reveal your reward' : 'Your reward has been revealed!'}
      </div>
    </div>
  );
}