import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/get-session';
import { prisma } from '@/lib/db/prisma';
import { generateRoadmap } from '@/lib/ai/services/roadmap-service';

export async function POST(req: Request) {
  try {
    const userId = await requireAuth();
    const { targetRole } = await req.json();

    const profile = await prisma.profile.findUnique({ where: { userId } });
    const resume = await prisma.resume.findFirst({ where: { userId }, orderBy: { createdAt: 'desc' } });

    const skills = [...(profile?.skills || []), ...((resume?.analysisResult as any)?.skills || [])];

    const roadmapData = await generateRoadmap(targetRole, skills);

    const roadmap = await prisma.roadmap.create({
      data: {
        userId,
        targetRole,
        items: {
          create: roadmapData.items.map((item: any) => ({
            title: item.title,
            description: item.description,
            type: item.type,
            status: 'pending',
            resources: item.resources || [],
            estimatedHours: item.estimatedHours || 0,
          }))
        }
      },
      include: { items: true }
    });

    return NextResponse.json({ success: true, roadmap });
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
