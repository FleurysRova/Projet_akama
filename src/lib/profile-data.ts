/**
 * Données du profil — Elie Tinah Ramanjakavelosoa
 * Source unique de vérité pour tous les composants du portfolio.
 *
 * 📸 AUCUNE PHOTO : le portfolio utilise un avatar pro aux initiales "ET"
 * avec gradient néon + halo IA. Aucune image générée par IA représentant
 * une personne n'est utilisée (respect de la vie privée).
 */

export const PROFILE = {
  name: "RAMANJAKAVELOSOA Elie Tinah",
  firstName: "Elie Tinah",
  lastName: "Ramanjakavelosoa",
  initials: "ET",
  title: "Creative Media Specialist & Développeur de Logiciels",
  titleShort: "Creative Media Specialist",
  creativeTitle: "Creative Media Specialist",
  birthdate: "02 Décembre 2009",
  location: "Belo sur Tsiribihina, Madagascar",
  country: "Madagascar",
  mobility: "Opérations & Achats Internationaux",
  email: "elie.tinah.r@gmail.com",
  phone: "+261 34 00 00 00",
  availability: "Ouvert aux opportunités internationales & remote",
  profileSummary:
    "Creative Media Specialist passionné par l'innovation visuelle et la production multimédia. J'orchestre des projets créatifs de A à Z : identité visuelle, branding, production vidéo studio, clips, motion design et stratégie de contenu. Une double casquette créatif + technique qui me permet de transformer une idée en univers visuel complet, avec autonomie, rigueur et créativité.",
  resumeUrl: "/CV-Elie-Tinah-Ramanjakavelosoa.pdf",
} as const;

export const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
  { label: "Portfolio", href: "#", icon: "globe" },
  { label: "E-mail", href: `mailto:${PROFILE.email}`, icon: "mail" },
] as const;

export interface ExpertiseBlock {
  id: "creative" | "strategy" | "tech";
  label: string;
  title: string;
  tagline: string;
  icon: "palette" | "trending-up" | "code";
  color: "violet" | "green" | "cyan";
  side: "left" | "right";
  description: string;
  highlights: { title: string; text: string }[];
  skills: string[];
}

/**
 * EXPERTISES — ordre révisé : CRÉATIF d'abord, ensuite Stratégie, ensuite Tech.
 * Le portfolio parle désormais "beaucoup plus de Creative Media Specialist".
 */
export const EXPERTISES: ExpertiseBlock[] = [
  {
    id: "creative",
    label: "Creative Media · Pôle principal",
    title: "Design Graphique & Production Vidéo Studio",
    tagline: "Branding · Montage studio · Motion design · Habillage visuel",
    icon: "palette",
    color: "violet",
    side: "left",
    description:
      "Cœur de métier : identité visuelle complète, branding, production vidéo studio et habillage visuel pour artistes, créateurs de contenu et marques.",
    highlights: [
      {
        title: "Identité Visuelle & Branding",
        text: "Création de logos professionnels, chartes graphiques percutantes, déclinaisons de marque et visuels sur-mesure qui font rayonner une identité.",
      },
      {
        title: "Production Vidéo Studio & Clips",
        text: "Réalisation, tournage, montage et édition vidéo studio pour artistes, chanteurs et créateurs de contenu — du rush brut au clip final calibré.",
      },
      {
        title: "Motion Design & Habillage Visuel",
        text: "Animations, génériques, jingles visuels, transitions et habillage complet pour clips, lives et contenus sociaux.",
      },
    ],
    skills: [
      "Création de logo",
      "Design graphique",
      "Branding & Identité visuelle",
      "Montage vidéo studio",
      "Production de clips",
      "Habillage visuel",
      "Motion design",
      "Color grading",
      "Sound design",
      "Storytelling visuel",
    ],
  },
  {
    id: "strategy",
    label: "Digital & Social Media",
    title: "Stratégie de Contenu & Réseaux Sociaux",
    tagline: "TikTok · Instagram · YouTube · Storytelling",
    icon: "trending-up",
    color: "green",
    side: "right",
    description:
      "Stratégie de contenu créatif, animation de communautés et production de visuels pour les plateformes sociales.",
    highlights: [
      {
        title: "Stratégie de Contenu Créatif",
        text: "Élaboration de lignes éditoriales, calendriers de publication et concepts visuels pour TikTok, Instagram, Facebook, YouTube.",
      },
      {
        title: "Animation de Communautés",
        text: "Animation, modération et engagement sur l'ensemble des plateformes sociales — fidélisation et croissance d'audience.",
      },
    ],
    skills: [
      "TikTok",
      "Instagram",
      "Facebook",
      "YouTube",
      "Stratégie de contenu",
      "Animation de communautés",
      "Storytelling",
      "E-commerce cross-border",
    ],
  },
  {
    id: "tech",
    label: "Tech · Bonus",
    title: "Développement de Logiciels & Applications",
    tagline: "Architecture · Algorithmique · Code propre",
    icon: "code",
    color: "cyan",
    side: "right",
    description:
      "Casquette technique : je conçois aussi des applications modernes et ergonomiques pour donner vie à mes idées créatives.",
    highlights: [
      {
        title: "Conception & Programmation",
        text: "Création d'applications modernes, ergonomiques et adaptées aux besoins des utilisateurs.",
      },
      {
        title: "Architecture & Optimisation",
        text: "Résolution de problèmes algorithmiques, structuration de code propre et solutions fiables.",
      },
    ],
    skills: [
      "Développement d'applications",
      "Algorithmique",
      "Outils de création numérique",
      "Versioning (Git)",
    ],
  },
];

