import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SEO } from "@/lib/data";

const windowsRegular = localFont({
  src: "./fonts/WindowsRegular.ttf",
});

export const metadata: Metadata = {
  title: SEO.title,
  description: SEO.description,
  keywords: SEO.keywords,
  authors: [{ name: SEO.author }],
  alternates: {
    canonical: SEO.url,
  },
  openGraph: {
    title: SEO.title,
    description: SEO.description,
    url: SEO.url,
    siteName: SEO.title,
    images: [
      {
        url: SEO.ogImage,
        width: 1200,
        height: 630,
        alt: SEO.title,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
    images: [SEO.ogImage],
    creator: "@msopiannn",
  },
  metadataBase: new URL(SEO.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${windowsRegular.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
