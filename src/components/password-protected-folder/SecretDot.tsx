
import React from "react";

interface SecretDotProps {
  isUnlocked: boolean;
  dotVisible: boolean;
  handleClickSecretArea: () => void;
}

const SecretDot: React.FC<SecretDotProps> = ({
  isUnlocked,
  dotVisible,
  handleClickSecretArea,
}) => {
  if (isUnlocked) return null;

  // Determine background and opacity for best visibility in light & dark themes
  // Use a higher min opacity and add a subtle outline in light mode for accessibility
  const isLight =
    typeof window !== "undefined"
      ? document.body.classList.contains("theme-light")
      : false;

  return (
    <div
      className="fixed bottom-6 right-6 w-10 h-10 z-50 flex items-center justify-center"
      style={{
        pointerEvents: "auto",
        // More visible in light mode (esp. if bg matches dot)
        opacity: dotVisible
          ? isLight
            ? 0.42
            : 0.15
          : isLight
          ? 0.11
          : 0.045,
        background: "transparent",
        transition: "opacity 0.2s",
        filter:
          "blur(0.5px) drop-shadow(0 0 14px #ffe35933)",
        userSelect: "none",
      }}
      aria-label={"Unlock protected folder"}
      onClick={handleClickSecretArea}
      tabIndex={0}
      role="button"
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") handleClickSecretArea();
      }}
    >
      <div
        className="w-7 h-7 rounded-full bg-cyberpunk-accent border-2 border-cyberpunk-accent/50 shadow-cyberpunk ring-2 ring-cyberpunk-accent/60"
        style={{
          boxShadow: "0 0 18px #ffe359, 0 0 30px #50e6ff77",
          opacity: 1,
          pointerEvents: "auto",
          transition: "background 0.2s, box-shadow 0.2s",
        }}
      />
    </div>
  );
};

export default SecretDot;
