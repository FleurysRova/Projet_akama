import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://elie-tinah-portfolio.vercel.app";
const SITE_NAME = "Elie Tinah Ramanjakavelosoa — Portfolio";
const SITE_DESCRIPTION =
  "Développeur de Logiciels & Spécialiste en Médias Créatifs. Portfolio ultra-moderne : programmation, design graphique, production vidéo studio et stratégie digitale e-commerce. Ouvert aux opportunités internationales & remote.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Elie Tinah Ramanjakavelosoa — Software Engineer & Creative Media Specialist",
    template: "%s · Elie Tinah Ramanjakavelosoa",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Elie Tinah Portfolio",
  keywords: [
    "Elie Tinah Ramanjakavelosoa",
    "Développeur de Logiciels",
    "Spécialiste Médias Créatifs",
    "Software Engineer Madagascar",
    "Creative Developer",
    "Design Graphique",
    "Production Vidéo",
    "Branding",
    "E-Commerce International",
    "Next.js Portfolio",
    "Développeur Full Stack",
    "Stratégie Digitale",
  ],
  authors: [{ name: "RAMANJAKAVELOSOA Elie Tinah" }],
  creator: "RAMANJAKAVELOSOA Elie Tinah",
  publisher: "RAMANJAKAVELOSOA Elie Tinah",
  category: "portfolio",
  formatDetection: { telephone: false, address: false, email: false },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "profile",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Elie Tinah Ramanjakavelosoa — Software Engineer & Creative Media Specialist",
    description: SITE_DESCRIPTION,
    firstName: "Elie Tinah",
    lastName: "Ramanjakavelosoa",
    username: "elie.tinah",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Portfolio d'Elie Tinah Ramanjakavelosoa — Développeur & Créatif",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elie Tinah Ramanjakavelosoa — Software Engineer & Creative Media Specialist",
    description: SITE_DESCRIPTION,
    creator: "@elie_tinah",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground selection:bg-cyan-500/30`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
