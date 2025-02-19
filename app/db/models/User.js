const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true }, // Clerk's unique user ID
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    profilePicture: { type: String, default: "" }, // Cloudinary URL
    resume: { type: String, default: "" }, // Cloudinary URL
    skills: [{ type: String }],
    experience: [
      {
        company: String,
        role: String,
        startDate: Date,
        endDate: Date,
      },
    ],
    projects: [
      {
        title: String,
        description: String,
        link: String,
      },
    ],
    preferences: {
      jobType: {
        type: String,
        enum: ["Remote", "On-Site", "Hybrid"],
        default: "Remote",
      },
      preferredIndustries: [{ type: String }],
      salaryExpectation: { type: Number },
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
