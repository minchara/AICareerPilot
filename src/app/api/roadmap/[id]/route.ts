import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/get-session';
import { prisma } from '@/lib/db/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const userId = await requireAuth();
    const { id } = params;

    const roadmap = await prisma.roadmap.findUnique({
      where: { id },
      include: { items: true }
    });

    if (!roadmap || roadmap.userId !== userId) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(roadmap);
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const userId = await requireAuth();
    const { id } = params;
    const { itemId, completed } = await req.json();

    const item = await prisma.roadmapItem.findUnique({
      where: { id: itemId },
      include: { roadmap: true }
    });

    if (!item || item.roadmap.userId !== userId || item.roadmapId !== id) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const updated = await prisma.roadmapItem.update({
      where: { id: itemId },
      data: { status: completed ? 'completed' : 'pending' }
    });

    return NextResponse.json({ success: true, item: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
