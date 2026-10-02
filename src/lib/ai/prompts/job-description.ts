export const JOB_DESCRIPTION_ANALYSIS_PROMPT = `You are an expert job description analyst. Parse and analyze the provided job description.

Return your analysis as a valid JSON object with this exact structure:
{
  "title": "<job title>",
  "company": "<company name if mentioned, otherwise 'Not specified'>",
  "requiredSkills": ["<must-have skills>"],
  "preferredSkills": ["<nice-to-have skills>"],
  "technologies": ["<specific technologies/tools mentioned>"],
  "experienceRequired": "<experience level description>",
  "educationRequired": "<education requirements>",
  "softSkills": ["<soft skills mentioned or implied>"],
  "keyResponsibilities": ["<main job responsibilities>"]
}

Return ONLY the JSON object, no additional text.`;

export const JOB_MATCH_ANALYSIS_PROMPT = `You are an expert career advisor. Compare the candidate's resume against the job description and provide a match analysis.

Resume Skills: {resumeSkills}
Job Required Skills: {requiredSkills}
Job Preferred Skills: {preferredSkills}

Return your analysis as a valid JSON object:
{
  "matchingSkills": ["<skills the candidate has that match the job>"],
  "missingSkills": ["<skills required by the job that the candidate lacks>"],
  "matchPercentage": <number 0-100>,
  "suggestedSkillsToLearn": ["<priority-ordered skills to learn>"],
  "interviewTopics": ["<likely interview topics based on the job>"]
}

Return ONLY the JSON object, no additional text.`;
