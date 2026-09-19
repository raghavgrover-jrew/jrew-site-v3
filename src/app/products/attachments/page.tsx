import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { AttachmentCatalog } from "@/components/ui/AttachmentCatalog";
import { JsonLd, breadcrumbSchema, productSchema } from "@/lib/jsonld";
import { attachments, attachmentsIntro } from "@/data/attachments";

export const metadata: Metadata = {
  title: "Attachments and work tools",
  description: "Engineered attachments with specifications: grabs, forks, buckets and carriages for backhoe loaders, skid steers, telehandlers, forklifts and cranes.",
  alternates: { canonical: "/products/attachments" },
  openGraph: { type: "website", url: "/products/attachments", title: "Attachments and work tools | JREW Engineering", description: "Engineered attachments with specifications: grabs, forks, buckets and carriages for backhoe loaders, skid steers, telehandlers, forklifts and cranes." },
  twitter: { card: "summary_large_image", title: "Attachments and work tools | JREW Engineering", description: "Engineered attachments with specifications: grabs, forks, buckets and carriages for backhoe loaders, skid steers, telehandlers, forklifts and cranes." },
};

export default function AttachmentsPage() {
  const jsonld = [
    breadcrumbSchema([{ name: "Products", path: "/products" }, { name: "Attachments", path: "/products/attachments" }]),
    ...attachments.map((a) => productSchema({ name: a.name, description: `${a.spec}. Applications: ${a.applications}.`, image: a.image, category: "Machine attachments and work tools", sku: a.id })),
  ];
  return (
    <>
      <JsonLd data={jsonld} />
      <PageHeader eyebrow={attachmentsIntro.eyebrow} lead={attachmentsIntro.headline.lead} mark={attachmentsIntro.headline.mark} lede={attachmentsIntro.body} />
      <SectionShell ariaLabel="Attachment catalogue" className="pt-4">
        <AttachmentCatalog />
        <div className="on-ink mt-12 flex flex-wrap items-center justify-between gap-4 bg-ink-panel px-6 py-5 text-on-ink">
          <p className="text-[15px]">
            <span className="font-bold text-marigold">A dedicated line</span>
            {" "}
            {attachmentsIntro.footer.replace("A dedicated line, ", "")}
          </p>
          <p className="text-[13px] font-semibold uppercase tracking-[0.08em]">{attachmentsIntro.footerTag}</p>
        </div>
      </SectionShell>
    </>
  );
}
