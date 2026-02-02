import { useEffect, useState } from "react";
import WarpCTA from "./WarpCTA";

export default function AnimatedHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-black via-zinc-900 to-black text-white overflow-hidden px-6">
      {/* ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.2),transparent_60%)]" />

      <div
        className={`relative max-w-3xl text-center transition-all duration-700 ease-out
        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        {/* badge */}
        <span
          className={`inline-block mb-6 px-4 py-1 text-sm rounded-full bg-white/10 backdrop-blur
          transition-all duration-300 cursor-default
          hover:bg-white/20 hover:scale-[1.03]
          ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          Production-grade UI
        </span>

        {/* title */}
        <h1
          className={`group text-4xl md:text-6xl font-extrabold tracking-tight leading-tight
  transition-all duration-700 delay-200 cursor-default
  ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <span className="inline-flex gap-[0.02em]">
            {"Motion that feels".split("").map((char, i) => (
              <span
                key={i}
                className="
          inline-block
          transition-[transform,opacity]
          duration-300
          ease-out
          group-hover:skew-y-6
          group-hover:scale-y-[0.9]
          group-hover:scale-x-[1.05]
          group-hover:-translate-y-px
        "
                style={{
                  transitionDelay: `${i * 18}ms`,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>

          <span
            className="
      block mt-2 text-blue-400
      transition-all duration-300
      group-hover:tracking-wider
      group-hover:scale-x-[1.02]
      group-hover:skew-x-[-4deg]
    "
          >
            intentional
          </span>
        </h1>

        {/* subtitle */}
        <p
          className={`mt-6 text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto
          transition-all duration-300 cursor-default
          hover:text-zinc-200 hover:-translate-y-px
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          Subtle entrance animations using nothing but React state and Tailwind
          utilities. No libraries. No noise.
        </p>

        {/* actions */}
        <div
          className={`mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center
          transition-all duration-700 delay-500
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {/* primary CTA */}
          <WarpCTA />

          {/* secondary CTA */}
          <button className="relative px-8 py-3 text-white/80 font-semibold transition group">
            <span className="relative z-10">Learn More</span>
            <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 bg-white/40 transition-all duration-300 group-hover:w-full group-hover:left-0" />
          </button>
        </div>
      </div>
    </section>
  );
}
