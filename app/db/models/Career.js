const careerPredictionSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    recommendedSkills: [{ type: String }],
    industryTrends: [{ type: String }],
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
