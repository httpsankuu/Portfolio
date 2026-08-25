import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Certification = {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verifyUrl: string;
  icon: string;
  color: string;
  borderColor: string;
};

const certifications: Certification[] = [
  {
    title: "Crash Course on Python",
    issuer: "Coursera",
    date: "Completed",
    verifyUrl: "https://www.coursera.org/account/accomplishments/verify/WCE37QAX8LRX",
    icon: "🐍",
    color: "from-emerald-50 to-teal-50",
    borderColor: "border-emerald-200",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Certifications() {
  const reduced = useReducedMotion();

  return (
    <section id="certifications" className="py-28 px-6 bg-white">
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
            📜 Verified Credentials
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Certifications
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Professional certifications and courses I've completed
          </p>
        </motion.div>

        {/* Certifications grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.title}
              variants={item}
              whileHover={
                reduced
                  ? undefined
                  : {
                      y: -6,
                      scale: 1.03,
                      transition: { duration: 0.25, ease: "easeOut" },
                    }
              }
              className={`group bg-gradient-to-br ${cert.color} rounded-2xl border ${cert.borderColor} p-5 flex flex-col hover:shadow-xl hover:shadow-primary/8 transition-shadow duration-300`}
            >
              {/* Icon / thumbnail placeholder */}
              <div className="w-full aspect-[4/3] bg-white/80 backdrop-blur-sm rounded-xl border border-white/60 flex items-center justify-center mb-4 overflow-hidden">
                <div className="text-center">
                  <span className="text-4xl block mb-2">{cert.icon}</span>
                  <p className="text-[10px] font-mono text-text-muted tracking-wider uppercase">
                    Certificate
                  </p>
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <h3 className="text-sm font-bold text-text mb-1 leading-snug group-hover:text-primary transition-colors duration-200">
                  {cert.title}
                </h3>
                <p className="text-xs font-medium text-text-muted mb-1">{cert.issuer}</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {cert.date}
                  </span>
                  {cert.credentialId && (
                    <span className="text-[10px] font-mono text-text-muted">ID: {cert.credentialId}</span>
                  )}
                </div>
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-1.5 w-full px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-border rounded-xl text-xs font-semibold text-text-muted hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 group/btn"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Verify Credential
                  <svg className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
