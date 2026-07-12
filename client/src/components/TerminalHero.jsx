import { useState, useEffect, useCallback } from "react";

const roles = [
  "Software Engineer",
  "Backend Architect",
  "Spring Boot Specialist",
  "NestJS Engineer",
  "Microservices Designer",
  "Data Systems Optimizer",
];

const TERMINAL_PROMPT = "$ ";
const TYPING_SPEED = 70;
const DELETING_SPEED = 35;
const PAUSE_AFTER_TYPE = 2000;
const PAUSE_AFTER_DELETE = 400;

const TerminalHero = () => {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentRole = roles[roleIndex];

  const tick = useCallback(() => {
    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
        return TYPING_SPEED + Math.random() * 40 - 20;
      }
      setIsDeleting(false);
      return PAUSE_AFTER_TYPE;
    }

    if (displayText.length > 0) {
      setDisplayText(displayText.slice(0, -1));
      return DELETING_SPEED + Math.random() * 20 - 10;
    }

    setIsDeleting(false);
    setRoleIndex((prev) => (prev + 1) % roles.length);
    return PAUSE_AFTER_DELETE;
  }, [displayText, isDeleting, currentRole, roleIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDeleting && displayText.length === currentRole.length) {
        setIsDeleting(true);
      } else {
        tick();
      }
    }, isDeleting || displayText.length === currentRole.length ? tick() : TYPING_SPEED);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRole, tick]);

  return (
    <div className="terminal-window">
      <div className="terminal-bar">
        <span className="terminal-dot bg-[#ff5f57]" />
        <span className="terminal-dot bg-[#febc2e]" />
        <span className="terminal-dot bg-[#28c840]" />
        <span className="terminal-title">nayem@portfolio ~ %</span>
      </div>
      <div className="terminal-body">
        <span className="terminal-prompt">{TERMINAL_PROMPT}</span>
        <span className="terminal-text">{displayText}</span>
        <span className="terminal-cursor" />
      </div>
    </div>
  );
};

export default TerminalHero;
