import { describe, expect, it } from "vitest";
import {
  normalizeTicketNumber,
  validateCreateTicketForm,
  validateLookupTicketForm,
} from "@/lib/validation/tickets";

function formData(values: Record<string, string>) {
  const form = new FormData();

  for (const [key, value] of Object.entries(values)) {
    form.set(key, value);
  }

  return form;
}

const validCreateTicketInput = {
  description: "A impressora da recepcao parou de imprimir documentos.",
  requester_email: "cliente@example.com",
  requester_name: "Maria",
  requester_phone: "+55 11 99999-9999",
  subject: "Impressora parada",
};

describe("validateCreateTicketForm", () => {
  it("accepts a valid public ticket request", () => {
    const result = validateCreateTicketForm(formData(validCreateTicketInput));

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.requester_email).toBe("cliente@example.com");
      expect(result.data.requester_phone).toBe("+55 11 99999-9999");
    }
  });

  it("rejects invalid email", () => {
    const result = validateCreateTicketForm(
      formData({ ...validCreateTicketInput, requester_email: "cliente" }),
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.requester_email).toBeDefined();
    }
  });

  it("rejects short name", () => {
    const result = validateCreateTicketForm(
      formData({ ...validCreateTicketInput, requester_name: "M" }),
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.requester_name).toBeDefined();
    }
  });

  it("rejects invalid phone characters", () => {
    const result = validateCreateTicketForm(
      formData({ ...validCreateTicketInput, requester_phone: "11 abc def" }),
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.requester_phone).toBeDefined();
    }
  });

  it("rejects short subject", () => {
    const result = validateCreateTicketForm(
      formData({ ...validCreateTicketInput, subject: "Oi" }),
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.subject).toBeDefined();
    }
  });

  it("rejects short description", () => {
    const result = validateCreateTicketForm(
      formData({ ...validCreateTicketInput, description: "Muito curto" }),
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.description).toBeDefined();
    }
  });
});

describe("validateLookupTicketForm", () => {
  it("normalizes ticket number and email", () => {
    const result = validateLookupTicketForm(
      formData({
        requester_email: " Cliente@Example.COM ",
        ticket_number: " cf-2026-00001 ",
      }),
    );

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.ticket_number).toBe("CF-2026-00001");
      expect(result.data.requester_email).toBe("cliente@example.com");
    }
  });

  it("rejects invalid ticket number", () => {
    const result = validateLookupTicketForm(
      formData({
        requester_email: "cliente@example.com",
        ticket_number: "ABC-1",
      }),
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.ticket_number).toBeDefined();
    }
  });

  it("rejects invalid lookup email", () => {
    const result = validateLookupTicketForm(
      formData({
        requester_email: "cliente",
        ticket_number: "CF-2026-00001",
      }),
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.requester_email).toBeDefined();
    }
  });
});

describe("normalizeTicketNumber", () => {
  it("trims and uppercases ticket numbers", () => {
    expect(normalizeTicketNumber(" cf-2026-00001 ")).toBe("CF-2026-00001");
  });
});
