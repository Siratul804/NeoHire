const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
  {
    job_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    }, // Reference to Job
    applicant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to User
    status: {
      type: String,
      enum: ["pending", "reviewed", "shortlisted", "rejected"],
      default: "pending",
    },
    coverLetter: { type: String },

    aiMatchScore: { type: Number, default: 0 },
    interviewFeedback: { type: String }, // Removed unique constraint
  },
  { timestamps: true }
);

export const Application =
  mongoose.models.Application ||
  mongoose.model("Application", ApplicationSchema);
