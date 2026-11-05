/**
 * API route /api/chat — Assistant IA du portfolio
 *
 * Utilise z-ai-web-dev-sdk (backend uniquement) pour répondre à n'importe
 * quelle question d'un recruteur sur Elie Tinah Ramanjakavelosoa. Le système
 * prompt inclut le profil complet, les expertises, les langues et les
 * projets afin que l'IA réponde de manière précise et personnalisée.
 */

import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import {
  PROFILE,
  EXPERTISES,
  LANGUAGES,
  EDUCATION,
  AI_TOOLS,
  PROJECTS,
} from "@/lib/profile-data";

// Construit un résumé textuel du profil pour nourrir l'IA
function buildContext(): string {
  const expertises = EXPERTISES.map(
    (e) => `- ${e.title} : ${e.skills.join(", ")}`,
  ).join("\n");
  const languages = LANGUAGES.map(
    (l) => `- ${l.label} : ${l.level}`,
  ).join("\n");
  const education = EDUCATION.map((e) => `- ${e.title} (${e.year})`).join("\n");
  const aiTools = AI_TOOLS.map((t) => `- ${t.name} : ${t.useCase}`).join("\n");
  const projects = PROJECTS.map(
    (p) => `- ${p.title} (${p.year}, ${p.client})`,
  ).join("\n");

  return `# Profil — ${PROFILE.name}

${PROFILE.profileSummary}

## Identité
- Nom complet : ${PROFILE.name}
- Titre : ${PROFILE.title}
- Né le : ${PROFILE.birthdate}
- Localisation : ${PROFILE.location}
- Mobilité : ${PROFILE.mobility}
- Email : ${PROFILE.email}
- Téléphone : ${PROFILE.phone}
- Disponibilité : ${PROFILE.availability}

## Expertises
${expertises}

## Langues
${languages}

## Formation
${education}

## Outils IA utilisés
${aiTools}

## Projets récents
${projects}

## Rôle
Tu es l'assistant IA personnel d'Elie Tinah Ramanjakavelosoa, intégré à son portfolio web.
Tu réponds aux questions des recruteurs et visiteurs en français (par défaut), en te basant
UNIQUEMENT sur les informations ci-dessus. Si une information n'est pas listée, dis-le
honnêtement et propose de contacter Elie par email (${PROFILE.email}).

## Style de réponse
- Concis (max 4-5 phrases sauf si demande de détail)
- Professionnel mais chaleureux
- Mets en valeur la double casquette créatif + tech
- Termine parfois par une suggestion d'action (contacter, voir le CV, etc.)
- Si la question n'est pas liée à Elie, redirige poliment vers son profil`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userMessage: string | undefined = body?.message;

    if (!userMessage || typeof userMessage !== "string") {
      return NextResponse.json(
        { error: "Le champ 'message' est requis." },
        { status: 400 },
      );
    }

    // Limite de longueur pour éviter l'abus
    if (userMessage.length > 500) {
      return NextResponse.json(
        { error: "Message trop long (max 500 caractères)." },
        { status: 400 },
      );
    }

    // Historique de conversation optionnel (tableau de {role, content})
    const history: Array<{ role: string; content: string }> =
      Array.isArray(body?.history) ? body.history : [];

    const zai = await ZAI.create();
    const systemPrompt = buildContext();

    // Construit les messages : system + historique + message courant
    const messages = [
      { role: "system" as const, content: systemPrompt },
      ...history.slice(-10).map((m) => ({
        role: (m.role === "user" ? "user" : "assistant") as const,
        content: String(m.content).slice(0, 1000),
      })),
      { role: "user" as const, content: userMessage },
    ];

    const completion = await zai.chat.completions.create({
      messages,
      thinking: { type: "disabled" },
    });

    const response: string | undefined = completion.choices[0]?.message?.content;

    if (!response || !response.trim()) {
      return NextResponse.json(
        {
          error: "Réponse vide de l'IA.",
          fallback: `Je n'ai pas pu générer une réponse. Contactez Elie directement à ${PROFILE.email}.`,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      response: response.trim(),
    });
  } catch (error) {
    console.error("[/api/chat] Error:", error);
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    return NextResponse.json(
      {
        error: "Échec de la génération de la réponse.",
        detail: message,
        fallback: `Désolé, une erreur est survenue. Contactez Elie à ${PROFILE.email}.`,
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: "/api/chat",
    method: "POST",
    description: "Assistant IA du portfolio d'Elie Tinah Ramanjakavelosoa",
  });
}
