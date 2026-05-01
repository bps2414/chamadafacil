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

type TicketLookupFormProps = {
  initialTicketNumber?: string;
};

const initialState: LookupTicketState = {
  status: "idle",
  values: {},
};

export function TicketLookupForm({
  initialTicketNumber = "",
}: TicketLookupFormProps) {
  const [state, formAction, pending] = useActionState(lookupTicketAction, {
    ...initialState,
    values: { ticket_number: initialTicketNumber },
  });

  const resultRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!pending && state.status !== "idle" && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [pending, state.status]);

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="inline-flex max-w-full items-start gap-3 rounded-lg border border-border bg-background px-5 py-4 text-sm text-muted-foreground shadow-sm animate-fade-in">
        <LockIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <p className="leading-relaxed">
          Informe o código e o e-mail usado na abertura. O e-mail não fica na
          URL e serve apenas para confirmar que você pode consultar este
          chamado.
        </p>
      </div>

      <form
        action={formAction}
        className="rounded-2xl border border-border bg-background p-5 shadow-sm sm:p-8"
      >
        <div className="grid gap-5 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] lg:items-end">
          <div className="min-w-0">
            <label
              className="flex items-center justify-between text-sm font-semibold text-foreground"
              htmlFor="ticket_number"
            >
              <span>Número do chamado</span>
            </label>
            <input
              aria-describedby={
                state.errors?.ticket_number ? "ticket-number-error" : undefined
              }
              aria-invalid={Boolean(state.errors?.ticket_number)}
              className={`mt-2 h-12 w-full rounded-lg border bg-background px-4 py-3 text-base uppercase shadow-sm outline-none transition-input placeholder:text-muted-foreground/50 focus:border-ring focus:ring-1 focus:ring-ring ${
                state.errors?.ticket_number
                  ? "border-destructive"
                  : "border-border hover:border-border/80"
              }`}
              defaultValue={state.values?.ticket_number ?? initialTicketNumber}
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

          <div className="min-w-0">
            <label
              className="flex items-center justify-between text-sm font-semibold text-foreground"
              htmlFor="requester_email"
            >
              <span>E-mail</span>
            </label>
            <input
              aria-describedby={
                state.errors?.requester_email
                  ? "lookup-email-error"
                  : undefined
              }
              aria-invalid={Boolean(state.errors?.requester_email)}
              autoComplete="email"
              className={`mt-2 h-12 w-full rounded-lg border bg-background px-4 py-3 text-base shadow-sm outline-none transition-input placeholder:text-muted-foreground/50 focus:border-ring focus:ring-1 focus:ring-ring ${
                state.errors?.requester_email
                  ? "border-destructive"
                  : "border-border hover:border-border/80"
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
            className="mt-2 w-full lg:mb-[2px] lg:mt-0 lg:w-48"
          >
            {!pending && <SearchIcon className="mr-2 h-5 w-5" />}
            {pending ? "Buscando..." : "Consultar"}
          </Button>
        </div>
      </form>

      <div ref={resultRef} className="scroll-mt-24" />

      {pending ? (
        <div className="rounded-2xl border border-border bg-background p-8 shadow-sm animate-pulse">
          <div className="mb-6 h-6 w-1/4 rounded-md bg-muted" />
          <div className="space-y-4">
            <div className="h-4 w-full rounded-md bg-muted" />
            <div className="h-4 w-5/6 rounded-md bg-muted" />
            <div className="h-4 w-4/6 rounded-md bg-muted" />
          </div>
        </div>
      ) : null}

      {!pending && state.status === "empty" ? (
        <EmptyState
          icon={<SearchIcon className="h-6 w-6" />}
          title="Não encontramos esse chamado"
          description="Confira se o código e o e-mail foram digitados exatamente como na abertura. Por segurança, não informamos se apenas um dos dados está correto."
        />
      ) : null}

      {!pending && state.status === "error" ? (
        <EmptyState
          icon={<AlertIcon className="h-6 w-6 text-destructive" />}
          title="Não foi possível consultar agora"
          description="Houve uma falha técnica ao buscar o chamado. Tente novamente em alguns instantes."
          className="border-destructive/30 bg-destructive/5"
        />
      ) : null}

      {!pending && state.status === "success" && state.ticket ? (
        <div className="animate-slide-up">
          <TicketSummary ticket={state.ticket} />
        </div>
      ) : null}
    </div>
  );
}
