import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70vh] flex-col justify-center py-32">
      <p className="kicker">404</p>
      <h1 className="display max-w-[16ch] text-[clamp(2rem,5vw,4rem)]">
        <span className="block">This page is</span>
        <span className="hl block">off the drawing.</span>
      </h1>
      <p className="mt-6 max-w-[48ch] text-ink-2">The address does not exist. The six product families, capabilities, quality and facilities pages are one click away.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/">Back to the home page</Button>
        <Button href="/products" variant="secondary">
          Products
        </Button>
      </div>
      <p className="sr-only">
        <Link href="/contact">Contact</Link>
      </p>
    </section>
  );
}
