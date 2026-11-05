"use client";

import * as React from "react";
import { Header } from "@/components/Header";
import { HeroDual } from "@/components/HeroDual";
import { About } from "@/components/About";
import { Expertise } from "@/components/Expertise";
import { Projects } from "@/components/Projects";
import { AITools } from "@/components/AITools";
import { Skills } from "@/components/Skills";
import { LanguagesSection } from "@/components/LanguagesSection";
import { EducationInterests } from "@/components/EducationInterests";
import { Footer } from "@/components/Footer";
import { AIChatbotTerminal } from "@/components/AIChatbotTerminal";
import { RecruiterQuickView } from "@/components/RecruiterQuickView";
import { AudioProvider } from "@/components/audio-provider";
import { SettingsProvider } from "@/components/settings-provider";
import { SettingsPanel } from "@/components/SettingsPanel";

export default function Home() {
  const [terminalOpen, setTerminalOpen] = React.useState(false);
  const [quickViewOpen, setQuickViewOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  const openTerminal = React.useCallback(() => setTerminalOpen(true), []);
  const closeTerminal = React.useCallback(() => setTerminalOpen(false), []);
  const openQuickView = React.useCallback(() => setQuickViewOpen(true), []);
  const closeQuickView = React.useCallback(() => setQuickViewOpen(false), []);
  const openSettings = React.useCallback(() => setSettingsOpen(true), []);
  const closeSettings = React.useCallback(() => setSettingsOpen(false), []);

  return (
    <SettingsProvider>
      <AudioProvider>
        <div className="relative flex min-h-screen flex-col bg-background">
          <Header
            onOpenTerminal={openTerminal}
            onOpenQuickView={openQuickView}
            onOpenSettings={openSettings}
          />

          <main className="flex-1">
            <HeroDual onOpenQuickView={openQuickView} onOpenTerminal={openTerminal} />
            <About />
            <Expertise />
            <Projects />
            <AITools onOpenSettings={openSettings} />
            <Skills />
            <LanguagesSection />
            <EducationInterests />
          </main>

          <Footer onOpenTerminal={openTerminal} />

          {/* Floating action buttons (mobile-friendly) */}
          <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-2">
            <FloatingSettingsButton onClick={openSettings} />
            <FloatingAssistantButton onClick={openTerminal} />
          </div>

          {/* Modals */}
          <AIChatbotTerminal open={terminalOpen} onClose={closeTerminal} />
          <RecruiterQuickView open={quickViewOpen} onClose={closeQuickView} />
          <SettingsPanel open={settingsOpen} onClose={closeSettings} />
        </div>
      </AudioProvider>
    </SettingsProvider>
  );
}

function FloatingAssistantButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Ouvrir l'assistant IA"
      className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 text-white shadow-xl shadow-cyan-500/30 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/40 active:scale-95"
    >
      <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 opacity-60 blur-md" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M12 8V4H8" />
        <rect width="16" height="12" x="4" y="8" rx="2" />
        <path d="M2 14h2" />
        <path d="M20 14h2" />
        <path d="M15 13v2" />
        <path d="M9 13v2" />
      </svg>
      <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
        <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
      </span>
    </button>
  );
}

function FloatingSettingsButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Paramètres IA & effets"
      className="flex h-11 items-center gap-2 rounded-full border border-violet-500/40 bg-card/80 px-3 text-xs font-medium text-violet-600 shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:border-violet-500/60 hover:bg-violet-500/10 dark:text-violet-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <span className="hidden sm:inline">Paramètres IA</span>
    </button>
  );
}
