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
      isLatestResponse: false,
      kind: "requester" as const,
      title: `${ticket.requester_name} (você)`,
    },
    ...ticket.responses.map((response, index) =>
      toSupportEntry(response, index === ticket.responses.length - 1),
    ),
  ];

  return (
    <section>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Histórico de interações
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Acompanhe a solicitação original e as respostas publicadas pela
          equipe.
        </p>
      </div>

      <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent md:before:mx-auto md:before:translate-x-0">
        {entries.map((entry, index) => {
          const isRequester = entry.kind === "requester";

          return (
            <article
              className="relative flex items-start gap-4 animate-slide-up md:gap-6"
              style={{ animationDelay: `${index * 100}ms` }}
              key={entry.id}
            >
              <div
                className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-background shadow-sm ${
                  isRequester
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent-foreground text-white"
                }`}
                aria-hidden="true"
              >
                {isRequester ? (
                  <UserIcon className="h-4 w-4" />
                ) : (
                  <SupportIcon className="h-4 w-4" />
                )}
              </div>
              <div
                className={`min-w-0 flex-1 rounded-2xl border p-5 shadow-sm transition-shadow hover:shadow-md ${
                  entry.isLatestResponse
                    ? "border-primary/30 bg-primary/5"
                    : "border-border bg-background"
                }`}
              >
                <div className="mb-3 flex flex-col gap-1 border-b border-border/50 pb-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p
                      className={`text-sm font-semibold ${
                        isRequester ? "text-primary" : "text-accent-foreground"
                      }`}
                    >
                      {entry.title}
                    </p>
                    {entry.isLatestResponse ? (
                      <p className="mt-1 text-xs font-medium text-primary">
                        Última resposta publicada
                      </p>
                    ) : null}
                  </div>
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

      {ticket.responses.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            icon={<MessageIcon className="h-6 w-6" />}
            title="Aguardando resposta"
            description="A equipe ainda não respondeu a este chamado. Volte mais tarde usando o código e o e-mail cadastrados."
            className="py-6"
          />
        </div>
      ) : null}
    </section>
  );
}

function toSupportEntry(
  response: PublicTicketResponse,
  isLatestResponse: boolean,
) {
  return {
    body: response.body,
    created_at: response.created_at,
    id: response.id,
    isLatestResponse,
    kind: "support" as const,
    title: "Equipe de suporte",
  };
}
