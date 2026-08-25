const socialLinks = [
  {
    name: "Email",
    href: "mailto:ankitkumar143563@gmail.com",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: "hover:bg-rose-100 hover:text-rose-600 hover:border-rose-200",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ankit-kumar-singh03/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: "hover:bg-sky-100 hover:text-sky-600 hover:border-sky-200",
  },
  {
    name: "GitHub",
    href: "https://github.com/httpsankuu",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    color: "hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300",
  },
  {
    name: "LeetCode",
    href: "https://leetcode.com/u/who_ankuu/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.544 2.544 0 0 1 .619-1.164L9.134 7.16a1.374 1.374 0 0 0 1.951 0l6.556 6.556a1.374 1.374 0 0 0 0-1.951l-6.556-6.556a1.374 1.374 0 0 0-.612-.36z" />
      </svg>
    ),
    color: "hover:bg-amber-100 hover:text-amber-600 hover:border-amber-200",
  },
  {
    name: "X / Twitter",
    href: "https://x.com/who_ankith",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: "hover:bg-gray-200 hover:text-gray-900 hover:border-gray-300",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Header */}
        <p className="font-mono text-sm text-primary tracking-wider uppercase mb-3">
          🤝 Let's Work Together
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
          Let's Connect
        </h2>
        <p className="text-lg text-text-muted mb-4 max-w-xl mx-auto leading-relaxed">
          I'm actively looking for ML internships, research collaborations, and
          open-source projects.
        </p>
        <p className="text-sm text-text-muted mb-10">
          Have an idea or opportunity? I'd love to hear from you.
        </p>

        {/* Icon row */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-2.5 px-5 py-3 bg-white rounded-xl border border-border 
                          text-text-muted font-medium text-sm
                          transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5
                          ${link.color}`}
              aria-label={link.name}
            >
              {link.icon}
              <span>{link.name}</span>
            </a>
          ))}
        </div>

        {/* CTA pill */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 rounded-full border border-primary/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-sm font-medium text-primary">
            Open to new opportunities — let's chat!
          </span>
        </div>
      </div>
    </section>
  );
}
