"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/** True after hydration, false during SSR. */
export function useMounted() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** Live prefers-reduced-motion value; false on the server. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}
