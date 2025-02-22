# NeoHire

An AI Platform For Your Professional Success

By Team The Mavericks - [@Siratul804](https://github.com/Siratul804), [@AsTeriaa09](https://github.com/AsTeriaa09), [@atik65](https://github.com/atik65), [mdyhakash](https://github.com/mdyhakash)

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![OpenAI](https://img.shields.io/badge/OpenAI-API-412991?style=for-the-badge&logo=openai)](https://openai.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)

<br />

  <img src="/public/neo.png" alt="ide" width="500"/>

### 🎯 AI Platform For Your Professional Success

[Report Bug](https://github.com/Siratul804/NeoHire/issues) · [Request Feature](https://github.com/Siratul804/NeoHire/issues)

![GitHub contributors](https://img.shields.io/github/contributors/Siratul804/NeoHire)
![GitHub stars](https://img.shields.io/github/stars/Siratul804/NeoHire)
![GitHub forks](https://img.shields.io/github/forks/Siratul804/NeoHire)
![GitHub issues](https://img.shields.io/github/issues/Siratul804/NeoHire)
![GitHub license](https://img.shields.io/github/license/Siratul804/NeoHire)

</div>

## 🌟 Overview

**NeoHire** is your AI platform for
professional success
advance your career with personalized Resume screening, interview prep, and AI-powered tools for job success.

## 🚀 Key Features

### 📍 Dashboard (`/dashboard`)

![alt text](public/screenshots/image.png)

- Analytics dashboard with real-time metrics
- Key statistics:
  - Words translated
  - Stories written
  - Active users
  - Contributions made
- Interactive charts:
  - Daily activity trends
  - Translation metrics
  - User engagement data
- Responsive layout with grid system

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

- **Language Models**: GROK llama-3.3-70b-versatile
- **Speech**: Google Cloud Text-to-Speech

## 📝 License

MIT License - see [LICENSE](LICENSE)

---

Created by Team The Mavericks for MIST Preliminary Round Hackathon
