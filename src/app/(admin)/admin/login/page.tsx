import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { Container } from "@/components/ui/container";
import { getAuthenticatedAdminUser } from "@/lib/data/admin-tickets";
import { MessageIcon, LockIcon } from "@/components/ui/icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Login admin",
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
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
            
            {/* Left side: Value proposition */}
            <div className="hidden lg:flex flex-col justify-center space-y-8 pr-8">
              <div>
                <h1 className="text-4xl font-bold tracking-tight mb-4">
                  Painel de Controle
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Gerencie todas as solicitações de suporte em um único lugar. Acompanhe, priorize e resolva chamados com eficiência.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MessageIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Acompanhe chamados</h3>
                    <p className="text-sm text-muted-foreground mt-1">Visualize todas as solicitações recebidas em um só lugar.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <LockIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Organize prioridades</h3>
                    <p className="text-sm text-muted-foreground mt-1">Classifique tickets por urgência para atender quem mais precisa.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Login Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0 bg-background p-8 rounded-2xl border border-border shadow-sm">
              <section className="text-center mb-8 lg:hidden">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Acesso Restrito
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Área exclusiva para operadores.
                </p>
              </section>

              <section className="text-center mb-8 hidden lg:block">
                <h2 className="text-2xl font-bold tracking-tight">
                  Acesso Restrito
                </h2>
              </section>

              <AdminLoginForm />

              <div className="mt-8 rounded-xl border border-border bg-surface-hover p-4 text-xs text-muted-foreground text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1.5">
                  <LockIcon className="h-3.5 w-3.5 text-primary" />
                  <span className="font-semibold text-foreground">Acesso Seguro</span>
                </div>
                <p>
                  Esta área é restrita a pessoas autorizadas.
                </p>
              </div>
            </div>

          </div>
        </Container>
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground animate-fade-in">
        © {new Date().getFullYear()} ChamadaFácil. Todos os direitos reservados.
      </footer>
    </div>
  );
}
