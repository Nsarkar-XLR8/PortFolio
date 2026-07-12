const GlitchText = ({ children, as: Tag = "span", className = "" }) => {
  return (
    <Tag className={`glitch-text ${className}`} data-text={children}>
      {children}
    </Tag>
  );
};

export default GlitchText;
