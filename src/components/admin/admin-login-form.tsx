"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signInAdminAction } from "@/lib/data/admin-auth-actions";
import type { AdminLoginState } from "@/lib/validation/admin-auth";
import { AlertIcon, ArrowLeftIcon, LogInIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

const initialState: AdminLoginState = {
  status: "idle",
};

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(
    signInAdminAction,
    initialState,
  );

  return (
    <div className="w-full">
      {state.status === "error" && state.message ? (
        <div
          aria-live="polite"
          className="mb-6 flex gap-3 rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive font-medium animate-slide-up"
        >
          <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{state.message}</p>
        </div>
      ) : null}

      <form 
        action={formAction} 
        className="rounded-2xl border border-border bg-background p-6 shadow-sm sm:p-8 space-y-6"
      >
        <div>
          <label className="text-sm font-semibold text-foreground" htmlFor="email">
            E-mail
          </label>
          <input
            autoComplete="email"
            className="mt-2 h-12 w-full rounded-lg border border-border bg-background px-4 py-3 text-base shadow-sm outline-none transition-input hover:border-border/80 placeholder:text-muted-foreground/50 focus:border-ring focus:ring-1 focus:ring-ring"
            defaultValue={state.email}
            disabled={pending}
            id="email"
            name="email"
            placeholder="admin@empresa.com"
            required
            type="email"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground" htmlFor="password">
            Senha
          </label>
          <input
            autoComplete="current-password"
            className="mt-2 h-12 w-full rounded-lg border border-border bg-background px-4 py-3 text-base shadow-sm outline-none transition-input hover:border-border/80 placeholder:text-muted-foreground/50 focus:border-ring focus:ring-1 focus:ring-ring"
            disabled={pending}
            id="password"
            name="password"
            placeholder="Sua senha"
            required
            type="password"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full mt-2"
          isLoading={pending}
        >
          {!pending && <LogInIcon className="mr-2 h-5 w-5" />}
          {pending ? "Autenticando..." : "Entrar no painel"}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <Link
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          href="/"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Voltar para o site público
        </Link>
      </div>
    </div>
  );
}
