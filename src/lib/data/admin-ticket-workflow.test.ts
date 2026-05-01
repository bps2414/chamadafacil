import { describe, expect, it } from "vitest";
import {
  getTicketResolvedAt,
  parseAdminTicketFilters,
} from "@/lib/data/admin-ticket-workflow";

describe("getTicketResolvedAt", () => {
  it("keeps current resolved_at when ticket remains resolved", () => {
    expect(
      getTicketResolvedAt({
        currentResolvedAt: "2026-04-30T10:00:00.000Z",
        now: "2026-05-01T10:00:00.000Z",
        status: "resolved",
      }),
    ).toBe("2026-04-30T10:00:00.000Z");
  });

  it("uses now when ticket becomes resolved for the first time", () => {
    expect(
      getTicketResolvedAt({
        currentResolvedAt: null,
        now: "2026-05-01T10:00:00.000Z",
        status: "resolved",
      }),
    ).toBe("2026-05-01T10:00:00.000Z");
  });

  it("clears resolved_at when ticket is not resolved", () => {
    expect(
      getTicketResolvedAt({
        currentResolvedAt: "2026-04-30T10:00:00.000Z",
        now: "2026-05-01T10:00:00.000Z",
        status: "open",
      }),
    ).toBeNull();
  });
});

describe("parseAdminTicketFilters", () => {
  it("returns defaults for empty input", () => {
    expect(parseAdminTicketFilters({})).toEqual({
      query: "",
      response: "all",
      sort: "updated_desc",
      status: "all",
      urgency: "all",
    });
  });

  it("keeps valid filters and trims query", () => {
    expect(
      parseAdminTicketFilters({
        query: "  CF-2026  ",
        response: "unanswered",
        sort: "urgent_first",
        status: "in_progress",
        urgency: "urgent",
      }),
    ).toEqual({
      query: "CF-2026",
      response: "unanswered",
      sort: "urgent_first",
      status: "in_progress",
      urgency: "urgent",
    });
  });

  it("falls back to defaults for invalid filter values", () => {
    expect(
      parseAdminTicketFilters({
        response: "pending",
        sort: "random",
        status: "closed",
        urgency: "critical",
      }),
    ).toEqual({
      query: "",
      response: "all",
      sort: "updated_desc",
      status: "all",
      urgency: "all",
    });
  });

  it("uses the first value from repeated search params", () => {
    expect(
      parseAdminTicketFilters({
        query: [" primeiro ", "segundo"],
        response: ["answered", "unanswered"],
        sort: ["created_asc", "updated_desc"],
        status: ["resolved", "open"],
        urgency: ["normal", "urgent"],
      }),
    ).toEqual({
      query: "primeiro",
      response: "answered",
      sort: "created_asc",
      status: "resolved",
      urgency: "normal",
    });
  });

  it("limits query length", () => {
    expect(parseAdminTicketFilters({ query: "x".repeat(100) }).query).toHaveLength(
      80,
    );
  });
});
