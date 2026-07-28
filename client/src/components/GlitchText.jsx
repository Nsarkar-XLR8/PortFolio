const GlitchText = ({ children, className = "" }) => {
  return (
    <span className={`glitch-text ${className}`} data-text={children}>
      {children}
    </span>
  );
};

export default GlitchText;
