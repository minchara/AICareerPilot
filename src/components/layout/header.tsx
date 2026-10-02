'use client';

import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  title?: string;
  onMenuToggle: () => void;
}

export function Header({ title = 'Dashboard', onMenuToggle }: HeaderProps) {
  const { data: session } = useSession();
  const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

  return (
    <header className="bg-white border-b sticky top-0 z-30">
      {isDemo && (
        <div className="bg-amber-100 text-amber-800 px-4 py-2 text-sm text-center font-medium">
          🎯 Demo Mode - Showing sample data. Configure OPENAI_API_KEY for real AI analysis.
        </div>
      )}
      <div className="px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuToggle}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
                  <AvatarFallback>{session?.user?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem className="flex flex-col items-start">
                <span className="text-sm font-medium">{session?.user?.name || 'User'}</span>
                <span className="text-xs text-gray-500">{session?.user?.email || ''}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
