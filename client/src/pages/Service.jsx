
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Helper function to create a stable key from the title
const generateStableKey = (title) => title.toLowerCase().replace(/[^a-z0-9]/g, '-');

// Inline SVG Icons (Replaced lucide-react to ensure compilation)
// Note: SVG attributes like stroke, strokeWidth, fill, and className are controlled by the parent div's color classes.
const IconCode = ({ size = 30 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m18 16 4-4-4-4"/>
    <path d="m6 8-4 4 4 4"/>
  </svg>
);

const IconBot = ({ size = 30 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8V4H8"/>
    <rect width="16" height="12" x="4" y="8" rx="2"/>
    <path d="M2 14h2"/>
    <path d="M20 14h2"/>
    <path d="M15 22v-4"/>
    <path d="M9 22v-4"/>
  </svg>
);

const IconServer = ({ size = 30 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="8" x="2" y="2" rx="2" ry="2"/>
    <rect width="20" height="8" x="2" y="14" rx="2" ry="2"/>
    <line x1="6" x2="6" y1="6" y2="6"/>
    <line x1="6" x2="6" y1="18" y2="18"/>
  </svg>
);

const IconPaintBucket = ({ size = 30 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/>
    <path d="M17 12a5 5 0 0 0-5-5h0a5 5 0 0 0-5 5v5h10v-5z"/>
  </svg>
);

const services = [
  {
    icon: <IconCode size={30} />,
    title: "Web Development",
    description: "Build high-quality, responsive, and scalable client-side **React applications** using modern standards and best practices.",
  },
  {
    icon: <IconBot size={30} />,
    title: "AI Integration",
    description: "Integrate powerful **AI solutions** like chatbots, generative tools, and data analysis into your applications using modern APIs.",
  },
  {
    icon: <IconServer size={30} />,
    title: "API Design & Consumption",
    description: "Design robust, reliable, and secure **RESTful API structures** and efficiently consume them in your client-side applications.",
  },
  {
    icon: <IconPaintBucket size={30} />,
    title: "UI/UX Design",
    description: "Craft modern, accessible, and user-friendly interfaces with a focus on usability and responsive design using **Tailwind CSS**.",
  },
];

const Service = () => {
  useEffect(() => {
    document.title = "Services | Nayem Sarkar";
  }, []);

  // Variants for orchestrating animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Variants for individual item animations (fade in up)
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="w-full min-h-screen bg-[#E1D4C1] text-gray-900 px-4 md:px-16 py-24">

      {/* Hero / Intro */}
      <motion.section
        className="text-center mb-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900" variants={itemVariants}>
          My Services 💡
        </motion.h1>
        <motion.p className="text-lg md:text-2xl max-w-3xl mx-auto text-gray-800" variants={itemVariants}>
          I offer a range of services to help you build modern web applications and integrate cutting-edge AI solutions.
        </motion.p>
      </motion.section>

      {/* Services Cards */}
      <motion.section
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
        initial="hidden"
        // This ensures the animation only plays once when the section comes into view
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {services.map((service) => (
          <motion.div
            key={generateStableKey(service.title)} 
            className="group bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center transition-shadow duration-300 hover:shadow-2xl"
            variants={itemVariants}
            // Smooth hover effect for cards
            whileHover={{ y: -10, scale: 1.03 }} 
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {/* Icon Wrapper: Controls the color and transition */}
            {/* The SVG's stroke attribute is implicitly set to currentColor, which is controlled by the Tailwind text-amber-600 class */}
            <div className="mb-4 text-amber-600 transition-colors duration-300 group-hover:text-amber-800">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-amber-600 transition-colors duration-300">
              {service.title}
            </h3>
            <p className="text-gray-700 opacity-90">
              {service.description}
            </p>
          </motion.div>
        ))}
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="mt-20 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={containerVariants}
      >
        <motion.h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900" variants={itemVariants}>
          Ready to start your project? 🤝
        </motion.h2>
        <motion.p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-800" variants={itemVariants}>
          I’m available for freelance or full-time opportunities. Let’s build something amazing together.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Link
            to="/contact"
            className="inline-block px-8 py-3 bg-black text-white rounded-lg font-bold shadow-xl transition-transform transform hover:scale-105 hover:bg-amber-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600"
          >
            Contact Me
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Service;

