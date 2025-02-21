// components/SkillSelection.js
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Updated import for useRouter

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const skills = [
  { id: "javascript", name: "JavaScript" },
  { id: "react", name: "React" },
  { id: "nodejs", name: "Node.js" },
  { id: "python", name: "Python" },
  { id: "java", name: "Java" },
];

export default function SkillSelection() {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const router = useRouter(); // Initialize the router

  const toggleSkill = (skillId) => {
    if (selectedSkills.includes(skillId)) {
      setSelectedSkills(selectedSkills.filter((id) => id !== skillId));
    } else {
      setSelectedSkills([...selectedSkills, skillId]);
    }
  };

  const handleStartInterview = () => {
    const skillIds = selectedSkills.join(",");
    router.push(`/interview/${skillIds}`); // Use router.push for navigation
  };

  return (
    <div className="container max-w-full space-y-8 px-4 py-16 md:px-6 lg:py-24">
      <div className="flex flex-col gap-4">
        <Link
          href="/dashboard"
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Select Your Skill
        </h1>
        <p className="text-muted-foreground">
          Choose one or more skills to start your mock interview.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {skills.map((skill) => (
          <Card
            key={skill.id}
            onClick={() => toggleSkill(skill.id)}
            className={`cursor-pointer transition-colors hover:bg-accent ${
              selectedSkills.includes(skill.id)
                ? "bg-primary text-primary-foreground"
                : ""
            }`}
          >
            <div className="p-4">
              <h2 className="text-md font-semibold">{skill.name}</h2>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex justify-end  ">
        <Button
          onClick={handleStartInterview}
          disabled={selectedSkills.length === 0}
          size="lg"
          className="p-4 py-4 w-full "
        >
          Start Interview
        </Button>
      </div>
    </div>
  );
}
