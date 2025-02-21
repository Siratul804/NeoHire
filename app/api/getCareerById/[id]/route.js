import { connectToDB } from "@/app/db/connection";
import { Career } from "../../../db/models/Career";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectToDB();

    const { id } = await params; // Use params directly here

    console.log("Clerk ID:", id);

    if (!id) {
      return NextResponse.json(
        { error: "Clerk ID is required." },
        { status: 400 }
      );
    }

    // Query by the clerkId field instead of _id
    const carrer = await Career.findOne({ clerkId: id });

    console.log("Fetched Career:", JSON.stringify(carrer, null, 2));

    if (!carrer) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ carrer_data: carrer }, { status: 200 });
  } catch (error) {
    console.error("User retrieval error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
