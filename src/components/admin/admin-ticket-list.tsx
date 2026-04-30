import Link from "next/link";
import type {
  AdminTicket,
  AdminTicketFilters,
} from "@/lib/data/admin-tickets";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { formatDateTime } from "@/lib/formatters/date";
import { DocumentIcon, AlertIcon, ArrowRightIcon } from "@/components/ui/icons";

type AdminTicketListProps = {
  filters: AdminTicketFilters;
  tickets: AdminTicket[];
};

export function AdminTicketList({ filters, tickets }: AdminTicketListProps) {
  if (tickets.length === 0) {
    return (
      <EmptyState
        icon={hasActiveFilters(filters) ? <AlertIcon className="h-6 w-6" /> : <DocumentIcon className="h-6 w-6" />}
        title={hasActiveFilters(filters) ? "Nenhum chamado encontrado" : "Nenhum chamado aberto ainda"}
        description={
          hasActiveFilters(filters)
            ? "Não há chamados para os filtros selecionados. Limpe os filtros para ver a fila completa."
            : "Quando alguém abrir uma solicitação, ela aparecerá aqui com os chamados mais recentes primeiro."
        }
        className="my-8"
      />
    );
  }

  return (
    <section
      aria-live="polite"
      className="rounded-2xl border border-border bg-background shadow-sm overflow-hidden"
    >
      <div className="border-b border-border/50 bg-surface-hover/50 px-5 py-4 text-sm font-medium text-muted-foreground flex justify-between items-center">
        <span>Mostrando {tickets.length} chamado{tickets.length === 1 ? "" : "s"}</span>
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
              <th className="px-4 py-4 w-24">Chamado</th>
              <th className="px-4 py-4">Assunto</th>
              <th className="px-4 py-4 w-32">Solicitante</th>
              <th className="px-4 py-4 w-32">Status</th>
              <th className="px-4 py-4 w-24">Urgência</th>
              <th className="px-4 py-4 w-32">Atualização</th>
              <th className="px-4 py-4 w-24 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="align-middle transition-colors hover:bg-surface-hover/50 group">
                <td className="px-4 py-4 font-semibold text-foreground">
                  {ticket.ticket_number}
                </td>
                <td className="px-4 py-4 font-medium text-foreground">
                  <span className="line-clamp-2">{ticket.subject}</span>
                </td>
                <td className="px-4 py-4 text-muted-foreground">
                  <span className="line-clamp-2">{ticket.requester_name}</span>
                </td>
                <td className="px-4 py-4">
                  <TicketStatusBadge status={ticket.status} />
                </td>
                <td className="px-4 py-4">
                  <TicketUrgencyBadge isUrgent={ticket.is_urgent} />
                </td>
                <td className="px-4 py-4 text-muted-foreground text-xs">
                  {formatDateTime(ticket.updated_at || ticket.created_at)}
                </td>
                <td className="px-4 py-4 text-right">
                  <Link
                    className="inline-flex items-center justify-center rounded-lg border border-transparent px-3 py-1.5 text-sm font-semibold text-primary transition-all hover:bg-primary/10 hover:border-primary/20"
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

function TicketCard({ ticket, index }: { ticket: AdminTicket, index: number }) {
  // Use index to create a staggered animation delay (max 500ms)
  const delayClass = `animate-delay-${Math.min(index * 100, 500)}`;
  
  return (
    <article className={`p-5 transition-all duration-300 hover:bg-surface-hover hover:shadow-sm animate-slide-up opacity-0 ${delayClass}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center justify-center rounded-md bg-muted px-2 py-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              {ticket.ticket_number}
            </span>
          </div>
          <h2 className="text-base font-semibold text-foreground leading-snug line-clamp-2">
            {ticket.subject}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1.5 truncate">
            {ticket.requester_name}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <TicketStatusBadge status={ticket.status} />
          <TicketUrgencyBadge isUrgent={ticket.is_urgent} />
        </div>
        <Link
          aria-label={`Abrir chamado ${ticket.ticket_number}`}
          className="inline-flex shrink-0 items-center justify-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground shadow-sm hover:bg-primary hover:text-primary-foreground hover:border-primary hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 ease-out"
          href={`/admin/tickets/${ticket.id}`}
        >
          Abrir
        </Link>
      </div>

      <time
        className="mt-4 block text-xs font-medium text-muted-foreground border-t border-border/50 pt-4"
        dateTime={ticket.updated_at || ticket.created_at}
      >
        Atualizado em {formatDateTime(ticket.updated_at || ticket.created_at)}
      </time>
    </article>
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

function hasActiveFilters(filters: AdminTicketFilters) {
  return filters.status !== "all" || filters.urgency !== "all";
}
