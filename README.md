# AI CareerPilot 🚀
### Production-Quality AI Interview Preparation & Mock Interview SaaS Platform

AI CareerPilot is a full-stack, enterprise-grade AI-powered career accelerator and mock interview preparation platform built with **Next.js 14 App Router, TypeScript, Tailwind CSS, PostgreSQL, Prisma ORM, and OpenAI API**. Designed as a flagship BTech CSE capstone project, it mirrors modern SaaS architectures like Interviewing.io and LeetCode with production security, modular AI services, and built-in offline Demo Mode.

---

## 📑 Table of Contents
1. [Key Features](#-key-features)
2. [System Architecture](#-system-architecture)
3. [Technology Stack](#-technology-stack)
4. [Database Design](#-database-design)
5. [AI Architecture & Prompt Engineering](#-ai-architecture--prompt-engineering)
6. [Demo Mode & Reliability](#-demo-mode--reliability)
7. [Getting Started Locally](#-getting-started-locally)
8. [Available Scripts](#-available-scripts)
9. [REST API Documentation](#-rest-api-documentation)
10. [BTech CSE Resume Section](#-btech-cse-resume-section)
11. [Top Technical Interview Q&A for this Project](#-top-technical-interview-qa-for-this-project)

---

## 🌟 Key Features

### 1. 📄 AI Resume Analyzer
- **Multiformat Extraction**: Server-side parsing of PDF (`pdf-parse`) and DOCX (`mammoth`) files with strict size limits (<5MB).
- **ATS Compatibility Score**: Quantitative evaluation of keyword density, formatting consistency, section hierarchy, and impact metrics.
- **Skill Extraction**: Automatic categorization of candidate technical skills, soft skills, and identified skill gaps.
- **Actionable Critique**: Prioritized recommendations (High / Medium / Low) with before-and-after phrasing.

### 2. 🎯 Job Description Analyzer & Gap Matrix
- **Semantic Comparison**: Compares candidate resume against target job description.
- **Match Breakdown**: Calculates match percentage, lists matched skills, missing prerequisites, and suggests priority topics to study.

### 3. 🎙️ AI Mock Interview Simulation
- **Conversational Experience**: AI interviewer that introduces itself, maintains session context, and adapts difficulty dynamically based on answer quality.
- **Category Support**:
  - **Technical**: Data Structures, Algorithms, OOP, DBMS, OS, Networks, Web Frameworks, System Design.
  - **Behavioral**: STAR format questions (Situation, Task, Action, Result).
  - **HR**: Culture fit, career trajectory, strengths/weaknesses.
  - **Coding**: Problem statement, constraints, example test cases, Monaco code editor, and multi-language support (Python, Java, C++, JavaScript).

### 4. 📊 Detailed Evaluation & Performance Reports
- **Multi-Dimensional Scoring**: Evaluates Relevance, Technical Depth, Correctness, Completeness, Communication Clarity, and Response Structure (0–100).
- **Exemplary Model Answers**: Displays improved versions of answers for every question.
- **Visual Analytics**: Radar charts and trend graphs showing strengths and weaknesses across rounds.
- **Printable/Exportable**: Browser-native clean print layout for offline review.

### 5. 🗺️ Personalized 4-Week Preparation Roadmap
- Dynamically generated week-by-week syllabus based on identified skill gaps and interview weaknesses.
- Interactive topic checkboxes with persistent completion tracking.

### 6. 📚 200+ Question Bank
- Curated questions across DSA, OOP, DBMS, OS, Networks, JavaScript, React, Next.js, and Behavioral topics.
- Filter by category, difficulty, search keyword, and bookmark questions for offline practice.

---

## 🏛️ System Architecture

```
                                 [ Client Browser ]
                                         │
                                         ▼ (HTTPS)
                      ┌──────────────────────────────────────┐
                      │    Next.js 14 App Router Monolith    │
                      ├──────────────────────────────────────┤
                      │  • Server Components (RSC)           │
                      │  • Client Components (React / Radix) │
                      │  • Edge / Node Middleware (NextAuth) │
                      │  • Route Handlers (/api/*)           │
                      └──────┬────────────────────────┬──────┘
                             │                        │
               Prisma Client │                        │ OpenAI SDK
                             ▼                        ▼
                   ┌─────────────────┐       ┌─────────────────┐
                   │   PostgreSQL    │       │ OpenAI GPT-4o   │
                   │   Database      │       │ (or Demo Mode)  │
                   └─────────────────┘       └─────────────────┘
```

### Architectural Decisions
- **Monolithic Next.js over separate Python Microservice**: Keeps deployment seamless on Vercel or single container environments without multi-service latency or orchestration overhead, while keeping the AI logic modular in `src/lib/ai/services/*`.
- **Runtime Fallback Demo Mode**: Guarantees the application remains 100% testable and operable even if API keys or database connections are absent or rate-limited.

---

## 💻 Technology Stack

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Framework** | Next.js 14 (App Router) | Modern React Server Components, automatic code splitting, and API routes. |
| **Language** | TypeScript (Strict) | End-to-end type safety across database schemas, APIs, and UI props. |
| **Styling** | Tailwind CSS + Radix UI | Accessible primitives with customizable utility classes. |
| **Database** | PostgreSQL + Prisma ORM | Relational integrity, migrations, and strongly-typed queries. |
| **Authentication** | NextAuth.js | Secure session-based JWT auth with password hashing via bcryptjs. |
| **Code Editor** | Monaco Editor | VS Code-quality syntax highlighting and indentation in browser. |
| **Visualizations**| Recharts | Composable SVG radar charts, bar graphs, and score trajectories. |
| **File Parsing** | `pdf-parse` & `mammoth` | Secure in-memory buffer extraction for PDFs and DOCX files. |
| **AI Validation** | Zod | Runtime validation for structured JSON outputs from LLMs. |

---

## 🗄️ Database Design

```mermaid
erDiagram
    User ||--o{ Resume : owns
    User ||--o{ JobDescription : saves
    User ||--o{ Interview : takes
    User ||--o{ Roadmap : follows
    User ||--o| Profile : has
    User ||--o| UserProgress : tracks
    User ||--o{ QuestionBookmark : saves

    Interview ||--o{ InterviewQuestion : contains
    InterviewQuestion ||--o| InterviewAnswer : receives
    Roadmap ||--o{ RoadmapItem : contains
    Question ||--o{ QuestionBookmark : referenced
```

### Key Entities
- **User / Profile**: Stores credentials, target role, experience level, and master skills list.
- **Resume**: Holds raw extracted text, parsed JSON analysis, ATS score, and timestamps.
- **Interview**: Tracks interview session state (`in_progress`, `completed`), type, difficulty, and overall report.
- **InterviewQuestion & InterviewAnswer**: Records questions asked, candidate code/text response, score, and AI critique.
- **Roadmap & RoadmapItem**: Structured 4-week preparation timeline with toggleable completion states.
- **UserProgress**: Aggregated historical metrics (average score, best score, topic breakdown).

---

## 🤖 AI Architecture & Prompt Engineering

All AI functionality lives under `src/lib/ai/`:
- `client.ts`: Singleton client initialization with automatic demo fallback.
- `schemas.ts`: Strict Zod schemas validating LLM JSON output to prevent runtime exceptions.
- `prompts/`: Domain-specific prompts for resume review, JD comparison, question generation, and STAR evaluation.
- `services/`: Clean decoupled business functions (`analyzeResume`, `evaluateAnswer`, `generateRoadmap`).

### Safe Prompt Design
- Forces structured JSON output (`{ "overallScore": 85, ... }`) parsed by Zod.
- Disallows medical, psychological, or non-technical claims; bases confidence solely on written syntax and structure.
- Implements sanitization and removes markdown code-fence artifacts (` ```json `).

---

## 🎯 Demo Mode & Reliability

When running without an `OPENAI_API_KEY`:
- The application automatically enables **DEMO MODE**.
- A subtle yellow banner indicates demo mode is active.
- Realistic, professionally validated responses are returned with simulated artificial latency (~1.5s) to preserve realistic loading UX.
- All scoring, radar charts, question banks, and resume flows function smoothly.

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js** 18.17+ or 20+ (Install from [nodejs.org](https://nodejs.org) or `winget install OpenJS.NodeJS.20`)
- **npm** or **pnpm**
- **PostgreSQL** (or SQLite for quick local test)

### 1. Clone & Install
```bash
git clone https://github.com/your-username/ai-careerpilot.git
cd ai-careerpilot
npm install
```

### 2. Configure Environment Variables
Copy the example environment file:
```bash
cp .env.example .env
```
Edit `.env`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/careerpilot?schema=public"
NEXTAUTH_SECRET="super-secret-random-key-change-me"
NEXTAUTH_URL="http://localhost:3000"

# Optional: Add your OpenAI API key for live AI generation
OPENAI_API_KEY=""
OPENAI_MODEL="gpt-4o-mini"
```

> **Note for SQLite (Zero-config local database):**
> If you don't have PostgreSQL installed locally, you can change `provider = "sqlite"` in `prisma/schema.prisma` and set `DATABASE_URL="file:./dev.db"` in `.env`.

### 3. Initialize Database & Seed Sample Data
```bash
npx prisma db push
npm run db:seed
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

**Default Demo Credentials:**
- Email: `demo@careerpilot.com`
- Password: `demo123456`

---

## 🛠️ Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts local Next.js development server at port 3000. |
| `npm run build` | Builds optimized production bundle. |
| `npm run start` | Starts production server. |
| `npm run type-check` | Runs TypeScript compiler check (`tsc --noEmit`). |
| `npm run test` | Runs unit test suite with Vitest. |
| `npm run db:seed` | Populates database with demo user and 200+ CSE questions. |
| `npm run db:studio` | Launches Prisma Studio GUI at `http://localhost:5555`. |

---

## 🔌 REST API Documentation

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/auth/register` | `POST` | Registers a new user account and creates initial profile records. |
| `/api/resume/upload` | `POST` | Uploads PDF/DOCX resume, parses text, and returns AI analysis. |
| `/api/resume/latest` | `GET` | Fetches candidate's most recent resume analysis. |
| `/api/job-description/analyze` | `POST` | Analyzes JD and computes skill gap matrix against user resume. |
| `/api/interview/create` | `POST` | Initiates new mock interview session and generates questions. |
| `/api/interview/[id]/question`| `POST` | Submits candidate answer and returns instant AI evaluation. |
| `/api/interview/[id]/complete`| `POST` | Concludes interview session and computes full diagnostic report. |
| `/api/questions` | `GET` | Lists curated questions with search, category, and difficulty filters. |
| `/api/roadmap/generate` | `POST` | Creates personalized 4-week study plan. |
| `/api/progress` | `GET` | Returns aggregated score metrics, question stats, and session history. |

---

## 💼 BTech CSE Resume Section

### Project Title
**AI CareerPilot — Full-Stack AI Interview Preparation & Analytics Platform** *(Next.js 14, TypeScript, PostgreSQL, Prisma, OpenAI, Tailwind CSS)*

### 5 Impact-Driven Resume Bullet Points
- **Architected and developed a full-stack SaaS platform** for technical interview preparation utilizing Next.js 14 App Router, TypeScript, and PostgreSQL with Prisma ORM, serving 14+ technical domains.
- **Engineered an automated Resume & Job Description Analyzer** parsing PDF/DOCX buffers using `pdf-parse` and `mammoth`, extracting candidate skill vectors and computing ATS compatibility scores.
- **Implemented an adaptive conversational AI mock interview engine** leveraging OpenAI GPT-4o with structured Zod schema validation, supporting dynamic follow-up questioning, Monaco code editing, and multi-criteria STAR evaluation.
- **Designed a resilient dual-mode architecture** featuring automated offline Demo Mode fallbacks, ensuring 100% operational uptime and zero UI freezing during API latency or rate limits.
- **Formulated a comprehensive relational database schema** across 13 Prisma models with indexed foreign keys, supporting full user state persistence, question bookmarks, and weekly roadmaps.

---

## 🎤 Top Technical Interview Q&A for this Project

### Q1: Why did you choose Next.js App Router instead of a separate React frontend and Python FastAPI backend?
**Answer:**
> "While Python is popular for AI prototyping, for this system a Next.js App Router monolith offered superior cohesion, lower network latency, and unified TypeScript types between database models, API handlers, and React UI. Since LLM calls are I/O-bound rather than compute-bound, Node.js handles async streaming and HTTP calls with high efficiency without the complexity of managing two separate deployments, CORS configurations, or synchronized schema duplicates."

### Q2: How do you handle LLM hallucinations or malformed JSON responses in production?
**Answer:**
> "I enforce a two-stage validation layer: First, strict prompt engineering specifying the exact JSON schema and instructing the model to output purely parseable JSON. Second, runtime validation using **Zod schemas**. The raw output is stripped of markdown artifacts, parsed with `JSON.parse()`, and validated against the Zod schema. If validation fails or the external API times out, the service gracefully falls back to deterministic, validated fallback data, preventing runtime client crashes."

### Q3: How do you ensure user privacy and security during resume parsing?
**Answer:**
> "Files are processed entirely in-memory as Node Buffers and are never written to permanent disk storage. NextAuth session tokens are checked on all `/api/*` endpoints to ensure users can only query their own data. Furthermore, all extracted strings are sanitized before storage and database credentials remain strictly within server-side environment variables."

### Q4: How does the AI evaluate code and behavioral responses without arbitrary code execution?
**Answer:**
> "For security reasons, arbitrary user code is never executed directly on the host server to prevent remote code execution (RCE) vulnerabilities. Instead, the AI evaluator performs static algorithmic analysis: checking syntax correctness, time/space complexity analysis against expected constraints, and edge case coverage. For behavioral responses, the prompt directs the model to evaluate structure against the STAR framework (Situation, Task, Action, Result)."

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
