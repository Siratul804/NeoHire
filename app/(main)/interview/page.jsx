"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDown,
  ChevronUp,
  Mic,
  Video,
  SkipForward,
  Upload,
} from "lucide-react";
import Link from "next/link";

export default function Interview() {
  const [interviewProgress, setInterviewProgress] = React.useState(0);

  return (
    <div className="container space-y-6 px-12 pt-20 md:pt-28 pb-10">
      <div className="mb-8">
        <Link href="/dashboard" className="text-sm text-gray-200">
          ← Back to Dashboard
        </Link>
      </div>
      <h1 className="text-4xl font-bold gradient-title ">Mock Interview</h1>

      <p className="text-muted-foreground mb-4">
        Sharpen your interview skills with AI-powered feedback.
      </p>

      <div className="flex  gap-4">
        {/* Center: Live Interview Panel */}
        <Card className="w-[60%]">
          <CardHeader>
            <CardTitle>Live Interview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg font-medium">
              Question 1: What is Javascript?
            </p>
            <Textarea placeholder="Type your answer here..." rows={8} />
            <div className="flex justify-between">
              <div className="space-x-2">
                <Button size="icon">
                  <Mic />
                </Button>
                <Button size="icon">
                  <Video />
                </Button>
                <Button size="icon">
                  <Upload />
                </Button>
              </div>
              <Button>
                <SkipForward className="mr-2 h-4 w-4" /> Next Question
              </Button>
            </div>
            <Progress value={interviewProgress} className="w-full" />
          </CardContent>
        </Card>

        {/* Right: Feedback Panel */}
        <Card className="w-[40%]">
          <CardHeader>
            <CardTitle>Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Complete the interview to see feedback.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
