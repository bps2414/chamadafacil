import { describe, expect, it } from "vitest";
import {
  validateAdminTicketMetaForm,
  validateAdminTicketResponseForm,
} from "@/lib/validation/admin-tickets";

function formData(values: Record<string, string>) {
  const form = new FormData();

  for (const [key, value] of Object.entries(values)) {
    form.set(key, value);
  }

  return form;
}

const validTicketId = "123e4567-e89b-42d3-a456-426614174000";

describe("validateAdminTicketMetaForm", () => {
  it("accepts valid admin metadata", () => {
    const result = validateAdminTicketMetaForm(
      formData({
        is_urgent: "on",
        status: "in_progress",
        ticket_id: validTicketId,
      }),
    );

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.is_urgent).toBe(true);
      expect(result.data.status).toBe("in_progress");
      expect(result.data.ticket_id).toBe(validTicketId);
    }
  });

  it("rejects invalid UUID", () => {
    const result = validateAdminTicketMetaForm(
      formData({
        status: "open",
        ticket_id: "not-a-uuid",
      }),
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.ticket_id).toBeDefined();
    }
  });

  it("rejects invalid status", () => {
    const result = validateAdminTicketMetaForm(
      formData({
        status: "closed",
        ticket_id: validTicketId,
      }),
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.status).toBeDefined();
    }
  });
});

describe("validateAdminTicketResponseForm", () => {
  it("accepts a valid admin response", () => {
    const result = validateAdminTicketResponseForm(
      formData({
        body: "Estamos verificando o caso.",
        ticket_id: validTicketId,
      }),
    );

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.body).toBe("Estamos verificando o caso.");
    }
  });

  it("rejects invalid UUID", () => {
    const result = validateAdminTicketResponseForm(
      formData({
        body: "Resposta valida.",
        ticket_id: "invalid",
      }),
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.ticket_id).toBeDefined();
    }
  });

  it("rejects short admin response", () => {
    const result = validateAdminTicketResponseForm(
      formData({
        body: "A",
        ticket_id: validTicketId,
      }),
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.body).toBeDefined();
    }
  });

  it("rejects unsafe admin response", () => {
    const result = validateAdminTicketResponseForm(
      formData({
        body: "Resposta\u0007invalida",
        ticket_id: validTicketId,
      }),
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.body).toBeDefined();
    }
  });
});