export interface LanguageItem {
  name: string;
  level: "Maternelle" | "Courant" | "Opérationnel" | "Intermédiaire";
  levelEn: string;
  percent: number;
  flag: string;
  color: string;
}

export const LANGUAGES: LanguageItem[] = [
  { name: "Malagasy", level: "Maternelle", levelEn: "Native", percent: 100, flag: "MG", color: "#10b981" },
  { name: "Français", level: "Courant (Professionnel)", levelEn: "Fluent / Professional", percent: 90, flag: "FR", color: "#06b6d4" },
  { name: "Anglais", level: "Opérationnel", levelEn: "Operational", percent: 75, flag: "EN", color: "#8b5cf6" },
  { name: "Portugais", level: "Intermédiaire", levelEn: "Intermediate", percent: 55, flag: "PT", color: "#f59e0b" },
];

export const EDUCATION = [
  {
    title: "Baccalauréat Scientifique (Série S)",
    place: "Madagascar",
    period: "Scientifique",
    description:
      "Formation scientifique solide : mathématiques, physique, raisonnement analytique et résolution de problèmes structurés.",
  },
  {
    title: "Certifications spécialisées en Informatique & Multimédia",
    place: "Spécialisation continue",
    period: "Multimédia · Créatif",
    description:
      "Certifications en design graphique, production multimédia et montage vidéo studio — formation continue autodidacte.",
  },
];

export const INTERESTS = [
  { label: "Gaming & E-Sport", icon: "gamepad" },
  { label: "Football", icon: "trophy" },
  { label: "Animation & Événementiel", icon: "sparkles" },
  { label: "Nouvelles Technologies", icon: "cpu" },
] as const;

/* ============================================================
   PROJETS CRÉATIFS — expériences orientées médias créatifs
   ============================================================ */
