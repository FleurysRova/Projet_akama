"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  compact?: boolean;
}

export function ThemeToggle({ className, compact = false }: ThemeToggleProps) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "relative rounded-full border border-border/60 bg-background/40 backdrop-blur",
          compact ? "h-8 w-8" : "h-10 w-10",
          className,
        )}
        aria-label="Chargement du thème…"
      >
        <span className="sr-only">Chargement du thème</span>
      </Button>
    );
  }

  const isDark = theme === "dark";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "group relative overflow-hidden rounded-full border border-border/60 bg-background/40 backdrop-blur transition-all hover:border-cyan-500/50 hover:bg-cyan-500/5",
            compact ? "h-8 w-8" : "h-10 w-10",
            className,
          )}
          aria-label="Basculer le thème clair/sombre"
        >
          <Sun
            className={cn(
              "h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all duration-500",
              isDark ? "-rotate-90 scale-0" : "rotate-0 scale-100 text-amber-500",
            )}
          />
          <Moon
            className={cn(
              "absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all duration-500",
              isDark ? "rotate-0 scale-100 text-cyan-400" : "rotate-90 scale-0",
            )}
          />
          <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:shadow-[inset_0_0_12px_rgba(6,182,212,0.35)]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[10rem] border-border/60 bg-popover/95 backdrop-blur-md"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={cn(
            "cursor-pointer gap-2",
            theme === "light" && "bg-amber-500/10 text-amber-600 dark:text-amber-400",
          )}
        >
          <Sun className="h-4 w-4" /> Clair
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={cn(
            "cursor-pointer gap-2",
            theme === "dark" && "bg-cyan-500/10 text-cyan-500",
          )}
        >
          <Moon className="h-4 w-4" /> Sombre
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={cn(
            "cursor-pointer gap-2",
            theme === "system" && "bg-violet-500/10 text-violet-500",
          )}
        >
          <Monitor className="h-4 w-4" /> Système
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
