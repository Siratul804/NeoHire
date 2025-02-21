import { NextResponse } from "next/server";
import { connectToDB } from "../../db/connection";
import { User } from "../../db/models/User";

export async function PUT(req) {
  try {
    const body = await req.json();

    // Required fields
    const requiredFields = ["email", "jobType", "skills", "projects"];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required.` },
          { status: 400 }
        );
      }
    }

    const { email, jobType, skills, projects } = body;

    // Connect to the database
    await connectToDB();

    // Find the user by email (case-insensitive)
    const user = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Update the user's preferences, skills, and projects
    user.preferences.jobType = jobType;
    user.skills = skills;
    user.projects = projects;

    // Save the updated user data
    await user.save();

    return NextResponse.json(
      { message: "User updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during user update:", error);
    return NextResponse.json(
      { error: "An error occurred during update. Please try again." },
      { status: 500 }
    );
  }
}
