import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/get-session';
import { prisma } from '@/lib/db/prisma';
import { analyzeJobDescription, analyzeJobMatch } from '@/lib/ai/services/resume-analyzer';

export async function POST(req: Request) {
  try {
    const userId = await requireAuth();
    const { title, company, description } = await req.json();

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description required' }, { status: 400 });
    }

    const jdAnalysis = await analyzeJobDescription(description);

    const latestResume = await prisma.resume.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    let matchAnalysis = null;
    if (latestResume) {
      matchAnalysis = await analyzeJobMatch(latestResume.content, description);
    }

    const job = await prisma.jobDescription.create({
      userId,
      title,
      company,
      content: description,
      analysis: matchAnalysis || jdAnalysis,
    });

    return NextResponse.json({ success: true, analysis: matchAnalysis || jdAnalysis, job });
  } catch (error) {
    console.error('Job analysis error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
