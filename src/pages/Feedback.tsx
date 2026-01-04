import { useState, useEffect, useRef } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import feedbackBg from "../assets/feedback_bg.jpg";

gsap.registerPlugin(ScrollTrigger);

const feedbacks = [
  {
    title: "Amazing Experience",
    message:
      "Working with this team was a pleasure. Everything was smooth, professional, and exceeded expectations.",
    name: "Ray Robertson",
    role: "Product Manager",
    stars: 5,
  },
  {
    title: "Outstanding Quality",
    message:
      "The final result was polished and modern. Communication was clear throughout the project.",
    name: "Emily Watson",
    role: "UI Designer",
    stars: 4,
  },
];

export default function Feedback() {
  const [isMobile, setIsMobile] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  // Detect mobile/tablet screens
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1025);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animate on scroll
  useEffect(() => {
    if (!bgRef.current || !textRef.current || !cardsRef.current || !quoteRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: bgRef.current,
        start: "top 80%",
      },
    });

    // Background fade in
    tl.from(bgRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out",
    });

    // Quote circle fade in
    tl.from(quoteRef.current, {
      opacity: 0,
      scale: 0.5,
      duration: 0.5,
      ease: "back.out(1.7)",
    }, "-=0.5");

    // Text fade/slide in
    tl.from(textRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.4");

    // Cards fade/slide in staggered
    tl.fromTo(
      cardsRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      },
      "-=0.5"
    );

  }, []);

  return (
    <section
      className="relative w-full min-h-[85vh] flex items-center justify-center bg-cover bg-center py-12 sm:py-24"
      style={{ backgroundImage: `url(${feedbackBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 w-full px-6 flex justify-center">
        <div className="relative w-full max-w-7xl">
          {/* MINIMIZED BACKGROUND */}
          <div
            ref={bgRef}
            className={`relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl px-6 sm:px-14 py-12 sm:py-20 flex flex-col ${
              isMobile ? "items-center gap-8" : "sm:flex-row items-start gap-16"
            }`}
          >
            {/* BIG QUOTE CIRCLE */}
            <div
              ref={quoteRef}
              className="absolute -top-10 -left-10 w-20 h-20 bg-white text-black rounded-full flex items-center justify-center shadow-2xl"
            >
              <FaQuoteLeft className="text-3xl" />
            </div>

            {/* LEFT TEXT */}
            <div
              ref={textRef}
              className={`flex-1 max-w-full ${isMobile ? "text-center" : "sm:max-w-md text-left"}`}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                What Our <br /> Customers Say
              </h2>

              <p className="text-gray-300 mt-4 sm:mt-6 text-sm sm:text-base">
                Real experiences from people who trusted our process and results.
              </p>
            </div>

            {/* RIGHT CARDS */}
            <div
              ref={cardsRef}
              className={`flex ${
                isMobile
                  ? "flex-col items-center gap-6 w-full"
                  : "flex-col sm:flex-row gap-10 sm:w-auto items-start"
              }`}
            >
              {feedbacks.map((fb, i) => (
                <FeedbackCard key={i} data={fb} isMobile={isMobile} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CARD ---------------- */
function FeedbackCard({ data, isMobile }: { data: any; isMobile?: boolean }) {
  return (
    <div
      className={`${
        isMobile ? "w-full max-w-sm" : "w-full sm:w-72"
      } h-auto sm:h-[320px] bg-white rounded-3xl shadow-2xl p-6 flex flex-col justify-between`}
    >
      <div className="w-11 h-11 bg-black text-white rounded-full flex items-center justify-center text-sm mb-3">
        <FaQuoteLeft />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-black mb-2">{data.title}</h3>

        <p className="text-gray-700 text-sm leading-relaxed">“{data.message}”</p>
      </div>

      <div className="mt-4 flex justify-between items-center w-full">
        <div>
          <p className="font-semibold text-black text-sm">{data.name}</p>
          <p className="text-xs text-gray-500">{data.role}</p>
        </div>

        <div className="flex gap-1">
          {Array.from({ length: data.stars }).map((_, i) => (
            <span key={i} className="text-yellow-400 text-sm">
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
