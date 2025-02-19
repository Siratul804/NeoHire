import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { file } = body;

    console.log(file);

    return NextResponse.json(
      { message: "Resume Parser Done." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during PDF parsing:", error);
    return NextResponse.json(
      { error: "An error occurred during PDF parsing. Please try again." },
      { status: 500 }
    );
  }
}
