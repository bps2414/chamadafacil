"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { AdminLoginState } from "@/lib/validation/admin-auth";

export async function signInAdminAction(
  _prevState: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const email = readString(formData, "email").toLowerCase();
  const password = readString(formData, "password");

  if (!email || !password) {
    return {
      email,
      message: "Informe e-mail e senha para acessar a área administrativa.",
      status: "error",
    };
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        email,
        message:
          "E-mail ou senha incorretos. Verifique suas credenciais e tente novamente.",
        status: "error",
      };
    }
  } catch {
    return {
      email,
      message:
        "Não foi possível conectar ao Supabase. Verifique as variáveis de ambiente.",
      status: "error",
    };
  }

  revalidatePath("/admin", "layout");
  redirect("/admin");
}

export async function signOutAdminAction() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();

  revalidatePath("/admin", "layout");
  redirect("/admin/login");
}

function readString(formData: FormData, field: string) {
  const value = formData.get(field);

  return typeof value === "string" ? value.trim() : "";
}
