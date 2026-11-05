"use client";

/**
 * ScrollToTopButton — Bouton flottant "Retour en haut".
 *
 * Apparaît après un défilement de 600 px, se masque pendant le scroll-down
 * (pattern Instagram/Google), et réapparaît au scroll-up ou au repos.
 * Anatomie : icône flèche vers le haut dans un cercle néon cyan/violet.
 */

import * as React from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTopButton() {
  const [visible, setVisible] = React.useState(false);
  const [lastY, setLastY] = React.useState(0);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const y = window.scrollY;
          // Visible après 600px de scroll
          if (y < 600) {
            setVisible(false);
          } else {
            const delta = y - lastY;
            // Scroll vers le bas → masquer, scroll vers le haut → afficher
            if (delta > 6) setVisible(false);
            else if (delta < -6) setVisible(true);
            // Au repos, garde son dernier état
          }
          setLastY(y);
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Retour en haut de la page"
      className={cn(
        "fixed bottom-5 left-5 z-30 grid h-11 w-11 place-items-center rounded-full border border-cyan-500/40 bg-card/80 text-cyan-500 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-cyan-500/60 hover:bg-cyan-500/10 sm:bottom-6 sm:left-6",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

export default ScrollToTopButton;
