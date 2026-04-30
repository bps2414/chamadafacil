import type { User } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import type { TicketStatus } from "@/lib/data/tickets";
import {
  createServerSupabaseClient,
  hasSupabasePublicEnv,
} from "@/lib/supabase/server";
import {
  type AdminTicketMetaField,
  type AdminTicketResponseField,
  validateAdminTicketMetaForm,
  validateAdminTicketResponseForm,
} from "@/lib/validation/admin-tickets";
import type { FieldErrors } from "@/lib/validation/tickets";

export type AdminTicketStatusFilter = "all" | TicketStatus;
export type AdminTicketUrgencyFilter = "all" | "urgent" | "normal";

export type AdminTicketFilters = {
  status: AdminTicketStatusFilter;
  urgency: AdminTicketUrgencyFilter;
};

export type AdminTicket = {
  created_at: string;
  id: string;
  is_urgent: boolean;
  requester_name: string;
  status: TicketStatus;
  subject: string;
  ticket_number: string;
  updated_at: string;
};

export type AdminTicketDetailResponse = {
  body: string;
  created_at: string;
  id: string;
};

export type AdminTicketDetail = {
  created_at: string;
  description: string;
  id: string;
  is_urgent: boolean;
  requester_email: string;
  requester_name: string;
  requester_phone: string | null;
  resolved_at: string | null;
  responses: AdminTicketDetailResponse[];
  status: TicketStatus;
  subject: string;
  ticket_number: string;
  updated_at: string;
};

export type AdminTicketsResult =
  | { status: "success"; tickets: AdminTicket[] }
  | { message: string; status: "error" }
  | { status: "unauthorized" };

export type AdminTicketDetailResult =
  | { status: "success"; ticket: AdminTicketDetail }
  | { message: string; status: "error" }
  | { status: "not_found" }
  | { status: "unauthorized" };

export type AdminTicketMetaState = {
  errors?: FieldErrors<AdminTicketMetaField>;
  message?: string;
  status: "idle" | "success" | "error" | "unauthorized" | "not_found";
};

export type AdminTicketResponseState = {
  errors?: FieldErrors<AdminTicketResponseField>;
  message?: string;
  status: "idle" | "success" | "error" | "unauthorized" | "not_found";
};

type AdminTicketDetailRow = Omit<AdminTicketDetail, "responses">;

type AdminTicketResponseRow = {
  body: string;
  created_at: string;
  id: string;
};

type AdminTicketStatusRow = {
  resolved_at: string | null;
  status: TicketStatus;
};

const statusValues = ["open", "in_progress", "resolved"] as const;
const urgencyValues = ["urgent", "normal"] as const;

export async function getAuthenticatedAdminUser(): Promise<User | null> {
  if (!hasSupabasePublicEnv()) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

export async function listAdminTickets(
  filters: AdminTicketFilters,
): Promise<AdminTicketsResult> {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { status: "unauthorized" };
    }

    let query = supabase
      .from("tickets")
      .select(
        "id, ticket_number, requester_name, subject, status, is_urgent, created_at, updated_at",
      )
      .order("updated_at", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(50);

    if (filters.status !== "all") {
      query = query.eq("status", filters.status);
    }

    if (filters.urgency === "urgent") {
      query = query.eq("is_urgent", true);
    }

    if (filters.urgency === "normal") {
      query = query.eq("is_urgent", false);
    }

    const { data, error } = await query.returns<AdminTicket[]>();

    if (error) {
      return {
        message:
          "Não foi possível carregar os chamados. Verifique a conexão com o Supabase e tente novamente.",
        status: "error",
      };
    }

    return {
      status: "success",
      tickets: data ?? [],
    };
  } catch {
    return {
      message:
        "A conexão com o Supabase não está configurada. Confira NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY.",
      status: "error",
    };
  }
}

export async function getAdminTicketStats(): Promise<{
  total: number;
  open: number;
  in_progress: number;
  resolved: number;
} | null> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return null;
    }

    const { data, error } = await supabase.from("tickets").select("status");

    if (error || !data) {
      return null;
    }

    return data.reduce(
      (acc, ticket) => {
        acc.total++;
        if (ticket.status === "open") acc.open++;
        else if (ticket.status === "in_progress") acc.in_progress++;
        else if (ticket.status === "resolved") acc.resolved++;
        return acc;
      },
      { total: 0, open: 0, in_progress: 0, resolved: 0 }
    );
  } catch {
    return null;
  }
}

export async function getAdminTicketDetail(
  ticketId: string,
): Promise<AdminTicketDetailResult> {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { status: "unauthorized" };
    }

    const { data: ticket, error } = await supabase
      .from("tickets")
      .select(
        "id, ticket_number, requester_name, requester_email, requester_phone, subject, description, status, is_urgent, created_at, updated_at, resolved_at",
      )
      .eq("id", ticketId)
      .maybeSingle<AdminTicketDetailRow>();

    if (error) {
      return {
        message:
          "Não foi possível carregar este chamado. Verifique a conexão com o Supabase e tente novamente.",
        status: "error",
      };
    }

    if (!ticket) {
      return { status: "not_found" };
    }

    const { data: responses, error: responsesError } = await supabase
      .from("ticket_responses")
      .select("id, body, created_at")
      .eq("ticket_id", ticket.id)
      .order("created_at", { ascending: true })
      .returns<AdminTicketResponseRow[]>();

    if (responsesError) {
      return {
        message:
          "O chamado foi encontrado, mas não foi possível carregar o histórico de respostas.",
        status: "error",
      };
    }

    return {
      status: "success",
      ticket: {
        ...ticket,
        responses: responses ?? [],
      },
    };
  } catch {
    return {
      message:
        "A conexão com o Supabase não está configurada. Confira NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY.",
      status: "error",
    };
  }
}

export async function updateAdminTicketMetaAction(
  _prevState: AdminTicketMetaState,
  formData: FormData,
): Promise<AdminTicketMetaState> {
  "use server";

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

    const resolvedAt =
      validation.data.status === "resolved"
        ? currentTicket.resolved_at ?? new Date().toISOString()
        : null;

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
  "use server";

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
        message:
          "Não foi possível salvar a resposta pública. Tente novamente.",
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

export function parseAdminTicketFilters(input: {
  status?: string | string[];
  urgency?: string | string[];
}): AdminTicketFilters {
  const rawStatus = firstValue(input.status);
  const rawUrgency = firstValue(input.urgency);

  return {
    status: isTicketStatus(rawStatus) ? rawStatus : "all",
    urgency: isTicketUrgency(rawUrgency) ? rawUrgency : "all",
  };
}

function isTicketStatus(value: string): value is TicketStatus {
  return statusValues.includes(value as TicketStatus);
}

function isTicketUrgency(value: string): value is AdminTicketUrgencyFilter {
  return urgencyValues.includes(value as "urgent" | "normal");
}

function firstValue(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

function revalidateAdminTicketPaths(ticketId: string) {
  revalidatePath("/admin");
  revalidatePath(`/admin/tickets/${ticketId}`);
}
