import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PublicHeader } from "@/components/tickets/public-header";
import { Reveal } from "@/components/ui/reveal";
import { FeatureCard } from "@/components/ui/feature-card";
import { TicketPreviewCard } from "@/components/ui/ticket-preview-card";
import { DocumentIcon, MessageIcon, SearchIcon, CheckIcon, InfoIcon, ArrowRightIcon, PlusIcon, LockIcon } from "@/components/ui/icons";

const processSteps = [
  {
    title: "Abra seu chamado",
    description: "Informe o que aconteceu e envie os detalhes principais de forma guiada.",
    icon: <DocumentIcon className="h-8 w-8" />,
  },
  {
    title: "Receba uma resposta",
    description: "A equipe técnica analisa a solicitação e retorna com uma orientação clara.",
    icon: <MessageIcon className="h-8 w-8" />,
  },
  {
    title: "Acompanhe o andamento",
    description: "Consulte o status a qualquer momento usando o número do chamado e seu e-mail.",
    icon: <SearchIcon className="h-8 w-8" />,
  },
  {
    title: "Resolva com clareza",
    description: "Todo o histórico do atendimento fica registrado até a solução final do problema.",
    icon: <CheckIcon className="h-8 w-8" />,
  },
];

const features = [
  {
    title: "Fila organizada",
    description: "Sem e-mails perdidos. Todos os chamados vão para um painel único e centralizado.",
    icon: <DocumentIcon className="h-7 w-7" />
  },
  {
    title: "Respostas registradas",
    description: "A equipe publica orientações no histórico do chamado, mantendo o contexto do atendimento.",
    icon: <MessageIcon className="h-7 w-7" />
  },
  {
    title: "Acesso seguro",
    description: "Apenas pessoas com o número do chamado e o e-mail cadastrado podem ver as informações.",
    icon: <LockIcon className="h-7 w-7" />
  },
  {
    title: "Status sempre consultável",
    description: "Veja se o problema está aberto, em andamento ou se já foi resolvido.",
    icon: <CheckIcon className="h-7 w-7" />
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col theme-transition">
      <PublicHeader active="home" />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative border-b border-border bg-background py-12 sm:py-20 lg:py-32 overflow-hidden">
          {/* Subtle gradient accent background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
          
          <Container className="relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              <div className="text-center lg:text-left animate-fade-in max-w-2xl mx-auto lg:mx-0">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary mb-6">
                  Help Desk Simples para Empresas
                </span>
                <h1 className="text-[2rem] leading-tight font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                  O suporte de TI da sua empresa, <span className="text-primary">sem complicação</span>
                </h1>
                <p className="mt-5 sm:mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed text-balance">
                  Abandone as planilhas e o WhatsApp. O ChamadaFácil centraliza suas solicitações, organiza prioridades e entrega um atendimento muito mais profissional.
                </p>
                
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-slide-up animate-delay-150">
                  <Link
                    href="/tickets/new"
                    className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-primary px-8 text-base font-medium text-primary-foreground hover:bg-primary/90 shadow-sm transition-all hover:scale-[1.02]"
                  >
                    Abrir chamado agora
                    <ArrowRightIcon className="h-5 w-5" />
                  </Link>
                  <Link
                    href="/tickets/lookup"
                    className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-border bg-background px-8 text-base font-medium text-foreground hover:border-primary/30 hover:bg-surface-hover shadow-sm transition-all"
                  >
                    Consultar chamado
                    <SearchIcon className="h-5 w-5" />
                  </Link>
                </div>
              </div>

              {/* Hero Product Visualization */}
              <div className="relative hidden md:block mx-auto w-full max-w-md lg:max-w-none">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-3xl blur-2xl transform -rotate-6 scale-105"></div>
                <div className="relative grid gap-4 p-6 rounded-3xl border border-border/50 bg-surface-hover shadow-2xl backdrop-blur-sm animate-fade-in animate-delay-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Chamados recentes</span>
                    <span className="flex h-2 w-2 rounded-full bg-success animate-pulse"></span>
                  </div>
                  
                  <TicketPreviewCard 
                    title="Impressora do financeiro não está conectando na rede"
                    status="in_progress"
                    priority="high"
                    date="Hoje, 10:23"
                    messages={2}
                  />
                  <TicketPreviewCard 
                    title="Solicitação de novo monitor para estagiário"
                    status="open"
                    priority="medium"
                    date="Ontem, 16:45"
                    delay={150}
                  />
                  <TicketPreviewCard 
                    title="Esqueci a senha do e-mail corporativo"
                    status="resolved"
                    priority="urgent"
                    date="12 Mar, 09:10"
                    messages={4}
                    className="opacity-75"
                    delay={300}
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Features Section */}
        <section className="py-20 sm:py-28 bg-surface-hover border-b border-border">
          <Container>
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Tudo o que você precisa, sem o que não precisa
                </h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  Desenhado especificamente para pequenos negócios que precisam de organização no suporte, mas não querem sistemas complexos.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <Reveal key={feature.title} delay={index * 80} distance={18}>
                  <FeatureCard
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                  />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* Como Funciona Section */}
        <section className="py-20 sm:py-28 bg-background">
          <Container>
            <div className="mx-auto max-w-5xl">
              <Reveal>
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Como funciona na prática
                  </h2>
                  <p className="mt-4 text-muted-foreground">
                    Um processo transparente e direto para resolver problemas da sua equipe.
                  </p>
                </div>
              </Reveal>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {processSteps.map((step, index) => (
                  <Reveal key={step.title} delay={index * 80} distance={20}>
                    <div className="text-center group p-6 rounded-2xl bg-surface-hover border border-border/50 hover:border-border transition-all hover:shadow-sm relative h-full">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-background border border-border/50 text-primary transition-transform group-hover:scale-110 shadow-sm relative z-10">
                        {step.icon}
                      </div>
                      {/* Connecting line for desktop */}
                      {index < processSteps.length - 1 && (
                        <div className="hidden lg:block absolute top-14 left-[60%] w-[80%] h-[2px] bg-border/50 z-0"></div>
                      )}
                      <h3 className="mt-6 text-lg font-semibold">
                        {index + 1}. {step.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={100}>
                <div className="mt-16 flex flex-col gap-6 rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-sm sm:flex-row sm:items-center sm:p-8">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <InfoIcon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-base font-semibold mb-1 text-foreground">Acompanhamento fácil e seguro</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Nenhum login complicado é necessário. Para consultar o andamento do seu chamado, você só precisa do número do ticket gerado no final do processo e do e-mail que utilizou no registro.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 sm:py-28 border-t border-border bg-surface-hover relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <Container className="relative z-10">
            <Reveal distance={30}>
              <div className="mx-auto max-w-3xl text-center bg-background/80 backdrop-blur-xl p-8 sm:p-12 rounded-3xl border border-border shadow-lg">
                <h2 className="text-3xl font-bold tracking-tight">Pronto para organizar seu suporte?</h2>
                <p className="mt-4 text-lg text-muted-foreground mb-8">
                  Registre a solicitação em poucos passos e mantenha o histórico de atendimento acessível para consulta.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/tickets/new"
                    className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-primary px-8 text-base font-medium text-primary-foreground hover:bg-primary/90 shadow-sm transition-all hover:scale-[1.02]"
                  >
                    Abrir meu chamado
                    <PlusIcon className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      </main>

      <footer className="border-t border-border bg-background py-10">
        <Container className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <Link href="/" className="inline-flex items-center gap-2 font-bold text-foreground hover:opacity-80 transition-opacity">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <MessageIcon className="h-4 w-4" />
              </span>
              <span className="text-lg">Chamada<span className="text-primary">Fácil</span></span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">Atendimento simples e organizado para sua empresa.</p>
          </div>
          <nav aria-label="Links do rodapé" className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <Link className="text-muted-foreground hover:text-foreground transition-colors" href="/">
              Início
            </Link>
            <Link className="text-muted-foreground hover:text-foreground transition-colors" href="/tickets/new">
              Abrir chamado
            </Link>
            <Link className="text-muted-foreground hover:text-foreground transition-colors" href="/tickets/lookup">
              Consultar chamado
            </Link>
            <Link className="text-muted-foreground hover:text-foreground transition-colors" href="/admin/login">
              Acesso Admin
            </Link>
          </nav>
        </Container>
      </footer>
    </div>
  );
}
