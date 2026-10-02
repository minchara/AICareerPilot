export const ROADMAP_GENERATION_PROMPT = `You are an expert career coach and technical mentor. Create a personalized preparation roadmap.

Candidate Information:
- Target Role: {targetRole}
- Current Skills: {currentSkills}
- Skill Gaps: {skillGaps}
- Experience Level: {experienceLevel}
- Interview Performance: {interviewPerformance}

Generate a 4-week preparation roadmap. Return as JSON:
{
  "totalWeeks": 4,
  "weeks": [
    {
      "week": 1,
      "theme": "<week theme>",
      "topics": [
        {
          "topic": "<topic name>",
          "description": "<what to study/practice>",
          "resources": ["<suggested resources>"]
        }
      ]
    }
  ]
}

Make the roadmap practical, progressive, and achievable. Prioritize weak areas first. Return ONLY the JSON object.`;
