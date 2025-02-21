import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the request body
    const tag = body?.tag; // Extract the 'tag' field from the body

    if (!tag || typeof tag !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'tag' in request body." },
        { status: 400 }
      );
    }

    async function generateQuestions(tag) {
      const systemPrompt = `You are an AI that generates quiz questions for the given tag. 
      **Return ONLY a valid JSON array of 5 quiz questions, WITHOUT Markdown formatting or code blocks.**
      
      Each quiz question must follow this structure:
      [
        {
          "tag": "string",
          "question": "string"
        }
      ]
      
      **Important Rules:**
      1. Do NOT return any Markdown or code formatting.
      2. Return exactly 5 quiz questions.
      `;

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Generate 5 quiz questions for the tag: ${tag}`,
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

      return cleanedResponse;
    }

    const questionsData = await generateQuestions(tag);

    if (!questionsData) {
      return NextResponse.json(
        { error: "Failed to generate questions." },
        { status: 500 }
      );
    }

    let questionsObject;

    // 🔹 Validate and Parse JSON
    try {
      questionsObject = JSON.parse(questionsData);

      // Ensure the response is an array of objects
      if (!Array.isArray(questionsObject) || questionsObject.length !== 5) {
        throw new Error("Invalid questions structure");
      }
    } catch (error) {
      console.error("Invalid JSON received:", questionsData);
      return NextResponse.json(
        { error: "Invalid JSON format received from Groq." },
        { status: 500 }
      );
    }
    return NextResponse.json(questionsObject);
  } catch (err) {
    console.error("Error invoking Groq:", err);
    return NextResponse.json(
      { error: "Failed to fetch the response from Groq." },
      { status: 500 }
    );
  }
}
