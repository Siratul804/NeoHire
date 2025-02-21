import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Styles for the PDF
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
    borderBottomWidth: 1, // Fix border issue
    borderBottomColor: "#000",
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

// PDF Resume Component
const ResumePDF = ({ data }) => {
  if (!data) return null; // Handle undefined data gracefully

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.header}>{data?.contactInfo?.name || "N/A"}</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.text}>
              Email: {data?.contactInfo?.email || "N/A"}
            </Text>
            <Text style={styles.text}>
              Phone: {data?.contactInfo?.phone || "N/A"}
            </Text>
            <Text style={styles.text}>
              Address: {data?.contactInfo?.address || "N/A"}
            </Text>
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.text}>
              LinkedIn: {data?.contactInfo?.linkedin || "N/A"}
            </Text>
            <Text style={styles.text}>
              GitHub: {data?.contactInfo?.github || "N/A"}
            </Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>About Me</Text>
          <Text style={styles.text}>{data?.description || "N/A"}</Text>
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>Skills</Text>
          <Text style={styles.text}>{data?.skills || "N/A"}</Text>
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>Experience</Text>
          {data?.experience?.length > 0 ? (
            data.experience.map((exp, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.boldText}>
                  {exp.title} at {exp.companyOrInstitution}
                </Text>
                <Text style={styles.text}>
                  {exp.location} | {exp.startDate} - {exp.endDate}
                </Text>
                <Text style={styles.text}>{exp.description}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.text}>No experience available</Text>
          )}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>Education</Text>
          {data?.education?.length > 0 ? (
            data.education.map((edu, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.boldText}>
                  {edu.title} at {edu.companyOrInstitution}
                </Text>
                <Text style={styles.text}>
                  {edu.location} | {edu.startDate} - {edu.endDate}
                </Text>
                <Text style={styles.text}>{edu.description}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.text}>No education details available</Text>
          )}
        </View>

        {/* Projects */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>Projects</Text>
          {data?.projects?.length > 0 ? (
            data.projects.map((proj, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.boldText}>
                  {proj.title} at {proj.companyOrInstitution}
                </Text>
                <Text style={styles.text}>
                  {proj.location} | {proj.startDate} - {proj.endDate}
                </Text>
                <Text style={styles.text}>{proj.description}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.text}>No projects available</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDF;
