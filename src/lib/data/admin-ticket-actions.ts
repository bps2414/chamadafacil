"use server";

import { revalidatePath } from "next/cache";
import type { TicketStatus } from "@/lib/data/tickets";
import {
  getTicketResolvedAt,
  type AdminTicketMetaState,
  type AdminTicketResponseState,
} from "@/lib/data/admin-tickets";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  validateAdminTicketMetaForm,
  validateAdminTicketResponseForm,
} from "@/lib/validation/admin-tickets";

type AdminTicketStatusRow = {
  resolved_at: string | null;
  status: TicketStatus;
};

export async function updateAdminTicketMetaAction(
  _prevState: AdminTicketMetaState,
  formData: FormData,
): Promise<AdminTicketMetaState> {
  const validation = validateAdminTicketMetaForm(formData);

  if (!validation.success) {
    return {
      errors: validation.errors,
      status: "error",
    };
  }

  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        message: "Sua sessão expirou. Entre novamente para alterar o chamado.",
        status: "unauthorized",
      };
    }

    const { data: currentTicket, error: currentTicketError } = await supabase
      .from("tickets")
      .select("status, resolved_at")
      .eq("id", validation.data.ticket_id)
      .maybeSingle<AdminTicketStatusRow>();

    if (currentTicketError) {
      return {
        message:
          "Não foi possível conferir o status atual do chamado. Tente novamente.",
        status: "error",
      };
    }

    if (!currentTicket) {
      return {
        message: "Este chamado não existe mais ou foi removido.",
        status: "not_found",
      };
    }

    const resolvedAt = getTicketResolvedAt({
      currentResolvedAt: currentTicket.resolved_at,
      now: new Date().toISOString(),
      status: validation.data.status,
    });

    const { error } = await supabase
      .from("tickets")
      .update({
        is_urgent: validation.data.is_urgent,
        resolved_at: resolvedAt,
        status: validation.data.status,
      })
      .eq("id", validation.data.ticket_id);

    if (error) {
      return {
        message:
          "Não foi possível salvar status e urgência. Verifique os dados e tente novamente.",
        status: "error",
      };
    }

    revalidateAdminTicketPaths(validation.data.ticket_id);

    return {
      message: "Status e urgência salvos.",
      status: "success",
    };
  } catch {
    return {
      message:
        "Não foi possível conectar ao Supabase. Verifique as variáveis de ambiente.",
      status: "error",
    };
  }
}

export async function createAdminTicketResponseAction(
  _prevState: AdminTicketResponseState,
  formData: FormData,
): Promise<AdminTicketResponseState> {
  const validation = validateAdminTicketResponseForm(formData);

  if (!validation.success) {
    return {
      errors: validation.errors,
      status: "error",
    };
  }

  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        message: "Sua sessão expirou. Entre novamente para responder o chamado.",
        status: "unauthorized",
      };
    }

    const { data: ticket, error: ticketError } = await supabase
      .from("tickets")
      .select("id")
      .eq("id", validation.data.ticket_id)
      .maybeSingle<{ id: string }>();

    if (ticketError) {
      return {
        message: "Não foi possível conferir o chamado antes de responder.",
        status: "error",
      };
    }

    if (!ticket) {
      return {
        message: "Este chamado não existe mais ou foi removido.",
        status: "not_found",
      };
    }

    const { error } = await supabase.from("ticket_responses").insert({
      body: validation.data.body,
      ticket_id: validation.data.ticket_id,
    });

    if (error) {
      return {
        message: "Não foi possível salvar a resposta pública. Tente novamente.",
        status: "error",
      };
    }

    revalidateAdminTicketPaths(validation.data.ticket_id);

    return {
      message: "Resposta pública adicionada ao histórico.",
      status: "success",
    };
  } catch {
    return {
      message:
        "Não foi possível conectar ao Supabase. Verifique as variáveis de ambiente.",
      status: "error",
    };
  }
}

function revalidateAdminTicketPaths(ticketId: string) {
  revalidatePath("/admin");
  revalidatePath(`/admin/tickets/${ticketId}`);
}
