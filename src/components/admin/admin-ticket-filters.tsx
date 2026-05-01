"use client";

import { useRef, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { AdminTicketFilters } from "@/lib/data/admin-tickets";
import { Button } from "@/components/ui/button";

type AdminTicketFiltersProps = {
  filters: AdminTicketFilters;
};

export function AdminTicketFilters({ filters }: AdminTicketFiltersProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const queryInputRef = useRef<HTMLInputElement>(null);
  const queryDebounceRef = useRef<number | null>(null);

  function updateFilter(name: keyof AdminTicketFilters, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    const defaultValue = defaultFilterValues[name];
    const normalizedValue = value.trim();

    if (normalizedValue && normalizedValue !== defaultValue) {
      params.set(name, normalizedValue);
    } else {
      params.delete(name);
    }

    const queryString = params.toString();
    const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

    startTransition(() => {
      router.replace(nextUrl, { scroll: false });
    });
  }

  function updateQuery(value: string) {
    if (queryDebounceRef.current) {
      window.clearTimeout(queryDebounceRef.current);
    }

    queryDebounceRef.current = window.setTimeout(() => {
      updateFilter("query", value);
    }, 350);
  }

  function clearFilters() {
    if (queryDebounceRef.current) {
      window.clearTimeout(queryDebounceRef.current);
    }

    if (queryInputRef.current) {
      queryInputRef.current.value = "";
    }

    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  }

  return (
    <div
      className="mb-6 rounded-2xl border border-border bg-background p-4 shadow-sm sm:p-5"
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <label
            className="mb-2 block text-sm font-semibold text-foreground"
            htmlFor="query"
          >
            Busca
          </label>
          <input
            className="h-11 w-full min-w-0 rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-ring focus:ring-1 focus:ring-ring"
            defaultValue={filters.query}
            id="query"
            maxLength={80}
            name="query"
            onChange={(event) => updateQuery(event.currentTarget.value)}
            placeholder="Número, assunto ou solicitante"
            ref={queryInputRef}
            type="search"
          />
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-semibold text-foreground"
            htmlFor="status"
          >
            Status
          </label>
          <select
            className="h-11 w-full min-w-0 rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
            defaultValue={filters.status}
            id="status"
            name="status"
            onChange={(event) => updateFilter("status", event.currentTarget.value)}
          >
            <option value="all">Todos os status</option>
            <option value="open">Em aberto</option>
            <option value="in_progress">Em andamento</option>
            <option value="resolved">Resolvidos</option>
          </select>
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-semibold text-foreground"
            htmlFor="urgency"
          >
            Urgência
          </label>
          <select
            className="h-11 w-full min-w-0 rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
            defaultValue={filters.urgency}
            id="urgency"
            name="urgency"
            onChange={(event) =>
              updateFilter("urgency", event.currentTarget.value)
            }
          >
            <option value="all">Todas as prioridades</option>
            <option value="urgent">Apenas urgentes</option>
            <option value="normal">Apenas normais</option>
          </select>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto_auto] lg:items-end">
        <div>
          <label
            className="mb-2 block text-sm font-semibold text-foreground"
            htmlFor="response"
          >
            Resposta
          </label>
          <select
            className="h-11 w-full min-w-0 rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
            defaultValue={filters.response}
            id="response"
            name="response"
            onChange={(event) =>
              updateFilter("response", event.currentTarget.value)
            }
          >
            <option value="all">Todos</option>
            <option value="unanswered">Sem resposta</option>
            <option value="answered">Respondidos</option>
          </select>
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-semibold text-foreground"
            htmlFor="sort"
          >
            Ordenar por
          </label>
          <select
            className="h-11 w-full min-w-0 rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
            defaultValue={filters.sort}
            id="sort"
            name="sort"
            onChange={(event) => updateFilter("sort", event.currentTarget.value)}
          >
            <option value="updated_desc">Atualização recente</option>
            <option value="created_desc">Mais novos</option>
            <option value="created_asc">Mais antigos</option>
            <option value="urgent_first">Urgentes primeiro</option>
          </select>
        </div>

        <div
          className="flex min-h-11 w-full items-center text-xs font-medium text-muted-foreground lg:w-40"
          aria-live="polite"
        >
          {isPending ? "Atualizando fila..." : "Atualização automática"}
        </div>

        <Button
          type="button"
          variant="outline"
          size="md"
          className="w-full"
          onClick={clearFilters}
        >
          Limpar
        </Button>
      </div>
    </div>
  );
}

const defaultFilterValues: AdminTicketFilters = {
  query: "",
  response: "all",
  sort: "updated_desc",
  status: "all",
  urgency: "all",
};
