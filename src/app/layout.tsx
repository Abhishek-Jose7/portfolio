import type { Metadata, Viewport } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Abhishek Jose - Full Stack Developer | AI & Web Solutions",
  description: "Interactive portfolio of Abhishek Jose - Full Stack Developer specializing in React, Next.js, Node.js, and AI/ML solutions. Explore projects, skills, and experience.",
  keywords: ["Full Stack Developer", "React", "Next.js", "Node.js", "AI", "Machine Learning", "Web Development", "Portfolio"],
  authors: [{ name: "Abhishek Jose" }],
  openGraph: {
    title: "Abhishek Jose - Full Stack Developer",
    description: "Interactive AI-powered portfolio showcasing full-stack development projects and expertise",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}