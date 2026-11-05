"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Gamepad2,
  Trophy,
  Sparkles,
  Cpu,
  type LucideIcon,
} from "lucide-react";
import { EDUCATION, INTERESTS } from "@/lib/profile-data";

const INTEREST_ICONS: Record<string, LucideIcon> = {
  gamepad: Gamepad2,
  trophy: Trophy,
  sparkles: Sparkles,
  cpu: Cpu,
};

export function EducationInterests() {
  return (
    <section className="relative border-t border-border/40 py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-cyan-500">
              ./education
            </p>
            <h2 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">
              Formation <span className="text-gradient-cv">& certifications</span>
            </h2>
            <div className="relative space-y-4 before:absolute before:left-[18px] before:top-2 before:h-full before:w-px before:bg-gradient-to-b before:from-cyan-500/50 before:via-violet-500/50 before:to-transparent">
              {EDUCATION.map((edu, i) => (
                <motion.div
                  key={edu.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative pl-12"
                >
                  <div className="absolute left-0 top-1 grid h-9 w-9 place-items-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-500">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <div className="rounded-xl border border-border/60 bg-card/60 p-4 backdrop-blur-md">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-cyan-500">
                      {edu.period}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold">{edu.title}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">{edu.place}</p>
                    <p className="mt-2 text-xs text-muted-foreground/90">{edu.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Interests */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-violet-500">
              ./interests
            </p>
            <h2 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">
              Centres <span className="text-gradient-cv">d'intérêt</span>
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {INTERESTS.map((interest, i) => {
                const Icon = INTEREST_ICONS[interest.icon] ?? Sparkles;
                return (
                  <motion.div
                    key={interest.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    whileHover={{ y: -4 }}
                    className="group relative overflow-hidden rounded-xl border border-border/60 bg-card/60 p-4 backdrop-blur-md transition-colors hover:border-violet-500/40"
                  >
                    <div className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-violet-500/10 blur-2xl transition-opacity group-hover:bg-violet-500/20" />
                    <Icon className="relative h-5 w-5 text-violet-500" />
                    <p className="relative mt-3 text-sm font-medium">{interest.label}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Extra: Tech philosophy */}
            <div className="mt-6 rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/5 to-violet-500/5 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-500">
                Philosophy
              </p>
              <p className="mt-2 text-sm font-medium leading-relaxed">
                <span className="text-gradient-cv">"L'autonomie, la rigueur et la créativité"</span>
                <span className="text-muted-foreground">
                  {" "}— trois piliers pour orchestrer des projets multimédias de A à Z,
                  qu'il s'agisse de logiciels, de branding ou de stratégie digitale.
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
