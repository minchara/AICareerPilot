"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Map, Loader2, Sparkles, BookOpen, Video, Code, CheckCircle } from "lucide-react";

// Mock Roadmap Data
const MOCK_ROADMAP = {
  role: "Frontend Engineer",
  targetDate: "in 4 weeks",
  overallProgress: 35,
  weeks: [
    {
      id: "w1",
      title: "Week 1: Core JavaScript & DOM",
      description: "Solidify your understanding of closures, event loop, and DOM manipulation.",
      progress: 100,
      topics: [
        { id: "t1", text: "Execution Context & Closures", completed: true, type: "concept" },
        { id: "t2", text: "Event Loop & Asynchronous JS", completed: true, type: "concept" },
        { id: "t3", text: "Debounce & Throttle Implementation", completed: true, type: "practice" },
      ],
      resources: [
        { text: "JS Event Loop Visualized", type: "video" },
        { text: "MDN: Closures", type: "article" }
      ]
    },
    {
      id: "w2",
      title: "Week 2: React Fundamentals",
      description: "Master component lifecycle, hooks, and state management.",
      progress: 40,
      topics: [
        { id: "t4", text: "React Reconciliation & Virtual DOM", completed: true, type: "concept" },
        { id: "t5", text: "Custom Hooks (useFetch, useLocalStorage)", completed: false, type: "practice" },
        { id: "t6", text: "Context API vs Redux", completed: false, type: "concept" },
      ],
      resources: [
        { text: "React Docs: Hooks", type: "article" },
        { text: "Build a Custom Hook", type: "video" }
      ]
    },
    {
      id: "w3",
      title: "Week 3: Frontend System Design",
      description: "Learn how to architect large-scale frontend applications.",
      progress: 0,
      topics: [
        { id: "t7", text: "Component Architecture & State Normalization", completed: false, type: "concept" },
        { id: "t8", text: "Design a News Feed Component", completed: false, type: "practice" },
        { id: "t9", text: "Performance Optimization (Lazy loading, Web Vitals)", completed: false, type: "concept" },
      ],
      resources: [
        { text: "Frontend System Design Handbook", type: "article" }
      ]
    },
    {
      id: "w4",
      title: "Week 4: Behavioral & Mock Interviews",
      description: "Prepare for HR rounds and practice full technical mocks.",
      progress: 0,
      topics: [
        { id: "t10", text: "Prepare STAR format stories", completed: false, type: "concept" },
        { id: "t11", text: "Full Mock Interview 1", completed: false, type: "practice" },
        { id: "t12", text: "Full Mock Interview 2", completed: false, type: "practice" },
      ],
      resources: [
        { text: "STAR Method Guide", type: "article" }
      ]
    }
  ]
};

