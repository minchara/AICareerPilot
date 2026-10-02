import { chatCompletion, isDemoMode } from '../client';
import { ROADMAP_GENERATION_PROMPT } from '../prompts/roadmap-generation';
import { RoadmapSchema, parseAIJson } from '../schemas';
import { DEMO_ROADMAP } from '../demo-data';
import type { GeneratedRoadmap } from '@/types';

export async function generateRoadmap(params: {
  targetRole: string;
  currentSkills: string[];
  skillGaps: string[];
  experienceLevel: string;
  interviewPerformance?: string;
}): Promise<GeneratedRoadmap> {
  if (isDemoMode()) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return DEMO_ROADMAP;
  }

  try {
    const prompt = ROADMAP_GENERATION_PROMPT
      .replace('{targetRole}', params.targetRole)
      .replace('{currentSkills}', params.currentSkills.join(', ') || 'Not specified')
      .replace('{skillGaps}', params.skillGaps.join(', ') || 'Not specified')
      .replace('{experienceLevel}', params.experienceLevel)
      .replace('{interviewPerformance}', params.interviewPerformance || 'No previous interviews');

    const response = await chatCompletion(prompt, 'Generate the preparation roadmap', 0.5);
    return parseAIJson(response, RoadmapSchema);
  } catch (error) {
    console.error('Roadmap generation failed:', error);
    return DEMO_ROADMAP;
  }
}
