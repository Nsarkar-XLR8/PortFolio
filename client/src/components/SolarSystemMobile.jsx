import { motion } from "framer-motion";

const planets = [
  { name: "Java", color: "#00f0ff", size: 3.2, orbit: 0 },
  { name: "Spring Boot", color: "#00ff88", size: 3.8, orbit: 48 },
  { name: "NestJS", color: "#ff00aa", size: 2.8, orbit: 96 },
  { name: "PostgreSQL", color: "#a855f7", size: 3.0, orbit: 144 },
  { name: "Docker", color: "#60a5fa", size: 2.4, orbit: 192 },
  { name: "Redis", color: "#f43f5e", size: 2.0, orbit: 240 },
  { name: "Microservices", color: "#facc15", size: 2.6, orbit: 288 },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const SolarSystemMobile = () => {
  return (
    <motion.div
      className="solar-system-mobile"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="solar-system-mobile-orbit-line" />

      {planets.map((planet) => (
        <motion.div
          key={planet.name}
          className="solar-system-mobile-planet"
          variants={item}
          whileHover={{ scale: 1.08, x: 8 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div
            className="solar-system-mobile-dot"
            style={{
              width: planet.size,
              height: planet.size,
              background: planet.color,
              boxShadow: `0 0 ${planet.size * 2}px ${planet.color}80`,
            }}
          />
          <span
            className="solar-system-mobile-label"
            style={{ color: planet.color }}
          >
            {planet.name}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SolarSystemMobile;
