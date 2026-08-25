import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

const education = [
  {
    degree: "B.Tech. CSE — AI/ML",
    institution: "Lovely Professional University",
    years: "2025 – 2029",
    focus:
      "Building a strong foundation in machine learning, deep learning, and applied AI with a focus on real-world problem solving.",
    highlights: ["ML Engineer", "Relevant Coursework"],
    coursework: [
      "Machine Learning",
      "Deep Learning",
      "Data Structures",
      "Algorithms",
      "Artificial Intelligence",
      "Python Programming",
    ],
  },
];

export default function Education() {
  const reduced = useReducedMotion();

  return (
    <section id="education" className="py-28 px-6">
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
            🎓 Where I Studied
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Education
          </h2>
          <p className="text-lg text-text-muted">
            The academic foundation behind the code
          </p>
        </motion.div>

        {/* Education cards */}
        <div className="space-y-6">
          {education.map((edu) => (
            <motion.div
              key={edu.degree}
              className="bg-white rounded-2xl border border-border p-6 md:p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={reduced ? undefined : { y: -3, transition: { duration: 0.25 } }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                <div className="shrink-0 w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl">
                  🎓
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-2">
                    <h3 className="text-lg font-bold text-text">{edu.degree}</h3>
                    <span className="text-sm font-mono text-primary bg-primary/10 px-3 py-1 rounded-full w-fit">
                      {edu.years}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-text-muted mb-3">{edu.institution}</p>
                  <p className="text-sm text-text-muted leading-relaxed mb-4">{edu.focus}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {edu.highlights.map((h) => (
                      <span key={h} className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                        {h}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course) => (
                      <motion.span
                        key={course}
                        className="px-3 py-1.5 bg-bg text-text-muted text-xs font-medium rounded-lg border border-border"
                        whileHover={reduced ? undefined : { scale: 1.05, borderColor: "rgba(108,99,255,0.3)", color: "#6C63FF", transition: { duration: 0.15 } }}
                      >
                        {course}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
