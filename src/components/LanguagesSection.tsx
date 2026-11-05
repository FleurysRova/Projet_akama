"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { LANGUAGES } from "@/lib/profile-data";

export function LanguagesSection() {
  return (
    <section
      id="languages"
      className="relative border-t border-border/40 py-12 sm:py-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-40" />
      <div className="pointer-events-none absolute left-1/4 top-10 -z-10 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 bottom-10 -z-10 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center sm:mb-12"
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-emerald-500">
            ./languages
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Maîtrise <span className="text-gradient-cv">multilingue</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
            Quatre langues pour évoluer dans des environnements variés ou
            internationaux — atout clé pour les collaborations cross-border.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LANGUAGES.map((lang, i) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-md"
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
                style={{ backgroundColor: lang.color }}
              />

              <div className="relative flex items-start justify-between">
                <div
                  className="grid h-12 w-12 place-items-center rounded-xl font-mono text-xs font-bold text-white shadow-lg"
                  style={{
                    backgroundColor: lang.color,
                    boxShadow: `0 8px 20px -8px ${lang.color}`,
                  }}
                >
                  {lang.flag}
                </div>
                {lang.percent === 100 && (
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                )}
              </div>

              <h3 className="relative mt-4 text-base font-semibold">{lang.name}</h3>
              <p className="relative text-xs text-muted-foreground">{lang.level}</p>
              <p className="relative mt-0.5 font-mono text-[10px] text-muted-foreground/70">
                {lang.levelEn}
              </p>

              {/* Progress bar */}
              <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-border/60">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lang.percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${lang.color}, ${lang.color}aa)`,
                  }}
                />
              </div>
              <div className="relative mt-1 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                <span>{lang.percent}%</span>
                <span>{lang.percent === 100 ? "Native" : "Pro"}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
