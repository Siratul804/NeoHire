"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const skills = [
  { id: "javascript", name: "JavaScript" },
  { id: "react", name: "React" },
  { id: "nodejs", name: "Node.js" },
  { id: "python", name: "Python" },
  { id: "java", name: "Java" },
];

export default function SkillSelection() {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const router = useRouter();

  const toggleSkill = (skillId) => {
    setSelectedSkills((prev) =>
      prev.includes(skillId)
        ? prev.filter((id) => id !== skillId)
        : [...prev, skillId]
    );
  };

  const handleStartInterview = () => {
    const skillIds = selectedSkills.join(",");
    router.push(`/interview/${skillIds}`);
  };

  return (
    <div className="container pt-20 md:pt-28 pb-10 max-w-4xl mx-auto space-y-8 px-4 py-16">
      <div className="flex flex-col gap-4">
        <Link
          href="/dashboard"
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold tracking-tight">Mock Interview</h1>
        <p className="text-xl text-muted-foreground">
          Choose one or more skills to start your mock interview.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <Card
            key={skill.id}
            onClick={() => toggleSkill(skill.id)}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedSkills.includes(skill.id)
                ? "border-primary bg-primary/5"
                : ""
            }`}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">{skill.name}</span>
                {selectedSkills.includes(skill.id) && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
      <div className="space-y-4">
        {/* <div className="flex flex-wrap gap-2">
          {selectedSkills.map((skillId) => (
            <Badge key={skillId} variant="secondary">
              {skills.find((s) => s.id === skillId)?.name}
            </Badge>
          ))}
        </div> */}
        <Button
          onClick={handleStartInterview}
          disabled={selectedSkills.length === 0}
          size="lg"
          className="w-full"
        >
          Start Interview with {selectedSkills.length} Skill
          {selectedSkills.length !== 1 ? "s" : ""}
        </Button>
      </div>
    </div>
  );
}
