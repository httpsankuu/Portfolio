import { useState, useEffect } from "react";

function throttle<T extends (...args: unknown[]) => void>(fn: T, ms: number): T {
  let last = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;
  return ((...args: unknown[]) => {
    const now = Date.now();
    const remaining = ms - (now - last);
    if (remaining <= 0) {
      if (timer) { clearTimeout(timer); timer = null; }
      last = now;
      fn(...args);
    } else if (!timer) {
      timer = setTimeout(() => {
        last = Date.now();
        timer = null;
        fn(...args);
      }, remaining);
    }
  }) as T;
}

export function useScrollSpy(sectionIds: string[], offset = 120): string {
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = throttle(() => {
      const scrollY = window.scrollY;
      const viewportH = window.innerHeight;

      // Find which section currently occupies the most prominent position in viewport
      let bestId = "";
      let bestScore = -Infinity;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const top = rect.top;
        const bottom = rect.bottom;

        // Section must be at least partially visible
        if (bottom < 0 || top > viewportH) continue;

        // Score: prefer section whose top is just above the offset line
        const score = -(Math.abs(top - offset));

        // Also accept sections that have passed the offset line but are still on screen
        if (top <= offset && bottom > 0) {
          const passedScore = top; // more negative = further past = higher priority
          if (passedScore > bestScore || bestId === "") {
            bestScore = passedScore;
            bestId = id;
          }
        } else if (bestId === "" && score > bestScore) {
          bestScore = score;
          bestId = id;
        }
      }

      // Fallback: if nothing visible yet (at very top), pick first; if scrolled past all, pick last
      if (!bestId) {
        if (scrollY < offset) {
          bestId = sectionIds[0] || "";
        } else {
          // Find the last section whose top is above the fold
          for (let i = sectionIds.length - 1; i >= 0; i--) {
            const el = document.getElementById(sectionIds[i]);
            if (el && el.getBoundingClientRect().top <= offset) {
              bestId = sectionIds[i];
              break;
            }
          }
        }
      }

      setActive(bestId);
    }, 50);

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionIds, offset]);

  return active;
}
