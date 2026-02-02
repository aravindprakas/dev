import { useRef, useState } from "react";

export default function WarpCTA() {
  const btnRef = useRef(null);
  const [style, setStyle] = useState({});

  const handleMove = (e) => {
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setStyle({
      transform: `
        perspective(600px)
        rotateX(${(-y / 20).toFixed(2)}deg)
        rotateY(${(x / 20).toFixed(2)}deg)
        translateZ(12px)
      `,
      background: `radial-gradient(
        circle at ${x + rect.width / 2}px ${y + rect.height / 2}px,
        rgba(59,130,246,0.35),
        rgba(59,130,246,0.15),
        transparent 60%
      )`,
    });
  };

  const reset = () => {
    setStyle({
      transform:
        "perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
      background: "rgba(59,130,246,0.2)",
    });
  };

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="relative px-12 py-5 rounded-2xl text-lg font-semibold text-white
                   bg-blue-500/20 border border-blue-400/40
                   transition-[transform,background] duration-150 ease-out
                   will-change-transform"
      style={style}
    >
      <span className="relative z-10">Enter the Flow</span>

      {/* inner glow */}
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl
                         bg-linear-to-br from-white/20 to-transparent
                         opacity-0 hover:opacity-100 transition-opacity duration-300"
      />
    </button>
  );
}
