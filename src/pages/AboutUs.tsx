import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import aboutBg from "../assets/about_bg.png";
import StoryScroll from "../components/StoryScroll";

/* =======================
   FAKE DATA
======================= */
const ABOUT_PAGES = [
  {
    id: "mission",
    label: "Our Mission",
    title: "Purpose-Driven Growth",
    description:
      "We help brands grow through clarity, performance, and intelligent digital strategy.",
    points: [
      "Turn attention into revenue",
      "Human-centered experiences",
      "Long-term scalable growth",
    ],
  },
  {
    id: "vision",
    label: "Our Vision",
    title: "Building Digital Momentum",
    description:
      "We envision brands communicating authentically and scaling sustainably.",
    points: [
      "Stand out in competitive markets",
      "Data-driven decisions",
      "Sustainable systems",
    ],
  },
  {
    id: "values",
    label: "Our Values",
    title: "What We Stand For",
    description:
      "Transparency, ownership, and quality guide everything we do.",
    points: [
      "Radical transparency",
      "Ownership of results",
      "Quality over speed",
    ],
  },
];

/* =======================
   PAGE COMPONENT
======================= */
function Page({
  label,
  title,
  description,
  points,
}: {
  label: string;
  title: string;
  description: string;
  points: string[];
}) {
  return (
    <div className="h-full w-full p-6 sm:p-12 flex flex-col justify-between bg-white rounded-3xl">
      <span className="text-xs sm:text-sm uppercase tracking-wide text-gray-400">{label}</span>
      <div className="space-y-4 sm:space-y-6">
        <h3 className="text-2xl sm:text-4xl font-bold text-black">{title}</h3>
        <p className="text-gray-600 text-sm sm:text-lg leading-relaxed">{description}</p>
        <ul className="space-y-2 sm:space-y-3">
          {points.map((point, i) => (
            <li key={i} className="flex gap-2 sm:gap-3 text-gray-700">
              <span className="mt-2 w-2 h-2 rounded-full bg-[#00caeb]" />
              {point}
            </li>
          ))}
        </ul>
      </div>
      <span className="text-xs sm:text-sm text-gray-400">Click to bring forward</span>
    </div>
  );
}

/* =======================
   STACK CONFIG
======================= */
const CARD_WIDTH = 700;
const STACK_PEEK = 0.15;
const MOBILE_SPACING = 60;

/* =======================
   ABOUT US PAGE
======================= */
export default function AboutUs() {
  const [stack, setStack] = useState(ABOUT_PAGES.map((_, i) => i));
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // Detect mobile/tablet screens
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1025);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP reveal animation
  useEffect(() => {
    if (!sectionRef.current) return;

    cardsRef.current.forEach((card) => {
      gsap.set(card, { opacity: 0, y: 50, scale: 0.95 });
    });

    gsap.to(cardsRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });
  }, []);

  const swapToSelected = (index: number) => {
    setStack((prev) => [index, ...prev.filter((i) => i !== index)]);
  };

  return (
    <section
      ref={sectionRef}
      id="AboutUs"
      className="w-full h-screen relative text-white overflow-auto sm:overflow-hidden"
      style={{
        backgroundImage: `url(${aboutBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      {/* Story Scroll (icons) */}
      <StoryScroll />

      {/* Content */}
      <div
        className={`relative z-10 w-full h-full flex px-4 sm:pr-24 ${
          isMobile ? "justify-center items-center" : "justify-end items-center"
        }`}
      >
        <div
          className={`relative w-full sm:w-[720px] h-full flex ${
            isMobile ? "justify-center items-center" : "justify-end items-center"
          }`}
        >
          {stack.map((pageIndex, depth) => {
            const x = !isMobile ? -depth * CARD_WIDTH * STACK_PEEK : 0;
            const y = !isMobile ? 0 : depth * MOBILE_SPACING;
            const scale = 1 - depth * 0.05;

            return (
              <div
                key={ABOUT_PAGES[pageIndex].id}
                ref={(el) => {
                  if (el) cardsRef.current[depth] = el;
                }}
                onClick={() => swapToSelected(pageIndex)}
                style={{
                  transform: `translate(${x}px, ${y}px) scale(${scale})`,
                  zIndex: 100 - depth,
                  cursor: "pointer",
                }}
                className="
                  absolute
                  w-full sm:w-[700px]
                  h-[420px] sm:h-[520px]
                  rounded-3xl
                  shadow-2xl
                  bg-white
                  transition-all duration-500 ease-out
                  flex-shrink-0
                "
              >
                <Page {...ABOUT_PAGES[pageIndex]} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