export default function RoadmapPage() {
  const [loading, setLoading] = useState(true);
  const [hasRoadmap, setHasRoadmap] = useState(true);
  const [roadmap, setRoadmap] = useState<any>(null);

  useEffect(() => {
    // Simulate API fetch
    const fetchRoadmap = async () => {
      setTimeout(() => {
        setRoadmap(MOCK_ROADMAP);
        setLoading(false);
      }, 1000);
    };
    fetchRoadmap();
  }, []);

  const toggleTopic = (weekId: string, topicId: string) => {
    // In a real app, call PATCH /api/roadmap/[id]
    const updatedRoadmap = { ...roadmap };
    const week = updatedRoadmap.weeks.find((w: any) => w.id === weekId);
    if (week) {
      const topic = week.topics.find((t: any) => t.id === topicId);
      if (topic) {
        topic.completed = !topic.completed;
        // Recalculate week progress
        const completedTopics = week.topics.filter((t: any) => t.completed).length;
        week.progress = Math.round((completedTopics / week.topics.length) * 100);
      }
    }
    // Recalculate overall
    const totalTopics = updatedRoadmap.weeks.reduce((acc: number, w: any) => acc + w.topics.length, 0);
    const totalCompleted = updatedRoadmap.weeks.reduce((acc: number, w: any) => acc + w.topics.filter((t: any) => t.completed).length, 0);
    updatedRoadmap.overallProgress = Math.round((totalCompleted / totalTopics) * 100);
    
    setRoadmap(updatedRoadmap);
  };

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setHasRoadmap(true);
      setRoadmap(MOCK_ROADMAP);
      setLoading(false);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading your personalized roadmap...</p>
        </div>
      </div>
    );
  }

  if (!hasRoadmap || !roadmap) {
    return (
      <div className="container mx-auto p-4 md:p-6 max-w-4xl flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
          <Map className="h-12 w-12" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Your AI Prep Roadmap</h1>
        <p className="text-muted-foreground max-w-lg text-lg">
          We haven't generated a prep roadmap for you yet. Let our AI analyze your profile, target role, and timeline to build a customized week-by-week plan.
        </p>
        <Button size="lg" onClick={handleGenerate} className="mt-8">
          <Sparkles className="mr-2 h-5 w-5" />
          Generate Personalized Roadmap
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8 max-w-5xl pb-24">
      {/* Header & Overall Progress */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Preparation Roadmap</h1>
          <p className="text-muted-foreground mt-1">
            Target: <span className="font-semibold text-foreground">{roadmap.role}</span> • Goal: <span className="font-medium text-foreground">{roadmap.targetDate}</span>
          </p>
        </div>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="font-semibold text-lg">Overall Progress</h3>
                <p className="text-sm text-muted-foreground">Keep it up! You're on track.</p>
              </div>
              <span className="text-3xl font-bold text-primary">{roadmap.overallProgress}%</span>
            </div>
            <Progress value={roadmap.overallProgress} className="h-3" />
          </CardContent>
        </Card>
      </div>

      {/* Week by Week */}
      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-muted-foreground/20 before:to-transparent">
        {roadmap.weeks.map((week: any, index: number) => (
          <div key={week.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            {/* Timeline dot */}
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${week.progress === 100 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              {week.progress === 100 ? <CheckCircle className="h-5 w-5" /> : <span>{index + 1}</span>}
            </div>
            
            {/* Card */}
            <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] ml-4 md:ml-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-4">
                  <CardTitle className="text-xl">{week.title}</CardTitle>
                  <Badge variant={week.progress === 100 ? "default" : week.progress > 0 ? "secondary" : "outline"}>
                    {week.progress}%
                  </Badge>
                </div>
                <CardDescription>{week.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="space-y-3">
                  {week.topics.map((topic: any) => (
                    <div key={topic.id} className="flex items-start space-x-3 bg-muted/30 p-2.5 rounded-md hover:bg-muted/50 transition-colors">
                      <Checkbox 
                        id={topic.id} 
                        checked={topic.completed}
                        onCheckedChange={() => toggleTopic(week.id, topic.id)}
                        className="mt-0.5"
                      />
                      <div className="grid gap-1.5 leading-none flex-1">
                        <label
                          htmlFor={topic.id}
                          className={`text-sm font-medium leading-tight cursor-pointer ${topic.completed ? 'line-through text-muted-foreground' : ''}`}
                        >
                          {topic.text}
                        </label>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          {topic.type === 'concept' ? <BookOpen className="h-3 w-3"/> : <Code className="h-3 w-3"/>}
                          <span className="capitalize">{topic.type}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              {week.resources && week.resources.length > 0 && (
                <CardFooter className="pt-2 pb-4 bg-muted/10 border-t flex flex-col items-start gap-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Resources</p>
                  <div className="flex flex-wrap gap-2">
                    {week.resources.map((res: any, idx: number) => (
                      <a key={idx} href="#" className="inline-flex items-center text-xs text-primary hover:underline bg-primary/5 px-2 py-1 rounded-md border border-primary/10">
                        {res.type === 'video' ? <Video className="mr-1 h-3 w-3" /> : <BookOpen className="mr-1 h-3 w-3" />}
                        {res.text}
                      </a>
                    ))}
                  </div>
                </CardFooter>
              )}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
