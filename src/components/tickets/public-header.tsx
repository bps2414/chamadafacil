"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { MessageIcon, HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from "@/components/ui/icons";
import { useTheme } from "@/components/ui/theme-provider";

const links = [
  { href: "/", label: "Início", value: "home" },
  { href: "/tickets/new", label: "Abrir chamado", value: "new" },
  { href: "/tickets/lookup", label: "Consultar chamado", value: "lookup" },
  { href: "/admin/login", label: "Entrar", value: "login" },
];

interface PublicHeaderProps {
  active?: "home" | "new" | "lookup" | "login";
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      title={isDark ? "Modo claro" : "Modo escuro"}
      className="flex items-center justify-center h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 active:scale-95"
    >
      <span className="relative flex h-4 w-4">
        {/* Sun — visible in dark mode */}
        <SunIcon
          className={`absolute inset-0 h-4 w-4 transition-all duration-300 ${
            isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
          }`}
        />
        {/* Moon — visible in light mode */}
        <MoonIcon
          className={`absolute inset-0 h-4 w-4 transition-all duration-300 ${
            isDark ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
          }`}
        />
      </span>
    </button>
  );
}

export function PublicHeader({ active }: PublicHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md theme-transition">
      <Container className="flex h-16 items-center justify-between">
        <Link
          aria-label="ChamadaFácil - página inicial"
          className="inline-flex items-center gap-2 text-xl font-bold text-foreground transition-transform hover:scale-[1.02]"
          href="/"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <MessageIcon className="h-4 w-4" />
          </span>
          <span>
            Chamada<span className="text-primary">Fácil</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          aria-label="Navegação pública"
          className="hidden md:flex items-center gap-6 text-sm font-medium"
        >
          {links.map((link) => {
            const isActive = link.value === active;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative px-1 py-2 transition-colors hover:text-foreground ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
                {isActive ? (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-primary" />
                ) : (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 scale-x-0 rounded-full bg-primary/50 transition-transform duration-300 ease-out group-hover:scale-x-100 origin-left" />
                )}
              </Link>
            );
          })}

          {/* Dark mode toggle — desktop */}
          <ThemeToggle />
        </nav>

        {/* Mobile: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle />
          <button
            className="flex items-center justify-center h-10 w-10 text-muted-foreground hover:text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <CloseIcon className="h-6 w-6" /> : <HamburgerIcon className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Nav Menu */}
      <div
        className={`md:hidden grid transition-[grid-template-rows] duration-300 ease-out ${
          isMenuOpen ? "grid-rows-[1fr] border-b border-border shadow-sm" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <Container className="py-4 flex flex-col gap-3">
            {links.map((link) => {
              const isActive = link.value === active;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-base font-medium px-4 py-3 rounded-lg transition-all active:scale-[0.98] ${
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-surface-hover hover:text-foreground"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </Container>
        </div>
      </div>
    </header>
  );
}
