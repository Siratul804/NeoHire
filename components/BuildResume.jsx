"use client"

import { useState } from "react"
import { PDFViewer, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Sparkles, FileText, FormInput } from "lucide-react"
import Link from "next/link"

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
})

const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>{data.name}</Text>
        <View style={styles.contactInfo}>
          <Text style={styles.text}>Email: {data.email}</Text>
          <Text style={styles.text}>Phone: {data.phone}</Text>
        </View>
        <View style={styles.contactInfo}>
          <Text style={styles.text}>LinkedIn: {data.linkedin}</Text>
          <Text style={styles.text}>GitHub: {data.github}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>About Me</Text>
        <Text style={styles.text}>{data.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Skills</Text>
        <Text style={styles.text}>{data.skills}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Experience</Text>
        <Text style={styles.boldText}>
          {data.expTitle} at {data.expCompany}
        </Text>
        <Text style={styles.text}>
          {data.expStart} - {data.expEnd}
        </Text>
        <Text style={styles.text}>{data.expDescription}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Education</Text>
        <Text style={styles.boldText}>
          {data.eduDegree} - {data.eduSchool}
        </Text>
        <Text style={styles.text}>
          {data.eduStart} - {data.eduEnd}
        </Text>
        <Text style={styles.text}>{data.eduDescription}</Text>
      </View>
    </Page>
  </Document>
)

export default function BuildResume() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
  })

  const [showForm, setShowForm] = useState(true)

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
      <p className="text-muted-foreground mb-4">Get your own AI generated Resume</p>

      <div className="flex gap-4 mb-6">
        <Button
          onClick={() => setShowForm(true)}
          variant={showForm ? "default" : "outline"}
          className={`flex-1 ${showForm ? "bg:gradient-title" : ""}`}
        >
          <FormInput className="w-4 h-4 mr-2" />
          Resume Form
        </Button>
        <Button
          onClick={() => setShowForm(false)}
          variant={!showForm ? "default" : "outline"}
          className={`flex-1 ${!showForm ? "bg:gradient-title" : ""}`}
        >
          <FileText className="w-4 h-4 mr-2" />
          View Resume
        </Button>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            {showForm ? "Resume Details" : "Resume Preview"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {showForm ? (
            <form className="space-y-4 overflow-y-auto pr-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="linkedin.com/in/johndoe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="github.com/johndoe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Professional Summary</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write a brief summary of your professional background..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Skills</Label>
                <Textarea
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="List your key skills..."
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Experience</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expTitle">Job Title</Label>
                    <Input
                      id="expTitle"
                      name="expTitle"
                      value={formData.expTitle}
                      onChange={handleChange}
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expCompany">Company</Label>
                    <Input
                      id="expCompany"
                      name="expCompany"
                      value={formData.expCompany}
                      onChange={handleChange}
                      placeholder="Tech Company Inc."
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expStart">Start Date</Label>
                    <Input
                      id="expStart"
                      name="expStart"
                      value={formData.expStart}
                      onChange={handleChange}
                      placeholder="Jan 2020"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expEnd">End Date</Label>
                    <Input
                      id="expEnd"
                      name="expEnd"
                      value={formData.expEnd}
                      onChange={handleChange}
                      placeholder="Present"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expDescription">Description</Label>
                  <Textarea
                    id="expDescription"
                    name="expDescription"
                    value={formData.expDescription}
                    onChange={handleChange}
                    placeholder="Describe your responsibilities and achievements..."
                    rows={4}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Education</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="eduDegree">Degree</Label>
                    <Input
                      id="eduDegree"
                      name="eduDegree"
                      value={formData.eduDegree}
                      onChange={handleChange}
                      placeholder="Bachelor of Science"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eduSchool">School</Label>
                    <Input
                      id="eduSchool"
                      name="eduSchool"
                      value={formData.eduSchool}
                      onChange={handleChange}
                      placeholder="University Name"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="eduStart">Start Date</Label>
                    <Input
                      id="eduStart"
                      name="eduStart"
                      value={formData.eduStart}
                      onChange={handleChange}
                      placeholder="Sep 2016"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eduEnd">End Date</Label>
                    <Input
                      id="eduEnd"
                      name="eduEnd"
                      value={formData.eduEnd}
                      onChange={handleChange}
                      placeholder="Jun 2020"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eduDescription">Description</Label>
                  <Textarea
                    id="eduDescription"
                    name="eduDescription"
                    value={formData.eduDescription}
                    onChange={handleChange}
                    placeholder="Describe your academic achievements..."
                    rows={4}
                  />
                </div>
              </div>

              <Button
                type="button"
                onClick={() => setShowForm(false)}
                className="w-full bg:gradient-title"
              >
                Generate Preview
              </Button>
            </form>
          ) : (
            <div className="h-[100vh]">
              <PDFViewer className="w-full h-full">
                <MyDocument data={formData} />
              </PDFViewer>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}

