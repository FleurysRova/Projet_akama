"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  Mail,
  MapPin,
  Globe2,
  Languages as LanguagesIcon,
  Sparkles,
  Clock,
  Phone,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  Calendar,
  Printer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PROFILE, LANGUAGES, EXPERTISES } from "@/lib/profile-data";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { useAudio } from "@/components/audio-provider";

interface RecruiterQuickViewProps {
  open: boolean;
  onClose: () => void;
}

export function RecruiterQuickView({ open, onClose }: RecruiterQuickViewProps) {
  const { play } = useAudio();

  React.useEffect(() => {
    if (open) {
      const t = setTimeout(() => play("open"), 80);
      return () => clearTimeout(t);
    }
  }, [open, play]);

  const handleDownload = () => {
    play("success");
    // Téléchargement direct du CV via <a download>
    const link = document.createElement("a");
    link.href = PROFILE.resumeUrl;
    link.download = "CV-Elie-Tinah-Ramanjakavelosoa.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    play("toggle");
    // Lance l'impression navigateur (l'utilisateur peut "Save as PDF")
    // Le print CSS masque tout sauf le modal via la classe `print:print-only`
    window.print();
  };

  const handleContact = () => {
    play("toggle");
    window.location.href = `mailto:${PROFILE.email}`;
  };

  const techSkills = EXPERTISES.find((e) => e.id === "tech")?.skills ?? [];
  const creativeSkills = EXPERTISES.find((e) => e.id === "creative")?.skills ?? [];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 backdrop-blur-md sm:items-center sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="recruiter-print relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl border border-violet-500/30 bg-card shadow-2xl shadow-violet-500/20 sm:rounded-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/60 bg-card/95 px-5 py-4 backdrop-blur-md sm:px-7">
              <div className="flex items-center gap-3">
                <ProfileAvatar size="md" alt={`${PROFILE.name} — avatar`} />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-violet-500">
                    Quick-View · 30 sec
                  </p>
                  <h2 className="text-base font-semibold">Synthèse Recruteur</h2>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  play("toggle");
                  onClose();
                }}
                aria-label="Fermer"
                className="h-9 w-9"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-6 p-5 sm:p-7">
              {/* Identity */}
              <section>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <Briefcase className="h-4 w-4 text-cyan-500" />
                  Identité
                </h3>
                <div className="rounded-xl border border-border/60 bg-background/40 p-4">
                  <div className="flex items-center gap-3">
                    <ProfileAvatar size="md" alt={`${PROFILE.name} — avatar`} className="shrink-0" />
                    <div className="min-w-0">
                      <p className="text-lg font-semibold leading-tight truncate">{PROFILE.name}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground truncate">{PROFILE.title}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-cyan-500" />
                      {PROFILE.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Globe2 className="h-3.5 w-3.5 text-violet-500" />
                      {PROFILE.mobility}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-emerald-500" />
                      Né le {PROFILE.birthdate}
                    </span>
                  </div>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/5 px-2.5 py-1 text-xs text-emerald-600 dark:text-emerald-400">
                    <span className="relative flex h-2 w-2">
                      <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    {PROFILE.availability}
                  </div>
                </div>
              </section>

              {/* Key skills (chips) */}
              <section>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <Sparkles className="h-4 w-4 text-violet-500" />
                  Points clés
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-cyan-500">
                      Tech
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {techSkills.slice(0, 5).map((s) => (
                        <Badge
                          key={s}
                          variant="outline"
                          className="border-cyan-500/30 bg-cyan-500/5 px-2 py-0.5 text-[11px] text-cyan-600 dark:text-cyan-300"
                        >
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-violet-500">
                      Créatif
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {creativeSkills.slice(0, 5).map((s) => (
                        <Badge
                          key={s}
                          variant="outline"
                          className="border-violet-500/30 bg-violet-500/5 px-2 py-0.5 text-[11px] text-violet-600 dark:text-violet-300"
                        >
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Languages */}
              <section>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <LanguagesIcon className="h-4 w-4 text-emerald-500" />
                  Langues
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {LANGUAGES.map((lang) => (
                    <div
                      key={lang.name}
                      className="flex items-center gap-2.5 rounded-lg border border-border/60 bg-background/40 p-2.5"
                    >
                      <span
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-md font-mono text-[10px] font-bold text-white"
                        style={{ backgroundColor: lang.color }}
                      >
                        {lang.flag}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium">{lang.name}</p>
                        <p className="truncate text-[10px] text-muted-foreground">
                          {lang.level}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Education */}
              <section>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <GraduationCap className="h-4 w-4 text-cyan-500" />
                  Formation
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2.5 rounded-lg border border-border/60 bg-background/40 p-2.5">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-500" />
                    <p className="text-xs">
                      <span className="font-medium">Baccalauréat Scientifique (Série S)</span>
                      <span className="text-muted-foreground"> · Madagascar</span>
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5 rounded-lg border border-border/60 bg-background/40 p-2.5">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-500" />
                    <p className="text-xs">
                      <span className="font-medium">Certifications Informatique & Multimédia</span>
                      <span className="text-muted-foreground"> · Formation continue</span>
                    </p>
                  </div>
                </div>
              </section>

              {/* Contact quick row */}
              <section className="rounded-xl border border-border/60 bg-gradient-to-br from-cyan-500/5 to-violet-500/5 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <Clock className="h-4 w-4 text-cyan-500" />
                  Contact en 1 clic
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <a
                    href={`mailto:${PROFILE.email}`}
                    onMouseEnter={() => play("hover")}
                    className="flex items-center gap-2 rounded-lg border border-border/60 bg-card px-3 py-2 text-xs transition-all hover:border-cyan-500/40 hover:bg-cyan-500/5"
                  >
                    <Mail className="h-3.5 w-3.5 text-cyan-500" />
                    <span className="truncate">{PROFILE.email}</span>
                  </a>
                  <a
                    href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}
                    onMouseEnter={() => play("hover")}
                    className="flex items-center gap-2 rounded-lg border border-border/60 bg-card px-3 py-2 text-xs transition-all hover:border-violet-500/40 hover:bg-violet-500/5"
                  >
                    <Phone className="h-3.5 w-3.5 text-violet-500" />
                    <span className="truncate">{PROFILE.phone}</span>
                  </a>
                </div>
              </section>
            </div>

            {/* Sticky CTA footer */}
            <div className="sticky bottom-0 z-10 flex flex-wrap gap-2 border-t border-border/60 bg-card/95 px-5 py-3 backdrop-blur-md sm:px-7">
              <Button
                onClick={handleDownload}
                onMouseEnter={() => play("hover")}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-violet-600 text-white hover:from-cyan-400 hover:to-violet-500"
              >
                <Download className="mr-2 h-4 w-4" />
                CV PDF
              </Button>
              <Button
                onClick={handlePrint}
                onMouseEnter={() => play("hover")}
                variant="outline"
                className="border-violet-500/40 bg-violet-500/5 text-violet-600 dark:text-violet-300"
              >
                <Printer className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Imprimer / Save PDF</span>
                <span className="sm:hidden">PDF</span>
              </Button>
              <Button
                onClick={handleContact}
                onMouseEnter={() => play("hover")}
                variant="outline"
                className="border-violet-500/40 bg-violet-500/5 text-violet-600 dark:text-violet-300"
              >
                <Mail className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Contacter</span>
                <span className="sm:hidden">Mail</span>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
