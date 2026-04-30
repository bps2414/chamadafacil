import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminTicketFilters } from "@/components/admin/admin-ticket-filters";
import {
  AdminDashboardError,
  AdminDashboardSkeleton,
  AdminTicketList,
} from "@/components/admin/admin-ticket-list";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { StatCard } from "@/components/ui/stat-card";
import { DocumentIcon, MessageIcon, CheckIcon, AlertIcon } from "@/components/ui/icons";
import {
  getAuthenticatedAdminUser,
  listAdminTickets,
  getAdminTicketStats,
  parseAdminTicketFilters,
  type AdminTicketFilters as AdminTicketFiltersType,
} from "@/lib/data/admin-tickets";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Painel admin",
  description: "Fila protegida de chamados do ChamadaFácil.",
};

type AdminPageProps = {
  searchParams: Promise<{
    status?: string | string[];
    urgency?: string | string[];
  }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const filters = parseAdminTicketFilters(await searchParams);
  const user = await getAuthenticatedAdminUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <AdminHeader email={user?.email} />

      <main className="flex-1 py-8 sm:py-10">
        <Container>
          <SectionHeader
            title="Chamados"
            description="Acompanhe a fila de suporte com os chamados mais recentes no topo."
            className="animate-fade-in"
          />

          <Suspense fallback={<div className="h-[104px] animate-pulse bg-muted/50 rounded-xl mb-8" />}>
            <AdminStatsRow />
          </Suspense>

          <div className="mt-8 animate-slide-up animate-delay-150">
            <AdminTicketFilters filters={filters} />
          </div>

          <div className="mt-6 animate-slide-up animate-delay-300">
            <Suspense
              fallback={<AdminDashboardSkeleton />}
              key={`${filters.status}-${filters.urgency}`}
            >
              <AdminTicketsPanel filters={filters} />
            </Suspense>
          </div>
        </Container>
      </main>
    </div>
  );
}

async function AdminStatsRow() {
  const stats = await getAdminTicketStats();

  if (!stats) return null;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-slide-up animate-delay-75">
      <StatCard
        title="Total de Chamados"
        value={stats.total}
        icon={<DocumentIcon className="h-5 w-5" />}
      />
      <StatCard
        title="Em Aberto"
        value={stats.open}
        icon={<AlertIcon className="h-5 w-5 text-warning" />}
      />
      <StatCard
        title="Em Andamento"
        value={stats.in_progress}
        icon={<MessageIcon className="h-5 w-5 text-primary" />}
      />
      <StatCard
        title="Resolvidos"
        value={stats.resolved}
        icon={<CheckIcon className="h-5 w-5 text-success" />}
      />
    </div>
  );
}

async function AdminTicketsPanel({
  filters,
}: {
  filters: AdminTicketFiltersType;
}) {
  const result = await listAdminTickets(filters);

  if (result.status === "unauthorized") {
    redirect("/admin/login");
  }

  if (result.status === "error") {
    return <AdminDashboardError message={result.message} />;
  }

  return <AdminTicketList filters={filters} tickets={result.tickets} />;
}
