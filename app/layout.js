import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import {Inter} from "next/font/google"

const inter = Inter({subsets:["latin"]});

export const metadata = {
  title: "NeoHire",
  description: "AI-Powered Job Recruitment & Skill Matching Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
