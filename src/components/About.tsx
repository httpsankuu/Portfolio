import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function About() {
  const reduced = useReducedMotion();

  return (
    <section id="about" className="py-28 px-6 bg-bg">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-14">
        {/* Photo avatar with glowing backdrop */}
        <motion.div
          className="relative shrink-0"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          whileHover={reduced ? undefined : { scale: 1.03, transition: { duration: 0.3 } }}
        >
          <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-2xl shadow-primary/15 z-10 bg-bg-card">
            <img
              src="/profile.webp"
              alt="Ankit Kumar Singh"
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          </div>
          <div className="absolute -inset-3 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-3xl blur-xl -z-0 opacity-70" />
        </motion.div>

        {/* Text */}
        <div className="text-center md:text-left flex-1">
          <p className="font-mono text-sm text-primary tracking-wider uppercase mb-2">
            👨‍💻 Who I Am
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-6">
            About Me
          </h2>
          <p className="text-lg text-text-muted leading-relaxed">
            Passionate about building things that are fast, clean, and useful. I'm
            a Machine Learning Engineer who loves turning data into actionable
            insights and shipping real products — not just notebooks. Currently
            grinding DSA &amp; Competitive Programming while building ML and web
            projects that solve actual problems. Always learning, always shipping.
          </p>
        </div>
      </div>
    </section>
  );
}
