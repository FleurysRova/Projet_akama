import Link from "next/link";
import { Home, Terminal, Zap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Page 404 personnalisée — cohérente avec le design "IA & Automatisation"
 * du portfolio. Affiche un message sci-fi et des CTA vers les sections clés.
 */
export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 text-center">
      {/* Background aurora */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[10%] top-[15%] h-72 w-72 rounded-full bg-violet-500/20 blur-[100px] dark:bg-violet-500/10" />
        <div className="absolute right-[10%] top-[8%] h-80 w-80 rounded-full bg-cyan-500/15 blur-[110px] dark:bg-cyan-500/10" />
        <div className="absolute bottom-[10%] left-[45%] h-72 w-72 rounded-full bg-emerald-500/15 blur-[100px] dark:bg-emerald-500/10" />
      </div>

      <div className="max-w-xl">
        {/* Code 404 */}
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-cyan-500">
          Error · 404
        </p>

        {/* Big number */}
        <h1 className="mb-4 font-sans text-7xl font-bold leading-none tracking-tight sm:text-9xl">
          <span className="text-gradient-cv">404</span>
        </h1>

        {/* Title */}
        <h2 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl">
          Signal perdu dans la matrice
        </h2>

        {/* Description */}
        <p className="mb-8 text-sm text-muted-foreground sm:text-base">
          La page que vous cherchez s'est téléportée hors de ce portail.
          Peut-être que le terminal IA y a encore jeté un sort. Revenons au
          point de départ, voulez-vous ?
        </p>

        {/* CTA */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-violet-500 to-cyan-600 px-6 text-white shadow-lg shadow-violet-500/20">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full border-violet-500/40 bg-violet-500/5 text-violet-600 dark:text-violet-300">
            <Link href="/#about">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voir le profil
            </Link>
          </Button>
        </div>

        {/* Decorative chips */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          <span className="inline-flex items-center gap-1 rounded-md border border-cyan-500/30 bg-cyan-500/5 px-2 py-1 text-cyan-500">
            <Terminal className="h-3 w-3" /> AI Assistant
          </span>
          <span className="inline-flex items-center gap-1 rounded-md border border-violet-500/30 bg-violet-500/5 px-2 py-1 text-violet-500">
            <Zap className="h-3 w-3" /> Mode Recruteur
          </span>
        </div>
      </div>
    </main>
  );
}
