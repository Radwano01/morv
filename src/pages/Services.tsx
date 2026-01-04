import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import serviceBg from "../assets/service_bg.png";
import servicesData from "../data/services.json"; // Import your JSON

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Refs for animation
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });

    tl.from(titleRef.current, { opacity: 0, y: 50, duration: 1 })
      .from(subtitleRef.current, { opacity: 0, y: 30, duration: 0.8 }, "-=0.5")
      .from(descriptionRef.current, { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
      .from(buttonRef.current, { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
      .from(dotsRef.current, { opacity: 0, y: 10, duration: 0.5, stagger: 0.1 }, "-=0.6");
  }, []);

  const handleButtonClick = () => {
    // Navigate to service page using the current slide's id
    const serviceId = servicesData[currentSlide]?.id;
    if (serviceId) {
      navigate(`/service/${serviceId}`);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen text-white flex flex-col justify-center items-start px-4 sm:px-6 md:px-24 py-12 sm:py-16 relative bg-black"
      style={{
        backgroundImage: `url(${serviceBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl">
        {/* Title */}
        <h2
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12"
        >
          Services
        </h2>

        {/* Slide Content */}
        <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-full sm:max-w-2xl">
          <h3
            ref={subtitleRef}
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-300"
          >
            {servicesData[currentSlide]?.title}
          </h3>

          <div ref={descriptionRef} className="min-h-[120px] sm:min-h-[160px] max-w-[600px]">
            <p className="text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed">
              {servicesData[currentSlide]?.shortDesc}
            </p>
          </div>

          {/* Button */}
          <div ref={buttonRef} className="mt-4 sm:mt-6">
            <button
              onClick={handleButtonClick}
              className="w-full sm:w-auto max-w-xs px-6 py-3 bg-[#00caeb] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 hover:scale-105"
            >
              View Details
            </button>
          </div>

          {/* Dots */}
          <div ref={dotsRef} className="flex gap-3 sm:gap-4 mt-4 sm:mt-6">
            {servicesData.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                  currentSlide === index
                    ? "bg-[#00caeb] scale-125"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
