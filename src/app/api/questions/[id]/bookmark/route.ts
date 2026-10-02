import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/get-session';
import { prisma } from '@/lib/db/prisma';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const userId = await requireAuth();
    const { id } = params;

    const existing = await prisma.questionBookmark.findUnique({
      where: { userId_questionId: { userId, questionId: id } }
    });

    if (existing) {
      await prisma.questionBookmark.delete({
        where: { id: existing.id }
      });
      return NextResponse.json({ bookmarked: false });
    } else {
      await prisma.questionBookmark.create({
        data: { userId, questionId: id }
      });
      return NextResponse.json({ bookmarked: true });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
