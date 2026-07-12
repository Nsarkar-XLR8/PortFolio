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
  } catch (error) {
    if (cachedRepos) return cachedRepos;
    writeCache(FALLBACK_REPOS);
    return FALLBACK_REPOS;
  } finally {
    window.clearTimeout(timeoutId);
    signal?.removeEventListener("abort", abortOnParentSignal);
  }
};
