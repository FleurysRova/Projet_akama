"use client";

import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";

/**
 * SettingsProvider — panneau de configuration IA interactif
 *
 * Permet à l'utilisateur d'activer/désactiver en direct les effets IA
 * du portfolio. Les préférences sont persistées en localStorage.
 *
 * Note : l'état initial est lu via un lazy initializer (sans effet),
 * ce qui évite les cascades de rendu tout en respectant l'hydration SSR.
 */

export type EffectKey =
  | "aurora"        // Dégradés radiaux animés (réseau de neurones)
  | "scanlines"     // Lignes de balayage CRT sci-fi
  | "glowText"      // Halo lumineux néon sur les headlines
  | "pulseLive"     // Point lumineux pulsé "live status"
  | "sound"         // Micro-interactions audio sci-fi
  | "particles"     // Particules flottantes décoratives
  | "gradientBg"    // Grille & aurora en fond
  | "smoothScroll"; // Scroll fluide

interface SettingsState {
  aurora: boolean;
  scanlines: boolean;
  glowText: boolean;
  pulseLive: boolean;
  sound: boolean;
  particles: boolean;
  gradientBg: boolean;
  smoothScroll: boolean;
}

interface SettingsContextValue extends SettingsState {
  toggle: (key: EffectKey) => void;
  set: (key: EffectKey, value: boolean) => void;
  reset: () => void;
  enabledCount: number;
}

const DEFAULTS: SettingsState = {
  aurora: true,
  scanlines: true,
  glowText: true,
  pulseLive: true,
  sound: false, // désactivé par défaut (besure UX)
  particles: true,
  gradientBg: true,
  smoothScroll: true,
};

const STORAGE_KEY = "elie-portfolio-settings";

const SettingsContext = createContext<SettingsContextValue | null>(null);

function loadInitial(): SettingsState {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return { ...DEFAULTS, ...JSON.parse(raw) };
    }
  } catch {
    /* ignore */
  }
  return DEFAULTS;
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  // Lazy initializer — lit localStorage une seule fois, côté client.
  // Évite le pattern `setState in useEffect` (lint react-hooks/set-state-in-effect).
  const [state, setState] = useState<SettingsState>(loadInitial);

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  // Apply settings as data-attributes on <html> (CSS reads them)
  useEffect(() => {
    const root = document.documentElement;
    (Object.keys(state) as EffectKey[]).forEach((key) => {
      root.dataset[`fx${key[0].toUpperCase()}${key.slice(1)}`] = state[key]
        ? "on"
        : "off";
    });
  }, [state]);

  // Smooth scroll
  useEffect(() => {
    document.documentElement.style.scrollBehavior = state.smoothScroll
      ? "smooth"
      : "auto";
  }, [state.smoothScroll]);

  const toggle = React.useCallback((key: EffectKey) => {
    setState((s) => ({ ...s, [key]: !s[key] }));
  }, []);

  const set = React.useCallback((key: EffectKey, value: boolean) => {
    setState((s) => ({ ...s, [key]: value }));
  }, []);

  const reset = React.useCallback(() => setState(DEFAULTS), []);

  const enabledCount = Object.values(state).filter(Boolean).length;

  const value: SettingsContextValue = {
    ...state,
    toggle,
    set,
    reset,
    enabledCount,
  };

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    // Safe fallback (e.g. before provider mounts)
    return {
      ...DEFAULTS,
      toggle: () => {},
      set: () => {},
      reset: () => {},
      enabledCount: 0,
    } as SettingsContextValue;
  }
  return ctx;
}
