import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Skeleton placeholder card
const SkeletonCard = ({ index }) => (
  <motion.div 
    key={`skeleton-${index}`} // Added key prop for clarity
    className="group relative bg-white rounded-xl overflow-hidden shadow-lg p-6 animate-pulse"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: index * 0.05 }}
  >
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-5/6 mb-6"></div>
    <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-200">
      <div className="h-6 bg-gray-300 rounded w-1/4"></div>
      <div className="h-8 bg-gray-300 rounded w-1/3"></div>
    </div>
  </motion.div>
);

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // FIX 2: Added state for explicit error handling
  const [isError, setIsError] = useState(false);
  
  const username = "Nsarkar-XLR8";

  useEffect(() => {
    document.title = "Projects | Nayem Sarkar";
    setIsLoading(true);
    setIsError(false); // Reset error state on new fetch

    // FIX 1: Use AbortController for cleanup
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated`,
          { signal }
        );

        if (!response.ok) {
          // Check for specific errors like rate limiting (403) or not found (404)
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();

        const filtered = data.filter(
          (repo) => !repo.fork && repo.name.toLowerCase() !== "portfolio"
        );
        
        setRepos(filtered);
      } catch (err) {
        if (err.name !== 'AbortError') {
            console.error("Failed to fetch repositories:", err);
            setIsError(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();

    // Cleanup function to abort the request
    return () => {
        controller.abort();
    };
  }, [username]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div
      className="w-full min-h-screen py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#E1D4C1" }}
    >
      <motion.h2
        className="text-4xl font-bold text-center mb-12 text-gray-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        My GitHub Projects 🚀
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto min-h-[50vh]" // Added min-height for better layout during loading
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Conditional Rendering Logic */}
        {isLoading ? (
          // Show 6 skeleton cards while loading
          Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} index={index} />)
        ) : isError ? (
            // Show explicit error message
            <p className="text-center text-xl text-red-600 col-span-full py-10">
                ⚠️ **Error:** Failed to load projects from GitHub. Check the network or API rate limits.
            </p>
        ) : repos.length > 0 ? (
          // Show the project cards
          repos.map((repo) => (
            <motion.div
              key={repo.id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-2xl"
              variants={itemVariants}
              whileHover={{
                scale: 1.03, // Slightly reduced hover scale
                y: -5,
                boxShadow: "0px 15px 25px rgba(0,0,0,0.15)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div className="p-6 h-full flex flex-col">
                <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-amber-600 transition-colors duration-300">
                  {/* Nicely format repo name */}
                  {repo.name.replace(/[-_]/g, " ").split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </h3>
                <p className="text-gray-700 mb-2 flex-grow opacity-90">
                  {repo.description || "No description provided."}
                </p>

                {/* Automatic Metrics Section */}
                <div className="text-gray-600 mb-4 font-medium flex gap-4 text-sm">
                  <span title="Stars">⭐ {repo.stargazers_count}</span>
                  <span title="Forks">🍴 {repo.forks_count}</span>
                  <span title="Open Issues">🐛 {repo.open_issues_count}</span>
                </div>

                <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-sm font-semibold text-gray-800 bg-gray-200 px-2 py-1 rounded">
                    {repo.language || "Code"}
                  </span>
                  <div className="flex gap-2">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-black text-white text-sm font-semibold rounded hover:bg-gray-800 transition-all duration-300"
                    >
                      GitHub
                    </a>
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-amber-600 text-white text-sm font-semibold rounded hover:bg-amber-700 transition-all duration-300"
                      >
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
            // Show message if no repos are found after a successful fetch
            <p className="text-center text-xl text-gray-700 col-span-full py-10">
                No public repositories found, or all repos are excluded by the filter.
            </p>
        )}
      </motion.div>
    </div>
  );
};

export default Projects;