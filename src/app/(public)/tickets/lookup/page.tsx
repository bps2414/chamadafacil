import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PublicPageShell } from "@/components/tickets/public-page-shell";
import { TicketLookupForm } from "@/components/tickets/ticket-lookup-form";

export const metadata: Metadata = {
  title: "Consultar chamado | ChamadaFácil",
  description: "Consulte o status do seu chamado usando número e e-mail.",
};

export default function TicketLookupPage() {
  return (
    <PublicPageShell active="lookup">
      <section className="py-12 sm:py-20 lg:py-24 bg-surface-hover min-h-[calc(100vh-64px)]">
        <Container>
          <div className="mx-auto mb-10 max-w-4xl text-center animate-slide-up">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
              Consultar status do chamado
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Para visualizar o andamento e as respostas da equipe, informe o
              número do ticket e o e-mail utilizado no momento do registro.
            </p>
          </div>

          <div className="animate-slide-up animate-delay-150">
            <TicketLookupForm />
          </div>
        </Container>
      </section>
    </PublicPageShell>
  );
}
