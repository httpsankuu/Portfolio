import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function CustomCursor() {
  const reduced = useReducedMotion();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduced) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);

    window.addEventListener("mousemove", onMove);

    // Observe hoverable elements
    const observer = new MutationObserver(() => {
      document
        .querySelectorAll("a, button, [data-cursor-hover]")
        .forEach((el) => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial bind
    document
      .querySelectorAll("a, button, [data-cursor-hover]")
      .forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
      document
        .querySelectorAll("a, button, [data-cursor-hover]")
        .forEach((el) => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        });
    };
  }, [reduced, visible]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Inner dot */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
            animate={{
              x: pos.x - 4,
              y: pos.y - 4,
              scale: hovering ? 0 : 1,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
          >
            <div className="w-2 h-2 bg-white rounded-full" />
          </motion.div>

          {/* Outer ring */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
            animate={{
              x: pos.x - (hovering ? 24 : 16),
              y: pos.y - (hovering ? 24 : 16),
              width: hovering ? 48 : 32,
              height: hovering ? 48 : 32,
              borderColor: hovering ? "rgba(108,99,255,1)" : "rgba(255,255,255,0.5)",
            }}
            transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.8 }}
          >
            <div className="w-full h-full rounded-full border-2" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
