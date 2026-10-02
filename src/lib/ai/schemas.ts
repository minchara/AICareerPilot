import { z } from 'zod';

export const ResumeAnalysisSchema = z.object({
  overallScore: z.number().min(0).max(100),
  summary: z.string(),
  skills: z.object({
    technical: z.array(z.string()),
    soft: z.array(z.string()),
    missing: z.array(z.string()),
  }),
  experience: z.object({
    totalYears: z.number(),
    highlights: z.array(z.string()),
    suggestions: z.array(z.string()),
  }),
  education: z.array(z.object({
    degree: z.string(),
    institution: z.string(),
    relevance: z.string(),
  })),
  projects: z.array(z.object({
    name: z.string(),
    technologies: z.array(z.string()),
    strength: z.string(),
    suggestion: z.string(),
  })),
  atsScore: z.number().min(0).max(100),
  improvements: z.array(z.object({
    category: z.string(),
    suggestion: z.string(),
    priority: z.enum(['high', 'medium', 'low']),
  })),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
});

export const JobAnalysisSchema = z.object({
  title: z.string(),
  company: z.string(),
  requiredSkills: z.array(z.string()),
  preferredSkills: z.array(z.string()),
  technologies: z.array(z.string()),
  experienceRequired: z.string(),
  educationRequired: z.string(),
  softSkills: z.array(z.string()),
  keyResponsibilities: z.array(z.string()),
});

export const JobMatchAnalysisSchema = z.object({
  matchingSkills: z.array(z.string()),
  missingSkills: z.array(z.string()),
  matchPercentage: z.number().min(0).max(100),
  suggestedSkillsToLearn: z.array(z.string()),
  interviewTopics: z.array(z.string()),
});

export const GeneratedQuestionSchema = z.object({
  questionText: z.string(),
  questionType: z.string(),
  difficulty: z.string(),
  codeTemplate: z.string().optional(),
  constraints: z.string().optional(),
  examples: z.string().optional(),
});

export const GeneratedQuestionsSchema = z.array(GeneratedQuestionSchema);

export const AnswerEvaluationSchema = z.object({
  overallScore: z.number().min(0).max(100),
  relevance: z.number().min(0).max(100),
  correctness: z.number().min(0).max(100),
  completeness: z.number().min(0).max(100),
  communication: z.number().min(0).max(100),
  technicalDepth: z.number().min(0).max(100),
  structure: z.number().min(0).max(100),
  feedback: z.string(),
  strengths: z.array(z.string()),
  improvements: z.array(z.string()),
  betterAnswer: z.string(),
  followUpQuestion: z.string().optional(),
});

export const InterviewReportSchema = z.object({
  overallScore: z.number().min(0).max(100),
  technicalScore: z.number().min(0).max(100),
  communicationScore: z.number().min(0).max(100),
  problemSolvingScore: z.number().min(0).max(100),
  behavioralScore: z.number().min(0).max(100),
  strongAreas: z.array(z.string()),
  areasToImprove: z.array(z.string()),
  suggestedTopics: z.array(z.string()),
  recommendedDifficulty: z.string(),
  personalizedStudyPlan: z.array(z.string()),
  summary: z.string(),
});

export const RoadmapSchema = z.object({
  totalWeeks: z.number(),
  weeks: z.array(z.object({
    week: z.number(),
    theme: z.string(),
    topics: z.array(z.object({
      topic: z.string(),
      description: z.string(),
      resources: z.array(z.string()),
    })),
  })),
});

/** Safely parse JSON from LLM output, handling markdown code blocks */
export function parseAIJson<T>(text: string, schema: z.ZodSchema<T>): T {
  // Strip markdown code blocks if present
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) cleaned = cleaned.slice(7);
  else if (cleaned.startsWith('```')) cleaned = cleaned.slice(3);
  if (cleaned.endsWith('```')) cleaned = cleaned.slice(0, -3);
  cleaned = cleaned.trim();
  
  const parsed = JSON.parse(cleaned);
  return schema.parse(parsed);
}
