import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { Container } from "@/components/ui/container";
import { getAuthenticatedAdminUser } from "@/lib/data/admin-tickets";
import { MessageIcon, LockIcon } from "@/components/ui/icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Login admin | ChamadaFácil",
  description: "Acesso administrativo restrito do ChamadaFácil.",
};

export default async function AdminLoginPage() {
  const user = await getAuthenticatedAdminUser();

  if (user) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface-hover text-foreground">
      <header className="border-b border-border bg-background/80 backdrop-blur-xl">
        <Container className="flex h-16 items-center">
          <Link
            aria-label="ChamadaFácil - página inicial"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
            href="/"
          >
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm"
            >
              <MessageIcon className="h-4 w-4" />
            </span>
            <span className="font-bold text-foreground text-lg tracking-tight">
              Chamada<span className="text-primary">Fácil</span>
            </span>
          </Link>
        </Container>
      </header>

      <main className="flex-1 flex flex-col justify-center py-12 sm:py-20 animate-fade-in">
        <Container className="max-w-md">
          <section className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Acesso do administrador
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Área restrita para operadores de suporte.
            </p>
          </section>

          <AdminLoginForm />

          <div className="mt-8 rounded-xl border border-border bg-background p-5 text-sm text-muted-foreground text-center shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-2">
              <LockIcon className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">Acesso Seguro</span>
            </div>
            <p>
              Esta área é restrita a pessoas autorizadas. Precisa de ajuda? Fale com o administrador do sistema.
            </p>
          </div>
        </Container>
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground animate-fade-in">
        © {new Date().getFullYear()} ChamadaFácil. Todos os direitos reservados.
      </footer>
    </div>
  );
}
