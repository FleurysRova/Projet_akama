"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  GitBranch,
  Cpu,
  Code2,
  Boxes,
  Palette,
  Film,
  Brush,
  Layers,
  Megaphone,
  Globe2,
  ShoppingBag,
  Camera,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAudio } from "@/components/audio-provider";
import { cn } from "@/lib/utils";

interface SkillGroup {
  title: string;
  icon: LucideIcon;
  color: "cyan" | "violet" | "green";
  skills: { name: string; icon: LucideIcon }[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Informatique & Tech",
    icon: Cpu,
    color: "cyan",
    skills: [
      { name: "Développement d'applications", icon: Code2 },
      { name: "Logiques logicielles", icon: GitBranch },
      { name: "Algorithmique", icon: Cpu },
      { name: "Outils de création numérique", icon: Boxes },
      { name: "Versioning (Git)", icon: GitBranch },
    ],
  },
  {
    title: "Design & Vidéo",
    icon: Palette,
    color: "violet",
    skills: [
      { name: "Création de logo", icon: Brush },
      { name: "Design graphique", icon: Palette },
      { name: "Branding", icon: Layers },
      { name: "Montage vidéo studio", icon: Film },
      { name: "Production de clips", icon: Camera },
      { name: "Habillage visuel", icon: Film },
    ],
  },
  {
    title: "Stratégie Digitale",
    icon: Megaphone,
    color: "green",
    skills: [
      { name: "TikTok", icon: Megaphone },
      { name: "Instagram", icon: Megaphone },
      { name: "Facebook", icon: Megaphone },
      { name: "YouTube", icon: Camera },
      { name: "Sourcing international", icon: Globe2 },
      { name: "E-commerce", icon: ShoppingBag },
    ],
  },
];

const COLOR_MAP = {
  cyan: {
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/5",
    text: "text-cyan-500 dark:text-cyan-300",
    hoverBg: "hover:bg-cyan-500/10",
  },
  violet: {
    border: "border-violet-500/30",
    bg: "bg-violet-500/5",
    text: "text-violet-500 dark:text-violet-300",
    hoverBg: "hover:bg-violet-500/10",
  },
  green: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/5",
    text: "text-emerald-500 dark:text-emerald-300",
    hoverBg: "hover:bg-emerald-500/10",
  },
};

export function Skills() {
  const { play } = useAudio();

  // Marquee items (all skills flat)
  const marqueeItems = SKILL_GROUPS.flatMap((g) =>
    g.skills.map((s) => ({ name: s.name, color: g.color })),
  );
  const doubled = [...marqueeItems, ...marqueeItems];

  return (
    <section
      id="skills"
      className="relative border-t border-border/40 py-12 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center sm:mb-12"
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-violet-500">
            ./skills
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Stack <span className="text-gradient-cv">complète</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
            Compétences techniques, créatives et stratégiques — prêtes pour des
            projets de bout en bout.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {SKILL_GROUPS.map((group, i) => {
            const styles = COLOR_MAP[group.color];
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={cn(
                  "relative overflow-hidden rounded-2xl border bg-card/60 p-6 backdrop-blur-md",
                  styles.border,
                )}
              >
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className={cn(
                      "grid h-11 w-11 place-items-center rounded-xl border",
                      styles.border,
                      styles.bg,
                      styles.text,
                    )}
                  >
                    <group.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold">{group.title}</h3>
                </div>

                <ul className="space-y-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      onMouseEnter={() => play("hover")}
                      className={cn(
                        "group/item flex items-center gap-3 rounded-lg border border-transparent px-3 py-2 transition-all",
                        styles.hoverBg,
                        "hover:border-current/10",
                      )}
                    >
                      <skill.icon className={cn("h-4 w-4 shrink-0", styles.text)} />
                      <span className="text-sm font-medium">{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Marquee */}
        <div className="relative mt-12 overflow-hidden rounded-xl border border-border/40 bg-card/40 py-3">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
          <div className="marquee-track flex w-max items-center gap-3">
            {doubled.map((item, i) => (
              <Badge
                key={`${item.name}-${i}`}
                variant="outline"
                className={cn(
                  "shrink-0 px-3 py-1 text-xs font-medium",
                  COLOR_MAP[item.color].border,
                  COLOR_MAP[item.color].bg,
                  COLOR_MAP[item.color].text,
                )}
              >
                {item.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
