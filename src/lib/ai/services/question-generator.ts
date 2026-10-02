import { chatCompletion, isDemoMode } from '../client';
import { QUESTION_GENERATION_PROMPT } from '../prompts/question-generation';
import { GeneratedQuestionsSchema, parseAIJson } from '../schemas';
import { DEMO_QUESTIONS } from '../demo-data';
import type { GeneratedQuestion, InterviewConfig } from '@/types';

export async function generateQuestions(config: InterviewConfig): Promise<GeneratedQuestion[]> {
  if (isDemoMode()) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return DEMO_QUESTIONS.slice(0, config.totalQuestions);
  }

  try {
    const prompt = QUESTION_GENERATION_PROMPT
      .replace('{role}', config.targetRole)
      .replace('{type}', config.type)
      .replace('{difficulty}', config.difficulty)
      .replace('{count}', String(config.totalQuestions))
      .replace('{experienceLevel}', config.experienceLevel)
      .replace('{context}', config.jobDescription || 'No specific job description provided');
    // Replace the second {count} occurrence
    const finalPrompt = prompt.replace('{count}', String(config.totalQuestions));

    const response = await chatCompletion(finalPrompt, 'Generate the interview questions', 0.7);
    return parseAIJson(response, GeneratedQuestionsSchema);
  } catch (error) {
    console.error('Question generation failed:', error);
    return DEMO_QUESTIONS.slice(0, config.totalQuestions);
  }
}
