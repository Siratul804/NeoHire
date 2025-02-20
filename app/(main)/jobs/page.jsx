"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

// Dummy job data
const jobData = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    industry: "Technology",
    salary: 75000,
    jobType: "Remote",
    skills: ["React", "JavaScript", "CSS"],
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "InnoSoft",
    industry: "Software",
    salary: 85000,
    jobType: "Hybrid",
    skills: ["Node.js", "Express", "MongoDB"],
  },
  {
    id: 3,
    title: "Project Manager",
    company: "BizSolutions",
    industry: "Business",
    salary: 95000,
    jobType: "On-Site",
    skills: ["Leadership", "Agile", "Communication"],
  },
];

const Jobs = () => {
  const [filter, setFilter] = useState({
    jobType: "",
    industry: "",
    salary: "",
  });

  const filteredJobs = jobData.filter((job) => {
    return (
      (filter.jobType === "" || job.jobType === filter.jobType) &&
      (filter.industry === "" || job.industry.includes(filter.industry)) &&
      (filter.salary === "" || job.salary >= parseInt(filter.salary))
    );
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  return (
    <div className="container space-y-6 px-12 pt-20 md:pt-28 pb-10">
      <div className="mb-8">
        <Link href="/dashboard" className="text-sm text-gray-200">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold gradient-title">Trendy Jobs</h1>

        {/* Filter Inputs (Moved to Right) */}
        <div className="flex gap-4">
          <div className="w-44">
            <Select onValueChange={(value) => setFilter({ ...filter, jobType: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Job Preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Remote">Remote</SelectItem>
                <SelectItem value="On-Site">On-Site</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-44">
            <Select onValueChange={(value) => setFilter({ ...filter, industry: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Preferred Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Software">Software</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-44">
            <Input
              name="salary"
              type="number"
              placeholder="Minimum Salary"
              value={filter.salary}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {job.company} - {job.industry}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">
                  ${job.salary.toLocaleString()} / year
                </p>
                <p className="text-sm">Type: {job.jobType}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-400">No jobs found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Jobs;
