"use client";

/**
 * ProfileAvatar — Avatar de profil réutilisable.
 *
 * Affiche la photo `PROFILE.avatarUrl` avec un repli automatique sur les
 * initiales `PROFILE.initials` si l'image est absente ou en erreur.
 *
 * Variantes de taille :
 *   - "sm"   → 36px (header logo)
 *   - "md"   → 56px (cartes tech/recruteur)
 *   - "lg"   → 112-144px (hero créatif, grand cercle)
 *
 * L'avatar est volontairement décoratif côté ring/halo pour conserver
 * l'esthétique "IA & Automatisation" du portfolio.
 */

import * as React from "react";
import { PROFILE } from "@/lib/profile-data";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";

interface ProfileAvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: Size;
  /** Afficher l'anneau rotatif sci-fi autour de l'avatar (par défaut sur "lg"). */
  ring?: boolean;
  /** Afficher le point vert "LIVE" pulsé (par défaut sur "lg"). */
  liveDot?: boolean;
}

const SIZE_CLASS: Record<Size, string> = {
  sm: "h-9 w-9 text-[10px] rounded-lg",
  md: "h-14 w-14 text-xs rounded-xl",
  lg: "h-28 w-28 sm:h-36 sm:w-36 text-[2.5rem] sm:text-[3.5rem] rounded-full",
};

const RING_CLASS: Record<Size, string> = {
  sm: "border border-cyan-500/30",
  md: "border border-violet-500/40",
  lg: "border-2 border-violet-500/40",
};

export function ProfileAvatar({
  size = "md",
  ring = false,
  liveDot = false,
  className,
  alt = PROFILE.avatarAlt,
  ...imgProps
}: ProfileAvatarProps) {
  const [errored, setErrored] = React.useState(false);

  // Common container classes (gradient sci-fi backdrop)
  const containerClasses = cn(
    "relative grid place-items-center overflow-hidden bg-gradient-to-br from-slate-950 via-violet-950/40 to-slate-950 font-mono font-bold leading-none text-gradient-cv",
    SIZE_CLASS[size],
    RING_CLASS[size],
    className,
  );

  return (
    <div className={containerClasses}>
      {/* Image — fallback to initials on error */}
      {!errored && (
        <img
          src={PROFILE.avatarUrl}
          alt={alt}
          onError={() => setErrored(true)}
          className="absolute inset-0 h-full w-full object-cover"
          {...imgProps}
        />
      )}
      {errored && (
        <span aria-hidden className="relative">{PROFILE.initials}</span>
      )}

      {/* Subtle inner ring */}
      {ring && (
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-cyan-500/30 [mask-image:linear-gradient(transparent_25%,black_50%,transparent_75%)]" />
      )}

      {/* Live dot */}
      {liveDot && (
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)]">
          <span className="pulse-dot absolute inset-0 block h-full w-full rounded-full bg-emerald-400" />
        </span>
      )}
    </div>
  );
}

export default ProfileAvatar;
