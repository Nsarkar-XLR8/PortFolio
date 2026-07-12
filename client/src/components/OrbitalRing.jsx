import { useRef } from "react";
import { motion } from "framer-motion";

const PARTICLE_COUNT = 18;

const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const angle = (i / PARTICLE_COUNT) * 360;
  const rx = 160 + Math.random() * 20;
  const ry = 48 + Math.random() * 10;
  const size = 2 + Math.random() * 3;
  const delay = Math.random() * 6;
  const dur = 8 + Math.random() * 6;
  const isCyan = Math.random() > 0.35;
  return { angle, rx, ry, size, delay, dur, isCyan };
});

const OrbitalRing = () => {
  const ref = useRef(null);

  return (
    <div className="orbital-ring-wrapper" ref={ref}>
      <svg
        viewBox="-200 -80 400 160"
        className="orbital-ring-svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="orbGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--neon-cyan)" stopOpacity="0" />
            <stop offset="40%" stopColor="var(--neon-cyan)" stopOpacity="0.4" />
            <stop offset="60%" stopColor="var(--neon-magenta)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--neon-magenta)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <ellipse
          cx="0"
          cy="0"
          rx="160"
          ry="48"
          fill="none"
          stroke="url(#orbGrad)"
          strokeWidth="0.8"
          opacity="0.35"
        />

        {particles.map((p, i) => (
          <motion.circle
            key={i}
            r={p.size}
            fill={p.isCyan ? "var(--neon-cyan)" : "var(--neon-magenta)"}
            filter={p.isCyan ? "url(#glowCyan)" : "url(#glowMagenta)"}
            initial={{
              cx: p.rx * Math.cos((p.angle * Math.PI) / 180),
              cy: p.ry * Math.sin((p.angle * Math.PI) / 180),
              opacity: 0.2,
            }}
            animate={{
              cx: [
                p.rx * Math.cos((p.angle * Math.PI) / 180),
                p.rx * Math.cos(((p.angle + 360) * Math.PI) / 180),
              ],
              cy: [
                p.ry * Math.sin((p.angle * Math.PI) / 180),
                p.ry * Math.sin(((p.angle + 360) * Math.PI) / 180),
              ],
              opacity: [0.15, 0.8, 0.15],
            }}
            transition={{
              duration: p.dur,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>

      <motion.div
        className="orbital-ring-glow"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default OrbitalRing;
