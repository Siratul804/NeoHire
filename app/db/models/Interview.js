const mongoose = require("mongoose");

const InterviewSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    interviewDate: { type: Date, default: Date.now },
    speechClarityScore: { type: Number, min: 0, max: 100 }, // question clarity
    confidenceScore: { type: Number, min: 0, max: 100 }, // question confidence
    toneAnalysis: { type: String }, // e.g., "Calm", "Confident", "Nervous"
    feedback: { type: String }, // AI-generated feedback
    improvementSuggestions: [{ type: String }],
  },
  { timestamps: true }
);

export const Interview =
  mongoose.models.Interview || mongoose.model("Interview", InterviewSchema);
