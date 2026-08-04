const CACHE_KEY = "nayem-github-repos";
const CACHE_TTL = 1000 * 60 * 10;
const REQUEST_TIMEOUT = 6000;

const FALLBACK_REPOS = [
  {
    id: 1,
    name: "microservices-gateway",
    description: "Spring Cloud Gateway with Eureka service discovery and route configuration for distributed microservices.",
    language: "Java",
    html_url: "https://github.com/Nsarkar-XLR8/microservices-gateway",
    homepage: "",
    stargazers_count: 2,
    forks_count: 1,
    open_issues_count: 0,
    fork: false,
  },
  {
    id: 2,
    name: "payment-service",
    description: "Idempotent payment processing service with Stripe and PayPal integration, webhook validation, and transaction reliability.",
    language: "Java",
    html_url: "https://github.com/Nsarkar-XLR8/payment-service",
    homepage: "",
    stargazers_count: 3,
    forks_count: 0,
    open_issues_count: 1,
    fork: false,
  },
  {
    id: 3,
    name: "auth-api",
    description: "Secure REST API with OAuth2, JWT token management, role-based access control, and session handling.",
    language: "TypeScript",
    html_url: "https://github.com/Nsarkar-XLR8/auth-api",
    homepage: "",
    stargazers_count: 1,
    forks_count: 0,
    open_issues_count: 0,
    fork: false,
  },
  {
    id: 4,
    name: "data-access-optimizer",
    description: "Hibernate query optimization toolkit with second-level caching, N+1 detection, and native SQL CTE support.",
    language: "Java",
    html_url: "https://github.com/Nsarkar-XLR8/data-access-optimizer",
    homepage: "",
    stargazers_count: 4,
    forks_count: 2,
    open_issues_count: 0,
    fork: false,
  },
  {
    id: 5,
    name: "portfolio",
    description: "My personal portfolio built with React, Vite, Tailwind CSS, and framer-motion.",
    language: "JavaScript",
    html_url: "https://github.com/Nsarkar-XLR8/portfolio",
    homepage: "",
    stargazers_count: 1,
    forks_count: 0,
    open_issues_count: 0,
    fork: false,
  },
  {
    id: 6,
    name: "websocket-chat",
    description: "Real-time chat service using WebSockets with message persistence, typing indicators, and presence tracking.",
    language: "TypeScript",
    html_url: "https://github.com/Nsarkar-XLR8/websocket-chat",
    homepage: "",
    stargazers_count: 2,
    forks_count: 1,
    open_issues_count: 0,
    fork: false,
  },
];

const readCache = () => {
  try {
    const cached = window.sessionStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const parsed = JSON.parse(cached);
    if (!parsed.timestamp || Date.now() - parsed.timestamp > CACHE_TTL) return null;

    return parsed.repos || null;
  } catch {
    return null;
  }
};

const writeCache = (repos) => {
  try {
    window.sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), repos })
    );
  } catch {
    // Storage can be unavailable in private browsing; the network result still works.
  }
};

export const getCachedRepos = () => readCache();

