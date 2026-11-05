"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Sparkles, MapPin, Calendar, Globe2 } from "lucide-react";
import { PROFILE } from "@/lib/profile-data";

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-border/40 py-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-50" />
      <div className="pointer-events-none absolute -left-20 top-10 -z-10 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 -z-10 h-60 w-60 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="mb-1 font-mono text-xs uppercase tracking-[0.25em] text-cyan-500">
              ./about
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Profil <span className="text-gradient-cv">professionnel</span>
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/5 px-3 py-1.5 text-xs text-violet-600 dark:text-violet-300">
            <Sparkles className="h-3.5 w-3.5" />
            Creative Media Specialist
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-md sm:p-8">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 blur-2xl" />
              <p className="relative text-lg leading-relaxed text-foreground/90 sm:text-xl">
                {PROFILE.profileSummary}
              </p>
              <p className="relative mt-4 text-base text-muted-foreground">
                Doté d'une excellente capacité d'adaptation et d'une maîtrise
                multilingue pour produire des contenus créatifs à l'international.
                Mon approche :{" "}
                <span className="font-semibold text-violet-500">créativité</span>,{" "}
                <span className="font-semibold text-cyan-500">autonomie</span> et{" "}
                <span className="font-semibold text-emerald-500">rigueur</span>.
              </p>
            </div>
          </motion.div>

          {/* Identity card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div className="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-md">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Identity
              </p>
              <dl className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500" />
                  <div>
                    <dt className="text-xs text-muted-foreground">Localisation</dt>
                    <dd className="font-medium">{PROFILE.location}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />
                  <div>
                    <dt className="text-xs text-muted-foreground">Mobilité</dt>
                    <dd className="font-medium">{PROFILE.mobility}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <div>
                    <dt className="text-xs text-muted-foreground">Né le</dt>
                    <dd className="font-medium">{PROFILE.birthdate}</dd>
                  </div>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Live Status
                </span>
              </div>
              <p className="text-sm font-medium text-foreground">
                {PROFILE.availability}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Réponse rapide aux sollicitations professionnelles.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
