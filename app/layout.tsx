import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmokeBackground from "./components/SmokeBackground";
import Navigation from "./components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio | Creative Developer",
  description: "Scrollytelling portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SmokeBackground />
        {children}
        <Navigation />
      </body>
    </html>
  );
}
