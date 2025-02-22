# NeoHire

An AI Platform For Your Professional Success

By Team The Mavericks - [@Siratul804](https://github.com/Siratul804), [@AsTeriaa09](https://github.com/AsTeriaa09), [@atik65](https://github.com/atik65), [mdyhakash](https://github.com/mdyhakash)

<div align="center">

<br />

  <img src="/public/neo.png" alt="ide" width="500"/>

### 🎯 AI Platform For Your Professional Success

[Report Bug](https://github.com/Siratul804/NeoHire/issues) · [Request Feature](https://github.com/Siratul804/NeoHire/issues)

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![OpenAI](https://img.shields.io/badge/OpenAI-API-412991?style=for-the-badge&logo=openai)](https://openai.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)

</div>

## 🌟 Overview

**NeoHire** leverages AI to streamline recruitment by automating resume screening, offering unbiased candidate evaluations, and predicting career growth. Its features include smart job matching based on skills and preferences, and AI-powered interview analysis that assesses speech and confidence. Additionally, Neohire provides tools like an AI resume and cover letter generator to further simplify the job application process.
## 🚀 Features

### 📍 Dashboard (`/dashboard`)

![alt text](/public/Dashboard.png)


- Profile
- Carrier Insights
- Growth Tools:
  - Build Resume
  - Resume Analyzer
  - Cover Letter
  - Jobs
  - Interview Prep
- Interview scores over time
- Interview taken
- Resume Score
- Average Score

### 📍 Resume Analyzer (`/resume`)

![alt text](/public/ResumeAnaResult.png)


- AI Score
- AI Feedback
- AI Recommended Jobs


### 📍 Resume Builder (`/build-resume`)

![alt text](/public/BuildResume.png)
![alt text](/public/BuildedResume.png)


- Collect Resume Details
- Generate Resume

### 📍 Cover Letter (`/cover-letter`)

![alt text](/public/BuildResume.png)
![alt text](/public/BuildedResume.png)


- Collecting
   - Company Name
   - Job Title
   - Job Description
     
- Generate Cover Letter With AI


### 📍 Trendy Jobs (`/jobs`)

![alt text](/public/Jobs.png)


- Trending jobs
- Filter, Sort, Search based on you need


### 📍 Mock Interview (`/interview`)

![alt text](/public/in4.png)


- Based on selected skill - AI Question
- Voice / Video Uploder


![alt text](/public/in5.png)


- Overall Score
- Speech clarity
- Confidence
- Strengths
- Area For Improvements


### 📍 Career Trends (`/career-insights`)

![alt text](/public/CarrierIns.png)


- Key Industry Trends
- Recommended Skills
- Salary Ranges by Role




## 🚀 Installation Guide

### Prerequisites

- Node.js 18+ and npm 9+
- MongoDB database
- Required API keys:
  - Clerk (Authentication)
  - GROQ (AI)
  - Google Cloud Speech-to-Text (AI)

### 🖥️ Local Development

1. **Clone and Install**

```bash
git clone https://github.com/Siratul804/NeoHire.git
cd NeoHire
npm install
```

2. **Setup Environment**

```env

# database
MONGO_PASS=
MONGO=

# auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# ai models
GROQ_API_KEY=

GOOGLE_APPLICATION_CREDENTIALS=


```

3. **Start Development Server**

```bash
npm run dev
# Open http://localhost:3000
```

### Troubleshooting

- **Environment**: Double-check API keys and MongoDB connection
- **Port Conflict**: Use `npm run dev -- -p 3001` for alternate port

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15.1.7, React 19
- **Styling**: TailwindCSS, Shadcn/ui, Framer Motion
- **Components**: Radix UI
- **State**: React Context

### Backend & Infrastructure

- **Runtime**: Node.js, Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Auth**: Clerk
- **Deployment**: Docker, Vercel
- **Analytics**: Vercel Analytics & Speed Insights

### AI/ML

- **Language Models**: GROQ llama-3.3-70b-versatile
- **Speech**: Google Cloud Text-to-Speech

## 📝 License

MIT License - see [LICENSE](LICENSE)

---

Created by Team The Mavericks for MIST Preliminary Round Hackathon
