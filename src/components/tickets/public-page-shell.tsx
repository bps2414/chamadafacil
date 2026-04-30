import type { ReactNode } from "react";
import { PublicHeader } from "./public-header";

type PublicPageShellProps = {
  active: "new" | "lookup";
  children: ReactNode;
};

export function PublicPageShell({ active, children }: PublicPageShellProps) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col theme-transition">
      <PublicHeader active={active} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
