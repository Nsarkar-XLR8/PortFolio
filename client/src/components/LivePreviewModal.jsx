import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaExternalLinkAlt,
  FaRedo,
  FaDesktop,
  FaTabletAlt,
  FaMobileAlt,
  FaLock,
  FaExclamationTriangle,
} from "react-icons/fa";
import { getPlatformBadge } from "../utils/githubRepos";

const LivePreviewModal = ({ repo, liveUrl, onClose }) => {
  const [device, setDevice] = useState("desktop"); // 'desktop' | 'tablet' | 'mobile'
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const [hasError, setHasError] = useState(false);

  const platform = getPlatformBadge(liveUrl);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const getContainerWidth = () => {
    switch (device) {
      case "mobile":
        return "max-w-[390px]";
      case "tablet":
        return "max-w-[768px]";
      case "desktop":
      default:
        return "max-w-6xl";
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setHasError(false);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 md:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={`flex h-[92vh] w-full flex-col overflow-hidden rounded-2xl border border-[var(--color-accent-soft)] bg-[#0d1117] shadow-2xl transition-all duration-300 ${getContainerWidth()}`}
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-accent-soft)] bg-[#161b22] px-4 py-3">
            {/* Left: Title & Platform Badge */}
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                <FaLock className="text-[var(--neon-cyan)] text-[10px]" />
                <span className="font-mono text-xs hidden sm:inline">https://</span>
              </span>
              <h3 className="font-bold text-main text-sm sm:text-base truncate max-w-[200px] sm:max-w-xs">
                {repo?.name || "Live Project"}
              </h3>
              {platform && (
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs font-bold flex items-center gap-1"
                  style={{
                    backgroundColor: platform.bg,
                    color: platform.color,
                    border: `1px solid ${platform.color}40`,
                  }}
                >
                  <span>{platform.icon}</span>
                  <span className="hidden xs:inline">{platform.name}</span>
                </span>
              )}
            </div>

            {/* Middle: Device Viewport Switcher */}
            <div className="flex items-center rounded-lg bg-[#0d1117] p-1 border border-accent-soft">
              <button
                onClick={() => setDevice("desktop")}
                className={`rounded p-1.5 text-xs transition ${
                  device === "desktop"
                    ? "bg-[var(--color-accent)] text-white shadow"
                    : "text-muted hover:text-white"
                }`}
                title="Desktop View"
              >
                <FaDesktop />
              </button>
              <button
                onClick={() => setDevice("tablet")}
                className={`rounded p-1.5 text-xs transition ${
                  device === "tablet"
                    ? "bg-[var(--color-accent)] text-white shadow"
                    : "text-muted hover:text-white"
                }`}
                title="Tablet View"
              >
                <FaTabletAlt />
              </button>
              <button
                onClick={() => setDevice("mobile")}
                className={`rounded p-1.5 text-xs transition ${
                  device === "mobile"
                    ? "bg-[var(--color-accent)] text-white shadow"
                    : "text-muted hover:text-white"
                }`}
                title="Mobile View"
              >
                <FaMobileAlt />
              </button>
            </div>

            {/* Right: Actions (Refresh, External Link, Close) */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                className="rounded-lg p-2 text-muted hover:bg-white/10 hover:text-white transition"
                title="Reload Preview"
              >
                <FaRedo className={`text-xs ${isLoading ? "animate-spin" : ""}`} />
              </button>
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary rounded-lg px-3 py-1.5 text-xs font-bold flex items-center gap-1.5"
                title="Open live site in new tab"
              >
                <span>Live Site</span>
                <FaExternalLinkAlt className="text-[10px]" />
              </a>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-muted hover:bg-red-500/20 hover:text-red-400 transition ml-1"
                title="Close (Esc)"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>
          </div>

          {/* Preview Body */}
          <div className="relative flex-grow w-full bg-[#010409] flex items-center justify-center overflow-hidden">
            {/* Loading Indicator */}
            {isLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0d1117]/80 backdrop-blur-sm">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent-soft border-t-[var(--color-accent)]" />
                <p className="mt-4 text-sm font-medium text-muted">Loading live preview...</p>
                <p className="mt-1 text-xs text-muted/70 font-mono truncate max-w-xs">{liveUrl}</p>
              </div>
            )}

            {/* If Error or Blocked */}
            {hasError ? (
              <div className="p-8 text-center max-w-md">
                <FaExclamationTriangle className="mx-auto text-4xl text-amber-400 mb-4" />
                <h4 className="text-lg font-bold text-main">Live Frame Preview Restricted</h4>
                <p className="mt-2 text-sm text-muted">
                  This website prevents direct iframe embedding due to security headers (X-Frame-Options). You can launch it directly in a new window.
                </p>
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-6 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold"
                >
                  Open Live Application <FaExternalLinkAlt />
                </a>
              </div>
            ) : (
              <iframe
                key={iframeKey}
                src={liveUrl}
                title={`Live preview of ${repo?.name}`}
                className="h-full w-full border-0 transition-opacity duration-300"
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false);
                  setHasError(true);
                }}
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            )}
          </div>

          {/* Footer Bar */}
          <div className="flex items-center justify-between border-t border-[var(--color-accent-soft)] bg-[#161b22] px-4 py-2 text-xs text-muted">
            <span className="font-mono truncate">{liveUrl}</span>
            <span className="shrink-0 text-muted/70">Press Esc or click outside to exit</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LivePreviewModal;
