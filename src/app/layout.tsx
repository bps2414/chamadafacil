import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "ChamadaFácil - Sistema de Chamados",
    template: "%s | ChamadaFácil",
  },
  description:
    "Sistema de chamados para pequenas empresas abrirem, acompanharem e responderem solicitações de suporte.",
  applicationName: "ChamadaFácil",
  openGraph: {
    description:
      "Help desk simples para pequenas empresas brasileiras, com abertura pública de chamados e painel administrativo protegido.",
    locale: "pt_BR",
    siteName: "ChamadaFácil",
    title: "ChamadaFácil - Sistema de Chamados",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b63f6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
