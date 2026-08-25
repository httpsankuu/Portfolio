import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduced) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-accent to-primary z-[100] origin-left"
      style={{ scaleX }}
    />
  );
}
