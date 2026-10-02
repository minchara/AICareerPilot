"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bot, User, Clock, CheckCircle2, ChevronRight, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

// Mocking monaco-editor for coding questions
// import Editor from "@monaco-editor/react";

type Question = {
  id: string;
  type: "text" | "coding";
  questionText: string;
  context?: string;
};

type Feedback = {
  score: number;
  strengths: string;
  improvements: string;
  betterAnswer: string;
};

export default function MockInterviewSessionPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 mins
  
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    // Mock fetching interview data
    const fetchInterview = async () => {
      setLoading(true);
      await new Promise(res => setTimeout(res, 1000));
      setQuestions([
        { id: "q1", type: "text", questionText: "Can you describe a time when you had to manage a conflict within your team?" },
        { id: "q2", type: "coding", questionText: "Write a function that returns the nth Fibonacci number.", context: "Constraints: n <= 30. Optimize for time complexity." },
        { id: "q3", type: "text", questionText: "How does React handle state updates under the hood?" }
      ]);
      setLoading(false);
    };
    fetchInterview();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async () => {
    if (!answer.trim()) return;
    
    setIsSubmitting(true);
    // Simulate API evaluation
    await new Promise(res => setTimeout(res, 2000));
    
    setFeedback({
      score: 75,
      strengths: "Good basic understanding. Addressed the core of the problem.",
      improvements: "Could be more structured. Consider edge cases in your explanation.",
      betterAnswer: "A more comprehensive approach would involve..."
    });
    
    setIsSubmitting(false);
  };

  const handleNext = () => {
    setFeedback(null);
    setAnswer("");
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      router.push(`/dashboard/interview/report/${params.id}`);
    }
  };

  if (loading) {
    return <div className="flex h-[80vh] items-center justify-center">Loading interview session...</div>;
  }

  const currentQ = questions[currentIndex];
  const isFinished = currentIndex === questions.length - 1;

  return (
    <div className="container mx-auto p-4 max-w-5xl h-[calc(100vh-4rem)] flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4 p-4 border rounded-lg bg-card">
        <div>
          <h2 className="font-semibold text-lg">Senior Frontend Engineer Mock Interview</h2>
          <div className="flex space-x-2 mt-1">
            <Badge variant="secondary">Question {currentIndex + 1} of {questions.length}</Badge>
            <Badge variant="outline">{currentQ.type === 'coding' ? 'Technical (Coding)' : 'Behavioral'}</Badge>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-lg font-mono">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <span className={timeLeft < 300 ? "text-red-500" : ""}>{formatTime(timeLeft)}</span>
        </div>
      </div>
      
      <Progress value={((currentIndex) / questions.length) * 100} className="h-1 mb-6" />

      <div className="flex-1 grid gap-6 md:grid-cols-2 min-h-0">
        {/* Left Column: AI & Question */}
        <div className="flex flex-col space-y-4 overflow-y-auto pr-2">
          <div className="flex gap-4 p-4 bg-muted/30 rounded-lg border">
            <div className="bg-primary/20 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium mb-2">AI Interviewer</p>
              <p className="text-sm md:text-base leading-relaxed">{currentQ.questionText}</p>
              {currentQ.context && (
                <div className="mt-4 p-3 bg-background border rounded text-sm font-mono text-muted-foreground">
                  {currentQ.context}
                </div>
              )}
            </div>
          </div>
          
          {feedback && (
            <Card className="border-green-200 bg-green-50/30 dark:bg-green-900/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center text-green-700 dark:text-green-400">
                  <CheckCircle2 className="mr-2 h-5 w-5" /> Evaluation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div><strong>Score:</strong> {feedback.score}/100</div>
                <div><strong>Strengths:</strong> {feedback.strengths}</div>
                <div><strong>Improvement:</strong> {feedback.improvements}</div>
                <div className="mt-2 p-3 bg-background rounded border">
                  <span className="font-medium block mb-1">Example of a better response:</span>
                  <span className="text-muted-foreground">{feedback.betterAnswer}</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column: Answer Input */}
        <div className="flex flex-col h-full min-h-[400px]">
          <Card className="flex-1 flex flex-col shadow-sm border-muted">
            <CardHeader className="pb-2 flex-none">
              <CardTitle className="text-sm font-medium flex items-center text-muted-foreground">
                <User className="mr-2 h-4 w-4" /> Your Response
                {currentQ.type === 'coding' && <Code className="ml-auto h-4 w-4" />}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 pb-4 px-4 flex flex-col min-h-0">
              {currentQ.type === 'coding' ? (
                <div className="flex-1 border rounded bg-zinc-950 p-4 font-mono text-sm text-green-400 overflow-auto">
                   {/* In real app, replace with Monaco Editor */}
                   <textarea 
                     className="w-full h-full bg-transparent outline-none resize-none"
                     placeholder="// Write your code here..."
                     value={answer}
                     onChange={(e) => setAnswer(e.target.value)}
                     disabled={!!feedback}
                   />
                </div>
              ) : (
                <Textarea 
                  className="flex-1 resize-none bg-muted/10 text-base"
                  placeholder="Type your answer here... Structure your response clearly."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  disabled={!!feedback}
                />
              )}
            </CardContent>
            <CardFooter className="flex-none pt-2 pb-4 bg-card border-t justify-between">
              <div className="text-xs text-muted-foreground">
                {answer.split(/\s+/).filter(w => w.length > 0).length} words
              </div>
              
              {!feedback ? (
                <Button onClick={handleSubmit} disabled={isSubmitting || !answer.trim()}>
                  {isSubmitting ? "Evaluating..." : "Submit Answer"}
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  {isFinished ? "Finish Interview" : "Next Question"} <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
