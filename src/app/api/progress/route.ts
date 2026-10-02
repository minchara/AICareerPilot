import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/get-session';
import { prisma } from '@/lib/db/prisma';

export async function GET(req: Request) {
  try {
    const userId = await requireAuth();

    let progress = await prisma.userProgress.findUnique({
      where: { userId }
    });

    if (!progress) {
      const interviews = await prisma.interview.findMany({
        where: { userId, status: 'completed' }
      });
      
      const total = interviews.length;
      const avgScore = total > 0 ? interviews.reduce((acc, i) => acc + ((i.report as any)?.overallScore || 0), 0) / total : 0;
      
      progress = await prisma.userProgress.create({
        data: {
          userId,
          totalInterviews: total,
          averageScore: avgScore,
          skillsAssessed: []
        }
      });
    }

    return NextResponse.json(progress);
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
