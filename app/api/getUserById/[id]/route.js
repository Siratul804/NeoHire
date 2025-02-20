import { connectToDB } from "@/app/db/connection";
import { User } from "@/app/db/models/User";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectToDB();

    const { id } = params; // Use params directly here

    console.log("User ID:", id);

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required." },
        { status: 400 }
      );
    }

    // Query by the clerkId field instead of _id
    const user = await User.findOne({ clerkId: id });

    console.log("Fetched User:", JSON.stringify(user, null, 2));

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ user_data: user }, { status: 200 });
  } catch (error) {
    console.error("User retrieval error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
