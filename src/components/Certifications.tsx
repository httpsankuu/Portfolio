import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Certification = {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verifyUrl?: string;
  previewSrc: string;
  previewType: "pdf" | "image";
  color: string;
  borderColor: string;
};

const certifications: Certification[] = [
  {
    title: "Crash Course on Python",
    issuer: "Coursera",
    date: "Completed",
    verifyUrl: "https://www.coursera.org/account/accomplishments/verify/WCE37QAX8LRX",
    previewSrc: "/coursera-python.pdf",
    previewType: "pdf",
    color: "from-emerald-500/10 to-teal-500/10",
    borderColor: "border-emerald-500/20",
  },
  {
    title: "Python Bootcamp",
    issuer: "Udemy",
    date: "Completed",
    verifyUrl: "https://www.udemy.com/certificate/UC-3f5311da-a742-410e-99c9-82ada382a690/",
    previewSrc: "/udemy-python.pdf",
    previewType: "pdf",
    color: "from-violet-500/10 to-purple-500/10",
    borderColor: "border-violet-500/20",
  },
  {
    title: "Infosys Certification",
    issuer: "Infosys",
    date: "Completed",
    previewSrc: "/infosys.pdf",
    previewType: "pdf",
    color: "from-blue-500/10 to-cyan-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    title: "Effective Time Management",
    issuer: "NSDC",
    date: "Completed",
    previewSrc: "/effective-time-management.png",
    previewType: "image",
    color: "from-amber-500/10 to-orange-500/10",
    borderColor: "border-amber-500/20",
  },
  {
    title: "C Programming",
    issuer: "Certificate",
    date: "Completed",
    previewSrc: "/c-certificate.pdf",
    previewType: "pdf",
    color: "from-green-500/10 to-lime-500/10",
    borderColor: "border-green-500/20",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

// Lazy PDF preview: we used to render five live <iframe src="*.pdf"> tags on
// first paint, which costs ~5 PDF downloads and 5 PDF.js/viewer processes at
// once. Instead we now mount the iframe only after the user hovers/focuses
// the card, and we cancel the in-flight request if they leave within 150ms.
function useLazyIframe(active: boolean) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (active) {
      timerRef.current = setTimeout(() => setShouldLoad(true), 150);
    } else if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      setShouldLoad(false);
    }
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [active]);

  return shouldLoad;
}

export default function Certifications() {
  const reduced = useReducedMotion();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="certifications" className="py-28 px-6 bg-bg">
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
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {certifications.map((cert, idx) => (
            <CertCard
              key={cert.title}
              cert={cert}
              index={idx}
              isHovered={hoveredIdx === idx}
              onHoverStart={() => setHoveredIdx(idx)}
              onHoverEnd={() =>
                setHoveredIdx((current) => (current === idx ? null : current))
              }
              reduced={reduced}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CertCard({
  cert,
  index,
  isHovered,
  onHoverStart,
  onHoverEnd,
  reduced,
}: {
  cert: Certification;
  index: number;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  reduced: boolean;
}) {
  const shouldLoadPdf = useLazyIframe(isHovered && cert.previewType === "pdf");

  return (
    <motion.div
      variants={item}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onFocus={onHoverStart}
      onBlur={onHoverEnd}
      whileHover={
        reduced
          ? undefined
          : {
              y: -6,
              scale: 1.03,
              transition: { duration: 0.25, ease: "easeOut" },
            }
      }
      className={`group bg-gradient-to-br ${cert.color} rounded-2xl border ${cert.borderColor} p-5 flex flex-col hover:shadow-xl hover:shadow-primary/10 transition-shadow duration-300`}
    >
      {/* Certificate preview thumbnail */}
      <a
        href={cert.previewSrc}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full aspect-[4/3] bg-bg-card/80 backdrop-blur-sm rounded-xl border border-border/60 mb-4 overflow-hidden block relative group/preview"
        aria-label={`Preview ${cert.title}`}
      >
        {cert.previewType === "image" ? (
          // Small image, eager-loaded so the card is never blank.
          <img
            src={cert.previewSrc}
            alt={cert.title}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : shouldLoadPdf ? (
          <iframe
            // Mounted only after the user has shown intent; #view=FitH keeps
            // the embedded preview zoomed out to a thumbnail.
            src={`${cert.previewSrc}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            title={cert.title}
            className="w-full h-full pointer-events-none"
            style={{ border: "none" }}
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2 text-text-muted"
            aria-hidden="true"
          >
            <svg
              className="w-10 h-10 text-primary/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-[10px] font-mono uppercase tracking-wider">
              PDF · hover to preview
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover/preview:bg-black/20 transition-colors duration-200 flex items-center justify-center">
          <span className="opacity-0 group-hover/preview:opacity-100 transition-opacity duration-200 text-[10px] font-mono text-white bg-black/60 px-2 py-1 rounded-full tracking-wider uppercase">
            View
          </span>
        </div>
        {/*
          `key` ensures that when the user moves between cards, React unmounts
          each iframe promptly instead of keeping five PDF viewers alive.
        */}
        {shouldLoadPdf && (
          <span key={`loaded-${index}`} className="hidden" aria-hidden="true" />
        )}
      </a>

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
        {cert.verifyUrl && (
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center justify-center gap-1.5 w-full px-4 py-2.5 bg-bg-card/80 backdrop-blur-sm border border-border/60 rounded-xl text-xs font-semibold text-text-muted hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 group/btn"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Verify Credential
            <svg className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
    </motion.div>
  );
}
