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
import { jobData } from "@/data/jobs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Jobs = () => {
  const [filter, setFilter] = useState({
    jobType: "All",
    industry: "All",
    salary: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  const filteredJobs = jobData.filter((job) => {
    return (
      (filter.jobType === "All" || job.jobType === filter.jobType) &&
      (filter.industry === "All" || job.industry.includes(filter.industry)) &&
      (filter.salary === "" || job.salary >= parseInt(filter.salary))
    );
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
    setCurrentPage(1);
  };

  const handleSelectChange = (name, value) => {
    setFilter({ ...filter, [name]: value });
    setCurrentPage(1);
  };

  // Pagination Logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div className="container space-y-6 px-12 pt-20 md:pt-28 pb-10">
      <div className="mb-8">
        <Link href="/dashboard" className="text-sm text-gray-200">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold gradient-title">Trendy Jobs</h1>

        <div className="flex gap-4">
          <div className="w-44">
            <Select onValueChange={(value) => handleSelectChange("jobType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Job Preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
                <SelectItem value="On-Site">On-Site</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-44">
            <Select onValueChange={(value) => handleSelectChange("industry", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Preferred Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
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

      <div className="space-y-4">
        {currentJobs.length > 0 ? (
          currentJobs.map((job) => (
            <Card key={job.id} className="relative">
              <Badge variant="secondary" className="absolute top-4 right-4 p-2">{job.jobType}</Badge>

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
                <div className="flex flex-wrap gap-2 mt-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <Button className="mt-4">Apply</Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-400">No jobs found matching your criteria.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </Button>
          <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default Jobs;