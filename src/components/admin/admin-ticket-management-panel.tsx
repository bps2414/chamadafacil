"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import type { TicketStatus } from "@/lib/data/tickets";
import type {
  AdminTicketMetaState,
  AdminTicketResponseState,
} from "@/lib/data/admin-tickets";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field-error";
import { SendIcon, CheckIcon, AlertIcon } from "@/components/ui/icons";

type AdminTicketManagementPanelProps = {
  createResponseAction: (
    state: AdminTicketResponseState,
    formData: FormData,
  ) => Promise<AdminTicketResponseState>;
  initialStatus: TicketStatus;
  isUrgent: boolean;
  ticketId: string;
  updateMetaAction: (
    state: AdminTicketMetaState,
    formData: FormData,
  ) => Promise<AdminTicketMetaState>;
};

const initialMetaState: AdminTicketMetaState = {
  status: "idle",
};

const initialResponseState: AdminTicketResponseState = {
  status: "idle",
};

export function AdminTicketManagementPanel({
  createResponseAction,
  initialStatus,
  isUrgent,
  ticketId,
  updateMetaAction,
}: AdminTicketManagementPanelProps) {
  const router = useRouter();
  const responseFormRef = useRef<HTMLFormElement>(null);
  const [metaState, metaFormAction, metaPending] = useActionState(
    updateMetaAction,
    initialMetaState,
  );
  const [responseState, responseFormAction, responsePending] = useActionState(
    createResponseAction,
    initialResponseState,
  );
  const [responseLength, setResponseLength] = useState(0);

  useEffect(() => {
    if (metaState.status === "success") {
      router.refresh();
    }
  }, [metaState.status, router]);

  useEffect(() => {
    if (responseState.status === "success") {
      responseFormRef.current?.reset();
      router.refresh();
    }
  }, [responseState.status, router]);

  return (
    <aside className="rounded-2xl border border-border bg-surface-hover/30 p-6 lg:sticky lg:top-24 lg:self-start">
      <div className="flex items-center gap-2 mb-6 border-b border-border/50 pb-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Gerenciamento</h2>
      </div>

      <form action={metaFormAction} className="space-y-6">
        <input name="ticket_id" type="hidden" value={ticketId} />

        <div>
          <label className="text-sm font-semibold text-foreground flex items-center justify-between mb-2" htmlFor="status">
            <span>Status do Chamado</span>
          </label>
          <select
            aria-describedby={
              metaState.errors?.status ? "ticket-status-error" : undefined
            }
            aria-invalid={Boolean(metaState.errors?.status)}
            className={`h-11 w-full rounded-xl border bg-background px-4 py-2.5 text-sm shadow-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:bg-muted/50 ${
              metaState.errors?.status ? "border-destructive" : "border-border"
            }`}
            defaultValue={initialStatus}
            disabled={metaPending}
            id="status"
            name="status"
          >
            <option value="open">Em aberto</option>
            <option value="in_progress">Em andamento</option>
            <option value="resolved">Resolvido</option>
          </select>
          <FieldError id="ticket-status-error" errors={metaState.errors?.status} />
        </div>

        <fieldset>
          <legend className="sr-only">Urgência</legend>
          <label className="flex items-start gap-3 rounded-xl border border-border bg-background px-4 py-4 cursor-pointer transition-all hover:border-border/80 shadow-sm">
            <div className="flex items-center h-5 mt-0.5">
              <input
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary disabled:cursor-not-allowed"
                defaultChecked={isUrgent}
                disabled={metaPending}
                name="is_urgent"
                type="checkbox"
              />
            </div>
            <span className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">
                Marcar como Urgente
              </span>
              <span className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Prioriza o chamado na fila para a equipe.
              </span>
            </span>
          </label>
        </fieldset>

        <ActionMessage state={metaState} />

        <Button
          type="submit"
          className="w-full"
          variant="secondary"
          isLoading={metaPending}
        >
          {metaPending ? "Salvando..." : "Atualizar chamado"}
        </Button>
      </form>

      <div className="my-8 border-t border-border/50" />

      <form
        action={responseFormAction}
        className="space-y-6"
        ref={responseFormRef}
      >
        <input name="ticket_id" type="hidden" value={ticketId} />

        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Nova Resposta</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
            A resposta ficará visível publicamente para o solicitante.
          </p>
        </div>

        <div>
          <label className="sr-only" htmlFor="body">
            Mensagem da resposta
          </label>
          <div className="relative">
            <textarea
              aria-describedby={
                responseState.errors?.body ? "ticket-response-error" : undefined
              }
              aria-invalid={Boolean(responseState.errors?.body)}
              className={`min-h-[140px] w-full resize-y rounded-xl border bg-background px-4 py-3 pb-8 text-sm leading-relaxed shadow-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-ring focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:bg-muted/50 ${
                responseState.errors?.body ? "border-destructive" : "border-border"
              }`}
              disabled={responsePending}
              id="body"
              maxLength={2000}
              name="body"
              onChange={(e) => setResponseLength(e.target.value.length)}
              placeholder="Digite sua resposta detalhada..."
              required
            />
            <div className="absolute bottom-3 right-4 flex items-center justify-end pointer-events-none">
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded bg-surface-hover border ${responseLength > 1900 ? 'text-destructive border-destructive/30' : 'text-muted-foreground border-border/50'}`}>
                {responseLength}/2000
              </span>
            </div>
          </div>
          <FieldError id="ticket-response-error" errors={responseState.errors?.body} />
        </div>

        <ActionMessage state={responseState} />

        <Button
          type="submit"
          className="w-full"
          isLoading={responsePending}
        >
          {!responsePending && <SendIcon className="mr-2 h-4 w-4" />}
          {responsePending ? "Enviando..." : "Enviar resposta"}
        </Button>
      </form>
    </aside>
  );
}

function ActionMessage({
  state,
}: {
  state: AdminTicketMetaState | AdminTicketResponseState;
}) {
  if (state.status === "idle" || !state.message) {
    return null;
  }

  const isSuccess = state.status === "success";

  return (
    <div
      aria-live="polite"
      className={`flex items-start gap-2.5 rounded-lg border px-4 py-3 text-sm animate-fade-in ${
        isSuccess
          ? "border-success/20 bg-success/10 text-success-foreground"
          : "border-destructive/20 bg-destructive/10 text-destructive font-medium"
      }`}
    >
      {isSuccess ? (
        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success" />
      ) : (
        <AlertIcon className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
      )}
      <p className="leading-relaxed">{state.message}</p>
    </div>
  );
}
