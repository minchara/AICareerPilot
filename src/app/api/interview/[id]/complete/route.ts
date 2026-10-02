import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/get-session';
import { prisma } from '@/lib/db/prisma';
import { generateReport } from '@/lib/ai/services/interview-service';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const userId = await requireAuth();
    const { id } = params;

    const interview = await prisma.interview.findUnique({
      where: { id },
      include: { questions: { include: { answer: true } } },
    });

    if (!interview || interview.userId !== userId) {
      return NextResponse.json({ error: 'Not found or unauthorized' }, { status: 404 });
    }

    const reportData = await generateReport(interview);

    const updatedInterview = await prisma.interview.update({
      where: { id },
      data: {
        status: 'completed',
        report: reportData as any,
      },
    });

    // Update User Progress
    const progress = await prisma.userProgress.findUnique({ where: { userId } });
    if (progress) {
      await prisma.userProgress.update({
        where: { userId },
        data: {
          totalInterviews: progress.totalInterviews + 1,
          averageScore: (progress.averageScore * progress.totalInterviews + (reportData.overallScore || 0)) / (progress.totalInterviews + 1),
        },
      });
    }

    return NextResponse.json(updatedInterview.report);
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
