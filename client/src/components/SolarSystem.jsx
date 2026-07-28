const PLANETS = [
  { name: "Java", color: "#00f0ff", size: "1.35rem", orbit: "6.8rem", x: "0rem", y: "-7.5rem", delay: "-1s" },
  { name: "Spring", color: "#00ff88", size: "1.55rem", orbit: "8.8rem", x: "8.5rem", y: "-4.6rem", delay: "-3s" },
  { name: "NestJS", color: "#ff00aa", size: "1.2rem", orbit: "10.8rem", x: "-9rem", y: "-4.2rem", delay: "-5s" },
  { name: "PostgreSQL", color: "#a855f7", size: "1.3rem", orbit: "12.6rem", x: "-12rem", y: "3.6rem", delay: "-7s" },
  { name: "Docker", color: "#60a5fa", size: "1rem", orbit: "14.1rem", x: "13.2rem", y: "3.2rem", delay: "-9s" },
  { name: "Kubernetes", color: "#f43f5e", size: "0.95rem", orbit: "15.3rem", x: "5.5rem", y: "7.7rem", delay: "-11s" },
  { name: "Microservices", color: "#facc15", size: "1.15rem", orbit: "16.4rem", x: "-4rem", y: "9.4rem", delay: "-13s" },
];

const SolarSystem = () => {
  return (
    <div className="solar-system-container" role="img" aria-label="Backend technology stack orbiting around core architecture">
      <div className="solar-system-scene" aria-hidden="true">
        <div className="solar-system-core">
          <span>Backend</span>
          <strong>Stack</strong>
        </div>

        {PLANETS.map((planet) => (
          <div
            key={`${planet.name}-orbit`}
            className="solar-system-orbit"
            style={{
              "--orbit-size": planet.orbit,
            }}
          />
        ))}

        {PLANETS.map((planet) => (
          <div
            key={planet.name}
            className="solar-system-planet"
            style={{
              "--planet-x": planet.x,
              "--planet-y": planet.y,
              "--planet-color": planet.color,
              "--planet-size": planet.size,
              "--planet-delay": planet.delay,
            }}
          >
            <span className="solar-system-planet-dot" />
            <span className="solar-system-planet-label">{planet.name}</span>
          </div>
        ))}
      </div>

      <ul className="sr-only">
        {PLANETS.map((planet) => (
          <li key={planet.name}>{planet.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SolarSystem;