export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  year: string;
  client: string;
  description: string;
  deliverables: string[];
  color: "violet" | "cyan" | "green" | "amber";
  tags: string[];
  metrics?: { label: string; value: string }[];
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "studio-clip-artist",
    title: "Clip Vidéo Studio — Artiste Musical",
    category: "Production Vidéo",
    year: "2025",
    client: "Artiste indépendant",
    description:
      "Réalisation complète d'un clip vidéo studio : tournage multi-caméras, montage, color grading et habillage visuel. Du storyboard au master final livré pour diffusion multi-plateformes.",
    deliverables: [
      "Tournage studio multi-caméras",
      "Montage & color grading",
      "Habillage visuel & motion design",
      "Master 4K + versions sociales",
    ],
    color: "violet",
    tags: ["Montage studio", "Color grading", "Motion design", "4K"],
    metrics: [
      { label: "Durée", value: "3 min 40" },
      { label: "Plates-formes", value: "4" },
    ],
  },
  {
    id: "branding-identite-marque",
    title: "Identité Visuelle & Branding — Marque Locale",
    category: "Design Graphique",
    year: "2025",
    client: "Marque de mode",
    description:
      "Création d'une identité visuelle complète : logo, charte graphique, palette de couleurs, typographies et déclinaisons sur supports print et digitaux. Branding cohérent et mémorable.",
    deliverables: [
      "Logo principal + déclinaisons",
      "Charte graphique complète",
      "Palette & typographies",
      "Mockups supports print/digital",
    ],
    color: "cyan",
    tags: ["Logo", "Branding", "Charte graphique", "Print"],
    metrics: [
      { label: "Livraisons", value: "12+" },
      { label: "Supports", value: "Print + Digital" },
    ],
  },
  {
    id: "content-social-tiktok",
    title: "Stratégie Contenu TikTok & Reels",
    category: "Réseaux Sociaux",
    year: "2024 — 2025",
    client: "Créateur de contenu",
    description:
      "Production et montage de plus de 50 contenus courts-format pour TikTok, Instagram Reels et YouTube Shorts. Stratégie éditoriale, hooks accrocheurs, montage rythmé et habillage sonore.",
    deliverables: [
      "50+ vidéos courtes",
      "Stratégie éditoriale",
      "Montage rythmé & sound design",
      "Calendrier de publication",
    ],
    color: "green",
    tags: ["TikTok", "Reels", "Montage", "Sound design"],
    metrics: [
      { label: "Vidéos", value: "50+" },
      { label: "Vues cumulées", value: "120K+" },
    ],
  },
  {
    id: "habillage-visuel-evenement",
    title: "Habillage Visuel — Événementiel",
    category: "Motion Design",
    year: "2024",
    client: "Organisateur d'événement",
    description:
      "Conception d'un habillage visuel complet pour un événement : générique d'ouverture, transitions animées, jingles visuels et écrans de projection. Identité visuelle live cohérente.",
    deliverables: [
      "Générique d'ouverture animé",
      "Transitions & jingles visuels",
      "Écrans de projection live",
      "Kit branding événement",
    ],
    color: "amber",
    tags: ["Motion design", "Habillage", "Live", "Générique"],
    metrics: [
      { label: "Jours de tournage", value: "3" },
      { label: "Séquences animées", value: "20+" },
    ],
  },
  {
    id: "production-clip-promo",
    title: "Clip Promo — Lancement Produit",
    category: "Production Vidéo",
    year: "2025",
    client: "E-commerce",
    description:
      "Clip vidéo promo dynamique pour le lancement d'un produit : storyboard, tournage produit, montage rythmé, motion graphics et call-to-action. Optimisé pour conversion sur social.",
    deliverables: [
      "Storyboard & scénario",
      "Tournage produit studio",
      "Motion graphics & CTA",
      "Version 16:9 + 9:16",
    ],
    color: "violet",
    tags: ["Promo", "Motion graphics", "Conversion", "Social"],
    metrics: [
      { label: "Formats", value: "2" },
      { label: "Durée", value: "45 s" },
    ],
  },
  {
    id: "charte-youtube-chaine",
    title: "Habillage Chaîne YouTube — Créateur",
    category: "Branding & Motion",
    year: "2024",
    client: "YouTuber",
    description:
      "Habillage complet d'une chaîne YouTube : intro animée, outro, transitions récurrentes, bannière, miniature et identité visuelle cohérente pour fidéliser l'audience.",
    deliverables: [
      "Intro & outro animées",
      "Transitions récurrentes",
      "Bannière & logo chaîne",
      "Template miniature",
    ],
    color: "cyan",
    tags: ["YouTube", "Intro animée", "Branding", "Miniature"],
    metrics: [
      { label: "Abonnés gagnés", value: "+8K" },
      { label: "Vidéos habillées", value: "30+" },
    ],
  },
];

/* ============================================================
   OUTILS & LOGICIELS IA — intégrés au workflow créatif
   ============================================================ */
