import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the request body

    // Extract resume data from the request body
    const {
      contactInfo,
      description,
      skills,
      experience,
      education,
      projects,
    } = body;

    // Validate required fields
    if (!contactInfo || !description || !skills) {
      return NextResponse.json(
        { error: "Missing required fields in request body." },
        { status: 400 }
      );
    }

    // Function to generate a resume using Groq API
    async function generateResume(resumeData) {
      const systemPrompt = `You are an AI resume builder. Generate a well-structured resume based on the provided information.
      **Return ONLY a valid JSON object WITHOUT Markdown formatting or code blocks.**
      
      The JSON response must follow this structure:
      {
        "resume": "string" // The generated resume in plain text format
      }
      
      **Resume Structure:**
      - Contact Information
      - Description
      - Skills
      - Experience
      - Education
      - Projects
      `;

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Generate a resume based on the following data:
            Contact Information: ${JSON.stringify(resumeData.contactInfo)}
            Description: ${resumeData.description}
            Skills: ${JSON.stringify(resumeData.skills)}
            Experience: ${JSON.stringify(resumeData.experience)}
            Education: ${JSON.stringify(resumeData.education)}
            Projects: ${JSON.stringify(resumeData.projects)}`,
          },
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 0.8,
        stream: false,
        stop: null,
      });

      if (
        !chatCompletion ||
        !chatCompletion.choices ||
        chatCompletion.choices.length === 0
      ) {
        throw new Error("Empty response from Groq API.");
      }

      let aiResponse =
        chatCompletion.choices[0]?.message?.content?.trim() || "";

      // Debugging: Log the raw AI response
      console.log("Raw AI Response:", aiResponse);

      if (!aiResponse) {
        throw new Error("Received empty response from AI.");
      }

      // Clean the response to remove Markdown or code block formatting
      let cleanedResponse = aiResponse.replace(/^```json\s*|```$/g, "").trim();

      // Debugging: Log the cleaned response
      console.log("Cleaned Response:", cleanedResponse);

      return cleanedResponse;
    }

    // Generate the resume
    const resumeData = {
      contactInfo,
      description,
      skills,
      experience,
      education,
      projects,
    };
    const generatedResume = await generateResume(resumeData);

    if (!generatedResume) {
      return NextResponse.json(
        { error: "Failed to generate resume." },
        { status: 500 }
      );
    }

    let resumeObject;
    try {
      // Attempt to parse the cleaned response as JSON
      resumeObject = JSON.parse(generatedResume);

      // Validate the structure of the parsed JSON
      if (!resumeObject || typeof resumeObject.resume !== "string") {
        throw new Error("Invalid resume structure received.");
      }
    } catch (error) {
      console.error("Invalid JSON received:", generatedResume);
      return NextResponse.json(
        { error: "Invalid JSON format received from Groq." },
        { status: 500 }
      );
    }

    return NextResponse.json(resumeObject);
  } catch (err) {
    console.error("Error invoking Groq:", err);
    return NextResponse.json(
      {
        error: "Failed to fetch the response from Groq.",
        details: err.message,
      },
      { status: 500 }
    );
  }
}
