import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 - Serviced apartments for Rent in Candolim, Goa, India - Airbnb",
  description: "Entire serviced apartment in Candolim, India. Experience luxury with a private heated indoor jacuzzi, swimming pool access, king bedroom, and 150 Mbps Wi-Fi.",
  openGraph: {
    title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 - Airbnb",
    description: "4 guests · 1 bedroom · 2 beds · 1 bath · Private Jacuzzi · Pool · Fast Wi-Fi",
    images: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} font-sans h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900">{children}</body>
    </html>
  );
}
