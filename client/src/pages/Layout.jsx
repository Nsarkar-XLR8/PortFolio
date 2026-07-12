import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MatrixRain from "../components/MatrixRain";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

const Layout = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <>
      <MatrixRain />
      <div className="scanline-overlay" />
      <motion.div
        className="animated-progress fixed top-0 left-0 right-0 h-1 origin-left z-50"
        style={{ scaleX }}
      />
      <Navbar />
      <main>
        <AnimatePresence initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10, scale: 0.996 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.998, position: "absolute", width: "100%" }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
