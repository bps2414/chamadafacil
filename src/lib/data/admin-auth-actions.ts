"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  type AdminLoginState,
  validateAdminLoginForm,
} from "@/lib/validation/admin-auth";

export async function signInAdminAction(
  _prevState: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const validation = validateAdminLoginForm(formData);

  if (!validation.success) {
    return {
      email: validation.email,
      message: validation.message,
      status: "error",
    };
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: validation.data.email,
      password: validation.data.password,
    });

    if (error) {
      return {
        email: validation.data.email,
        message:
          "E-mail ou senha incorretos. Verifique suas credenciais e tente novamente.",
        status: "error",
      };
    }
  } catch {
    return {
      email: validation.data.email,
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
