import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GITHUB_USERNAME } from "../config";

interface GitHubProfile {
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
}

interface Repo {
  name: string;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  description: string | null;
  languages_url?: string;
}

interface LangStat {
  name: string;
  count: number;
  color: string;
}

const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  C: "#555555",
  Cpp: "#f34b7d",
  "C++": "#f34b7d",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  Shell: "#89e051",
  Astro: "#ff5a03",
  MDX: "#fcb32c",
  Dockerfile: "#384d54",
};

const FALLBACK_LANG_COLORS: string[] = [
  "#6C63FF", "#FF6B6B", "#FFB347", "#4ECDC4", "#45B7D1",
  "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F",
];

function getLangColor(name: string, index: number): string {
  return LANG_COLORS[name] || FALLBACK_LANG_COLORS[index % FALLBACK_LANG_COLORS.length];
}

const CACHE_KEY = "github_stats_cache_v1";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

const FALLBACK_PROFILE: GitHubProfile = {
  public_repos: 12,
  followers: 5,
  following: 8,
  public_gists: 0,
};

const FALLBACK_REPOS: Repo[] = [
  {
    name: "MrCompress.com",
    stargazers_count: 5,
    language: "Astro",
    html_url: "https://github.com/httpsankuu/MrCompress.com",
    description: "A lightning-fast, privacy-first image optimizer & converter. 100% browser-based processing.",
  },
  {
    name: "resume-analyzer-ai",
    stargazers_count: 4,
    language: "Python",
    html_url: "https://github.com/httpsankuu/resume-analyzer-ai",
    description: "AI-powered resume parser and job description matcher using spaCy & FastAPI.",
  },
  {
    name: "codixa",
    stargazers_count: 3,
    language: "TypeScript",
    html_url: "https://github.com/httpsankuu/codixa",
    description: "Curated collection of 100% browser-based developer utilities.",
  },
  {
    name: "Portfolio",
    stargazers_count: 2,
    language: "TypeScript",
    html_url: "https://github.com/httpsankuu/Portfolio",
    description: "Modern personal portfolio showcasing projects, experience, and skills.",
  },
];

const FALLBACK_LANGS: LangStat[] = [
  { name: "Python", count: 42, color: LANG_COLORS["Python"] },
  { name: "TypeScript", count: 28, color: LANG_COLORS["TypeScript"] },
  { name: "JavaScript", count: 18, color: LANG_COLORS["JavaScript"] },
  { name: "Astro", count: 12, color: LANG_COLORS["Astro"] },
];

