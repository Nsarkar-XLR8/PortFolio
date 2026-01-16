import { useEffect } from "react";
import { motion } from "framer-motion";

// Helper function to create a stable key from content
const generateStableKey = (str, index) => `${str.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${index}`;

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


// FIX 1: Enhanced experience data for a professional portfolio
const experience = [
  { year: "2024 - Present", role: "Software Engineer & BackEnd Architect", type: "Professional", description: "Architecting and developing backend web applications from concept to deployment. Focusing on scalability and modern best practices." },
  { year: "2020 - 2025", role: "B.Sc. in Computer Science & Engineering", type: "Academic", description: "Graduated with honors, focusing on Data Structures, Algorithms, and Advanced Web Technologies. Developed multiple AI and full-stack projects." },
  { year: "2017 - 2019", role: "Higher Secondary Education (College)", type: "Academic", description: "Strong foundation in Physics and Mathematics." },
];

const achievements = [
  "Built web & app with backend stack. ",
  "CSE Project Show Champions in Spring '24 & Spring '25 for innovative solutions.",
  "Completed 100+ coding challenges on **HackerRank** (Problem Solving domain).",
];

const About = () => {
  useEffect(() => {
    document.title = "About | Nayem Sarkar";
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Variants for individual item animations
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    // FIX 2: Removed unnecessary surrounding fragment
    <div className="w-full min-h-screen bg-[#E1D4C1] text-gray-900 px-4 md:px-16 py-24">

      {/* Hero Section */}
      <section className="text-center md:text-left mb-16">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Me 👨‍💻
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl max-w-4xl mx-auto md:mx-0 text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Hi! I'm <span className="text-zinc-700 font-bold">Nayem Sarkar</span>, a **MERN Stack Developer** and **AI enthusiast**. I specialize in building scalable, responsive web applications and exploring AI-driven solutions to real-world problems. My passion lies in clean code, robust architecture, and delivering exceptional user experiences.
        </motion.p>
      </section>

      {/* Skills Section */}
      <motion.section
        className="mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2 className="text-3xl font-bold text-center md:text-left mb-8 border-b-2 border-gray-400 pb-2" variants={itemVariants}>
          My Skills 💡
        </motion.h2>
        <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4">
          {skills.map(skill => (
            <motion.span
              key={generateStableKey(skill, 0)} // FIX 3: Using stable key
              className="px-4 py-2 bg-black text-white rounded-full font-medium transition transform hover:scale-105 hover:bg-amber-600 duration-300 cursor-default shadow-md"
              variants={itemVariants}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.section>

      {/* Experience Timeline */}
      <motion.section
        className="mb-20 max-w-4xl mx-auto md:mx-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2 className="text-3xl font-bold text-center md:text-left mb-8 border-b-2 border-gray-400 pb-2" variants={itemVariants}>
          My Journey ⏱️
        </motion.h2>
        <div className="relative border-l-4 border-gray-900 ml-5 md:ml-8">
          {experience.map((exp, index) => (
            <motion.div key={generateStableKey(exp.role, index)} className="mb-10 pl-6 md:pl-10 relative" variants={itemVariants}>
              {/* Timeline dot/marker */}
              <div className="absolute -left-3 md:-left-[21px] top-1 w-6 h-6 bg-amber-600 rounded-full border-4 border-gray-900 z-10"></div>
              
              <h3 className="text-xl font-bold text-gray-900">{exp.role}</h3>
              <span className="text-sm text-gray-600 font-semibold italic block mb-2">{exp.year} - ({exp.type})</span>
              <p className="mt-1 text-gray-800">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Achievements Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="max-w-4xl mx-auto md:mx-0"
      >
        <motion.h2 className="text-3xl font-bold text-center md:text-left mb-8 border-b-2 border-gray-400 pb-2" variants={itemVariants}>
          Achievements 🏆
        </motion.h2>
        <ul className="list-none space-y-4">
          {achievements.map((item, index) => (
            <motion.li 
              key={generateStableKey(item, index)} // FIX 4: Using stable key
              className="text-gray-800 font-medium flex items-start" 
              variants={itemVariants}
            >
              <span className="text-amber-600 text-xl mr-3 mt-0.5">•</span> 
              <span className="flex-1">{item}</span>
            </motion.li>
          ))}
        </ul>
      </motion.section>

    </div>
  );
};

export default About;
