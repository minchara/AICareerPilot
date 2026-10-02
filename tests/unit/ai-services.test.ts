import { describe, it, expect } from "vitest";
import {
  ResumeAnalysisSchema,
  JobAnalysisSchema,
  JobMatchAnalysisSchema,
  GeneratedQuestionSchema,
  AnswerEvaluationSchema,
  InterviewReportSchema,
  RoadmapSchema,
} from "../../src/lib/ai/schemas";
import {
  DEMO_RESUME_ANALYSIS,
  DEMO_JOB_ANALYSIS,
  DEMO_JOB_MATCH,
  DEMO_QUESTIONS,
  DEMO_ANSWER_EVALUATION,
  DEMO_INTERVIEW_REPORT,
  DEMO_ROADMAP,
} from "../../src/lib/ai/demo-data";

describe("AI Schema Validation & Demo Data Integrity", () => {
  it("validates DEMO_RESUME_ANALYSIS adheres to ResumeAnalysisSchema", () => {
    const result = ResumeAnalysisSchema.safeParse(DEMO_RESUME_ANALYSIS);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.overallScore).toBeGreaterThanOrEqual(0);
      expect(result.data.overallScore).toBeLessThanOrEqual(100);
      expect(result.data.skills.technical.length).toBeGreaterThan(0);
      expect(result.data.improvements.length).toBeGreaterThan(0);
    }
  });

  it("validates DEMO_JOB_ANALYSIS adheres to JobAnalysisSchema", () => {
    const result = JobAnalysisSchema.safeParse(DEMO_JOB_ANALYSIS);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.requiredSkills.length).toBeGreaterThan(0);
      expect(result.data.title).toBeTruthy();
    }
  });

  it("validates DEMO_JOB_MATCH adheres to JobMatchAnalysisSchema", () => {
    const result = JobMatchAnalysisSchema.safeParse(DEMO_JOB_MATCH);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.matchPercentage).toBeGreaterThanOrEqual(0);
      expect(result.data.matchPercentage).toBeLessThanOrEqual(100);
    }
  });

  it("validates DEMO_QUESTIONS adhere to GeneratedQuestionSchema", () => {
    for (const q of DEMO_QUESTIONS) {
      const result = GeneratedQuestionSchema.safeParse(q);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.questionText).toBeTruthy();
        expect(["technical", "behavioral", "hr", "coding"]).toContain(result.data.questionType);
      }
    }
  });

  it("validates DEMO_ANSWER_EVALUATION adheres to AnswerEvaluationSchema", () => {
    const result = AnswerEvaluationSchema.safeParse(DEMO_ANSWER_EVALUATION);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.overallScore).toBeGreaterThanOrEqual(0);
      expect(result.data.feedback).toBeTruthy();
      expect(result.data.betterAnswer).toBeTruthy();
    }
  });

  it("validates DEMO_INTERVIEW_REPORT adheres to InterviewReportSchema", () => {
    const result = InterviewReportSchema.safeParse(DEMO_INTERVIEW_REPORT);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.overallScore).toBeGreaterThanOrEqual(0);
      expect(result.data.personalizedStudyPlan.length).toBeGreaterThan(0);
    }
  });

  it("validates DEMO_ROADMAP adheres to RoadmapSchema", () => {
    const result = RoadmapSchema.safeParse(DEMO_ROADMAP);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.totalWeeks).toBe(4);
      expect(result.data.weeks[0].topics.length).toBeGreaterThan(0);
    }
  });
});
