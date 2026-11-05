"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS, type Testimonial } from "@/lib/profile-data";
import { cn } from "@/lib/utils";

const COLOR_STYLES: Record<
  Testimonial["color"],
  { border: string; bg: string; text: string; star: string; glow: string }
> = {
  violet: {
    border: "border-violet-500/30",
    bg: "bg-violet-500/5",
    text: "text-violet-500 dark:text-violet-300",
    star: "text-violet-500",
    glow: "from-violet-500/20",
  },
  cyan: {
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/5",
    text: "text-cyan-500 dark:text-cyan-300",
    star: "text-cyan-500",
    glow: "from-cyan-500/20",
  },
  green: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/5",
    text: "text-emerald-500 dark:text-emerald-300",
    star: "text-emerald-500",
    glow: "from-emerald-500/20",
  },
  amber: {
    border: "border-amber-500/30",
    bg: "bg-amber-500/5",
    text: "text-amber-500 dark:text-amber-300",
    star: "text-amber-500",
    glow: "from-amber-500/20",
  },
};

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative border-t border-border/40 py-12 sm:py-20"
    >
      {/* Background decor */}
      <div className="pointer-events-none absolute -left-20 top-10 -z-10 h-60 w-60 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 -z-10 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center sm:mb-12"
        >
          <p className="mb-1 font-mono text-xs uppercase tracking-[0.25em] text-cyan-500">
            ./testimonials
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ce que disent les <span className="text-gradient-cv">clients</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            4 clients · 4 secteurs · 1 constante : une exécution créative
            rigoureuse, de A à Z.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {TESTIMONIALS.map((t, i) => {
            const colors = COLOR_STYLES[t.color];
            return (
              <motion.article
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border p-5 backdrop-blur-md transition-all hover:shadow-lg sm:p-6",
                  colors.border,
                  colors.bg,
                )}
              >
                {/* Halo glow */}
                <div
                  className={cn(
                    "pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br to-transparent opacity-30 blur-3xl transition-opacity group-hover:opacity-60",
                    colors.glow,
                  )}
                />

                {/* Quote icon */}
                <Quote
                  className={cn("mb-3 h-7 w-7 opacity-50", colors.text)}
                />

                {/* Quote text */}
                <blockquote className="relative mb-4 text-sm leading-relaxed text-foreground/90 sm:text-base">
                  « {t.quote} »
                </blockquote>

                {/* Rating */}
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={cn(
                        "h-3.5 w-3.5",
                        idx < t.rating
                          ? cn(colors.star, "fill-current")
                          : "text-muted-foreground/30",
                      )}
                    />
                  ))}
                </div>

                {/* Author */}
                <footer className="flex items-center gap-3 border-t border-border/40 pt-4">
                  {/* Avatar circle (initials) */}
                  <div
                    className={cn(
                      "grid h-10 w-10 shrink-0 place-items-center rounded-full border font-mono text-sm font-bold",
                      colors.border,
                      colors.bg,
                      colors.text,
                    )}
                  >
                    {t.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{t.author}</p>
                    <p
                      className={cn(
                        "truncate text-xs font-medium",
                        colors.text,
                      )}
                    >
                      {t.role}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {t.company}
                    </p>
                  </div>
                </footer>
              </motion.article>
            );
          })}
        </div>

        {/* Stats below */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-3 border-t border-border/40 pt-6 text-center sm:gap-6"
        >
          {[
            { value: "4.9/5", label: "Satisfaction moyenne" },
            { value: "100%", label: "Clients recommandent" },
            { value: "4+", label: "Secteurs couverts" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-gradient-cv text-xl font-bold sm:text-2xl">
                {s.value}
              </p>
              <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground sm:text-xs">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;