export const fetchGitHubRepos = async (username, signal) => {
  const cachedRepos = readCache();
  const timeoutController = new AbortController();
  const timeoutId = window.setTimeout(() => timeoutController.abort(), REQUEST_TIMEOUT);

  const abortOnParentSignal = () => timeoutController.abort();
  signal?.addEventListener("abort", abortOnParentSignal, { once: true });

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`,
      { signal: timeoutController.signal }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    const repos = data.filter(
      (repo) => !repo.fork && repo.name.toLowerCase() !== "portfolio"
    );

    writeCache(repos);
    return repos;
  } catch {
    if (cachedRepos) return cachedRepos;
    writeCache(FALLBACK_REPOS);
    return FALLBACK_REPOS;
  } finally {
    window.clearTimeout(timeoutId);
    signal?.removeEventListener("abort", abortOnParentSignal);
  }
};

// Dictionary for custom live URL overrides (e.g. Vercel, Render, Railway, etc.)
export const LIVE_URL_MAP = {
  "portfolio": "https://nsarkar-xlr8.github.io/PortFolio/",
  "PortFolio": "https://nsarkar-xlr8.github.io/PortFolio/",
  // Add any Vercel / Render URLs here if not set in GitHub repo settings:
  // "my-vercel-app": "https://my-vercel-app.vercel.app",
  // "my-render-service": "https://my-render-service.onrender.com",
};

export const getLiveUrl = (repo) => {
  if (repo.homepage && repo.homepage.trim() !== "") {
    return repo.homepage.trim();
  }
  const key = repo.name;
  const lowerKey = repo.name.toLowerCase();
  return LIVE_URL_MAP[key] || LIVE_URL_MAP[lowerKey] || null;
};

export const getPlatformBadge = (url) => {
  if (!url) return null;
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes("vercel.app") || lowerUrl.includes("vercel")) {
    return { name: "Vercel", color: "#ffffff", bg: "rgba(255,255,255,0.12)", icon: "▲" };
  }
  if (lowerUrl.includes("onrender.com") || lowerUrl.includes("render")) {
    return { name: "Render", color: "#46e3b7", bg: "rgba(70,227,183,0.12)", icon: "⚡" };
  }
  if (lowerUrl.includes("github.io")) {
    return { name: "GitHub Pages", color: "#6e7681", bg: "rgba(110,118,129,0.15)", icon: "🐙" };
  }
  if (lowerUrl.includes("netlify.app")) {
    return { name: "Netlify", color: "#25c7b7", bg: "rgba(37,199,183,0.15)", icon: "🌐" };
  }
  return { name: "Live Site", color: "var(--neon-cyan)", bg: "rgba(0,240,255,0.12)", icon: "🟢" };
};

export const getProjectImage = (repo) => {
  // Use GitHub's official open-graph preview image for every repository
  return `https://opengraph.githubassets.com/1/Nsarkar-XLR8/${repo.name}`;
};

export const getLanguageConfig = (language) => {
  const lang = (language || "").toLowerCase();
  if (lang.includes("java") && !lang.includes("script")) {
    return {
      gradient: "from-amber-950/60 via-red-950/40 to-[#0d1117]",
      accent: "#f89820",
      border: "rgba(248, 152, 32, 0.3)",
      badgeBg: "rgba(248, 152, 32, 0.15)",
    };
  }
  if (lang.includes("javascript") || lang.includes("js")) {
    return {
      gradient: "from-yellow-950/60 via-amber-950/40 to-[#0d1117]",
      accent: "#f7df1e",
      border: "rgba(247, 223, 30, 0.3)",
      badgeBg: "rgba(247, 223, 30, 0.15)",
    };
  }
  if (lang.includes("typescript") || lang.includes("ts")) {
    return {
      gradient: "from-blue-950/60 via-cyan-950/40 to-[#0d1117]",
      accent: "#3178c6",
      border: "rgba(49, 120, 198, 0.3)",
      badgeBg: "rgba(49, 120, 198, 0.15)",
    };
  }
  if (lang.includes("python")) {
    return {
      gradient: "from-blue-950/60 via-emerald-950/40 to-[#0d1117]",
      accent: "#3776ab",
      border: "rgba(55, 118, 171, 0.3)",
      badgeBg: "rgba(55, 118, 171, 0.15)",
    };
  }
  if (lang.includes("html") || lang.includes("css")) {
    return {
      gradient: "from-orange-950/60 via-rose-950/40 to-[#0d1117]",
      accent: "#e34f26",
      border: "rgba(227, 79, 38, 0.3)",
      badgeBg: "rgba(227, 79, 38, 0.15)",
    };
  }
  return {
    gradient: "from-cyan-950/60 via-slate-950/40 to-[#0d1117]",
    accent: "var(--neon-cyan)",
    border: "rgba(0, 240, 255, 0.3)",
    badgeBg: "rgba(0, 240, 255, 0.15)",
  };
};


