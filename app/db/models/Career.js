const mongoose = require("mongoose");

const careerPredictionSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    recommendedSkills: [{ type: String }],
    industryTrends: [{ type: String }],
    salaryData: [
      {
        name: String,
        min: Number,
        median: Number,
        max: Number,
      },
    ],
    suggestedCourses: [
      {
        title: String,
        provider: String,
        link: String,
      },
    ],
  },

  { timestamps: true }
);

export const Career =
  mongoose.models.Career || mongoose.model("Career", careerPredictionSchema);
