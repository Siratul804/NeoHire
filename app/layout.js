import "./globals.css";

export const metadata = {
  title: "NeoHire",
  description: "AI-Powered Job Recruitment & Skill Matching Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
