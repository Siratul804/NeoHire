import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NeoHire",
  description: "AI-Powered Job Recruitment & Skill Matching Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ClerkProvider>
        <Navbar/>
        <main className="min-h-screen">{children}</main>
        </ClerkProvider>
      </body>
    </html>
  );
}
