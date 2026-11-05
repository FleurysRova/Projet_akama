"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Settings2,
  Sparkles,
  Waves,
  ScanLine,
  Sun,
  Radio,
  Volume2,
  Atom,
  Grid3x3,
  MousePointerClick,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSettings, type EffectKey } from "@/components/settings-provider";
import { cn } from "@/lib/utils";

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
}

interface EffectConfig {
  key: EffectKey;
  label: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const EFFECTS: EffectConfig[] = [
  {
    key: "aurora",
    label: "Aurora Neural",
    description: "Dégradés radiaux animés cyan/violet/vert, type réseau de neurones vivant.",
    icon: Waves,
    color: "text-violet-500",
  },
  {
    key: "gradientBg",
    label: "Grille de fond",
    description: "Motif grille tech subtil + halos colorés en arrière-plan.",
    icon: Grid3x3,
    color: "text-cyan-500",
  },
  {
    key: "scanlines",
    label: "Scanlines CRT",
    description: "Lignes de balayage sci-fi sur snippets code & terminal IA.",
    icon: ScanLine,
    color: "text-emerald-500",
  },
  {
    key: "glowText",
    label: "Halo Néon",
    description: "Halo lumineux dégradé sur les headlines et accents clés.",
    icon: Sun,
    color: "text-amber-500",
  },
  {
    key: "pulseLive",
    label: "Live Pulse",
    description: "Point lumineux pulsé + anneaux concentriques (badge 'online').",
    icon: Radio,
    color: "text-emerald-500",
  },
  {
    key: "particles",
    label: "Particules",
    description: "Chips flottantes décoratives autour de la photo de profil.",
    icon: Atom,
    color: "text-violet-500",
  },
  {
    key: "sound",
    label: "Sons Sci-Fi",
    description: "Micro-interactions audio synthétisées (clics, sweeps, succès).",
    icon: Volume2,
    color: "text-cyan-500",
  },
  {
    key: "smoothScroll",
    label: "Scroll fluide",
    description: "Animation de défilement douce entre les sections.",
    icon: MousePointerClick,
    color: "text-violet-500",
  },
];

export function SettingsPanel({ open, onClose }: SettingsPanelProps) {
  const settings = useSettings();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end justify-end bg-background/70 backdrop-blur-md sm:items-center sm:justify-end sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: 60, opacity: 0, scale: 0.98 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 60, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-[90vh] w-full max-w-md flex-col overflow-hidden border border-violet-500/30 bg-card shadow-2xl shadow-violet-500/20 sm:h-[85vh] sm:rounded-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/60 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-violet-500/40 bg-violet-500/10 text-violet-500">
                  <Settings2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-violet-500">
                    Paramètres IA
                  </p>
                  <h2 className="text-base font-semibold">Effets & animations</h2>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label="Fermer les paramètres"
                className="h-9 w-9"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between border-b border-border/40 bg-background/40 px-5 py-2.5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-violet-500" />
                <span className="font-mono">
                  {settings.enabledCount}/{EFFECTS.length} effets actifs
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={settings.reset}
                className="h-7 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="h-3 w-3" />
                Réinitialiser
              </Button>
            </div>

            {/* Effects list */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {EFFECTS.map((effect, i) => {
                  const isEnabled = settings[effect.key];
                  const Icon = effect.icon;
                  return (
                    <motion.div
                      key={effect.key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className={cn(
                        "group relative flex items-start gap-3 rounded-xl border p-3 transition-all",
                        isEnabled
                          ? "border-violet-500/30 bg-violet-500/5"
                          : "border-border/40 bg-background/30 opacity-70 hover:opacity-100",
                      )}
                    >
                      <div
                        className={cn(
                          "mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border transition-colors",
                          isEnabled
                            ? "border-violet-500/40 bg-violet-500/10"
                            : "border-border/60 bg-background/40",
                        )}
                      >
                        <Icon className={cn("h-4 w-4", isEnabled ? effect.color : "text-muted-foreground")} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{effect.label}</p>
                          {isEnabled && (
                            <Badge
                              variant="outline"
                              className="h-4 border-violet-500/30 bg-violet-500/10 px-1 text-[9px] font-mono text-violet-500"
                            >
                              ON
                            </Badge>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {effect.description}
                        </p>
                      </div>
                      {/* Toggle */}
                      <button
                        onClick={() => settings.toggle(effect.key)}
                        aria-label={`${isEnabled ? "Désactiver" : "Activer"} ${effect.label}`}
                        className={cn(
                          "relative mt-0.5 h-5 w-9 shrink-0 rounded-full border transition-all",
                          isEnabled
                            ? "border-violet-500/50 bg-gradient-to-r from-violet-500 to-cyan-500"
                            : "border-border/60 bg-background",
                        )}
                      >
                        <span
                          className={cn(
                            "absolute top-0.5 h-3.5 w-3.5 rounded-full bg-white shadow transition-all",
                            isEnabled ? "left-[18px]" : "left-0.5",
                          )}
                        />
                      </button>
                    </motion.div>
                  );
                })}
              </div>

              {/* Live preview indicator */}
              <div className="mt-4 rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/5 to-violet-500/5 p-3">
                <p className="font-mono text-[10px] uppercase tracking-wider text-cyan-500">
                  Aperçu en direct
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Les changements s'appliquent instantanément sur le portfolio.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-border/60 bg-background/60 px-5 py-3 backdrop-blur">
              <p className="text-center text-[10px] text-muted-foreground">
                Préférences sauvegardées localement · <span className="font-mono">localStorage</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
