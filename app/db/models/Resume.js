const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to User
    uploadedAt: { type: Date, default: Date.now },

    // AI-extracted details
    parsedSkills: [{ type: String }],
    parsedExperience: [
      {
        company: { type: String },
        position: { type: String },
        years: { type: Number },
      },
    ],

    // AI Suggested Jobs
    matchedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }], // Reference to Job model
  },
  { timestamps: true }
);

export const Resume =
  mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);
