import type { ResumeAnalysis, JobAnalysis, AnswerEvaluation, InterviewReport, GeneratedRoadmap, GeneratedQuestion } from '@/types';

export const DEMO_RESUME_ANALYSIS: ResumeAnalysis = {
  overallScore: 72,
  summary: "A computer science student with solid fundamentals in web development and data structures. Shows practical experience through academic projects but would benefit from more industry exposure and a stronger focus on system design.",
  skills: {
    technical: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "SQL", "Git", "HTML/CSS", "MongoDB", "Express.js"],
    soft: ["Problem Solving", "Team Collaboration", "Communication", "Time Management"],
    missing: ["System Design", "Cloud Services (AWS/GCP)", "Docker", "CI/CD", "Testing Frameworks", "GraphQL"],
  },
  experience: {
    totalYears: 1,
    highlights: ["Built a full-stack e-commerce application", "Completed a machine learning internship", "Led a team of 4 in capstone project"],
    suggestions: ["Add quantifiable achievements (e.g., 'Reduced load time by 40%')", "Include more details about technical challenges solved", "Add open-source contributions if any"],
  },
  education: [{ degree: "B.Tech in Computer Science", institution: "Sample University", relevance: "Directly relevant to software engineering roles" }],
  projects: [
    { name: "E-Commerce Platform", technologies: ["React", "Node.js", "MongoDB"], strength: "Full-stack implementation showing end-to-end capability", suggestion: "Add deployment details and performance metrics" },
    { name: "ML Sentiment Analyzer", technologies: ["Python", "scikit-learn", "Flask"], strength: "Shows ML knowledge and API development", suggestion: "Include accuracy metrics and dataset size" },
    { name: "Chat Application", technologies: ["React", "Socket.io", "Express"], strength: "Demonstrates real-time communication skills", suggestion: "Add scale considerations and concurrent user handling" },
  ],
  atsScore: 68,
  improvements: [
    { category: "Keywords", suggestion: "Add more role-specific keywords matching common job descriptions", priority: "high" },
    { category: "Metrics", suggestion: "Quantify achievements with numbers (users, performance improvements, etc.)", priority: "high" },
    { category: "Format", suggestion: "Use consistent date formatting and bullet point structure", priority: "medium" },
    { category: "Skills Section", suggestion: "Organize skills by proficiency level or category", priority: "medium" },
    { category: "Summary", suggestion: "Add a professional summary at the top highlighting key qualifications", priority: "low" },
  ],
  strengths: ["Strong web development foundation", "Good variety of projects", "Relevant educational background", "Experience with both frontend and backend"],
  weaknesses: ["Limited industry experience", "No cloud or DevOps skills mentioned", "Lack of quantifiable metrics", "Missing testing experience"],
};

export const DEMO_JOB_ANALYSIS: JobAnalysis = {
  title: "Software Development Engineer",
  company: "Tech Company",
  requiredSkills: ["JavaScript", "TypeScript", "React", "Node.js", "SQL", "REST APIs", "Git"],
  preferredSkills: ["AWS", "Docker", "GraphQL", "CI/CD", "System Design", "Microservices"],
  technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "AWS", "Docker"],
  experienceRequired: "0-2 years of relevant experience",
  educationRequired: "B.Tech/B.E. in Computer Science or related field",
  softSkills: ["Communication", "Problem Solving", "Teamwork", "Adaptability", "Time Management"],
  keyResponsibilities: [
    "Design and develop scalable web applications",
    "Write clean, maintainable code with proper testing",
    "Collaborate with cross-functional teams",
    "Participate in code reviews",
    "Debug and resolve production issues",
  ],
};

export const DEMO_JOB_MATCH = {
  matchingSkills: ["JavaScript", "TypeScript", "React", "Node.js", "SQL", "Git"],
  missingSkills: ["AWS", "Docker", "GraphQL", "CI/CD", "System Design", "Redis"],
  matchPercentage: 65,
  suggestedSkillsToLearn: ["AWS fundamentals", "Docker basics", "System Design principles", "CI/CD pipelines", "GraphQL"],
  interviewTopics: ["React hooks and lifecycle", "Node.js event loop", "SQL queries and optimization", "REST API design", "Data structures", "System design basics"],
};

