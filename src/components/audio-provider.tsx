"use client";

import * as React from "react";
import { useSettings } from "@/components/settings-provider";

type SoundName = "click" | "hover" | "toggle" | "open" | "type" | "success";

interface SoundConfig {
  freq: number;
  duration: number;
  type: OscillatorType;
  sweep?: number;
  volume?: number;
}

const SOUNDS: Record<SoundName, SoundConfig> = {
  click:   { freq: 880, duration: 0.06, type: "square", volume: 0.05 },
  hover:   { freq: 1200, duration: 0.03, type: "sine", volume: 0.025 },
  toggle:  { freq: 660, duration: 0.12, type: "triangle", sweep: 2, volume: 0.06 },
  open:    { freq: 320, duration: 0.18, type: "sawtooth", sweep: 2.5, volume: 0.06 },
  type:    { freq: 1400, duration: 0.02, type: "square", volume: 0.015 },
  success: { freq: 540, duration: 0.22, type: "sine", sweep: 1.8, volume: 0.07 },
};

interface AudioContextState {
  enabled: boolean;
  toggle: () => void;
  play: (name?: SoundName) => void;
}

const AudioCtx = React.createContext<AudioContextState | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const settings = useSettings();
  const enabled = settings.sound;
  const ctxRef = React.useRef<AudioContext | null>(null);

  const ensureCtx = React.useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      if (!AC) return null;
      ctxRef.current = new AC();
    }
    if (ctxRef.current.state === "suspended") {
      void ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const play = React.useCallback(
    (name: SoundName = "click") => {
      if (!enabled) return;
      const ctx = ensureCtx();
      if (!ctx) return;
      const cfg = SOUNDS[name];

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = cfg.type;
      osc.frequency.setValueAtTime(cfg.freq, ctx.currentTime);
      if (cfg.sweep) {
        osc.frequency.exponentialRampToValueAtTime(
          cfg.freq * cfg.sweep,
          ctx.currentTime + cfg.duration,
        );
      }

      const vol = cfg.volume ?? 0.05;
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + cfg.duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + cfg.duration);
    },
    [enabled, ensureCtx],
  );

  // Synchronise le toggle avec le SettingsProvider
  const toggle = React.useCallback(() => {
    settings.toggle("sound");
    if (!enabled) ensureCtx();
  }, [enabled, ensureCtx, settings]);

  const value = React.useMemo(
    () => ({ enabled, toggle, play }),
    [enabled, toggle, play],
  );

  return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>;
}

export function useAudio() {
  const ctx = React.useContext(AudioCtx);
  if (!ctx) {
    return {
      enabled: false,
      toggle: () => {},
      play: () => {},
    } as AudioContextState;
  }
  return ctx;
}
