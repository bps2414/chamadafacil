"use client";

import { useTheme } from "@/components/ui/theme-provider";
import { SunIcon, MoonIcon } from "@/components/ui/icons";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      title={isDark ? "Modo claro" : "Modo escuro"}
      className="flex items-center justify-center h-9 w-9 shrink-0 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 active:scale-95"
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
