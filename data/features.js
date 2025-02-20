import { BrainCircuit, Briefcase, LineChart, ScrollText } from "lucide-react";

export const features = [
  {
    icon: <BrainCircuit className="w-10 h-10 mb-4 text-primary" />,
    title: "AI-Powered Resume Screening",
    description:
      "Get personalized resume screener which removes hiring bias powered by advanced AI technology.",
  },
  {
    icon: <Briefcase className="w-10 h-10 mb-4 text-primary" />,
    title: "Interview Preparation",
    description:
      "Role-specific questions and AI tool analyzes speech, tone, and confidence in mock interviews to guide candidates",
  },
  {
    icon: <LineChart className="w-10 h-10 mb-4 text-primary" />,
    title: "Career Insights",
    description:
      "Stay ahead with real-time Career trends, salary data, and market analysis.",
  },
  {
    icon: <ScrollText className="w-10 h-10 mb-4 text-primary" />,
    title: "Smart Job Matching",
    description: "Suggests the most relevant jobs based on skills, personality, and work preferences",
  },
];
