"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, FileText, PenTool, Copy, Edit, Check } from "lucide-react";
import Link from "next/link";

const CoverLetterGenerator = () => {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/coverLetter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName,
          jobTitle,
          jobDescription,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate cover letter");
      }

      const data = await response.json();
      setCoverLetter(data.coverLetter);

      setShowForm(false);
    } catch (err) {
      setError(
        err.message || "An error occurred while generating the cover letter."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coverLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className="container space-y-6 px-12 pt-20 md:pt-28 pb-10">
      <div className="mb-8">
        <Link href="/dashboard" className="text-sm text-gray-200">
          ← Back to Dashboard
        </Link>
      </div>
      <h1 className="text-4xl font-bold gradient-title">Cover Letter</h1>
      <p className="text-muted-foreground mb-4">
        Build a seamless cover letter with NeoHire AI
      </p>

      {/* Toggle Buttons */}
      <div className="flex gap-4 mb-6">
        <Button
          onClick={() => setShowForm(true)}
          variant={showForm ? "default" : "outline"}
          className={`flex-1 ${showForm ? "bg:gradient-title" : ""}`}
        >
          <PenTool className="w-4 h-4 mr-2" />
          Cover Letter Form
        </Button>
        <Button
          onClick={() => setShowForm(false)}
          variant={!showForm ? "default" : "outline"}
          className={`flex-1 ${!showForm ? "bg:gradient-title" : ""}`}
        >
          <FileText className="w-4 h-4 mr-2" />
          View Cover Letter
        </Button>
      </div>

      {showForm ? (
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium mb-1"
                >
                  Company Name
                </label>
                <Input
                  type="text"
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <label
                  htmlFor="jobTitle"
                  className="block text-sm font-medium mb-1"
                >
                  Job Title
                </label>
                <Input
                  type="text"
                  id="jobTitle"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                  placeholder="Enter job title"
                />
              </div>
              <div>
                <label
                  htmlFor="jobDescription"
                  className="block text-sm font-medium mb-1"
                >
                  Job Description
                </label>
                <Textarea
                  id="jobDescription"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  required
                  placeholder="Provide the job description"
                  rows={8}
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait while NeoHire AI is Generating your cover
                    letter...
                  </>
                ) : (
                  "Generate Cover Letter"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Generated Cover Letter</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {coverLetter ? (
              <div className="bg-gray-50 p-4 rounded-md">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-800">
                  {coverLetter}
                </pre>
              </div>
            ) : (
              <p className="text-center pt-6 pb-32 text-gray-500">
                Fill the form and generate a seamless cover letter by NeoHire
                AI!
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CoverLetterGenerator;
