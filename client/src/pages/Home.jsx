import { useEffect, useState, useRef, useCallback, Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaDownload, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
} from "framer-motion";
import { fetchGitHubRepos, getCachedRepos } from "../utils/githubRepos";
import { updateSeo } from "../utils/seo";
import TerminalHero from "../components/TerminalHero";
import GlitchText from "../components/GlitchText";
import OrbitalRing from "../components/OrbitalRing";

const SkillRadar = lazy(() => import("../components/SkillRadar"));
const LanguageChart = lazy(() => import("../components/LanguageChart"));
const SolarSystem = lazy(() => import("../components/SolarSystem"));
const SolarSystemMobile = lazy(() => import("../components/SolarSystemMobile"));

const GITHUB_USERNAME = "Nsarkar-XLR8";

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
          <span
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ fontFamily: "JetBrains Mono, monospace", color: "var(--color-accent)" }}
          >
            Featured
          </span>
          <span className="h-2 w-2 rounded-full" style={{ background: "var(--neon-green)", boxShadow: "0 0 0.5em rgba(0,255,136,0.5)" }} />
        </div>

        <h3 className="mb-3 text-xl font-bold text-main transition-colors duration-300 group-hover:text-[var(--color-accent)]">
          {repo.name.replace(/[-_]/g, " ")}
        </h3>
        <p className="mb-6 flex-grow text-sm leading-7 text-muted">
          {repo.description || "A public repository from my recent engineering work."}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-accent-soft pt-5">
          <span className="text-sm" style={{ color: "var(--neon-cyan)", fontFamily: "JetBrains Mono, monospace" }}>
            {repo.language || "Code"}
          </span>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${repo.name} on GitHub`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-main transition-colors hover:text-[var(--color-accent)]"
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
  const [isMobile, setIsMobile] = useState(false);

  const { scrollY } = useScroll();
  const portraitY = useTransform(scrollY, [0, 520], [0, -64]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    updateSeo({
      title: "Nayem Sarkar | Software Engineer & Backend Architect",
      description:
        "Official portfolio of Nayem Sarkar, Software Engineer and Backend Architect specializing in Java, Spring Boot, NestJS, microservices, secure APIs, and optimized data systems.",
      keywords:
        "Nayem Sarkar, nayem sarkar, Software Engineer Bangladesh, Backend Architect Dhaka, Java developer, Spring Boot engineer, NestJS developer, portfolio",
      path: "/",
    });

    const preloadSolar = () => import("../components/SolarSystem");
    if ("requestIdleCallback" in window) {
      requestIdleCallback(preloadSolar, { timeout: 5000 });
    } else {
      setTimeout(preloadSolar, 2000);
    }
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
        const freshRepos = await fetchGitHubRepos(GITHUB_USERNAME, controller.signal);
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
  }, []);

  return (
    <div className="page-shell min-h-screen w-full">
      <section className="section-wrap grid min-h-screen items-center gap-12 pt-28 pb-16 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          variants={staggerGroup}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          <motion.span variants={sectionReveal} className="section-kicker">
            Software Engineer // Backend Architect
          </motion.span>

          <motion.h1
            variants={sectionReveal}
            className="display-title mt-6 text-5xl sm:text-6xl lg:text-7xl"
          >
            <GlitchText>Nayem Sarkar</GlitchText>
          </motion.h1>

          <motion.div variants={sectionReveal} className="mt-5 flex justify-center lg:justify-start">
            <TerminalHero />
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
            className="mt-8 flex justify-center gap-4 lg:justify-start"
          >
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                aria-label={social.label}
                className="grid h-11 w-11 place-items-center rounded-full text-lg transition"
                style={{
                  border: "1px solid rgba(0, 240, 255, 0.15)",
                  background: "rgba(0, 240, 255, 0.03)",
                  color: "var(--color-text-muted)",
                }}
                whileHover={{
                  y: -5,
                  scale: 1.1,
                  rotate: -3,
                  boxShadow: "0 0 1em rgba(0, 240, 255, 0.3)",
                  color: "var(--color-accent)",
                  borderColor: "rgba(0, 240, 255, 0.5)",
                }}
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
          className="hero-panel motion-float-slow rounded-3xl p-4 sm:p-5 relative"
          whileHover={{ y: -10, rotate: 0.35 }}
          whileTap={{ scale: 0.99 }}
        >
          <OrbitalRing />
          <div className="image-frame overflow-hidden rounded-2xl">
            <motion.img
              whileHover={{ scale: 1.035 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              src="/Nayem.jpeg"
              alt="Nayem Sarkar"
              width="400"
              height="500"
              loading="eager"
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
                <div
                  className="text-2xl font-black"
                  style={{
                    color: "var(--color-accent)",
                    textShadow: "0 0 0.5em rgba(0, 240, 255, 0.4)",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  {stat.value}
                </div>
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
              <h3
                className="mb-5 text-xl font-bold text-main"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                {group.title}
              </h3>
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
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerGroup}
      >
        <motion.div variants={sectionReveal} className="mb-10 text-center">
          <span className="section-kicker">Solar system</span>
          <h2 className="mt-4 text-3xl font-black text-main md:text-5xl">
            My backend stack in orbit
          </h2>
          <p className="lead-copy mx-auto mt-4 max-w-2xl">
            Each planet represents a core technology in my engineering toolkit.
          </p>
        </motion.div>

        {isMobile ? (
          <Suspense fallback={<div className="solar-system-container"><div className="solar-system-loading"><div className="orbit-spinner" style={{position:"relative"}} /><span>Initializing orbital view...</span></div></div>}>
            <SolarSystemMobile />
          </Suspense>
        ) : (
          <Suspense fallback={<div className="solar-system-container"><div className="solar-system-loading"><div className="orbit-spinner" style={{position:"relative"}} /><span>Loading 3D scene...</span></div></div>}>
            <SolarSystem />
          </Suspense>
        )}
      </motion.section>

      <motion.section
        className="section-wrap py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerGroup}
      >
        <motion.div variants={sectionReveal} className="mb-10 text-center">
          <span className="section-kicker">Analytics</span>
          <h2 className="mt-4 text-3xl font-black text-main md:text-5xl">
            Skills and language breakdown
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          <Suspense fallback={<div className="surface-card rounded-xl p-6 h-[380px]" />}>
            <SkillRadar />
          </Suspense>
          <Suspense fallback={<div className="surface-card rounded-xl p-6 h-[380px]" />}>
            <LanguageChart />
          </Suspense>
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
