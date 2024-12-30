import React, { useState } from 'react';
import { Copy, CheckCircle } from 'lucide-react';
import { ScratchArea } from './ScratchArea';

interface CouponCardProps {
  code: string;
  discount: string;
  description: string;
  expiryDate: string;
}

export function CouponCard({ code, discount, description, expiryDate }: CouponCardProps) {
  const [copied, setCopied] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-zinc-900 rounded-xl p-8 border border-zinc-800">
      <div className="space-y-4">
        <div>
          <h3 className="text-4xl font-bold text-white tracking-tight">{discount}</h3>
          <p className="text-zinc-400 mt-2 text-lg">{description}</p>
        </div>
      </div>
      
      <div className="mt-8">
        <ScratchArea code={code} onRevealed={() => setIsRevealed(true)} />
        
        {isRevealed && (
          <button
            onClick={copyToClipboard}
            className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-zinc-100 transition-colors"
          >
            {copied ? (
              <>
                <CheckCircle size={20} />
                <span>Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy size={20} />
                <span>Copy Code</span>
              </>
            )}
          </button>
        )}
      </div>
      
      <p className="text-sm text-zinc-500 mt-6">
        Valid until: {expiryDate}
      </p>
    </div>
  );
}