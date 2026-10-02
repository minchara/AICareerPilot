"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Bookmark, BookmarkCheck, Play, BookOpen, Lightbulb } from "lucide-react";

// Mock data
const CATEGORIES = ["All", "DSA", "OOP", "DBMS", "OS", "System Design", "React", "Behavioral"];
const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Advanced"];

const MOCK_QUESTIONS = [
  {
    id: "q1",
    category: "React",
    difficulty: "Intermediate",
    text: "Explain the Virtual DOM and how React's reconciliation works.",
    tags: ["React", "Performance", "Core Concepts"],
    modelAnswer: "The Virtual DOM is a lightweight memory representation of the real DOM. When state changes, React creates a new Virtual DOM tree, compares it with the previous one (diffing), and determines the minimal set of changes needed to update the real DOM. This process is called reconciliation.",
    isBookmarked: false,
  },
  {
    id: "q2",
    category: "DSA",
    difficulty: "Advanced",
    text: "How would you design an algorithm to find the shortest path in a weighted graph?",
    tags: ["Graphs", "Algorithms", "Dijkstra"],
    modelAnswer: "Dijkstra's algorithm is commonly used for this. It maintains a priority queue of vertices to visit, starting with the source node at distance 0 and all others at infinity. It iteratively extracts the node with the minimum distance, examines its neighbors, and updates their distances if a shorter path is found.",
    isBookmarked: true,
  },
  {
    id: "q3",
    category: "Behavioral",
    difficulty: "Beginner",
    text: "Describe a situation where you had to meet a tight deadline.",
    tags: ["Time Management", "Stress", "STAR"],
    modelAnswer: "[Use STAR format] Situation: The project deadline was moved up by two weeks. Task: Ensure all core features were delivered without bugs. Action: I prioritized critical path features, communicated the scoped-down plan to stakeholders, and paired-programmed with a junior dev to speed up testing. Result: We met the new deadline with the core MVP fully functional.",
    isBookmarked: false,
  },
  {
    id: "q4",
    category: "System Design",
    difficulty: "Advanced",
    text: "Design a URL shortening service like Bitly.",
    tags: ["Scalability", "Databases", "Hashing"],
    modelAnswer: "Key components: 1. API Gateway. 2. A Hash Function (Base62 encoding) to generate short URLs. 3. A Relational Database (or NoSQL like Cassandra) storing long-to-short URL mappings. 4. A Caching layer (Redis/Memcached) for frequent reads. 5. Analytics service for tracking clicks. Consider collisions, data retention, and load balancing.",
    isBookmarked: false,
  }
];

export default function QuestionBankPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [questions, setQuestions] = useState(MOCK_QUESTIONS);

  const handleBookmark = (id: string) => {
    // In a real app, call /api/questions/[id]/bookmark
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, isBookmarked: !q.isBookmarked } : q
    ));
  };

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          q.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === "All" || q.category === activeCategory;
    const matchesDifficulty = difficultyFilter === "All" || q.difficulty === difficultyFilter;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Question Bank</h1>
          <p className="text-muted-foreground mt-1">Browse, filter, and practice interview questions.</p>
        </div>
        <Button>
          <Play className="mr-2 h-4 w-4" />
          Quick Mock Interview
        </Button>
      </div>

      {/* Filters Section */}
      <Card className="bg-muted/40 border-muted">
        <CardContent className="p-4 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search questions or tags..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-[200px]">
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {DIFFICULTIES.map(diff => (
                    <SelectItem key={diff} value={diff}>{diff}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="overflow-x-auto pb-2 -mx-1 px-1 custom-scrollbar">
            <div className="flex gap-2 w-max">
              {CATEGORIES.map(category => (
                <Badge 
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className="cursor-pointer text-sm py-1.5 px-4"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Showing {filteredQuestions.length} questions</span>
        </div>

        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
            <h3 className="text-lg font-medium">No questions found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
            <Button variant="outline" className="mt-4" onClick={() => {
              setSearchQuery("");
              setActiveCategory("All");
              setDifficultyFilter("All");
            }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredQuestions.map((q) => (
              <Card key={q.id} className="overflow-hidden transition-all hover:border-primary/30">
                <CardContent className="p-0">
                  <div className="p-5">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-3 flex-1">
                        <div className="flex flex-wrap gap-2 items-center">
                          <Badge variant="secondary" className="text-xs">{q.category}</Badge>
                          <Badge variant="outline" className={`text-xs ${
                            q.difficulty === 'Beginner' ? 'text-green-500 border-green-200' :
                            q.difficulty === 'Intermediate' ? 'text-blue-500 border-blue-200' :
                            'text-amber-500 border-amber-200'
                          }`}>
                            {q.difficulty}
                          </Badge>
                          {q.tags.map(tag => (
                            <span key={tag} className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-lg font-semibold leading-snug">{q.text}</h3>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleBookmark(q.id)}
                          className={q.isBookmarked ? "text-primary" : "text-muted-foreground"}
                        >
                          {q.isBookmarked ? <BookmarkCheck className="h-5 w-5 fill-primary/20" /> : <Bookmark className="h-5 w-5" />}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Accordion type="single" collapsible className="w-full border-t border-muted bg-muted/10">
                    <AccordionItem value="answer" className="border-none">
                      <AccordionTrigger className="px-5 py-3 hover:bg-muted/30 text-sm font-medium">
                        <span className="flex items-center gap-2 text-primary">
                          <Lightbulb className="h-4 w-4" />
                          View Model Answer
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-5 pb-4 pt-1">
                        <div className="text-sm leading-relaxed text-muted-foreground bg-background p-4 rounded-md border border-border/50">
                          {q.modelAnswer}
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button size="sm" variant="outline">
                            <Play className="mr-2 h-3 w-3" />
                            Practice This Question
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {filteredQuestions.length > 0 && (
          <div className="flex justify-center pt-4">
            <Button variant="outline">Load More Questions</Button>
          </div>
        )}
      </div>
    </div>
  );
}
