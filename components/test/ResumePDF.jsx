"use client";
import React, { useState } from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

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

// PDF Resume Component
const ResumePDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Contact Information */}
      <View style={styles.section}>
        <Text style={styles.header}>{data.contactInfo.name}</Text>
        <View style={styles.contactInfo}>
          <Text style={styles.text}>Email: {data.contactInfo.email}</Text>
          <Text style={styles.text}>Phone: {data.contactInfo.phone}</Text>
          <Text style={styles.text}>Address: {data.contactInfo.address}</Text>
        </View>
        <View style={styles.contactInfo}>
          <Text style={styles.text}>LinkedIn: {data.contactInfo.linkedin}</Text>
          <Text style={styles.text}>GitHub: {data.contactInfo.github}</Text>
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
        {data.experience.map((exp, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text style={styles.boldText}>
              {exp.title} at {exp.companyOrInstitution}
            </Text>
            <Text style={styles.text}>
              {exp.location} | {exp.startDate} - {exp.endDate}
            </Text>
            <Text style={styles.text}>{exp.description}</Text>
          </View>
        ))}
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Education</Text>
        {data.education.map((edu, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text style={styles.boldText}>
              {edu.title} at {edu.companyOrInstitution}
            </Text>
            <Text style={styles.text}>
              {edu.location} | {edu.startDate} - {edu.endDate}
            </Text>
            <Text style={styles.text}>{edu.description}</Text>
          </View>
        ))}
      </View>

      {/* Projects */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Projects</Text>
        {data.projects.map((proj, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text style={styles.boldText}>
              {proj.title} at {proj.companyOrInstitution}
            </Text>
            <Text style={styles.text}>
              {proj.location} | {proj.startDate} - {proj.endDate}
            </Text>
            <Text style={styles.text}>{proj.description}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default ResumePDF;
