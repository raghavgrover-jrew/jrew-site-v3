// JSON-LD builders. Facts from the 2026 brochure; addresses from the live site pending confirmation.
import { SITE_URL, contact } from "@/lib/site";
import { facilities } from "@/data/facilities";

const ORG_ID = `${SITE_URL}/#organization`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: contact.legalName,
  alternateName: "JREW",
  url: SITE_URL,
  logo: `${SITE_URL}/brand/jrew-logo-on-ink.svg`,
  foundingDate: "1973",
  foundingLocation: "Chandigarh, India",
  description:
    "JREW Engineering Limited engineers and manufactures fabricated and precision-machined components, sub-assemblies and engineered attachments for OEMs in construction, material handling, agriculture and railways.",
  email: contact.email,
  telephone: contact.phone,
  address: facilities.map((f) => ({ "@type": "PostalAddress", streetAddress: f.address.split(",")[0], addressLocality: f.city, addressRegion: f.city === "Mohali" ? "Punjab" : "Haryana", addressCountry: "IN" })),
  sameAs: [contact.linkedin, contact.stakonUrl],
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 1000 },
  knowsAbout: ["forklift mast assemblies", "front axle assemblies for backhoe loaders", "precision machined components", "engineered attachments", "forged lifting hooks", "forged forks", "hot-rolled special steel profiles", "electric pallet stackers"],
  areaServed: ["India", "North America", "Europe", "Asia"],
};

export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: contact.legalName,
  url: SITE_URL,
  publisher: { "@id": ORG_ID },
  inLanguage: "en-IN",
};

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${SITE_URL}${it.path}` })),
  };
}

export function productSchema(p: { name: string; description: string; image?: string; category: string; sku?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    ...(p.image ? { image: `${SITE_URL}${p.image}` } : {}),
    category: p.category,
    ...(p.sku ? { sku: p.sku } : {}),
    brand: { "@type": "Brand", name: "JREW" },
    manufacturer: { "@id": ORG_ID },
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  const list = Array.isArray(data) ? data : [data];
  return (
    <>
      {list.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}
    </>
  );
}
