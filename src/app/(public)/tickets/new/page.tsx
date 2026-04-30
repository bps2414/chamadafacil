import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PublicPageShell } from "@/components/tickets/public-page-shell";
import { TicketForm } from "@/components/tickets/ticket-form";

export const metadata: Metadata = {
  title: "Abrir chamado | ChamadaFácil",
  description: "Abra uma solicitação de suporte sem criar conta.",
};

export default function NewTicketPage() {
  return (
    <PublicPageShell active="new">
      <section className="py-12 sm:py-20 lg:py-24 bg-surface-hover min-h-[calc(100vh-64px)]">
        <Container>
          <div className="mx-auto mb-10 max-w-3xl text-center animate-slide-up">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
              Abrir novo chamado
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Preencha os dados abaixo para que nossa equipe possa ajudar você o mais rápido possível.
            </p>
          </div>

          <div className="animate-slide-up animate-delay-150">
            <TicketForm />
          </div>
        </Container>
      </section>
    </PublicPageShell>
  );
}
