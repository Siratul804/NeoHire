"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Video, SkipForward, RefreshCw ,Sparkles, Target, BarChart2, Mic, Smile, MessageSquare} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import Link from "next/link";

export default function Interview({ params }) {
  const { skill } = React.use(params); // Extract the skill from params
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(null); // New state for feedback
  const [submitting, setSubmitting] = useState(false); // State to track submission status

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/interview/ai-qn", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tag: skill }),
        });

        if (!response.ok) throw new Error("Failed to fetch questions");

        const data = await response.json();
        setQuestions(data);
        setAnswers(Array(data.length).fill("")); // Initialize empty answers array
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [skill]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleAnswerChange = (e) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleFileUpload = (event) => {
    if (event.target.files.length > 0) {
      setFileUploaded(true);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("fileUpload").click();
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/interview/ai-feed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questions, answers }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit answers");
      }

      const result = await response.json();
      console.log(result);
      setFeedback(result); // Store received feedback in state
    } catch (error) {
      console.error("Error submitting answers:", error);
      setError("Failed to fetch feedback. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container px-12 pt-20">
        NeoHire AI is generating questions...
      </div>
    );
  }

  if (error) {
    return <div className="container px-12 pt-20">Error: {error}</div>;
  }

  return (
    <div className="container space-y-6 px-12 pt-20 md:pt-28 pb-10">
      <div className="mb-8">
        <Link href="/dashboard" className="text-sm text-gray-200">
          ← Back to Dashboard
        </Link>
      </div>
      <h1 className="text-4xl font-bold gradient-title">Mock Interview</h1>
      <p className="text-muted-foreground mb-4">
        Sharpen your interview skills with AI-powered feedback.
      </p>
      <div className="flex gap-4">
        {/* Center: Live Interview Panel */}
        <Card className="w-[55%]">
          <CardHeader>
            <CardTitle>Live Interview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {questions.length > 0 ? (
              <>
                <p className="text-lg font-medium">
                  Question {currentQuestionIndex + 1}:{" "}
                  {questions[currentQuestionIndex].question}
                </p>
                <Textarea
                  placeholder="Type your answer here..."
                  rows={8}
                  value={answers[currentQuestionIndex]}
                  onChange={handleAnswerChange}
                />
                <div className="flex justify-between">
                  <div className="space-x-2">
                    <input
                      type="file"
                      accept="audio/*,video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="fileUpload"
                    />
                    <Button
                      size="icon"
                      disabled={fileUploaded}
                      onClick={triggerFileInput}
                    >
                      <Mic />
                    </Button>
                    <Button
                      size="icon"
                      disabled={fileUploaded}
                      onClick={triggerFileInput}
                    >
                      <Video />
                    </Button>
                  </div>
                  {currentQuestionIndex < questions.length - 1 ? (
                    <Button onClick={handleNextQuestion}>
                      <SkipForward className="mr-2 h-4 w-4" /> Next Question
                    </Button>
                  ) : (
                    <div className="flex ">
                      <Button onClick={() => window.location.reload()}>
                        Again <RefreshCw className="mr-2 h-4 w-4" />
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="ml-4"
                      >
                        {submitting ? "Submitting..." : "Submit"}
                      </Button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <p>No questions available for this skill.</p>
            )}
          </CardContent>
        </Card>

        {/* Right: Feedback Panel */}
        <Card className="w-[50%]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          Feedback
        </CardTitle>
      </CardHeader>
      <CardContent>
        {feedback ? (
          <div className="space-y-6 h-[calc(100vh-12rem)] overflow-y-auto pr-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Overall Score</span>
                <Badge variant={feedback.score >= 70 ? "success" : "destructive"}>{feedback.score}/100</Badge>
              </div>
              <Progress value={feedback.score} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted p-3 rounded-lg">
                  <h3 className="flex items-center gap-2 text-sm font-semibold mb-2">
                    <Mic className="h-5 w-5 text-indigo-500" />
                    Speech Clarity
                  </h3>
                  <div className="flex justify-between items-center">
                    <Progress value={feedback.speechClarityScore} className="h-2 flex-grow mr-2" />
                    <Badge variant={feedback.speechClarityScore >= 70 ? "success" : "destructive"}>{feedback.speechClarityScore}/100</Badge>
                  </div>
                </div>

                <div className="bg-muted p-3 rounded-lg">
                  <h3 className="flex items-center gap-2 text-sm font-semibold mb-2">
                    <Smile className="h-5 w-5 text-orange-500" />
                    Confidence
                  </h3>
                  <div className="flex justify-between items-center">
                    <Progress value={feedback.confidenceScore} className="h-2 flex-grow mr-2" />
                    <Badge variant={feedback.confidenceScore >= 70 ? "success" : "destructive"}>{feedback.confidenceScore}/100</Badge>
                  </div>
                </div>
              </div>

            <div className="space-y-4">
              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold mb-2">
                  <Target className="h-5 w-5 text-green-500" />
                  Strengths
                </h3>
                <p className="text-sm text-muted-foreground">{feedback.strengths}</p>
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold mb-2">
                  <BarChart2 className="h-5 w-5 text-blue-500" />
                  Areas for Improvement
                </h3>
                <p className="text-sm text-muted-foreground">{feedback.areasForImprovement}</p>
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold mb-2">
                  <MessageSquare className="h-5 w-5 text-purple-500" />
                  Detailed Feedback
                </h3>
                <p className="text-sm text-muted-foreground">{feedback.feedback}</p>
              </div>

             

              {/* <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold mb-2">
                  <MessageSquare className="h-5 w-5 text-teal-500" />
                  Tone Analysis
                </h3>
                <p className="text-sm text-muted-foreground">{feedback.toneAnalysis}</p>
              </div> */}
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-8">Complete the interview to see feedback.</p>
        )}
      </CardContent>
    </Card>
      </div>
    </div>
  );
}
