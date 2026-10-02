import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/get-session';
import { prisma } from '@/lib/db/prisma';
import { generateQuestions } from '@/lib/ai/services/interview-service';

export async function POST(req: Request) {
  try {
    const userId = await requireAuth();
    const config = await req.json();

    const questions = await generateQuestions(config);

    const interview = await prisma.interview.create({
      data: {
        userId,
        type: config.type,
        role: config.role,
        level: config.level,
        status: 'in_progress',
        questions: {
          create: questions.map((q: any) => ({
            questionText: q.question,
            expectedSkills: q.skills || [],
          })),
        },
      },
      include: {
        questions: true,
      },
    });

    return NextResponse.json({ 
      success: true, 
      interviewId: interview.id, 
      firstQuestion: interview.questions[0] 
    });
  } catch (error) {
    console.error('Interview create error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
