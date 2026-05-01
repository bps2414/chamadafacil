import { describe, expect, it } from "vitest";
import { formatRelativeAge } from "@/lib/formatters/date";

describe("formatRelativeAge", () => {
  const now = new Date("2026-05-01T12:00:00.000Z");

  it("formats recent dates in minutes", () => {
    expect(formatRelativeAge("2026-05-01T11:45:00.000Z", now)).toBe("15 min");
  });

  it("formats same-day dates in hours", () => {
    expect(formatRelativeAge("2026-05-01T09:00:00.000Z", now)).toBe("3 h");
  });

  it("formats older dates in days", () => {
    expect(formatRelativeAge("2026-04-28T12:00:00.000Z", now)).toBe("3 dias");
  });

  it("handles invalid dates", () => {
    expect(formatRelativeAge("not-a-date", now)).toBe("data indisponivel");
  });
});
