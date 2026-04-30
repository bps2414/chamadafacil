"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  lookupTicketAction,
  type LookupTicketState,
} from "@/lib/data/tickets";
import { TicketSummary } from "@/components/tickets/ticket-summary";
import { FieldError } from "@/components/ui/field-error";
import { EmptyState } from "@/components/ui/empty-state";
import { LockIcon, SearchIcon, AlertIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

const initialState: LookupTicketState = {
  status: "idle",
  values: {},
};

export function TicketLookupForm() {
  const [state, formAction, pending] = useActionState(
    lookupTicketAction,
    initialState,
  );

  // Scroll to result area after lookup completes
  const resultRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!pending && state.status !== "idle" && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pending]);

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="inline-flex max-w-full items-start gap-3 rounded-lg border border-border bg-background px-5 py-4 text-sm text-muted-foreground shadow-sm animate-fade-in">
        <LockIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <p className="leading-relaxed">
          Seus dados são utilizados apenas para localizar o andamento do seu chamado e <strong className="font-medium text-foreground">não são compartilhados</strong> com terceiros.
        </p>
      </div>

      <form
        action={formAction}
        className="rounded-2xl border border-border bg-background p-5 sm:p-8 shadow-sm"
      >
        <div className="grid gap-5 sm:gap-6 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
          <div>
            <label className="text-sm font-semibold text-foreground flex items-center justify-between" htmlFor="ticket_number">
              <span>Número do chamado</span>
            </label>
            <input
              aria-describedby={
                state.errors?.ticket_number ? "ticket-number-error" : undefined
              }
              aria-invalid={Boolean(state.errors?.ticket_number)}
              className={`mt-2 h-12 w-full rounded-lg border bg-background px-4 py-3 text-base uppercase shadow-sm outline-none transition-input placeholder:text-muted-foreground/50 focus:border-ring focus:ring-1 focus:ring-ring ${
                state.errors?.ticket_number ? "border-destructive" : "border-border hover:border-border/80"
              }`}
              defaultValue={state.values?.ticket_number}
              id="ticket_number"
              name="ticket_number"
              placeholder="CF-2026-00001"
              required
            />
            <FieldError
              id="ticket-number-error"
              errors={state.errors?.ticket_number}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground flex items-center justify-between" htmlFor="requester_email">
              <span>E-mail</span>
            </label>
            <input
              aria-describedby={
                state.errors?.requester_email ? "lookup-email-error" : undefined
              }
              aria-invalid={Boolean(state.errors?.requester_email)}
              autoComplete="email"
              className={`mt-2 h-12 w-full rounded-lg border bg-background px-4 py-3 text-base shadow-sm outline-none transition-input placeholder:text-muted-foreground/50 focus:border-ring focus:ring-1 focus:ring-ring ${
                state.errors?.requester_email ? "border-destructive" : "border-border hover:border-border/80"
              }`}
              defaultValue={state.values?.requester_email}
              id="requester_email"
              name="requester_email"
              placeholder="solicitante@email.com"
              required
              type="email"
            />
            <FieldError
              id="lookup-email-error"
              errors={state.errors?.requester_email}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            isLoading={pending}
            className="w-full lg:w-48 lg:mb-[2px] mt-2 lg:mt-0" 
          >
            {!pending && <SearchIcon className="mr-2 h-5 w-5" />}
            {pending ? "Buscando..." : "Consultar"}
          </Button>
        </div>
      </form>

      {/* Result anchor — scroll target */}
      <div ref={resultRef} className="scroll-mt-24" />

      {/* Loading Skeleton */}
      {pending && (
        <div className="rounded-2xl border border-border bg-background p-8 shadow-sm animate-pulse">
          <div className="h-6 bg-muted rounded-md w-1/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded-md w-full"></div>
            <div className="h-4 bg-muted rounded-md w-5/6"></div>
            <div className="h-4 bg-muted rounded-md w-4/6"></div>
          </div>
        </div>
      )}

      {/* Empty / Not Found State */}
      {!pending && state.status === "empty" && state.message && (
        <EmptyState 
          icon={<SearchIcon className="h-6 w-6" />}
          title="Chamado não encontrado"
          description={state.message}
        />
      )}

      {/* Error State */}
      {!pending && state.status === "error" && state.message && (
        <EmptyState 
          icon={<AlertIcon className="h-6 w-6 text-destructive" />}
          title="Ocorreu um erro"
          description={state.message}
          className="border-destructive/30 bg-destructive/5"
        />
      )}

      {/* Success State */}
      {!pending && state.status === "success" && state.ticket && (
        <div className="animate-slide-up">
          <TicketSummary ticket={state.ticket} />
        </div>
      )}
    </div>
  );
}
