import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Admin Hub | modern SaaS Dashboard",
  description: "Manage your applications with ease",
};

import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-white text-slate-900 dark:text-slate-50 transition-colors duration-300`}>
        <ReduxProvider>
          <ThemeProvider>
            <LenisProvider>
              <Toaster position="top-right" richColors />
              <div className="flex min-h-screen flex-col">
                {children}
              </div>
            </LenisProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
