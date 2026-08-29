import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import MagneticButton from "./MagneticButton";

// Layout: 2 at top (left / right), 2 in middle (left / right), 1 at bottom-center
// Each card is ~148px wide × ~192px tall inside a ~530px × 560px container
const polaroids = [
  {
    id: 1,
    color: "from-rose-200 to-orange-100",
    label: "📸 Lab work",
    photo: "/photo-desk.png",
    rotation: -9,
    position: "top-[2%] left-[2%]",          // top-left
    floatDuration: 6,
    floatAmount: 8,
  },
  {
    id: 2,
    color: "from-sky-200 to-indigo-100",
    label: "🎓 Graduation",
    photo: null,
    rotation: 7,
    position: "top-[4%] right-[4%]",          // top-right
    floatDuration: 7,
    floatAmount: 6,
  },
  {
    id: 3,
    color: "from-purple-200 to-pink-100",
    label: "☕ Coffee & code",
    photo: "/photo-coffee.png",
    rotation: -5,
    position: "top-[40%] left-[4%]",          // middle-left
    floatDuration: 7.5,
    floatAmount: 6,
  },
  {
    id: 4,
    color: "from-amber-200 to-yellow-100",
    label: "🏆 Hackathon win",
    photo: null,
    rotation: 6,
    position: "top-[38%] right-[3%]",         // middle-right
    floatDuration: 5.5,
    floatAmount: 7,
  },
  {
    id: 5,
    color: "from-emerald-200 to-teal-100",
    label: "🤖 ML project",
    photo: "/photo-project.png",
    rotation: -4,
    position: "bottom-[2%] left-[28%]",       // bottom-center
    floatDuration: 6.5,
    floatAmount: 5,
  },
];

const headlineWords = ["Building", "AI", "that", "solves", "real", "problems,", "not", "just", "demos."];

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
      {/* Decorative blobs */}
      <div className="absolute top-20 left-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-[-5%] w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-24 pb-16 flex flex-col md:flex-row items-center gap-12">
        {/* Left — text content */}
        <div className="flex-1 text-center md:text-left">
          <motion.p
            className="font-mono text-sm text-primary tracking-wider uppercase mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            👋 Hi, I'm
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
          <h2 className="text-xl md:text-2xl font-semibold text-text mb-4 flex flex-wrap gap-x-[0.35em] justify-center md:justify-start">
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
            clean, and useful. Currently grinding DSA &amp; Competitive Programming while shipping ML and web projects.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap gap-4 justify-center md:justify-start mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            <MagneticButton
              href="#contact"
              strength={0.25}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white rounded-full font-semibold text-sm hover:bg-primary-light transition-colors duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 cursor-pointer"
            >
              Get in Touch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </MagneticButton>
            <a
              href="#experience"
              className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-border text-text rounded-full font-semibold text-sm hover:border-primary hover:text-primary transition-all duration-300 hover:-translate-y-0.5"
            >
              View Experience
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </motion.div>

          {/* Location pill */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-border text-sm text-text-muted shadow-sm"
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
              className="relative shrink-0"
              style={{ transform: `rotate(${p.rotation}deg)` }}
            >
              <div className="bg-white p-2 pb-7 rounded-sm shadow-md shadow-black/10 w-28">
                <div
                  className={`w-24 h-24 rounded-sm bg-gradient-to-br ${p.color} overflow-hidden flex items-center justify-center text-2xl`}
                >
                  {p.photo ? (
                    <img src={p.photo} alt={p.label} className="w-full h-full object-cover" />
                  ) : (
                    p.label.split(" ")[0]
                  )}
                </div>
                <p className="text-center text-[10px] font-medium text-text-muted font-[cursive] mt-1 leading-tight">
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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
  const parallaxX = useTransform(mouseX, [-1, 1], [-6, 6]);
  const parallaxY = useTransform(mouseY, [-1, 1], [-4, 4]);

  const baseRotate = p.rotation;
  const floatY = reduced ? 0 : [0, -p.floatAmount, 0];

  return (
    <motion.div
      className={`absolute ${p.position} group cursor-default`}
      initial={{ opacity: 0, y: 40, rotate: 0, scale: 0.8 }}
      animate={
        loaded
          ? {
              opacity: 1,
              y: 0,
              rotate: baseRotate,
              scale: 1,
            }
          : {}
      }
      transition={{
        duration: 0.7,
        delay: 0.8 + index * 0.1,
        ease: [0.34, 1.56, 0.64, 1], // bounce easing
      }}
      style={!reduced ? { x: parallaxX as any, y: parallaxY as any } : undefined}
      whileHover={
        reduced
          ? undefined
          : {
              y: -8,
              rotate: baseRotate * 0.3,
              scale: 1.08,
              transition: { duration: 0.3, ease: "easeOut" },
            }
      }
    >
      <motion.div
        className="bg-white p-2 pb-8 rounded-sm shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/15 transition-shadow duration-300"
        animate={
          reduced
            ? undefined
            : { y: floatY }
        }
        transition={
          reduced
            ? undefined
            : {
                y: {
                  duration: p.floatDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }
        }
      >
        {/* Image area — real photo or emoji placeholder */}
        <div
          className={`w-28 h-28 md:w-36 md:h-36 rounded-sm bg-gradient-to-br ${p.color} overflow-hidden flex items-center justify-center text-3xl md:text-4xl`}
        >
          {p.photo ? (
            <img src={p.photo} alt={p.label} className="w-full h-full object-cover" />
          ) : (
            p.label.split(" ")[0]
          )}
        </div>
        {/* Caption */}
        <p className="absolute bottom-2 left-0 right-0 text-center text-[11px] md:text-xs font-medium text-text-muted font-[cursive]">
          {p.label.split(" ").slice(1).join(" ")}
        </p>
        {/* Tape effect */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 bg-white/60 backdrop-blur-sm rounded-sm border border-white/40 shadow-sm rotate-1" />
      </motion.div>
    </motion.div>
  );
}


