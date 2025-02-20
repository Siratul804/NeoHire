// app/interview/[skill]/page.js
"use client";

import React from "react"; // Import React
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Video, SkipForward } from "lucide-react";
import Link from "next/link";

const questionsBySkill = {
  javascript: [
    "What is JavaScript?",
    "Explain closures in JavaScript.",
    "What are promises in JavaScript?",
    "What is the difference between var, let, and const?",
    "Explain event delegation in JavaScript.",
  ],
  react: [
    "What is React?",
    "Explain the virtual DOM.",
    "What are hooks in React?",
    "What is the difference between state and props?",
    "Explain React component lifecycle methods.",
  ],
  nodejs: [
    "What is Node.js?",
    "Explain the event loop in Node.js.",
    "What is npm?",
    "What are streams in Node.js?",
    "Explain the difference between `require` and `import`.",
  ],
  python: [
    "What is Python?",
    "Explain list comprehensions in Python.",
    "What are decorators in Python?",
    "What is the difference between `deepcopy` and `shallowcopy`?",
    "Explain the GIL in Python.",
  ],
  java: [
    "What is Java?",
    "Explain the concept of object-oriented programming in Java.",
    "What is the difference between `==` and `.equals()` in Java?",
    "What are Java generics?",
    "Explain the Java memory model.",
  ],
};

export default function Interview({ params }) {
  const { skill } = React.use(params); // Unwrap the params Promise

  const questions = questionsBySkill[skill] || [];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [fileUploaded, setFileUploaded] = useState(false);

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
            <p className="text-lg font-medium">
              Question {currentQuestionIndex + 1}:{" "}
              {questions[currentQuestionIndex]}
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
