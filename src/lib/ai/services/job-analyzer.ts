import { chatCompletion, isDemoMode } from '../client';
import { JOB_DESCRIPTION_ANALYSIS_PROMPT, JOB_MATCH_ANALYSIS_PROMPT } from '../prompts/job-description';
import { JobAnalysisSchema, JobMatchAnalysisSchema, parseAIJson } from '../schemas';
import { DEMO_JOB_ANALYSIS, DEMO_JOB_MATCH } from '../demo-data';
import type { JobAnalysis } from '@/types';

export async function analyzeJobDescription(description: string): Promise<JobAnalysis> {
  if (isDemoMode()) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return DEMO_JOB_ANALYSIS;
  }

  try {
    const response = await chatCompletion(
      JOB_DESCRIPTION_ANALYSIS_PROMPT,
      `Analyze this job description:\n\n${description}`,
      0.3
    );
    return parseAIJson(response, JobAnalysisSchema);
  } catch (error) {
    console.error('Job description analysis failed:', error);
    return DEMO_JOB_ANALYSIS;
  }
}

export async function analyzeJobMatch(
  resumeSkills: string[],
  requiredSkills: string[],
  preferredSkills: string[]
): Promise<typeof DEMO_JOB_MATCH> {
  if (isDemoMode()) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return DEMO_JOB_MATCH;
  }

  try {
    const prompt = JOB_MATCH_ANALYSIS_PROMPT
      .replace('{resumeSkills}', resumeSkills.join(', '))
      .replace('{requiredSkills}', requiredSkills.join(', '))
      .replace('{preferredSkills}', preferredSkills.join(', '));

    const response = await chatCompletion(prompt, 'Perform the match analysis', 0.3);
    return parseAIJson(response, JobMatchAnalysisSchema);
  } catch (error) {
    console.error('Job match analysis failed:', error);
    return DEMO_JOB_MATCH;
  }
}
