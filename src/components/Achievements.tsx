import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Achievement = {
  badge: string;
  badgeColor: string;
  title: string;
  organizer: string;
  description: string;
  tags: { name: string; color: string }[];
  gradient: string;
  icon: string;
  highlight?: string;
};

const achievements: Achievement[] = [
  {
    badge: "🚀 Coming Soon",
    badgeColor: "bg-primary",
    title: "Building My Portfolio",
    organizer: "Ongoing",
    description:
      "Currently focused on sharpening my skills through DSA practice, competitive programming, and shipping real ML & web projects. More achievements coming soon!",
    tags: [
      { name: "In Progress", color: "bg-violet-100 text-violet-700" },
      { name: "DSA", color: "bg-blue-100 text-blue-700" },
      { name: "Competitive Programming", color: "bg-emerald-100 text-emerald-700" },
    ],
    gradient: "from-primary/40 via-primary/30 to-accent/30",
    icon: "🎯",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Achievements() {
  const reduced = useReducedMotion();

  return (
    <section id="achievements" className="py-28 px-6">
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
            🏆 Recognition
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Achievements
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Awards, hackathon wins, and competition milestones
          </p>
        </motion.div>

        {/* Achievements grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-7"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {achievements.map((ach) => (
            <motion.div
              key={ach.title}
              variants={item}
              whileHover={
                reduced
                  ? undefined
                  : {
                      y: -6,
                      scale: 1.02,
                      transition: { duration: 0.25, ease: "easeOut" },
                    }
              }
              className="group relative bg-white rounded-2xl border border-border overflow-hidden"
            >
              {/* Gradient banner */}
              <div className={`relative h-40 bg-gradient-to-br ${ach.gradient} flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-3 right-5 w-16 h-16 border-2 border-white rounded-full" />
                  <div className="absolute bottom-4 left-4 w-10 h-10 border-2 border-white rounded-lg rotate-45" />
                </div>
                <span className="text-6xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {ach.icon}
                </span>
                <div className={`absolute top-4 right-4 ${ach.badgeColor} text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg tracking-wide`}>
                  {ach.badge}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-base font-bold text-text mb-1 group-hover:text-primary transition-colors duration-200 leading-snug">
                  {ach.title}
                </h3>
                <p className="text-xs font-semibold text-text-muted mb-3">{ach.organizer}</p>
                {ach.highlight && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold rounded-full mb-3">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {ach.highlight}
                  </div>
                )}
                <p className="text-sm text-text-muted leading-relaxed mb-5 line-clamp-3">{ach.description}</p>
                <div className="flex flex-wrap gap-2">
                  {ach.tags.map((tag) => (
                    <span key={tag.name} className={`px-2.5 py-1 text-[11px] font-semibold rounded-full ${tag.color}`}>
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
