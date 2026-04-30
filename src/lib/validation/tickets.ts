export type CreateTicketField =
  | "requester_name"
  | "requester_email"
  | "requester_phone"
  | "subject"
  | "description";

export type LookupTicketField = "ticket_number" | "requester_email";

export type FieldErrors<T extends string> = Partial<Record<T, string[]>>;

export type CreateTicketInput = {
  requester_name: string;
  requester_email: string;
  requester_phone: string | null;
  subject: string;
  description: string;
};

export type LookupTicketInput = {
  ticket_number: string;
  requester_email: string;
};

type ValidationResult<TData, TField extends string> =
  | { data: TData; success: true }
  | { errors: FieldErrors<TField>; success: false };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9\s()+.-]+$/;
const ticketNumberPattern = /^CF-\d{4}-\d{5}$/;

export function validateCreateTicketForm(
  formData: FormData,
): ValidationResult<CreateTicketInput, CreateTicketField> {
  const requesterName = readString(formData, "requester_name");
  const requesterEmail = readString(formData, "requester_email").toLowerCase();
  const requesterPhone = readString(formData, "requester_phone");
  const subject = readString(formData, "subject");
  const description = readString(formData, "description");
  const errors: FieldErrors<CreateTicketField> = {};

  if (requesterName.length < 2) {
    errors.requester_name = ["Informe seu nome com pelo menos 2 caracteres."];
  } else if (requesterName.length > 80) {
    errors.requester_name = ["O nome deve ter no máximo 80 caracteres."];
  } else if (hasUnsafeControlChars(requesterName)) {
    errors.requester_name = ["O nome contém caracteres inválidos."];
  }

  if (!requesterEmail) {
    errors.requester_email = ["Informe seu e-mail."];
  } else if (requesterEmail.length > 160) {
    errors.requester_email = ["O e-mail deve ter no máximo 160 caracteres."];
  } else if (!emailPattern.test(requesterEmail)) {
    errors.requester_email = ["Informe um e-mail válido."];
  }

  if (requesterPhone && requesterPhone.length < 8) {
    errors.requester_phone = ["Informe um telefone com pelo menos 8 caracteres."];
  } else if (requesterPhone.length > 30) {
    errors.requester_phone = ["O telefone deve ter no máximo 30 caracteres."];
  } else if (requesterPhone && !phonePattern.test(requesterPhone)) {
    errors.requester_phone = [
      "Use apenas números, espaços e os símbolos + ( ) - . no telefone.",
    ];
  }

  if (subject.length < 5) {
    errors.subject = ["Descreva o assunto com pelo menos 5 caracteres."];
  } else if (subject.length > 120) {
    errors.subject = ["O assunto deve ter no máximo 120 caracteres."];
  } else if (hasUnsafeControlChars(subject)) {
    errors.subject = ["O assunto contém caracteres inválidos."];
  }

  if (description.length < 20) {
    errors.description = ["Descreva o problema com pelo menos 20 caracteres."];
  } else if (description.length > 2000) {
    errors.description = ["A descrição deve ter no máximo 2000 caracteres."];
  } else if (hasUnsafeControlChars(description)) {
    errors.description = ["A descrição contém caracteres inválidos."];
  }

  if (Object.keys(errors).length > 0) {
    return { errors, success: false };
  }

  return {
    data: {
      requester_name: requesterName,
      requester_email: requesterEmail,
      requester_phone: requesterPhone || null,
      subject,
      description,
    },
    success: true,
  };
}

export function validateLookupTicketForm(
  formData: FormData,
): ValidationResult<LookupTicketInput, LookupTicketField> {
  const ticketNumber = normalizeTicketNumber(readString(formData, "ticket_number"));
  const requesterEmail = readString(formData, "requester_email").toLowerCase();
  const errors: FieldErrors<LookupTicketField> = {};

  if (!ticketNumber) {
    errors.ticket_number = ["Informe o número do chamado."];
  } else if (!ticketNumberPattern.test(ticketNumber)) {
    errors.ticket_number = ["Informe um número de chamado válido, como CF-2026-00001."];
  }

  if (!requesterEmail) {
    errors.requester_email = ["Informe o e-mail usado no chamado."];
  } else if (requesterEmail.length > 160) {
    errors.requester_email = ["O e-mail deve ter no máximo 160 caracteres."];
  } else if (!emailPattern.test(requesterEmail)) {
    errors.requester_email = ["Informe um e-mail válido."];
  }

  if (Object.keys(errors).length > 0) {
    return { errors, success: false };
  }

  return {
    data: {
      requester_email: requesterEmail,
      ticket_number: ticketNumber,
    },
    success: true,
  };
}

export function normalizeTicketNumber(value: string) {
  return value.trim().toUpperCase();
}

function hasUnsafeControlChars(value: string) {
  return /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(value);
}

function readString(formData: FormData, field: string) {
  const value = formData.get(field);

  return typeof value === "string" ? value.trim() : "";
}
