const FALLBACK_SITE_URL = "https://chamadafacil.vercel.app";

export const SITE_URL = getSiteUrl();

export const SITE_NAME = "ChamadaFácil";
export const SITE_TITLE = "ChamadaFácil - Sistema de Chamados";
export const SITE_DESCRIPTION =
  "Sistema de chamados para pequenas empresas abrirem, acompanharem e responderem solicitações de suporte.";

export const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "ChamadaFácil, sistema de chamados simples para pequenas empresas",
};

export const SEO_KEYWORDS = [
  "sistema de chamados",
  "help desk",
  "suporte de TI",
  "chamados online",
  "atendimento ao cliente",
  "pequenas empresas",
  "gestao de tickets",
  "ChamadaFácil",
];

function getSiteUrl() {
  const value =
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    FALLBACK_SITE_URL;

  const url = value.startsWith("http") ? value : `https://${value}`;

  try {
    const parsed = new URL(url);
    return parsed.origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}
