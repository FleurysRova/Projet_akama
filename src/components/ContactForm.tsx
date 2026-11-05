"use client";

/**
 * ContactForm — Formulaire de contact du portfolio.
 *
 * Envoie les messages à /api/contact (stockage Prisma). Affiche
 * validation, états de chargement et toast de succès/erreur.
 * Inclut un honeypot anti-spam.
 */

import * as React from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      subject: String(formData.get("subject") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      // Honeypot : doit rester vide (champ caché "website")
      website: String(formData.get("website") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data?.details && Array.isArray(data.details)) {
          const fieldErrors: Record<string, string> = {};
          for (const d of data.details) {
            fieldErrors[d.field] = d.message;
          }
          setErrors(fieldErrors);
        }
        setStatus("error");
        toast({
          title: "Message non envoyé",
          description:
            data?.error || "Vérifiez les champs et réessayez.",
          variant: "destructive",
        });
        return;
      }

      setStatus("success");
      toast({
        title: "Message envoyé !",
        description:
          "Merci. Elie vous répondra rapidement à " + payload.email + ".",
      });
      form.reset();
    } catch (err) {
      console.error("[ContactForm] fetch failed:", err);
      setStatus("error");
      toast({
        title: "Erreur réseau",
        description:
          "Impossible d'envoyer le message. Réessayez plus tard ou écrivez à elie.tinah.r@gmail.com.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Honeypot anti-bot — masqué aux humains */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website-field">
          Ne pas remplir (anti-spam)
          <input
            id="website-field"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">
            Nom <span className="text-violet-500">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            maxLength={80}
            placeholder="Votre nom"
            className="rounded-lg border-border/60 bg-background/40"
            disabled={status === "submitting"}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-violet-500">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            maxLength={120}
            placeholder="vous@exemple.com"
            className="rounded-lg border-border/60 bg-background/40"
            disabled={status === "submitting"}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Sujet (optionnel)</Label>
        <Input
          id="subject"
          name="subject"
          type="text"
          maxLength={120}
          placeholder="Ex : Mission branding, clip vidéo, opportunité…"
          className="rounded-lg border-border/60 bg-background/40"
          disabled={status === "submitting"}
          aria-invalid={!!errors.subject}
        />
        {errors.subject && (
          <p className="text-xs text-destructive">{errors.subject}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          Message <span className="text-violet-500">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={4}
          placeholder="Décrivez votre projet, vos besoins ou votre opportunité…"
          className="resize-none rounded-lg border-border/60 bg-background/40"
          disabled={status === "submitting"}
          aria-invalid={!!errors.message}
        />
        {errors.message ? (
          <p className="text-xs text-destructive">{errors.message}</p>
        ) : (
          <p className="text-[10px] text-muted-foreground">
            10 à 2000 caractères.
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Button
          type="submit"
          disabled={status === "submitting" || status === "success"}
          className="group relative overflow-hidden rounded-full bg-gradient-to-r from-violet-500 to-cyan-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition-all hover:shadow-xl hover:shadow-cyan-500/30 disabled:opacity-60"
        >
          {status === "submitting" && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {status === "success" && (
            <CheckCircle2 className="mr-2 h-4 w-4" />
          )}
          {status === "idle" && <Send className="mr-2 h-4 w-4" />}
          {status === "error" && <AlertCircle className="mr-2 h-4 w-4" />}
          {status === "submitting"
            ? "Envoi…"
            : status === "success"
              ? "Envoyé !"
              : "Envoyer le message"}
        </Button>

        {status === "success" && (
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
            Message reçu, Elie vous répondra bientôt.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm font-medium text-destructive">
            Échec. Réessayez ou écrivez directement.
          </p>
        )}
      </div>
    </form>
  );
}

export default ContactForm;
