import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/get-session';
import { prisma } from '@/lib/db/prisma';

export async function GET(req: Request) {
  try {
    const userId = await requireAuth();

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true }
    });

    const resume = await prisma.resume.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    const interviews = await prisma.interview.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    const progress = await prisma.userProgress.findUnique({
      where: { userId }
    });

    return NextResponse.json({
      user,
      latestResumeScore: resume?.atsScore || 0,
      recentInterviews: interviews,
      progress: progress || { totalInterviews: 0, averageScore: 0, skillsAssessed: [] }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
