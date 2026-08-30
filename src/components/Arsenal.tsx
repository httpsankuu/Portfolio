import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Proficiency = "Beginner" | "Intermediate" | "Advanced";

interface Skill {
  name: string;
  description: string;
  proficiency: Proficiency;
}

interface Category {
  title: string;
  icon: string;
  color: string;
  borderColor: string;
  skills: Skill[];
}

const categories: Category[] = [
  {
    title: "Languages",
    icon: "💻",
    color: "from-violet-500/10 to-purple-500/10",
    borderColor: "border-violet-500/20",
    skills: [
      { name: "Python", description: "OOP, scripting, problem solving — my daily driver", proficiency: "Advanced" },
      { name: "HTML", description: "Semantic markup, accessibility, responsive layouts", proficiency: "Intermediate" },
      { name: "CSS", description: "Tailwind, animations, responsive design", proficiency: "Intermediate" },
      { name: "JavaScript", description: "ES6+, DOM manipulation, API integrations", proficiency: "Intermediate" },
      { name: "C", description: "System programming, low-level concepts", proficiency: "Beginner" },
    ],
  },
  {
    title: "ML/DL Frameworks",
    icon: "🧠",
    color: "from-blue-500/10 to-cyan-500/10",
    borderColor: "border-blue-500/20",
    skills: [
      { name: "Flask", description: "Lightweight web apps, REST APIs, model serving", proficiency: "Intermediate" },
      { name: "Streamlit", description: "Rapid prototyping, ML dashboards, data apps", proficiency: "Intermediate" },
    ],
  },
  {
    title: "Data & Analysis",
    icon: "📊",
    color: "from-emerald-500/10 to-teal-500/10",
    borderColor: "border-emerald-500/20",
    skills: [
      { name: "Data Wrangling", description: "Cleaning, transforming, and preparing datasets", proficiency: "Intermediate" },
      { name: "Exploratory Data Analysis", description: "Visualization, pattern discovery, statistical summaries", proficiency: "Intermediate" },
      { name: "Feature Engineering", description: "Creating meaningful features for model performance", proficiency: "Intermediate" },
    ],
  },
  {
    title: "MLOps & Infra",
    icon: "⚙️",
    color: "from-amber-500/10 to-orange-500/10",
    borderColor: "border-amber-500/20",
    skills: [
      { name: "Git & GitHub", description: "Version control, collaboration, open-source workflows", proficiency: "Intermediate" },
      { name: "Vite / Astro", description: "Fast web tooling, static site generation", proficiency: "Intermediate" },
      { name: "Tailwind CSS", description: "Utility-first styling, responsive design", proficiency: "Intermediate" },
    ],
  },
];

const currentlyLearning = [
  { name: "C++", icon: "⚡" },
  { name: "DSA", icon: "🧩" },
  { name: "Competitive Programming", icon: "🏆" },
];

const proficiencyStyles: Record<Proficiency, string> = {
  Advanced: "bg-primary/20 text-primary-light border border-primary/30",
  Intermediate: "bg-amber-500/15 text-amber-400 border border-amber-500/25",
  Beginner: "bg-white/10 text-text-muted border border-border",
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Arsenal() {
  const reduced = useReducedMotion();

  return (
    <section id="arsenal" className="py-28 px-6">
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
            ⚔️ What I Work With
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Technical Arsenal
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            A quick look at the tools and frameworks I use to build ML systems.
          </p>
        </motion.div>

        {/* Category grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-16"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.title}
              variants={item}
              whileHover={reduced ? undefined : { y: -4, scale: 1.02, transition: { duration: 0.25 } }}
              className={`bg-gradient-to-br ${cat.color} rounded-2xl border ${cat.borderColor} p-6 transition-shadow duration-300 hover:shadow-xl hover:shadow-black/5`}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="text-lg font-bold text-text">{cat.title}</h3>
              </div>

              {/* Skills list */}
              <div className="space-y-3">
                {cat.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="flex items-start justify-between gap-3 bg-bg-card/80 backdrop-blur-sm rounded-xl p-3.5 border border-border/60 hover:border-primary/30 transition-colors"
                    whileHover={reduced ? undefined : { scale: 1.03, transition: { duration: 0.2, type: "spring", stiffness: 400, damping: 17 } }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-semibold text-sm text-text">{skill.name}</span>
                      </div>
                      <p className="text-xs text-text-muted leading-relaxed">{skill.description}</p>
                    </div>
                    <span className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ${proficiencyStyles[skill.proficiency]}`}>
                      {skill.proficiency}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Currently Learning callout */}
        <motion.div
          className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl border border-primary/10 p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex items-center gap-3 shrink-0">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
              </span>
              <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full tracking-wider uppercase">LIVE</span>
              <span className="font-bold text-text text-lg">Currently Learning</span>
            </div>
            <div className="hidden md:block w-px h-10 bg-border" />
            <div className="flex flex-wrap gap-3">
              {currentlyLearning.map((item) => (
                <motion.div
                  key={item.name}
                  className="flex items-center gap-2 px-4 py-2.5 bg-bg-card rounded-full border border-border"
                  whileHover={reduced ? undefined : { scale: 1.05, y: -2, boxShadow: "0 8px 25px rgba(108,99,255,0.15)", transition: { duration: 0.2 } }}
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="text-sm font-medium text-text">{item.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
