// ============================================
// AI CareerPilot - Core Type Definitions
// ============================================

// Resume Analysis Types
export interface ResumeAnalysis {
  overallScore: number;
  summary: string;
  skills: {
    technical: string[];
    soft: string[];
    missing: string[];
  };
  experience: {
    totalYears: number;
    highlights: string[];
    suggestions: string[];
  };
  education: {
    degree: string;
    institution: string;
    relevance: string;
  }[];
  projects: {
    name: string;
    technologies: string[];
    strength: string;
    suggestion: string;
  }[];
  atsScore: number;
  improvements: {
    category: string;
    suggestion: string;
    priority: "high" | "medium" | "low";
  }[];
  strengths: string[];
  weaknesses: string[];
}

// Job Description Analysis Types
export interface JobAnalysis {
  title: string;
  company: string;
  requiredSkills: string[];
  preferredSkills: string[];
  technologies: string[];
  experienceRequired: string;
  educationRequired: string;
  softSkills: string[];
  keyResponsibilities: string[];
  matchAnalysis?: {
    matchingSkills: string[];
    missingSkills: string[];
    matchPercentage: number;
    suggestedSkillsToLearn: string[];
    interviewTopics: string[];
  };
}

// Interview Types
export type InterviewType = "technical" | "behavioral" | "hr" | "coding" | "mixed";
export type DifficultyLevel = "beginner" | "intermediate" | "advanced";
export type InterviewStatus = "in_progress" | "completed" | "abandoned";

export interface InterviewConfig {
  targetRole: string;
  type: InterviewType;
  difficulty: DifficultyLevel;
  totalQuestions: number;
  experienceLevel: string;
  jobDescription?: string;
}

export interface GeneratedQuestion {
  questionText: string;
  questionType: string;
  difficulty: string;
  codeTemplate?: string;
  constraints?: string;
  examples?: string;
}

// Answer Evaluation Types
export interface AnswerEvaluation {
  overallScore: number;
  relevance: number;
  correctness: number;
  completeness: number;
  communication: number;
  technicalDepth: number;
  structure: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
  betterAnswer: string;
  followUpQuestion?: string;
}

// Interview Report Types
export interface InterviewReport {
  overallScore: number;
  technicalScore: number;
  communicationScore: number;
  problemSolvingScore: number;
  behavioralScore: number;
  strongAreas: string[];
  areasToImprove: string[];
  suggestedTopics: string[];
  recommendedDifficulty: string;
  personalizedStudyPlan: string[];
  summary: string;
}

// Roadmap Types
export interface GeneratedRoadmap {
  totalWeeks: number;
  weeks: {
    week: number;
    theme: string;
    topics: {
      topic: string;
      description: string;
      resources: string[];
    }[];
  }[];
}

// Question Bank Types
export interface QuestionBankItem {
  id: string;
  category: string;
  subcategory: string;
  difficulty: string;
  questionText: string;
  expectedConcepts: string[];
  modelAnswer?: string;
  tags: string[];
  isBookmarked?: boolean;
  isCompleted?: boolean;
}

// Progress Types
export interface UserProgressData {
  totalInterviews: number;
  avgScore: number;
  bestScore: number;
  questionsAttempted: number;
  questionsCompleted: number;
  topicScores: Record<string, number>;
  interviewHistory: {
    id: string;
    date: string;
    type: string;
    difficulty: string;
    score: number;
    totalQuestions: number;
  }[];
}

// Dashboard Types
export interface DashboardData {
  userName: string;
  targetRole: string;
  resumeScore: number | null;
  interviewReadiness: number;
  recentInterviewScore: number | null;
  skillGaps: string[];
  recommendedPractice: string[];
  recentInterviews: {
    id: string;
    type: string;
    score: number;
    date: string;
  }[];
  progressData: {
    label: string;
    score: number;
  }[];
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Auth Types
export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
