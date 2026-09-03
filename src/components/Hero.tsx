import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import MagneticButton from "./MagneticButton";
import ConstellationCanvas from "./ConstellationCanvas";

// Layout: 4 polaroid cards in a balanced floating 2x2 arrangement
// Top-Left (Profile), Top-Right (ML Project), Bottom-Left (Lab Work), Bottom-Right (Coffee & Code)
const polaroids = [
  {
    id: 1,
    color: "from-sky-200 to-indigo-100",
    label: "🎓 Ankit Singh",
    photo: "/profile.webp",
    rotation: -6,
    position: "top-[2%] left-[4%]",           // top-left
    floatDuration: 6.5,
    floatAmount: 7,
  },
  {
    id: 2,
    color: "from-emerald-200 to-teal-100",
    label: "🤖 ML project",
    photo: "/photo-project.webp",
    rotation: 6,
    position: "top-[4%] right-[6%]",          // top-right
    floatDuration: 7,
    floatAmount: 6,
  },
  {
    id: 3,
    color: "from-rose-200 to-orange-100",
    label: "📸 Lab work",
    photo: "/photo-desk.webp",
    rotation: -5,
    position: "bottom-[4%] left-[6%]",        // bottom-left
    floatDuration: 6,
    floatAmount: 8,
  },
  {
    id: 4,
    color: "from-purple-200 to-pink-100",
    label: "☕ Coffee & code",
    photo: "/photo-coffee.webp",
    rotation: 5,
    position: "bottom-[6%] right-[8%]",       // bottom-right
    floatDuration: 7.5,
    floatAmount: 6,
  },
];

const headlineWords = ["Building", "AI", "that", "solves", "real", "problems."];

