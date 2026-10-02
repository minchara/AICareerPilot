import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Helper to generate seed questions across core CSE categories
const seedQuestions = [
  // DSA - Data Structures & Algorithms
  {
    category: "DSA",
    subcategory: "Arrays",
    difficulty: "beginner",
    questionText: "Explain the two-pointer technique and when it is optimal to use it on arrays.",
    expectedConcepts: ["Sorted arrays", "O(N) time complexity", "Space optimization", "Opposite ends vs fast-slow pointer"],
    modelAnswer: "The two-pointer technique uses two integer indices to traverse an array, commonly from both ends inwards or in a fast/slow runner configuration. It reduces O(N^2) brute force search to O(N) when arrays are sorted (e.g., Two Sum II, Container With Most Water, trapping rain water).",
    tags: ["arrays", "two-pointer", "time-complexity"],
  },
  {
    category: "DSA",
    subcategory: "Linked Lists",
    difficulty: "intermediate",
    questionText: "How does Floyd's Cycle-Finding Algorithm (Tortoise and Hare) detect cycles in a linked list and find the start of the loop?",
    expectedConcepts: ["Slow and fast pointers", "Proof of meeting", "2*(distance) relation", "O(1) auxiliary space"],
    modelAnswer: "Floyd's algorithm uses two pointers: slow moves 1 step, fast moves 2 steps. If a cycle exists, they must collide inside the cycle. Once collided, resetting one pointer to head and moving both at 1 step per iteration locates the cycle entrance at their meeting point.",
    tags: ["linked-list", "cycle-detection", "pointers"],
  },
  {
    category: "DSA",
    subcategory: "Trees",
    difficulty: "intermediate",
    questionText: "What is the difference between BFS and DFS on a Binary Tree, and what are their respective space complexities?",
    expectedConcepts: ["Queue vs Stack/Recursion", "Level order traversal", "O(W) vs O(H) space", "Worst case tree shapes"],
    modelAnswer: "BFS visits nodes level-by-level using a FIFO queue, requiring O(W) memory where W is maximum tree width. DFS explores deeply down branches before backtracking using recursion or a LIFO stack, requiring O(H) memory where H is tree height.",
    tags: ["trees", "bfs", "dfs", "recursion"],
  },
  {
    category: "DSA",
    subcategory: "Dynamic Programming",
    difficulty: "advanced",
    questionText: "Explain the concept of Overlapping Subproblems and Optimal Substructure with respect to the 0/1 Knapsack problem.",
    expectedConcepts: ["Memoization", "Tabulation", "State transition equation", "Subproblem dependencies"],
    modelAnswer: "Optimal substructure means the optimal solution to the knapsack of capacity W can be constructed from optimal solutions to subproblems with capacity w <= W. Overlapping subproblems means identical states (item i, weight w) are computed repeatedly. DP caches these in an 2D/1D table with recurrence DP[i][w] = max(DP[i-1][w], val[i] + DP[i-1][w - wt[i]]).",
    tags: ["dp", "knapsack", "optimization"],
  },
  {
    category: "DSA",
    subcategory: "Graphs",
    difficulty: "advanced",
    questionText: "Explain Dijkstra's Algorithm for Single-Source Shortest Path. Why does it fail for negative edge weights?",
    expectedConcepts: ["Greedy approach", "Min-priority queue", "Relaxation", "Negative cycles"],
    modelAnswer: "Dijkstra greedily extracts the unvisited vertex with the minimum tentative distance using a min-heap and relaxes its neighbors in O((V + E) log V). It assumes once a node is marked visited, its shortest distance is finalized. A negative edge can later yield a shorter path to an already visited vertex, violating the greedy invariant.",
    tags: ["graphs", "dijkstra", "shortest-path"],
  },

  // OOP - Object-Oriented Programming
  {
    category: "OOP",
    subcategory: "Core Principles",
    difficulty: "beginner",
    questionText: "Explain the four pillars of Object-Oriented Programming with real-world examples.",
    expectedConcepts: ["Encapsulation", "Abstraction", "Inheritance", "Polymorphism"],
    modelAnswer: "1. Encapsulation: Bundling data and methods while restricting direct access (e.g., Bank Account with private balance). 2. Abstraction: Hiding internal complexity and showing only essential interfaces (e.g., Car ignition without exposing combustion mechanics). 3. Inheritance: Reusing and extending base class properties (e.g., ElectricVehicle inheriting Vehicle). 4. Polymorphism: Performing a single action in different ways via overloading/overriding (e.g., Shape.draw() behaving differently for Circle vs Rectangle).",
    tags: ["oop", "fundamentals", "principles"],
  },
  {
    category: "OOP",
    subcategory: "Design Principles",
    difficulty: "intermediate",
    questionText: "What are SOLID design principles, and how does the Dependency Inversion Principle improve software maintainability?",
    expectedConcepts: ["Single Responsibility", "Open/Closed", "Liskov Substitution", "Interface Segregation", "Dependency Inversion"],
    modelAnswer: "SOLID consists of Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion. DIP states high-level modules should not depend on low-level modules; both should depend on abstractions (interfaces). This decouples business logic from persistence/transports, allowing easy mocking in unit tests and interchangeable implementations.",
    tags: ["solid", "software-design", "architecture"],
  },
  {
    category: "OOP",
    subcategory: "Design Patterns",
    difficulty: "advanced",
    questionText: "Compare the Factory Method pattern against the Abstract Factory pattern. When would you choose one over the other?",
    expectedConcepts: ["Creational patterns", "Single product vs Product families", "Subclassing vs Composition", "Extensibility"],
    modelAnswer: "Factory Method uses inheritance and relies on a method overridden in subclasses to create a single product. Abstract Factory uses object composition to produce families of related or dependent products without specifying their concrete classes (e.g., Dark/Light theme UI components like Button, Scrollbar, Checkbox).",
    tags: ["design-patterns", "factory", "architecture"],
  },

  // DBMS - Database Management Systems
  {
    category: "DBMS",
    subcategory: "Transactions",
    difficulty: "intermediate",
    questionText: "Explain ACID properties in relational databases and how write-ahead logging (WAL) guarantees Durability and Atomicity.",
    expectedConcepts: ["Atomicity", "Consistency", "Isolation", "Durability", "WAL", "Checkpoints"],
    modelAnswer: "ACID ensures reliable transaction processing: Atomicity (all-or-nothing), Consistency (state transitions obey constraints), Isolation (concurrent execution yields serializable results), Durability (committed data survives crashes). WAL guarantees Atomicity and Durability by appending change logs to non-volatile disk before modifying in-memory database pages, enabling REDO and UNDO during crash recovery.",
    tags: ["dbms", "acid", "wal", "transactions"],
  },
  {
    category: "DBMS",
    subcategory: "Indexing",
    difficulty: "intermediate",
    questionText: "How does a B+ Tree index work, and why is it preferred over a Hash index for relational database queries?",
    expectedConcepts: ["B+ Tree structure", "Range scans", "Leaf node linked list", "I/O minimization", "Logarithmic lookups"],
    modelAnswer: "A B+ Tree is a self-balancing search tree where all data records/pointers reside exclusively in leaf nodes, linked sequentially. It is preferred over Hash indexing because it efficiently supports range queries (e.g., WHERE age BETWEEN 20 AND 30), ORDER BY sorting, and prefix matching in O(log N) disk reads, whereas Hash indices only support O(1) point lookups.",
    tags: ["dbms", "indexing", "b-plus-tree", "sql"],
  },
  {
    category: "DBMS",
    subcategory: "Normalization",
    difficulty: "beginner",
    questionText: "Explain 1NF, 2NF, and 3NF database normalization forms and why we normalize data.",
    expectedConcepts: ["Atomic values", "Partial dependencies", "Transitive dependencies", "Data redundancy prevention"],
    modelAnswer: "Normalization reduces data redundancy and prevents update/insert/delete anomalies: 1NF requires atomic column values and primary keys; 2NF removes partial functional dependencies (attributes depending on a subset of a composite key); 3NF removes transitive dependencies (non-key attributes depending on other non-key attributes).",
    tags: ["dbms", "normalization", "database-design"],
  },

  // OS - Operating Systems
  {
    category: "OS",
    subcategory: "Processes and Threads",
    difficulty: "beginner",
    questionText: "What is the difference between a process and a thread? How does context switching differ between them?",
    expectedConcepts: ["Address space isolation", "Shared memory", "PCB vs TCB", "Context switch overhead"],
    modelAnswer: "A process is an executing program instance with its own virtual address space, file descriptors, and PCB. A thread is a lightweight unit of execution within a process sharing the same address space and heap but having its own stack and registers (TCB). Context switching between processes requires invalidating TLB caches and changing memory page tables, making it significantly more expensive than thread context switches.",
    tags: ["os", "processes", "threads", "concurrency"],
  },
  {
    category: "OS",
    subcategory: "Deadlocks",
    difficulty: "intermediate",
    questionText: "What are the four Coffman conditions necessary for a deadlock to occur, and how can resource ordering prevent circular wait?",
    expectedConcepts: ["Mutual exclusion", "Hold and wait", "No preemption", "Circular wait", "Resource allocation graph"],
    modelAnswer: "The four Coffman conditions are: 1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption, 4. Circular Wait. By establishing a strict total ordering on all system resources and mandating that processes request resources in strictly ascending numerical order, cycle formation in the Resource Allocation Graph is mathematically impossible, eliminating circular wait.",
    tags: ["os", "deadlock", "coffman", "concurrency"],
  },
  {
    category: "OS",
    subcategory: "Virtual Memory",
    difficulty: "advanced",
    questionText: "Explain how virtual memory paging, page faults, and the Translation Lookaside Buffer (TLB) work together.",
    expectedConcepts: ["Virtual to physical translation", "Page table hierarchy", "TLB cache hit/miss", "Page fault handler", "Demand paging"],
    modelAnswer: "The CPU executes instructions referencing virtual addresses. The MMU checks the TLB (hardware associative cache) for virtual-to-physical address mappings. If a TLB hit occurs, physical RAM is accessed instantly. On a TLB miss, page tables in memory are walked. If the valid bit is 0, a page fault interrupt fires, causing the OS kernel to load the requested page from disk into a physical frame and update the page table.",
    tags: ["os", "virtual-memory", "paging", "tlb"],
  },

  // Computer Networks
  {
    category: "Computer Networks",
    subcategory: "Transport Layer",
    difficulty: "intermediate",
    questionText: "Explain the TCP Three-Way Handshake and the TCP Four-Way Wave Termination. Why is TIME_WAIT necessary?",
    expectedConcepts: ["SYN, SYN-ACK, ACK", "FIN, ACK sequence", "TIME_WAIT duration (2*MSL)", "Delayed duplicate packets"],
    modelAnswer: "Handshake: Client sends SYN(seq=x); Server replies SYN(seq=y)+ACK(x+1); Client sends ACK(y+1). Termination: Active closer sends FIN; Passive sends ACK; Passive sends FIN; Active sends ACK and enters TIME_WAIT (lasting 2*MSL). TIME_WAIT ensures the final ACK is received by the peer and prevents lingering old packets from corrupting subsequent new connections on the same port tuple.",
    tags: ["networking", "tcp", "handshake", "protocols"],
  },
  {
    category: "Computer Networks",
    subcategory: "Application Layer",
    difficulty: "intermediate",
    questionText: "What happens from a networking perspective when you type https://google.com into your browser and press Enter?",
    expectedConcepts: ["DNS resolution", "ARP/Routing", "TCP handshake", "TLS 1.3 handshake", "HTTP GET", "DOM rendering"],
    modelAnswer: "1. Browser checks local DNS cache/resolver to retrieve IP. 2. ARP resolves default gateway MAC. 3. TCP 3-way handshake opens connection on port 443. 4. TLS cryptographic negotiation establishes shared session keys (Key Exchange, Certificate verification). 5. Browser issues HTTP/2 or HTTP/3 GET request. 6. Server returns encrypted payload (HTML). 7. Browser processes HTML, requests CSS/JS, and renders DOM.",
    tags: ["networking", "http", "tls", "dns"],
  },

  // Web Development & JavaScript / React / Next.js
  {
    category: "JavaScript",
    subcategory: "Event Loop",
    difficulty: "intermediate",
    questionText: "Explain the JavaScript Event Loop, Call Stack, Microtask Queue (Promises), and Macrotask Queue (setTimeout).",
    expectedConcepts: ["Single-threaded execution", "Microtasks priority", "Macrotasks order", "Starvation risks"],
    modelAnswer: "JavaScript is single-threaded with a single Call Stack. Asynchronous tasks delegate to Web APIs. When resolved, microtasks (Promise.then, MutationObserver, queueMicrotask) queue up, and macrotasks (setTimeout, setInterval, setImmediate, I/O) queue separately. After each call stack exhaustion, ALL pending microtasks are drained to completion before the next single macrotask is dequeued.",
    tags: ["javascript", "event-loop", "promises", "async"],
  },
  {
    category: "React",
    subcategory: "Internals",
    difficulty: "intermediate",
    questionText: "How does the React Fiber reconciliation algorithm work, and why was it introduced to replace the stack reconciler?",
    expectedConcepts: ["Virtual DOM diffing", "Fiber tree nodes", "Interruptible work units", "requestIdleCallback", "Concurrent Mode"],
    modelAnswer: "The original stack reconciler was recursive and non-interruptible, locking the main thread during large component tree diffs and causing jank. Fiber breaks reconciliation into discrete units of work organized as a singly-linked tree of fibers. This enables cooperative scheduling: React can pause, resume, prioritize, or abort render work without blocking user interactions or CSS animations.",
    tags: ["react", "fiber", "reconciliation", "frontend"],
  },
  {
    category: "Next.js",
    subcategory: "Architecture",
    difficulty: "intermediate",
    questionText: "Explain the difference between React Server Components (RSC) and Client Components ('use client') in Next.js App Router.",
    expectedConcepts: ["Zero bundle size", "Server-side data fetching", "Direct DB access", "Hydration boundary", "Interactivity limits"],
    modelAnswer: "Server Components execute exclusively on the server, never download their JavaScript dependencies to the client bundle (zero-bundle size), and can query databases directly without exposing API endpoints. Client Components ('use client') execute on the client during hydration and support browser APIs, React state (useState), and event listeners (onClick).",
    tags: ["nextjs", "rsc", "app-router", "react"],
  },

  // Behavioral & HR
  {
    category: "Behavioral",
    subcategory: "Problem Solving",
    difficulty: "intermediate",
    questionText: "Describe a situation where a software project you were leading or working on ran into an unexpected technical bottleneck. How did you handle it?",
    expectedConcepts: ["STAR method (Situation, Task, Action, Result)", "Root cause analysis", "Communication with stakeholders", "Measurable outcome"],
    modelAnswer: "Using the STAR method: 1. Situation: Describe the architecture and deadline. 2. Task: Identify the exact bottleneck (e.g., database CPU spiking to 99% under load). 3. Action: Profile queries, identify missing composite indices, implement Redis caching, and coordinate a phased deployment. 4. Result: Reduced latency from 1.8s to 45ms and hit launch goals on time.",
    tags: ["behavioral", "star-method", "leadership", "debugging"],
  },
  {
    category: "HR",
    subcategory: "Career Goals",
    difficulty: "beginner",
    questionText: "Where do you see yourself in the next 3 to 5 years, and how does this role align with your long-term engineering career trajectory?",
    expectedConcepts: ["Growth mindset", "Technical depth", "Ownership and mentorship", "Alignment with company mission"],
    modelAnswer: "Over the next 3 years, my goal is to transition from mastering core product engineering to taking ownership of end-to-end distributed system architectures. I aim to deepen my expertise in cloud-native scalable systems, mentor junior engineers, and contribute to system reliability and performance.",
    tags: ["hr", "career-growth", "goals"],
  },
];

