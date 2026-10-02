import OpenAI from 'openai';

let openaiClient: OpenAI | null = null;

export function getOpenAIClient(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) return null;
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENAI_BASE_URL,
    });
  }
  return openaiClient;
}

export function isDemoMode(): boolean {
  return !process.env.OPENAI_API_KEY;
}

export const AI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

export async function chatCompletion(systemPrompt: string, userMessage: string, temperature = 0.7): Promise<string> {
  const client = getOpenAIClient();
  if (!client) throw new Error('AI not configured');
  const response = await client.chat.completions.create({
    model: AI_MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ],
    temperature,
    max_tokens: 4000,
  });
  return response.choices[0]?.message?.content || '';
}

export async function chatCompletionWithHistory(
  systemPrompt: string,
  messages: { role: 'user' | 'assistant'; content: string }[],
  temperature = 0.7
): Promise<string> {
  const client = getOpenAIClient();
  if (!client) throw new Error('AI not configured');
  const response = await client.chat.completions.create({
    model: AI_MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages,
    ],
    temperature,
    max_tokens: 2000,
  });
  return response.choices[0]?.message?.content || '';
}
