"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Globe2,
  Github,
  Linkedin,
  Terminal,
  Heart,
  ArrowUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROFILE } from "@/lib/profile-data";
import { useAudio } from "@/components/audio-provider";

interface FooterProps {
  onOpenTerminal: () => void;
}

export function Footer({ onOpenTerminal }: FooterProps) {
  const { play } = useAudio();

  return (
    <footer
      id="contact"
      className="relative mt-auto border-t border-border/40 bg-card/40 backdrop-blur-md"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-30" />
      <div className="pointer-events-none absolute -bottom-20 left-1/2 -z-10 h-40 w-2/3 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative mb-10 overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-emerald-500/10 p-6 backdrop-blur-md sm:p-8"
        >
          <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-600 dark:text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {PROFILE.availability}
              </div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Construisons quelque chose{" "}
                <span className="text-gradient-cv">d'exceptionnel</span>.
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Disponible pour des missions de développement logiciel, design
                graphique, production vidéo studio et stratégie digitale —
                local ou remote à l'international.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                onClick={() => {
                  play("toggle");
                  window.location.href = `mailto:${PROFILE.email}`;
                }}
                onMouseEnter={() => play("hover")}
                className="bg-gradient-to-r from-cyan-500 to-violet-600 text-white hover:from-cyan-400 hover:to-violet-500"
              >
                <Mail className="mr-2 h-4 w-4" />
                Me contacter
              </Button>
              <Button
                onClick={() => {
                  play("open");
                  onOpenTerminal();
                }}
                variant="outline"
                className="border-violet-500/40 bg-violet-500/5 text-violet-600 dark:text-violet-300"
              >
                <Terminal className="mr-2 h-4 w-4" />
                Assistant IA
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Contact info grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-500">
              Identité
            </p>
            <p className="font-semibold">{PROFILE.name}</p>
            <p className="text-sm text-muted-foreground">{PROFILE.title}</p>
          </div>

          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-violet-500">
              Contact
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${PROFILE.email}`}
                  onMouseEnter={() => play("hover")}
                  className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-cyan-500"
                >
                  <Mail className="h-3.5 w-3.5" />
                  {PROFILE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}
                  onMouseEnter={() => play("hover")}
                  className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-cyan-500"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {PROFILE.phone}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-500">
              Localisation
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="inline-flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-emerald-500" />
                {PROFILE.location}
              </li>
              <li className="inline-flex items-center gap-2">
                <Globe2 className="h-3.5 w-3.5 text-emerald-500" />
                {PROFILE.mobility}
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-500">
              Réseaux
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                asChild
                className="h-9 w-9 border-border/60"
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
                variant="outline"
                size="icon"
                asChild
                className="h-9 w-9 border-border/60"
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
              <Button
                variant="outline"
                size="icon"
                asChild
                className="h-9 w-9 border-border/60"
              >
                <a
                  href={`mailto:${PROFILE.email}`}
                  aria-label="Email"
                  onMouseEnter={() => play("hover")}
                >
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/40 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p className="flex items-center gap-1.5">
            © {new Date().getFullYear()} {PROFILE.name}. Conçu avec
            <Heart className="h-3 w-3 fill-violet-500 text-violet-500" />
            & créativité.
          </p>
          <div className="flex items-center gap-4">
            <span className="font-mono">
              Creative Media Specialist · Madagascar 🇲🇬
            </span>
            <a
              href="#hero"
              onClick={() => play("click")}
              className="inline-flex items-center gap-1 rounded-full border border-border/60 px-3 py-1 transition-colors hover:border-violet-500/50 hover:text-violet-500"
            >
              <ArrowUp className="h-3 w-3" />
              Top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
