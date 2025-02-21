import { NextResponse } from "next/server";
import { PdfReader } from "pdfreader";
import fs from "fs/promises"; // Use fs.promises for async operations
import path from "path";
import os from "os";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { file } = body;

    const base64Data = file.replace(/^data:application\/pdf;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, "temp-file.pdf");

    // Write file asynchronously
    await fs.writeFile(tempFilePath, buffer);

    // Parse PDF asynchronously
    const parsedText = await new Promise((resolve, reject) => {
      let fullText = "";
      new PdfReader().parseFileItems(tempFilePath, (err, item) => {
        if (err) {
          reject("Error during PDF parsing: " + err);
        } else if (!item) {
          resolve(fullText);
        } else if (item.text) {
          fullText += item.text;
        }
      });
    });

    // Delete file asynchronously
    await fs.unlink(tempFilePath);

    const formattedText = parsedText.replace(/(\r\n|\n|\r)/g, " ");

    async function generateResume(formattedText) {
      const systemPrompt = `You are an AI specialized in parsing and analyzing resumes. Your task is to extract relevant details and return ONLY a well-structured JSON array.

      ### Expected JSON Structure:
      [
        {
          "extractedSkills": [String],
          "extractedExperience": [
            {
              "company": String,
              "role": String,
              "duration": Number
            }
          ],
          "extractedProjects": [String],
          "aiScore": Number
        }
      ]

      ### Important Rules:
      1. **Return only valid JSON** without any explanations or extra text.
      2. **Ensure accuracy** and avoid unrelated information.
      3. **Consistent formatting** and **no duplicate entries**.
      4. **Strict JSON output** — Any invalid response should be rejected.

      Return only the JSON array that fits these rules.`;

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Generate information based on: ${formattedText}`,
          },
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 1000,
      });

      let aiResponse = chatCompletion.choices[0].message.content.trim();
      let cleanedResponse = aiResponse.replace(/^```json\s*|```$/g, "").trim();
      return cleanedResponse;
    }

    const aiResume = await generateResume(formattedText);
    if (!aiResume) {
      return NextResponse.json(
        { error: "Failed to generate resume." },
        { status: 500 }
      );
    }

    let resumeObject;
    try {
      resumeObject = JSON.parse(aiResume);
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
