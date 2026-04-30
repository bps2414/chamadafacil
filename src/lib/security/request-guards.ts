import { headers } from "next/headers";

const sameOriginErrorMessage =
  "Não foi possível validar a origem da solicitação. Recarregue a página e tente novamente.";

export type RequestGuardResult =
  | { ok: true }
  | { message: string; ok: false };

export async function verifySameOriginRequest(): Promise<RequestGuardResult> {
  const headerStore = await headers();
  const origin = headerStore.get("origin");
  const host = normalizeHost(headerStore.get("host"));
  const forwardedHost = normalizeHost(headerStore.get("x-forwarded-host"));

  if (!origin) {
    return { ok: true };
  }

  try {
    const originHost = normalizeHost(new URL(origin).host);
    const expectedHosts = new Set([host, forwardedHost].filter(Boolean));

    if (originHost && expectedHosts.has(originHost)) {
      return { ok: true };
    }
  } catch {
    return { message: sameOriginErrorMessage, ok: false };
  }

  return { message: sameOriginErrorMessage, ok: false };
}

export async function getClientIpAddress() {
  const headerStore = await headers();
  const forwardedFor = headerStore.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return (
    headerStore.get("cf-connecting-ip")?.trim() ||
    headerStore.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

function normalizeHost(value: string | null) {
  return value?.split(",")[0]?.trim().toLowerCase() || "";
}
