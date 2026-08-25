type Proficiency = "Beginner" | "Intermediate" | "Advanced";

interface Skill {
  name: string;
  description: string;
  proficiency: Proficiency;
  icon?: string;
}

interface Category {
  title: string;
  icon: string;
  color: string;
  borderColor: string;
  badgeColor: string;
  skills: Skill[];
}

const categories: Category[] = [
  {
    title: "Languages",
    icon: "💻",
    color: "from-violet-50 to-purple-50",
    borderColor: "border-violet-200",
    badgeColor: "bg-violet-100 text-violet-700",
    skills: [
      {
        name: "Python",
        description: "OOP, scripting, problem solving — my daily driver",
        proficiency: "Advanced",
      },
      {
        name: "HTML",
        description: "Semantic markup, accessibility, responsive layouts",
        proficiency: "Intermediate",
      },
      {
        name: "CSS",
        description: "Tailwind, animations, responsive design",
        proficiency: "Intermediate",
      },
      {
        name: "JavaScript",
        description: "ES6+, DOM manipulation, API integrations",
        proficiency: "Intermediate",
      },
      {
        name: "C",
        description: "System programming, low-level concepts",
        proficiency: "Beginner",
      },
    ],
  },
  {
    title: "ML/DL Frameworks",
    icon: "🧠",
    color: "from-blue-50 to-cyan-50",
    borderColor: "border-blue-200",
    badgeColor: "bg-blue-100 text-blue-700",
    skills: [
      {
        name: "Flask",
        description: "Lightweight web apps, REST APIs, model serving",
        proficiency: "Intermediate",
      },
      {
        name: "Streamlit",
        description: "Rapid prototyping, ML dashboards, data apps",
        proficiency: "Intermediate",
      },
    ],
  },
  {
    title: "Data & Analysis",
    icon: "📊",
    color: "from-emerald-50 to-teal-50",
    borderColor: "border-emerald-200",
    badgeColor: "bg-emerald-100 text-emerald-700",
    skills: [
      {
        name: "Data Wrangling",
        description: "Cleaning, transforming, and preparing datasets",
        proficiency: "Intermediate",
      },
      {
        name: "Exploratory Data Analysis",
        description: "Visualization, pattern discovery, statistical summaries",
        proficiency: "Intermediate",
      },
      {
        name: "Feature Engineering",
        description: "Creating meaningful features for model performance",
        proficiency: "Intermediate",
      },
    ],
  },
  {
    title: "MLOps & Infra",
    icon: "⚙️",
    color: "from-amber-50 to-orange-50",
    borderColor: "border-amber-200",
    badgeColor: "bg-amber-100 text-amber-700",
    skills: [
      {
        name: "Git & GitHub",
        description: "Version control, collaboration, open-source workflows",
        proficiency: "Intermediate",
      },
      {
        name: "Vite / Astro",
        description: "Fast web tooling, static site generation",
        proficiency: "Intermediate",
      },
      {
        name: "Tailwind CSS",
        description: "Utility-first styling, responsive design",
        proficiency: "Intermediate",
      },
    ],
  },
];

const currentlyLearning = [
  { name: "C++", icon: "⚡" },
  { name: "DSA", icon: "🧩" },
  { name: "Competitive Programming", icon: "🏆" },
];

const proficiencyStyles: Record<Proficiency, string> = {
  Advanced: "bg-primary/15 text-primary border border-primary/20",
  Intermediate:
    "bg-accent-warm/15 text-amber-700 border border-amber-200",
  Beginner: "bg-gray-100 text-gray-600 border border-gray-200",
};

export default function Arsenal() {
  return (
    <section id="arsenal" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-sm text-primary tracking-wider uppercase mb-3">
            ⚔️ What I Work With
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Technical Arsenal
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            A quick look at the tools and frameworks I use to build ML systems.
          </p>
        </div>

        {/* Category grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className={`bg-gradient-to-br ${cat.color} rounded-2xl border ${cat.borderColor} p-6 transition-all duration-300 hover:shadow-lg hover:shadow-black/5`}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="text-lg font-bold text-text">{cat.title}</h3>
              </div>

              {/* Skills list */}
              <div className="space-y-3">
                {cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-start justify-between gap-3 bg-white/70 backdrop-blur-sm rounded-xl p-3.5 border border-white/80 hover:border-primary/20 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-semibold text-sm text-text">
                          {skill.name}
                        </span>
                      </div>
                      <p className="text-xs text-text-muted leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ${proficiencyStyles[skill.proficiency]}`}
                    >
                      {skill.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Currently Learning callout */}
        <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl border border-primary/10 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Left label */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
              </span>
              <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full tracking-wider uppercase">
                LIVE
              </span>
              <span className="font-bold text-text text-lg">
                Currently Learning
              </span>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-10 bg-border" />

            {/* Learning items */}
            <div className="flex flex-wrap gap-3">
              {currentlyLearning.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-full border border-border shadow-sm hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="text-sm font-medium text-text">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
