import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppFrame } from "@/components/page-shell";
import { pageIntros, siteUrl } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Notes of my road",
    template: "%s | Notes of my road",
  },
  description: pageIntros.home.description,
  applicationName: "Notes of my road",
  authors: [{ name: "Reza Mahdavi" }],
  creator: "Reza Mahdavi",
  keywords: [
    "Notes of my road",
    "Reza Mahdavi",
    "engineering notes",
    "technology learning",
    "Linux",
    "DevOps",
    "open source",
    "Persian technology blog",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    alternateLocale: ["en_US"],
    url: "/",
    siteName: "Notes of my road",
    title: "Notes of my road",
    description: pageIntros.home.description,
    images: [
      {
        url: "/header.jpg",
        width: 2560,
        height: 1023,
        alt: "Notes of my road header",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Notes of my road",
    description: pageIntros.home.description,
    images: ["/header.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070707",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <AppFrame>{children}</AppFrame>
      </body>
    </html>
  );
}
