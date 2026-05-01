import type { TicketStatus } from "@/lib/data/tickets";

export type AdminTicketStatusFilter = "all" | TicketStatus;
export type AdminTicketUrgencyFilter = "all" | "urgent" | "normal";
export type AdminTicketSortFilter =
  | "updated_desc"
  | "created_desc"
  | "created_asc"
  | "urgent_first";
export type AdminTicketResponseFilter = "all" | "answered" | "unanswered";

export type AdminTicketFilters = {
  query: string;
  response: AdminTicketResponseFilter;
  sort: AdminTicketSortFilter;
  status: AdminTicketStatusFilter;
  urgency: AdminTicketUrgencyFilter;
};

const statusValues = ["open", "in_progress", "resolved"] as const;
const urgencyValues = ["urgent", "normal"] as const;
const sortValues = [
  "updated_desc",
  "created_desc",
  "created_asc",
  "urgent_first",
] as const;
const responseValues = ["answered", "unanswered"] as const;

const maxQueryLength = 80;

export function getTicketResolvedAt(input: {
  currentResolvedAt: string | null;
  now: string;
  status: TicketStatus;
}) {
  if (input.status !== "resolved") {
    return null;
  }

  return input.currentResolvedAt ?? input.now;
}

export function parseAdminTicketFilters(input: {
  query?: string | string[];
  response?: string | string[];
  sort?: string | string[];
  status?: string | string[];
  urgency?: string | string[];
}): AdminTicketFilters {
  const rawStatus = firstValue(input.status);
  const rawUrgency = firstValue(input.urgency);
  const rawSort = firstValue(input.sort);
  const rawResponse = firstValue(input.response);
  const rawQuery = firstValue(input.query).trim();

  return {
    query: rawQuery.slice(0, maxQueryLength),
    response: isTicketResponseFilter(rawResponse) ? rawResponse : "all",
    sort: isTicketSortFilter(rawSort) ? rawSort : "updated_desc",
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

function isTicketSortFilter(value: string): value is AdminTicketSortFilter {
  return sortValues.includes(value as AdminTicketSortFilter);
}

function isTicketResponseFilter(
  value: string,
): value is AdminTicketResponseFilter {
  return responseValues.includes(value as (typeof responseValues)[number]);
}

function firstValue(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}
