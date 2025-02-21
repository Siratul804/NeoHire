import { NextResponse } from "next/server";
import { PdfReader } from "pdfreader";
import fs from "fs";
import path from "path";

import Groq from "groq-sdk";

// Initialize Groq SDK with API key
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

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

    async function generateResume(formattedText) {
      const systemPrompt = `You are an AI specialized in parsing and analyzing resumes. Your task is to extract relevant details and return ONLY a well-structured JSON array.

      ### Expected JSON Structure:
      [
        {
          "extractedSkills": [String], // A list of relevant skills extracted from the resume
          "extractedExperience": [
            {
              "company": String,   // Name of the company
              "role": String,      // Job title or role
              "duration": Number   // Duration in years
            }
          ],
          "extractedProjects": [String], // List of project names or descriptions
          "aiScore": Number // AI-generated score between 0-100 based on the resume's strength
        }
      ]
      
      ### Important Rules:
      1. **Return only valid JSON** — Do not include any explanations, extra text, or formatting outside the JSON array.
      2. **Ensure accuracy** — Extract precise skills, experiences, and project names without adding unrelated information.
      3. **Consistent formatting** — Follow the exact JSON structure without modifications.
      4. **aiScore Calculation** — This score (0-100) should be determined based on the overall quality, experience, and relevance of the resume.
      5. **No duplicate entries** — Avoid redundancy in extracted skills, experiences, or projects.
      6. **Strictly structured output** — Any response that does not adhere to the JSON format should be considered invalid.
      
      Return only the JSON array that fits these rules.`;

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Generate information based on : ${formattedText}`,
          },
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 0.8,
        stream: false,
        stop: null,
      });

      let aiResponse = chatCompletion.choices[0].message.content.trim();

      // 🔹 Remove possible Markdown formatting (` ```json ... ``` `)
      let cleanedResponse = aiResponse.replace(/^```json\s*|```$/g, "").trim();

      // console.log("Raw AI Response:", aiResponse);
      // console.log("Cleaned AI Response:", cleanedResponse);

      return cleanedResponse;
    }

    const aiResume = await generateResume(formattedText); // Changed from `tag` to `formattedText`

    if (!aiResume) {
      return NextResponse.json(
        { error: "Failed to generate resume." },
        { status: 500 }
      );
    }

    let resumeObject;

    // 🔹 Validate and Parse JSON
    try {
      resumeObject = JSON.parse(aiResume);

      // Ensure the response is an array of objects (no fixed length requirement)
      if (!Array.isArray(resumeObject) || resumeObject.length === 0) {
        throw new Error("Invalid resume structure");
      }
    } catch (error) {
      console.error("Invalid JSON received:", aiResume);
      return NextResponse.json(
        { error: "Invalid JSON format received from Groq." },
        { status: 500 }
      );
    }

    console.log(resumeObject);

    // Return a success response with the formatted text
    return NextResponse.json(
      { message: "Resume Parser Done.", parsedText: resumeObject },
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
