import { useEffect, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { updateSeo } from "../utils/seo";
import { FaExternalLinkAlt } from "react-icons/fa";

const SkillRadar = lazy(() => import("../components/SkillRadar"));
const ContributionHeatmap = lazy(() => import("../components/ContributionHeatmap"));

const generateStableKey = (str, index) => `${str.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${index}`;

const skills = [
  "Java",
  "Spring Boot",
  "NestJS",
  "Microservices",
  "Spring Cloud Gateway",
  "Eureka",
  "RabbitMQ",
  "Redis",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Hibernate",
  "Spring Data JPA",
  "Native SQL CTEs",
  "RESTful API Design",
  "Swagger",
  "Scalar OpenAPI",
  "OAuth2",
  "JWT",
  "WebSockets",
  "Stripe API",
  "PayPal API",
  "Docker",
  "Linux",
  "VPS",
  "CI/CD",
  "JUnit",
  "Mockito",
];

const experience = [
  {
    year: "Apr 2026 - Present",
    role: "Software Engineer (Backend)",
    company: "Tyrand",
    url: "https://www.tyrand.dev/",
    type: "Professional",
    description:
      "Engineering product-based backend systems and microservices using TypeScript, NestJS, Java, and Spring Boot, delivering scalable API architecture and core platform infrastructure.",
  },
  {
    year: "Dec 2025 - Aug 2026",
    role: "Software Engineer (Backend)",
    company: "ScaleUp Ads Agency",
    url: "https://scaleupadsagency.com/",
    type: "Professional",
    description:
      "Refactored core modules of a legacy monolithic application into type-safe distributed microservices using Java, Spring Boot, TypeScript, and NestJS, with Spring Cloud Gateway and Eureka improving service boundaries and feature delivery.",
  },
  {
    year: "Dec 2022 - Nov 2025",
    role: "Freelance Backend Developer",
    company: "Independent Contractor (University Senior Collaboration)",
    type: "Freelance",
    description:
      "Collaborated with a university senior to deliver end-to-end backend systems for 6 international clients across e-commerce, content delivery, and service booking domains using TypeScript, NestJS, Java, and Spring Boot.",
    projects: [
      { name: "VendoFood", url: "https://vendofood.com", label: "Multi-tenant E-Commerce with Redis Catalog Caching" },
      { name: "SktchLabs", url: "https://sktchlabs.com", label: "Automated Print-on-Demand Asset Pipeline" },
      { name: "Witklip Farm", url: "https://witklipfarm.com", label: "Geospatial Booking & Scheduling System" },
    ],
  },
  {
    year: "2020 - 2025",
    role: "B.Sc. in Computer Science & Engineering",
    company: "Academic",
    type: "Academic",
    description:
      "Built a strong foundation in algorithms, data structures, system modeling, testing, database design, and advanced web technologies.",
  },
  {
    year: "2017 - 2019",
    role: "Higher Secondary Education",
    company: "Academic",
    type: "Academic",
    description:
      "Developed the physics and mathematics foundation that still shapes how I reason through engineering problems.",
  },
];

const strengths = [
  {
    title: "Distributed Systems",
    text: "I design modular backend services with clear boundaries, reliable communication patterns, and maintainable deployment paths.",
  },
  {
    title: "Data Architecture",
    text: "I model relational and document data carefully, optimize access paths, and use caching where it improves real system behavior.",
  },
  {
    title: "Reliability",
    text: "I build secure APIs, idempotent integrations, and tested backend workflows that hold up under production pressure.",
  },
];

const achievements = [
  "Migrated legacy monolithic modules into Java Spring Boot microservices.",
  "Built recursive hierarchical logic using Native SQL CTEs and Spring Data JPA.",
  "Improved query response times by 25% through Hibernate optimization and caching.",
  "Integrated Stripe payment workflows with idempotent webhook processing.",
  "CSE Project Show Champion in Spring 2024 and Spring 2025.",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const About = () => {
  useEffect(() => {
    updateSeo({
      title: "About Nayem Sarkar | Backend Architect & Software Engineer",
      description:
        "Learn about Nayem Sarkar, a Software Engineer and Backend Architect focused on Spring Boot, NestJS, distributed systems, microservices, Hibernate, Redis, and secure API design.",
      keywords:
        "Nayem Sarkar about, Nayem Sarkar skills, Nayem Sarkar experience, Backend Architect Bangladesh, Java Spring Boot developer, microservices architect",
      path: "/about",
    });
  }, []);

  return (
    <div className="page-shell min-h-screen w-full px-4 py-28 md:px-8">
      <motion.section
        className="section-wrap grid gap-10 lg:grid-cols-[0.95fr_1.05fr]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <span className="section-kicker">About</span>
          <h1 className="display-title mt-5 text-5xl md:text-7xl">Backend engineering with intent.</h1>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="hero-panel motion-float-slow rounded-3xl p-6 md:p-8"
          whileHover={{ y: -8, rotate: -0.25 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
        >
          <p className="lead-copy text-lg">
            I am <span className="font-bold" style={{ color: "var(--color-accent)", textShadow: "0 0 0.5em rgba(0,240,255,0.3)" }}>Nayem Sarkar</span>, a Software Engineer
            and Backend Architect specializing in high-throughput distributed systems, type-safe
            enterprise architectures, and cloud-ready backend services.
          </p>
          <p className="lead-copy mt-5">
            My core stack is Java with Spring Boot and NestJS. I work across microservices,
            persistence, security, asynchronous processing, payment integrations, and performance
            optimization.
          </p>
        </motion.div>
      </motion.section>

      <motion.section
        className="section-wrap py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-8">
          <span className="section-kicker">Strengths</span>
          <h2 className="mt-4 text-3xl font-black text-main md:text-5xl">How I approach the work</h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {strengths.map((item) => (
            <motion.article
              layout
              key={item.title}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.015 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="surface-card motion-rise rounded-xl p-6"
            >
              <h3
                className="text-xl font-bold text-main"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {item.title}
              </h3>
              <p className="mt-4 leading-7 text-muted">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="section-wrap grid gap-10 py-10 lg:grid-cols-[0.9fr_1.1fr]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <span className="section-kicker">Capability</span>
          <h2 className="mt-4 text-3xl font-black text-main md:text-5xl">Backend tools I use to ship</h2>
          <p className="lead-copy mt-5">
            The stack is intentionally focused: Spring Boot and NestJS for backend development,
            mature data layers for persistence, strong API documentation, secure authentication,
            and disciplined testing.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="hero-panel rounded-3xl p-6">
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <motion.span
                key={generateStableKey(skill, index)}
                className="skill-pill rounded-full px-4 py-2 text-sm font-semibold"
                whileHover={{ y: -5, scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        className="section-wrap grid gap-10 py-20 lg:grid-cols-[1.05fr_0.95fr]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <span className="section-kicker">Journey</span>
          <h2 className="mt-4 text-3xl font-black text-main md:text-5xl">Backend systems experience</h2>
          <div className="mt-10 space-y-6 border-l pl-6" style={{ borderColor: "rgba(0,240,255,0.2)" }}>
            {experience.map((exp, index) => (
              <motion.article
                layout
                key={generateStableKey(exp.role, index)}
                variants={itemVariants}
                className="relative surface-card motion-rise rounded-xl p-6"
                whileHover={{ x: 8, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 230, damping: 20 }}
              >
                <span
                  className="absolute -left-[35px] top-7 h-4 w-4 rounded-full border-4"
                  style={{
                    borderColor: "var(--color-bg)",
                    background: "var(--color-accent)",
                    boxShadow: "0 0 0.6em rgba(0,240,255,0.4)",
                  }}
                />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-xl font-bold text-main">{exp.role}</h3>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em]"
                    style={{
                      border: "1px solid rgba(0,240,255,0.25)",
                      color: "var(--color-accent)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {exp.type}
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold flex flex-wrap items-center gap-2" style={{ color: "var(--color-accent)" }}>
                  {exp.url ? (
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:underline transition-all duration-200"
                      style={{ color: "var(--color-accent)" }}
                    >
                      <span>{exp.company}</span>
                      <FaExternalLinkAlt className="text-xs opacity-80" />
                    </a>
                  ) : (
                    <span>{exp.company}</span>
                  )}
                  <span className="text-muted opacity-60">|</span>
                  <span className="text-muted">{exp.year}</span>
                </p>
                <p className="mt-4 leading-7 text-muted">{exp.description}</p>
                {exp.projects && exp.projects.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {exp.projects.map((proj) => (
                      <a
                        key={proj.name}
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-mono transition-all duration-200 hover:scale-105"
                        style={{
                          background: "rgba(0, 240, 255, 0.08)",
                          border: "1px solid rgba(0, 240, 255, 0.25)",
                          color: "var(--color-main)",
                        }}
                      >
                        <span className="font-bold text-accent">{proj.name}</span>
                        <span className="text-muted hidden sm:inline">• {proj.label}</span>
                        <FaExternalLinkAlt className="text-[10px] opacity-75" />
                      </a>
                    ))}
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="hero-panel motion-breathe self-start rounded-3xl p-6 md:p-8"
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
        >
          <span className="section-kicker">Highlights</span>
          <ul className="mt-6 space-y-4">
            {achievements.map((item, index) => (
              <motion.li
                key={generateStableKey(item, index)}
                variants={itemVariants}
                className="flex gap-3 leading-7 text-muted"
              >
                <span
                  className="mt-2 h-2 w-2 flex-none rounded-full"
                  style={{
                    background: "var(--neon-green)",
                    boxShadow: "0 0 0.4em rgba(0,255,136,0.5)",
                  }}
                />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.section>

      <motion.section
        className="section-wrap py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-10 text-center">
          <span className="section-kicker">Analytics</span>
          <h2 className="mt-4 text-3xl font-black text-main md:text-5xl">
            Skills and activity
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          <Suspense fallback={<div className="surface-card rounded-xl p-6 h-[380px]" />}>
            <SkillRadar />
          </Suspense>
          <Suspense fallback={<div className="surface-card rounded-xl p-6 h-[380px]" />}>
            <ContributionHeatmap />
          </Suspense>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
