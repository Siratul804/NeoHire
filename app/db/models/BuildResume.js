const mongoose = require("mongoose");

const buildResumeSchema = new mongoose.Schema(
  {
    contactInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
      address: { type: String },
      linkedin: { type: String },
      github: { type: String },
    },
    summary: { type: String, required: true },
    skills: { type: String, required: true },
    experience: [
      {
        title: { type: String, required: true },
        companyOrInstitution: { type: String },
        location: { type: String },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        description: { type: String },
      },
    ],
    education: [
      {
        title: { type: String, required: true },
        companyOrInstitution: { type: String },
        location: { type: String },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        description: { type: String },
      },
    ],
    projects: [
      {
        title: { type: String, required: true },
        companyOrInstitution: { type: String },
        location: { type: String },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        description: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.BuildResume ||
  mongoose.model("BuildResume", buildResumeSchema);
