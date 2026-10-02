'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export function DemoBanner() {
  const [isVisible, setIsVisible] = useState(process.env.NEXT_PUBLIC_DEMO_MODE === 'true');

  if (!isVisible) return null;

  return (
    <div className="bg-amber-100 text-amber-900 px-4 py-3 flex items-center justify-between shadow-sm relative z-50">
      <div className="flex items-center gap-2 text-sm font-medium max-w-4xl mx-auto flex-1 justify-center">
        <span>🎯</span>
        <span>Demo Mode - Showing sample data. Configure OPENAI_API_KEY for real AI analysis.</span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="p-1 hover:bg-amber-200 rounded-md transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
