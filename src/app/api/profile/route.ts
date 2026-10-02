import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/get-session';
import { prisma } from '@/lib/db/prisma';

export async function GET(req: Request) {
  try {
    const userId = await requireAuth();
    
    const profile = await prisma.profile.findUnique({
      where: { userId }
    });

    if (!profile) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const userId = await requireAuth();
    const data = await req.json();

    const profile = await prisma.profile.update({
      where: { userId },
      data: {
        targetRole: data.targetRole,
        experienceLevel: data.experienceLevel,
        bio: data.bio,
        skills: data.skills
      }
    });

    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
