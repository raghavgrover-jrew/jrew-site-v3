"use client";

// Fixed nav. Transparent over the home hero (ink ground), white with a hairline everywhere
// else and once the hero has scrolled past. Mobile: full-screen overlay as a sibling, Esc closes.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { navLinks, rfqHref } from "@/lib/site";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [pastHero, setPastHero] = useState(!isHome);
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!isHome) return;
      const hero = document.getElementById("hero");
      if (!hero) return;
      const st = ScrollTrigger.create({
        trigger: hero,
        start: "bottom 72px",
        onEnter: () => setPastHero(true),
        onLeaveBack: () => setPastHero(false),
      });
      return () => st.kill();
    },
    { dependencies: [isHome, pathname] },
  );

  useEffect(() => {
    setPastHero(!isHome);
  }, [isHome, pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const onInk = isHome && !pastHero && !open;

  return (
    <>
      <header
        ref={ref}
        className={cn(
          "fixed inset-x-0 top-0 z-[var(--z-nav)] transition-[background-color,border-color] duration-300",
          onInk ? "on-ink border-b border-transparent bg-transparent text-on-ink" : "border-b border-line bg-paper/95 text-ink backdrop-blur-md",
        )}
      >
        <nav aria-label="Primary" className="shell flex h-[72px] items-center justify-between gap-6">
          <Link href="/" aria-label="JREW Engineering home" className="flex shrink-0 items-center">
            <Image src={onInk ? "/brand/jrew-logo-on-ink.svg" : "/brand/jrew-logo-on-paper.svg"} alt="JREW Engineering" width={124} height={64} priority className="h-11 w-auto" />
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {navLinks.map((l) => {
              const active = pathname === l.href || pathname.startsWith(l.href + "/");
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative py-2 text-[15px] font-semibold tracking-[0.01em] transition-colors",
                      onInk ? "text-on-ink-2 hover:text-on-ink" : "text-ink-2 hover:text-ink",
                      active && (onInk ? "text-on-ink" : "text-ink"),
                      active && "after:absolute after:inset-x-0 after:-bottom-1 after:h-[3px] after:bg-marigold",
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href={rfqHref}
              className={cn(
                "hidden min-h-[44px] items-center px-5 text-[15px] font-semibold transition-colors sm:inline-flex",
                onInk ? "bg-marigold text-ink hover:bg-marigold-deep" : "bg-ink text-on-ink hover:bg-ink-panel-2",
              )}
            >
              Request a quote
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span className={cn("h-[2px] w-6 bg-current transition-transform duration-200", open && "translate-y-[4px] rotate-45")} />
              <span className={cn("h-[2px] w-6 bg-current transition-transform duration-200", open && "-translate-y-[4px] -rotate-45")} />
            </button>
          </div>
        </nav>
      </header>

      {open ? (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 top-[72px] z-[calc(var(--z-nav)-1)] flex flex-col bg-paper text-ink lg:hidden">
          <nav aria-label="Mobile" className="shell flex flex-1 flex-col justify-center gap-1 py-8">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className={cn("display block border-b border-line py-4 text-3xl", pathname === l.href ? "text-ink" : "text-ink-2")}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="shell pb-8">
            <Link href={rfqHref} onClick={() => setOpen(false)} className="flex min-h-[52px] items-center justify-center bg-marigold px-5 text-base font-semibold text-ink">
              Request a quote
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
