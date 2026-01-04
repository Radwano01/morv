import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import founderPhoto from "../assets/founder.png";

gsap.registerPlugin(ScrollTrigger);

export default function Founder() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%", // when top of card reaches 80% of viewport height
        },
      }
    );
  }, []);

  return (
    <section
      id="founder"
      className="w-full min-h-screen relative flex items-center justify-center overflow-auto bg-black px-4 sm:px-0 py-6 sm:py-0"
    >
      {/* Founder Card */}
      <div
        ref={cardRef}
        className="
          relative z-[50]
          w-full max-w-[1100px]
          h-auto sm:h-[560px]
          rounded-[40px]
          flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16
          px-6 sm:px-20 py-10 sm:py-0
          text-black
          bg-white/90
          backdrop-blur-md
          shadow-lg
        "
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/5 rounded-[40px]" />

        {/* Founder Image */}
        <div className="flex-shrink-0 self-center">
          <div className="w-48 sm:w-[260px] h-auto overflow-hidden">
            <img
              src={founderPhoto}
              alt="Founder"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Founder Info */}
        <div className="flex flex-col justify-center items-center sm:items-start text-center sm:text-left w-full sm:w-auto">
          <div className="flex flex-col justify-center items-center sm:items-start gap-4 sm:gap-6 max-w-full sm:max-w-xl">
            <span className="uppercase tracking-widest text-sm text-[#0077a3]">
              Our Founder
            </span>

            <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
              Alex Morgan
            </h1>

            <p className="text-sm sm:text-lg text-gray-800 leading-relaxed">
              Alex founded MORV with one clear mission: to help brands grow
              through clarity, performance, and intelligent digital systems.
              With years of experience in strategy and execution, Alex bridges
              creativity with measurable results.
            </p>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 mt-4 text-center sm:text-left">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold">8+</h3>
                <p className="text-xs sm:text-sm text-gray-700">Years Experience</p>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold">120+</h3>
                <p className="text-xs sm:text-sm text-gray-700">Projects Delivered</p>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold">30+</h3>
                <p className="text-xs sm:text-sm text-gray-700">Global Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