export default function GitHubStats() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [topRepos, setTopRepos] = useState<Repo[]>([]);
  const [langStats, setLangStats] = useState<LangStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Try loading cached data first for instant UI and fallback
    let hasCachedData = false;
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.profile && Array.isArray(parsed.topRepos) && Array.isArray(parsed.langStats)) {
          setProfile(parsed.profile);
          setTopRepos(parsed.topRepos);
          setLangStats(parsed.langStats);
          setLoading(false);
          hasCachedData = true;

          // If cache is fresh, skip fetching
          if (Date.now() - (parsed.timestamp || 0) < CACHE_TTL_MS) {
            return;
          }
        }
      }
    } catch {
      // Ignore localStorage errors (e.g. private browsing mode)
    }

    const fetchStats = async () => {
      try {
        // NOTE: We intentionally do NOT send a token from the browser.
        // VITE_* env vars are embedded in the client bundle, so any token
        // shipped via this file would be public. If you need a higher rate
        // limit, route the fetch through a serverless function (e.g.
        // /api/github-stats on Vercel) and call that here instead.
        const headers: Record<string, string> = {};

        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, { headers }),
        ]);

        if (!profileRes.ok || !reposRes.ok) {
          throw new Error(`GitHub API rate limit or error (status: ${profileRes.status}/${reposRes.status})`);
        }

        const profileData: GitHubProfile = await profileRes.json();
        const reposData: Repo[] = await reposRes.json();

        if (!Array.isArray(reposData)) {
          throw new Error("Invalid repos response format");
        }

        const sortedRepos = [...reposData]
          .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
          .slice(0, 6);

        // Aggregate language bytes from each repo's /languages endpoint.
        // Fall back to per-repo "language" field (1-byte weight) if the
        // /languages call fails for a particular repo.
        const topForLangs = [...reposData]
          .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
          .slice(0, 20);

        const langResults = await Promise.allSettled(
          topForLangs.map((repo) =>
            repo.languages_url
              ? fetch(repo.languages_url, { headers }).then((r) =>
                  r.ok ? (r.json() as Promise<Record<string, number>>) : null
                )
              : Promise.resolve(null)
          )
        );

        const langMap: Record<string, number> = {};
        topForLangs.forEach((repo, i) => {
          const result = langResults[i];
          const bytes = result.status === "fulfilled" ? result.value : null;
          if (bytes && typeof bytes === "object") {
            for (const [name, size] of Object.entries(bytes)) {
              langMap[name] = (langMap[name] || 0) + size;
            }
          } else if (repo.language) {
            langMap[repo.language] = (langMap[repo.language] || 0) + 1;
          }
        });

        const sortedLangs = Object.entries(langMap)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 6)
          .map(([name, count], i) => ({
            name,
            count,
            color: getLangColor(name, i),
          }));

        setProfile(profileData);
        setTopRepos(sortedRepos);
        setLangStats(sortedLangs);

        // Save fresh data into localStorage cache
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              profile: profileData,
              topRepos: sortedRepos,
              langStats: sortedLangs,
              timestamp: Date.now(),
            })
          );
        } catch {
          // Ignore cache save error
        }
      } catch (err) {
        console.warn("GitHub API unavailable, using fallback/cached data:", err);
        if (!hasCachedData) {
          setProfile(FALLBACK_PROFILE);
          setTopRepos(FALLBACK_REPOS);
          setLangStats(FALLBACK_LANGS);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const totalLangs = langStats.reduce((sum, l) => sum + l.count, 0);

  return (
    <section className="py-28 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-sm text-primary tracking-wider uppercase mb-3">
            📈 Open Source
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            GitHub Stats
          </h2>
          <p className="text-lg text-text-muted mb-12">
            My open-source activity and contribution stats
          </p>
        </motion.div>

        <motion.div
          className="bg-bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm shadow-black/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-start justify-center gap-8">
              {/* Profile summary card */}
              <div className="flex-1 w-full">                    <div className="bg-bg rounded-xl border border-border p-5">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={`https://github.com/${GITHUB_USERNAME}.png?size=80`}
                      alt={GITHUB_USERNAME}
                      className="w-14 h-14 rounded-full border-2 border-primary/30 bg-bg-card"
                      loading="lazy"
                    />
                    <div className="text-left">
                      <h3 className="font-bold text-text text-lg">{GITHUB_USERNAME}</h3>
                      <p className="text-sm text-text-muted">{profile?.public_repos || 0} repositories</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <StatBox label="Repos" value={profile?.public_repos || 0} />
                    <StatBox label="Stars" value={topRepos.reduce((s, r) => s + r.stargazers_count, 0)} />
                    <StatBox label="Followers" value={profile?.followers || 0} />
                  </div>
                </div>
              </div>

              {/* Language breakdown */}
              <div className="flex-1 w-full">
                <div className="bg-bg rounded-xl border border-border p-5">
                  <h4 className="font-bold text-text text-sm mb-4 text-left">Top Languages</h4>
                  {/* Language bar */}
                  <div className="flex rounded-full overflow-hidden h-3 mb-4">
                    {langStats.map((lang) => (
                      <div
                        key={lang.name}
                        style={{
                          width: `${(lang.count / totalLangs) * 100}%`,
                          backgroundColor: lang.color,
                        }}
                        className="transition-all duration-500"
                        title={`${lang.name}: ${lang.count} repos`}
                      />
                    ))}
                  </div>
                  {/* Language list */}
                  <div className="space-y-2.5">
                    {langStats.map((lang) => (
                      <div key={lang.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: lang.color }}
                          />
                          <span className="text-sm text-text font-medium">{lang.name}</span>
                        </div>
                        <span className="text-xs text-text-muted font-mono">
                          {Math.round((lang.count / totalLangs) * 100)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Top repos */}
        {!loading && topRepos.length > 0 && (
          <motion.div
            className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {topRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-bg-card rounded-xl border border-border p-4 text-left hover:shadow-lg hover:shadow-black/20 hover:border-primary/30 hover:-translate-y-1 transition-all duration-250 group"
              >
                <h4 className="font-bold text-sm text-text group-hover:text-primary transition-colors mb-1 truncate">
                  {repo.name}
                </h4>
                {repo.description && (
                  <p className="text-xs text-text-muted line-clamp-2 mb-3">{repo.description}</p>
                )}
                <div className="flex items-center gap-3">
                  {repo.language && (
                    <span className="flex items-center gap-1.5 text-xs text-text-muted">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: getLangColor(repo.language, 0) }}
                      />
                      {repo.language}
                    </span>
                  )}
                  {repo.stargazers_count > 0 && (
                    <span className="flex items-center gap-1 text-xs text-text-muted">
                      ⭐ {repo.stargazers_count}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </motion.div>
        )}

        <motion.a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-8 text-sm text-text-muted hover:text-primary transition-colors group"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <span>
            View full profile on <strong className="text-text group-hover:text-primary transition-colors">github.com/{GITHUB_USERNAME}</strong>
          </span>
          <svg className="w-3.5 h-3.5 text-text-muted group-hover:text-primary group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </motion.a>
      </div>
    </section>
  );
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-bg rounded-lg border border-border p-3 text-center">
      <p className="text-xl font-bold text-primary">{value}</p>
      <p className="text-[11px] text-text-muted font-medium">{label}</p>
    </div>
  );
}
