import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the request body
    const questions = body?.questions; // Extract questions from request
    const answers = body?.answers; // Extract answers from request

    if (
      !Array.isArray(questions) ||
      questions.length === 0 ||
      !Array.isArray(answers) ||
      answers.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid or missing 'questions' or 'answers' array in request body.",
        },
        { status: 400 }
      );
    }

    async function evaluateAnswers(questions, answers) {
      const systemPrompt = `You are an AI evaluator that reviews answers based on the given questions.
      **Return ONLY a valid JSON object WITHOUT Markdown formatting or code blocks.**
      
      The JSON response must follow this structure:
      {
        "score": number, // Score out of 100
        "strengths": "string", // Key strengths
        "areasForImprovement": "string", // Areas needing improvement
        "feedback": "string", // Detailed feedback
        "speechClarityScore": number, // Clarity of responses (0-100)
        "confidenceScore": number, // Confidence level (0-100)
        "toneAnalysis": "string" // e.g., "Calm", "Confident", "Nervous"
      }
      
      **Evaluation Rules:**
      - Assess the accuracy and completeness of each answer.
      - Provide constructive feedback on mistakes or missing details.
      - Identify strong points in the answers.
      - Analyze speech clarity and confidence levels.
      - Evaluate tone of responses.
      `;

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Evaluate the following responses based on their respective questions:
            Questions: ${JSON.stringify(questions)}
            Answers: ${JSON.stringify(answers)}`,
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
      let cleanedResponse = aiResponse.replace(/^```json\s*|```$/g, "").trim();
      return cleanedResponse;
    }

    const evaluationData = await evaluateAnswers(questions, answers);

    if (!evaluationData) {
      return NextResponse.json(
        { error: "Failed to generate evaluation." },
        { status: 500 }
      );
    }

    let evaluationObject;
    try {
      evaluationObject = JSON.parse(evaluationData);

      if (
        typeof evaluationObject.score !== "number" ||
        typeof evaluationObject.strengths !== "string" ||
        typeof evaluationObject.areasForImprovement !== "string" ||
        typeof evaluationObject.feedback !== "string" ||
        typeof evaluationObject.speechClarityScore !== "number" ||
        typeof evaluationObject.confidenceScore !== "number" ||
        typeof evaluationObject.toneAnalysis !== "string"
      ) {
        throw new Error("Invalid evaluation structure");
      }
    } catch (error) {
      console.error("Invalid JSON received:", evaluationData);
      return NextResponse.json(
        { error: "Invalid JSON format received from Groq." },
        { status: 500 }
      );
    }

    return NextResponse.json(evaluationObject);
  } catch (err) {
    console.error("Error invoking Groq:", err);
    return NextResponse.json(
      { error: "Failed to fetch the response from Groq." },
      { status: 500 }
    );
  }
}
