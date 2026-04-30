import type { AdminTicketFilters } from "@/lib/data/admin-tickets";
import { Button } from "@/components/ui/button";

type AdminTicketFiltersProps = {
  filters: AdminTicketFilters;
};

export function AdminTicketFilters({ filters }: AdminTicketFiltersProps) {
  return (
    <form
      action="/admin"
      className="rounded-2xl border border-border bg-background p-5 shadow-sm mb-6"
    >
      <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto_auto] sm:items-end">
        <div>
          <label
            className="text-sm font-semibold text-foreground mb-2 block"
            htmlFor="status"
          >
            Status
          </label>
          <select
            className="h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
            defaultValue={filters.status}
            id="status"
            name="status"
          >
            <option value="all">Todos os status</option>
            <option value="open">Em aberto</option>
            <option value="in_progress">Em andamento</option>
            <option value="resolved">Resolvidos</option>
          </select>
        </div>

        <div>
          <label
            className="text-sm font-semibold text-foreground mb-2 block"
            htmlFor="urgency"
          >
            Urgência
          </label>
          <select
            className="h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
            defaultValue={filters.urgency}
            id="urgency"
            name="urgency"
          >
            <option value="all">Todas as prioridades</option>
            <option value="urgent">Apenas Urgentes</option>
            <option value="normal">Apenas Normais</option>
          </select>
        </div>

        <Button type="submit" size="md" className="w-full sm:w-auto">
          Filtrar
        </Button>

        <Button variant="outline" size="md" href="/admin" className="w-full sm:w-auto">
          Limpar
        </Button>
      </div>
    </form>
  );
}
