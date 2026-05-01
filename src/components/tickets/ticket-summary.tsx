import Link from "next/link";
import type { PublicTicket, TicketStatus } from "@/lib/data/tickets";
import { TicketTimeline } from "@/components/tickets/ticket-timeline";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/formatters/date";
import { CheckIcon, ArrowRightIcon, MessageIcon } from "@/components/ui/icons";

type TicketSummaryProps = {
  ticket: PublicTicket;
};

const statusContent: Record<
  TicketStatus,
  { badge: string; description: string; nextStep: string; variant: "warning" | "primary" | "success" }
> = {
  open: {
    badge: "Em aberto",
    description: "Sua solicitação foi recebida e ainda aguarda a primeira análise da equipe.",
    nextStep: "Volte mais tarde usando este código e o mesmo e-mail para ver novas respostas.",
    variant: "warning",
  },
  in_progress: {
    badge: "Em andamento",
    description: "A equipe já iniciou a análise e pode publicar novas respostas por aqui.",
    nextStep: "Acompanhe esta página com o código do chamado e o e-mail cadastrado.",
    variant: "primary",
  },
  resolved: {
    badge: "Resolvido",
    description: "A equipe marcou este chamado como resolvido.",
    nextStep: "Se precisar tratar outro assunto, abra um novo chamado.",
    variant: "success",
  },
};

export function TicketSummary({ ticket }: TicketSummaryProps) {
  const status = statusContent[ticket.status];
  const latestResponse = ticket.responses.at(-1);

  return (
    <section className="rounded-2xl border border-border bg-background p-5 shadow-sm sm:p-8">
      <div className="flex flex-col gap-5 border-b border-border pb-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <span
              aria-hidden="true"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/50 text-accent-foreground"
            >
              <CheckIcon className="h-5 w-5" />
            </span>
            <h2 className="break-all text-2xl font-bold tracking-tight text-foreground">
              Chamado {ticket.ticket_number}
            </h2>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Aberto em{" "}
            <strong className="font-medium text-foreground">
              {formatDateTime(ticket.created_at)}
            </strong>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 lg:flex-col lg:items-end">
          <Badge variant={status.variant} showDot>
            {status.badge}
          </Badge>
          <Badge variant={ticket.is_urgent ? "destructive" : "default"} showDot>
            {ticket.is_urgent ? "Urgente" : "Normal"}
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 border-b border-border py-6 md:grid-cols-2">
        <InfoPanel title="Status atual" text={status.description} />
        <InfoPanel
          title="Urgência"
          text={
            ticket.is_urgent
              ? "Este chamado exige atenção mais rápida da equipe."
              : "Este chamado está na prioridade padrão de atendimento."
          }
        />
      </div>

      {latestResponse ? (
        <div className="border-b border-border py-6">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <MessageIcon className="h-4 w-4 text-primary" />
                Última resposta da equipe
              </p>
              <time
                className="text-xs font-medium text-muted-foreground"
                dateTime={latestResponse.created_at}
              >
                {formatDateTime(latestResponse.created_at)}
              </time>
            </div>
            <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-foreground">
              {latestResponse.body}
            </p>
          </div>
        </div>
      ) : null}

      <div className="border-b border-border py-6">
        <h3 className="break-words text-lg font-semibold text-foreground">
          {ticket.subject}
        </h3>
        <div className="mt-4 rounded-xl border border-border/50 bg-surface-hover p-4">
          <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-foreground">
            {ticket.description}
          </p>
        </div>
      </div>

      <div className="py-6">
        <TicketTimeline ticket={ticket} />
      </div>

      <div className="mt-2 rounded-xl border border-border border-dashed bg-muted/30 p-5 text-center sm:p-6">
        <p className="text-sm font-semibold text-foreground">Próximo passo</p>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {status.nextStep}
        </p>
        <Link
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          href="/tickets/new"
        >
          Abrir outro chamado
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function InfoPanel({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-border bg-muted/20 p-4">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {text}
      </p>
    </div>
  );
}
