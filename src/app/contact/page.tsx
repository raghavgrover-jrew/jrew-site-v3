import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";
import { RfqFlow } from "@/components/ui/RfqFlow";
import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { facilities } from "@/data/facilities";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Open an RFQ with JREW Engineering, send a general enquiry, or request a plant visit. Units in Mohali (Punjab) and Faridabad (Haryana). enquiry@jrew.co.in.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Contact", path: "/contact" }])} />
      <PageHeader lead="Start with" mark="the part." lede="If there is a drawing, a sample, or just a family in mind, the RFQ is the fastest route to a quote. A plant visit or supplier audit goes through the same form. Everything else fits the enquiry form below it." />

      <SectionShell id="rfq" ariaLabel="Request a quote" className="pt-4">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)]">
          <RfqFlow idPrefix="contact" />
          <div className="flex flex-col gap-4">
            <div className="border border-line bg-card-warm p-6">
              <p className="kicker">Direct</p>
              <p className="mt-2">
                <a href={`mailto:${contact.email}`} className="tap text-[16px] font-semibold underline decoration-marigold decoration-2 underline-offset-4 hover:decoration-ink">
                  {contact.email}
                </a>
              </p>
              <p className="mt-1">
                <a href={contact.phoneHref} className="tap tnum text-[15px] text-ink-2 hover:text-ink">
                  {contact.phone}
                </a>
              </p>
              <p className="mt-4 text-[13.5px] leading-relaxed text-ink-3">Drawings are handled under NDA on request. Careers applications go through the careers page.</p>
            </div>
            <div className="border border-line bg-paper p-6">
              <p className="kicker">Plants</p>
              <ul className="mt-3 space-y-4">
                {facilities.map((f) => (
                  <li key={f.id}>
                    <p className="text-[15px] font-semibold">
                      <span className="tnum">{f.code}</span> {f.city}, {f.role}
                    </p>
                    <p className="mt-0.5 text-[13.5px] leading-snug text-ink-2">{f.address}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell id="enquiry" labelledBy="enquiry-h" tone="warm">
        <TwoToneHeading id="enquiry-h" lead="Not a quote?" mark="Still write." inline className="text-[clamp(1.7rem,3vw,2.5rem)]" />
        <p className="mt-4 max-w-[56ch] text-ink-2">Supplier introductions, audits, press, STAKON dealerships, anything that needs a person.</p>
        <div className="mt-8 max-w-[44rem]">
          <EnquiryForm />
        </div>
      </SectionShell>
    </>
  );
}
