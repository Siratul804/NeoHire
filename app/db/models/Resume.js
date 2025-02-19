const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    extractedSkills: [{ type: String }],
    extractedExperience: [
      {
        company: String,
        role: String,
        duration: Number, // in months
      },
    ],
    extractedProjects: [{ type: String }],
    aiScore: { type: Number, required: true }, // AI-based score (0-100)
    matchedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  },
  { timestamps: true }
);

export const Resume =
  mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);
