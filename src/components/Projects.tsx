"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Film,
  Brush,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Calendar,
  User,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PROJECTS, type ProjectItem } from "@/lib/profile-data";
import { cn } from "@/lib/utils";

const COLOR_STYLES: Record<
  ProjectItem["color"],
  { border: string; bg: string; text: string; chip: string; gradient: string }
> = {
  violet: {
    border: "border-violet-500/30",
    bg: "bg-violet-500/10",
    text: "text-violet-500 dark:text-violet-300",
    chip: "border-violet-500/20 bg-violet-500/5 text-violet-600 dark:text-violet-300",
    gradient: "from-violet-500/15 to-fuchsia-500/5",
  },
  cyan: {
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/10",
    text: "text-cyan-500 dark:text-cyan-300",
    chip: "border-cyan-500/20 bg-cyan-500/5 text-cyan-600 dark:text-cyan-300",
    gradient: "from-cyan-500/15 to-blue-500/5",
  },
  green: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    text: "text-emerald-500 dark:text-emerald-300",
    chip: "border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-300",
    gradient: "from-emerald-500/15 to-teal-500/5",
  },
  amber: {
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    text: "text-amber-500 dark:text-amber-300",
    chip: "border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-300",
    gradient: "from-amber-500/15 to-orange-500/5",
  },
};

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "Production Vidéo": Film,
  "Design Graphique": Brush,
  "Réseaux Sociaux": TrendingUp,
  "Motion Design": Sparkles,
  "Branding & Motion": Brush,
};

export function Projects() {
  return (
    <section
      id="projects"
      className="relative border-t border-border/40 py-12 sm:py-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-30" />
      <div className="pointer-events-none absolute left-1/4 top-10 -z-10 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 bottom-10 -z-10 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center sm:mb-12"
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-violet-500">
            ./projects
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Réalisations <span className="text-gradient-cv">créatives</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
            Une sélection de projets en branding, production vidéo studio,
            motion design et stratégie de contenu — orchestrés de A à Z.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((project, i) => {
            const styles = COLOR_STYLES[project.color];
            const CatIcon = CATEGORY_ICONS[project.category] ?? Film;
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
                whileHover={{ y: -4 }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border bg-card/60 p-6 backdrop-blur-md transition-all hover:shadow-xl sm:p-7",
                  styles.border,
                  "hover:shadow-violet-500/10",
                )}
              >
                {/* Gradient backdrop */}
                <div
                  className={cn(
                    "pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br opacity-50 blur-3xl transition-opacity duration-700 group-hover:opacity-90",
                    styles.gradient,
                  )}
                />

                <div className="relative">
                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "grid h-11 w-11 place-items-center rounded-xl border",
                          styles.border,
                          styles.bg,
                          styles.text,
                        )}
                      >
                        <CatIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className={cn("font-mono text-[10px] uppercase tracking-[0.2em]", styles.text)}>
                          {project.category}
                        </p>
                        <h3 className="text-base font-semibold leading-tight sm:text-lg">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-md border border-border/60 bg-background/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                      {project.year}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      {project.client}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {project.year}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mb-4 text-sm text-muted-foreground/90">
                    {project.description}
                  </p>

                  {/* Deliverables */}
                  <div className="mb-4">
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      Livrables
                    </p>
                    <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                      {project.deliverables.map((d) => (
                        <li
                          key={d}
                          className="flex items-start gap-1.5 text-xs"
                        >
                          <CheckCircle2 className={cn("mt-0.5 h-3 w-3 shrink-0", styles.text)} />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer : tags + metrics */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/40 pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className={cn(
                            "rounded-md border px-2 py-0.5 text-[10px] font-medium",
                            styles.chip,
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.metrics && (
                      <div className="flex items-center gap-3">
                        {project.metrics.map((m) => (
                          <div key={m.label} className="text-center">
                            <p className={cn("font-mono text-sm font-bold", styles.text)}>
                              {m.value}
                            </p>
                            <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                              {m.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Hover indicator */}
                <div className="pointer-events-none absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <ChevronRight className={cn("h-4 w-4", styles.text)} />
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-500/5 to-cyan-500/5 p-5 text-center"
        >
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">+ d'autres projets en cours</span>{" "}
            — chaque production est orchestrée de A à Z : conception, tournage, montage,
            habillage visuel et livraison multi-plateformes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
