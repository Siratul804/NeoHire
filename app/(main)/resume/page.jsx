"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Upload } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { Target, MessageSquare } from "lucide-react";

const Resume = () => {
  const [file, setFile] = useState(null);
  const [base64String, setBase64String] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [parsedData, setParsedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      convertToBase64(selectedFile);
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBase64String(reader.result);
    };
    reader.onerror = (error) => {
      console.error("Error converting file to base64:", error);
    };
  };

  const handleUpload = async () => {
    if (!base64String) {
      alert("No file selected or conversion failed.");
      return;
    }

    setLoading(true);
    setUploadStatus(
      "Please wait while NeoHire AI is processing your resume..."
    );
    setParsedData(null);

    try {
      const response = await fetch("/api/resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ file: base64String }),
      });

      const result = await response.json();
      if (response.ok) {
        setUploadStatus("File uploaded and processed successfully!");
        setParsedData(result.resumeData);
      } else {
        setUploadStatus(result.error || "Failed to process file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Error uploading file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`container space-y-6 px-12 pt-20 md:pt-28 pb-40 ${
        parsedData ? "pt-[600px]" : ""
      }`}
    >
      <div className="mb-8">
        <Link href="/dashboard" className="text-sm text-gray-200">
          ← Back to Dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-between">
        <h1 className="text-4xl font-bold gradient-title mb-2">NeoHire AI</h1>
        <p className="text-muted-foreground mb-4">
          Analyze and improve your resume with your personal resume analyzer
        </p>
      </div>

      {/* File Upload Card */}
      <Card className=" mx-auto">
        <CardHeader>
          <CardTitle>Resume Analyzer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="flex-grow"
            />
            <Button onClick={handleUpload} disabled={!file || loading}>
              {loading ? (
                <>
                  <Upload className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload PDF
                </>
              )}
            </Button>
          </div>
          {loading && <Progress value={33} className="w-full mb-4" />}
          {uploadStatus && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Status</AlertTitle>
              <AlertDescription>{uploadStatus}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {parsedData && (
        <div className="mt-8 space-y-6">
          {/* AI Score & Feedback */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-semibold mb-2 ">
                  <Target className="h-5 w-5 text-purple-500" /> AI Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-center">
                  {parsedData.aiScore} / 10
                </div>
                <Progress
                  value={(parsedData.aiScore / 10) * 100}
                  className="w-full mt-2"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-semibold mb-2 ">
                  <MessageSquare className="h-5 w-5 text-purple-500" /> Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{parsedData.feedback}</p>
              </CardContent>
            </Card>
          </div>

          {/* Jobs Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4 pt-6">Recommended Jobs</h2>
            <p className="text-muted-foreground mb-4">
              Best Suited jobs for you based on your skills!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {parsedData.jobOptions?.map((job) => (
                <Card key={job.id} className="relative">
                  <Badge
                    className="absolute top-4 right-4 p-2"
                    variant="secondary"
                  >
                    {job.jobType}
                  </Badge>
                  <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {job.company} - {job.industry}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Salary: ${job.salary.toLocaleString()}
                    </p>
                    <div className="mt-2">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="mr-1">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <Button className="mt-4">Apply</Button>
                  </CardContent>
                </Card>
              ))}
              {parsedData.jobOptions?.length === 0 && (
                <p>No job options available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resume;
