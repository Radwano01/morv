import "../css/Homepage.css";
import { useState, useEffect, useRef } from "react";
import TypingText from "../components/TypingText"; 
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

export default function Homepage() {
  const [hover, setHover] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  // Refs for animating
  const titleRef = useRef<HTMLHeadingElement>(null);
  const typingRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  // GSAP animation on mount
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(titleRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
    })
      .from(
        typingRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 1,
        },
        "-=0.5"
      )
      .from(
        buttonRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
        },
        "-=0.5"
      );
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-start justify-center h-full px-4 sm:px-8 md:px-12 text-left">

        {/* Title */}
        <h1
          ref={titleRef}
          className="w-full bg-gradient-to-br from-white to-[#00caeb] bg-clip-text text-transparent font-heading font-semibold leading-[0.9] tracking-tight 
          text-[32px] sm:text-[56px] md:text-[72px] lg:text-[72px]"
        >
          Mordev Arcane
        </h1>

        {/* Typing Text */}
        <div
          ref={typingRef}
          className="mt-6 max-w-full sm:max-w-[600px] min-h-[120px] sm:min-h-[160px]"
        >
          <TypingText
            text="Digital marketing is the strategic use of digital channels, platforms, and technologies to promote a brand, connect with current and prospective customers, and drive business growth. Unlike traditional marketing, it operates primarily through the internet and electronic devices, allowing for targeted, measurable, and interactive communication."
          />
        </div>

        {/* CTA Button */}
        <div ref={buttonRef} className="mt-8 sm:mt-10 w-full sm:w-auto btn-wrapper">
          <button
            className="button"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setPos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              });
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => navigate("/contact")}
          >
            <div className="btn-border">
              <div className="btn-inner relative">
                <span
                  className="btn-hover-circle absolute w-[240px] h-[240px] rounded-full pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${pos.x}px ${pos.y}px, #00caeb, #00caeb, transparent 20%)`,
                    opacity: hover ? 1 : 0,
                    transform: "translate(-50%, -50%)",
                  }}
                />
                <span className="btn-text relative z-10">Contact Us</span>
              </div>
            </div>
          </button>
        </div>

      </div>
    </div>
  );
}
