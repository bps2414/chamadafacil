import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PublicPageShell } from "@/components/tickets/public-page-shell";
import { TicketForm } from "@/components/tickets/ticket-form";
import { InfoCard } from "@/components/ui/info-card";
import { InfoIcon, CheckIcon, SearchIcon } from "@/components/ui/icons";
import { OG_IMAGE, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Abrir chamado",
  alternates: {
    canonical: `${SITE_URL}/tickets/new`,
  },
  openGraph: {
    title: "Abrir chamado | ChamadaFácil",
    description: "Abra uma solicitação de suporte no ChamadaFácil sem criar conta.",
    url: `${SITE_URL}/tickets/new`,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abrir chamado | ChamadaFácil",
    description: "Abra uma solicitação de suporte no ChamadaFácil sem criar conta.",
    images: [OG_IMAGE.url],
  },
  description: "Abra uma solicitação de suporte sem criar conta.",
};

export default function NewTicketPage() {
  return (
    <PublicPageShell active="new">
      <section className="py-12 sm:py-20 bg-surface-hover min-h-[calc(100vh-64px)]">
        <Container>
          <div className="mx-auto mb-10 max-w-4xl text-center animate-slide-up">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
              Como podemos ajudar?
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Preencha os dados abaixo com o máximo de detalhes para que nossa equipe possa resolver o seu problema rapidamente.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
            <div className="lg:col-span-2 animate-slide-up animate-delay-150">
              <TicketForm />
            </div>
            
            <div className="space-y-6 animate-slide-up animate-delay-300">
              <InfoCard 
                title="Dicas para agilizar"
                icon={<InfoIcon className="h-5 w-5" />}
                variant="brand"
              >
                <ul className="space-y-2 mt-2">
                  <li className="flex gap-2 items-start">
                    <CheckIcon className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                    <span>Seja claro no título do problema.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <CheckIcon className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                    <span>Descreva o passo a passo de como o erro aconteceu.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <CheckIcon className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                    <span>Se possível, informe qual sistema ou equipamento apresenta defeito.</span>
                  </li>
                </ul>
              </InfoCard>

              <InfoCard 
                title="O que acontece depois?"
                icon={<SearchIcon className="h-5 w-5" />}
              >
                <p>
                  Assim que você abrir o chamado, receberá um número de ticket. Guarde este número!
                </p>
                <p>
                  Sua solicitação entrará na fila da nossa equipe técnica e será analisada conforme o nível de urgência. Você poderá consultar o status a qualquer momento na página de consulta.
                </p>
              </InfoCard>
            </div>
          </div>
        </Container>
      </section>
    </PublicPageShell>
  );
}
