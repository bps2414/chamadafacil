import Link from "next/link";
import type { PublicTicket } from "@/lib/data/tickets";
import { TicketTimeline } from "@/components/tickets/ticket-timeline";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/formatters/date";
import { CheckIcon, ArrowRightIcon } from "@/components/ui/icons";

type TicketSummaryProps = {
  ticket: PublicTicket;
};

export function TicketSummary({ ticket }: TicketSummaryProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="warning" showDot>Em aberto</Badge>;
      case "in_progress":
        return <Badge variant="primary" showDot>Em andamento</Badge>;
      case "resolved":
        return <Badge variant="success" showDot>Resolvido</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const getUrgencyBadge = (isUrgent: boolean) => {
    return isUrgent ? (
      <Badge variant="destructive" showDot>Urgente</Badge>
    ) : (
      <Badge variant="default" showDot>Normal</Badge>
    );
  };

  return (
    <section className="rounded-2xl border border-border bg-background p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between border-b border-border pb-6">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span
              aria-hidden="true"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/50 text-accent-foreground"
            >
              <CheckIcon className="h-5 w-5" />
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Chamado {ticket.ticket_number}
            </h2>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Aberto em <strong className="font-medium text-foreground">{formatDateTime(ticket.created_at)}</strong>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:flex-col sm:items-end">
          {getStatusBadge(ticket.status)}
          {getUrgencyBadge(ticket.is_urgent)}
        </div>
      </div>

      <div className="py-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">
          {ticket.subject}
        </h3>
        <div className="mt-4 rounded-xl bg-surface-hover p-4 border border-border/50">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
            {ticket.description}
          </p>
        </div>
      </div>

      <div className="py-6">
        <TicketTimeline ticket={ticket} />
      </div>

      <div className="mt-2 flex flex-col items-center justify-center gap-2 rounded-xl bg-muted/30 p-6 text-center border border-border border-dashed">
        <p className="text-sm text-muted-foreground">
          Precisa de ajuda com outro assunto?
        </p>
        <Link
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          href="/tickets/new"
        >
          Abra um novo chamado
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
