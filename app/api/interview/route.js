import { SpeechClient } from "@google-cloud/speech";
import { NextResponse } from "next/server";

// Initialize the Speech-to-Text client
const client = new SpeechClient();

export async function POST(req) {
  try {
    // Extract the base64 audio content from the request body
    const body = await req.json();
    const { audioContent } = body;

    // console.log(audioContent);

    // Validate if audioContent is provided
    if (!audioContent) {
      return NextResponse.json(
        { error: "No audio content provided" },
        { status: 400 }
      );
    }

    // Configure audio properties
    const config = {
      encoding: "LINEAR16", // Change this according to your audio encoding
      sampleRateHertz: 16000, // Adjust this to your audio sample rate
      languageCode: "en-US", // Change this based on the language of the audio
    };

    // Prepare the request for Google Cloud Speech API
    const request = {
      audio: {
        content: audioContent,
      },
      config: config,
    };

    // Call the Speech-to-Text API
    const [response] = await client.recognize(request);

    // Extract the transcription from the API response
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join("\n");

    // Respond with the transcription text
    return NextResponse.json({ transcription }, { status: 200 });
  } catch (error) {
    console.error("Error processing speech to text:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
