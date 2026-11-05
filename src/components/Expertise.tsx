"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Palette,
  TrendingUp,
  Check,
  type LucideIcon,
} from "lucide-react";
import { EXPERTISES, type ExpertiseBlock } from "@/lib/profile-data";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  code: Code2,
  palette: Palette,
  "trending-up": TrendingUp,
};

const COLOR_STYLES: Record<
  ExpertiseBlock["color"],
  { ring: string; bg: string; text: string; border: string; glow: string; check: string }
> = {
  cyan: {
    ring: "ring-cyan-500/30",
    bg: "bg-cyan-500/10",
    text: "text-cyan-500 dark:text-cyan-300",
    border: "border-cyan-500/30",
    glow: "group-hover:shadow-cyan-500/20",
    check: "text-cyan-500",
  },
  violet: {
    ring: "ring-violet-500/30",
    bg: "bg-violet-500/10",
    text: "text-violet-500 dark:text-violet-300",
    border: "border-violet-500/30",
    glow: "group-hover:shadow-violet-500/20",
    check: "text-violet-500",
  },
  green: {
    ring: "ring-emerald-500/30",
    bg: "bg-emerald-500/10",
    text: "text-emerald-500 dark:text-emerald-300",
    border: "border-emerald-500/30",
    glow: "group-hover:shadow-emerald-500/20",
    check: "text-emerald-500",
  },
};

export function Expertise() {
  return (
    <section
      id="expertises"
      className="relative border-t border-border/40 py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-cyan-500">
            ./expertises
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Trois pôles, <span className="text-gradient-cv">un talent</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
            De l'architecture logicielle au branding vidéo studio, en passant
            par la stratégie digitale internationale — un profil complet.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {EXPERTISES.map((exp, i) => {
            const Icon = ICONS[exp.icon];
            const styles = COLOR_STYLES[exp.color];
            return (
              <motion.article
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border bg-card/60 p-6 backdrop-blur-md transition-all hover:shadow-xl sm:p-7",
                  styles.border,
                  styles.glow,
                )}
              >
                <div
                  className={cn(
                    "pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-2xl transition-transform duration-700 group-hover:scale-125",
                    styles.bg,
                  )}
                />

                <div className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <div
                      className={cn(
                        "grid h-12 w-12 place-items-center rounded-xl border ring-1 ring-inset",
                        styles.border,
                        styles.bg,
                        styles.text,
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <span
                      className={cn(
                        "font-mono text-[10px] uppercase tracking-[0.25em]",
                        styles.text,
                      )}
                    >
                      {String(i + 1).padStart(2, "0")} · {exp.label}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold leading-tight">
                    {exp.title}
                  </h3>
                  <p className={cn("mt-1 font-mono text-xs", styles.text)}>
                    {exp.tagline}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {exp.description}
                  </p>

                  <ul className="mt-5 space-y-3">
                    {exp.highlights.map((h) => (
                      <li key={h.title} className="flex items-start gap-2.5">
                        <Check
                          className={cn("mt-0.5 h-4 w-4 shrink-0", styles.check)}
                        />
                        <div>
                          <p className="text-sm font-medium">{h.title}</p>
                          <p className="text-xs text-muted-foreground">{h.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className={cn(
                          "rounded-md border px-2 py-0.5 text-[11px] font-medium",
                          styles.border,
                          styles.bg,
                          styles.text,
                        )}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
