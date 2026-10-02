'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface ScoreCardProps {
  title: string;
  score: number;
  maxScore?: number;
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ScoreCard({ title, score, maxScore = 100, subtitle, size = 'md' }: ScoreCardProps) {
  const percentage = Math.min(100, Math.max(0, (score / maxScore) * 100));
  
  // Calculate color based on percentage
  let colorClass = 'text-red-500';
  let strokeClass = 'stroke-red-500';
  if (percentage >= 80) {
    colorClass = 'text-green-500';
    strokeClass = 'stroke-green-500';
  } else if (percentage >= 60) {
    colorClass = 'text-yellow-500';
    strokeClass = 'stroke-yellow-500';
  } else if (percentage >= 40) {
    colorClass = 'text-orange-500';
    strokeClass = 'stroke-orange-500';
  }

  const radius = size === 'lg' ? 45 : size === 'md' ? 35 : 25;
  const strokeWidth = size === 'lg' ? 8 : size === 'md' ? 6 : 4;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const sizeClass = size === 'lg' ? 'h-32 w-32' : size === 'md' ? 'h-24 w-24' : 'h-16 w-16';

  return (
    <Card className="flex flex-col items-center justify-center p-6 text-center">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">{title}</h3>
      <div className={cn("relative flex items-center justify-center", sizeClass)}>
        <svg
          height={radius * 2}
          width={radius * 2}
          className="-rotate-90 transform"
        >
          <circle
            stroke="#e5e7eb"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className={cn("transition-all duration-1000 ease-in-out", strokeClass)}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className={cn("font-bold", colorClass, size === 'lg' ? 'text-3xl' : size === 'md' ? 'text-2xl' : 'text-lg')}>
            {score}
          </span>
          {size !== 'sm' && <span className="text-xs text-gray-500">/ {maxScore}</span>}
        </div>
      </div>
      {subtitle && <p className="mt-4 text-sm text-gray-500">{subtitle}</p>}
    </Card>
  );
}
