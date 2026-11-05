"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Palette,
  Sparkles,
  Download,
  Mail,
  MapPin,
  Volume2,
  VolumeX,
  Zap,
  ArrowDownToLine,
  Terminal,
  Film,
  Globe2,
  Brush,
  BadgeCheck,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PROFILE, EXPERTISES } from "@/lib/profile-data";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { useAudio } from "@/components/audio-provider";
import { cn } from "@/lib/utils";

interface HeroDualProps {
  onOpenQuickView: () => void;
  onOpenTerminal: () => void;
}

export function HeroDual({ onOpenQuickView, onOpenTerminal }: HeroDualProps) {
  const { enabled: audioEnabled, toggle: toggleAudio, play } = useAudio();

  const creativeSkills = EXPERTISES.find((e) => e.id === "creative")?.skills ?? [];

  const handlePrimary = () => {
    play("open");
    onOpenTerminal();
  };

  const handleQuickView = () => {
    play("toggle");
    onOpenQuickView();
  };

  const handleDownload = () => {
    play("success");
    // Téléchargement direct du CV : on crée un lien <a> avec l'attribut
    // download pour forcer le téléchargement plutôt que l'ouverture dans un onglet.
    const link = document.createElement("a");
    link.href = PROFILE.resumeUrl;
    link.download = "CV-Elie-Tinah-Ramanjakavelosoa.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden pt-20 pb-12 sm:pt-24 md:pt-28 md:pb-24 aurora bg-grid"
    >
      {/* Floating decorative blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[8%] top-[15%] h-72 w-72 rounded-full bg-violet-500/25 blur-[100px] dark:bg-violet-500/15" />
        <div className="absolute right-[12%] top-[8%] h-80 w-80 rounded-full bg-cyan-500/20 blur-[110px] dark:bg-cyan-500/10" />
        <div className="absolute bottom-[5%] left-[45%] h-72 w-72 rounded-full bg-emerald-500/15 blur-[100px] dark:bg-emerald-500/10" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top bar with name + live status */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex flex-wrap items-center justify-between gap-3 sm:mb-8 sm:gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <ProfileAvatar size="md" alt={`${PROFILE.name} — avatar`} />
              <span className="absolute -right-1 -top-1 h-3 w-3">
                <span className="pulse-dot absolute inset-0 block h-full w-full rounded-full bg-emerald-400" />
              </span>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {PROFILE.country}
              </p>
              <p className="font-semibold leading-tight">{PROFILE.firstName} {PROFILE.lastName}</p>
            </div>
          </div>

          <Badge
            variant="outline"
            className="group flex items-center gap-2 border-emerald-500/40 bg-emerald-500/5 px-3 py-1.5 text-emerald-600 dark:text-emerald-400"
          >
            <span className="relative flex h-2 w-2">
              <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-medium">
              {PROFILE.availability}
            </span>
          </Badge>
        </motion.div>

        {/* ===== MAIN HERO : PHOTO + HEADLINE =====
             Sur mobile (par défaut) : texte d'abord (order-1), photo ensuite
             (order-2), pour que la proposition de valeur soit visible avant
             le visuel décoratif. Sur desktop (lg) : photo à droite. */}
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
          {/* Left : Name + headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="order-1 lg:order-1"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-violet-500/5 px-3 py-1 text-xs font-mono text-violet-600 dark:text-violet-300 backdrop-blur">
              <Wand2 className="h-3.5 w-3.5" />
              <span>Creative Media Specialist</span>
            </div>

            {/* ★ NAME — agrandi */}
            <h1 className="font-sans font-bold leading-[0.95] tracking-tight">
              <span
                className="block text-foreground"
                style={{ fontSize: "clamp(2.75rem, 9vw, 7rem)" }}
              >
                Elie Tinah
              </span>
              <span
                className="block text-gradient-cv"
                style={{ fontSize: "clamp(2.25rem, 7vw, 5.5rem)" }}
              >
                Ramanjakavelosoa
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-lg font-medium text-foreground sm:text-xl">
              {PROFILE.creativeTitle}
            </p>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Basé à {PROFILE.location.replace(", Madagascar", "")}, Madagascar. Je transforme
              une idée en univers visuel complet : <span className="text-violet-500 dark:text-violet-300">branding</span>,{" "}
              <span className="text-cyan-500 dark:text-cyan-300">production vidéo studio</span> et{" "}
              <span className="text-emerald-500 dark:text-emerald-300">stratégie de contenu</span>.
              Autonomie, rigueur et créativité.
            </p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <Button
                onClick={handlePrimary}
                onMouseEnter={() => play("hover")}
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-violet-500 to-cyan-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition-all hover:shadow-xl hover:shadow-cyan-500/30"
                size="lg"
              >
                <Terminal className="mr-2 h-4 w-4 transition-transform group-hover:rotate-3" />
                Assistant IA
              </Button>

              <Button
                onClick={handleQuickView}
                onMouseEnter={() => play("hover")}
                variant="outline"
                size="lg"
                className="rounded-full border-violet-500/40 bg-violet-500/5 px-6 py-2.5 text-sm font-medium text-violet-600 backdrop-blur transition-all hover:border-violet-500/70 hover:bg-violet-500/10 dark:text-violet-300"
              >
                <Zap className="mr-2 h-4 w-4" />
                Mode Recruteur
              </Button>

              <Button
                onClick={handleDownload}
                onMouseEnter={() => play("hover")}
                variant="ghost"
                size="lg"
                className="rounded-full px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <Download className="mr-2 h-4 w-4" />
                CV PDF
              </Button>

              <Button
                onClick={toggleAudio}
                onMouseEnter={() => audioEnabled && play("hover")}
                variant="ghost"
                size="icon"
                aria-label={audioEnabled ? "Couper le son" : "Activer le son"}
                className={cn(
                  "rounded-full border border-border/50 transition-all",
                  audioEnabled
                    ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-500"
                    : "text-muted-foreground",
                )}
              >
                {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
            </motion.div>

            {/* Bottom location strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-cyan-500" />
                {PROFILE.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Globe2 className="h-3.5 w-3.5 text-violet-500" />
                {PROFILE.mobility}
              </span>
              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-cyan-500"
                onMouseEnter={() => play("hover")}
              >
                <Mail className="h-3.5 w-3.5 text-emerald-500" />
                {PROFILE.email}
              </a>
            </motion.div>
          </motion.div>

          {/* Right : Photo with creative frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.15, type: "spring", damping: 18 }}
            className="order-2 mx-auto lg:order-2"
          >
            <ProfilePhoto />
          </motion.div>
        </div>

        {/* Creative profile highlight card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="group relative mt-10 overflow-hidden rounded-2xl border border-violet-500/30 bg-card/60 p-5 backdrop-blur-md transition-all hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/10 sm:p-8 sm:mt-14"
        >
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400 opacity-30 blur-3xl" />
            <div className="absolute bottom-0 right-1/3 h-32 w-32 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-400 opacity-25 blur-2xl" />
          </div>

          <div className="grid gap-5 sm:gap-6 lg:grid-cols-[auto_1fr] lg:items-center">
            {/* Left : identity */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-violet-500/40 bg-gradient-to-br from-violet-500/15 to-fuchsia-500/10 text-violet-500 sm:h-14 sm:w-14">
                <Palette className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-violet-500 sm:text-[10px]">
                  Cœur de métier · Creative Media
                </p>
                <h3 className="text-lg font-semibold leading-tight sm:text-2xl">
                  Design Graphique & Production Vidéo Studio
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                  Branding · Montage studio · Motion design · Habillage visuel
                </p>
              </div>
            </div>

            {/* Right : visual preview tiles */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Branding", grad: "from-violet-500 to-fuchsia-500", icon: Brush },
                { label: "Studio Vidéo", grad: "from-cyan-500 to-blue-500", icon: Film },
                { label: "Motion", grad: "from-emerald-500 to-teal-500", icon: Sparkles },
              ].map((tile) => (
                <div
                  key={tile.label}
                  className="group/tile relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10"
                >
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-90", tile.grad)} />
                  <div className="absolute inset-0 bg-grid opacity-40" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-2 text-white">
                    <tile.icon className="h-5 w-5 drop-shadow" />
                    <span className="text-[10px] font-medium uppercase tracking-wider">
                      {tile.label}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/0 transition-colors group-hover/tile:bg-black/20" />
                </div>
              ))}
            </div>
          </div>

          {/* Skill chips — pr sur mobile pour réserver la zone du FAB flottant */}
          <div className="mt-5 flex flex-wrap gap-1.5 pr-14 sm:mt-6 sm:gap-2 sm:pr-0">
            {creativeSkills.slice(0, 10).map((s) => (
              <Badge
                key={s}
                variant="secondary"
                className="rounded-md border border-violet-500/15 bg-violet-500/5 px-2 py-1 text-[11px] font-medium text-violet-600 dark:text-violet-300"
              >
                {s}
              </Badge>
            ))}
          </div>

          {/* Stats row — marge basse sur mobile pour dégager la zone du FAB flottant
              (FAB = 48px de haut + 20px de marge = ~68px ; on reserve 80px) */}
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border/40 pt-5 pb-20 text-center sm:pb-2">
            {[
              { icon: Brush, label: "Branding", value: "Logos & chartes", color: "text-violet-500" },
              { icon: Film, label: "Vidéo", value: "Studio & clips", color: "text-cyan-500" },
              { icon: BadgeCheck, label: "Livraison", value: "De A à Z", color: "text-emerald-500" },
            ].map((stat) => (
              <div key={stat.label}>
                <stat.icon className={cn("mx-auto mb-1 h-4 w-4", stat.color)} />
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-xs font-semibold sm:text-sm">{stat.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-8 flex justify-center sm:mt-12"
        >
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <ArrowDownToLine className="h-4 w-4 animate-bounce text-violet-500" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   ProfilePhoto — Carte profil créatif avec photo de profil
   Design : photo plein cadre + gradient néon + halo pulsé +
   anneau rotatif + badges LIVE + overlay nom/titre + éléments
   flottants (badges compétences, orbes, étincelles) autour de la photo.
   Fallback automatique sur les initiales "ET" si la photo
   est absente ou en erreur de chargement.
   ============================================================ */

// Données des badges flottants (position + couleur + icône + label + délai)
const FLOATING_BADGES = [
  { id: "brand", pos: "top-right", icon: Brush, label: "Brand", color: "violet", delay: 0 },
  { id: "motion", pos: "right-mid", icon: Film, label: "Motion", color: "cyan", delay: 0.6 },
  { id: "studio", pos: "bottom-right", icon: Wand2, label: "Studio", color: "emerald", delay: 1.2 },
  { id: "4k", pos: "left-mid", icon: Sparkles, label: "4K", color: "violet", delay: 0.9 },
] as const;

const COLOR_STYLES: Record<string, { border: string; text: string; glow: string; bg: string }> = {
  violet: {
    border: "border-violet-500/40",
    text: "text-violet-300",
    glow: "bg-violet-500/30",
    bg: "bg-slate-950/80",
  },
  cyan: {
    border: "border-cyan-500/40",
    text: "text-cyan-300",
    glow: "bg-cyan-500/30",
    bg: "bg-slate-950/80",
  },
  emerald: {
    border: "border-emerald-500/40",
    text: "text-emerald-300",
    glow: "bg-emerald-500/30",
    bg: "bg-slate-950/80",
  },
};

// Positions des badges flottants (absolues par rapport au conteneur photo)
// Sur mobile : à l'intérieur des bords de la photo (pour éviter l'overflow)
// Sur desktop (sm+) : à l'extérieur (effet de débordement esthétique)
// "bottom-right" placé plus haut (~30%) pour ne pas chevaucher le caption "Madagascar 🇲🇬".
const POS_CLASSES: Record<string, string> = {
  "top-right": "right-2 top-[12%] sm:-right-3",
  "right-mid": "right-2 top-[42%] sm:top-1/2 sm:-right-4",
  "bottom-right": "right-2 bottom-[30%] sm:bottom-[18%] sm:-right-3",
  "left-mid": "left-2 top-[42%] sm:top-1/2 sm:-left-4",
};

function ProfilePhoto() {
  const [photoError, setPhotoError] = React.useState(false);

  return (
    <div className="group relative h-72 w-60 sm:h-80 sm:w-64 lg:h-96 lg:w-80">
      {/* Glow halo */}
      <div className="pointer-events-none absolute -inset-4 -z-10 rounded-full bg-gradient-to-br from-violet-500/40 via-cyan-500/30 to-emerald-500/20 opacity-60 blur-2xl transition-all duration-500 group-hover:scale-110 group-hover:opacity-100" />

      {/* Rotating gradient ring */}
      <div className="absolute -inset-2 -z-10 rounded-3xl bg-gradient-to-br from-violet-500 via-cyan-500 to-emerald-500 opacity-70 blur-md transition-all duration-700 group-hover:scale-110 group-hover:opacity-100 group-hover:rotate-2" />

      {/* Photo container — photo plein cadre + overlay sci-fi */}
      <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-slate-950 via-violet-950/40 to-slate-950 shadow-2xl">
        {/* Background photo (or fallback gradient + initials) */}
        {photoError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-grid p-6">
            <div className="bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.25),transparent_60%)] absolute inset-0" />
            <div className="relative grid h-28 w-28 place-items-center rounded-full border-2 border-violet-500/40 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 backdrop-blur-sm sm:h-36 sm:w-36">
              <div className="absolute inset-0 rounded-full border border-cyan-500/30 [mask-image:linear-gradient(transparent_25%,black_50%,transparent_75%)]" />
              <span
                className="text-gradient-cv font-mono font-bold leading-none"
                style={{ fontSize: "clamp(2.5rem, 7vw, 3.5rem)" }}
              >
                ET
              </span>
            </div>
            <p className="text-xs font-semibold text-white sm:text-sm">Ramanjakavelosoa</p>
          </div>
        ) : (
          <Image
            src={PROFILE.avatarUrl}
            alt={PROFILE.avatarAlt}
            onError={() => setPhotoError(true)}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 256px, 240px"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-125 group-hover:rotate-1"
            priority
          />
        )}

        {/* Scanline overlay (sci-fi feel) */}
        <div className="pointer-events-none absolute inset-0 scanlines opacity-20" />

        {/* Inner rotating ring (decorative frame) */}
        <div className="pointer-events-none absolute inset-3 rounded-2xl border border-cyan-500/20 [mask-image:linear-gradient(transparent_25%,black_50%,transparent_75%)]" />

        {/* Top badge — LIVE status */}
        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-slate-950/70 px-2.5 py-1 text-[10px] font-mono text-emerald-400 backdrop-blur-md">
          <span className="relative flex h-1.5 w-1.5">
            <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          LIVE
        </div>

        {/* Bottom gradient + name overlay — visible sur mobile ET desktop.
            Affiche "Creative Media Specialist / Madagascar 🇲🇬" en bas de
            la photo avec un dégradé pour la lisibilité. */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent p-3 pt-8 sm:p-4 sm:pt-10">
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-violet-300 sm:text-[10px]">
            Creative Media Specialist
          </p>
          <p className="text-xs font-semibold text-white sm:text-sm sm:text-base">
            Madagascar 🇲🇬
          </p>
        </div>
      </div>

      {/* ===== Éléments flottants décoratifs (badges + orbes + étincelles) =====
          Visibles sur mobile ET desktop. Sur mobile : à l'intérieur des bords
          de la photo (tailles réduites) ; sur desktop (sm+) : à l'extérieur
          (effet de débordement esthétique). Animent en Y avec des délais
          différents pour créer un effet parallaxe. */}

      {/* Badges de compétences flottants */}
      {FLOATING_BADGES.map((badge) => {
        const colors = COLOR_STYLES[badge.color];
        const Icon = badge.icon;
        return (
          <motion.div
            key={badge.id}
            className={cn(
              "pointer-events-none absolute z-20",
              POS_CLASSES[badge.pos],
            )}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -10, 0],
            }}
            transition={{
              opacity: { duration: 0.4, delay: 0.2 + badge.delay },
              scale: { duration: 0.4, delay: 0.2 + badge.delay },
              y: {
                duration: 4 + badge.delay * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: badge.delay,
              },
            }}
          >
            <div
              className={cn(
                "relative flex items-center gap-1 rounded border bg-slate-950/80 px-1.5 py-1 font-mono text-[8px] font-medium backdrop-blur-md sm:gap-1.5 sm:rounded-lg sm:px-2.5 sm:py-1.5 sm:text-[10px]",
                colors.border,
                colors.text,
              )}
            >
              {/* Halo glow derrière le badge */}
              <span
                className={cn(
                  "absolute -inset-1 -z-10 rounded opacity-50 blur-md sm:rounded-lg",
                  colors.glow,
                )}
              />
              <Icon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              <span className="uppercase tracking-wider">{badge.label}</span>
            </div>
          </motion.div>
        );
      })}

      {/* Orbes flottants (petits cercles colorés) — visibles sur mobile aussi,
          positionnés à l'intérieur des bords de la photo */}
      {[
        { pos: "top-1 left-1/3 sm:-top-3", color: "bg-violet-400", size: "h-1.5 w-1.5 sm:h-2 sm:w-2", delay: 0.3 },
        { pos: "bottom-1 right-1/3 sm:-bottom-3", color: "bg-cyan-400", size: "h-1.5 w-1.5 sm:h-1.5 sm:w-1.5", delay: 1.5 },
        { pos: "top-[35%] left-1 sm:top-[35%] sm:-left-2", color: "bg-emerald-400", size: "h-1.5 w-1.5 sm:h-2 sm:w-2", delay: 2 },
      ].map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          className={cn("pointer-events-none absolute z-20 rounded-full", orb.pos, orb.color, orb.size)}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}

      {/* Étincelles (Sparkles) flottantes — visibles sur mobile aussi */}
      {[
        { pos: "top-[15%] right-1 sm:top-[15%] sm:-right-2", delay: 0.5 },
        { pos: "bottom-[12%] left-1 sm:bottom-[12%] sm:-left-2", delay: 1.8 },
      ].map((spark, i) => (
        <motion.div
          key={`spark-${i}`}
          className={cn("pointer-events-none absolute z-20 text-violet-300", spark.pos)}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 90, 180],
            y: [0, -12, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: spark.delay,
          }}
        >
          <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
        </motion.div>
      ))}
    </div>
  );
}
