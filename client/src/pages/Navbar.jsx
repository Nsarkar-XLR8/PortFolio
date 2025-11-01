import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false); // Mobile menu state

  const menuItems = ["Home", "About", "Service", "Projects", "Contact"];

  // Variants for the main header animation
  const navVariants = {
    hidden: { y: -100 },
    visible: {
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  // Variants for the mobile menu container
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.07, // Stagger the animation of menu items
        delayChildren: 0.2,
      },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  // Variants for individual mobile menu items
  const mobileMenuItemVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.header
      style={{ backgroundColor: "#7E102C", opacity: "95%" }}
      className="fixed w-full top-0 z-50 text-amber-50 shadow-md"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl hover:text-amber-300 transition-colors duration-300">
          NayemS
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          {menuItems.map((item) => (
            <Link
              key={item}
              to={`/${item === "Home" ? "" : item.toLowerCase()}`}
              className="hover:text-amber-300 transition-colors duration-300 font-medium"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="focus:outline-none z-50 relative">
            <svg
              className="w-6 h-6 text-amber-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Animated path for the hamburger/close icon */}
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                animate={open ? { d: "M6 18L18 6M6 6l12 12" } : { d: "M4 6h16M4 12h16M4 18h16" }}
                transition={{ duration: 0.3 }}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {open && (
          <motion.nav
            className="md:hidden bg-[#7E102C] px-4 pb-4 flex flex-col space-y-3 absolute w-full"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {menuItems.map((item) => (
              <motion.div key={item} variants={mobileMenuItemVariants}>
                <Link
                  to={`/${item === "Home" ? "" : item.toLowerCase()}`}
                  className="block hover:text-amber-300 transition-colors duration-300 font-medium"
                  onClick={() => setOpen(false)} // Close menu on click
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar