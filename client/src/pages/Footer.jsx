import { motion } from "framer-motion";
import { FaEnvelope, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Services", to: "/services" },
  { name: "Projects", to: "/projects" },
  { name: "Contact", to: "/contact" },
];

const socialLinks = [
  { label: "GitHub", icon: <FaGithub />, url: "https://github.com/Nsarkar-XLR8" },
  { label: "LinkedIn", icon: <FaLinkedin />, url: "https://linkedin.com/in/nayem-sarkar" },
  { label: "Facebook", icon: <FaFacebook />, url: "https://www.facebook.com/nayem.sarkar.752123" },
  { label: "Email", icon: <FaEnvelope />, url: "mailto:nsarkar6251@gmail.com" },
];

const footerVariants = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const Footer = () => {
  return (
    <motion.footer
      className="footer-surface relative overflow-hidden text-main"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="section-wrap py-10">
        <motion.div
          className="hero-panel grid gap-8 rounded-3xl p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8"
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
        >
          <motion.div variants={itemVariants}>
            <Link to="/" className="inline-flex items-center gap-3 text-2xl font-black">
              <span className="motion-float grid h-10 w-10 place-items-center rounded-full border border-accent-soft bg-[rgba(191,161,129,0.08)] text-sm text-accent">
                NS
              </span>
              Nayem Sarkar
            </Link>
            <p className="lead-copy mt-4 max-w-xl">
              Software Engineer and Backend Architect building Java Spring Boot and NestJS
              services, microservices, secure APIs, and optimized data layers.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col justify-between gap-6">
            <nav className="flex flex-wrap gap-3 md:justify-end">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className="rounded-full border border-accent-soft px-4 py-2 text-sm font-semibold text-muted transition hover:border-[rgba(191,161,129,0.42)] hover:text-[var(--color-hover)]"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="flex gap-3 md:justify-end">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.url}
                  target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  aria-label={link.label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-accent-soft text-lg text-muted transition hover:border-[rgba(191,161,129,0.42)] hover:text-[var(--color-hover)]"
                  whileHover={{ scale: 1.12, y: -4, rotate: 3 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-3 border-t border-accent-soft py-5 text-sm text-muted md:flex-row md:items-center md:justify-between"
        >
          <span>&copy; {new Date().getFullYear()} Nayem Sarkar. All rights reserved.</span>
          <span>Dhaka, Bangladesh</span>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
