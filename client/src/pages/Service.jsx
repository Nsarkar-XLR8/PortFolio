import { useEffect } from "react";
import { FaArrowRight, FaDatabase, FaLock, FaProjectDiagram, FaServer } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { updateSeo } from "../utils/seo";

const services = [
  {
    icon: <FaServer />,
    title: "Spring Boot Backend Development",
    description:
      "Enterprise-grade backend services built with Java, Spring Boot, Spring Data JPA, and production-ready module boundaries.",
    points: ["Java", "Spring Boot", "Spring Data JPA"],
  },
  {
    icon: <FaProjectDiagram />,
    title: "NestJS & Microservices Architecture",
    description:
      "Type-safe backend systems, modular NestJS services, distributed communication, and maintainable API boundaries.",
    points: ["NestJS", "Microservices", "RabbitMQ"],
  },
  {
    icon: <FaDatabase />,
    title: "Data Persistence & Optimization",
    description:
      "Relational schema design, Hibernate ORM, Redis caching, recursive SQL logic, and query performance tuning.",
    points: ["Hibernate", "PostgreSQL", "Redis"],
  },
  {
    icon: <FaLock />,
    title: "Secure APIs & Integrations",
    description:
      "REST APIs, OpenAPI documentation, OAuth2/JWT security, WebSockets, and reliable payment integrations.",
    points: ["OAuth2", "JWT", "Stripe"],
  },
];

const process = [
  "Clarify domain rules, data flow, integration points, and reliability requirements.",
  "Design service boundaries, schemas, API contracts, and asynchronous processing paths.",
  "Build focused Spring Boot or NestJS services with tests, documentation, and security.",
  "Optimize persistence, deployment, monitoring readiness, and production behavior.",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
  },
};

const Service = () => {
  useEffect(() => {
    updateSeo({
      title: "Backend Services | Nayem Sarkar",
      description:
        "Backend engineering services by Nayem Sarkar: Java Spring Boot development, NestJS architecture, microservices, secure APIs, persistence optimization, and integrations.",
      path: "/services",
    });
  }, []);

  return (
    <div className="page-shell min-h-screen w-full px-4 py-28 md:px-8">
      <motion.section
        className="section-wrap text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.span className="section-kicker justify-center" variants={itemVariants}>
          Services
        </motion.span>
        <motion.h1 className="display-title mx-auto mt-5 max-w-4xl text-5xl md:text-7xl" variants={itemVariants}>
          Backend systems built for scale, reliability, and clarity.
        </motion.h1>
        <motion.p className="lead-copy mx-auto mt-6 max-w-3xl text-lg md:text-xl" variants={itemVariants}>
          I work on NestJS and Spring Boot only, helping teams design microservices,
          secure APIs, optimized persistence layers, and reliable integration workflows.
        </motion.p>
      </motion.section>

      <motion.section
        className="section-wrap grid gap-5 py-20 md:grid-cols-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {services.map((service, index) => (
          <motion.article
            layout
            key={service.title}
            className="group surface-card motion-rise rounded-2xl p-6 md:p-8"
            variants={itemVariants}
            whileHover={{ y: -12, scale: 1.015 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 230, damping: 18 }}
          >
            <div className="mb-8 flex items-start justify-between gap-6">
              <div className="grid h-14 w-14 place-items-center rounded-2xl border border-accent-soft bg-[rgba(191,161,129,0.08)] text-2xl text-accent transition group-hover:text-[var(--color-hover)]">
                {service.icon}
              </div>
              <span className="text-sm font-black text-accent">0{index + 1}</span>
            </div>
            <h2 className="text-2xl font-black text-main transition group-hover:text-[var(--color-hover)]">
              {service.title}
            </h2>
            <p className="mt-4 leading-7 text-muted">{service.description}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {service.points.map((point) => (
                <span key={point} className="skill-pill rounded-full px-3 py-2 text-sm font-semibold">
                  {point}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.section>

      <motion.section
        className="section-wrap grid gap-8 pb-24 lg:grid-cols-[0.85fr_1.15fr]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <span className="section-kicker">Process</span>
          <h2 className="mt-4 text-3xl font-black text-main md:text-5xl">A clear path from domain logic to production</h2>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="hero-panel motion-breathe rounded-3xl p-6 md:p-8"
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
        >
          <div className="grid gap-4">
            {process.map((step, index) => (
              <motion.div
                layout
                key={step}
                variants={itemVariants}
                className="flex gap-4 rounded-2xl border border-accent-soft bg-[rgba(255,255,255,0.025)] p-4"
                whileHover={{ x: 8, borderColor: "rgba(191,161,129,0.38)" }}
                transition={{ type: "spring", stiffness: 240, damping: 20 }}
              >
                <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-[rgba(191,161,129,0.12)] text-sm font-black text-accent">
                  {index + 1}
                </span>
                <p className="leading-7 text-muted">{step}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        className="section-wrap pb-20 text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-panel rounded-3xl px-6 py-12">
          <h2 className="text-3xl font-black text-main md:text-5xl">Ready to strengthen your backend?</h2>
          <p className="lead-copy mx-auto mt-5 max-w-2xl">
            Share the service, data, or integration problem you are solving and I will help turn it
            into a practical backend plan.
          </p>
          <Link to="/contact" className="btn-primary mt-8 rounded-lg px-7 py-4 font-bold">
            Contact Me <FaArrowRight aria-hidden="true" />
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default Service;
