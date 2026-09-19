import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { contact } from "@/lib/site";

// DRAFT for legal review (Codex audit P0-6). The retention periods, the grievance route and the
// legal-basis wording are proposals; BUILD-REPORT.md lists them under "Needs approval". Nothing here
// creates a tracker: the site sets no analytics or advertising cookies.

export const metadata: Metadata = { title: "Privacy", description: "How jrew.co.in handles the information you send through its forms: what is collected, why, for how long, and your rights.", alternates: { canonical: "/privacy" },
  openGraph: { type: "website", url: "/privacy", title: "Privacy | JREW Engineering", description: "How jrew.co.in handles the information you send through its forms: what is collected, why, for how long, and your rights." },
  twitter: { card: "summary_large_image", title: "Privacy | JREW Engineering", description: "How jrew.co.in handles the information you send through its forms: what is collected, why, for how long, and your rights." },
};

const sections: { h: string; body: React.ReactNode }[] = [
  {
    h: "Who is responsible",
    body: (
      <>
        {contact.legalName}, registered office at C-99, Industrial Area Phase VII, SAS Nagar, Mohali 160055, Punjab, India (CIN {contact.cin}), is the data fiduciary for this website. Questions and requests go to{" "}
        <a href={`mailto:${contact.email}`} className="font-semibold text-ink underline decoration-marigold decoration-2 underline-offset-4">{contact.email}</a>.
      </>
    ),
  },
  {
    h: "What we collect and why",
    body: (
      <>
        The request-a-quote and enquiry forms collect your name, company, work email, phone number if you give it, and what you write about your requirement. The careers form collects your name, email, phone number, the area you are applying to, your experience note, your message and the resume you attach. We use this information to answer the enquiry, to prepare a quotation, to arrange a non-disclosure agreement or a plant visit, or to consider an application. We do not use it for marketing and we do not sell or share it with third parties for their purposes.
      </>
    ),
  },
  {
    h: "Legal basis",
    body: (
      <>
        Under India&apos;s Digital Personal Data Protection Act, 2023, we process what you submit on the basis of the consent you give by sending the form, for the purpose stated beside the submit button. For visitors in the European Economic Area or the United Kingdom, the basis is the steps taken at your request before entering into a contract (commercial enquiries) or our legitimate interest in recruiting (applications).
      </>
    ),
  },
  {
    h: "How long we keep it",
    body: (
      <>
        Enquiry and quotation correspondence is kept for as long as the enquiry or the resulting commercial relationship is open, and for 24 months after the last exchange. Career applications and resumes are kept for 12 months from receipt so that you can be considered for a later opening, then deleted unless you ask us earlier. Server logs hold only a reference number, the sender&apos;s email domain and a subject line, for 30 days.
      </>
    ),
  },
  {
    h: "Who handles it on our behalf",
    body: (
      <>
        The website is hosted by Vercel Inc. and served through its global network; form submissions are relayed by our email provider to the JREW commercial team or human resources in India. These providers process the data only to deliver the service. Fonts are compiled into the website at build time; no request goes to a font service when you visit.
      </>
    ),
  },
  {
    h: "International transfers",
    body: (
      <>
        Your submission is received and answered in India. Because the website and email relay run on international infrastructure, the data may pass through servers outside your country under the providers&apos; standard contractual protections.
      </>
    ),
  },
  {
    h: "Your rights",
    body: (
      <>
        You can ask what we hold about you, ask for it to be corrected or deleted, withdraw consent for an open enquiry or application, and ask that a resume be removed from consideration. Write to{" "}
        <a href={`mailto:${contact.email}`} className="font-semibold text-ink underline decoration-marigold decoration-2 underline-offset-4">{contact.email}</a>
        {" "}with the reference number from your confirmation. We answer within 30 days. If you are not satisfied, you may raise a grievance with the same address marked for the attention of the Grievance Officer, and thereafter with the Data Protection Board of India or your local supervisory authority.
      </>
    ),
  },
  {
    h: "Cookies and analytics",
    body: <>This site sets no advertising or analytics cookies and runs no third-party tracking scripts. If analytics is introduced later, this notice will say what is measured and, where the law requires it, ask for consent first.</>,
  },
  {
    h: "Drawings and technical data",
    body: <>The RFQ and enquiry forms take no attachments by design. Drawings and specifications are exchanged under a non-disclosure agreement after first contact.</>,
  },
  {
    h: "Changes",
    body: <>This notice was last revised on 19 September 2026. Material changes are dated here.</>,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Privacy", path: "/privacy" }])} />
      <PageHeader lead="Privacy" mark="notice" lede="What this website does with the information you give it, who handles it, how long it is kept, and what you can ask of us." />
      <SectionShell className="pt-4">
        <div className="max-w-[66ch] space-y-7 leading-relaxed text-ink-2">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="display-md text-lg text-ink">{s.h}</h2>
              <p className="mt-2">{s.body}</p>
            </section>
          ))}
        </div>
      </SectionShell>
    </>
  );
}
