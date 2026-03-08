import { useEffect, useMemo, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion.js";

export function useRevealOnScroll(options = {}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const elementRef = useRef(null);
  const [observedRevealed, setObservedRevealed] = useState(false);

  const root = options.root ?? null;
  const rootMargin = options.rootMargin ?? "0px 0px -12% 0px";
  const threshold = options.threshold ?? 0.15;
  const once = options.once ?? true;

  const observerOptions = useMemo(
    () => ({ root, rootMargin, threshold }),
    [root, rootMargin, threshold]
  );

  useEffect(() => {
    if (prefersReducedMotion) return;

    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry?.isIntersecting) return;

      setObservedRevealed(true);
      if (once) observer.unobserve(entry.target);
    }, observerOptions);

    observer.observe(element);
    return () => observer.disconnect();
  }, [observerOptions, once, prefersReducedMotion]);

  return { ref: elementRef, revealed: prefersReducedMotion || observedRevealed };
}
