"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, Zap, Github, Linkedin, Mail, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PROFILE } from "@/lib/profile-data";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { useAudio } from "@/components/audio-provider";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onOpenTerminal: () => void;
  onOpenQuickView: () => void;
  onOpenSettings: () => void;
}

const NAV_ITEMS = [
  { label: "Profil", href: "#about" },
  { label: "Expertises", href: "#expertises" },
  { label: "Projets", href: "#projects" },
  { label: "Outils IA", href: "#ai-tools" },
  { label: "Compétences", href: "#skills" },
  { label: "Langues", href: "#languages" },
  { label: "Contact", href: "#contact" },
];

export function Header({ onOpenTerminal, onOpenQuickView, onOpenSettings }: HeaderProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { play } = useAudio();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href="#hero"
          onClick={() => play("click")}
          className="group flex items-center gap-2"
        >
          <ProfileAvatar size="sm" alt={`${PROFILE.name} — avatar`} />

          <div className="hidden sm:block">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Portfolio
            </p>
            <p className="-mt-0.5 text-xs font-semibold leading-tight">
              {PROFILE.firstName} {PROFILE.lastName}
            </p>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onMouseEnter={() => play("hover")}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hidden h-9 w-9 sm:flex"
          >
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              onMouseEnter={() => play("hover")}
            >
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hidden h-9 w-9 sm:flex"
          >
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              onMouseEnter={() => play("hover")}
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </Button>

          <ThemeToggle compact />

          <Button
            onClick={() => {
              play("toggle");
              onOpenSettings();
            }}
            onMouseEnter={() => play("hover")}
            variant="ghost"
            size="icon"
            aria-label="Paramètres IA & effets"
            className="h-9 w-9 rounded-full border border-violet-500/30 text-violet-500 hover:border-violet-500/60 hover:bg-violet-500/10"
          >
            <Settings2 className="h-4 w-4" />
          </Button>

          <Button
            onClick={() => {
              play("toggle");
              onOpenQuickView();
            }}
            onMouseEnter={() => play("hover")}
            variant="outline"
            size="sm"
            className="hidden h-9 gap-1.5 border-violet-500/40 bg-violet-500/5 text-violet-600 hover:bg-violet-500/10 dark:text-violet-300 lg:flex"
          >
            <Zap className="h-3.5 w-3.5" />
            Mode Recruteur
          </Button>

          <Button
            onClick={() => {
              play("open");
              onOpenTerminal();
            }}
            onMouseEnter={() => play("hover")}
            size="sm"
            className="h-9 gap-1.5 bg-gradient-to-r from-cyan-500 to-violet-600 text-white hover:from-cyan-400 hover:to-violet-500"
          >
            <Terminal className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">IA Assistant</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-md md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    setMenuOpen(false);
                    play("click");
                  }}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-2 flex gap-2">
                <Button
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenQuickView();
                  }}
                  variant="outline"
                  size="sm"
                  className="flex-1 border-violet-500/40 bg-violet-500/5 text-violet-600 dark:text-violet-300"
                >
                  <Zap className="mr-1.5 h-3.5 w-3.5" /> Recruteur
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <a href={`mailto:${PROFILE.email}`}>
                    <Mail className="mr-1.5 h-3.5 w-3.5" /> Email
                  </a>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
