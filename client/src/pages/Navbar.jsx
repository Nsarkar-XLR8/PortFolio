import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Projects", to: "/projects" },
    { label: "Contact", to: "/contact" },
  ];

  const navVariants = {
    hidden: { y: -100 },
    visible: {
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const mobileMenuItemVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.header
      className="fixed w-full top-0 z-50 nav-surface text-main"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="section-wrap flex h-16 items-center justify-between">
        <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link to="/" className="flex items-center gap-3 font-bold text-xl transition-colors duration-300">
            <span
              className="motion-float grid h-9 w-9 place-items-center rounded-full text-sm font-black"
              style={{
                border: "1.5px solid rgba(0, 240, 255, 0.5)",
                background: "rgba(0, 240, 255, 0.06)",
                color: "var(--color-accent)",
                boxShadow: "0 0 0.8em rgba(0, 240, 255, 0.15)",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              NS
            </span>
            <span>Nayem</span>
          </Link>
        </motion.div>

        <nav
          className="hidden items-center rounded-full px-2 py-2 md:flex"
          style={{
            border: "1px solid rgba(0, 240, 255, 0.1)",
            background: "rgba(0, 240, 255, 0.02)",
          }}
        >
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                  isActive
                    ? "text-[var(--color-accent)]"
                    : "text-muted hover:text-[var(--color-accent)]"
                }`
              }
              style={({ isActive }) =>
                isActive
                  ? { background: "rgba(0, 240, 255, 0.08)", textShadow: "0 0 0.5em rgba(0, 240, 255, 0.3)" }
                  : {}
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="focus:outline-none z-50 relative">
            <svg
              className="w-6 h-6 text-main"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
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

      <AnimatePresence>
        {open && (
          <motion.nav
            className="md:hidden nav-surface px-4 pb-4 flex flex-col space-y-3 absolute w-full"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {menuItems.map((item) => (
              <motion.div key={item.label} variants={mobileMenuItemVariants}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2 font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-[var(--color-accent)]"
                        : "text-muted hover:text-[var(--color-accent)]"
                    }`
                  }
                  style={({ isActive }) =>
                    isActive
                      ? { background: "rgba(0, 240, 255, 0.08)", textShadow: "0 0 0.5em rgba(0, 240, 255, 0.3)" }
                      : {}
                  }
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
