"use client";
import React, { useState } from "react";

import { PDFDownloadLink } from "@react-pdf/renderer";

import ResumePDF from "./ResumePDF";
// Main App Component
const BuildResume = () => {
  const [formData, setFormData] = useState({
    contactInfo: {
      name: "",
      email: "",
      phone: "",
      address: "",
      linkedin: "",
      github: "",
    },
    description: "",
    skills: "",
    experience: [],
    education: [],
    projects: [],
  });

  const [preview, setPreview] = useState(false);

  const handleChange = (e, section, field) => {
    const { value } = e.target;
    if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleArrayChange = (e, section, index, field) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addEntry = (section) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [
        ...prev[section],
        {
          title: "",
          companyOrInstitution: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPreview(true);
  };

  return (
    <div>
      <h1>Resume Builder</h1>
      <form onSubmit={handleSubmit}>
        <h2>Contact Information</h2>
        <input
          type="text"
          placeholder="Name"
          value={formData.contactInfo.name}
          onChange={(e) => handleChange(e, "contactInfo", "name")}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.contactInfo.email}
          onChange={(e) => handleChange(e, "contactInfo", "email")}
        />
        <input
          type="text"
          placeholder="Phone"
          value={formData.contactInfo.phone}
          onChange={(e) => handleChange(e, "contactInfo", "phone")}
        />
        <input
          type="text"
          placeholder="Address"
          value={formData.contactInfo.address}
          onChange={(e) => handleChange(e, "contactInfo", "address")}
        />
        <input
          type="text"
          placeholder="LinkedIn"
          value={formData.contactInfo.linkedin}
          onChange={(e) => handleChange(e, "contactInfo", "linkedin")}
        />
        <input
          type="text"
          placeholder="GitHub"
          value={formData.contactInfo.github}
          onChange={(e) => handleChange(e, "contactInfo", "github")}
        />

        <h2>Description</h2>
        <textarea
          placeholder="About Me"
          value={formData.description}
          onChange={(e) => handleChange(e, null, "description")}
        />

        <h2>Skills</h2>
        <input
          type="text"
          placeholder="Skills"
          value={formData.skills}
          onChange={(e) => handleChange(e, null, "skills")}
        />

        <h2>Experience</h2>
        {formData.experience.map((exp, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Title"
              value={exp.title}
              onChange={(e) =>
                handleArrayChange(e, "experience", index, "title")
              }
            />
            <input
              type="text"
              placeholder="Company/Institution"
              value={exp.companyOrInstitution}
              onChange={(e) =>
                handleArrayChange(
                  e,
                  "experience",
                  index,
                  "companyOrInstitution"
                )
              }
            />
            <input
              type="text"
              placeholder="Location"
              value={exp.location}
              onChange={(e) =>
                handleArrayChange(e, "experience", index, "location")
              }
            />
            <input
              type="text"
              placeholder="Start Date"
              value={exp.startDate}
              onChange={(e) =>
                handleArrayChange(e, "experience", index, "startDate")
              }
            />
            <input
              type="text"
              placeholder="End Date"
              value={exp.endDate}
              onChange={(e) =>
                handleArrayChange(e, "experience", index, "endDate")
              }
            />
            <textarea
              placeholder="Description"
              value={exp.description}
              onChange={(e) =>
                handleArrayChange(e, "experience", index, "description")
              }
            />
          </div>
        ))}
        <button type="button" onClick={() => addEntry("experience")}>
          Add Experience
        </button>

        <h2>Education</h2>
        {formData.education.map((edu, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Title"
              value={edu.title}
              onChange={(e) =>
                handleArrayChange(e, "education", index, "title")
              }
            />
            <input
              type="text"
              placeholder="Company/Institution"
              value={edu.companyOrInstitution}
              onChange={(e) =>
                handleArrayChange(e, "education", index, "companyOrInstitution")
              }
            />
            <input
              type="text"
              placeholder="Location"
              value={edu.location}
              onChange={(e) =>
                handleArrayChange(e, "education", index, "location")
              }
            />
            <input
              type="text"
              placeholder="Start Date"
              value={edu.startDate}
              onChange={(e) =>
                handleArrayChange(e, "education", index, "startDate")
              }
            />
            <input
              type="text"
              placeholder="End Date"
              value={edu.endDate}
              onChange={(e) =>
                handleArrayChange(e, "education", index, "endDate")
              }
            />
            <textarea
              placeholder="Description"
              value={edu.description}
              onChange={(e) =>
                handleArrayChange(e, "education", index, "description")
              }
            />
          </div>
        ))}
        <button type="button" onClick={() => addEntry("education")}>
          Add Education
        </button>

        <h2>Projects</h2>
        {formData.projects.map((proj, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Title"
              value={proj.title}
              onChange={(e) => handleArrayChange(e, "projects", index, "title")}
            />
            <input
              type="text"
              placeholder="Company/Institution"
              value={proj.companyOrInstitution}
              onChange={(e) =>
                handleArrayChange(e, "projects", index, "companyOrInstitution")
              }
            />
            <input
              type="text"
              placeholder="Location"
              value={proj.location}
              onChange={(e) =>
                handleArrayChange(e, "projects", index, "location")
              }
            />
            <input
              type="text"
              placeholder="Start Date"
              value={proj.startDate}
              onChange={(e) =>
                handleArrayChange(e, "projects", index, "startDate")
              }
            />
            <input
              type="text"
              placeholder="End Date"
              value={proj.endDate}
              onChange={(e) =>
                handleArrayChange(e, "projects", index, "endDate")
              }
            />
            <textarea
              placeholder="Description"
              value={proj.description}
              onChange={(e) =>
                handleArrayChange(e, "projects", index, "description")
              }
            />
          </div>
        ))}
        <button type="button" onClick={() => addEntry("projects")}>
          Add Project
        </button>

        <button type="submit">Generate Resume</button>
      </form>

      {preview && (
        <div>
          <h2>Preview</h2>
          <PDFDownloadLink
            document={<ResumePDF data={formData} />}
            fileName="resume.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download Resume"
            }
          </PDFDownloadLink>
          <ResumePDF data={formData} />
        </div>
      )}
    </div>
  );
};

export default BuildResume;
