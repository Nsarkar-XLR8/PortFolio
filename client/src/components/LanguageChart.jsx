import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const languageData = [
  { name: "Java", value: 42, color: "#00f0ff" },
  { name: "TypeScript", value: 24, color: "#ff00aa" },
  { name: "JavaScript", value: 16, color: "#00ff88" },
  { name: "SQL", value: 10, color: "#a855f7" },
  { name: "Other", value: 8, color: "#64748b" },
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
        <p style={{ color: payload[0].payload.color, fontWeight: 700 }}>
          {payload[0].name}
        </p>
        <p style={{ color: "var(--color-text-muted)", marginTop: "0.2rem" }}>
          {payload[0].value}% of repositories
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => (
  <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2">
    {payload?.map((entry) => (
      <span
        key={entry.value}
        className="flex items-center gap-1.5 text-xs"
        style={{ color: "var(--color-text-muted)", fontFamily: "JetBrains Mono, monospace" }}
      >
        <span
          className="inline-block h-2 w-2 rounded-full"
          style={{ background: entry.color }}
        />
        {entry.value}
      </span>
    ))}
  </div>
);

const LanguageChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="surface-card rounded-xl p-4 sm:p-6"
    >
      <h3
        className="mb-4 text-center text-sm font-bold uppercase tracking-[0.16em]"
        style={{ color: "var(--neon-cyan)", fontFamily: "JetBrains Mono, monospace" }}
      >
        Language Breakdown
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={languageData}
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={95}
            paddingAngle={3}
            dataKey="value"
            stroke="none"
          >
            {languageData.map((entry) => (
              <Cell key={entry.name} fill={entry.color} fillOpacity={0.85} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default LanguageChart;
