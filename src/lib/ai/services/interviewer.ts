import { chatCompletionWithHistory, isDemoMode } from '../client';
import { INTERVIEWER_SYSTEM_PROMPT } from '../prompts/interviewer';
import { DEMO_INTERVIEWER_INTRO, DEMO_INTERVIEWER_FOLLOWUP } from '../demo-data';

interface InterviewContext {
  type: string;
  role: string;
  difficulty: string;
  candidateContext: string;
}

export async function getInterviewerResponse(
  context: InterviewContext,
  messages: { role: 'user' | 'assistant'; content: string }[]
): Promise<string> {
  if (isDemoMode()) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (messages.length === 0) return DEMO_INTERVIEWER_INTRO;
    return DEMO_INTERVIEWER_FOLLOWUP;
  }

  try {
    const systemPrompt = INTERVIEWER_SYSTEM_PROMPT
      .replace('{type}', context.type)
      .replace('{role}', context.role)
      .replace('{difficulty}', context.difficulty)
      .replace('{candidateContext}', context.candidateContext);

    return await chatCompletionWithHistory(systemPrompt, messages, 0.7);
  } catch (error) {
    console.error('Interviewer response failed:', error);
    return DEMO_INTERVIEWER_FOLLOWUP;
  }
}
