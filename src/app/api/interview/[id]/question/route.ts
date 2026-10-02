import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/get-session';
import { prisma } from '@/lib/db/prisma';
import { evaluateAnswer } from '@/lib/ai/services/interview-service';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const userId = await requireAuth();
    const { id } = params;

    const interview = await prisma.interview.findUnique({
      where: { id },
      include: { questions: { include: { answer: true } } },
    });

    if (!interview || interview.userId !== userId) {
      return NextResponse.json({ error: 'Unauthorized or not found' }, { status: 404 });
    }

    const nextQuestion = interview.questions.find((q) => !q.answer);

    return NextResponse.json(nextQuestion || { completed: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const userId = await requireAuth();
    const { id } = params;
    const { answerText, codeAnswer, language, questionId } = await req.json();

    const question = await prisma.interviewQuestion.findUnique({
      where: { id: questionId },
      include: { interview: true },
    });

    if (!question || question.interview.userId !== userId) {
      return NextResponse.json({ error: 'Unauthorized or not found' }, { status: 404 });
    }

    const evaluation = await evaluateAnswer(question.questionText, answerText, codeAnswer);

    const answer = await prisma.interviewAnswer.create({
      data: {
        questionId,
        answerText,
        codeAnswer,
        language,
        score: evaluation.score,
        feedback: evaluation.feedback,
        metrics: evaluation.metrics as any,
      },
    });

    const interview = await prisma.interview.findUnique({
      where: { id },
      include: { questions: { include: { answer: true } } },
    });
    
    const nextQuestion = interview?.questions.find((q) => !q.answer);

    return NextResponse.json({ 
      evaluation, 
      hasMore: !!nextQuestion 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
