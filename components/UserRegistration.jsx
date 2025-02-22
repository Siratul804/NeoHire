"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, MinusCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const UserRegistration = ({ clerkUser }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    clerkId: clerkUser?.id || "",
    email: clerkUser.emailAddresses[0].emailAddress || "",
    name: clerkUser?.firstName || "",
    profilePicture: clerkUser?.imageUrl || "",
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

    if (!formData.name || !formData.email) {
      toast({
        title: "Error",
        description: "Name and Email are required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true); // Start loading

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

      const careerResponse = await fetch("/api/carrierIns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skills: formData.skills,
          clerkId: formData.clerkId,
        }),
      });

      if (!careerResponse.ok) {
        throw new Error("Career recommendation failed");
      }

      const careerData = await careerResponse.json();
      console.log("Career recommendations:", careerData);

      // Show success toast
      toast({
        title: "Success",
        description:
          "User registered and career recommendations generated successfully!",
        variant: "default",
      });

      // Redirect to dashboard after short delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000); // 2-second delay to allow the toast to display
    } catch (error) {
      console.error("Error during user registration:", error.message);
      toast({
        title: "Error",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <main className="container space-y-6 px-12 pt-20 md:pt-28 pb-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold gradient-title">
          Set up your profile
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="skills">Skills (comma separated)</Label>
              <Input
                id="skills"
                name="skills"
                value={formData.skills.join(", ")}
                onChange={(e) => handleArrayChange(e, "skills")}
                placeholder="e.g., JavaScript, React, Node.js"
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Experience</h3>
                <Button
                  type="button"
                  onClick={addExperience}
                  variant="outline"
                  size="sm"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Experience
                </Button>
              </div>
              {formData.experience.map((exp, index) => (
                <Card key={index}>
                  <CardContent className="pt-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`company-${index}`}>Company</Label>
                        <Input
                          id={`company-${index}`}
                          value={exp.company}
                          onChange={(e) =>
                            handleNestedChange(
                              e,
                              "experience",
                              index,
                              "company"
                            )
                          }
                          placeholder="Enter company name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`role-${index}`}>Role</Label>
                        <Input
                          id={`role-${index}`}
                          value={exp.role}
                          onChange={(e) =>
                            handleNestedChange(e, "experience", index, "role")
                          }
                          placeholder="Enter your role"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                        <Input
                          id={`startDate-${index}`}
                          type="date"
                          value={exp.startDate}
                          onChange={(e) =>
                            handleNestedChange(
                              e,
                              "experience",
                              index,
                              "startDate"
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`endDate-${index}`}>End Date</Label>
                        <Input
                          id={`endDate-${index}`}
                          type="date"
                          value={exp.endDate}
                          onChange={(e) =>
                            handleNestedChange(
                              e,
                              "experience",
                              index,
                              "endDate"
                            )
                          }
                        />
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={() => removeExperience(index)}
                      variant="destructive"
                      size="sm"
                    >
                      <MinusCircle className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Projects</h3>
                <Button
                  type="button"
                  onClick={addProject}
                  variant="outline"
                  size="sm"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </div>
              {formData.projects.map((project, index) => (
                <Card key={index}>
                  <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`projectTitle-${index}`}>Title</Label>
                      <Input
                        id={`projectTitle-${index}`}
                        value={project.title}
                        onChange={(e) =>
                          handleNestedChange(e, "projects", index, "title")
                        }
                        placeholder="Enter project title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`projectDescription-${index}`}>
                        Description
                      </Label>
                      <Textarea
                        id={`projectDescription-${index}`}
                        value={project.description}
                        onChange={(e) =>
                          handleNestedChange(
                            e,
                            "projects",
                            index,
                            "description"
                          )
                        }
                        placeholder="Enter project description"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`projectLink-${index}`}>Link</Label>
                      <Input
                        id={`projectLink-${index}`}
                        value={project.link}
                        onChange={(e) =>
                          handleNestedChange(e, "projects", index, "link")
                        }
                        placeholder="Enter project link"
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={() => removeProject(index)}
                      variant="destructive"
                      size="sm"
                    >
                      <MinusCircle className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Preferences</h3>
              <div className="space-y-2">
                <Label htmlFor="jobType">
                  Job Preference (Remote / Hybrid / Onsite)
                </Label>
                <Input
                  id="jobType"
                  value={formData.preferences.jobType}
                  onChange={(e) => handlePreferencesChange(e, "jobType")}
                  placeholder="Enter preferred job type"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredIndustries">
                  Preferred Industries (comma separated)
                </Label>
                <Input
                  id="preferredIndustries"
                  value={formData.preferences.preferredIndustries.join(", ")}
                  onChange={(e) =>
                    handlePreferencesChange(e, "preferredIndustries")
                  }
                  placeholder="e.g., Tech, Finance, Healthcare"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salaryExpectation">Salary Expectation</Label>
                <Input
                  id="salaryExpectation"
                  type="number"
                  value={formData.preferences.salaryExpectation || ""}
                  onChange={(e) =>
                    handlePreferencesChange(e, "salaryExpectation")
                  }
                  placeholder="Enter salary expectation"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" disabled={loading}>
          {loading ? (
            <div className="flex items-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Saving...
            </div>
          ) : (
            "Save"
          )}
        </Button>
      </form>
    </main>
  );
};

export default UserRegistration;
