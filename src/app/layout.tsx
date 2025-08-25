import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppProviders } from "@/providers";
import { Header } from "@/components";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Pokédex - Professional Next.js Setup",
  description: "Explora el mundo Pokémon con TypeScript, TailwindCSS y Radix UI"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <AppProviders>
          <div className="bg-background min-h-screen">
            <Header />
            <main>{children}</main>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
