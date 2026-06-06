const CACHE_KEY = "nayem-github-repos";
const CACHE_TTL = 1000 * 60 * 10;
const REQUEST_TIMEOUT = 6000;

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
      `https://api.github.com/users/${username}/repos?sort=updated`,
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
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
    signal?.removeEventListener("abort", abortOnParentSignal);
  }
};
