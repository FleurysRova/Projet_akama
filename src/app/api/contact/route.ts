/**
 * API route /api/contact — Formulaire de contact du portfolio
 *
 * Stocke les messages envoyés par les recruteurs/clients en base (Prisma)
 * pour permettre à Elie de suivre les demandes. Validation Zod côté serveur
 * pour bloquer les spams et les champs vides.
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const ContactSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit faire au moins 2 caractères.")
    .max(80, "Le nom est trop long (max 80 caractères)."),
  email: z
    .string()
    .email("Adresse email invalide.")
    .max(120, "Email trop long."),
  subject: z
    .string()
    .max(120, "Sujet trop long.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "Le message doit faire au moins 10 caractères.")
    .max(2000, "Message trop long (max 2000 caractères)."),
  // Honeypot anti-bot : doit rester vide
  website: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot : si rempli → c'est un bot, on répond OK sans stocker
    if (body?.website) {
      return NextResponse.json({ success: true, fake: true });
    }

    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Données invalides",
          details: parsed.error.issues.map((i) => ({
            field: i.path.join("."),
            message: i.message,
          })),
        },
        { status: 400 },
      );
    }

    const { name, email, subject, message } = parsed.data;

    // Récupère l'IP pour limiter le spam (optionnel)
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : null;

    // Stocke en base
    const saved = await db.contactMessage.create({
      data: {
        name,
        email,
        subject: subject || null,
        message,
        ip,
      },
      select: { id: true, createdAt: true },
    });

    return NextResponse.json({
      success: true,
      id: saved.id,
      createdAt: saved.createdAt,
      message: "Message reçu ! Elie vous répondra rapidement.",
    });
  } catch (error) {
    console.error("[/api/contact] Error:", error);
    const message =
      error instanceof Error ? error.message : "Erreur inconnue";
    return NextResponse.json(
      {
        error: "Échec de l'enregistrement du message.",
        detail: message,
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: "/api/contact",
    method: "POST",
    description: "Formulaire de contact du portfolio d'Elie Tinah Ramanjakavelosoa",
  });
}
