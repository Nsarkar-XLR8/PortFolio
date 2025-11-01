import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState(null); // null (initial), 'success', 'error'
  const [isSubmitting, setIsSubmitting] = useState(false); // FIX 2: Added submitting state
  const formRef = useRef();

  // FIX 1: Use environment variables (replace with your actual values in your .env file)
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_yjx9ya8";
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_hl6g9rs";
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "vrDvo7in39BHnvfm0";

  useEffect(() => {
    document.title = "Contact | Nayem Sarkar";
  }, []);

  const handleChange = (e) => {
    // Clear status message on typing
    if (status) setStatus(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null); // Clear previous status

    emailjs
      .sendForm(
        SERVICE_ID, 
        TEMPLATE_ID,
        formRef.current,
        PUBLIC_KEY
      )
      .then(
        () => {
          setStatus("success");
          // Reset form fields
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Helper function to render status message
  const renderStatusMessage = () => {
    if (status === 'success') {
      return <p className="mt-4 text-center text-green-600 font-bold">✅ Message sent successfully! I'll be in touch soon.</p>;
    }
    if (status === 'error') {
      return <p className="mt-4 text-center text-red-600 font-bold">❌ Failed to send. Please ensure all fields are correct and try again.</p>;
    }
    return null;
  };

  return (
    // FIX 3: Removed unnecessary surrounding fragment
    <motion.div
      className="w-full min-h-screen px-4 md:px-16 py-24"
      style={{ backgroundColor: "#E1D4C1" }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <section className="text-center mb-16">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-gray-900 mb-4"
          variants={itemVariants}
        >
          Get in Touch 👋
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl text-gray-800 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          I’m open for freelance or full-time opportunities. Drop me a message
          and let's collaborate!
        </motion.p>
      </section>

      {/* Contact Form */}
      <motion.section
        className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl p-8 md:p-12"
        variants={itemVariants}
        whileHover={{ scale: 1.01, transition: { type: "spring", stiffness: 300 } }}
      >
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="flex-1 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 transition disabled:bg-gray-100"
              disabled={isSubmitting}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="flex-1 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 transition disabled:bg-gray-100"
              disabled={isSubmitting}
            />
          </div>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 transition disabled:bg-gray-100"
            disabled={isSubmitting}
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="6"
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 transition resize-none disabled:bg-gray-100"
            disabled={isSubmitting}
          ></textarea>
          <motion.button
            type="submit"
            disabled={isSubmitting} // Disabled while submitting
            className={`w-full py-3 text-white font-semibold rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 
              ${isSubmitting 
                ? 'bg-gray-500 cursor-not-allowed' 
                : 'bg-black hover:bg-amber-600 hover:text-white focus:ring-black'}` // FIX 4: Improved hover color scheme
            }
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'} 
          </motion.button>
        </form>

        {renderStatusMessage()}
      </motion.section>

      {/* Contact Info */}
      <motion.section
        className="mt-16 flex flex-col md:flex-row gap-8 justify-center items-center text-center text-gray-900"
        variants={itemVariants}
      >
        <div className="hover:text-amber-600 transition">
          <span className="font-semibold block">Email</span>
          {/* FIX 5: Standard mailto: link for universal client compatibility */}
          <a href="mailto:nsarkar6251@gmail.com">nsarkar6251@gmail.com</a>
        </div>
        <div className="hover:text-amber-600 transition">
          <span className="font-semibold block">Phone</span>
          <a href="tel:+8801626644761">+880 1626 644761</a>
        </div>
        <div className="cursor-default hover:text-amber-600 transition">
          <span className="font-semibold block">Location</span>
          <span>Dhaka, Bangladesh</span>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Contact;