export interface AITool {
  id: string;
  name: string;
  category: "Génération d'images" | "Génération vidéo" | "Audio & Voix" | "Montage & Post-prod" | "Design & Branding";
  description: string;
  useCase: string;
  color: "violet" | "cyan" | "green" | "amber";
  icon: "sparkles" | "film" | "music" | "wand" | "palette";
}

export const AI_TOOLS: AITool[] = [
  {
    id: "midjourney",
    name: "Midjourney",
    category: "Génération d'images",
    description: "Génération de visuels conceptuels, moodboards et assets graphiques uniques.",
    useCase: "Moodboards, concepts visuels, assets de branding",
    color: "violet",
    icon: "sparkles",
  },
  {
    id: "runway",
    name: "Runway ML",
    category: "Génération vidéo",
    description: "Génération et manipulation vidéo par IA : text-to-video, inpainting, motion brush.",
    useCase: "Clips expérimentaux, effets visuels, b-roll IA",
    color: "cyan",
    icon: "film",
  },
  {
    id: "davinci-ai",
    name: "DaVinci Resolve · Magic Mask",
    category: "Montage & Post-prod",
    description: "Montage studio, color grading et outils IA (Magic Mask, Smart Reframe, Auto-subtitles).",
    useCase: "Montage clips, color grading, sous-titres auto",
    color: "amber",
    icon: "wand",
  },
  {
    id: "adobe-firefly",
    name: "Adobe Firefly",
    category: "Design & Branding",
    description: "Génération d'images et d'effets textuels intégrés à Photoshop & Illustrator.",
    useCase: "Génération de fonds, retouches créatives, déclinaisons",
    color: "violet",
    icon: "palette",
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    category: "Audio & Voix",
    description: "Voix off réalistes par IA et clonage vocal pour narration de clips et contenus.",
    useCase: "Voix off multilingues, narration de clips",
    color: "green",
    icon: "music",
  },
  {
    id: "topaz",
    name: "Topaz Video AI",
    category: "Montage & Post-prod",
    description: "Upscaling, interpolation d'images et restauration vidéo par IA (4K, 60fps).",
    useCase: "Upscaling 4K, fluidité 60fps, restauration",
    color: "cyan",
    icon: "film",
  },
  {
    id: "stable-diffusion",
    name: "Stable Diffusion",
    category: "Génération d'images",
    description: "Génération d'images open-source, fine-tuning de modèles personnalisés pour branding.",
    useCase: "Assets sur-mesure, style cohérent, itérations rapides",
    color: "violet",
    icon: "sparkles",
  },
  {
    id: "descript",
    name: "Descript",
    category: "Montage & Post-prod",
    description: "Édition vidéo par transcription textuelle, suppression de fills et overdubbing IA.",
    useCase: "Montage podcast, interviews, contenu parlé",
    color: "green",
    icon: "wand",
  },
];

/* ============================================================
   EFFETS & PARAMÈTRES IA appliqués au portfolio
   ============================================================ */
export const AI_EFFECTS = [
  {
    name: "Neural Aurora Background",
    description: "Dégradés radiaux animés (cyan / violet / vert) simulant un réseau de neurones vivant.",
    applied: "Hero section & CTA footer",
  },
  {
    name: "Typewriter Streaming",
    description: "Effet de frappe caractère-par-caractère simulant un LLM qui génère sa réponse en streaming.",
    applied: "Assistant IA Terminal",
  },
  {
    name: "Pulse Live Status",
    description: "Point lumineux pulsé verts+ anneaux concentriques : signal 'online' type IA connectée.",
    applied: "Header badge & Quick-View",
  },
  {
    name: "Scanlines CRT",
    description: "Effet de lignes de balayage subtil sur fond de terminal : esthétique sci-fi / IA.",
    applied: "Code snippets & Terminal IA",
  },
  {
    name: "Gradient Glow Text",
    description: "Texte avec halo lumineux dégradé cyan/violet : rendu néon typique des interfaces IA.",
    applied: "Headlines & accents",
  },
  {
    name: "Web Audio Sci-Fi SFX",
    description: "Sons synthétisés en temps réel (Web Audio API) : clics, sweeps et succès type terminal IA.",
    applied: "Micro-interactions (toggle volume)",
  },
] as const;

