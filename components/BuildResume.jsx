"use client";
import React, { useState } from "react";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 30,
  },
  section: {
    marginBottom: 15,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    borderBottom: "1px solid #000",
    paddingBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  boldText: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  contactInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Contact Information */}
      <View style={styles.section}>
        <Text style={styles.header}>{data.name}</Text>
        <View style={styles.contactInfo}>
          <Text style={styles.text}>Email: {data.email}</Text>
          <Text style={styles.text}>Phone: {data.phone}</Text>
          <Text style={styles.text}>Address: {data.address}</Text>
        </View>
        <View style={styles.contactInfo}>
          <Text style={styles.text}>LinkedIn: {data.linkedin}</Text>
          <Text style={styles.text}>GitHub: {data.github}</Text>
        </View>
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>About Me</Text>
        <Text style={styles.text}>{data.description}</Text>
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Skills</Text>
        <Text style={styles.text}>{data.skills}</Text>
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Experience</Text>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.boldText}>
            {data.expTitle} at {data.expCompany}
          </Text>
          <Text style={styles.text}>
            {data.expStart} - {data.expEnd}
          </Text>
          <Text style={styles.text}>{data.expDescription}</Text>
        </View>
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Education</Text>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.boldText}>
            {data.eduDegree} from {data.eduSchool}
          </Text>
          <Text style={styles.text}>
            {data.eduStart} - {data.eduEnd}
          </Text>
          <Text style={styles.text}>{data.eduDescription}</Text>
        </View>
      </View>

      {/* Projects */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Projects</Text>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.boldText}>{data.projectTitle}</Text>
          <Text style={styles.text}>{data.projectDescription}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default function BuildResume() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    description: "",
    skills: "",
    expTitle: "",
    expCompany: "",
    expStart: "",
    expEnd: "",
    expDescription: "",
    eduDegree: "",
    eduSchool: "",
    eduStart: "",
    eduEnd: "",
    eduDescription: "",
    projectTitle: "",
    projectDescription: "",
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="flex items-center h-screen">
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <h1>Resume Builder</h1>
        <div
          style={{
            display: "grid",
            gridGap: "10px",
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          <input name="name" placeholder="Full Name" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="phone" placeholder="Phone" onChange={handleChange} />
          <input name="address" placeholder="Address" onChange={handleChange} />
          <input
            name="linkedin"
            placeholder="LinkedIn URL"
            onChange={handleChange}
          />
          <input
            name="github"
            placeholder="GitHub URL"
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Professional Description"
            onChange={handleChange}
            style={{ gridColumn: "1 / -1", height: "80px" }}
          />
          <textarea
            name="skills"
            placeholder="Skills (comma separated)"
            onChange={handleChange}
            style={{ gridColumn: "1 / -1", height: "60px" }}
          />
          <input
            name="expTitle"
            placeholder="Job Title"
            onChange={handleChange}
          />
          <input
            name="expCompany"
            placeholder="Company"
            onChange={handleChange}
          />
          <input
            name="expStart"
            placeholder="Start Date"
            onChange={handleChange}
          />
          <input name="expEnd" placeholder="End Date" onChange={handleChange} />
          <textarea
            name="expDescription"
            placeholder="Job Description"
            onChange={handleChange}
            style={{ gridColumn: "1 / -1", height: "60px" }}
          />
          <input
            name="eduDegree"
            placeholder="Degree"
            onChange={handleChange}
          />
          <input
            name="eduSchool"
            placeholder="School"
            onChange={handleChange}
          />
          <input
            name="eduStart"
            placeholder="Start Date"
            onChange={handleChange}
          />
          <input name="eduEnd" placeholder="End Date" onChange={handleChange} />
          <textarea
            name="eduDescription"
            placeholder="Education Details"
            onChange={handleChange}
            style={{ gridColumn: "1 / -1", height: "60px" }}
          />
          {/* Project Fields */}
          <input
            name="projectTitle"
            placeholder="Project Title"
            onChange={handleChange}
          />
          <textarea
            name="projectDescription"
            placeholder="Project Description"
            onChange={handleChange}
            style={{ gridColumn: "1 / -1", height: "60px" }}
          />
        </div>
        <div style={{ margin: "20px 0" }}>
          <button onClick={() => setShowPreview(!showPreview)}>
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
        </div>
        {showPreview && (
          <PDFViewer style={{ width: "100%", height: "500px" }}>
            <MyDocument data={formData} />
          </PDFViewer>
        )}
      </div>
    </main>
  );
}
