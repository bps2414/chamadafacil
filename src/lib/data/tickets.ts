"use server";

import { createServiceRoleSupabaseClient } from "@/lib/supabase/service-role";
import {
  type CreateTicketField,
  type FieldErrors,
  type LookupTicketField,
  validateCreateTicketForm,
  validateLookupTicketForm,
} from "@/lib/validation/tickets";

export type TicketStatus = "open" | "in_progress" | "resolved";

export type PublicTicketResponse = {
  body: string;
  created_at: string;
  id: string;
};

export type PublicTicket = {
  created_at: string;
  description: string;
  is_urgent: boolean;
  requester_name: string;
  status: TicketStatus;
  subject: string;
  ticket_number: string;
  responses: PublicTicketResponse[];
};

export type CreateTicketState = {
  errors?: FieldErrors<CreateTicketField>;
  message?: string;
  status: "idle" | "success" | "error";
  ticketNumber?: string;
  values?: Partial<Record<CreateTicketField, string>>;
};

export type LookupTicketState = {
  errors?: FieldErrors<LookupTicketField>;
  message?: string;
  status: "idle" | "success" | "empty" | "error";
  ticket?: PublicTicket;
  values?: Partial<Record<LookupTicketField, string>>;
};

type TicketInsertResult = {
  ticket_number: string;
};

type TicketRow = {
  created_at: string;
  description: string;
  id: string;
  is_urgent: boolean;
  requester_name: string;
  status: TicketStatus;
  subject: string;
  ticket_number: string;
};

type TicketResponseRow = {
  body: string;
  created_at: string;
  id: string;
};

export async function createTicketAction(
  _prevState: CreateTicketState,
  formData: FormData,
): Promise<CreateTicketState> {
  const validation = validateCreateTicketForm(formData);
  const values = getCreateTicketValues(formData);

  if (!validation.success) {
    return {
      errors: validation.errors,
      status: "error",
      values,
    };
  }

  try {
    const supabase = createServiceRoleSupabaseClient();
    const { data, error } = await supabase
      .from("tickets")
      .insert({
        ...validation.data,
        is_urgent: false,
        resolved_at: null,
        status: "open",
      })
      .select("ticket_number")
      .single<TicketInsertResult>();

    if (error || !data) {
      return {
        message:
          "Não foi possível criar o chamado agora. Tente novamente em alguns instantes.",
        status: "error",
        values,
      };
    }

    return {
      message: "Chamado criado com sucesso.",
      status: "success",
      ticketNumber: data.ticket_number,
      values: {},
    };
  } catch {
    return {
      message:
        "A conexão com o banco não está configurada. Verifique NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY.",
      status: "error",
      values,
    };
  }
}

export async function lookupTicketAction(
  _prevState: LookupTicketState,
  formData: FormData,
): Promise<LookupTicketState> {
  const validation = validateLookupTicketForm(formData);
  const values = getLookupTicketValues(formData);

  if (!validation.success) {
    return {
      errors: validation.errors,
      status: "error",
      values,
    };
  }

  try {
    const ticket = await lookupTicket(validation.data);

    if (!ticket) {
      return {
        message:
          "Nenhum chamado foi encontrado com esse número e e-mail. Confira os dados e tente novamente.",
        status: "empty",
        values,
      };
    }

    return {
      status: "success",
      ticket,
      values,
    };
  } catch {
    return {
      message:
        "Não foi possível consultar o chamado agora. Verifique a configuração do Supabase e tente novamente.",
      status: "error",
      values,
    };
  }
}

async function lookupTicket(input: {
  requester_email: string;
  ticket_number: string;
}): Promise<PublicTicket | null> {
  const supabase = createServiceRoleSupabaseClient();
  const { data: ticket, error } = await supabase
    .from("tickets")
    .select(
      "id, ticket_number, requester_name, subject, description, status, is_urgent, created_at",
    )
    .eq("ticket_number", input.ticket_number)
    .eq("requester_email", input.requester_email)
    .maybeSingle<TicketRow>();

  if (error) {
    throw error;
  }

  if (!ticket) {
    return null;
  }

  const { data: responses, error: responsesError } = await supabase
    .from("ticket_responses")
    .select("id, body, created_at")
    .eq("ticket_id", ticket.id)
    .order("created_at", { ascending: true })
    .returns<TicketResponseRow[]>();

  if (responsesError) {
    throw responsesError;
  }

  return {
    created_at: ticket.created_at,
    description: ticket.description,
    is_urgent: ticket.is_urgent,
    requester_name: ticket.requester_name,
    responses: responses ?? [],
    status: ticket.status,
    subject: ticket.subject,
    ticket_number: ticket.ticket_number,
  };
}

function getCreateTicketValues(formData: FormData) {
  return {
    description: readString(formData, "description"),
    requester_email: readString(formData, "requester_email"),
    requester_name: readString(formData, "requester_name"),
    requester_phone: readString(formData, "requester_phone"),
    subject: readString(formData, "subject"),
  };
}

function getLookupTicketValues(formData: FormData) {
  return {
    requester_email: readString(formData, "requester_email"),
    ticket_number: readString(formData, "ticket_number").toUpperCase(),
  };
}

function readString(formData: FormData, field: string) {
  const value = formData.get(field);

  return typeof value === "string" ? value.trim() : "";
}
