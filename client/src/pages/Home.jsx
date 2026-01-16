import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
} from "framer-motion";

const skills = [
  // Languages & Frameworks
  "TypeScript",
  "Node.js",
  "NestJS",
  "Express.js",
  "Java",
  "Python",
  "C++",

  // Backend Architecture
  "Modular Architecture",
  "Dependency Injection (DI)",
  "Microservices",
  "Object-Oriented Programming (OOP)",
  "SOLID Principles",
  "Domain-Driven Design (DDD)",

  // Data Layer
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "Prisma",
  "TypeORM",
  "Mongoose",

  // API & Integration
  "RESTful API Design",
  "Stripe API",
  "JWT",
  "Passport.js",
  "WebSockets",
  "Postman",

  // Reliability & Testing
  "Test-Driven Development (TDD)",
  "Jest",
  "Unit Testing",
  "Integration Testing",
  "ER Diagramming",

  // Cloud & DevOps
  "Docker",
  "AWS EC2",
  "AWS S3",
  "Cloudinary",
  "CI/CD Pipelines",
  "GitHub Actions",
  "Vercel",
  "Git"
];


// Reusable component for the 3D card effect (Excellent use of Framer Motion)
const ProjectCard = ({ repo, index }) => {
  const ref = useRef(null);
  // Correct use of useInView for one-time animation triggering
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Excellent use of useSpring for smooth, physics-based mouse tracking
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25, mass: 0.5 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25, mass: 0.5 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12.5deg", "-12.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12.5deg", "12.5deg"]);

  // FIX 1: Event handlers are correctly memoized for performance
  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;

    requestAnimationFrame(() => {
      const rect = ref.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;

      x.set(xPct);
      y.set(yPct);
    });
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}} // animate only when in view
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d", // Necessary for 3D effect
      }}
      className="group relative bg-white rounded-xl overflow-hidden shadow-lg transition-shadow duration-500 hover:shadow-2xl"
    >
      {/* Content */}
      <div
        style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
        className="p-6 h-full flex flex-col"
      >
        <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-amber-600 transition-colors duration-300">
            {repo.name.replace(/[-_]/g, ' ')} {/* Better name formatting */}
        </h3>
        <p className="text-gray-700 mb-4 flex-grow opacity-80 group-hover:opacity-100 transition-opacity duration-300">
          {repo.description || "No description available."}
        </p>
      </div>

      {/* Hover CTA/Links */}
      <div
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <div className="flex gap-4">
          <a 
            href={repo.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            // ADDED: aria-label for accessibility
            aria-label={`View ${repo.name} on GitHub`} 
            className="px-4 py-2 bg-white text-black font-semibold rounded hover:bg-amber-400 hover:text-white transition transform hover:scale-105 duration-300">
            GitHub
          </a>
          {repo.homepage && (
            <a 
              href={repo.homepage} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={`View live demo of ${repo.name}`}
              className="px-4 py-2 bg-white text-black font-semibold rounded hover:bg-amber-400 hover:text-white transition transform hover:scale-105 duration-300">
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Home = () => {
  // State management for API fetch is robust
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const username = "Nsarkar-XLR8";
  const titleText = "Hi, I'm Nayem Sarkar";

  useEffect(() => {
    document.title = "Home | Nayem Sarkar";
  }, []);

  // Scroll Progress Bar (Excellent UX detail)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax Hero Image (Great visual touch)
  const { scrollY } = useScroll();
  const yRange = useTransform(scrollY, [0, 500], [0, -100]);

  // FIX 4: Corrected and clean API fetch with AbortController for cleanup
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchRepos = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`, { signal });

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();
        
        const filtered = data
          .filter(repo => !repo.fork && repo.name.toLowerCase() !== "portfolio")
          .slice(0, 3); // Limiting to top 3 for the home page

        setRepos(filtered);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error("Failed to fetch repositories:", err);
          setIsError(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();

    return () => {
      controller.abort();
    };
  }, [username]);

  // Framer Motion Variants (Well-defined for staggering)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const characterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const skillsContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const skillItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };


  return (
    <div className="w-full min-h-screen relative" style={{ backgroundColor: "#E1D4C1" }}>
      {/* Scroll Progress Bar */}
      <motion.div
        className="sticky md:fixed top-0 left-0 right-0 h-1 bg-amber-600 origin-[0%] z-50"
        style={{ scaleX }}
      />
      
      {/* Hero Section */}
      <section className="h-screen flex flex-col md:flex-row items-center justify-center text-center md:text-left px-4 md:px-16 pt-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex-1 space-y-6 z-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            {/* Staggered text animation is very engaging */}
            {titleText.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={characterVariants}
                style={{ display: 'inline-block' }}
              >
                {/* Use non-breaking space for proper character-by-character animation */}
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="text-lg md:text-2xl text-gray-800 max-w-lg"
          >
            **Software Engineer -  BackEnd Architect** • Building scalable apps with TS, NestJs, Node, Express,MongoDB.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex gap-4 justify-center md:justify-start flex-wrap"
          >
            {/* Call to Action Buttons (Excellent spring animations) */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
              <Link to="/projects" className="block px-6 py-3 bg-black text-white rounded-lg font-semibold shadow-lg hover:bg-amber-600 transition-colors">
                View My Work
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
              <Link to="/contact" className="block px-6 py-3 border border-black text-black rounded-lg font-semibold shadow-lg bg-white/50 backdrop-blur-sm hover:bg-gray-100 transition-colors">
                Hire Me
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
              <a
                href="/resume/Nayem_Sarkar_A4_Resume.pdf"
                target="_blank" // FIX 6: Open in new tab first
                rel="noopener noreferrer"
                download // Use browser default filename for clean download
                className="block px-6 py-3 border-2 border-black rounded-lg font-semibold shadow-lg hover:bg-black hover:text-white transition"
              >
                Download Resume
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          style={{ y: yRange }} // Parallax effect
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="flex-1 mt-10 md:mt-0 flex justify-center md:justify-end"
        >
          <div className="w-48 sm:w-60 md:w-72 h-48 sm:h-60 md:h-72 rounded-full overflow-hidden shadow-2xl">
            <motion.img
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              src="/Nayem.jpeg" alt="Nayem Sarkar" className="w-full h-full object-cover" />
          </div>
        </motion.div>
      </section>

      {/* Skills Section (Clean implementation of whileInView) */}
      <section className="py-24 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-center mb-12 text-gray-900"
        >
          Skills 🌟
        </motion.h2>
        <motion.div
          variants={skillsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto"
        >
          {skills.map(skill => (
            <motion.div variants={skillItemVariants} key={skill}>
              <motion.span
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="block px-4 py-2 bg-black text-white rounded-lg font-medium cursor-default shadow-md hover:bg-amber-600 transition-colors duration-300"
              >
                {skill}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 px-4" style={{ perspective: "1000px" }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-center mb-12 text-gray-900"
        >
          Featured Projects ✨
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto min-h-[300px]">
          {/* Conditional Rendering is correctly handled */}
          {isLoading && (
              <p className="col-span-full text-center text-lg text-gray-700">Loading projects from GitHub...</p>
          )}

          {isError && (
              <p className="col-span-full text-center text-lg text-red-600">
                  Error loading projects. Please check the network or GitHub API rate limits.
              </p>
          )}
          
          {!isLoading && !isError && repos.map((repo, index) => (
            <ProjectCard key={repo.id} repo={repo} index={index} />
          ))}

          {!isLoading && !isError && repos.length === 0 && (
              <p className="col-span-full text-center text-lg text-gray-700">No featured repositories found.</p>
          )}
        </div>
        
        <div className="text-center mt-12">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
            <Link to="/projects" className="inline-block px-6 py-3 bg-black text-white rounded-lg font-semibold shadow-lg hover:bg-amber-600 transition-colors">
              See All Projects
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold mb-6 text-gray-900"
        >
          Let's Work Together! 🚀
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 text-gray-800 max-w-xl mx-auto"
        >
          I’m available for freelance or full-time opportunities. Reach out to discuss your project.
        </motion.p>
        <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
          <Link to="/contact"
            className="inline-block px-8 py-4 bg-amber-600 text-black rounded-lg font-bold shadow-lg text-lg hover:bg-amber-400 transition-colors">
            Contact Me
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
