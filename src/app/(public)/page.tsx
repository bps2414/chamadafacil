import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { PublicHeader } from "@/components/tickets/public-header";
import { DocumentIcon, MessageIcon, SearchIcon, CheckIcon, InfoIcon, ArrowRightIcon, PlusIcon } from "@/components/ui/icons";

const processSteps = [
  {
    title: "Abra seu chamado",
    description: "Informe o que aconteceu e envie os detalhes principais.",
    icon: DocumentIcon,
  },
  {
    title: "Receba uma resposta",
    description: "A equipe analisa a solicitação e retorna com uma orientação.",
    icon: MessageIcon,
  },
  {
    title: "Acompanhe o andamento",
    description: "Consulte o status usando o número do chamado e seu e-mail.",
    icon: SearchIcon,
  },
  {
    title: "Resolva com clareza",
    description: "O atendimento fica registrado até a solução final.",
    icon: CheckIcon,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <PublicHeader active="home" />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative border-b border-border bg-background py-20 sm:py-28 lg:py-32 overflow-hidden">
          {/* Subtle gradient accent background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
          
          <Container className="relative z-10">
            <div className="mx-auto max-w-3xl text-center animate-fade-in">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary mb-6">
                Atendimento simples e eficiente
              </span>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                O jeito mais fácil de pedir <span className="text-primary">suporte em TI</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
                Abra um chamado ou consulte o andamento da sua solicitação em um
                único lugar, sem complicação. Acompanhe tudo de forma clara e rápida.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2 animate-slide-up animate-delay-150">
              <ActionCard
                href="/tickets/new"
                title="Abrir chamado"
                description="Precisa de ajuda agora? Descreva seu problema e abra uma nova solicitação."
                icon={<PlusIcon className="h-8 w-8" />}
                variant="primary"
              />
              <ActionCard
                href="/tickets/lookup"
                title="Consultar chamado"
                description="Já abriu um chamado? Acompanhe o andamento ou responda a equipe."
                icon={<SearchIcon className="h-8 w-8" />}
                variant="secondary"
              />
            </div>
          </Container>
        </section>

        {/* Como Funciona Section */}
        <section className="py-20 sm:py-28 bg-surface-hover">
          <Container>
            <div className="mx-auto max-w-5xl">
              <div className="text-center mb-16 animate-slide-up">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Como funciona
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Um processo transparente e direto para resolver seu problema.
                </p>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {processSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div 
                      className="text-center group p-6 rounded-2xl bg-background border border-border/50 hover:border-border transition-all hover:shadow-sm animate-slide-up" 
                      style={{ animationDelay: `${(index + 1) * 100}ms` }}
                      key={step.title}
                    >
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                        <Icon className="h-8 w-8" />
                      </div>
                      <h3 className="mt-6 text-lg font-semibold">
                        {index + 1}. {step.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-16 flex flex-col gap-6 rounded-2xl border border-border bg-background p-6 shadow-sm sm:flex-row sm:items-center sm:p-8 animate-slide-up animate-delay-300">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <InfoIcon className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-base font-semibold mb-1">Dica de acompanhamento</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Para consultar o andamento do seu chamado, você precisará do número do 
                    ticket (recebido ao abrir) e do e-mail que utilizou no registro.
                  </p>
                </div>
                <Link
                  className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-secondary px-5 text-sm font-semibold text-secondary-foreground hover:bg-secondary/80 transition-colors"
                  href="/tickets/lookup"
                >
                  Consultar agora
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 sm:py-28 border-t border-border">
          <Container>
            <div className="mx-auto max-w-3xl text-center animate-slide-up">
              <h2 className="text-3xl font-bold tracking-tight">Pronto para resolver seu problema?</h2>
              <p className="mt-4 text-lg text-muted-foreground mb-8">
                Nossa equipe está preparada para te ajudar. Abra um chamado agora mesmo e receba o suporte necessário.
              </p>
              <Link
                href="/tickets/new"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-8 text-base font-medium text-primary-foreground hover:bg-primary/90 shadow-sm transition-all hover:scale-[1.02]"
              >
                Abrir meu chamado
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </div>
          </Container>
        </section>
      </main>

      <footer className="border-t border-border bg-background py-8">
        <Container className="flex flex-col gap-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-foreground flex items-center gap-2">
              <MessageIcon className="h-4 w-4 text-primary" />
              ChamadaFácil
            </p>
            <p className="mt-1">Atendimento simples e organizado para sua empresa.</p>
          </div>
          <nav aria-label="Links do rodapé" className="flex flex-wrap gap-4 font-medium">
            <Link className="hover:text-foreground transition-colors" href="/">
              Início
            </Link>
            <Link className="hover:text-foreground transition-colors" href="/tickets/new">
              Abrir chamado
            </Link>
            <Link className="hover:text-foreground transition-colors" href="/tickets/lookup">
              Consultar chamado
            </Link>
          </nav>
        </Container>
      </footer>
    </div>
  );
}

type ActionCardProps = {
  description: string;
  href: string;
  icon: ReactNode;
  title: string;
  variant: "primary" | "secondary";
};

function ActionCard({
  description,
  href,
  icon,
  title,
  variant,
}: ActionCardProps) {
  const isPrimary = variant === "primary";

  return (
    <Link
      href={href}
      className={`group flex flex-col sm:flex-row items-start sm:items-center gap-5 rounded-2xl border p-6 sm:p-8 text-left transition-all duration-300 hover:-translate-y-1 ${
        isPrimary
          ? "border-primary bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg shadow-primary/20"
          : "border-border bg-background text-foreground hover:border-primary/30 hover:shadow-md"
      }`}
    >
      <span
        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
          isPrimary
            ? "bg-primary-foreground/20 text-primary-foreground group-hover:bg-primary-foreground group-hover:text-primary"
            : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
        }`}
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xl font-bold tracking-tight">
          {title}
        </span>
        <span
          className={`mt-2 block text-sm leading-relaxed ${
            isPrimary ? "text-primary-foreground/90" : "text-muted-foreground"
          }`}
        >
          {description}
        </span>
      </span>
      <span
        className={`hidden sm:flex shrink-0 transition-transform duration-300 group-hover:translate-x-2 ${
          isPrimary ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary"
        }`}
        aria-hidden="true"
      >
        <ArrowRightIcon className="h-6 w-6" />
      </span>
    </Link>
  );
}
