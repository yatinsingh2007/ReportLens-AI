import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/context/ThemeContext";
import { ChatRoomProvider } from "@/context/ChatRoomContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});


export const metadata: Metadata = {
  title: "ReportLens AI - AI-Powered Lab Report Analysis",
  description: "Transform your lab reports into actionable insights with AI-powered analysis. Upload clinical test reports and get instant summaries with historical comparison.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <ChatRoomProvider>
            {children}
          <Toaster position="top-right" reverseOrder={false} />
          </ChatRoomProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

