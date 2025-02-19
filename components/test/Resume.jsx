"use client";
import { useState } from "react";

const PDFUploader = () => {
  const [file, setFile] = useState(null);
  const [base64String, setBase64String] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      convertToBase64(selectedFile);
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBase64String(reader.result);
    };
    reader.onerror = (error) => {
      console.error("Error converting file to base64:", error);
    };
  };

  const handleUpload = async () => {
    if (!base64String) {
      alert("No file selected or conversion failed.");
      return;
    }

    try {
      const response = await fetch("/api/resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ file: base64String }),
      });

      if (response.ok) {
        setUploadStatus("File uploaded successfully!");
      } else {
        setUploadStatus("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Error uploading file.");
    }
  };

  return (
    <div>
      <h2>PDF Uploader</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>
        Upload PDF
      </button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default PDFUploader;
