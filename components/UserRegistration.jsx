"use client";
import React, { useState } from "react";

const UserRegistration = ({ clerkUser }) => {
  //   console.log(clerkUser.imageUrl);
  const [formData, setFormData] = useState({
    clerkId: clerkUser?.id || "", // Auto-populated from Clerk
    email: clerkUser.emailAddresses[0].emailAddress || "", // Auto-populated from Clerk
    name: clerkUser?.firstName || "", // Auto-populated from Clerk
    profilePicture: clerkUser?.imageUrl || "", // Auto-populated from Clerk
    resume: "",
    skills: [],
    experience: [
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
      },
    ],
    projects: [
      {
        title: "",
        description: "",
        link: "",
      },
    ],
    preferences: {
      jobType: "Remote",
      preferredIndustries: [],
      salaryExpectation: null,
    },
  });

  const handleArrayChange = (e, field) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [field]: value.split(",").map((item) => item.trim()),
    });
  };

  const handleNestedChange = (e, field, index, subField) => {
    const { value } = e.target;
    const updatedArray = [...formData[field]];
    updatedArray[index] = {
      ...updatedArray[index],
      [subField]: value,
    };
    setFormData({
      ...formData,
      [field]: updatedArray,
    });
  };

  const handlePreferencesChange = (e, subField) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      preferences: {
        ...formData.preferences,
        [subField]:
          subField === "preferredIndustries"
            ? value.split(",").map((item) => item.trim())
            : value,
      },
    });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        {
          company: "",
          role: "",
          startDate: "",
          endDate: "",
        },
      ],
    });
  };

  const removeExperience = (index) => {
    const updatedExperience = formData.experience.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      experience: updatedExperience,
    });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        {
          title: "",
          description: "",
          link: "",
        },
      ],
    });
  };

  const removeProject = (index) => {
    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      projects: updatedProjects,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting form with data:", formData);

    // Basic validation
    if (!formData.name || !formData.email) {
      alert("Name and Email are required fields.");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      console.log("User registered successfully:", data);
      alert("User registered successfully!");
    } catch (error) {
      console.error("Error during user registration:", error.message);
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <main className="flex h-screen items-center">
      <form onSubmit={handleSubmit}>
        {/* Skills Field */}
        <div>
          <label>Skills (comma separated):</label>
          <input
            type="text"
            name="skills"
            value={formData.skills.join(", ")}
            onChange={(e) => handleArrayChange(e, "skills")}
            placeholder="e.g., JavaScript, React, Node.js"
          />
        </div>

        {/* Experience Fields */}
        <div>
          <h3>Experience</h3>
          {formData.experience.map((exp, index) => (
            <div key={index}>
              <label>Company:</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) =>
                  handleNestedChange(e, "experience", index, "company")
                }
                placeholder="Enter company name"
              />
              <label>Role:</label>
              <input
                type="text"
                value={exp.role}
                onChange={(e) =>
                  handleNestedChange(e, "experience", index, "role")
                }
                placeholder="Enter your role"
              />
              <label>Start Date:</label>
              <input
                type="date"
                value={exp.startDate}
                onChange={(e) =>
                  handleNestedChange(e, "experience", index, "startDate")
                }
              />
              <label>End Date:</label>
              <input
                type="date"
                value={exp.endDate}
                onChange={(e) =>
                  handleNestedChange(e, "experience", index, "endDate")
                }
              />
              <button type="button" onClick={() => removeExperience(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addExperience}>
            Add Experience
          </button>
        </div>

        {/* Projects Fields */}
        <div>
          <h3>Projects</h3>
          {formData.projects.map((project, index) => (
            <div key={index}>
              <label>Title:</label>
              <input
                type="text"
                value={project.title}
                onChange={(e) =>
                  handleNestedChange(e, "projects", index, "title")
                }
                placeholder="Enter project title"
              />
              <label>Description:</label>
              <input
                type="text"
                value={project.description}
                onChange={(e) =>
                  handleNestedChange(e, "projects", index, "description")
                }
                placeholder="Enter project description"
              />
              <label>Link:</label>
              <input
                type="text"
                value={project.link}
                onChange={(e) =>
                  handleNestedChange(e, "projects", index, "link")
                }
                placeholder="Enter project link"
              />
              <button type="button" onClick={() => removeProject(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addProject}>
            Add Project
          </button>
        </div>

        {/* Preferences Fields */}
        <div>
          <h3>Preferences</h3>
          <label>Job Type:</label>
          <input
            type="text"
            value={formData.preferences.jobType}
            onChange={(e) => handlePreferencesChange(e, "jobType")}
            placeholder="Enter preferred job type"
          />
          <label>Preferred Industries (comma separated):</label>
          <input
            type="text"
            value={formData.preferences.preferredIndustries.join(", ")}
            onChange={(e) => handlePreferencesChange(e, "preferredIndustries")}
            placeholder="e.g., Tech, Finance, Healthcare"
          />
          <label>Salary Expectation:</label>
          <input
            type="number"
            value={formData.preferences.salaryExpectation || ""}
            onChange={(e) => handlePreferencesChange(e, "salaryExpectation")}
            placeholder="Enter salary expectation"
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </main>
  );
};

export default UserRegistration;
