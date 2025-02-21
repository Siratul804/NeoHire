"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Edit, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Profile() {
  const { user } = useUser();
  const [skills, setSkills] = React.useState([
    "React",
    "TypeScript",
    "Node.js",
  ]);
  const [newSkill, setNewSkill] = React.useState("");

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  // Dummy project data
  const projects = [
    {
      title: "Project Alpha",
      description: "A revolutionary app for task management.",
      link: "#",
    },
    {
      title: "Project Beta",
      description: "An advanced AI-powered chatbot system.",
      link: "#",
    },
    {
      title: "Project Gamma",
      description: "A responsive e-commerce platform with real-time updates.",
      link: "#",
    },
  ];

  return (
    <div className="container px-12 pt-20 md:pt-28 pb-10">
      <div className="mb-8">
        <Link href="/dashboard" className="text-sm text-gray-200">
          ← Back to Dashboard
        </Link>
      </div>
      <div className="flex  gap-4">
        {/* Left Side - Profile Section */}
        <div className="w-[30%] space-y-4">
          <div className="flex flex-col items-center">
            <Image
              src={user?.imageUrl || "/placeholder.svg"}
              alt="Profile"
              width={250}
              height={250}
              className="rounded-full"
            />
            <h1 className="text-2xl font-bold mb-2 mt-4">
              {user?.fullName || "John Doe"}
            </h1>
          </div>
        </div>

        {/* Right Side - Main Content */}
        <div className="w-[70%] space-y-6">
          {/* Edit Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Edit Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={user?.fullName || "John Doe"} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  defaultValue={
                    user?.emailAddresses[0]?.emailAddress ||
                    "john.doe@example.com"
                  }
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="jobType">Job Type</Label>
                <Select>
                  <SelectTrigger id="jobType">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="onsite">On-Site</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>Edit Preferences</Button>
            </CardContent>
          </Card>

          {/* Experience and Skills Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Experience Card */}
            <Card>
              <CardHeader>
                <CardTitle>Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="text-left">
                        <div className="font-bold">Acme Inc.</div>
                        <div className="text-sm text-muted-foreground italic">
                          Senior Developer
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>Jan 2020 → Present</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Skills Card */}
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="ml-2 h-4 w-4 p-0"
                        onClick={() => removeSkill(skill)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Add a skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                  />
                  <Button onClick={handleAddSkill} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Projects Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <CardTitle>Projects</CardTitle>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project, index) => (
                  <Card key={index} className="p-4 shadow-md">
                    <h3 className="font-bold text-lg">{project.title}</h3>
                    <p className="text-sm text-muted-foreground my-2">
                      {project.description}
                    </p>

                    {/* Uncomment if you want the view project button */}
                    {/* <Button asChild size="sm" variant="outline">
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </Button> */}
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
