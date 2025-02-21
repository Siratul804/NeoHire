"use client";
import { useState } from "react";

const PDFUploader = () => {
  const [file, setFile] = useState(null);
  const [base64String, setBase64String] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [parsedData, setParsedData] = useState(null);
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    setUploadStatus("Uploading and processing...");
    setParsedData(null);

    try {
      const response = await fetch("/api/resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ file: base64String }),
      });

      const result = await response.json();
      if (response.ok) {
        setUploadStatus("File uploaded and processed successfully!");
        setParsedData(result.resumeData);
      } else {
        setUploadStatus(result.error || "Failed to process file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Error uploading file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div >
      <h2>PDF Uploader</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file || loading}>
        {loading ? "Processing..." : "Upload PDF"}
      </button>
      {uploadStatus && <p>{uploadStatus}</p>}
      <div>

     
      {parsedData && (
        <div className="pt-[1200px] pl-[900px] w-[40%]">
          <h3>Extracted Resume Data:</h3>
          <pre>{JSON.stringify(parsedData, null, 2)}</pre>
        </div>
      )}
      </div>
    </div>
  );
};

export default PDFUploader;