/* Q&A pour le terminal IA — réponses pré-définies, sans backend */
export interface QAItem {
  id: string;
  question: string;
  short: string;
  answer: string;
}

export const AI_QA: QAItem[] = [
  {
    id: "qualifications",
    question: "Quelles sont les qualifications d'Elie ?",
    short: "Qualifications",
    answer:
      "Elie Tinah Ramanjakavelosoa est avant tout un Creative Media Specialist : design graphique, branding, production vidéo studio, clips et habillage visuel. Il complète ce profil créatif avec une casquette technique (développement d'applications) qui lui permet de donner vie à ses concepts. Diplôme : Baccalauréat Scientifique (Série S) + Certifications spécialisées en Informatique & Multimédia.",
  },
  {
    id: "languages",
    question: "Quelles langues parle-t-il ?",
    short: "Langues",
    answer:
      "Elie parle 4 langues : Malagasy (langue maternelle), Français (courant / professionnel), Anglais (opérationnel) et Portugais (intermédiaire). Une maîtrise multilingue idéale pour des productions créatives internationales.",
  },
  {
    id: "creative",
    question: "Quels sont ses projets créatifs ?",
    short: "Projets créatifs",
    answer:
      "Elie réalise des identités visuelles complètes : logos professionnels, chartes graphiques, visuels de marque sur-mesure. Côté vidéo : tournage, montage et édition studio pour artistes, chanteurs et créateurs de contenu. Habillage visuel, motion design et production de clips font partie de son terrain de jeu quotidien.",
  },
  {
    id: "ai-tools",
    question: "Quels outils IA utilise-t-il ?",
    short: "Outils IA",
    answer:
      "Elie intègre l'IA dans son workflow créatif : Midjourney & Stable Diffusion pour les visuels, Runway ML pour la génération vidéo, Adobe Firefly pour le design, DaVinci Resolve (Magic Mask, Auto-subtitles) pour le montage, ElevenLabs pour les voix off, Topaz Video AI pour l'upscaling 4K et Descript pour l'édition par transcription.",
  },
  {
    id: "experience",
    question: "Quelle est son expérience ?",
    short: "Expérience",
    answer:
      "Elie orchestre des projets créatifs complets de A à Z : identité visuelle & branding, production vidéo studio, clips pour artistes, habillage visuel d'événements, stratégie de contenu TikTok/Instagram/YouTube. Bonus : il développe aussi ses propres applications. Autonomie, rigueur et créativité sont ses maîtres-mots.",
  },
  {
    id: "availability",
    question: "Est-il disponible pour des missions ?",
    short: "Disponibilité",
    answer:
      "Oui. Elie est actuellement ouvert aux opportunités internationales et au travail à distance (remote) pour des missions de design graphique, production vidéo studio et stratégie de contenu. Contact direct : elie.tinah.r@gmail.com — réponses rapides.",
  },
  {
    id: "tech",
    question: "A-t-il aussi des compétences techniques ?",
    short: "Bonus tech",
    answer:
      "Oui, en bonus. Elie développe des applications modernes (algorithmique, code propre, versioning Git). Cette double casquette créatif + tech lui permet d'automatiser son workflow créatif et de prototyper des outils sur-mesure. Mais son cœur de métier reste les médias créatifs.",
  },
  {
    id: "location",
    question: "Où est-il basé ?",
    short: "Localisation",
    answer:
      "Elie est basé à Belo sur Tsiribihina, Madagascar. Né le 02 Décembre 2009. Mobilité internationale : opérations & achats cross-border. Disponible pour des collaborations remote dans tous les fuseaux horaires.",
  },
  {
    id: "contact",
    question: "Comment le contacter ?",
    short: "Contact",
    answer:
      "Email direct : elie.tinah.r@gmail.com — Disponible sur LinkedIn, GitHub et via le portfolio. Réponse rapide, idéale pour discuter d'un projet créatif ou d'une opportunité. Vous pouvez aussi télécharger son CV complet en un clic depuis ce portfolio.",
  },
];