export const DEMO_QUESTIONS: GeneratedQuestion[] = [
  { questionText: "Explain the difference between let, const, and var in JavaScript. When would you use each?", questionType: "technical", difficulty: "beginner" },
  { questionText: "What is the Virtual DOM in React? How does it improve performance compared to direct DOM manipulation?", questionType: "technical", difficulty: "intermediate" },
  { questionText: "Tell me about a challenging project you worked on. What was your role and how did you overcome the challenges?", questionType: "behavioral", difficulty: "intermediate" },
  { questionText: "Design a URL shortener service. Walk me through the high-level architecture and key design decisions.", questionType: "technical", difficulty: "advanced" },
  { questionText: "Given an array of integers, find two numbers that add up to a specific target. Return their indices.", questionType: "coding", difficulty: "beginner", codeTemplate: "function twoSum(nums: number[], target: number): number[] {\n  // Your code here\n}", constraints: "2 <= nums.length <= 10^4, -10^9 <= nums[i] <= 10^9", examples: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: nums[0] + nums[1] = 2 + 7 = 9" },
];

export const DEMO_ANSWER_EVALUATION: AnswerEvaluation = {
  overallScore: 72,
  relevance: 80,
  correctness: 75,
  completeness: 65,
  communication: 78,
  technicalDepth: 68,
  structure: 72,
  feedback: "Good understanding of the core concept. Your explanation covered the main points but could benefit from more specific examples and edge cases. The answer was well-structured but could go deeper into the underlying mechanism.",
  strengths: ["Clear explanation of the basic concept", "Good use of terminology", "Well-organized response"],
  improvements: ["Include specific code examples", "Discuss edge cases and limitations", "Add performance considerations", "Compare with alternative approaches"],
  betterAnswer: "The Virtual DOM is a lightweight JavaScript representation of the actual DOM. When state changes occur in a React component, React creates a new Virtual DOM tree and compares it with the previous one using a diffing algorithm (reconciliation). Only the differences are applied to the real DOM in a batched update, which is much more efficient than manipulating the DOM directly for each change. This matters because real DOM operations are expensive — they trigger layout recalculation and repainting. By batching updates and minimizing direct DOM manipulation, React achieves better performance, especially in complex UIs with frequent state changes.",
};

export const DEMO_INTERVIEW_REPORT: InterviewReport = {
  overallScore: 71,
  technicalScore: 68,
  communicationScore: 78,
  problemSolvingScore: 72,
  behavioralScore: 75,
  strongAreas: ["Clear communication", "Good understanding of web fundamentals", "Structured approach to problems", "Honest about knowledge gaps"],
  areasToImprove: ["System design thinking", "Algorithm optimization", "Deep dive into framework internals", "Time complexity analysis"],
  suggestedTopics: ["Advanced data structures", "System design patterns", "React performance optimization", "Database indexing and query optimization", "Behavioral interview STAR method"],
  recommendedDifficulty: "intermediate",
  personalizedStudyPlan: [
    "Week 1: Review core data structures (arrays, linked lists, trees, graphs) and practice 2-3 problems daily on LeetCode",
    "Week 2: Study system design fundamentals — read 'Designing Data-Intensive Applications' chapters 1-3",
    "Week 3: Deep dive into React internals (fiber architecture, reconciliation, hooks implementation)",
    "Week 4: Practice mock interviews focusing on behavioral questions using the STAR method",
  ],
  summary: "The candidate demonstrated solid foundational knowledge in web development with good communication skills. Technical depth could be improved, particularly in system design and algorithm optimization. With focused preparation on the suggested topics, the candidate should be well-prepared for intermediate-level technical interviews.",
};

export const DEMO_ROADMAP: GeneratedRoadmap = {
  totalWeeks: 4,
  weeks: [
    {
      week: 1,
      theme: "Data Structures & Algorithms Foundation",
      topics: [
        { topic: "Arrays & Strings", description: "Master array manipulation, two-pointer technique, sliding window", resources: ["LeetCode Easy array problems", "NeetCode Arrays playlist"] },
        { topic: "Linked Lists", description: "Implement singly/doubly linked lists, reversal, cycle detection", resources: ["LeetCode Linked List section", "Visualgo.net"] },
        { topic: "OOP Concepts", description: "Review inheritance, polymorphism, abstraction, encapsulation with examples", resources: ["Head First OOP", "Refactoring Guru"] },
      ],
    },
    {
      week: 2,
      theme: "Advanced Data Structures & DBMS",
      topics: [
        { topic: "Trees & Graphs", description: "Binary trees, BST, BFS/DFS traversals, shortest path algorithms", resources: ["LeetCode Tree problems", "Abdul Bari YouTube"] },
        { topic: "SQL & Database Design", description: "Complex queries, joins, normalization, indexing strategies", resources: ["SQLZoo", "Use The Index Luke"] },
        { topic: "Stacks & Queues", description: "Implementation, monotonic stack, priority queues", resources: ["LeetCode Stack section", "NeetCode"] },
      ],
    },
    {
      week: 3,
      theme: "System Design & Web Technologies",
      topics: [
        { topic: "System Design Basics", description: "Load balancing, caching, database sharding, API design", resources: ["System Design Primer GitHub", "ByteByteGo YouTube"] },
        { topic: "React Deep Dive", description: "Hooks internals, performance optimization, state management patterns", resources: ["React docs (beta)", "Kent C. Dodds blog"] },
        { topic: "OS & Networks", description: "Process management, memory, TCP/IP, HTTP/HTTPS, DNS", resources: ["Operating System Concepts (Silberschatz)", "Computer Networking: A Top-Down Approach"] },
      ],
    },
    {
      week: 4,
      theme: "Interview Preparation & Practice",
      topics: [
        { topic: "Mock Interviews", description: "Practice with AI mock interviews, focus on time management", resources: ["AI CareerPilot Mock Interviews", "Pramp"] },
        { topic: "Behavioral Preparation", description: "Prepare STAR stories for common behavioral questions", resources: ["STAR method guide", "Top 50 behavioral questions"] },
        { topic: "Resume & Portfolio", description: "Polish resume based on analysis feedback, update GitHub projects", resources: ["Resume analysis results", "GitHub profile optimization guide"] },
      ],
    },
  ],
};

export const DEMO_INTERVIEWER_INTRO = "Hello! I'm your interviewer today. I'll be conducting a technical interview for the Software Engineer position. I'll ask you a series of questions to assess your technical skills, problem-solving ability, and communication. Feel free to think out loud and ask clarifying questions.\n\nLet's start with the first question:\n\nCan you explain the difference between a stack and a queue? When would you use each data structure in a real-world application?";

export const DEMO_INTERVIEWER_FOLLOWUP = "That's a good start! I appreciate your explanation. Let me ask a follow-up — can you describe a scenario where you might use both a stack and a queue together to solve a problem? For instance, think about how they might be used in a web browser.";
