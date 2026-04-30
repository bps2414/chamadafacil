import type { PublicTicket, PublicTicketResponse } from "@/lib/data/tickets";
import { formatDateTime } from "@/lib/formatters/date";
import { UserIcon, SupportIcon, MessageIcon } from "@/components/ui/icons";
import { EmptyState } from "@/components/ui/empty-state";

type TicketTimelineProps = {
  ticket: PublicTicket;
};

export function TicketTimeline({ ticket }: TicketTimelineProps) {
  const entries = [
    {
      body: ticket.description,
      created_at: ticket.created_at,
      id: "requester",
      kind: "requester" as const,
      title: `${ticket.requester_name} (Você)`,
    },
    ...ticket.responses.map((response) => toSupportEntry(response)),
  ];

  return (
    <section>
      <h3 className="text-lg font-semibold text-foreground mb-6">Histórico de interações</h3>

      <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
        {entries.map((entry, index) => {
          const isRequester = entry.kind === "requester";
          
          return (
            <article 
              className="relative flex items-start gap-4 md:gap-6 animate-slide-up" 
              style={{ animationDelay: `${index * 100}ms` }}
              key={entry.id}
            >
              <div
                className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-background shadow-sm ${
                  isRequester ? "bg-primary text-primary-foreground" : "bg-accent-foreground text-white"
                }`}
                aria-hidden="true"
              >
                {isRequester ? <UserIcon className="h-4 w-4" /> : <SupportIcon className="h-4 w-4" />}
              </div>
              <div className="min-w-0 flex-1 rounded-2xl border border-border bg-background p-5 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-3 border-b border-border/50 pb-3">
                  <p
                    className={`text-sm font-semibold ${
                      isRequester
                        ? "text-primary"
                        : "text-accent-foreground"
                    }`}
                  >
                    {entry.title}
                  </p>
                  <time
                    className="text-xs font-medium text-muted-foreground"
                    dateTime={entry.created_at}
                  >
                    {formatDateTime(entry.created_at)}
                  </time>
                </div>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                  {entry.body}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      {ticket.responses.length === 0 ? (
        <div className="mt-8">
          <EmptyState 
            icon={<MessageIcon className="h-6 w-6" />}
            title="Aguardando resposta"
            description="A equipe de suporte ainda não respondeu a este chamado. Você receberá uma notificação assim que houver novidades."
            className="py-6"
          />
        </div>
      ) : null}
    </section>
  );
}

function toSupportEntry(response: PublicTicketResponse) {
  return {
    body: response.body,
    created_at: response.created_at,
    id: response.id,
    kind: "support" as const,
    title: "Equipe de Suporte",
  };
}
