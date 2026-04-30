import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PublicPageShell } from "@/components/tickets/public-page-shell";
import { TicketLookupForm } from "@/components/tickets/ticket-lookup-form";
import { InfoCard } from "@/components/ui/info-card";
import { InfoIcon, MessageIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Consultar chamado",
  description: "Consulte o status do seu chamado usando número e e-mail.",
};

export default function TicketLookupPage() {
  return (
    <PublicPageShell active="lookup">
      <section className="py-12 sm:py-20 bg-surface-hover min-h-[calc(100vh-64px)]">
        <Container>
          <div className="mx-auto mb-10 max-w-4xl text-center animate-slide-up">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
              Acompanhe seu chamado
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Para visualizar o andamento e as respostas da equipe, informe o
              número do ticket e o e-mail utilizado no momento da abertura.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
            <div className="lg:col-span-2 animate-slide-up animate-delay-150">
              <TicketLookupForm />
            </div>
            
            <div className="space-y-6 animate-slide-up animate-delay-300">
              <InfoCard 
                title="Onde encontro o número?"
                icon={<InfoIcon className="h-5 w-5" />}
              >
                <p>
                  O número do chamado (ex: <strong>CF-2026-00001</strong>) foi exibido na tela logo após você abrir a solicitação. 
                </p>
                <p>
                  Se não anotou, verifique se há alguma mensagem da equipe ou entre em contato com o administrador do sistema.
                </p>
              </InfoCard>

              <InfoCard 
                title="Status do chamado"
                icon={<MessageIcon className="h-5 w-5" />}
                variant="brand"
              >
                <div className="flex flex-col gap-1 mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-warning shrink-0"></div>
                    <span className="text-sm font-medium text-foreground">Em aberto</span>
                  </div>
                  <div className="ml-[3px] w-[2px] h-3 bg-border"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
                    <span className="text-sm font-medium text-foreground">Em andamento</span>
                  </div>
                  <div className="ml-[3px] w-[2px] h-3 bg-border"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success shrink-0"></div>
                    <span className="text-sm font-medium text-foreground">Resolvido</span>
                  </div>
                </div>
              </InfoCard>
            </div>
          </div>
        </Container>
      </section>
    </PublicPageShell>
  );
}
