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
  return (
    <section id="education" className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-sm text-primary tracking-wider uppercase mb-3">
            🎓 Where I Studied
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Education
          </h2>
          <p className="text-lg text-text-muted">
            The academic foundation behind the code
          </p>
        </div>

        {/* Education cards */}
        <div className="space-y-6">
          {education.map((edu) => (
            <div
              key={edu.degree}
              className="bg-white rounded-2xl border border-border p-6 md:p-8 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                {/* Icon */}
                <div className="shrink-0 w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl">
                  🎓
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-2">
                    <h3 className="text-lg font-bold text-text">
                      {edu.degree}
                    </h3>
                    <span className="text-sm font-mono text-primary bg-primary/10 px-3 py-1 rounded-full w-fit">
                      {edu.years}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-text-muted mb-3">
                    {edu.institution}
                  </p>

                  <p className="text-sm text-text-muted leading-relaxed mb-4">
                    {edu.focus}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {edu.highlights.map((h) => (
                      <span
                        key={h}
                        className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Coursework */}
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course) => (
                      <span
                        key={course}
                        className="px-3 py-1.5 bg-bg text-text-muted text-xs font-medium rounded-lg border border-border hover:border-primary/30 hover:text-primary transition-colors cursor-default"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
