"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Building, Briefcase, FileSearch, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

type JobAnalysis = {
  matchScore: number;
  requiredSkills: string[];
  preferredSkills: string[];
  resumeComparison: {
    matching: string[];
    missing: string[];
    suggested: string[];
  };
  keyResponsibilities: string[];
  interviewTopics: string[];
};

export default function JobAnalyzerPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ title: "", company: "", description: "" });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<JobAnalysis | null>(null);

  const handleAnalyze = async () => {
    if (!formData.title || !formData.description) return;
    setIsAnalyzing(true);
    
    // Simulating API Call
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setAnalysis({
        matchScore: 82,
        requiredSkills: ["React", "TypeScript", "Node.js", "REST APIs"],
        preferredSkills: ["GraphQL", "AWS", "CI/CD"],
        resumeComparison: {
          matching: ["React", "TypeScript", "Node.js"],
          missing: ["AWS", "CI/CD"],
          suggested: ["Docker", "GraphQL"],
        },
        keyResponsibilities: [
          "Develop user-facing features using React",
          "Build scalable backend services with Node.js",
          "Collaborate with cross-functional teams",
        ],
        interviewTopics: [
          "React Performance Optimization",
          "System Design for Microservices",
          "Handling asynchronous state in TS",
        ]
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Job Description Analyzer</h1>
        <p className="text-muted-foreground mt-1">Paste a job description to see how well you match and prepare for the interview.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>Enter the job requirements you want to analyze.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="title" 
                  placeholder="e.g. Senior Frontend Engineer" 
                  className="pl-9"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company Name (Optional)</Label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="company" 
                  placeholder="e.g. Acme Corp" 
                  className="pl-9"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Job Description *</Label>
              <Textarea 
                id="description" 
                placeholder="Paste the full job description here..." 
                className="min-h-[250px]"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <Button 
              className="w-full" 
              onClick={handleAnalyze} 
              disabled={isAnalyzing || !formData.title || !formData.description}
            >
              {isAnalyzing ? (
                <span className="flex items-center">
                  <FileSearch className="mr-2 h-4 w-4 animate-bounce" /> Analyzing...
                </span>
              ) : "Analyze Match"}
            </Button>
          </CardContent>
        </Card>

        {analysis ? (
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Match Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-6">
                  <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-4 border-primary/20">
                    <div 
                      className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent"
                      style={{ transform: `rotate(${(analysis.matchScore / 100) * 360}deg)` }}
                    />
                    <span className="text-2xl font-bold">{analysis.matchScore}%</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Strong Match</h3>
                    <p className="text-sm text-muted-foreground">Your profile aligns well with this role. Focus on the missing skills to improve your chances.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Skill Comparison</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2 text-green-600">Matching Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.resumeComparison.matching.map(s => <Badge key={s} className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">{s}</Badge>)}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2 text-red-600">Missing Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.resumeComparison.missing.map(s => <Badge key={s} variant="destructive">{s}</Badge>)}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2 text-blue-600">Suggested to Learn</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.resumeComparison.suggested.map(s => <Badge key={s} variant="outline" className="text-blue-600 border-blue-200">{s}</Badge>)}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recommended Interview Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {analysis.interviewTopics.map(t => <li key={t}>{t}</li>)}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full mt-4" 
                  onClick={() => router.push(`/dashboard/interview/setup?role=${encodeURIComponent(formData.title)}`)}
                >
                  Start Mock Interview for this Job <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        ) : (
          <div className="hidden md:flex flex-col items-center justify-center text-center p-8 border rounded-lg bg-muted/10 h-full">
            <FileSearch className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-medium text-muted-foreground">Awaiting Job Description</h3>
            <p className="text-sm text-muted-foreground max-w-[250px] mt-2">Paste a job description on the left to see your match analysis and tailored interview prep.</p>
          </div>
        )}
      </div>
    </div>
  );
}
