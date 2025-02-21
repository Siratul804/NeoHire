import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/Theme-Provider";
import { dark } from "@clerk/themes";

import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NeoHire",
  description: "AI-Powered Job Recruitment & Skill Matching Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <ClerkProvider appearance={{ baseTheme: dark }}>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />
            
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
