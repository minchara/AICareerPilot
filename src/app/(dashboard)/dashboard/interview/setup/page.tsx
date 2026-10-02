"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function InterviewSetupPage() {
  const router = useRouter();
  // In a real app, you would use useSearchParams() here if wrapped in Suspense, or just parse window.location.search
  // For this mock, we'll keep it simple
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    role: "",
    category: "Technical",
    difficulty: "Intermediate",
    questionCount: "5",
    experience: "Mid-level",
    jobDescription: ""
  });

  useEffect(() => {
    // Attempt to get role from query params if available
    const searchParams = new URLSearchParams(window.location.search);
    const roleParam = searchParams.get('role');
    if (roleParam) {
      setFormData(prev => ({ ...prev, role: roleParam }));
    }
  }, []);

  const handleLaunch = async () => {
    if (!formData.role) return;
    
    setIsGenerating(true);
    
    try {
      // Simulate API call to create interview session
      // const res = await fetch('/api/interview/create', { method: 'POST', body: JSON.stringify(formData) });
      // const data = await res.json();
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock ID
      const newInterviewId = "int_" + Math.random().toString(36).substring(7);
      
      router.push(`/dashboard/interview/${newInterviewId}`);
    } catch (error) {
      console.error(error);
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Setup Mock Interview</h1>
        <p className="text-muted-foreground mt-1">Configure your AI interviewer to practice specific roles and topics.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Interview Parameters</CardTitle>
          <CardDescription>Customize the interview to match your target role.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="role">Target Role *</Label>
            <Input 
              id="role" 
              placeholder="e.g. Full Stack Developer, Data Scientist" 
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Interview Category</Label>
              <Select value={formData.category} onValueChange={(val) => setFormData({...formData, category: val})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="Behavioral">Behavioral</SelectItem>
                  <SelectItem value="Coding">Coding</SelectItem>
                  <SelectItem value="HR">HR / Culture Fit</SelectItem>
                  <SelectItem value="Mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Difficulty Level</Label>
              <Select value={formData.difficulty} onValueChange={(val) => setFormData({...formData, difficulty: val})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Number of Questions</Label>
              <Select value={formData.questionCount} onValueChange={(val) => setFormData({...formData, questionCount: val})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Count" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Questions</SelectItem>
                  <SelectItem value="5">5 Questions</SelectItem>
                  <SelectItem value="8">8 Questions</SelectItem>
                  <SelectItem value="10">10 Questions</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Experience Level</Label>
              <Select value={formData.experience} onValueChange={(val) => setFormData({...formData, experience: val})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Student">Student / Fresher (0 years)</SelectItem>
                  <SelectItem value="Junior">Junior (1-2 years)</SelectItem>
                  <SelectItem value="Mid-level">Mid-level (3-5 years)</SelectItem>
                  <SelectItem value="Senior">Senior (5+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobDesc">Context / Job Description (Optional)</Label>
            <Textarea 
              id="jobDesc" 
              placeholder="Paste a job description here so the AI can tailor questions specifically to it..."
              className="min-h-[100px]"
              value={formData.jobDescription}
              onChange={(e) => setFormData({...formData, jobDescription: e.target.value})}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            size="lg" 
            onClick={handleLaunch}
            disabled={!formData.role || isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Preparing AI Interviewer...
              </>
            ) : (
              <>
                <Play className="mr-2 h-5 w-5" /> Launch AI Interview
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
