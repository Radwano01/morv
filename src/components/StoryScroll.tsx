import { useState, useEffect } from "react";
import {
  FiHome,
  FiLayers,
  FiInfo,
  FiUser,
  FiMessageSquare,
  FiHelpCircle,
} from "react-icons/fi";
import type { PlanetHandle } from "../components/Planet";

const sections = [
  { id: "top", label: "Home", icon: FiHome },
  { id: "services", label: "Services", icon: FiLayers },
  { id: "AboutUs", label: "About", icon: FiInfo },
  { id: "Founder", label: "Founder", icon: FiUser },
  { id: "Feedback", label: "Feedback", icon: FiMessageSquare },
  { id: "FAQ", label: "FAQ", icon: FiHelpCircle },
];

interface StoryScrollProps {
  planetRef?: React.RefObject<PlanetHandle | null>;
}

export default function StoryScroll({ planetRef }: StoryScrollProps) {
  const [active, setActive] = useState("top");

  // Track sections positions
  useEffect(() => {
    const handleScroll = () => {
      let current = "top";
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          current = section.id;
        }
      }
      setActive((prev) => {
        if (prev !== current) {
          // Planet logic
          if (current === "services") {
            planetRef?.current?.flyInToServices();
          } else {
            planetRef?.current?.resetPlanet();
          }
          return current;
        }
        return prev;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initialize active state on load

    return () => window.removeEventListener("scroll", handleScroll);
  }, [planetRef]);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[999] flex flex-col gap-6">
      {sections.map(({ id, icon: Icon }) => (
        <button
          key={id}
          title={id}
          onClick={() => {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            setActive(id); // Optional, scroll listener will correct it
          }}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition
            ${
              active === id
                ? "bg-[#00caeb] text-black scale-110 shadow-[0_0_12px_#00caeb]"
                : "bg-white/10 text-white hover:bg-[#00caeb]/30"
            }`}
        >
          <Icon size={18} />
        </button>
      ))}
    </div>
  );
}
