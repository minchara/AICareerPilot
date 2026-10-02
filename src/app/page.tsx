"use client";

import Link from "next/link";
import {
  Brain,
  FileText,
  MessageSquare,
  Target,
  BarChart3,
  Map,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Users,
  BookOpen,
  Code2,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "AI Resume Analyzer",
    description:
      "Upload your resume and get detailed AI-powered analysis with ATS scoring, skill extraction, and improvement suggestions.",
  },
  {
    icon: MessageSquare,
    title: "AI Mock Interviews",
    description:
      "Practice with an AI interviewer that adapts to your skill level, asks follow-up questions, and provides real-time evaluation.",
  },
  {
    icon: Target,
    title: "Skill Gap Analysis",
    description:
      "Compare your resume against job descriptions to identify missing skills and get personalized learning recommendations.",
  },
  {
    icon: BarChart3,
    title: "Performance Tracking",
    description:
      "Track your interview scores, question performance, and improvement over time with detailed analytics.",
  },
  {
    icon: Map,
    title: "Preparation Roadmap",
    description:
      "Get a personalized week-by-week preparation plan based on your target role, current skills, and weak areas.",
  },
  {
    icon: BookOpen,
    title: "Question Bank",
    description:
      "Access 200+ categorized interview questions covering DSA, OOP, DBMS, OS, and behavioral topics.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Upload Your Resume",
    description: "Upload your resume in PDF or DOCX format. Our AI extracts and analyzes your skills, experience, and projects.",
  },
  {
    step: "02",
    title: "Set Your Target",
    description: "Enter your target job role and optionally paste a job description for personalized preparation.",
  },
  {
    step: "03",
    title: "Practice Interviews",
    description: "Take AI-powered mock interviews tailored to your level — technical, behavioral, HR, or coding.",
  },
  {
    step: "04",
    title: "Improve & Track",
    description: "Review detailed feedback, follow your roadmap, and track your improvement over time.",
  },
];

const techStack = [
  "Next.js",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "PostgreSQL",
  "Prisma",
  "OpenAI",
  "NextAuth.js",
];

const stats = [
  { value: "200+", label: "Interview Questions" },
  { value: "6", label: "AI Services" },
  { value: "14+", label: "Question Categories" },
  { value: "5", label: "Interview Types" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold">
                AI <span className="text-blue-600">CareerPilot</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                How It Works
              </a>
              <a href="#tech" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Technology
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm text-blue-700 mb-6">
              <Sparkles className="h-4 w-4" />
              AI-Powered Interview Preparation
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Ace Your Next Interview with{" "}
              <span className="gradient-text">AI-Powered</span> Preparation
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Upload your resume, practice with AI mock interviews, get
              personalized feedback, and track your improvement. Everything you
              need to land your dream job.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30"
              >
                <MessageSquare className="h-5 w-5" />
                Start Mock Interview
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
              >
                <FileText className="h-5 w-5" />
                Analyze My Resume
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Prepare
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A comprehensive AI-powered platform covering every aspect of
              interview preparation.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-6 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300 bg-white"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get started in minutes with our simple four-step process.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item) => (
              <div key={item.step} className="relative">
                <div className="text-6xl font-bold text-blue-100 mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="tech" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built with Modern Technology
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Production-quality tech stack used by industry leaders.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech) => (
              <div
                key={tech}
                className="px-6 py-3 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-700 transition-colors"
              >
                {tech}
              </div>
            ))}
          </div>
          <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <Shield className="h-10 w-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Secure</h3>
              <p className="text-sm text-gray-600">
                Your data is encrypted and never shared with third parties.
              </p>
            </div>
            <div className="text-center p-6">
              <Zap className="h-10 w-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Fast</h3>
              <p className="text-sm text-gray-600">
                AI-powered analysis in seconds, not hours.
              </p>
            </div>
            <div className="text-center p-6">
              <Users className="h-10 w-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Personalized</h3>
              <p className="text-sm text-gray-600">
                Tailored preparation based on your unique profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Ace Your Interview?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join AI CareerPilot and start your personalized interview
            preparation journey today.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-3 text-base font-medium text-blue-600 bg-white rounded-lg hover:bg-blue-50 transition-colors"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-blue-600" />
              <span className="font-bold">
                AI <span className="text-blue-600">CareerPilot</span>
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <a href="#features" className="hover:text-gray-900 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="hover:text-gray-900 transition-colors">
                How It Works
              </a>
              <Link href="/login" className="hover:text-gray-900 transition-colors">
                Login
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} AI CareerPilot. Built as a BTech CSE project.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
