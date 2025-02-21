"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Edit, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Profile() {
  const { user } = useUser();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  useEffect(() => {
    if (!user?.id) return;

    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/getUserById/${user.id}`);
        if (!response.ok) throw new Error("User data not found");

        const data = await response.json();
        console.log(data);
        setUserData(data.user_data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?.id]);

  return (
    <div className="container px-12 pt-20 md:pt-28 pb-10">
      <div className="mb-8">
        <Link href="/dashboard" className="text-sm text-gray-200">
          ← Back to Dashboard
        </Link>
      </div>
      <div className="flex gap-4">
        {/* Left Side - Profile Section */}
        <div className="w-[30%] space-y-4">
          <div className="flex flex-col items-center">
            <Image
              src={user?.imageUrl || "/placeholder.svg"}
              alt="Profile"
              width={250}
              height={250}
              className="rounded-full"
            />
            <h1 className="text-2xl font-bold mb-2 mt-4">
              {user?.fullName || "John Doe"}
            </h1>
          </div>
        </div>

        {/* Right Side - Main Content */}
        <div className="w-[70%] space-y-6">
          {/* Edit Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Edit Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={user?.fullName || "John Doe"} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  defaultValue={
                    user?.emailAddresses?.[0]?.emailAddress ||
                    "john.doe@example.com"
                  }
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="jobType">Job Type</Label>
                <Select>
                  <SelectTrigger id="jobType">
                    <SelectValue placeholder={userData?.preferences?.jobType} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="onsite">On-Site</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>Edit Preferences</Button>
            </CardContent>
          </Card>

          {/* Experience and Skills Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Experience Card */}
            <Card>
              <CardHeader>
                <CardTitle>Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  {userData?.experience?.map((val, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>
                        <div className="text-left">
                          <div className="font-bold">{val.company}</div>
                          <div className="text-sm text-muted-foreground italic">
                            {val.role}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        {new Date(val.startDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                        })}
                        <span> {`->`} </span>
                        {new Date(val.endDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                        })}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Skills Card */}
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {userData?.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="ml-2 h-4 w-4 p-0"
                        onClick={() =>
                          setSkills(skills.filter((_, i) => i !== index))
                        }
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Add a skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                  />
                  <Button onClick={handleAddSkill} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Projects Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <CardTitle>Projects</CardTitle>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userData?.projects?.map((project, index) => (
                  <Card key={index} className="p-4 shadow-md">
                    <h3 className="font-bold text-lg">{project.title}</h3>
                    <p className="text-sm text-muted-foreground my-2">
                      {project.description}
                    </p>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
