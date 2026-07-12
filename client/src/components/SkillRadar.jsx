import { motion } from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const skillData = [
  { skill: "Java", level: 95 },
  { skill: "Spring Boot", level: 92 },
  { skill: "NestJS", level: 85 },
  { skill: "PostgreSQL", level: 88 },
  { skill: "Microservices", level: 90 },
  { skill: "Docker", level: 82 },
  { skill: "Redis", level: 78 },
  { skill: "API Design", level: 93 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div
        style={{
          background: "rgba(10,10,15,0.95)",
          border: "1px solid rgba(0,240,255,0.3)",
          borderRadius: "0.5rem",
          padding: "0.5rem 0.8rem",
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "0.75rem",
        }}
      >
        <p style={{ color: "var(--neon-cyan)", fontWeight: 700 }}>
          {payload[0].payload.skill}
        </p>
        <p style={{ color: "var(--color-text-muted)", marginTop: "0.2rem" }}>
          Proficiency: {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

const SkillRadar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="surface-card rounded-xl p-4 sm:p-6"
    >
      <h3
        className="mb-4 text-center text-sm font-bold uppercase tracking-[0.16em]"
        style={{ color: "var(--neon-cyan)", fontFamily: "JetBrains Mono, monospace" }}
      >
        Skill Proficiency
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={skillData} cx="50%" cy="50%" outerRadius="72%">
          <PolarGrid stroke="rgba(0,240,255,0.12)" />
          <PolarAngleAxis
            dataKey="skill"
            tick={{ fill: "var(--color-text-muted)", fontSize: 11, fontFamily: "JetBrains Mono, monospace" }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Radar
            name="Skills"
            dataKey="level"
            stroke="var(--neon-cyan)"
            fill="var(--neon-cyan)"
            fillOpacity={0.15}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default SkillRadar;
