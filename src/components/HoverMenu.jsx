import { useState, useRef, useEffect, useCallback } from "react";

const projects = [
  { name: "VD4U", client: "for VD4U", available: true, link: "#" },
  { name: "Project Alpha", client: "Coming Soon", available: false, link: null },
  { name: "Project Beta", client: "Coming Soon", available: false, link: null },
];

const images = [
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=640&q=80",
  null,
  null,
];

const isMobile = () => window.innerWidth < 640;

export default function ProjectsList() {
  const [hovered, setHovered] = useState(null);
  const [showImg, setShowImg] = useState(false);
  const [imgStyle, setImgStyle] = useState({
    left: 0,
    top: 0,
    opacity: 0,
    scale: 0.92,
  });

  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const raf = useRef();
  const animTimeout = useRef();
  const hasInitialized = useRef(false);

  // Smooth slow image following
  useEffect(() => {
    if (!showImg || isMobile()) return;
    if (currentPos.current.x === 0 && currentPos.current.y === 0) {
      currentPos.current = { ...mousePos.current };
    }
    const animate = () => {
      currentPos.current.x +=
        (mousePos.current.x - currentPos.current.x) * 0.02;
      currentPos.current.y +=
        (mousePos.current.y - currentPos.current.y) * 0.02;
      setImgStyle((style) => ({
        ...style,
        left: currentPos.current.x,
        top: currentPos.current.y,
        opacity: 1,
        scale: 1,
        pointerEvents: "none",
      }));
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => raf.current && cancelAnimationFrame(raf.current);
  }, [showImg]);

  // New effect: sync floating image position immediately when showing
  useEffect(() => {
    if (showImg && !isMobile()) {
      currentPos.current = { ...mousePos.current };
      setImgStyle((style) => ({
        ...style,
        left: mousePos.current.x,
        top: mousePos.current.y,
        opacity: 1,
        scale: 1,
        pointerEvents: "none",
      }));
    }
  }, [showImg]);

  // Fade/scale out on leave
  useEffect(() => {
    if (!showImg) {
      setImgStyle((style) => ({
        ...style,
        opacity: 0,
        scale: 0.92,
      }));
      animTimeout.current = setTimeout(() => {
        currentPos.current = { ...mousePos.current };
      }, 230);
    }
    return () => clearTimeout(animTimeout.current);
  }, [showImg]);

  // Close image on resize (for responsiveness)
  useEffect(() => {
    const handler = () => setShowImg(false);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Update mouse position for floating image
  const handleMouseMove = (e) => {
    if (isMobile()) return;
    const offsetX = 32;
    const offsetY = -40;
    mousePos.current = {
      x: e.clientX + offsetX,
      y: e.clientY + offsetY,
    };
  };

  return (
    <div className="relative bg-black min-h-screen flex items-center justify-center px-2 py-10">
      <div className="w-full max-w-5xl relative z-10">
        <h2 className="text-2xl md:text-3xl text-gray-400 mb-8 font-medium select-none">
          Selected Projects
        </h2>
        
        <ul className="divide-y divide-gray-700" onMouseMove={handleMouseMove}>
          {projects.map((proj, idx) => {
            const ItemWrapper = proj.available ? 'a' : 'li';
            const itemProps = proj.available 
              ? { href: proj.link, className: `flex flex-row items-center py-4 md:py-6 transition-colors duration-200 cursor-pointer ${hovered === idx ? "bg-white/10" : ""}` }
              : { className: `flex flex-row items-center py-4 md:py-6 transition-colors duration-200 cursor-default ${hovered === idx ? "bg-white/10" : ""}` };

            return (
              <li key={proj.name}>
                <ItemWrapper
                  {...itemProps}
                  onMouseEnter={(e) => {
                    if (!isMobile()) {
                      if (!hasInitialized.current) {
                        const offsetX = 32;
                        const offsetY = -40;
                        mousePos.current = {
                          x: e.clientX + offsetX,
                          y: e.clientY + offsetY,
                        };
                        currentPos.current = { ...mousePos.current };
                        hasInitialized.current = true;
                      }
                      setHovered(idx);
                      setShowImg(proj.available);
                    }
                  }}
                  onMouseLeave={() => {
                    if (!isMobile()) {
                      setHovered(null);
                      setShowImg(false);
                    }
                  }}
                  onTouchStart={() => {
                    if (isMobile() && proj.available) {
                      setHovered(idx);
                      setShowImg(true);
                    }
                  }}
                  onTouchEnd={() => {
                    if (isMobile()) {
                      setShowImg(false);
                    }
                  }}
                >
                  <span className={`font-light md:font-normal text-2xl md:text-4xl leading-tight ${
                    proj.available ? 'text-white' : 'text-gray-600'
                  }`}>
                    {proj.name}
                  </span>
                  <span className="flex-1" />
                  <span className={`font-light text-2xl md:text-4xl leading-tight text-right ${
                    proj.available ? 'text-gray-400' : 'text-gray-700'
                  }`}>
                    {proj.client}
                  </span>
                </ItemWrapper>
              </li>
            );
          })}
        </ul>

        {/* Desktop floating image */}
        {hovered !== null && !isMobile() && projects[hovered]?.available && (
          <div
            className="pointer-events-none fixed z-30"
            style={{
              left: imgStyle.left,
              top: imgStyle.top,
              width: "340px",
              aspectRatio: "16/9",
              borderRadius: "0.9rem",
              overflow: "hidden",
              boxShadow: "0 4px 32px 8px rgba(0,0,0,0.26)",
              background: "#181818",
              opacity: imgStyle.opacity,
              transform: `scale(${imgStyle.scale})`,
              transition: "opacity 0.23s cubic-bezier(.6,0,.4,1), transform 0.23s cubic-bezier(.6,0,.4,1)",
            }}
          >
            <img
              src={images[hovered]}
              alt={projects[hovered].name}
              className="w-full h-full object-cover"
              draggable="false"
            />
          </div>
        )}

        {/* Mobile image display */}
        {hovered !== null && isMobile() && projects[hovered]?.available && (
          <div className="sm:hidden mt-4 flex justify-center py-2">
            <div className="w-full max-w-[90vw] aspect-video rounded-lg overflow-hidden shadow-xl bg-neutral-900">
              <img
                src={images[hovered]}
                alt={projects[hovered].name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}