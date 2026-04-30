import { createHash } from "node:crypto";
import { createServiceRoleSupabaseClient } from "@/lib/supabase/service-role";

export type PublicRateLimitKind =
  | "ticket_create_email"
  | "ticket_create_ip"
  | "ticket_lookup_email"
  | "ticket_lookup_ip";

type RateLimitConfig = {
  limit: number;
  message: string;
  windowSeconds: number;
};

type RateLimitResult =
  | { allowed: true }
  | { allowed: false; message: string };

const rateLimits: Record<PublicRateLimitKind, RateLimitConfig> = {
  ticket_create_email: {
    limit: 3,
    message:
      "Muitos chamados foram abertos com este e-mail em pouco tempo. Aguarde alguns minutos antes de tentar novamente.",
    windowSeconds: 60 * 60,
  },
  ticket_create_ip: {
    limit: 5,
    message:
      "Muitos chamados foram enviados deste acesso em pouco tempo. Aguarde alguns minutos antes de tentar novamente.",
    windowSeconds: 15 * 60,
  },
  ticket_lookup_email: {
    limit: 12,
    message:
      "Muitas consultas foram feitas para este e-mail em pouco tempo. Aguarde alguns minutos antes de tentar novamente.",
    windowSeconds: 10 * 60,
  },
  ticket_lookup_ip: {
    limit: 30,
    message:
      "Muitas consultas foram feitas deste acesso em pouco tempo. Aguarde alguns minutos antes de tentar novamente.",
    windowSeconds: 10 * 60,
  },
};

export async function checkPublicRateLimit(
  kind: PublicRateLimitKind,
  subject: string,
): Promise<RateLimitResult> {
  const config = rateLimits[kind];
  const subjectHash = hashRateLimitSubject(subject);
  const windowStart = new Date(
    Date.now() - config.windowSeconds * 1000,
  ).toISOString();

  try {
    const supabase = createServiceRoleSupabaseClient();
    const { count, error } = await supabase
      .from("public_rate_limits")
      .select("id", { count: "exact", head: true })
      .eq("event_type", kind)
      .eq("subject_hash", subjectHash)
      .gte("created_at", windowStart);

    if (error) {
      console.error("Rate limit lookup failed", {
        code: error.code,
        kind,
      });

      return {
        allowed: false,
        message:
          "Não foi possível validar a proteção contra abuso. Tente novamente em alguns instantes.",
      };
    }

    if ((count ?? 0) >= config.limit) {
      return { allowed: false, message: config.message };
    }

    const { error: insertError } = await supabase
      .from("public_rate_limits")
      .insert({
        event_type: kind,
        subject_hash: subjectHash,
      });

    if (insertError) {
      console.error("Rate limit insert failed", {
        code: insertError.code,
        kind,
      });

      return {
        allowed: false,
        message:
          "Não foi possível validar a proteção contra abuso. Tente novamente em alguns instantes.",
      };
    }

    await cleanupOldRateLimitEvents();

    return { allowed: true };
  } catch {
    return {
      allowed: false,
      message:
        "Não foi possível validar a proteção contra abuso. Verifique a configuração do Supabase.",
    };
  }
}

async function cleanupOldRateLimitEvents() {
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  try {
    const supabase = createServiceRoleSupabaseClient();
    await supabase.from("public_rate_limits").delete().lt("created_at", cutoff);
  } catch {
    // Best-effort cleanup. A failed cleanup must not block a valid request.
  }
}

function hashRateLimitSubject(subject: string) {
  return createHash("sha256")
    .update(subject.trim().toLowerCase())
    .digest("hex");
}
