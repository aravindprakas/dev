import { useEffect, useRef, useMemo } from 'react';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const ScrollReveal = () => {
  const containerRef = useRef(null);

  const TEXT_PARTS = [
    {
      text: "I am",
      className: "font-normal",
    },
    {
      text: " Aravind Prakash, ",
      className: "italic font-serif",
    },
    {
      text: "a frontend developer crafting web experiences that move, respond, and connect.",
      className: "font-normal",
    },
  ];

  const splitText = useMemo(() => {
    return TEXT_PARTS.flatMap((part, partIndex) =>
      part.text.split(/(\s+)/).map((word, index) => {
        if (word.match(/^\s+$/)) return word;

        return (
          <span
            key={`${partIndex}-${index}`}
            className={`inline-block word ${part.className}`}
            style={{ willChange: 'opacity, filter' }}
          >
            {word}
          </span>
        );
      })
    );
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll('.word');
    const baseOpacity = 0;
    const blurStrength = 4;

    words.forEach((w) => {
      w.style.opacity = baseOpacity;
      w.style.filter = `blur(${blurStrength}px)`;
    });

    let frameId;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      const start = vh * 0.5;
      const end = vh * 0.1;

      let progress = (start - rect.top) / (start - end);
      progress = clamp(progress, 0, 1);

      const totalWords = words.length || 1;
      const staggerAmount = 0.6;
      const perWordOffset = staggerAmount / totalWords || 0;

      words.forEach((wordEl, index) => {
        const wordStart = index * perWordOffset;
        const wordEnd = wordStart + (1 - staggerAmount);

        let wordProgress = (progress - wordStart) / (wordEnd - wordStart || 1e-6);
        wordProgress = clamp(wordProgress, 0, 1);

        const opacity = baseOpacity + (1 - baseOpacity) * wordProgress;
        const blur = blurStrength * (1 - wordProgress);

        wordEl.style.opacity = opacity;
        wordEl.style.filter = `blur(${blur}px)`;
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Spacer for scroll effect */}
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Scroll Down
          </h1>
          <div className="text-6xl text-white animate-bounce">↓</div>
        </div>
      </div>

      {/* Main scroll reveal section */}
      <section className="bg-black px-8 md:px-16 py-16 relative min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h2 ref={containerRef} className="relative">
            {/* Floating image */}
            <div className="float-left w-64 md:w-80 lg:w-96 h-64 md:h-80 lg:h-96 mr-6 md:mr-12 mb-8 mt-[2.2em] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&crop=faces"
                alt="Portrait"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Scroll reveal text */}
            <p className="text-4xl md:text-5xl lg:text-7xl leading-tight text-white">
              {splitText}
            </p>
          </h2>
        </div>

        {/* Clearfix */}
        <div className="clear-both"></div>
      </section>

      {/* Additional spacer */}
      <div className="h-screen bg-black"></div>
    </div>
  );
};

export default ScrollReveal;