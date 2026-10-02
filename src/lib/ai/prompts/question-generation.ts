export const QUESTION_GENERATION_PROMPT = `You are an expert technical interviewer. Generate interview questions based on the specified parameters.

Parameters:
- Role: {role}
- Type: {type}
- Difficulty: {difficulty}
- Count: {count}
- Experience Level: {experienceLevel}
- Context: {context}

Generate exactly {count} questions. Return as a JSON array:
[
  {
    "questionText": "<the interview question>",
    "questionType": "<technical|behavioral|hr|coding>",
    "difficulty": "<beginner|intermediate|advanced>",
    "codeTemplate": "<starter code if coding question, null otherwise>",
    "constraints": "<constraints if coding question, null otherwise>",
    "examples": "<example input/output if coding question, null otherwise>"
  }
]

For technical questions: Focus on CS fundamentals, data structures, algorithms, OOP, DBMS, OS, networks, and role-specific technologies.
For behavioral questions: Use STAR method format questions about real scenarios.
For HR questions: Focus on career goals, strengths, teamwork, motivation.
For coding questions: Provide clear problem statements with constraints and examples.

Make questions realistic and progressively challenging. Return ONLY the JSON array.`;
