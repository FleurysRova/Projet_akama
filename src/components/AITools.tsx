"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Film,
  Music,
  Wand2,
  Palette,
  Cpu,
  Zap,
  Settings2,
  Waves,
  ScanLine,
  Sun,
  Radio,
  type LucideIcon,
} from "lucide-react";
import { AI_TOOLS, AI_EFFECTS, type AITool } from "@/lib/profile-data";
import { useSettings } from "@/components/settings-provider";
import { useAudio } from "@/components/audio-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ICONS: Record<AITool["icon"], LucideIcon> = {
  sparkles: Sparkles,
  film: Film,
  music: Music,
  wand: Wand2,
  palette: Palette,
};

const COLOR_STYLES: Record<
  AITool["color"],
  { border: string; bg: string; text: string }
> = {
  violet: {
    border: "border-violet-500/30",
    bg: "bg-violet-500/10",
    text: "text-violet-500 dark:text-violet-300",
  },
  cyan: {
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/10",
    text: "text-cyan-500 dark:text-cyan-300",
  },
  green: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    text: "text-emerald-500 dark:text-emerald-300",
  },
  amber: {
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    text: "text-amber-500 dark:text-amber-300",
  },
};

export function AITools({ onOpenSettings }: { onOpenSettings?: () => void }) {
  const settings = useSettings();
  const { play } = useAudio();
  return (
    <section
      id="ai-tools"
      className="relative border-t border-border/40 py-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-40" />
      <div className="pointer-events-none absolute left-1/3 top-0 -z-10 h-72 w-72 rounded-full bg-violet-500/15 blur-[100px]" />
      <div className="pointer-events-none absolute right-1/3 bottom-0 -z-10 h-72 w-72 rounded-full bg-cyan-500/15 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-cyan-500">
            ./ai-powered-workflow
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Outils <span className="text-gradient-cv">IA</span> & effets créatifs
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
            L'intelligence artificielle est intégrée à chaque étape du workflow
            créatif — de la génération de visuels au montage studio, en passant
            par les voix off et l'upscaling 4K.
          </p>
        </motion.div>

        {/* AI Tools grid */}
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AI_TOOLS.map((tool, i) => {
            const styles = COLOR_STYLES[tool.color];
            const Icon = ICONS[tool.icon];
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                whileHover={{ y: -4 }}
                className={cn(
                  "group relative overflow-hidden rounded-xl border bg-card/60 p-5 backdrop-blur-md transition-all hover:shadow-lg",
                  styles.border,
                )}
              >
                <div
                  className={cn(
                    "pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full opacity-30 blur-2xl transition-opacity group-hover:opacity-60",
                    styles.bg,
                  )}
                />

                <div className="relative">
                  <div
                    className={cn(
                      "mb-3 inline-grid h-10 w-10 place-items-center rounded-lg border",
                      styles.border,
                      styles.bg,
                      styles.text,
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className={cn("font-mono text-[10px] uppercase tracking-wider", styles.text)}>
                    {tool.category}
                  </p>
                  <h3 className="mt-1 text-base font-semibold">{tool.name}</h3>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {tool.description}
                  </p>
                  <div className="mt-3 border-t border-border/40 pt-3">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      Use case
                    </p>
                    <p className="mt-0.5 text-xs font-medium">{tool.useCase}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Workflow stages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur-md sm:p-8"
        >
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.25em] text-violet-500">
            Workflow créatif augmenté par IA
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Idéation & Moodboard",
                desc: "Génération de concepts visuels par IA (Midjourney, Stable Diffusion) pour explorer rapidement des directions créatives.",
                icon: Sparkles,
                color: "text-violet-500",
              },
              {
                step: "02",
                title: "Production & Tournage",
                desc: "Tournage studio + génération vidéo IA (Runway ML) pour des plans expérimentaux et des effets impossibles autrement.",
                icon: Film,
                color: "text-cyan-500",
              },
              {
                step: "03",
                title: "Montage & Post-prod",
                desc: "Montage DaVinci Resolve + Magic Mask IA, suppression automatique de fills (Descript), sous-titres auto.",
                icon: Wand2,
                color: "text-amber-500",
              },
              {
                step: "04",
                title: "Audio & Upscaling",
                desc: "Voix off ElevenLabs, upscaling 4K/60fps Topaz Video AI, mastering final pour livraison multi-plateformes.",
                icon: Music,
                color: "text-emerald-500",
              },
            ].map((stage) => (
              <div
                key={stage.step}
                className="relative rounded-xl border border-border/40 bg-background/40 p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <stage.icon className={cn("h-5 w-5", stage.color)} />
                  <span className="font-mono text-xs text-muted-foreground">
                    {stage.step}
                  </span>
                </div>
                <h3 className="text-sm font-semibold">{stage.title}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Effets & paramètres IA — panneau de configuration interactif */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-500/5 via-cyan-500/5 to-emerald-500/5 p-6 backdrop-blur-md sm:p-8">
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />

            <div className="relative mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-violet-500/30 bg-violet-500/10 text-violet-500">
                  <Cpu className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-violet-500">
                    Paramètres & effets IA
                  </p>
                  <h3 className="text-lg font-semibold sm:text-xl">
                    Personnalisez l'expérience en direct
                  </h3>
                </div>
              </div>

              <Button
                onClick={() => {
                  play("toggle");
                  onOpenSettings?.();
                }}
                onMouseEnter={() => play("hover")}
                className="bg-gradient-to-r from-violet-500 to-cyan-600 text-white hover:from-violet-400 hover:to-cyan-500"
                size="sm"
              >
                <Settings2 className="mr-2 h-4 w-4" />
                Ouvrir les paramètres
              </Button>
            </div>

            <p className="relative mb-5 text-sm text-muted-foreground">
              Ce portfolio est lui-même augmenté par IA. Activez ou désactivez
              chaque effet en direct — les changements s'appliquent instantanément
              et sont sauvegardés localement.
            </p>

            {/* Live status grid */}
            <div className="relative grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { key: "aurora", label: "Aurora Neural", icon: Waves },
                { key: "scanlines", label: "Scanlines CRT", icon: ScanLine },
                { key: "glowText", label: "Halo Néon", icon: Sun },
                { key: "pulseLive", label: "Live Pulse", icon: Radio },
              ].map((eff) => {
                const isOn = settings[eff.key as keyof typeof settings] as boolean;
                const Icon = eff.icon;
                return (
                  <div
                    key={eff.key}
                    className={cn(
                      "flex items-center gap-2 rounded-lg border px-3 py-2 transition-colors",
                      isOn
                        ? "border-violet-500/30 bg-violet-500/5"
                        : "border-border/40 bg-background/30 opacity-60",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-3.5 w-3.5",
                        isOn ? "text-violet-500" : "text-muted-foreground",
                      )}
                    />
                    <span className="flex-1 text-xs font-medium">{eff.label}</span>
                    <span
                      className={cn(
                        "font-mono text-[10px] font-bold",
                        isOn ? "text-violet-500" : "text-muted-foreground",
                      )}
                    >
                      {isOn ? "ON" : "OFF"}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Quick stats */}
            <div className="relative mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border/40 pt-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-violet-500" />
                <span className="font-mono">
                  {settings.enabledCount} effets actifs
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 text-cyan-500" />
                <span className="font-mono">{AI_EFFECTS.length} effets disponibles</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                <span>Préférences persistantes</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