async function main() {
  console.log("🌱 Starting seed execution...");

  // 1. Create Demo User
  const passwordHash = await bcrypt.hash("demo123456", 10);
  const user = await prisma.user.upsert({
    where: { email: "demo@careerpilot.com" },
    update: { passwordHash, name: "Demo Candidate" },
    create: {
      email: "demo@careerpilot.com",
      name: "Demo Candidate",
      passwordHash,
    },
  });
  console.log(`✅ Demo User ready: ${user.email} (id: ${user.id})`);

  // 2. Create User Profile
  await prisma.profile.upsert({
    where: { userId: user.id },
    update: {
      targetRole: "Full Stack Software Engineer",
      experienceLevel: "fresher",
      bio: "Passionate Computer Science graduate specializing in modern web architectures, distributed systems, and cloud computing.",
      skills: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Prisma", "Python", "Git"],
    },
    create: {
      userId: user.id,
      targetRole: "Full Stack Software Engineer",
      experienceLevel: "fresher",
      bio: "Passionate Computer Science graduate specializing in modern web architectures, distributed systems, and cloud computing.",
      skills: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Prisma", "Python", "Git"],
    },
  });

  // 3. Create Sample Resume Analysis
  const existingResume = await prisma.resume.findFirst({ where: { userId: user.id } });
  if (!existingResume) {
    await prisma.resume.create({
      data: {
        userId: user.id,
        fileName: "Demo_Resume_Alex_Morgan.pdf",
        fileSize: 145000,
        extractedText: "Alex Morgan - BTech Computer Science. Skills: JavaScript, React, Node.js, Python, PostgreSQL. Projects: E-Commerce Web App, Realtime Chat...",
        atsScore: 78,
        skills: ["JavaScript", "TypeScript", "React", "Node.js", "PostgreSQL", "Python", "Git", "REST APIs"],
        analysisResult: {
          overallScore: 78,
          summary: "Strong candidate with comprehensive foundational knowledge in web development and CS concepts.",
          skills: {
            technical: ["JavaScript", "TypeScript", "React", "Node.js", "PostgreSQL", "Python", "Git"],
            soft: ["Problem Solving", "Collaboration", "Fast Learner"],
            missing: ["System Design", "Docker", "Kubernetes", "AWS", "CI/CD"],
          },
          experience: {
            totalYears: 1,
            highlights: ["Built scalable e-commerce MVP", "Optimized SQL queries by 35%"],
            suggestions: ["Quantify impact with numbers and business metrics"],
          },
          education: [{ degree: "B.Tech in Computer Science", institution: "Tech University", relevance: "Directly relevant" }],
          projects: [
            { name: "Full-Stack E-Commerce", technologies: ["Next.js", "PostgreSQL"], strength: "Modern tech stack", suggestion: "Add CI/CD pipeline" }
          ],
          atsScore: 78,
          improvements: [
            { category: "Cloud & DevOps", suggestion: "Add Docker and AWS deployment experience", priority: "high" },
            { category: "Metrics", suggestion: "Use STAR format with metrics in project bullets", priority: "medium" }
          ],
          strengths: ["Strong web fundamentals", "Good full-stack project portfolio"],
          weaknesses: ["Missing DevOps & distributed systems experience"],
        },
      },
    });
    console.log("✅ Seeded sample Resume");
  }

  // 4. Create Sample Completed Interview
  const existingInterview = await prisma.interview.findFirst({ where: { userId: user.id } });
  if (!existingInterview) {
    const interview = await prisma.interview.create({
      data: {
        userId: user.id,
        type: "mixed",
        difficulty: "intermediate",
        targetRole: "Full Stack Software Engineer",
        status: "completed",
        totalQuestions: 3,
        currentQuestion: 3,
        overallScore: 84,
        report: {
          overallScore: 84,
          technicalScore: 86,
          communicationScore: 82,
          problemSolvingScore: 85,
          behavioralScore: 83,
          strongAreas: ["Strong grasp of OOP principles", "Clear, concise technical articulation", "Good analytical approach"],
          areasToImprove: ["Deeper knowledge of React Fiber internals", "Include time/space complexity without being prompted"],
          suggestedTopics: ["System Design Primer", "React Concurrent Features", "Distributed Transactions"],
          recommendedDifficulty: "advanced",
          personalizedStudyPlan: [
            "Week 1: Master Two-Pointer and Sliding Window problems",
            "Week 2: Deep dive into PostgreSQL indexing and isolation levels",
            "Week 3: Study Load Balancers and Caching patterns",
            "Week 4: Mock interviews with focus on system design and STAR behavioral answers"
          ],
          summary: "Demonstrated strong knowledge of full-stack concepts, cleanly articulated answers with structured reasoning.",
        },
      },
    });

    // Seed questions for this interview
    const q1 = await prisma.interviewQuestion.create({
      data: {
        interviewId: interview.id,
        questionText: "Explain the difference between let, const, and var in JavaScript.",
        questionType: "technical",
        difficulty: "beginner",
        orderIndex: 0,
      },
    });

    await prisma.interviewAnswer.create({
      data: {
        questionId: q1.id,
        answerText: "var is function-scoped and hoisted with undefined. let and const are block-scoped and live in a temporal dead zone until declared. const cannot be reassigned.",
        score: 88,
        evaluation: {
          overallScore: 88,
          feedback: "Accurate explanation highlighting scope and temporal dead zone.",
          strengths: ["Correctly mentioned Temporal Dead Zone", "Clear distinction between block and function scope"],
          improvements: ["Mention that const objects can still have mutated properties"],
          betterAnswer: "var is function-scoped and hoisted with undefined. let and const are block-scoped and hoisted into the Temporal Dead Zone (TDZ). Furthermore, const identifiers cannot be reassigned, though object properties can still be mutated.",
        },
      },
    });
    console.log("✅ Seeded sample Interview with Q&A");
  }

  // 5. Create Sample User Progress
  await prisma.userProgress.upsert({
    where: { userId: user.id },
    update: {
      totalInterviews: 4,
      avgScore: 81.5,
      bestScore: 88,
      questionsAttempted: 14,
      questionsCompleted: 14,
      topicScores: {
        DSA: 78,
        OOP: 85,
        DBMS: 82,
        React: 90,
        Behavioral: 80,
      },
    },
    create: {
      userId: user.id,
      totalInterviews: 4,
      avgScore: 81.5,
      bestScore: 88,
      questionsAttempted: 14,
      questionsCompleted: 14,
      topicScores: {
        DSA: 78,
        OOP: 85,
        DBMS: 82,
        React: 90,
        Behavioral: 80,
      },
    },
  });

  // 6. Seed Question Bank (insert or ignore duplicates)
  console.log(`📚 Seeding ${seedQuestions.length} categorized interview questions...`);
  for (const q of seedQuestions) {
    const existing = await prisma.question.findFirst({
      where: { questionText: q.questionText },
    });
    if (!existing) {
      await prisma.question.create({ data: q });
    }
  }
  console.log("✅ Question bank seeded successfully!");

  console.log("🎉 Database seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
