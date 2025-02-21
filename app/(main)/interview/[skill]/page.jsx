// app/interview/[skill]/page.js
"use client";

import React, { useState, useEffect } from "react"; // Import React and useEffect
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Video, SkipForward } from "lucide-react";
import Link from "next/link";

export default function Interview({ params }) {
  const { skill } = React.use(params); // Extract the skill from params
  const [questions, setQuestions] = useState([]); // State to store questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // Initialize answers as an empty array
  const [fileUploaded, setFileUploaded] = useState(false);
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Fetch questions from the backend API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/interview/ai-qn", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tag: skill }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        setQuestions(data); // Set the fetched questions
        setAnswers(Array(data.length).fill("")); // Initialize answers array
      } catch (error) {
        setError(error.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchQuestions();
  }, [skill]); // Run effect when skill changes

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

  const handleSubmit = () => {
    console.log("Submitted Answers:", answers);
    alert("Interview submitted successfully!");
    setFileUploaded(false); // Reset file upload state after submission
  };

  if (loading) {
    return (
      <div className="container px-12 pt-20">
        NeoHire Ai is generating question...
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
        <Card className="w-[60%]">
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
                    <Button onClick={handleSubmit}>Submit</Button>
                  )}
                </div>
              </>
            ) : (
              <p>No questions available for this skill.</p>
            )}
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
