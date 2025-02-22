"use client"

import { useState } from "react"
import { PDFViewer, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Sparkles } from "lucide-react"
import Link from "next/link"

// Define styles for the PDF document (unchanged)
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
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
})

// MyDocument component (unchanged)
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
)

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
  })

  // Initially, the preview is not shown.
  const [showPreview, setShowPreview] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <main className="container space-y-6 px-12 pt-20 md:pt-28 pb-10">
      <div className="mb-8">
        <Link href="/dashboard" className="text-sm text-gray-200">
          ← Back to Dashboard
        </Link>
      </div>
      <h1 className="text-4xl font-bold gradient-title">Build Resume</h1>
      <p className="text-muted-foreground mb-4">
        Get your own AI generated Resume
      </p>
      <div className="flex gap-4">
        {/* Left: Resume Form */}
        <Card className="max-h-[calc(100vh-6rem)] overflow-y-auto w-[45%]">
          <CardContent className="pt-6 overflow-y-auto pr-4">
            <form className="space-y-4">
              {/* Name & Email */}
              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="John Doe" onChange={handleChange} />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="john@example.com" onChange={handleChange} />
                </div>
              </div>

              {/* Phone & Address */}
              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" placeholder="+1 (555) 123-4567" onChange={handleChange} />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" placeholder="123 Main St, City, Country" onChange={handleChange} />
                </div>
              </div>

              {/* LinkedIn & GitHub */}
              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input id="linkedin" name="linkedin" placeholder="https://linkedin.com/in/johndoe" onChange={handleChange} />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="github">GitHub URL</Label>
                  <Input id="github" name="github" placeholder="https://github.com/johndoe" onChange={handleChange} />
                </div>
              </div>

              {/* Professional Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Professional Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="A brief summary of your professional background and goals"
                  onChange={handleChange}
                />
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <Label htmlFor="skills">Skills</Label>
                <Textarea
                  id="skills"
                  name="skills"
                  placeholder="JavaScript, React, Node.js, etc."
                  onChange={handleChange}
                />
              </div>

              {/* Job Title & Company */}
              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="expTitle">Job Title</Label>
                  <Input id="expTitle" name="expTitle" placeholder="Software Engineer" onChange={handleChange} />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="expCompany">Company</Label>
                  <Input id="expCompany" name="expCompany" placeholder="Tech Corp" onChange={handleChange} />
                </div>
              </div>

              {/* Experience Start & End Dates */}
              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="expStart">Start Date</Label>
                  <Input id="expStart" name="expStart" placeholder="Jan 2020" onChange={handleChange} />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="expEnd">End Date</Label>
                  <Input id="expEnd" name="expEnd" placeholder="Present" onChange={handleChange} />
                </div>
              </div>

              {/* Job Description */}
              <div className="space-y-2">
                <Label htmlFor="expDescription">Job Description</Label>
                <Textarea
                  id="expDescription"
                  name="expDescription"
                  placeholder="Describe your responsibilities and achievements"
                  onChange={handleChange}
                />
              </div>

              {/* School & Degree */}
              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="eduSchool">School</Label>
                  <Input id="eduSchool" name="eduSchool" placeholder="University of Technology" onChange={handleChange} />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="eduDegree">Degree</Label>
                  <Input
                    id="eduDegree"
                    name="eduDegree"
                    placeholder="Bachelor of Science in Computer Science"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Education Start & End Dates */}
              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="eduStart">Start Date</Label>
                  <Input id="eduStart" name="eduStart" placeholder="Sep 2016" onChange={handleChange} />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="eduEnd">End Date</Label>
                  <Input id="eduEnd" name="eduEnd" placeholder="Jun 2020" onChange={handleChange} />
                </div>
              </div>

              {/* Education Details */}
              <div className="space-y-2">
                <Label htmlFor="eduDescription">Education Details</Label>
                <Textarea
                  id="eduDescription"
                  name="eduDescription"
                  placeholder="Describe your major, achievements, and relevant coursework"
                  onChange={handleChange}
                />
              </div>

              {/* Project Title */}
              <div className="space-y-2">
                <Label htmlFor="projectTitle">Project Title</Label>
                <Input
                  id="projectTitle"
                  name="projectTitle"
                  placeholder="E-commerce Platform"
                  onChange={handleChange}
                />
              </div>

              {/* Project Description */}
              <div className="space-y-2">
                <Label htmlFor="projectDescription">Project Description</Label>
                <Textarea
                  id="projectDescription"
                  name="projectDescription"
                  placeholder="Describe the project, technologies used, and your role"
                  onChange={handleChange}
                />
              </div>

              {/* Generate Button inside the form */}
              <div className="flex justify-center mt-4">
                <Button type="button" onClick={() => setShowPreview(true)} className="w-full">
                  Generate
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Right: Preview Panel */}
        <Card className=" w-[60%]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              Resume Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            {showPreview ? (
              <PDFViewer className="w-full h-[calc(100vh-12rem)]">
                <MyDocument data={formData} />
              </PDFViewer>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                Submit the form to get your own resume
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
