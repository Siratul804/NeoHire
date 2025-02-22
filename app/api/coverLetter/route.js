import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the request body
    const { companyName, jobTitle, jobDescription } = body; // Extract the necessary fields from the body

    if (!companyName || !jobTitle || !jobDescription) {
      return NextResponse.json(
        { error: "Missing required fields in request body." },
        { status: 400 }
      );
    }

    async function generateCoverLetter(companyName, jobTitle, jobDescription) {
      const systemPrompt = `You are an AI that generates professional cover letters. 
      **Return ONLY the cover letter content, WITHOUT any additional text or formatting.**
      
      The cover letter should follow this structure:
      
      [Your Name] // don't use any example name
      [Your Address] | [Your Phone] | [Your Email]

      [Date]

      [Hiring Manager Name] (or Hiring Team)
      [Company Name]
      [Company Address]

      Dear [Mr./Ms./Mx. Last Name],

      I'm writing to express my strong interest in the [Job Title] position at [Company Name], as advertised on [Platform]. With [Number] years of experience in [Your Field] and proven skills in [Key Skill 1] and [Key Skill 2], I'm confident I can contribute effectively to your team.

      In my previous role at [Previous Company], I [Brief, impactful achievement, e.g., "increased efficiency by 15%"]. I'm particularly drawn to [Company Name]'s [Specific reason, e.g., "innovative approach"].

      My resume, attached, provides further detail. I'm available for an interview and eager to discuss how I can add value.

      Sincerely,
      [Your Name]
      `;

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Generate a cover letter for the ${jobTitle} position at ${companyName}. The job description is: ${jobDescription}.`,
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

      return aiResponse;
    }

    const coverLetter = await generateCoverLetter(
      companyName,
      jobTitle,
      jobDescription
    );

    if (!coverLetter) {
      return NextResponse.json(
        { error: "Failed to generate cover letter." },
        { status: 500 }
      );
    }

    return NextResponse.json({ coverLetter });
  } catch (err) {
    console.error("Error invoking Groq:", err);
    return NextResponse.json(
      { error: "Failed to fetch the response from Groq." },
      { status: 500 }
    );
  }
}
