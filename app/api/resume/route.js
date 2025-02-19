import { NextResponse } from "next/server";
import { PdfReader } from "pdfreader";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const body = await req.json();
    const { file } = body;

    // Decode the base64 string
    const base64Data = file.replace(/^data:application\/pdf;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    // Save the decoded buffer to a temporary file
    const tempFilePath = path.join("/tmp", "temp-file.pdf");
    fs.writeFileSync(tempFilePath, buffer);

    // Return a promise that resolves when the PDF is parsed
    const parsedText = await new Promise((resolve, reject) => {
      let fullText = "";

      new PdfReader().parseFileItems(tempFilePath, (err, item) => {
        if (err) {
          reject("Error during PDF parsing: " + err);
        } else if (!item) {
          resolve(fullText); // Resolve with the accumulated text once parsing is done
        } else if (item.text) {
          fullText += item.text; // Accumulate text
        }
      });
    });

    // Format the text by removing line breaks and joining the text
    const formattedText = parsedText.replace(/(\r\n|\n|\r)/g, " ");

    console.log(formattedText); // Log the formatted text

    // Return a success response with the formatted text
    return NextResponse.json(
      { message: "Resume Parser Done.", parsedText: formattedText },
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
