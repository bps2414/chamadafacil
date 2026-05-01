import Link from "next/link";
import type {
  AdminTicket,
  AdminTicketFilters,
} from "@/lib/data/admin-tickets";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { formatDateTime, formatRelativeAge } from "@/lib/formatters/date";
import { DocumentIcon, AlertIcon, ArrowRightIcon } from "@/components/ui/icons";

type AdminTicketListProps = {
  filters: AdminTicketFilters;
  tickets: AdminTicket[];
};

export function AdminTicketList({ filters, tickets }: AdminTicketListProps) {
  const hasFilters = hasActiveFilters(filters);

  if (tickets.length === 0) {
    return (
      <EmptyState
        icon={
          hasFilters ? (
            <AlertIcon className="h-6 w-6" />
          ) : (
            <DocumentIcon className="h-6 w-6" />
          )
        }
        title={hasFilters ? "Nenhum chamado encontrado" : "Nenhum chamado aberto ainda"}
        description={
          hasFilters
            ? "Não há chamados para a busca ou filtros selecionados. Limpe os filtros para ver a fila completa."
            : "Quando alguém abrir uma solicitação, ela aparecerá aqui para acompanhamento da equipe."
        }
        className="my-8"
      />
    );
  }

  return (
    <section
      aria-live="polite"
      className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm"
    >
      <div className="flex flex-col gap-1 border-b border-border/50 bg-surface-hover/50 px-4 py-4 text-sm font-medium text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <span>
          Mostrando {tickets.length} chamado{tickets.length === 1 ? "" : "s"}
        </span>
        {hasFilters ? (
          <span className="text-xs">Filtros ativos preservados na URL</span>
        ) : null}
      </div>

      <div className="divide-y divide-border/50 lg:hidden">
        {tickets.map((ticket, index) => (
          <TicketCard key={ticket.id} ticket={ticket} index={index} />
        ))}
      </div>

      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border/50 bg-surface-hover/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <th className="w-32 px-4 py-4">Chamado</th>
              <th className="px-4 py-4">Assunto</th>
              <th className="w-40 px-4 py-4">Solicitante</th>
              <th className="w-36 px-4 py-4">Status</th>
              <th className="w-40 px-4 py-4">Operação</th>
              <th className="w-48 px-4 py-4">Tempo</th>
              <th className="w-24 px-4 py-4 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {tickets.map((ticket) => (
              <tr
                key={ticket.id}
                className={`group align-middle transition-colors hover:bg-surface-hover/50 ${
                  ticket.is_urgent ? "bg-destructive/[0.03]" : ""
                } ${!ticket.has_response ? "shadow-[inset_3px_0_0_var(--warning)]" : ""}`}
              >
                <td className="px-4 py-4 font-semibold text-foreground">
                  <span className="break-all">{ticket.ticket_number}</span>
                </td>
                <td className="px-4 py-4 font-medium text-foreground">
                  <span className="line-clamp-2 break-words">{ticket.subject}</span>
                </td>
                <td className="px-4 py-4 text-muted-foreground">
                  <span className="line-clamp-2 break-words">
                    {ticket.requester_name}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <TicketStatusBadge status={ticket.status} />
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    <TicketUrgencyBadge isUrgent={ticket.is_urgent} />
                    <TicketResponseBadge hasResponse={ticket.has_response} />
                  </div>
                </td>
                <td className="px-4 py-4 text-xs text-muted-foreground">
                  <TicketTimeMeta ticket={ticket} />
                </td>
                <td className="px-4 py-4 text-right">
                  <Link
                    className="inline-flex min-h-10 items-center justify-center rounded-lg border border-transparent px-3 py-2 text-sm font-semibold text-primary transition-all hover:border-primary/20 hover:bg-primary/10"
                    href={`/admin/tickets/${ticket.id}`}
                  >
                    Abrir
                    <ArrowRightIcon className="ml-1.5 h-4 w-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function AdminDashboardError({ message }: { message: string }) {
  return (
    <EmptyState
      icon={<AlertIcon className="h-6 w-6 text-destructive" />}
      title="Não foi possível carregar a fila"
      description={message}
      className="border-destructive/20 bg-destructive/5"
    />
  );
}

export function AdminDashboardSkeleton() {
  return (
    <section className="rounded-2xl border border-border bg-background p-6">
      <div className="h-5 w-32 bg-muted rounded animate-pulse mb-6" />
      <div className="space-y-4">
        {[0, 1, 2, 3].map((item) => (
          <div
            className="h-20 animate-pulse rounded-xl bg-muted/50"
            key={item}
          />
        ))}
      </div>
    </section>
  );
}

function TicketCard({ ticket, index }: { ticket: AdminTicket; index: number }) {
  const delayClass = `animate-delay-${Math.min(index * 100, 500)}`;

  return (
    <article
      className={`p-4 transition-all duration-300 hover:bg-surface-hover sm:p-5 animate-slide-up opacity-0 ${delayClass} ${
        ticket.is_urgent ? "bg-destructive/[0.03]" : ""
      } ${!ticket.has_response ? "shadow-[inset_3px_0_0_var(--warning)]" : ""}`}
    >
      <div className="min-w-0">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center justify-center rounded-md bg-muted px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {ticket.ticket_number}
          </span>
          <TicketResponseBadge hasResponse={ticket.has_response} />
        </div>

        <h2 className="break-words text-base font-semibold leading-snug text-foreground">
          {ticket.subject}
        </h2>
        <p className="mt-1 break-words text-sm text-muted-foreground">
          {ticket.requester_name}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <TicketStatusBadge status={ticket.status} />
        <TicketUrgencyBadge isUrgent={ticket.is_urgent} />
      </div>

      <div className="mt-4 border-t border-border/50 pt-4 text-xs text-muted-foreground">
        <TicketTimeMeta ticket={ticket} />
      </div>

      <Link
        aria-label={`Abrir chamado ${ticket.ticket_number}`}
        className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-all duration-300 ease-out hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-md"
        href={`/admin/tickets/${ticket.id}`}
      >
        Abrir chamado
      </Link>
    </article>
  );
}

function TicketTimeMeta({ ticket }: { ticket: AdminTicket }) {
  const updatedAt = ticket.last_activity_at || ticket.updated_at || ticket.created_at;

  return (
    <div className="space-y-1">
      <p className="font-medium text-foreground">
        Aberto há {formatRelativeAge(ticket.created_at)}
      </p>
      <time className="block" dateTime={updatedAt}>
        Atualizado em {formatDateTime(updatedAt)}
      </time>
    </div>
  );
}

function TicketStatusBadge({ status }: { status: string }) {
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
}

function TicketUrgencyBadge({ isUrgent }: { isUrgent: boolean }) {
  return isUrgent ? (
    <Badge variant="destructive" showDot>Urgente</Badge>
  ) : (
    <Badge variant="default" showDot>Normal</Badge>
  );
}

function TicketResponseBadge({ hasResponse }: { hasResponse: boolean }) {
  return hasResponse ? (
    <Badge variant="outline" showDot>Respondido</Badge>
  ) : (
    <Badge variant="warning" showDot>Sem resposta</Badge>
  );
}

function hasActiveFilters(filters: AdminTicketFilters) {
  return (
    filters.status !== "all" ||
    filters.urgency !== "all" ||
    filters.response !== "all" ||
    filters.sort !== "updated_desc" ||
    filters.query.length > 0
  );
}
