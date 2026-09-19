import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70vh] flex-col justify-center py-32">
      <p className="kicker">404</p>
      <h1 className="display max-w-[16ch] text-[clamp(2rem,5vw,4rem)]">
        <span className="block">This page is</span>
        <span className="block"><span className="hl">off the drawing.</span></span>
      </h1>
      <p className="mt-6 max-w-[48ch] text-ink-2">The address does not exist. Start again from the home page or the six product families.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/">Back to the home page</Button>
        <Button href="/products" variant="secondary">
          Products
        </Button>
      </div>
      <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
        {[["/capabilities", "Capabilities"], ["/quality", "Quality"], ["/facilities", "Facilities"], ["/contact", "Contact"]].map(([href, label]) => (
          <Link key={href} href={href} className="tap font-semibold underline decoration-marigold decoration-2 underline-offset-4 hover:decoration-ink">
            {label}
          </Link>
        ))}
      </p>
    </section>
  );
}
