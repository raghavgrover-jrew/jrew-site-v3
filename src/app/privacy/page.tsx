import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { contact } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy", description: "How jrew.co.in handles the information you send through its forms.", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Privacy", path: "/privacy" }])} />
      <PageHeader lead="Privacy" mark="notice" lede="What this website does with the information you give it." />
      <SectionShell className="pt-4">
        <div className="max-w-[66ch] space-y-5 text-[16px] leading-relaxed text-ink-2">
          <p>
            <strong className="text-ink">Forms.</strong> The request-a-quote, enquiry and careers forms send what you type, and any resume you attach, by email to {contact.legalName} so that the relevant team can reply. Nothing you submit is sold or shared with third parties for marketing.
          </p>
          <p>
            <strong className="text-ink">Cookies and analytics.</strong> This site sets no advertising or analytics cookies and runs no third-party tracking scripts. Fonts are served from Google Fonts through the website build, and images through the hosting provider.
          </p>
          <p>
            <strong className="text-ink">Drawings and technical data.</strong> Drawings and specifications are handled under a non-disclosure agreement on request. Please do not attach controlled documents to the forms; ask for an NDA first.
          </p>
          <p>
            <strong className="text-ink">Questions.</strong> Write to{" "}
            <a href={`mailto:${contact.email}`} className="font-semibold text-ink underline decoration-marigold decoration-2 underline-offset-4">
              {contact.email}
            </a>
            .
          </p>
        </div>
      </SectionShell>
    </>
  );
}
