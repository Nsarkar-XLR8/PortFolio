import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const navLinks = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Services", to: "/service" },
    { name: "Projects", to: "/projects" },
    { name: "Contact", to: "/contact" },
  ];

  const socialLinks = [
    { icon: <FaGithub size={20} />, url: "https://github.com/Nsarkar-XLR8" },
    { icon: <FaLinkedin size={20} />, url: "https://www.linkedin.com/in/nayem-sarkar-8a84412a8/" },
    { icon: <FaFacebook size={20} />, url: "https://www.facebook.com/nayem.sarkar.752123" },
    { icon: <FaEnvelope size={20} />, url: "https://mail.google.com/mail/?view=cm&fs=1&to=nsarkar6251@gmail.com" },
  ];

  // Animation variants for the main container
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  // Animation variants for child elements
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.footer
      style={{ backgroundColor: "#7E102C" }}
      className="text-amber-50 relative overflow-hidden"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }} // Animate when 30% of the footer is in view
    >
      <div className="max-w-7xl mx-auto py-12 px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo/Brand */}
        <motion.div className="flex flex-col gap-4" variants={itemVariants}>
          <h2 className="text-2xl font-bold text-white">Nayem Sarkar</h2>
          <p className="text-gray-200 max-w-xs">
            MERN Stack Developer building scalable web apps with React, Node, MongoDB, and AI.
          </p>
          <div className="flex gap-4 mt-2">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-amber-300"
                whileHover={{ scale: 1.25, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Navigation Links */}
        <motion.div className="flex flex-col gap-3" variants={itemVariants}>
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="text-gray-200 hover:text-amber-300 transition-colors duration-300 w-fit"
            >
              {link.name}
            </Link>
          ))}
        </motion.div>

        {/* Contact Info */}
        <motion.div className="flex flex-col gap-3" variants={itemVariants}>
          <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
          <a href="mailto:nsarkar6251@gmail.com" className="text-gray-200 hover:text-amber-300 transition-colors duration-300 w-fit">
            nsarkar6251@gmail.com
          </a>
          <a href="tel:+8801626644761" className="text-gray-200 hover:text-amber-300 transition-colors duration-300 w-fit">
            +880 1626 644761
          </a>
          <p className="text-gray-200 w-fit">
            Dhaka, Bangladesh
          </p>
        </motion.div>
      </div>

      <motion.div
        className="border-t border-white/20 mt-8 py-4 text-center text-gray-300 text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        &copy; {new Date().getFullYear()} Nayem Sarkar. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
