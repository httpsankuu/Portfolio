import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Tag = {
  label: string;
  color: string;
};

interface ExperienceEntry {
  id: string;
  role: string;
  organization: string;
  dateRange: string;
  description: string;
  tags: Tag[];
  icon: string;
  highlight?: string;
}

const experiences: ExperienceEntry[] = [
  {
    id: "research-assistant",
    role: "Research Assistant — Machine Learning",
    organization: "AI Research Lab",
    dateRange: "In Progress",
    description:
      "Working on ML research — building and experimenting with models, curating datasets, and writing experiment reports. Continuously learning and contributing to research efforts.",
    tags: [
      { label: "Research", color: "bg-blue-500/15 text-blue-400 border border-blue-500/20" },
      { label: "Machine Learning", color: "bg-purple-500/15 text-purple-400 border border-purple-500/20" },
      { label: "Python", color: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20" },
    ],
    icon: "🔬",
  },
  {
    id: "mrcompress",
    role: "Founder & Solo Developer",
    organization: "MrCompress.com",
    dateRange: "2025",
    description:
      "Designed, built, and shipped a privacy-first, 100% browser-based image optimizer and format converter. Astro 6 + React 19 + Tailwind 4, deployed on Cloudflare Pages.",
    tags: [
      { label: "Astro", color: "bg-orange-500/15 text-orange-400 border border-orange-500/20" },
      { label: "React", color: "bg-sky-500/15 text-sky-400 border border-sky-500/20" },
      { label: "Tailwind CSS", color: "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20" },
    ],
    icon: "🗜️",
  },
  {
    id: "resume-analyzer",
    role: "Creator & Maintainer",
    organization: "resume-analyzer-ai",
    dateRange: "2025",
    description:
      "Built an AI-powered resume analysis tool that parses PDFs, extracts skills with spaCy, matches against job descriptions, and generates reports. FastAPI + Next.js 16 + sentence-transformers.",
    tags: [
      { label: "FastAPI", color: "bg-teal-500/15 text-teal-400 border border-teal-500/20" },
      { label: "spaCy", color: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20" },
      { label: "Next.js", color: "bg-white/10 text-text-muted border border-border" },
    ],
    icon: "📄",
  },
  {
    id: "codixa",
    role: "Creator & Maintainer",
    organization: "Codixa",
    dateRange: "2025",
    description:
      "Shipped a curated suite of 100% browser-based developer utilities — formatters, encoders, generators, and converters. No server, no tracking.",
    tags: [
      { label: "React", color: "bg-sky-500/15 text-sky-400 border border-sky-500/20" },
      { label: "Vite", color: "bg-violet-500/15 text-violet-400 border border-violet-500/20" },
      { label: "Vercel", color: "bg-white/10 text-text-muted border border-border" },
    ],
    icon: "🛠️",
  },
];

export default function Experience() {
  const reduced = useReducedMotion();

  return (
    <section id="experience" className="py-28 px-6 bg-bg">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-sm text-primary tracking-wider uppercase mb-3">
            💼 Where I've Worked
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Experience
          </h2>
          <p className="text-lg text-text-muted">
            A timeline of roles, research, and leadership
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-border to-primary/20" />

          <div className="space-y-0">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                className="relative pl-16 md:pl-20 pb-12 last:pb-0 group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="absolute left-4 md:left-6 top-1 w-5 h-5 rounded-full border-[3px] border-primary bg-bg-card group-hover:bg-primary/20 transition-colors z-10" />
                <motion.div
                  className="bg-bg-card rounded-2xl border border-border p-6"
                  whileHover={reduced ? undefined : { y: -2, boxShadow: "0 10px 40px rgba(108,99,255,0.12)", transition: { duration: 0.25 } }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 mb-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="text-2xl shrink-0">{exp.icon}</span>
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-text leading-tight">{exp.role}</h3>
                        <p className="text-sm text-text-muted">{exp.organization}</p>
                      </div>
                    </div>
                    <span className="shrink-0 text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full w-fit">
                      {exp.dateRange}
                    </span>
                  </div>
                  {exp.highlight && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-xs font-semibold rounded-full mb-3">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {exp.highlight}
                    </div>
                  )}
                  <p className="text-sm text-text-muted leading-relaxed mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span key={tag.label} className={`px-2.5 py-1 text-[11px] font-semibold rounded-full border ${tag.color}`}>
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
