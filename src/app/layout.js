import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import NextAuthProvider from "@/provider/NextAuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Rentora | Property Rental Platform",
    template: "%s | Rentora",
  },
  description:
    "Find, rent, and manage properties easily with Rentora — a modern property rental and management platform.",
};
  

export default function RootLayout({ children }) {
  return (
    <NextAuthProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >

        <body className="min-h-full flex flex-col">{children}</body>
      </html>
    </NextAuthProvider>

  );
}
