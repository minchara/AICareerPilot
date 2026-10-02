"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileText, CheckCircle, AlertTriangle, ChevronRight, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock types
type ResumeAnalysis = {
  overallScore: number;
  atsScore: number;
  strengths: string[];
  improvements: string[];
  executiveSummary: string;
  skills: {
    technical: string[];
    soft: string[];
    missing: string[];
  };
  experience: {
    highlights: string[];
    projectEvaluations: { title: string; strengths: string; suggestions: string }[];
  };
  recommendations: { level: "High" | "Medium" | "Low"; text: string }[];
};

export default function ResumeAnalyzerPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages = [
    "Extracting text from resume...",
    "Identifying technical & soft skills...",
    "Evaluating ATS formatting...",
    "Generating recommendations...",
  ];

  useEffect(() => {
    // Check for existing analysis on mount
    fetchLatestAnalysis();
  }, []);

  const fetchLatestAnalysis = async () => {
    try {
      const res = await fetch("/api/resume/latest");
      if (res.ok) {
        const data = await res.json();
        setAnalysis(data);
      }
    } catch (error) {
      console.error("Failed to fetch latest analysis", error);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf" || droppedFile.name.endsWith(".docx")) {
        setFile(droppedFile);
      } else {
        alert("Please upload a PDF or DOCX file.");
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setLoadingStep(0);

    // Simulate loading steps
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 1500);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      // Simulated API call
      // const res = await fetch('/api/resume/upload', { method: 'POST', body: formData });
      // const data = await res.json();
      
      // Mock data for demonstration
      await new Promise((resolve) => setTimeout(resolve, 6000));
      
      const mockAnalysis: ResumeAnalysis = {
        overallScore: 78,
        atsScore: 85,
        strengths: ["Strong technical vocabulary", "Clear action verbs", "Good project descriptions"],
        improvements: ["Quantify achievements more", "Add missing core skills", "Reduce bullet point length"],
        executiveSummary: "Your resume shows a solid foundation in software development with good project experience. However, to pass ATS filters more effectively for senior roles, you should focus on quantifying your impact and adding a few key missing skills.",
        skills: {
          technical: ["React", "Next.js", "TypeScript", "Node.js"],
          soft: ["Leadership", "Communication", "Agile"],
          missing: ["Docker", "AWS", "GraphQL"],
        },
        experience: {
          highlights: ["Led a team of 4 developers", "Improved performance by 30%"],
          projectEvaluations: [
            { title: "E-commerce Platform", strengths: "Good architecture details", suggestions: "Mention user metrics" },
          ],
        },
        recommendations: [
          { level: "High", text: "Add metrics to your most recent role (e.g., increased revenue by X%)." },
          { level: "Medium", text: "Include missing skills like Docker if you have experience with them." },
        ],
      };
      
      setAnalysis(mockAnalysis);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      clearInterval(interval);
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resume Analyzer</h1>
          <p className="text-muted-foreground mt-1">Upload your resume to get AI-powered feedback and ATS compatibility scores.</p>
        </div>
        {analysis && (
          <Button onClick={() => router.push("/dashboard/interview/setup")}>
            Prepare for Interview
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      {!analysis && !isUploading && (
        <Card>
          <CardContent className="pt-6">
            <div
              className="border-2 border-dashed rounded-lg p-12 text-center hover:bg-muted/50 transition-colors cursor-pointer"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
              />
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-medium">Drag & drop your resume here</p>
                  <p className="text-sm text-muted-foreground">Supports PDF and DOCX (Max 5MB)</p>
                </div>
              </div>
            </div>
            {file && (
              <div className="mt-6 flex items-center justify-between p-4 border rounded-lg bg-muted/20">
                <div className="flex items-center space-x-3">
                  <FileText className="h-6 w-6 text-blue-500" />
                  <div>
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <Button onClick={handleUpload}>Analyze Resume</Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {isUploading && (
        <Card>
          <CardContent className="pt-12 pb-12 flex flex-col items-center justify-center space-y-6">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <div className="space-y-2 text-center">
              <h3 className="text-lg font-medium">{loadingMessages[loadingStep]}</h3>
              <Progress value={(loadingStep + 1) * 25} className="w-64 h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {analysis && !isUploading && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analysis.overallScore}/100</div>
                <Progress value={analysis.overallScore} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ATS Compatibility</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analysis.atsScore}%</div>
                <Progress value={analysis.atsScore} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Key Strengths</CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analysis.strengths.length} Found</div>
                <p className="text-xs text-muted-foreground mt-2">Areas where you excel</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
              <TabsTrigger value="experience">Experience & Projects</TabsTrigger>
              <TabsTrigger value="ats">ATS & Recommendations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Executive Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{analysis.executiveSummary}</p>
                </CardContent>
              </Card>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Strengths</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      {analysis.strengths.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Areas for Improvement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      {analysis.improvements.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Skills</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {analysis.skills.technical.map((s, i) => <Badge key={i} variant="secondary">{s}</Badge>)}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Soft Skills</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {analysis.skills.soft.map((s, i) => <Badge key={i} variant="outline">{s}</Badge>)}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Missing Skills (Suggested)</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {analysis.skills.missing.map((s, i) => <Badge key={i} variant="destructive">{s}</Badge>)}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="space-y-4">
               <Card>
                <CardHeader>
                  <CardTitle>Work Experience Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    {analysis.experience.highlights.map((h, i) => <li key={i}>{h}</li>)}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Project Evaluations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysis.experience.projectEvaluations.map((p, i) => (
                    <div key={i} className="border p-4 rounded-lg">
                      <h4 className="font-semibold">{p.title}</h4>
                      <p className="text-sm mt-1"><strong>Strength:</strong> {p.strengths}</p>
                      <p className="text-sm mt-1"><strong>Suggestion:</strong> {p.suggestions}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ats" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Actionable Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysis.recommendations.map((r, i) => (
                    <div key={i} className="flex items-start space-x-3 border-b pb-4 last:border-0 last:pb-0">
                      <Badge variant={r.level === 'High' ? 'destructive' : r.level === 'Medium' ? 'default' : 'secondary'}>
                        {r.level} Priority
                      </Badge>
                      <p className="text-sm">{r.text}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
