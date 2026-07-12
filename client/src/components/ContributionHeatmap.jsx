import { useMemo } from "react";
import { motion } from "framer-motion";

const CELL_SIZE = 13;
const CELL_GAP = 3;
const WEEKS = 52;
const DAYS = 7;

const generateContributions = () => {
  const data = [];
  const now = new Date();
  for (let w = 0; w < WEEKS; w++) {
    for (let d = 0; d < DAYS; d++) {
      const date = new Date(now);
      date.setDate(date.getDate() - (WEEKS - 1 - w) * 7 - (6 - d));
      const dayOfWeek = date.getDay();
      if (dayOfWeek !== d) continue;

      let count = 0;
      const rand = Math.random();
      if (rand > 0.72) count = Math.floor(Math.random() * 4) + 1;
      if (rand > 0.9) count = Math.floor(Math.random() * 8) + 5;
      if (rand > 0.97) count = Math.floor(Math.random() * 6) + 10;

      data.push({
        date: date.toISOString().split("T")[0],
        count,
        week: w,
        day: d,
      });
    }
  }
  return data;
};

const getColor = (count) => {
  if (count === 0) return "rgba(0,240,255,0.04)";
  if (count <= 3) return "rgba(0,240,255,0.2)";
  if (count <= 6) return "rgba(0,240,255,0.4)";
  if (count <= 9) return "rgba(0,240,255,0.6)";
  return "rgba(0,240,255,0.85)";
};

const DAY_LABELS = ["Mon", "", "Wed", "", "Fri", "", ""];

const ContributionHeatmap = () => {
  const contributions = useMemo(() => generateContributions(), []);
  const total = useMemo(
    () => contributions.reduce((sum, c) => sum + c.count, 0),
    [contributions]
  );

  const svgWidth = WEEKS * (CELL_SIZE + CELL_GAP) + 36;
  const svgHeight = DAYS * (CELL_SIZE + CELL_GAP) + 20;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="surface-card rounded-xl p-4 sm:p-6 overflow-x-auto"
    >
      <div className="flex items-center justify-between mb-4">
        <h3
          className="text-sm font-bold uppercase tracking-[0.16em]"
          style={{ color: "var(--neon-cyan)", fontFamily: "JetBrains Mono, monospace" }}
        >
          Contributions
        </h3>
        <span
          className="text-xs"
          style={{ color: "var(--color-text-muted)", fontFamily: "JetBrains Mono, monospace" }}
        >
          {total} contributions in the last year
        </span>
      </div>

      <div className="overflow-x-auto">
        <svg
          width={svgWidth}
          height={svgHeight}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="contribution-heatmap-svg"
        >
          {DAY_LABELS.map((label, i) => (
            <text
              key={i}
              x={28}
              y={i * (CELL_SIZE + CELL_GAP) + 12}
              textAnchor="end"
              fill="var(--color-text-muted)"
              fontSize={10}
              fontFamily="JetBrains Mono, monospace"
            >
              {label}
            </text>
          ))}

          {contributions.map((c, i) => (
            <motion.rect
              key={c.date}
              x={36 + c.week * (CELL_SIZE + CELL_GAP)}
              y={c.day * (CELL_SIZE + CELL_GAP)}
              width={CELL_SIZE}
              height={CELL_SIZE}
              rx={2}
              fill={getColor(c.count)}
              stroke="rgba(0,240,255,0.06)"
              strokeWidth={0.5}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.0008,
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              <title>{`${c.date}: ${c.count} contributions`}</title>
            </motion.rect>
          ))}
        </svg>
      </div>

      <div className="mt-3 flex items-center justify-end gap-2">
        <span
          className="text-[10px]"
          style={{ color: "var(--color-text-muted)", fontFamily: "JetBrains Mono, monospace" }}
        >
          Less
        </span>
        {[0, 1, 2, 3, 4].map((level) => (
          <span
            key={level}
            className="inline-block h-3 w-3 rounded-sm"
            style={{ background: getColor(level * 3) }}
          />
        ))}
        <span
          className="text-[10px]"
          style={{ color: "var(--color-text-muted)", fontFamily: "JetBrains Mono, monospace" }}
        >
          More
        </span>
      </div>
    </motion.div>
  );
};

export default ContributionHeatmap;
