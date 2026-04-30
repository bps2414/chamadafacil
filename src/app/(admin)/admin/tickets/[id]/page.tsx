import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import {
  AdminTicketDetail,
  AdminTicketDetailError,
  AdminTicketDetailSkeleton,
  AdminTicketNotFound,
} from "@/components/admin/admin-ticket-detail";
import { Container } from "@/components/ui/container";
import {
  createAdminTicketResponseAction,
  getAdminTicketDetail,
  getAuthenticatedAdminUser,
  updateAdminTicketMetaAction,
} from "@/lib/data/admin-tickets";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Detalhe do chamado",
  description: "Gerenciamento protegido de um chamado no ChamadaFácil.",
};

type AdminTicketDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminTicketDetailPage({
  params,
}: AdminTicketDetailPageProps) {
  const { id } = await params;
  const user = await getAuthenticatedAdminUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <AdminHeader email={user.email} />

      <main className="py-6 sm:py-8">
        <Container>
          <Suspense fallback={<AdminTicketDetailSkeleton />}>
            <AdminTicketDetailPanel ticketId={id} />
          </Suspense>
        </Container>
      </main>
    </div>
  );
}

async function AdminTicketDetailPanel({ ticketId }: { ticketId: string }) {
  const result = await getAdminTicketDetail(ticketId);

  if (result.status === "unauthorized") {
    redirect("/admin/login");
  }

  if (result.status === "not_found") {
    return <AdminTicketNotFound />;
  }

  if (result.status === "error") {
    return <AdminTicketDetailError message={result.message} />;
  }

  return (
    <AdminTicketDetail
      createResponseAction={createAdminTicketResponseAction}
      ticket={result.ticket}
      updateMetaAction={updateAdminTicketMetaAction}
    />
  );
}
