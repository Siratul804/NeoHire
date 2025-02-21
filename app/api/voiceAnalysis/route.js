import record from "mic";
import speech from "@google-cloud/speech";

// Initialize Google Speech Client
const client = new speech.SpeechClient();

// Configure microphone
const micInstance = record({
  rate: "16000",
  channels: "1",
  encoding: "LINEAR16",
});

const audioStream = micInstance.getAudioStream();
const request = {
  config: {
    encoding: "LINEAR16",
    sampleRateHertz: 16000,
    languageCode: "en-US",
  },
  interimResults: true,
};

// Start real-time speech recognition
const recognizeStream = client
  .streamingRecognize(request)
  .on("error", console.error)
  .on("data", (data) => {
    console.log(
      "Text: ",
      data.results[0]?.alternatives[0]?.transcript || "No speech detected."
    );
  });

console.log("Recording... Speak now!");
audioStream.pipe(recognizeStream);
micInstance.start();

// Stop after 10 seconds
setTimeout(() => {
  micInstance.stop();
  console.log("Stopped recording.");
}, 10000);
