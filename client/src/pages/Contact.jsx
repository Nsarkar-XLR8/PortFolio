import { useState, useRef, useEffect } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaPhoneAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { updateSeo } from "../utils/seo";

const contactMethods = [
  {
    label: "Email",
    value: "nsarkar6251@gmail.com",
    href: "mailto:nsarkar6251@gmail.com",
    icon: <FaEnvelope />,
  },
  {
    label: "Phone",
    value: "+880 1999-18198",
    href: "tel:+880199918198",
    icon: <FaPhoneAlt />,
  },
  {
    label: "Location",
    value: "Dhaka, Bangladesh",
    href: null,
    icon: <FaMapMarkerAlt />,
  },
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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_yjx9ya8";
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_hl6g9rs";
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "vrDvo7in39BHnvfm0";

  useEffect(() => {
    updateSeo({
      title: "Contact Nayem Sarkar | Backend Engineer",
      description:
        "Contact Nayem Sarkar for backend engineering, Java Spring Boot, NestJS, microservices, secure APIs, and data architecture opportunities.",
      path: "/contact",
    });
  }, []);

  const handleChange = (e) => {
    if (status) setStatus(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(
        () => {
          setStatus("success");
          setFormData({ name: "", email: "", subject: "", message: "" });
        },
        (error) => {
          console.error("EmailJS Error:", error);
          setStatus("error");
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const renderStatusMessage = () => {
    if (status === "success") {
      return (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center font-bold text-[var(--color-success)]"
        >
          Message sent successfully. I will be in touch soon.
        </motion.p>
      );
    }

    if (status === "error") {
      return (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center font-bold text-[var(--color-error)]"
        >
          Failed to send. Please check the fields and try again.
        </motion.p>
      );
    }

    return null;
  };

  return (
    <motion.div
      className="page-shell min-h-screen w-full px-4 py-28 md:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <section className="section-wrap grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div variants={itemVariants}>
          <span className="section-kicker">Contact</span>
          <h1 className="display-title mt-5 text-5xl md:text-7xl">Let us build something reliable.</h1>
          <p className="lead-copy mt-6 text-lg">
            Send the backend role, service requirement, or technical challenge. I will respond with
            clear next steps around Spring Boot, NestJS, APIs, data, or integrations.
          </p>

          <div className="mt-10 grid gap-4">
            {contactMethods.map((item) => {
              const content = (
                <motion.div
                  layout
                  className="surface-card motion-rise flex items-center gap-4 rounded-2xl p-5 transition"
                  whileHover={{ y: -6, scale: 1.015 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 240, damping: 20 }}
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-accent-soft bg-[rgba(191,161,129,0.08)] text-accent">
                    {item.icon}
                  </span>
                  <span>
                    <span className="block text-sm font-bold uppercase tracking-[0.16em] text-accent">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-main">{item.value}</span>
                  </span>
                </motion.div>
              );

              return item.href ? (
                <a key={item.label} href={item.href}>
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
          </div>
        </motion.div>

        <motion.section
          variants={itemVariants}
          className="hero-panel motion-float-slow rounded-3xl p-6 md:p-8"
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
        >
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-muted">Full Name</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="form-field w-full rounded-lg px-5 py-3 transition focus:outline-none"
                  disabled={isSubmitting}
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-muted">Email Address</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="form-field w-full rounded-lg px-5 py-3 transition focus:outline-none"
                  disabled={isSubmitting}
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-muted">Subject</span>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What should we discuss?"
                required
                className="form-field w-full rounded-lg px-5 py-3 transition focus:outline-none"
                disabled={isSubmitting}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-muted">Message</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about the project, goal, or role."
                rows="7"
                required
                className="form-field w-full resize-none rounded-lg px-5 py-3 transition focus:outline-none"
                disabled={isSubmitting}
              />
            </label>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full rounded-lg py-4 font-bold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] ${
                isSubmitting
                  ? "cursor-not-allowed bg-[rgba(255,255,255,0.08)] text-muted"
                  : "btn-primary"
              }`}
              whileHover={{ y: isSubmitting ? 0 : -3, scale: isSubmitting ? 1 : 1.01 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  Send Message <FaPaperPlane aria-hidden="true" />
                </>
              )}
            </motion.button>
          </form>

          {renderStatusMessage()}
        </motion.section>
      </section>
    </motion.div>
  );
};

export default Contact;
