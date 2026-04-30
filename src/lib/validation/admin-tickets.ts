import type { TicketStatus } from "@/lib/data/tickets";
import type { FieldErrors } from "@/lib/validation/tickets";

export type AdminTicketMetaField = "ticket_id" | "status" | "is_urgent";
export type AdminTicketResponseField = "ticket_id" | "body";

export type AdminTicketMetaInput = {
  is_urgent: boolean;
  status: TicketStatus;
  ticket_id: string;
};

export type AdminTicketResponseInput = {
  body: string;
  ticket_id: string;
};

type ValidationResult<TData, TField extends string> =
  | { data: TData; success: true }
  | { errors: FieldErrors<TField>; success: false };

const statusValues = ["open", "in_progress", "resolved"] as const;
const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function validateAdminTicketMetaForm(
  formData: FormData,
): ValidationResult<AdminTicketMetaInput, AdminTicketMetaField> {
  const ticketId = readString(formData, "ticket_id");
  const status = readString(formData, "status");
  const ticketStatus = isTicketStatus(status) ? status : null;
  const errors: FieldErrors<AdminTicketMetaField> = {};

  if (!ticketId) {
    errors.ticket_id = ["Chamado inválido. Volte ao dashboard e tente novamente."];
  } else if (!uuidPattern.test(ticketId)) {
    errors.ticket_id = ["Identificador do chamado inválido."];
  }

  if (!ticketStatus) {
    errors.status = ["Selecione um status válido para o chamado."];
  }

  if (Object.keys(errors).length > 0 || !ticketStatus) {
    return { errors, success: false };
  }

  return {
    data: {
      is_urgent: formData.get("is_urgent") === "on",
      status: ticketStatus,
      ticket_id: ticketId,
    },
    success: true,
  };
}

export function validateAdminTicketResponseForm(
  formData: FormData,
): ValidationResult<AdminTicketResponseInput, AdminTicketResponseField> {
  const ticketId = readString(formData, "ticket_id");
  const body = readString(formData, "body");
  const errors: FieldErrors<AdminTicketResponseField> = {};

  if (!ticketId) {
    errors.ticket_id = ["Chamado inválido. Volte ao dashboard e tente novamente."];
  } else if (!uuidPattern.test(ticketId)) {
    errors.ticket_id = ["Identificador do chamado inválido."];
  }

  if (body.length < 2) {
    errors.body = ["Escreva uma resposta com pelo menos 2 caracteres."];
  } else if (body.length > 2000) {
    errors.body = ["A resposta deve ter no máximo 2000 caracteres."];
  } else if (hasUnsafeControlChars(body)) {
    errors.body = ["A resposta contém caracteres inválidos."];
  }

  if (Object.keys(errors).length > 0) {
    return { errors, success: false };
  }

  return {
    data: {
      body,
      ticket_id: ticketId,
    },
    success: true,
  };
}

function isTicketStatus(value: string): value is TicketStatus {
  return statusValues.includes(value as TicketStatus);
}

function readString(formData: FormData, field: string) {
  const value = formData.get(field);

  return typeof value === "string" ? value.trim() : "";
}

function hasUnsafeControlChars(value: string) {
  return /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(value);
}
