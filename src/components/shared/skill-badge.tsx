import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SkillBadgeProps {
  skill: string;
  variant?: 'matched' | 'missing' | 'neutral' | 'suggested';
}

export function SkillBadge({ skill, variant = 'neutral' }: SkillBadgeProps) {
  const variantStyles = {
    matched: 'bg-green-100 text-green-800 hover:bg-green-200 border-green-200',
    missing: 'bg-red-100 text-red-800 hover:bg-red-200 border-red-200',
    suggested: 'bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200',
    neutral: 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200',
  };

  return (
    <Badge variant="outline" className={cn("px-2 py-1 font-medium", variantStyles[variant])}>
      {skill}
    </Badge>
  );
}
