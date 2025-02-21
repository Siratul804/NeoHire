"use client";
import React, { useState } from "react";
import {
  PDFViewer,
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, fontFamily: "Helvetica" },
  header: {
    marginBottom: 20,
    textAlign: "center",
    borderBottom: "2 solid black",
    paddingBottom: 10,
  },
  name: { fontSize: 26, fontWeight: "bold", color: "#2C3E50" },
  contact: { fontSize: 12, color: "#34495E" },
  section: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#F4F6F7",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F618D",
    marginBottom: 5,
  },
  text: { lineHeight: 1.5, color: "#2C3E50" },
});

const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.contact}>
          {data.email} | {data.phone}
        </Text>
        <Text style={styles.contact}>{data.address}</Text>
        <Text style={styles.contact}>
          LinkedIn: {data.linkedin} | GitHub: {data.github}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.text}>{data.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.text}>{data.skills}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        <Text style={styles.text}>
          {data.expTitle} at {data.expCompany}
        </Text>
        <Text style={styles.text}>
          {data.expStart} - {data.expEnd}
        </Text>
        <Text style={styles.text}>{data.expDescription}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        <Text style={styles.text}>
          {data.eduDegree} from {data.eduSchool}
        </Text>
        <Text style={styles.text}>
          {data.eduStart} - {data.eduEnd}
        </Text>
        <Text style={styles.text}>{data.eduDescription}</Text>
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
        </div>
        <div style={{ margin: "20px 0" }}>
          <button onClick={() => setShowPreview(!showPreview)}>
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
          <PDFDownloadLink
            document={<MyDocument data={formData} />}
            fileName="resume.pdf"
            style={{
              marginLeft: "20px",
              padding: "10px",
              background: "#007bff",
              color: "white",
            }}
          >
            {({ loading }) => (loading ? "Generating..." : "Download PDF")}
          </PDFDownloadLink>
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
