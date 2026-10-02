import { chatCompletion, isDemoMode } from '../client';
import { RESUME_ANALYSIS_PROMPT } from '../prompts/resume-analysis';
import { ResumeAnalysisSchema, parseAIJson } from '../schemas';
import { DEMO_RESUME_ANALYSIS } from '../demo-data';
import type { ResumeAnalysis } from '@/types';

export async function analyzeResume(resumeText: string): Promise<ResumeAnalysis> {
  if (isDemoMode()) {
    // Simulate processing delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 2000));
    return DEMO_RESUME_ANALYSIS;
  }

  try {
    const response = await chatCompletion(
      RESUME_ANALYSIS_PROMPT,
      `Analyze this resume:\n\n${resumeText}`,
      0.3
    );
    return parseAIJson(response, ResumeAnalysisSchema);
  } catch (error) {
    console.error('Resume analysis failed:', error);
    // Fallback to demo data on failure
    return DEMO_RESUME_ANALYSIS;
  }
}
