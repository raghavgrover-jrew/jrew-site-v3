// Footer: the brochure's back cover. Black panel with the marigold CTA strip, plants, links, associations, CIN.
import Link from "next/link";
import Image from "next/image";
import { navLinks, contact, rfqHref } from "@/lib/site";
import { facilities, rajpura } from "@/data/facilities";
import { associations } from "@/data/customers";
import { closingCta } from "@/data/whyJrew";

export function Footer() {
  return (
    <footer className="on-ink bg-ink-panel text-on-ink">
      <div className="shell py-14 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div className="bg-marigold p-7 text-ink sm:p-9">
            <p className="display-md text-2xl sm:text-3xl">{closingCta.headline}</p>
            <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-ink-2">{closingCta.body}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px] font-semibold">
              <Link href={rfqHref} className="inline-flex min-h-[44px] items-center bg-ink px-5 text-on-ink hover:bg-ink-panel-2">
                Request a quote
              </Link>
              <a href={`mailto:${contact.email}`} className="underline decoration-ink/40 underline-offset-4 hover:decoration-ink">
                {contact.email}
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-2">
            <nav aria-label="Footer">
              <p className="eyebrow">Pages</p>
              <ul className="mt-4 space-y-2.5 text-[15px]">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-on-ink-2 hover:text-on-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/stakon" className="text-on-ink-2 hover:text-on-ink">
                    STAKON
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-on-ink-2 hover:text-on-ink">
                    Careers
                  </Link>
                </li>
              </ul>
            </nav>
            <div>
              <p className="eyebrow">Contact</p>
              <ul className="mt-4 space-y-2.5 text-[15px]">
                <li>
                  <a href={`mailto:${contact.email}`} className="text-on-ink-2 hover:text-on-ink">
                    {contact.email}
                  </a>
                </li>
                <li>
                  <a href={contact.phoneHref} className="tnum text-on-ink-2 hover:text-on-ink">
                    {contact.phone}
                  </a>
                </li>
                <li>
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-on-ink-2 hover:text-on-ink">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href={contact.stakonUrl} target="_blank" rel="noopener noreferrer" className="text-on-ink-2 hover:text-on-ink">
                    stakon.in
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="hairline mt-12 grid gap-8 pt-10 md:grid-cols-5">
          {facilities.map((f) => (
            <div key={f.id}>
              <p className="text-[15px] font-semibold">
                <span className="tnum">{f.code}</span> <span className="text-on-ink-2">{f.city}</span>
              </p>
              <p className="mt-1 text-[13.5px] leading-snug text-on-ink-3">{f.address}</p>
            </div>
          ))}
          <div>
            <p className="text-[15px] font-semibold">
              <span className="text-marigold">Rajpura</span> <span className="text-on-ink-2">Punjab</span>
            </p>
            <p className="mt-1 text-[13.5px] leading-snug text-on-ink-3">Greenfield campus, Phase 1 operations {rajpura.year}</p>
          </div>
        </div>

        <ul className="hairline mt-10 flex flex-wrap items-center gap-x-8 gap-y-5 pt-8" aria-label="Memberships and certifications">
          <li>
            <Image src="/brand/jrew-logo-on-ink.svg" alt="JREW Engineering" width={124} height={64} className="h-10 w-auto" />
          </li>
          {associations.map((a) => (
            <li key={a.id} className="bg-paper px-3 py-2">
              <Image src={a.logo} alt={a.name} width={120} height={48} className="h-8 w-auto" />
            </li>
          ))}
        </ul>

        <div className="hairline mt-8 flex flex-wrap items-baseline justify-between gap-3 pt-5 text-[13px] text-on-ink-3">
          <p>
            &copy; {new Date().getFullYear()} {contact.legalName}. Public limited since 1994. <span className="tnum">{contact.cin}</span>
          </p>
          <p className="flex gap-5">
            <Link href="/privacy" className="hover:text-on-ink">
              Privacy
            </Link>
            <span className="tnum">Est. 1973, Chandigarh</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
