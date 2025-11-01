import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

const Layout = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const location = useLocation();

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-amber-300 origin-left z-50"
        style={{ scaleX }}
      />
      <Navbar />
      <main>
        {/* AnimatePresence detects when the route changes and animates the page out. */}
        {/* The key={location.pathname} is essential for it to work. */}
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname}>
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
