import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import servicesData from "../data/services.json";
import Footer from "../components/Footer"; // adjust path if needed

function Service() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = servicesData.find((s) => s.id === id);

  // Refs for animation
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Scroll to top and animate on mount
  useEffect(() => {
    window.scrollTo(0, 0);

    if (cardRef.current && titleRef.current && descRef.current && buttonRef.current) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(cardRef.current, { opacity: 0, y: 50, duration: 0.8 })
        .from(titleRef.current, { opacity: 0, y: 20, duration: 0.6 }, "-=0.5")
        .from(descRef.current, { opacity: 0, y: 20, duration: 0.6 }, "-=0.5")
        .from(buttonRef.current, { opacity: 0, y: 20, duration: 0.6 }, "-=0.5");
    }
  }, []);

  if (!service)
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <p className="text-xl mb-6">Service not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition"
        >
          &larr; Back
        </button>
        <Footer />
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <section className="flex-1 w-full flex flex-col items-center py-20 px-4 sm:px-6 md:px-20">
        {/* Back Button above the card */}
        <div className="w-full max-w-4xl mb-6 flex justify-start">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition"
          >
            &larr; Back
          </button>
        </div>

        {/* Content Card */}
        <div
          ref={cardRef}
          className="bg-gray-900 rounded-3xl shadow-xl max-w-4xl w-full p-10 sm:p-14 flex flex-col gap-6"
        >
          {/* Title */}
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl font-bold text-[#00caeb]"
          >
            {service.title}
          </h1>

          {/* Divider */}
          <div className="h-1 w-24 bg-[#00caeb] rounded-full my-2" />

          {/* Full Description */}
          <p
            ref={descRef}
            className="text-gray-300 text-lg sm:text-xl leading-relaxed"
          >
            {service.fullDesc}
          </p>

          {/* Get Started Button */}
          <button
            ref={buttonRef}
            onClick={() => navigate("/contact")}
            className="mt-6 self-start px-6 py-3 bg-[#00caeb] text-black font-semibold rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Service;
