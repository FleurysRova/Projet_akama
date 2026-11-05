"use client";

/**
 * ShareButtons — Boutons de partage social.
 *
 * Partage le portfolio sur LinkedIn, WhatsApp, X (Twitter) et copie
 * le lien dans le presse-papiers. Inclut un toast de confirmation.
 */

import * as React from "react";
import { Linkedin, MessageCircle, Twitter, Link2, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const SITE_URL =
  typeof window !== "undefined" ? window.location.href : "https://elie-tinah-portfolio.vercel.app";

const SITE_TITLE =
  "Elie Tinah Ramanjakavelosoa — Portfolio Creative Media Specialist";

interface ShareButton {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  href: (url: string, title: string) => string;
}

const SHARE_BUTTONS: ShareButton[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: Linkedin,
    color:
      "hover:border-[#0a66c2]/60 hover:bg-[#0a66c2]/10 hover:text-[#0a66c2]",
    href: (url, title) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url,
      )}&title=${encodeURIComponent(title)}`,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: MessageCircle,
    color:
      "hover:border-[#25d366]/60 hover:bg-[#25d366]/10 hover:text-[#25d366]",
    href: (url, title) =>
      `https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`,
  },
  {
    id: "twitter",
    label: "X (Twitter)",
    icon: Twitter,
    color:
      "hover:border-foreground/60 hover:bg-foreground/10 hover:text-foreground",
    href: (url, title) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title,
      )}&url=${encodeURIComponent(url)}`,
  },
];

interface ShareButtonsProps {
  className?: string;
  compact?: boolean;
}

export function ShareButtons({ className, compact = false }: ShareButtonsProps) {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);

  const handleShare = (button: ShareButton) => {
    const url = window.location.href;
    window.open(button.href(url, SITE_TITLE), "_blank", "noopener,noreferrer");
  };

  const handleCopy = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({
        title: "Lien copié !",
        description: "Vous pouvez maintenant le partager où vous voulez.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("[ShareButtons] clipboard failed:", err);
      toast({
        title: "Copie impossible",
        description: "Copiez manuellement : " + url,
        variant: "destructive",
      });
    }
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Partager
      </span>
      {SHARE_BUTTONS.map((button) => {
        const Icon = button.icon;
        return (
          <button
            key={button.id}
            onClick={() => handleShare(button)}
            aria-label={`Partager sur ${button.label}`}
            title={`Partager sur ${button.label}`}
            className={cn(
              "grid h-9 w-9 place-items-center rounded-lg border border-border/60 bg-card/40 text-muted-foreground transition-all hover:scale-105",
              button.color,
            )}
          >
            <Icon className="h-4 w-4" />
          </button>
        );
      })}
      <button
        onClick={handleCopy}
        aria-label="Copier le lien"
        title="Copier le lien"
        className={cn(
          "grid h-9 w-9 place-items-center rounded-lg border border-border/60 bg-card/40 text-muted-foreground transition-all hover:scale-105 hover:border-violet-500/60 hover:bg-violet-500/10 hover:text-violet-500",
          copied && "border-emerald-500/60 bg-emerald-500/10 text-emerald-500",
        )}
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </button>
      {!compact && (
        <span className="text-xs text-muted-foreground">
          {SITE_URL.replace(/^https?:\/\//, "").slice(0, 40)}…
        </span>
      )}
    </div>
  );
}

export default ShareButtons;
