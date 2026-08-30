import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Project = {
  label: string;
  title: string;
  description: string;
  tags: { name: string; color: string }[];
  link: { text: string; href: string };
  liveUrl?: string;
  gradient: string;
  icon: string;
  metric?: { value: string; color: string };
};

const projects: Project[] = [
  {
    label: "Web App",
    title: "MrCompress.com",
    description:
      "A lightning-fast, privacy-first image optimizer & converter. 100% browser-based processing — your images never leave your device. Built with Astro 6 & Tailwind 4.",
    tags: [
      { name: "Astro v6.4", color: "bg-orange-500/15 text-orange-400 border border-orange-500/20" },
      { name: "React v19", color: "bg-sky-500/15 text-sky-400 border border-sky-500/20" },
      { name: "Tailwind CSS v4", color: "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20" },
      { name: "i18next", color: "bg-violet-500/15 text-violet-400 border border-violet-500/20" },
      { name: "Cloudflare Pages", color: "bg-amber-500/15 text-amber-400 border border-amber-500/20" },
    ],
    link: { text: "GitHub", href: "https://github.com/httpsankuu/MrCompress.com" },
    liveUrl: "https://mrcompress.pages.dev/",
    gradient: "from-orange-400 via-amber-400 to-yellow-400",
    icon: "🗜️",
    metric: { value: "100% Browser-based", color: "bg-orange-500" },
  },
  {
    label: "AI Project",
    title: "resume-analyzer-ai",
    description:
      "An AI-powered resume analysis tool built with Python. Uploads and parses PDF resumes, extracts key skills, matches them against job descriptions, and generates detailed reports.",
    tags: [
      { name: "spaCy", color: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20" },
      { name: "FastAPI", color: "bg-teal-500/15 text-teal-400 border border-teal-500/20" },
      { name: "Next.js 16", color: "bg-white/10 text-text-muted border border-border" },
      { name: "sentence-transformers", color: "bg-purple-500/15 text-purple-400 border border-purple-500/20" },
    ],
    link: { text: "GitHub", href: "https://github.com/httpsankuu/resume-analyzer-ai" },
    liveUrl: "https://resumeanalyzer-10.vercel.app/",
    gradient: "from-violet-400 via-purple-400 to-indigo-400",
    icon: "📄",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Projects() {
  const reduced = useReducedMotion();

  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-sm text-primary tracking-wider uppercase mb-3">
            🛠️ What I've Built
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            End-to-end ML systems, deployed apps, and data deep-dives — the
            work I'm most proud of.
          </p>
        </motion.div>

        {/* Project grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-7"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariant}
              whileHover={
                reduced
                  ? undefined
                  : {
                      y: -6,
                      scale: 1.02,
                      transition: { duration: 0.25, ease: "easeOut" },
                    }
              }
              className="group relative bg-bg-card rounded-2xl border border-border overflow-hidden"
            >
              {/* Hover glow border */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
                style={{
                  background: "linear-gradient(135deg, rgba(108,99,255,0.15), rgba(255,107,107,0.1))",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "xor",
                  padding: "1px",
                }}
              />

              {/* Gradient banner */}
              <div className={`relative h-44 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-20 h-20 border-2 border-white rounded-full" />
                  <div className="absolute bottom-4 right-6 w-14 h-14 border-2 border-white rounded-lg rotate-12" />
                  <div className="absolute top-8 right-12 w-8 h-8 border-2 border-white rounded-full" />
                </div>
                <span className="text-6xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {project.icon}
                </span>
                {project.metric && (
                  <div className={`absolute top-4 right-4 ${project.metric.color} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}>
                    {project.metric.value}
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-[11px] font-bold text-white px-3 py-1.5 rounded-full tracking-wide uppercase shadow-sm">
                  {project.label}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-text mb-2 group-hover:text-primary transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed mb-5 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span key={tag.name} className={`px-2.5 py-1 text-[11px] font-semibold rounded-full ${tag.color}`}>
                      {tag.name}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-light transition-colors duration-200 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                    >
                      Live Demo
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                  <a
                    href={project.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 text-primary text-sm font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-200 group/btn"
                  >
                    {project.link.text}
                    <svg
                      className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
