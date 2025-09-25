import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ColorCraft - Professional Color Palette Testing Tool",
  description:
    "Test, create, and visualize color palettes for your design projects. Professional color palette testing and visualization tool with live preview and dark mode support.",
  keywords: [
    "color palette",
    "design tool",
    "color testing",
    "theme generator",
    "UI colors",
    "design system",
  ],
  authors: [{ name: "Your Name" }],
  creator: "ColorCraft",
  openGraph: {
    title: "ColorCraft - Professional Color Palette Testing Tool",
    description:
      "Test, create, and visualize color palettes for your design projects",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ColorCraft - Professional Color Palette Testing Tool",
    description:
      "Test, create, and visualize color palettes for your design projects",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#3B82F6" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-gray-50 text-gray-900`}
        suppressHydrationWarning={true}
      >
        <div id="root" className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
