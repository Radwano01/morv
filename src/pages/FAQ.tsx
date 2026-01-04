import { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import faqBg from "../assets/FAQ_bg.jpg";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What is Mordev Arcane?",
    answer:
      "Mordev Arcane is a full-service digital agency specializing in web development, UI/UX design, motion graphics, and branding solutions tailored for your business.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach our support team via email at support@mordev.com or by phone at 1-800-201-1019. We typically respond within 24 hours.",
  },
  {
    question: "Do you offer custom services?",
    answer:
      "Yes! We provide fully customized digital solutions to fit your business needs, including web apps, branding, motion graphics, and marketing services.",
  },
  {
    question: "What is your pricing model?",
    answer:
      "Our pricing is flexible depending on project scope. We offer both fixed-price packages and hourly rates for custom projects.",
  },
  {
    question: "Can I see examples of your previous work?",
    answer:
      "Absolutely! We showcase our portfolio on our website, which includes web development, UI/UX, and motion design projects.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToFooter = () => {
    document.getElementById("footer")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // Animate on scroll
  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });

    // Header animation
    tl.from(headerRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
    });

    // FAQ items animation (staggered)
    tl.from(
      faqRefs.current,
      {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      },
      "-=0.4"
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url(${faqBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* CONTENT WRAPPER */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-24">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">FAQs</h1>
          <p className="text-gray-300 text-lg">
            Have questions? We’ve got answers.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                ref={(el) => {
                  faqRefs.current[idx] = el; // assign element
                }}

                className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left"
                >
                  <span className="text-lg md:text-xl font-medium">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <FaChevronUp className="text-gray-300" />
                  ) : (
                    <FaChevronDown className="text-gray-300" />
                  )}
                </button>

                {/* Answer */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                >
                  <div className="overflow-hidden px-6 pb-5">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ⬇ Scroll to footer button */}
      <button
        onClick={scrollToFooter}
        aria-label="Scroll to footer"
        className="
          absolute bottom-8 left-1/2 -translate-x-1/2
          w-14 h-14 rounded-full
          bg-white/20 backdrop-blur-md
          flex items-center justify-center
          hover:bg-white/30 transition
        "
      >
        <FaChevronDown className="text-white text-2xl animate-bounce" />
      </button>
    </section>
  );
}
