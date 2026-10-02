import { describe, it, expect } from "vitest";
import { generateQuestions } from "../../src/lib/ai/services/question-generator";
import { evaluateAnswer } from "../../src/lib/ai/services/answer-evaluator";
import { generateRoadmap } from "../../src/lib/ai/services/roadmap-generator";
import { analyzeJobMatch } from "../../src/lib/ai/services/job-analyzer";

describe("Interview & AI Workflow Simulation (Demo Mode Fallback)", () => {
  it("generates interview questions tailored to config", async () => {
    const questions = await generateQuestions({
      targetRole: "Full Stack Engineer",
      type: "technical",
      difficulty: "intermediate",
      totalQuestions: 3,
      experienceLevel: "fresher",
    });

    expect(questions).toBeDefined();
    expect(questions.length).toBeGreaterThanOrEqual(1);
    expect(questions[0]).toHaveProperty("questionText");
    expect(questions[0]).toHaveProperty("questionType");
  });

  it("evaluates candidate answer and yields score breakdown", async () => {
    const evaluation = await evaluateAnswer(
      "Explain the difference between SQL and NoSQL databases.",
      "SQL databases are relational and structured with ACID compliance, whereas NoSQL databases are non-relational and document/key-value oriented.",
      "technical",
      "intermediate"
    );

    expect(evaluation).toBeDefined();
    expect(evaluation.overallScore).toBeGreaterThanOrEqual(0);
    expect(evaluation.overallScore).toBeLessThanOrEqual(100);
    expect(evaluation.feedback).toBeTruthy();
    expect(evaluation.strengths.length).toBeGreaterThan(0);
    expect(evaluation.improvements.length).toBeGreaterThan(0);
  });

  it("generates structured 4-week preparation roadmap", async () => {
    const roadmap = await generateRoadmap({
      targetRole: "Software Engineer",
      currentSkills: ["JavaScript", "React"],
      skillGaps: ["System Design", "Docker"],
      experienceLevel: "fresher",
    });

    expect(roadmap).toBeDefined();
    expect(roadmap.totalWeeks).toBe(4);
    expect(roadmap.weeks.length).toBe(4);
    expect(roadmap.weeks[0].topics.length).toBeGreaterThan(0);
  });

  it("performs job description match analysis against resume skills", async () => {
    const match = await analyzeJobMatch(
      ["JavaScript", "React", "Node.js"],
      ["JavaScript", "React", "Docker", "AWS"],
      ["TypeScript", "GraphQL"]
    );

    expect(match).toBeDefined();
    expect(match.matchingSkills).toContain("JavaScript");
    expect(match.matchPercentage).toBeGreaterThanOrEqual(0);
    expect(match.matchPercentage).toBeLessThanOrEqual(100);
    expect(match.suggestedSkillsToLearn.length).toBeGreaterThan(0);
  });
});
