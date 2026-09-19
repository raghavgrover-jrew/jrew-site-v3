import type { Metadata, Viewport } from "next";
import { Poppins, Source_Sans_3 } from "next/font/google";
import { Navbar } from "@/components/chrome/Navbar";
import { Footer } from "@/components/chrome/Footer";
import { organizationSchema, webSiteSchema } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const poppins = Poppins({ weight: ["700", "800"], subsets: ["latin"], variable: "--font-poppins", display: "swap" });
const sourceSans = Source_Sans_3({ weight: ["400", "600", "700"], subsets: ["latin"], variable: "--font-source-sans", display: "swap" });

export const viewport: Viewport = { themeColor: "#1a1a1a", width: "device-width", initialScale: 1 };

export const metadata: Metadata = {
  title: { default: "JREW Engineering | Masts, axles, attachments and machined components for OEMs", template: "%s | JREW Engineering" },
  description: "Precision-machined components, sub-assemblies and attachments for construction, material handling, agriculture and rail OEMs. Four plants in India, exporting since 2010.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 } },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "JREW Engineering Limited",
    title: "JREW Engineering | Precision engineering for tomorrow's machinery",
    description: "Forklift masts, axle assemblies, structural components, attachments and forged products for global OEMs. Engineering-led manufacturing since 1973.",
    url: "/",
  },
  twitter: { card: "summary_large_image", title: "JREW Engineering", description: "Precision engineering for tomorrow's machinery. Since 1973." },
  icons: { icon: "/brand/jrew-logo-on-ink.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${sourceSans.variable} h-full antialiased`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c") }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema).replace(/</g, "\\u003c") }} />
      </head>
      <body className="min-h-full bg-paper text-ink">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
