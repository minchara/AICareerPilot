"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, TrendingUp, Award, Target, Hash, ChevronRight } from "lucide-react";

// Fallback charts if shared ones not available
const ProgressLineChart = () => (
  <div className="h-[300px] w-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-muted-foreground rounded-lg border border-dashed">
    [Score Trajectory Line Chart]
  </div>
);

const ScoreBarChart = () => (
  <div className="h-[300px] w-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-muted-foreground rounded-lg border border-dashed">
    [Category Performance Bar Chart]
  </div>
);

const MOCK_STATS = {
  totalInterviews: 8,
  avgScore: 72,
  bestScore: 88,
  questionsAttempted: 45,
};

const MOCK_HISTORY = [
  { id: "int_8", date: "Oct 12, 2023", role: "Frontend Eng.", type: "Technical", difficulty: "Intermediate", score: 88 },
  { id: "int_7", date: "Oct 05, 2023", role: "Frontend Eng.", type: "Behavioral", difficulty: "Beginner", score: 85 },
  { id: "int_6", date: "Sep 28, 2023", role: "Frontend Eng.", type: "System Design", difficulty: "Intermediate", score: 65 },
  { id: "int_5", date: "Sep 20, 2023", role: "Fullstack Eng.", type: "Technical", difficulty: "Beginner", score: 78 },
  { id: "int_4", date: "Sep 15, 2023", role: "Fullstack Eng.", type: "Technical", difficulty: "Intermediate", score: 72 },
];

export default function ProgressPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch from /api/progress
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8 max-w-6xl pb-24">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Progress Tracking</h1>
        <p className="text-muted-foreground mt-1">Analyze your interview performance and growth over time.</p>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
            <div className="p-3 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
              <Hash className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Total Interviews</p>
            <p className="text-3xl font-bold">{MOCK_STATS.totalInterviews}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
            <div className="p-3 bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 rounded-full">
              <TrendingUp className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Average Score</p>
            <p className="text-3xl font-bold">{MOCK_STATS.avgScore}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
            <div className="p-3 bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 rounded-full">
              <Award className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Best Score</p>
            <p className="text-3xl font-bold">{MOCK_STATS.bestScore}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
            <div className="p-3 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-full">
              <Target className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Questions Attempted</p>
            <p className="text-3xl font-bold">{MOCK_STATS.questionsAttempted}</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Score Trajectory</CardTitle>
            <CardDescription>Your overall performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ProgressLineChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Performance by Category</CardTitle>
            <CardDescription>Strengths and weaknesses across topics</CardDescription>
          </CardHeader>
          <CardContent>
            <ScoreBarChart />
          </CardContent>
        </Card>
      </div>

      {/* History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Interview History</CardTitle>
          <CardDescription>Review past sessions and reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_HISTORY.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium whitespace-nowrap">{item.date}</TableCell>
                    <TableCell>{item.role}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal text-xs">
                        {item.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.score >= 80 ? "default" : item.score >= 70 ? "secondary" : "destructive"}>
                        {item.score}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/dashboard/interview/report/${item.id}`}>
                          View <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
