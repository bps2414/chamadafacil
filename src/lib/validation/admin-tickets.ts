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

export function validateAdminTicketMetaForm(
  formData: FormData,
): ValidationResult<AdminTicketMetaInput, AdminTicketMetaField> {
  const ticketId = readString(formData, "ticket_id");
  const status = readString(formData, "status");
  const ticketStatus = isTicketStatus(status) ? status : null;
  const errors: FieldErrors<AdminTicketMetaField> = {};

  if (!ticketId) {
    errors.ticket_id = ["Chamado inválido. Volte ao dashboard e tente novamente."];
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
  }

  if (body.length < 2) {
    errors.body = ["Escreva uma resposta com pelo menos 2 caracteres."];
  } else if (body.length > 2000) {
    errors.body = ["A resposta deve ter no máximo 2000 caracteres."];
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
