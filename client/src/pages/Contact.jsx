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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_yjx9ya8";
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_hl6g9rs";
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "vrDvo7in39BHnvfm0";

  useEffect(() => {
    updateSeo({
      title: "Contact Nayem Sarkar | Software Engineer & Backend Architect",
      description:
        "Contact Nayem Sarkar for backend engineering, Java Spring Boot, NestJS, microservices, secure APIs, and data architecture opportunities.",
      keywords:
        "contact Nayem Sarkar, hire Nayem Sarkar, Software Engineer Dhaka, backend developer contact, Spring Boot developer hire, NestJS engineer for hire",
      path: "/contact",
    });
  }, []);

  useEffect(() => {
    if (status !== "success") return;
    const timer = setTimeout(() => setStatus(null), 5000);
    return () => clearTimeout(timer);
  }, [status]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (formData.name.length > 100) {
      newErrors.name = "Name must be 100 characters or less.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    } else if (formData.email.length > 100) {
      newErrors.email = "Email must be 100 characters or less.";
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required.";
    } else if (formData.subject.length > 200) {
      newErrors.subject = "Subject must be 200 characters or less.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (formData.message.length > 2000) {
      newErrors.message = "Message must be 2000 characters or less.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    if (status) setStatus(null);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setStatus(null);

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(
        () => {
          setStatus("success");
          setFormData({ name: "", email: "", subject: "", message: "" });
          setErrors({});
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
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center font-bold"
          aria-live="polite"
          style={{ color: "var(--color-success)", textShadow: "0 0 0.5em rgba(0,255,136,0.3)" }}
        >
          Message sent successfully. I will be in touch soon.
        </motion.div>
      );
    }

    if (status === "error") {
      return (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center font-bold"
          aria-live="assertive"
          style={{ color: "var(--color-error)", textShadow: "0 0 0.5em rgba(255,0,170,0.3)" }}
        >
          Failed to send. Please check the fields and try again.
        </motion.div>
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
                  <span
                    className="grid h-12 w-12 place-items-center rounded-xl text-accent"
                    style={{
                      border: "1px solid rgba(0,240,255,0.15)",
                      background: "rgba(0,240,255,0.06)",
                      color: "var(--color-accent)",
                    }}
                  >
                    {item.icon}
                  </span>
                  <span>
                    <span
                      className="block text-sm font-bold uppercase tracking-[0.16em]"
                      style={{ color: "var(--color-accent)", fontFamily: "JetBrains Mono, monospace" }}
                    >
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
          <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
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
                  maxLength={100}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`form-field w-full rounded-lg px-5 py-3 transition focus:outline-none ${errors.name ? "border-[var(--color-error)]" : ""}`}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-xs" style={{ color: "var(--color-error)" }}>
                    {errors.name}
                  </p>
                )}
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
                  maxLength={100}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`form-field w-full rounded-lg px-5 py-3 transition focus:outline-none ${errors.email ? "border-[var(--color-error)]" : ""}`}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs" style={{ color: "var(--color-error)" }}>
                    {errors.email}
                  </p>
                )}
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
                maxLength={200}
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                className={`form-field w-full rounded-lg px-5 py-3 transition focus:outline-none ${errors.subject ? "border-[var(--color-error)]" : ""}`}
                disabled={isSubmitting}
              />
              {errors.subject && (
                <p id="subject-error" className="mt-1 text-xs" style={{ color: "var(--color-error)" }}>
                  {errors.subject}
                </p>
              )}
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
                maxLength={2000}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`form-field w-full resize-none rounded-lg px-5 py-3 transition focus:outline-none ${errors.message ? "border-[var(--color-error)]" : ""}`}
                disabled={isSubmitting}
              />
              <div className="mt-1 flex justify-between">
                {errors.message ? (
                  <p id="message-error" className="text-xs" style={{ color: "var(--color-error)" }}>
                    {errors.message}
                  </p>
                ) : (
                  <span />
                )}
                <span className="text-xs text-muted">{formData.message.length}/2000</span>
              </div>
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
