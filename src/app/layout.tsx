import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ChamadaFácil - Sistema de Chamados",
  description: "Abra e acompanhe seus chamados de suporte de forma simples e rápida.",
};

export const viewport: Viewport = {
  themeColor: "#0b63f6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Previne zoom indesejado em inputs no iOS
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
