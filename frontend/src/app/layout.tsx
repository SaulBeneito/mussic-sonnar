import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Mussic Sonnar", template: "%s · Mussic Sonnar" },
  description: "Find your next favorite sound",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Suspense fallback={<div className="h-16 border-b border-line" />}>
          <SiteHeader />
        </Suspense>
        <div className="flex flex-1 flex-col pb-20 md:pb-0">{children}</div>
        <footer className="hidden border-t border-line py-6 text-center text-xs text-muted md:block">
          Mussic Sonnar · prototipo visual (Fase 1) · los datos marcados como <span className="text-accent-soft">DEMO</span> son de prueba
        </footer>
      </body>
    </html>
  );
}
