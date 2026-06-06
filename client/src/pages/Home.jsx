import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaDownload, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
} from "framer-motion";
import { fetchGitHubRepos, getCachedRepos } from "../utils/githubRepos";
import { updateSeo } from "../utils/seo";

const roles = ["Software Engineer", "Backend Architect", "Spring Boot Specialist", "NestJS Engineer"];

const skillGroups = [
  {
    title: "Backend",
    items: ["Java", "Spring Boot", "NestJS", "REST APIs", "Microservices", "Hibernate"],
  },
  {
    title: "Systems & Data",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "RabbitMQ", "Native SQL"],
  },
  {
    title: "Delivery & Quality",
    items: ["Docker", "Linux", "VPS", "CI/CD", "JUnit", "Mockito"],
  },
];

const stats = [
  { value: "25%", label: "Query response improvement through data access optimization" },
  { value: "100+", label: "Problems solved across platforms" },
  { value: "99.9%", label: "Transaction reliability focus for payment workflows" },
];

const socials = [
  { label: "GitHub", href: "https://github.com/Nsarkar-XLR8", icon: <FaGithub /> },
  { label: "LinkedIn", href: "https://linkedin.com/in/nayem-sarkar", icon: <FaLinkedin /> },
  { label: "Email", href: "mailto:nsarkar6251@gmail.com", icon: <FaEnvelope /> },
];

const sectionReveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerGroup = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.08 },
  },
};

