import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const skills = body?.skills;

    console.log("Skills:", skills);

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid 'skills' in request body." },
        { status: 400 }
      );
    }

    async function generateCareerRecommendations(skills) {
      const systemPrompt = `You are an AI that provides career recommendations based on user skills.
      **Return ONLY a valid JSON object WITHOUT Markdown formatting or code blocks.**
      
      The JSON structure must be:
      {
        "recommendedSkills": ["string"],
        "industryTrends": ["string"],
        "suggestedCourses": [
          {
            "title": "string",
            "provider": "string",
            "link": "string"
          }
        ]
      }
      
      **Important Rules:**
      1. Do NOT return any Markdown or code formatting.
      2. Provide at least 5 recommended skills.
      3. Provide at least 3 industry trends.
      4. Provide at least 3 suggested courses.`;

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Generate career recommendations for skills: ${skills.join(
              ", "
            )}`,
          },
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 1500,
        top_p: 0.8,
        stream: false,
        stop: null,
      });

      let aiResponse = chatCompletion.choices[0].message.content.trim();

      let cleanedResponse = aiResponse.replace(/^```json\s*|```$/g, "").trim();

      return cleanedResponse;
    }

    const careerData = await generateCareerRecommendations(skills);

    if (!careerData) {
      return NextResponse.json(
        { error: "Failed to generate career recommendations." },
        { status: 500 }
      );
    }

    let careerObject;

    try {
      careerObject = JSON.parse(careerData);
    } catch (error) {
      console.error("Invalid JSON received:", careerData);
      return NextResponse.json(
        { error: "Invalid JSON format received from Groq." },
        { status: 500 }
      );
    }

    return NextResponse.json(careerObject);
  } catch (err) {
    console.error("Error invoking Groq:", err);
    return NextResponse.json(
      { error: "Failed to fetch the response from Groq." },
      { status: 500 }
    );
  }
}
