'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';
  
  // Try to generate a title based on pathname
  let title = 'Dashboard';
  if (pathname.includes('/resume')) title = 'Resume Analyzer';
  else if (pathname.includes('/jobs')) title = 'Job Analyzer';
  else if (pathname.includes('/interview')) title = 'Mock Interview';
  else if (pathname.includes('/questions')) title = 'Question Bank';
  else if (pathname.includes('/roadmap')) title = 'Roadmap';
  else if (pathname.includes('/progress')) title = 'Progress';
  else if (pathname.includes('/profile')) title = 'Profile';

  return (
    <DashboardLayout title={title}>
      {children}
    </DashboardLayout>
  );
}
