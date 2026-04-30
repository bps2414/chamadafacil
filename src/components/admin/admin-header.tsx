import Link from "next/link";
import { Container } from "@/components/ui/container";
import { signOutAdminAction } from "@/lib/data/admin-auth-actions";
import { MessageIcon, LogOutIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

type AdminHeaderProps = {
  email?: string | null;
};

export function AdminHeader({ email }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link
          aria-label="ChamadaFácil - painel administrativo"
          className="flex items-center gap-2.5 transition-transform hover:scale-[1.02]"
          href="/admin"
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

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex min-w-0 text-right">
            {email ? (
              <span className="block truncate text-sm font-medium text-foreground">
                {email}
              </span>
            ) : null}
            <span className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Admin
            </span>
          </div>
          
          <div className="h-8 w-px bg-border hidden sm:block"></div>
          
          <form action={signOutAdminAction}>
            <Button
              variant="outline"
              size="sm"
              type="submit"
              className="gap-2"
            >
              <LogOutIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </form>
        </div>
      </Container>
    </header>
  );
}
