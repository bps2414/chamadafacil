import Link from "next/link";
import type {
  AdminTicketDetail as AdminTicketDetailType,
  AdminTicketMetaState,
  AdminTicketResponseState,
} from "@/lib/data/admin-tickets";
import { AdminTicketManagementPanel } from "@/components/admin/admin-ticket-management-panel";
import { formatDateTime } from "@/lib/formatters/date";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { ArrowLeftIcon, UserIcon, SupportIcon, AlertIcon } from "@/components/ui/icons";

type AdminTicketDetailProps = {
  createResponseAction: (
    state: AdminTicketResponseState,
    formData: FormData,
  ) => Promise<AdminTicketResponseState>;
  ticket: AdminTicketDetailType;
  updateMetaAction: (
    state: AdminTicketMetaState,
    formData: FormData,
  ) => Promise<AdminTicketMetaState>;
};

export function AdminTicketDetail({
  createResponseAction,
  ticket,
  updateMetaAction,
}: AdminTicketDetailProps) {
  return (
    <div className="animate-fade-in">
      <BackToDashboardLink />

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
        <article className="min-w-0 rounded-2xl border border-border bg-background p-6 shadow-sm sm:p-8">
          <header className="border-b border-border/50 pb-6">
            <div className="flex items-center gap-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <span>Chamado</span>
              <span className="text-foreground">{ticket.ticket_number}</span>
            </div>
            
            <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <h1 className="break-words text-2xl font-bold leading-tight sm:text-3xl text-foreground">
                {ticket.subject}
              </h1>
              
              <div className="flex shrink-0 flex-wrap gap-2">
                <TicketStatusBadge status={ticket.status} />
                <TicketUrgencyBadge isUrgent={ticket.is_urgent} />
              </div>
            </div>

            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-4 text-sm text-muted-foreground">
              <DateMeta label="Aberto em" value={ticket.created_at} />
              <DateMeta label="Atualizado em" value={ticket.updated_at} />
              {ticket.resolved_at ? (
                <DateMeta label="Resolvido em" value={ticket.resolved_at} />
              ) : null}
            </dl>
          </header>

          <section className="border-b border-border/50 py-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Dados do Solicitante</h2>
            <dl className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
              <InfoItem label="Nome" value={ticket.requester_name} />
              <InfoItem label="E-mail" value={ticket.requester_email} />
              <InfoItem
                label="Telefone"
                value={ticket.requester_phone || "Não informado"}
              />
            </dl>
          </section>

          <section className="border-b border-border/50 py-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Descrição Original</h2>
            <div className="rounded-xl bg-surface-hover/50 p-5 border border-border/50">
              <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-foreground">
                {ticket.description}
              </p>
            </div>
          </section>

          <TicketAdminTimeline ticket={ticket} />
        </article>

        <AdminTicketManagementPanel
          createResponseAction={createResponseAction}
          initialStatus={ticket.status}
          isUrgent={ticket.is_urgent}
          ticketId={ticket.id}
          updateMetaAction={updateMetaAction}
        />
      </div>
    </div>
  );
}

export function AdminTicketDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-6 w-44 rounded-md bg-muted/50 mb-6" />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
          <div className="h-5 w-24 rounded bg-muted/50 mb-3" />
          <div className="h-10 w-3/4 rounded bg-muted/50 mb-6" />
          <div className="flex gap-4 mb-6">
            <div className="h-6 w-24 rounded-full bg-muted/50" />
            <div className="h-6 w-24 rounded-full bg-muted/50" />
          </div>
          <div className="h-px w-full bg-border/50 my-6" />
          <div className="space-y-4">
            <div className="h-24 rounded-xl bg-muted/50" />
            <div className="h-24 rounded-xl bg-muted/50" />
          </div>
        </div>
        <div className="h-96 rounded-2xl border border-border bg-background p-6">
          <div className="h-6 w-48 rounded bg-muted/50 mb-6" />
          <div className="space-y-4">
            <div className="h-12 rounded-lg bg-muted/50" />
            <div className="h-24 rounded-lg bg-muted/50" />
            <div className="h-12 rounded-lg bg-muted/50" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminTicketDetailError({ message }: { message: string }) {
  return (
    <div>
      <BackToDashboardLink />
      <div className="mt-6">
        <EmptyState 
          icon={<AlertIcon className="h-6 w-6 text-destructive" />}
          title="Não foi possível abrir o chamado"
          description={message}
          className="border-destructive/20 bg-destructive/5"
        />
      </div>
    </div>
  );
}

export function AdminTicketNotFound() {
  return (
    <div>
      <BackToDashboardLink />
      <div className="mt-6">
        <EmptyState 
          icon={<AlertIcon className="h-6 w-6" />}
          title="Chamado não encontrado"
          description="Este chamado não existe mais, foi removido ou o identificador informado não corresponde a nenhum registro disponível para este administrador."
        />
      </div>
    </div>
  );
}

function TicketAdminTimeline({ ticket }: { ticket: AdminTicketDetailType }) {
  const entries = [
    {
      body: ticket.description,
      created_at: ticket.created_at,
      id: "initial-request",
      tone: "requester" as const,
      title: `${ticket.requester_name} abriu o chamado`,
    },
    ...ticket.responses.map((response) => ({
      body: response.body,
      created_at: response.created_at,
      id: response.id,
      tone: "admin" as const,
      title: "Resposta da equipe",
    })),
  ];

  return (
    <section className="pt-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-6">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Histórico de Respostas</h2>
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-surface-hover px-2.5 py-1 rounded-md border border-border/50">
          {ticket.responses.length} resposta
          {ticket.responses.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
        {entries.map((entry, index) => {
          const isRequester = entry.tone === "requester";
          return (
            <article
              className="relative flex items-start gap-4 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
              key={entry.id}
            >
              <div
                aria-hidden="true"
                className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-background shadow-sm ${
                  isRequester ? "bg-primary text-primary-foreground" : "bg-accent-foreground text-white"
                }`}
              >
                {isRequester ? <UserIcon className="h-4 w-4" /> : <SupportIcon className="h-4 w-4" />}
              </div>
              <div className="min-w-0 flex-1 rounded-2xl border border-border bg-background p-5 shadow-sm">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-3">
                  <p className={`text-sm font-semibold ${isRequester ? "text-primary" : "text-accent-foreground"}`}>
                    {entry.title}
                  </p>
                  <time
                    className="text-xs font-medium text-muted-foreground"
                    dateTime={entry.created_at}
                  >
                    {formatDateTime(entry.created_at)}
                  </time>
                </div>
                <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-foreground">
                  {entry.body}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function BackToDashboardLink() {
  return (
    <Link
      className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
      href="/admin"
    >
      <ArrowLeftIcon className="h-4 w-4" />
      Voltar para a fila
    </Link>
  );
}

function DateMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium text-foreground">
        <time dateTime={value}>{formatDateTime(value)}</time>
      </dd>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 flex flex-col gap-1">
      <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="break-words text-sm font-medium text-foreground">
        {value}
      </dd>
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
