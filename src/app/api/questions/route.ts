import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/get-session';
import { prisma } from '@/lib/db/prisma';

export async function GET(req: Request) {
  try {
    const userId = await requireAuth();
    const url = new URL(req.url);
    const category = url.searchParams.get('category');
    const difficulty = url.searchParams.get('difficulty');
    const search = url.searchParams.get('search');
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    let where: any = {};
    if (category) where.category = category;
    if (difficulty) where.difficulty = difficulty;
    if (search) {
      where.title = { contains: search, mode: 'insensitive' };
    }

    const questions = await prisma.questionBank.findMany({
      where,
      take: limit,
      skip: offset,
      include: {
        bookmarks: {
          where: { userId }
        }
      }
    });

    const formatted = questions.map((q) => ({
      ...q,
      bookmarked: q.bookmarks.length > 0
    }));

    return NextResponse.json({ items: formatted, total: await prisma.questionBank.count({ where }) });
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
