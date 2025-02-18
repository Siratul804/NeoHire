const mongoose = require("mongoose");

const InterviewSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to User
    job_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    }, // Reference to Job

    // AI Speech Analysis
    confidenceScore: { type: Number, default: 0 },
    toneAnalysis: {
      positivity: { type: Number },
      neutrality: { type: Number },
      negativity: { type: Number },
    },
    fluencyScore: { type: Number, default: 0 },

    feedback: { type: String },
  },
  { timestamps: true }
);

export const Interview =
  mongoose.models.Interview || mongoose.model("Interview", InterviewSchema);
