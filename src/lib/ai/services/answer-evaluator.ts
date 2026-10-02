import { chatCompletion, isDemoMode } from '../client';
import { ANSWER_EVALUATION_PROMPT } from '../prompts/answer-evaluation';
import { AnswerEvaluationSchema, parseAIJson } from '../schemas';
import { DEMO_ANSWER_EVALUATION } from '../demo-data';
import type { AnswerEvaluation } from '@/types';

export async function evaluateAnswer(
  question: string,
  answer: string,
  questionType: string,
  difficulty: string
): Promise<AnswerEvaluation> {
  if (isDemoMode()) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Vary demo scores slightly based on answer length for realism
    const lengthBonus = Math.min(answer.length / 10, 15);
    return {
      ...DEMO_ANSWER_EVALUATION,
      overallScore: Math.min(100, Math.round(DEMO_ANSWER_EVALUATION.overallScore + lengthBonus - 5)),
    };
  }

  try {
    const prompt = ANSWER_EVALUATION_PROMPT
      .replace('{question}', question)
      .replace('{answer}', answer)
      .replace('{questionType}', questionType)
      .replace('{difficulty}', difficulty);

    const response = await chatCompletion(prompt, 'Evaluate the answer', 0.3);
    return parseAIJson(response, AnswerEvaluationSchema);
  } catch (error) {
    console.error('Answer evaluation failed:', error);
    return DEMO_ANSWER_EVALUATION;
  }
}
