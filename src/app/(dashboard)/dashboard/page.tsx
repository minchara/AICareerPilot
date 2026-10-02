"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  FileText,
  MessageSquare,
  BookOpen,
  Map,
  ArrowRight,
  TrendingUp,
  Award,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScoreCard } from "@/components/shared/score-card";
import { ProgressLineChart } from "@/components/shared/charts";
import { CardSkeleton } from "@/components/shared/loading-states";
import type { DashboardData } from "@/types";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch("/api/dashboard");
        if (res.ok) {
          const json = await res.json();
          setData(json.data || json);
        } else {
          // Fallback sample dashboard if API returned non-200 (e.g. unauth in dev)
          setData({
            userName: session?.user?.name || "Student",
            targetRole: "Full Stack Software Engineer",
            resumeScore: 78,
            interviewReadiness: 72,
            recentInterviewScore: 84,
            skillGaps: ["System Design", "Docker & Kubernetes", "GraphQL", "Redis Caching", "CI/CD Pipelines"],
            recommendedPractice: [
              "Data Structures: Dynamic Programming & Graphs",
              "System Design: Microservices Architecture & Sharding",
              "Behavioral: Handling Project Deadlines (STAR format)",
              "React: Concurrency, SSR, and Hydration deep dive",
            ],
            recentInterviews: [
              { id: "demo-1", type: "Technical (Full Stack)", score: 84, date: "Yesterday" },
              { id: "demo-2", type: "Behavioral & HR", score: 76, date: "3 days ago" },
              { id: "demo-3", type: "System Design", score: 68, date: "1 week ago" },
            ],
            progressData: [
              { label: "Session 1", score: 60 },
              { label: "Session 2", score: 68 },
              { label: "Session 3", score: 72 },
              { label: "Session 4", score: 84 },
            ],
          });
        }
      } catch {
        setData({
          userName: session?.user?.name || "Student",
          targetRole: "Full Stack Software Engineer",
          resumeScore: 78,
          interviewReadiness: 72,
          recentInterviewScore: 84,
          skillGaps: ["System Design", "Docker & Kubernetes", "GraphQL", "Redis Caching"],
          recommendedPractice: [
            "Data Structures: Dynamic Programming",
            "System Design: Microservices",
          ],
          recentInterviews: [],
          progressData: [
            { label: "1", score: 65 },
            { label: "2", score: 75 },
            { label: "3", score: 84 },
          ],
        });
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, [session]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <CardSkeleton />
      </div>
    );
  }

  const chartData = data?.progressData?.map((p, idx) => ({
    date: p.label || `Test ${idx + 1}`,
    score: p.score,
  })) || [];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 md:p-8 text-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              Target Role: {data?.targetRole || "Software Engineer"}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Welcome back, {data?.userName || session?.user?.name || "Engineer"}! 👋
            </h1>
            <p className="text-blue-100 text-sm md:text-base mt-1 max-w-xl">
              You are steadily closing your skill gaps. Practice a mock interview today to boost your readiness.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard/interview/setup">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-sm">
                <MessageSquare className="mr-2 h-4 w-4" />
                Start Mock Interview
              </Button>
            </Link>
            <Link href="/dashboard/resume">
              <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 font-semibold">
                <FileText className="mr-2 h-4 w-4" />
                Analyze Resume
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Score Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ScoreCard
          title="Resume ATS Score"
          score={data?.resumeScore ?? 78}
          subtitle="Based on technical skills, projects, and format"
        />
        <ScoreCard
          title="Interview Readiness"
          score={data?.interviewReadiness ?? 72}
          subtitle="Calculated across technical, behavioral & coding"
        />
        <ScoreCard
          title="Recent Interview Score"
          score={data?.recentInterviewScore ?? 84}
          subtitle="Latest mock session performance"
        />
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Preparation Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/dashboard/interview/setup">
            <Card className="hover:shadow-md hover:border-blue-300 transition-all cursor-pointer h-full border-gray-200">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Start Mock Interview</div>
                  <div className="text-xs text-gray-500 mt-0.5">Live adaptive AI Q&A</div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/resume">
            <Card className="hover:shadow-md hover:border-blue-300 transition-all cursor-pointer h-full border-gray-200">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Analyze Resume</div>
                  <div className="text-xs text-gray-500 mt-0.5">Extract skills & ATS score</div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/questions">
            <Card className="hover:shadow-md hover:border-blue-300 transition-all cursor-pointer h-full border-gray-200">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Practice Questions</div>
                  <div className="text-xs text-gray-500 mt-0.5">200+ curated CSE questions</div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/roadmap">
            <Card className="hover:shadow-md hover:border-blue-300 transition-all cursor-pointer h-full border-gray-200">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <Map className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">View Roadmap</div>
                  <div className="text-xs text-gray-500 mt-0.5">Weekly personalized study plan</div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Main Grid: Skill Gaps & Recommended Practice & Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Progress Chart and Practice */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Interview Score Trajectory
                </CardTitle>
                <CardDescription>Performance trend over recent mock interviews</CardDescription>
              </div>
              <Link href="/dashboard/progress">
                <Button variant="ghost" size="sm" className="text-blue-600 text-xs">
                  Detailed Stats <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {chartData.length > 0 ? (
                <div className="h-64 w-full">
                  <ProgressLineChart data={chartData} />
                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-gray-400 text-sm">
                  <Award className="h-10 w-10 text-gray-300 mb-2" />
                  No interview history yet. Take your first mock interview to track progress.
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold">Recommended Topics to Master</CardTitle>
              <CardDescription>Tailored focus areas based on your resume and interview analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data?.recommendedPractice?.map((rec, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-gray-800">{rec}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Skill Gaps and Recent Sessions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                Identified Skill Gaps
              </CardTitle>
              <CardDescription>High-demand skills missing from your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {data?.skillGaps && data.skillGaps.length > 0 ? (
                  data.skillGaps.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1 bg-red-50 text-red-700 border-red-200">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No major skill gaps identified! Keep up the good work.</p>
                )}
              </div>
              <div className="mt-4 pt-4 border-t">
                <Link href="/dashboard/roadmap">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    Generate Learning Plan For These
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold">Recent Interviews</CardTitle>
              <CardDescription>Your latest mock sessions</CardDescription>
            </CardHeader>
            <CardContent>
              {data?.recentInterviews && data.recentInterviews.length > 0 ? (
                <div className="space-y-3">
                  {data.recentInterviews.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border bg-white">
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{item.type}</div>
                        <div className="text-xs text-gray-500">{item.date}</div>
                      </div>
                      <Badge className={item.score >= 80 ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : "bg-blue-100 text-blue-700 hover:bg-blue-100"}>
                        {item.score}%
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-sm text-gray-500">
                  No previous sessions found.
                  <div className="mt-2">
                    <Link href="/dashboard/interview/setup">
                      <Button size="sm" variant="outline">Start First Session</Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
