import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StateProvider } from "./context/StateContext";
import { siteUrl } from "@/utils/appStore";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Bloggers Blog | A Modern Content Publishing Platform",
    template: "%s | Bloggers Blog",
  },
  icons: {
    icon: "/assets/ic.png"
  },
  description:
    "Bloggers Blog is a modern, feature-rich content publishing platform built with Next.js, TypeScript, Tailwind CSS, and MongoDB. Read, write, and manage high-quality blog content with ease.",
  keywords: [
    "blog platform",
    "blogging website",
    "content publishing",
    "next.js blog",
    "typescript blog",
    "developer blog platform",
    "modern blogging platform",
    "bloggers blog",
  ],
  authors: [{ name: "Abdulazeez Salami" }],
  creator: "Abdulazeez Salami",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Bloggers Blog",
    description:
      "A modern blogging platform built with Next.js, TypeScript, Tailwind CSS, and MongoDB.",
    url: siteUrl,
    siteName: "Bloggers Blog",
    images: [
      {
        url: "/assets/ic.png",
        width: 1200,
        height: 630,
        alt: "Bloggers Blog Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bloggers Blog",
    description:
      "Read and publish modern blog content on a clean, high-performance platform.",
    images: ["/assets/ic.png"],
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StateProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col cursor-default`}
        >
          {children}
        </body>
      </StateProvider>
    </html>
  );
}
