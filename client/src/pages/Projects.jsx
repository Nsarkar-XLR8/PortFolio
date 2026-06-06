import { useEffect, useState } from "react";
import { FaArrowRight, FaCodeBranch, FaExclamationCircle, FaGithub, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { fetchGitHubRepos, getCachedRepos } from "../utils/githubRepos";
import { updateSeo } from "../utils/seo";

const formatName = (name) =>
  name
    .replace(/[-_]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const SkeletonCard = ({ index }) => (
  <motion.div
    className="surface-card rounded-xl p-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
  >
    <div className="mb-5 h-4 w-24 rounded skeleton-line" />
    <div className="mb-4 h-7 w-3/4 rounded skeleton-line" />
    <div className="mb-2 h-4 w-full rounded skeleton-line" />
    <div className="mb-8 h-4 w-5/6 rounded skeleton-line" />
    <div className="flex justify-between border-t border-accent-soft pt-5">
      <div className="h-8 w-24 rounded skeleton-line" />
      <div className="h-8 w-20 rounded skeleton-line" />
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
  const username = "Nsarkar-XLR8";

  useEffect(() => {
    updateSeo({
      title: "Projects | Nayem Sarkar",
      description:
        "Explore backend engineering projects by Nayem Sarkar, including Java, Spring Boot, NestJS, microservices, APIs, and data architecture work.",
      path: "/projects",
    });
    const cachedRepos = getCachedRepos();
    if (cachedRepos) {
      setRepos(cachedRepos);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
    setIsError(false);

    const controller = new AbortController();

    const fetchProjects = async () => {
      try {
        const freshRepos = await fetchGitHubRepos(username, controller.signal);
        setRepos(freshRepos);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch repositories:", err);
          setIsError(true);
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    fetchProjects();

    return () => controller.abort();
  }, [username]);

  return (
    <div className="page-shell min-h-screen w-full px-4 py-28 md:px-8">
      <motion.section
        className="section-wrap text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.span className="section-kicker justify-center" variants={itemVariants}>
          Work
        </motion.span>
        <motion.h1 className="display-title mx-auto mt-5 max-w-4xl text-5xl md:text-7xl" variants={itemVariants}>
          Projects that show how I think and build.
        </motion.h1>
        <motion.p className="lead-copy mx-auto mt-6 max-w-3xl text-lg md:text-xl" variants={itemVariants}>
          A live feed from GitHub, filtered to highlight original repositories and recent engineering work.
        </motion.p>
      </motion.section>

      <motion.section
        className="section-wrap grid min-h-[50vh] grid-cols-1 gap-6 py-20 sm:grid-cols-2 lg:grid-cols-3"
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
          </div>
        ) : repos.length > 0 ? (
          repos.map((repo) => (
            <motion.article
              layout
              key={repo.id}
              className="group surface-card motion-rise flex min-h-[300px] flex-col rounded-xl p-6"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.018, rotate: 0.18 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 260, damping: 19 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="rounded-full border border-accent-soft px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-accent">
                  {repo.language || "Code"}
                </span>
                <motion.span
                  className="text-xl text-muted transition group-hover:text-[var(--color-hover)]"
                  whileHover={{ rotate: 8, scale: 1.12 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                >
                  <FaGithub />
                </motion.span>
              </div>

              <h2 className="text-2xl font-black text-main transition group-hover:text-[var(--color-hover)]">
                {formatName(repo.name)}
              </h2>
              <p className="mt-4 flex-grow leading-7 text-muted">
                {repo.description || "No description provided for this repository yet."}
              </p>

              <div className="mt-7 flex flex-wrap gap-3 text-sm text-accent">
                <span className="inline-flex items-center gap-2">
                  <FaStar aria-hidden="true" /> {repo.stargazers_count}
                </span>
                <span className="inline-flex items-center gap-2">
                  <FaCodeBranch aria-hidden="true" /> {repo.forks_count}
                </span>
                <span className="inline-flex items-center gap-2">
                  <FaExclamationCircle aria-hidden="true" /> {repo.open_issues_count}
                </span>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-accent-soft pt-5">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-main transition hover:text-[var(--color-hover)]"
                >
                  Repository <FaArrowRight aria-hidden="true" />
                </a>
                {repo.homepage && (
                  <a
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary rounded-lg px-4 py-2 text-sm font-bold"
                  >
                    Live
                  </a>
                )}
              </div>
            </motion.article>
          ))
        ) : (
          <div className="hero-panel motion-breathe col-span-full rounded-3xl p-8 text-center">
            <p className="text-xl font-bold text-main">No public repositories found.</p>
            <p className="mt-3 text-muted">All repositories may be private or excluded by the filter.</p>
          </div>
        )}
      </motion.section>
    </div>
  );
};

export default Projects;
