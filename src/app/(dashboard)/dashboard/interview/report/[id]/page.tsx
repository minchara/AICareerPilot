"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Loader2, Download, RefreshCcw, Map, CheckCircle2, AlertTriangle, ArrowRight, Printer } from "lucide-react";
import Link from "next/link";
// Assuming shared chart components are available
// import { ScoreRadarChart } from "@/components/shared/charts";

// Temporary fallback chart component if shared one is missing
const ScoreRadarChart = ({ data }: { data: any }) => (
  <div className="h-[300px] w-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-muted-foreground rounded-lg border border-dashed">
    [Score Radar Chart Visualization]
  </div>
);

export default function InterviewReportPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    // Simulating API fetch
    const fetchReport = async () => {
      setLoading(true);
      try {
        // Mock data for demonstration
        setTimeout(() => {
          setReport({
            id,
            overallScore: 78,
            targetRole: "Frontend Engineer",
            interviewType: "Technical + Behavioral",
            difficulty: "Intermediate",
            date: new Date().toLocaleDateString(),
            status: "Needs More Practice",
            scores: {
              technical: 80,
              communication: 75,
              problemSolving: 70,
              behavioral: 85,
            },
            questions: [
              {
                id: "q1",
                text: "Explain the difference between useMemo and useCallback.",
                difficulty: "Intermediate",
                candidateAnswer: "useMemo is for caching a value, while useCallback is for caching a function reference.",
                score: 8,
                feedback: "Good concise answer. You correctly identified the primary difference.",
                strengths: ["Clear distinction", "Accurate definition"],
                areasToImprove: ["Could have mentioned dependency arrays", "Lack of examples"],
                modelAnswer: "useMemo is a React Hook that lets you cache the result of a calculation between re-renders... useCallback is a React Hook that lets you cache a function definition between re-renders. Both rely on dependency arrays to determine when to re-compute."
              },
              {
                id: "q2",
                text: "Tell me about a time you had a conflict with a teammate.",
                difficulty: "Beginner",
                candidateAnswer: "I try to avoid conflicts. If one happens, I talk to the manager.",
                score: 5,
                feedback: "This answer lacks depth and avoids the STAR method. Conflict resolution is a key soft skill.",
                strengths: ["Honest approach"],
                areasToImprove: ["Use STAR method", "Show proactiveness instead of relying on manager"],
                modelAnswer: "[STAR Method Approach] Situation: We disagreed on the architecture. Task: We needed to deliver in 2 weeks. Action: I scheduled a 1-on-1 to understand their concerns and proposed a compromise. Result: We merged our ideas and delivered on time."
              }
            ],
            insights: {
              strengths: ["Strong technical fundamentals", "Honest communication"],
              weaknesses: ["Behavioral question structuring (STAR)", "Expanding on technical examples"],
              nextSteps: ["Practice behavioral questions using the STAR framework", "Review React hooks dependency array nuances"],
              nextDifficulty: "Intermediate"
            }
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Failed to fetch report", error);
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Analyzing interview performance...</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <AlertTriangle className="h-12 w-12 text-destructive" />
        <h2 className="text-xl font-semibold">Report Not Found</h2>
        <p className="text-muted-foreground">Could not load the interview report.</p>
        <Button onClick={() => router.push('/dashboard/progress')}>Back to Progress</Button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8 max-w-6xl pb-24">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Interview Report</h1>
          <p className="text-muted-foreground">Conducted on {report.date}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint} className="print:hidden">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" asChild className="print:hidden">
            <Link href="/dashboard/interview">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Retake
            </Link>
          </Button>
          <Button asChild className="print:hidden">
            <Link href="/dashboard/roadmap">
              <Map className="mr-2 h-4 w-4" />
              View Roadmap
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 flex flex-col items-center justify-center p-6 bg-primary/5 border-primary/20">
          <div className="relative flex items-center justify-center h-40 w-40 rounded-full border-8 border-primary/20">
            <span className="text-5xl font-bold text-primary">{report.overallScore}</span>
            <svg className="absolute inset-0 h-full w-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                className="text-primary stroke-current transition-all duration-1000 ease-out"
                strokeWidth="8"
                strokeDasharray={`${report.overallScore * 2.83} 283`}
                strokeLinecap="round"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-xl font-semibold">Overall Score</h3>
          <Badge variant={report.overallScore > 75 ? "default" : "secondary"} className="mt-2 text-sm px-3 py-1">
            {report.status}
          </Badge>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Interview Details</CardTitle>
            <CardDescription>Overview of your session configuration</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Target Role</p>
              <p className="text-lg font-medium">{report.targetRole}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Interview Type</p>
              <p className="text-lg font-medium">{report.interviewType}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Difficulty</p>
              <p className="text-lg font-medium">{report.difficulty}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Session ID</p>
              <p className="text-sm font-mono mt-1">{report.id}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Score Breakdown & Radar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Breakdown</CardTitle>
            <CardDescription>Detailed metrics across key competencies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Technical Knowledge</span>
                <span className="text-sm font-bold">{report.scores.technical}/100</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${report.scores.technical}%` }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Communication</span>
                <span className="text-sm font-bold">{report.scores.communication}/100</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${report.scores.communication}%` }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Problem Solving</span>
                <span className="text-sm font-bold">{report.scores.problemSolving}/100</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${report.scores.problemSolving}%` }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Behavioral / Soft Skills</span>
                <span className="text-sm font-bold">{report.scores.behavioral}/100</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${report.scores.behavioral}%` }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skill Profile</CardTitle>
            <CardDescription>Radar chart visualization of your competencies</CardDescription>
          </CardHeader>
          <CardContent>
            <ScoreRadarChart data={report.scores} />
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-green-200 dark:border-green-900 bg-green-50/50 dark:bg-green-900/10">
          <CardHeader>
            <CardTitle className="flex items-center text-green-700 dark:text-green-500">
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Key Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {report.insights.strengths.map((strength: string, i: number) => (
                <li key={i} className="flex items-start">
                  <span className="mr-2 text-green-600 font-bold">•</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-900/10">
          <CardHeader>
            <CardTitle className="flex items-center text-amber-700 dark:text-amber-500">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {report.insights.weaknesses.map((weakness: string, i: number) => (
                <li key={i} className="flex items-start">
                  <span className="mr-2 text-amber-600 font-bold">•</span>
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recommended Action Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ul className="space-y-3">
                {report.insights.nextSteps.map((step: string, i: number) => (
                  <li key={i} className="flex items-center p-3 bg-muted rounded-lg">
                    <ArrowRight className="mr-3 h-4 w-4 text-primary" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 p-4 border rounded-lg bg-primary/5 flex items-center justify-between">
                <div>
                  <p className="font-semibold">Next Interview Recommendation</p>
                  <p className="text-sm text-muted-foreground">Based on your performance, try tackling these next.</p>
                </div>
                <Badge variant="outline" className="text-base px-4 py-1 border-primary text-primary">
                  {report.insights.nextDifficulty} Level
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Question-by-Question Deep Dive */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Question Deep Dive</h2>
        <Accordion type="multiple" className="w-full space-y-4">
          {report.questions.map((q: any, index: number) => (
            <AccordionItem key={q.id} value={q.id} className="border rounded-lg bg-card px-4 shadow-sm">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex flex-col items-start text-left w-full gap-2">
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {index + 1}
                      </span>
                      <h4 className="font-semibold text-base">{q.text}</h4>
                    </div>
                    <Badge variant={q.score >= 8 ? "default" : q.score >= 5 ? "secondary" : "destructive"}>
                      {q.score}/10
                    </Badge>
                  </div>
                  <Badge variant="outline" className="ml-9 text-xs">{q.difficulty}</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-6 space-y-6">
                
                {/* Your Answer */}
                <div className="space-y-2 ml-9">
                  <h5 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Your Answer</h5>
                  <div className="p-4 rounded-md bg-muted/50 border border-muted-foreground/10 text-sm italic">
                    "{q.candidateAnswer}"
                  </div>
                </div>

                {/* AI Feedback */}
                <div className="space-y-3 ml-9">
                  <h5 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">AI Evaluation</h5>
                  <p className="text-sm leading-relaxed">{q.feedback}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-green-600 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Strengths
                      </p>
                      <ul className="text-sm list-disc pl-4 space-y-1 text-muted-foreground">
                        {q.strengths.map((s: string, i: number) => <li key={i}>{s}</li>)}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-amber-600 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" /> Areas to Improve
                      </p>
                      <ul className="text-sm list-disc pl-4 space-y-1 text-muted-foreground">
                        {q.areasToImprove.map((a: string, i: number) => <li key={i}>{a}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Model Answer */}
                <div className="space-y-2 ml-9 mt-4">
                  <h5 className="font-medium text-sm text-primary uppercase tracking-wider">Better Answer / Model</h5>
                  <div className="p-4 rounded-md bg-primary/5 border border-primary/20 text-sm">
                    {q.modelAnswer}
                  </div>
                </div>

              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

    </div>
  );
}
