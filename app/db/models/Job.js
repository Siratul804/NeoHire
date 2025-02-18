const mongoose = require("mongoose");

// Job Schema
const JobSchema = new mongoose.Schema(
  {
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to User
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salaryRange: {
      min: { type: Number },
      max: { type: Number },
    },
    skillsRequired: [{ type: String }],
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "remote", "internship"],
      required: true,
    },

    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // References job seekers
  },
  { timestamps: true }
);

export const Job = mongoose.models.Job || mongoose.model("Job", JobSchema);