export default function Hero() {
  const reduced = useReducedMotion();
  const mouseX = useMotionValue<number>(0);
  const mouseY = useMotionValue<number>(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const onmousemove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 2;
    const y = (e.clientY / innerHeight - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseMove={onmousemove}
    >
      {/* Constellation particle background */}
      <ConstellationCanvas />

      {/* Decorative blobs */}
      <div className="absolute top-20 left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-[-5%] w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-24 pb-16 flex flex-col md:flex-row items-center gap-12">
        {/* Left — text content */}
        <div className="flex-1 text-center md:text-left">
        <motion.p
          className="font-mono text-sm text-primary tracking-wider uppercase mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Hi, I'm
        </motion.p>

          <h1 className="text-5xl md:text-7xl font-bold text-text tracking-tight leading-[1.1] mb-4">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Ankit Kumar
            </motion.span>
            <motion.span
              className="text-primary block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              Singh
            </motion.span>
          </h1>

          {/* Staggered word reveal for headline */}
          <h2 className="text-xl md:text-2xl font-semibold text-text mb-4 flex flex-wrap gap-x-[0.35em] justify-center md:justify-start" aria-label="Building AI that solves real problems, not just demos.">
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                animate={loaded ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{
                  duration: 0.4,
                  delay: 0.5 + i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <motion.p
            className="text-base md:text-lg text-text-muted leading-relaxed max-w-xl mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            Machine Learning Engineer passionate about building things that are fast,
            <br className="hidden md:block" />
            clean, and useful. Currently learning DSA &amp; Competitive Programming while shipping ML and web projects.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap gap-3.5 justify-center md:justify-start mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            <MagneticButton
              href="#contact"
              strength={0.25}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white rounded-full font-semibold text-sm hover:bg-primary-light transition-colors duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 cursor-pointer"
            >
              Get in Touch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </MagneticButton>
            <a
              href="/Ankit_Kumar_Singh_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-bg-card border-2 border-border text-text rounded-full font-semibold text-sm hover:border-primary hover:text-primary transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
            >
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View CV
            </a>
            <a
              href="#experience"
              className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-border text-text-muted rounded-full font-semibold text-sm hover:border-primary/50 hover:text-text transition-all duration-300 hover:-translate-y-0.5"
            >
              Experience
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </motion.div>

          {/* Location pill */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-bg-card rounded-full border border-border text-sm text-text-muted shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span>📍 Varanasi, Uttar Pradesh, India</span>
          </motion.div>
        </div>

        {/* Mobile — horizontal scrollable polaroid strip below text */}
        <div className="flex md:hidden gap-5 overflow-x-auto pb-4 w-full px-2 scrollbar-hide">
          {polaroids.map((p) => (
            <div
              key={p.id}
              className="relative shrink-0 transform-gpu"
              style={{ transform: `rotate(${p.rotation}deg)` }}
            >
              <div className="bg-bg-card p-2 pb-7 rounded-sm shadow-md shadow-black/30 border border-border/50 w-28">
                <div
                  className={`w-24 h-24 rounded-sm bg-gradient-to-br ${p.color} overflow-hidden flex items-center justify-center text-2xl`}
                >
                  {p.photo ? (
                    <img
                      src={p.photo}
                      alt={p.label}
                      className="w-full h-full object-cover object-top"
                      loading="eager"
                      decoding="async"
                    />
                  ) : (
                    <span role="img" aria-label={p.label}>
                      {p.label.split(" ")[0]}
                    </span>
                  )}
                </div>
                <p className="text-center text-[10px] font-medium text-text-muted mt-1 leading-tight">
                  {p.label.split(" ").slice(1).join(" ")}
                </p>
                {/* Tape */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-white/60 backdrop-blur-sm rounded-sm border border-white/40 shadow-sm rotate-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Desktop — floating polaroid collage on the right */}
        <div className="hidden md:block relative flex-1 w-full h-[560px] shrink-0">
          {polaroids.map((p, i) => (
            <PolaroidCard
              key={p.id}
              p={p}
              index={i}
              mouseX={mouseX}
              mouseY={mouseY}
              reduced={reduced}
              loaded={loaded}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.span
          className="text-xs text-text-muted font-mono tracking-wider"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          SCROLL
        </motion.span>
        <motion.svg
          className="w-4 h-4 text-text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </motion.svg>
      </motion.div>
    </section>
  );
}

/* ── Polaroid sub-component ── */
function PolaroidCard({
  p,
  index,
  mouseX,
  mouseY,
  reduced,
  loaded,
}: {
  p: (typeof polaroids)[number];
  index: number;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  reduced: boolean;
  loaded: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const parallaxX = useTransform(mouseX, [-1, 1], [-5, 5]);
  const parallaxY = useTransform(mouseY, [-1, 1], [-4, 4]);

  const baseRotate = p.rotation;
  const floatY = reduced || isHovered ? 0 : [0, -p.floatAmount, 0];

  return (
    <motion.div
      className={`absolute ${p.position} cursor-pointer select-none transform-gpu will-change-transform`}
      style={{
        zIndex: isHovered ? 40 : 10 + index,
        x: !reduced ? (parallaxX as any) : 0,
        y: !reduced ? (parallaxY as any) : 0,
      }}
      initial={{ opacity: 0, y: 30, rotate: 0, scale: 0.85 }}
      animate={
        loaded
          ? {
              opacity: 1,
              y: 0,
              rotate: isHovered ? baseRotate * 0.2 : baseRotate,
              scale: isHovered ? 1.08 : 1,
            }
          : {}
      }
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 24,
        mass: 0.8,
        delay: loaded ? (isHovered ? 0 : 0) : 0.6 + index * 0.1,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="bg-bg-card p-2.5 pb-8 rounded-sm shadow-lg border border-border/60 transform-gpu will-change-transform"
        style={{
          boxShadow: isHovered
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 20px rgba(108, 99, 255, 0.2)"
            : "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
        }}
        animate={
          reduced || isHovered
            ? { y: 0 }
            : { y: floatY }
        }
        transition={
          reduced || isHovered
            ? { duration: 0.25 }
            : {
                y: {
                  duration: p.floatDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }
        }
      >
        {/* Image area */}
        <div
          className={`w-28 h-28 md:w-36 md:h-36 rounded-sm bg-gradient-to-br ${p.color} overflow-hidden flex items-center justify-center text-3xl md:text-4xl relative`}
        >
          {p.photo ? (
            <img
              src={p.photo}
              alt={p.label}
              className="w-full h-full object-cover object-top transform-gpu transition-transform duration-300 ease-out"
              style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
              loading="eager"
              decoding="async"
            />
          ) : (
            <span role="img" aria-label={p.label}>
              {p.label.split(" ")[0]}
            </span>
          )}
          {/* Subtle glossy sheen highlight */}
          <div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transition-opacity duration-300"
            style={{ opacity: isHovered ? 1 : 0 }}
          />
        </div>

        {/* Caption */}
        <p className="absolute bottom-2 left-0 right-0 text-center text-[11px] md:text-xs font-semibold text-text-muted transition-colors duration-200"
           style={{ color: isHovered ? "var(--color-primary, #6C63FF)" : undefined }}>
          {p.label.split(" ").slice(1).join(" ")}
        </p>

        {/* Polaroid Tape effect */}
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-10 h-4 bg-primary/20 backdrop-blur-sm rounded-sm border border-primary/30 shadow-sm rotate-1 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}


