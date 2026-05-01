"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import {
  createTicketAction,
  type CreateTicketState,
} from "@/lib/data/tickets";
import type { CreateTicketField } from "@/lib/validation/tickets";
import { FieldError } from "@/components/ui/field-error";
import {
  ArrowRightIcon,
  CheckIcon,
  DocumentIcon,
  SendIcon,
} from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

const initialState: CreateTicketState = {
  status: "idle",
  values: {},
};

export function TicketForm() {
  const [copyFeedback, setCopyFeedback] = useState("");
  const [state, formAction, pending] = useActionState(
    createTicketAction,
    initialState,
  );

  const successRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (state.status === "success" && successRef.current) {
      successRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [state.status]);

  const lookupHref = state.ticketNumber
    ? `/tickets/lookup?ticket_number=${encodeURIComponent(state.ticketNumber)}`
    : "/tickets/lookup";

  async function handleCopyTicketNumber() {
    if (!state.ticketNumber) {
      return;
    }

    try {
      await navigator.clipboard.writeText(state.ticketNumber);
      setCopyFeedback("Código copiado.");
    } catch {
      setCopyFeedback("Não foi possível copiar automaticamente.");
    }
  }

  useEffect(() => {
    if (!copyFeedback) {
      return;
    }

    const timeout = window.setTimeout(() => setCopyFeedback(""), 3000);

    return () => window.clearTimeout(timeout);
  }, [copyFeedback]);

  return (
    <div className="mx-auto max-w-4xl">
      {state.status === "success" && state.ticketNumber ? (
        <section
          ref={successRef}
          aria-live="polite"
          className="mb-6 scroll-mt-24 rounded-xl border border-accent-foreground/20 bg-accent/80 p-4 shadow-sm animate-slide-up sm:p-5"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <span
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-foreground text-white shadow-sm"
            >
              <CheckIcon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1 lg:max-w-2xl">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                <p className="text-sm font-semibold text-accent-foreground">
                  Chamado criado com sucesso!
                </p>
                <p className="text-sm text-muted-foreground">
                  Use o código e o e-mail informado para consultar o status.
                </p>
              </div>
              <div className="mt-4 flex flex-col gap-3 rounded-lg border border-accent-foreground/20 bg-background/85 p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase text-muted-foreground">
                    <DocumentIcon className="h-3.5 w-3.5" />
                    Código do chamado
                  </p>
                  <p className="break-all font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {state.ticketNumber}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCopyTicketNumber}
                  className="w-full shrink-0 sm:w-auto"
                >
                  Copiar código
                </Button>
              </div>
              <p
                aria-live="polite"
                className="mt-2 min-h-5 text-sm font-medium text-accent-foreground"
              >
                {copyFeedback}
              </p>
            </div>
            <div className="flex w-full flex-col gap-2 lg:w-48">
              <Button href={lookupHref} size="md" className="w-full">
                Consultar chamado
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-xs leading-relaxed text-muted-foreground lg:text-center">
                O e-mail será informado apenas na consulta.
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <div className="bg-background rounded-2xl border border-border shadow-sm overflow-hidden animate-slide-up animate-delay-100">
        <form action={formAction} className="p-4 sm:p-6 lg:p-8 space-y-8 sm:space-y-10">
          <fieldset className="space-y-6">
            <legend className="text-lg font-semibold text-foreground border-b border-border pb-2 w-full mb-6">
              1. Suas informações
            </legend>
            <div className="grid gap-6 md:grid-cols-2">
              <TextField
                autoComplete="name"
                error={firstError(state.errors?.requester_name)}
                label="Nome completo"
                name="requester_name"
                placeholder="Ex.: Maria Silva"
                required
                value={state.values?.requester_name}
              />
              <TextField
                autoComplete="email"
                error={firstError(state.errors?.requester_email)}
                label="E-mail de contato"
                name="requester_email"
                placeholder="maria@empresa.com"
                required
                type="email"
                value={state.values?.requester_email}
              />
              <TextField
                autoComplete="tel"
                error={firstError(state.errors?.requester_phone)}
                label="Telefone ou WhatsApp"
                name="requester_phone"
                placeholder="(11) 91234-5678"
                type="tel"
                value={state.values?.requester_phone}
                optional
              />
            </div>
          </fieldset>

          <fieldset className="space-y-6">
            <legend className="text-lg font-semibold text-foreground border-b border-border pb-2 w-full mb-6">
              2. Detalhes do Chamado
            </legend>
            <div className="grid gap-6">
              <TextField
                error={firstError(state.errors?.subject)}
                label="Assunto principal"
                name="subject"
                placeholder="Ex.: Sistema de vendas não está abrindo"
                required
                value={state.values?.subject}
              />

              <DescriptionField
                error={firstError(state.errors?.description)}
                key={state.values?.description ?? state.status}
                value={state.values?.description}
              />
            </div>
          </fieldset>

          {state.message && state.status === "error" ? (
            <div
              aria-live="polite"
              className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive font-medium"
            >
              {state.message}
            </div>
          ) : null}

          <div className="flex flex-col gap-5 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Button
              type="submit"
              size="lg"
              isLoading={pending}
              className="w-full sm:w-auto min-w-[200px]"
            >
              {!pending && <SendIcon className="mr-2 h-5 w-5" />}
              {pending ? "Enviando..." : "Abrir chamado agora"}
            </Button>

            <p className="text-sm text-muted-foreground text-center sm:text-right max-w-xs">
              Seus dados serão usados apenas para a resolução desta solicitação.
            </p>
          </div>
        </form>
      </div>

      <div className="mt-10 text-center text-sm text-muted-foreground">
        Já tem um chamado aberto?{" "}
        <Link
          className="font-semibold text-primary hover:text-primary/80 transition-colors"
          href="/tickets/lookup"
        >
          Consultar status
        </Link>
      </div>
    </div>
  );
}

function DescriptionField({
  error,
  value = "",
}: {
  error?: string;
  value?: string;
}) {
  const [descriptionLength, setDescriptionLength] = useState(value.length);

  return (
    <div>
      <label className="text-sm font-semibold text-foreground" htmlFor="description">
        Descrição detalhada <span className="text-destructive">*</span>
      </label>
      <div className="relative mt-2">
        <textarea
          aria-describedby={error ? "description-error" : undefined}
          aria-invalid={Boolean(error)}
          className={`min-h-[160px] w-full resize-y rounded-lg border bg-background px-4 py-3 pr-4 text-base shadow-sm outline-none transition-input placeholder:text-muted-foreground/60 focus:border-ring focus:ring-1 focus:ring-ring ${
            error ? "border-destructive" : "border-border hover:border-border/80"
          }`}
          defaultValue={value}
          id="description"
          maxLength={2000}
          name="description"
          onChange={(event) =>
            setDescriptionLength(event.currentTarget.value.length)
          }
          placeholder="Descreva seu problema com o maior número de detalhes possível. O que você tentou fazer? Que erro apareceu?"
          required
        />
        <div className="absolute bottom-3 right-4 flex items-center justify-end pointer-events-none">
          <span className={`text-xs px-2 py-1 rounded-md bg-background border ${descriptionLength > 1900 ? "text-destructive border-destructive/30" : "text-muted-foreground border-border"}`}>
            {descriptionLength}/2000
          </span>
        </div>
      </div>
      <FieldError id="description-error" errors={error ? [error] : undefined} />
    </div>
  );
}

type TextFieldProps = {
  autoComplete?: string;
  error?: string;
  label: string;
  name: CreateTicketField;
  placeholder: string;
  required?: boolean;
  optional?: boolean;
  type?: string;
  value?: string;
};

function TextField({
  autoComplete,
  error,
  label,
  name,
  placeholder,
  required = false,
  optional = false,
  type = "text",
  value,
}: TextFieldProps) {
  const errorId = `${name}-error`;

  return (
    <div>
      <label className="flex items-baseline justify-between text-sm font-semibold text-foreground" htmlFor={name}>
        <span>
          {label} {required ? <span className="text-destructive">*</span> : null}
        </span>
        {optional && (
          <span className="text-xs font-normal text-muted-foreground">Opcional</span>
        )}
      </label>
      <input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        autoComplete={autoComplete}
        className={`mt-2 h-12 w-full rounded-lg border bg-background px-4 py-3 text-base shadow-sm outline-none transition-input placeholder:text-muted-foreground/60 focus:border-ring focus:ring-1 focus:ring-ring ${
          error ? "border-destructive" : "border-border hover:border-border/80"
        }`}
        defaultValue={value}
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
      />
      <FieldError id={errorId} errors={error ? [error] : undefined} />
    </div>
  );
}

function firstError(errors?: string[]) {
  return errors?.[0];
}
