import { NextResponse } from "next/server";
import { connectToDB } from "../../db/connection";
import { User } from "../../db/models/User";

export async function POST(req) {
  try {
    const body = await req.json();

    // Required fields based on the schema
    const requiredFields = ["clerkId", "email", "name", "role"];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required.` },
          { status: 400 }
        );
      }
    }

    const {
      clerkId,
      email,
      name,
      profilePicture = "",
      role,
      skills = [],
      experience = [],
      resumeURL = "",
      appliedJobs = [],
      companyName = "",
      postedJobs = [],
      recommendedSkills = [],
    } = body;

    // Validate role
    if (!["job_seeker", "admin"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid role. Must be 'job_seeker' or 'admin'." },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDB();

    // Check if the user already exists (case-insensitive email check)
    const existingUser = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists." },
        { status: 409 }
      );
    }

    // Create a new user
    const newUser = new User({
      clerkId,
      email,
      name,
      profilePicture,
      role,
      skills,
      experience,
      resumeURL,
      appliedJobs,
      companyName,
      postedJobs,
      recommendedSkills,
    });

    // Save to the database
    await newUser.save();

    return NextResponse.json(
      { message: " registered successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during  registration:", error);
    return NextResponse.json(
      { error: "An error occurred during registration. Please try again." },
      { status: 500 }
    );
  }
}
