"use client";
import { useState } from "react";

export default function Interview() {
  const [audioFile, setAudioFile] = useState(null);
  const [transcription, setTranscription] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert audio file to base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Audio = reader.result.split(",")[1];

      // Send base64 audio to the API
      const response = await fetch("/api/interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ audioContent: base64Audio }),
      });

      const data = await response.json();
      if (response.ok) {
        setTranscription(data.transcription);
      } else {
        setTranscription("Error: " + data.error);
      }
    };

    if (audioFile) {
      reader.readAsDataURL(audioFile);
    }
  };

  return (
    <div>
      <h1>Speech-to-Text</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="audio/*" onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
      {transcription && (
        <div>
          <h2>Transcription:</h2>
          <p>{transcription}</p>
        </div>
      )}
    </div>
  );
}
