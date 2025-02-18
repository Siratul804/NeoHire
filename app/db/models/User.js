const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, unique: true }, // Clerk's User ID
    email: { type: String, unique: true, required: true }, // Email should be required
    name: { type: String, required: true },
    profilePicture: { type: String, default: "" },

    // Role: Job Seeker or Admin
    role: { type: String, enum: ["job_seeker", "admin"], required: true },

    // Job Seeker Fields
    skills: [{ type: String }],
    experience: [
      {
        company: { type: String },
        position: { type: String },
        years: { type: Number },
      },
    ],
    resumeURL: { type: String },
    appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }], // Reference to Job model

    // Admin Fields
    companyName: { type: String },
    postedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],

    // AI Career Recommendations
    recommendedSkills: [{ type: String }],
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
