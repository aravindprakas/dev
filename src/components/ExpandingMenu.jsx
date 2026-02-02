import { useEffect, useState } from "react";
import {
  IoPersonOutline,
  IoCodeSlashOutline,
  IoBriefcaseOutline,
  IoCallOutline,
} from "react-icons/io5";

const navItems = [
  { title: "About", id: "about", icon: IoPersonOutline },
  { title: "Skills", id: "skills", icon: IoCodeSlashOutline },
  { title: "Experience", id: "experience", icon: IoBriefcaseOutline },
  { title: "Contact", id: "contact", icon: IoCallOutline },
];

export default function GlowMenu() {
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredItem, setHoveredItem] = useState(null);

  const scrollToSection = (id) => {
    // user intent wins immediately
    setActiveSection(id);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Scroll spy (immediate updates)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    navItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      {/* Capsule */}
      <div className="flex items-center gap-6 px-8 md:px-10 py-3 md:py-4 rounded-full bg-black/60 backdrop-blur-md">
        {/* Logo */}
        <div
          onClick={() => scrollToSection("home")}
          className="text-white font-bold cursor-pointer select-none text-2xl md:text-3xl"
        >
          AG
        </div>

        {/* Menu */}
        <ul className="flex gap-4 md:gap-5">
          {navItems.map((item) => {
            const Icon = item.icon;

            const isExpanded =
              hoveredItem === item.id ||
              (!hoveredItem && activeSection === item.id);

            return (
              <li
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`
                  relative flex items-center justify-center
                  rounded-full cursor-pointer
                  transition-all duration-800
                  h-[44px] md:h-[56px]
                  ${
                    isExpanded
                      ? "bg-white w-[130px] md:w-[170px]"
                      : "bg-black w-[44px] md:w-[56px]"
                  }
                `}
              >
                {/* Icon */}
                <Icon
                  className={`
                    transition-all duration-300
                    text-lg md:text-xl
                    ${
                      isExpanded
                        ? "scale-0 text-black"
                        : "scale-100 text-white"
                    }
                  `}
                />

                {/* Label */}
                <span
                  className={`
                    absolute uppercase tracking-widest
                    text-[10px] md:text-xs
                    transition-transform duration-300
                    ${isExpanded ? "scale-100 text-black" : "scale-0"}
                  `}
                >
                  {item.title}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
