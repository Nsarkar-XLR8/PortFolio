import { useEffect, useState, useCallback } from "react";
import {
  FaArrowRight,
  FaCodeBranch,
  FaExclamationCircle,
  FaGithub,
  FaStar,
  FaExternalLinkAlt,
  FaPlay,
  FaCode,
  FaTerminal,
} from "react-icons/fa";
import { motion } from "framer-motion";
import {
  fetchGitHubRepos,
  getCachedRepos,
  getLiveUrl,
  getPlatformBadge,
  getLanguageConfig,
} from "../utils/githubRepos";
import { updateSeo } from "../utils/seo";
import LivePreviewModal from "../components/LivePreviewModal";

const GITHUB_USERNAME = "Nsarkar-XLR8";

const formatName = (name) =>
  name
    .replace(/[-_]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const SkeletonCard = ({ index }) => (
  <motion.div
    className="surface-card rounded-2xl p-6 overflow-hidden"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
  >
    <div className="mb-4 h-40 w-full rounded-xl skeleton-line" />
    <div className="mb-4 h-4 w-24 rounded skeleton-line" />
    <div className="mb-3 h-7 w-3/4 rounded skeleton-line" />
    <div className="mb-2 h-4 w-full rounded skeleton-line" />
    <div className="mb-6 h-4 w-5/6 rounded skeleton-line" />
    <div className="flex justify-between border-t border-accent-soft pt-4">
      <div className="h-8 w-24 rounded skeleton-line" />
      <div className="h-8 w-24 rounded skeleton-line" />
    </div>
  </motion.div>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
  },
};

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [activePreviewRepo, setActivePreviewRepo] = useState(null);

  const fetchProjects = useCallback(async (signal) => {
    setIsError(false);
    setIsLoading(true);
    try {
      const freshRepos = await fetchGitHubRepos(GITHUB_USERNAME, signal);
      setRepos(freshRepos);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Failed to fetch repositories:", err);
        setIsError(true);
      }
    } finally {
      if (!signal.aborted) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    updateSeo({
      title: "Projects by Nayem Sarkar | Java, Spring Boot, NestJS",
      description:
        "Explore backend engineering and full-stack projects by Nayem Sarkar with live deployments on Vercel & Render, GitHub source code, and microservices architecture.",
      keywords:
        "Nayem Sarkar projects, Nayem Sarkar GitHub, Java projects, Spring Boot projects, NestJS projects, backend developer portfolio, live web previews, microservices projects",
      path: "/projects",
    });

    const cachedRepos = getCachedRepos();
    if (cachedRepos) {
      setRepos(cachedRepos);
      setIsLoading(false);
    }

    const controller = new AbortController();
    fetchProjects(controller.signal);
    return () => controller.abort();
  }, [fetchProjects]);

  return (
    <div className="page-shell min-h-screen w-full px-4 py-28 md:px-8">
      <motion.section
        className="section-wrap text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.span className="section-kicker justify-center" variants={itemVariants}>
          Work & Applications
        </motion.span>
        <motion.h1 className="display-title mx-auto mt-5 max-w-4xl text-5xl md:text-7xl" variants={itemVariants}>
          Projects that show how I think and build.
        </motion.h1>
        <motion.p className="lead-copy mx-auto mt-6 max-w-3xl text-lg md:text-xl" variants={itemVariants}>
          Source code repositories and live applications deployed on Vercel, Render, and GitHub Pages.
        </motion.p>
      </motion.section>

      <motion.section
        className="section-wrap grid min-h-[50vh] grid-cols-1 gap-6 py-16 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {isLoading && repos.length === 0 ? (
          Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} index={index} />)
        ) : isError && repos.length === 0 ? (
          <div className="hero-panel col-span-full rounded-3xl p-8 text-center">
            <p className="text-xl font-bold text-[var(--color-error)]">
              Failed to load projects from GitHub.
            </p>
            <p className="mt-3 text-muted">Please check the network or GitHub API rate limits.</p>
            <button
              onClick={() => {
                const controller = new AbortController();
                fetchProjects(controller.signal);
              }}
              className="btn-primary mt-6 rounded-lg px-6 py-3 font-bold"
            >
              Retry
            </button>
          </div>
        ) : repos.length > 0 ? (
          repos.map((repo) => {
            const liveUrl = getLiveUrl(repo);
            const platform = getPlatformBadge(liveUrl);
            const langConfig = getLanguageConfig(repo.language);

            return (
              <motion.article
                layout
                key={repo.id}
                className="group surface-card motion-rise flex min-h-[400px] flex-col overflow-hidden rounded-2xl p-0 transition-all duration-300 border border-[var(--color-accent-soft)] hover:border-[var(--color-accent)]/40 shadow-lg"
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                {/* Project Visual Tech Header Banner */}
                <div className={`relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br ${langConfig.gradient} p-5 flex flex-col justify-between border-b border-accent-soft`}>
                  {/* Background Grid Pattern & Watermark */}
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)",
                      backgroundSize: "16px 16px",
                    }}
                  />
                  <span className="absolute -bottom-4 -right-2 text-7xl font-black font-mono tracking-tighter opacity-10 text-white select-none uppercase pointer-events-none">
                    {repo.language || "CODE"}
                  </span>

                  {/* Top Badges */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span
                      className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md"
                      style={{
                        backgroundColor: langConfig.badgeBg,
                        border: `1px solid ${langConfig.border}`,
                        color: langConfig.accent,
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {repo.language || "Code"}
                    </span>

                    {platform && (
                      <span
                        className="rounded-full px-2.5 py-0.5 text-xs font-bold flex items-center gap-1.5 backdrop-blur-md shadow-lg"
                        style={{
                          backgroundColor: platform.bg,
                          color: platform.color,
                          border: `1px solid ${platform.color}50`,
                        }}
                      >
                        <span className="live-pulse-dot" />
                        <span>{platform.name}</span>
                      </span>
                    )}
                  </div>

                  {/* Banner Title Preview */}
                  <div className="relative z-10 my-auto pt-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-[var(--neon-cyan)] mb-1">
                      <FaTerminal className="text-[10px]" />
                      <span>nsarkar/{repo.name}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug line-clamp-2">
                      {formatName(repo.name)}
                    </h3>
                  </div>

                  {/* Quick Action Overlay Buttons on Hover */}
                  {liveUrl && (
                    <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/75 opacity-0 group-hover:opacity-100 backdrop-blur-[3px] transition-opacity duration-300 z-20 p-4 pointer-events-none group-hover:pointer-events-auto">
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="btn-primary rounded-full px-4 py-2.5 text-xs font-bold flex items-center gap-1.5 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 pointer-events-auto"
                      >
                        <FaExternalLinkAlt className="text-[10px]" /> Live Site
                      </a>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePreviewRepo({ repo, liveUrl });
                        }}
                        className="rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/20 px-4 py-2.5 text-xs font-bold flex items-center gap-1.5 backdrop-blur-md shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 pointer-events-auto"
                        title="Open interactive preview modal"
                      >
                        <FaPlay className="text-[10px]" /> Preview
                      </button>
                    </div>
                  )}
                </div>

                {/* Card Content Body */}
                <div className="flex flex-grow flex-col p-6 bg-[#0d1117]/80">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-main transition group-hover:text-[var(--color-accent)] truncate">
                      {formatName(repo.name)}
                    </h2>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-muted transition hover:text-[var(--color-accent)] shrink-0 ml-2"
                      title="View GitHub Repository"
                    >
                      <FaGithub />
                    </a>
                  </div>

                  <p className="mt-3 flex-grow leading-6 text-sm text-muted line-clamp-3">
                    {repo.description || "No description provided for this repository yet."}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3 text-xs" style={{ color: "var(--neon-cyan)" }}>
                    <span className="inline-flex items-center gap-1.5 font-mono">
                      <FaStar aria-hidden="true" /> {repo.stargazers_count}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono">
                      <FaCodeBranch aria-hidden="true" /> {repo.forks_count}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono">
                      <FaExclamationCircle aria-hidden="true" /> {repo.open_issues_count}
                    </span>
                  </div>

                  {/* Card Footer Links */}
                  <div className="mt-6 flex items-center justify-between border-t border-accent-soft pt-4">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-main transition hover:text-[var(--color-accent)]"
                    >
                      Repository <FaArrowRight aria-hidden="true" className="text-[10px]" />
                    </a>

                    {liveUrl ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePreviewRepo({ repo, liveUrl });
                          }}
                          className="rounded-lg p-2 text-xs text-muted hover:bg-white/10 hover:text-white transition"
                          title="Interactive Frame Preview"
                        >
                          <FaPlay className="text-[10px]" />
                        </button>
                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="btn-primary rounded-lg px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5 shadow-md"
                          title={`Open ${liveUrl} in a new tab`}
                        >
                          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Live Site</span>
                          <FaExternalLinkAlt className="text-[10px] ml-0.5" />
                        </a>
                      </div>
                    ) : (
                      <span className="text-xs text-muted/60 font-mono">Code Repo</span>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })
        ) : (
          <div className="hero-panel motion-breathe col-span-full rounded-3xl p-8 text-center">
            <p className="text-xl font-bold text-main">No public repositories found.</p>
            <p className="mt-3 text-muted">All repositories may be private or excluded by the filter.</p>
          </div>
        )}
      </motion.section>

      {/* Render Live Preview Modal */}
      {activePreviewRepo && (
        <LivePreviewModal
          repo={activePreviewRepo.repo}
          liveUrl={activePreviewRepo.liveUrl}
          onClose={() => setActivePreviewRepo(null)}
        />
      )}
    </div>
  );
};

export default Projects;
