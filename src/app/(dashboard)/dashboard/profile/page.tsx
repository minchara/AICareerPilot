"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Briefcase, FileText, Check, Plus, X, UploadCloud, Loader2 } from "lucide-react";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [skills, setSkills] = useState<string[]>(["JavaScript", "React", "Next.js", "TypeScript", "Tailwind CSS"]);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      e.preventDefault();
      if (!skills.includes(newSkill.trim())) {
        setSkills([...skills, newSkill.trim()]);
      }
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    
    // Simulate API call to /api/profile
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8 max-w-4xl pb-24">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your details to personalize your interview prep experience.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Form */}
        <Card className="md:col-span-2">
          <form onSubmit={handleSave}>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your profile and career goals.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="name" defaultValue="John Doe" className="pl-9" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" defaultValue="john.doe@example.com" disabled className="pl-9 bg-muted" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Target Role</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="role" defaultValue="Frontend Engineer" className="pl-9" placeholder="e.g. Software Engineer" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Level</Label>
                  <Select defaultValue="junior">
                    <SelectTrigger id="experience">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fresher">Fresher (0 years)</SelectItem>
                      <SelectItem value="junior">Junior (1-3 years)</SelectItem>
                      <SelectItem value="mid">Mid-Level (3-5 years)</SelectItem>
                      <SelectItem value="senior">Senior (5+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Career Objective / Bio</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Tell the AI interviewer a bit about yourself..." 
                  className="min-h-[100px]"
                  defaultValue="I am a passionate frontend developer looking to transition into a full-stack role. I love building intuitive user interfaces."
                />
              </div>

              <div className="space-y-2">
                <Label>Skills & Technologies</Label>
                <div className="flex flex-wrap gap-2 mb-3 p-3 border rounded-md min-h-[50px] bg-background">
                  {skills.map(skill => (
                    <Badge key={skill} variant="secondary" className="flex items-center gap-1 py-1">
                      {skill}
                      <button 
                        type="button" 
                        onClick={() => removeSkill(skill)}
                        className="text-muted-foreground hover:text-foreground transition-colors ml-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  <div className="flex-1 min-w-[120px]">
                    <Input 
                      type="text" 
                      placeholder="Type skill & press Enter..." 
                      className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 shadow-none focus-visible:ring-offset-0"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={handleAddSkill}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 border-t px-6 py-4 flex items-center justify-between">
              {success ? (
                <span className="text-sm font-medium text-green-600 dark:text-green-500 flex items-center">
                  <Check className="mr-2 h-4 w-4" /> Profile updated successfully
                </span>
              ) : <span />}
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Right Column: Resume & Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resume Parsing</CardTitle>
              <CardDescription>Upload your resume to auto-fill skills and experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer">
                <FileText className="h-10 w-10 text-muted-foreground mb-3" />
                <h4 className="text-sm font-medium">Click to upload or drag and drop</h4>
                <p className="text-xs text-muted-foreground mt-1">PDF or DOCX (Max 5MB)</p>
              </div>
              <div className="flex items-center justify-between p-3 bg-primary/5 rounded-md border border-primary/20">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">john_doe_resume_2023.pdf</span>
                    <span className="text-xs text-muted-foreground">Parsed on Oct 10, 2023</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-muted-foreground">Interviews</span>
                <span className="font-semibold">8 Completed</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-muted-foreground">Avg Score</span>
                <span className="font-semibold">72%</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">Roadmap</span>
                <Badge variant="outline" className="bg-primary/10">Week 2/4</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