const ProjectCard = ({ repo, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 260, damping: 28, mass: 0.45 });
  const mouseYSpring = useSpring(y, { stiffness: 260, damping: 28, mass: 0.45 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;

    requestAnimationFrame(() => {
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    });
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.article
      layout
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 34, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group surface-card motion-rise rounded-xl overflow-hidden p-6"
      whileTap={{ scale: 0.985 }}
    >
      <div className="flex h-full flex-col" style={{ transform: "translateZ(32px)" }}>
        <div className="mb-6 flex items-center justify-between gap-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Featured
          </span>
          <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
        </div>

        <h3 className="mb-3 text-xl font-bold text-main transition-colors duration-300 group-hover:text-[var(--color-hover)]">
          {repo.name.replace(/[-_]/g, " ")}
        </h3>
        <p className="mb-6 flex-grow text-sm leading-7 text-muted">
          {repo.description || "A public repository from my recent engineering work."}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-accent-soft pt-5">
          <span className="text-sm text-accent">{repo.language || "Code"}</span>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${repo.name} on GitHub`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-main transition-colors hover:text-[var(--color-hover)]"
          >
            GitHub <FaArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.article>
  );
};

const ProjectSkeleton = ({ index }) => (
  <motion.div
    className="surface-card rounded-xl p-6"
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
  >
    <div className="mb-6 h-4 w-24 rounded skeleton-line" />
    <div className="mb-4 h-7 w-3/4 rounded skeleton-line" />
    <div className="mb-2 h-4 w-full rounded skeleton-line" />
    <div className="mb-8 h-4 w-5/6 rounded skeleton-line" />
    <div className="flex justify-between border-t border-accent-soft pt-5">
      <div className="h-5 w-20 rounded skeleton-line" />
      <div className="h-5 w-16 rounded skeleton-line" />
    </div>
  </motion.div>
);

const Home = () => {
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  const username = "Nsarkar-XLR8";
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const portraitY = useTransform(scrollY, [0, 520], [0, -64]);

  useEffect(() => {
    updateSeo({
      title: "Nayem Sarkar | Software Engineer & Backend Architect",
      description:
        "Official portfolio of Nayem Sarkar, Software Engineer and Backend Architect specializing in Java, Spring Boot, NestJS, microservices, secure APIs, and optimized data systems.",
      path: "/",
    });
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const cachedRepos = getCachedRepos();

    if (cachedRepos) {
      setRepos(cachedRepos.slice(0, 3));
      setIsLoading(false);
    }

    const fetchRepos = async () => {
      if (!cachedRepos) setIsLoading(true);
      setIsError(false);
      try {
        const freshRepos = await fetchGitHubRepos(username, controller.signal);
        setRepos(freshRepos.slice(0, 3));
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch repositories:", err);
          setIsError(true);
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    fetchRepos();

    return () => controller.abort();
  }, [username]);

  return (
    <div className="page-shell min-h-screen w-full">
      <motion.div
        className="animated-progress sticky top-0 left-0 right-0 z-50 h-1 origin-[0%] md:fixed"
        style={{ scaleX }}
      />

      <section className="section-wrap grid min-h-screen items-center gap-12 pt-28 pb-16 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          variants={staggerGroup}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          <motion.span variants={sectionReveal} className="section-kicker">
            Software Engineer | Backend Architect
          </motion.span>

          <motion.h1
            variants={sectionReveal}
            className="display-title mt-6 text-5xl sm:text-6xl lg:text-7xl"
          >
            Nayem Sarkar
          </motion.h1>

          <motion.div
            variants={sectionReveal}
            className="mt-5 flex justify-center lg:justify-start"
          >
            <motion.div
              className="hero-panel motion-breathe min-h-12 overflow-hidden rounded-full px-5 py-3"
              whileHover={{ scale: 1.035 }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={roles[roleIndex]}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="block text-sm font-bold uppercase tracking-[0.22em] text-accent"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </motion.div>

          <motion.p
            variants={sectionReveal}
            className="lead-copy mx-auto mt-7 max-w-2xl text-lg lg:mx-0 lg:text-xl"
          >
            I design high-throughput backend systems, type-safe enterprise architectures,
            and cloud-ready services using Java, Spring Boot, and NestJS.
          </motion.p>

          <motion.div
            variants={sectionReveal}
            className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start"
          >
            <Link to="/projects" className="btn-primary rounded-lg px-6 py-3 font-bold">
              View Work <FaArrowRight aria-hidden="true" />
            </Link>
            <Link to="/contact" className="btn-secondary rounded-lg px-6 py-3 font-bold">
              Contact Me <FaEnvelope aria-hidden="true" />
            </Link>
            <a
              href="/resume/SWE_RESUME.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="btn-secondary rounded-lg px-6 py-3 font-bold"
            >
              Resume <FaDownload aria-hidden="true" />
            </a>
          </motion.div>

          <motion.div
            variants={sectionReveal}
            className="mt-8 flex justify-center gap-4 text-muted lg:justify-start"
          >
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                aria-label={social.label}
                className="grid h-11 w-11 place-items-center rounded-full border border-accent-soft bg-[rgba(255,255,255,0.025)] text-lg transition hover:border-[rgba(191,161,129,0.42)] hover:text-[var(--color-hover)]"
                whileHover={{ y: -5, scale: 1.1, rotate: -3 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 330, damping: 18 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: portraitY }}
          initial={{ opacity: 0, y: 34, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="hero-panel motion-float-slow rounded-3xl p-4 sm:p-5"
          whileHover={{ y: -10, rotate: 0.35 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="image-frame overflow-hidden rounded-2xl">
            <motion.img
              whileHover={{ scale: 1.035 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              src="/Nayem.jpeg"
              alt="Nayem Sarkar"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                className="metric-card text-center"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                whileHover={{ y: -5, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <div className="text-2xl font-black text-accent">{stat.value}</div>
                <p className="mt-1 text-xs leading-5 text-muted">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <motion.section
        className="section-wrap py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerGroup}
      >
        <motion.div variants={sectionReveal} className="mb-10 text-center">
          <span className="section-kicker">Technical focus</span>
          <h2 className="mt-4 text-3xl font-black text-main md:text-5xl">
            Built for distributed systems and practical delivery
          </h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {skillGroups.map((group) => (
            <motion.article
              layout
              key={group.title}
              variants={sectionReveal}
              whileHover={{ y: -10, scale: 1.015 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="surface-card motion-rise rounded-xl p-6"
            >
              <h3 className="mb-5 text-xl font-bold text-main">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span key={skill} className="skill-pill rounded-full px-3 py-2 text-sm font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="section-wrap py-20"
        style={{ perspective: "1100px" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerGroup}
      >
        <motion.div variants={sectionReveal} className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="section-kicker">Selected repositories</span>
            <h2 className="mt-4 text-3xl font-black text-main md:text-5xl">
              Recent engineering work
            </h2>
          </div>
          <Link to="/projects" className="btn-secondary w-fit rounded-lg px-5 py-3 font-bold">
            All Projects <FaArrowRight aria-hidden="true" />
          </Link>
        </motion.div>

        <div className="grid min-h-[280px] grid-cols-1 gap-6 md:grid-cols-3">
          {isLoading && repos.length === 0 && (
            Array.from({ length: 3 }).map((_, index) => (
              <ProjectSkeleton key={index} index={index} />
            ))
          )}

          {isError && repos.length === 0 && (
            <p className="col-span-full text-center text-lg text-[var(--color-error)]">
              Error loading projects. Please check the network or GitHub API rate limits.
            </p>
          )}

          {repos.map((repo, index) => (
            <ProjectCard key={repo.id} repo={repo} index={index} />
          ))}

          {!isLoading && !isError && repos.length === 0 && (
            <p className="col-span-full text-center text-lg text-muted">No featured repositories found.</p>
          )}
        </div>
      </motion.section>

      <motion.section
        className="section-wrap py-24 text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-panel mx-auto max-w-4xl rounded-3xl px-6 py-12 md:px-12">
          <span className="section-kicker justify-center">Next collaboration</span>
          <h2 className="mt-5 text-3xl font-black text-main md:text-5xl">
            Have a system that needs stronger backend architecture?
          </h2>
          <p className="lead-copy mx-auto mt-5 max-w-2xl">
            I can help turn complex business requirements into reliable microservices,
            secure APIs, optimized schemas, and production-ready backend workflows.
          </p>
          <Link to="/contact" className="btn-primary mt-8 rounded-lg px-7 py-4 font-bold">
            Start a Conversation <FaArrowRight aria-hidden="true" />
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
