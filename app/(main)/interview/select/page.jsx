// components/SkillSelection.js
"use client";

import Link from "next/link";

const skills = [
  { id: "javascript", name: "JavaScript" },
  { id: "react", name: "React" },
  { id: "nodejs", name: "Node.js" },
  { id: "python", name: "Python" },
  { id: "java", name: "Java" },
];

export default function SkillSelection() {
  return (
    <div className="container space-y-6 px-12 pt-20 md:pt-28 pb-10">
      <div className="mb-8">
        <Link href="/dashboard" className="text-sm text-gray-200">
          ← Back to Dashboard
        </Link>
      </div>
      <h1 className="text-4xl font-bold gradient-title">Select a Skill</h1>
      <p className="text-muted-foreground mb-4">
        Choose a skill to start your mock interview.
      </p>
      <div className="grid grid-cols-2 gap-4">
        {skills.map((skill) => (
          <Link
            key={skill.id}
            href={`/interview/${skill.id}`}
            className="p-6 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <h2 className="text-xl font-semibold">{skill.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
