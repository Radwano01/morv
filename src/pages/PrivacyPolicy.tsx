import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../css/ScrollBar.css";
import { gsap } from "gsap";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  // Refs for animation
  const cardRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const dateRef = useRef<HTMLParagraphElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.scrollTo(70, 70);

    if (cardRef.current && titleRef.current && dateRef.current && contentRef.current) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(cardRef.current, { opacity: 0, y: 50, duration: 0.8 })
        .from(titleRef.current, { opacity: 0, y: 20, duration: 0.6 }, "-=0.5")
        .from(dateRef.current, { opacity: 0, y: 20, duration: 0.6 }, "-=0.5")
        .from(contentRef.current, { opacity: 0, y: 20, duration: 0.6 }, "-=0.5");
    }
  }, []);

  const sections = [
    {
      title: "Introduction",
      content:
        "Welcome to [Your Company Name]. We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines the types of information we collect, how we use it, and your rights.",
    },
    {
      title: "Information We Collect",
      content:
        "We may collect the following types of information: name, email address, phone number, payment information, and usage data. All information is collected in accordance with applicable laws and with your consent.",
    },
    {
      title: "How We Use Your Information",
      list: [
        "To provide and improve our services",
        "To communicate with you about updates and promotions",
        "To personalize your experience on our website",
        "To ensure security and prevent fraud",
      ],
    },
    {
      title: "Cookies",
      content:
        "Our website uses cookies and similar tracking technologies to enhance your experience. You can manage your cookie preferences in your browser settings.",
    },
    {
      title: "Third-Party Services",
      content:
        "We may share your information with trusted third-party partners for analytics, marketing, or operational purposes. These third parties are required to follow similar privacy standards.",
    },
    {
      title: "Data Security",
      content:
        "We implement reasonable administrative, technical, and physical safeguards to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet is 100% secure.",
    },
    {
      title: "Your Rights",
      content:
        "You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at ",
      link: "support@yourcompany.com",
    },
    {
      title: "Changes to This Policy",
      content:
        "We may update this Privacy Policy periodically. Changes will be posted on this page with the effective date updated.",
    },
    {
      title: "Contact Us",
      content:
        "For questions regarding this Privacy Policy, please contact us at ",
      link: "support@yourcompany.com",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <section className="w-full py-20 px-4 sm:px-6 md:px-20 flex flex-col items-center">
        {/* Back Button */}
        <div className="w-full max-w-4xl flex justify-start mb-6">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition duration-300 flex items-center gap-2"
          >
            &larr; Back
          </button>
        </div>

        {/* Card */}
        <div
          ref={cardRef}
          className="bg-gray-900 rounded-3xl shadow-2xl w-full max-w-4xl p-10 sm:p-14 flex flex-col gap-10 border border-cyan-600/20"
        >
          {/* Title */}
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl font-bold text-[#00caeb] text-center"
          >
            Privacy Policy
          </h1>
          <p
            ref={dateRef}
            className="text-gray-400 text-sm text-center"
          >
            Last updated: January 4, 2026
          </p>

          {/* Scrollable Content */}
          <div
            ref={contentRef}
            className="text-gray-300 space-y-8 max-h-[650px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-cyan-600 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full hover:scrollbar-thumb-cyan-400 transition-colors duration-300"
          >
            {sections.map((section, idx) => (
              <section key={idx} className="space-y-2">
                <h2 className="text-2xl font-semibold text-[#00caeb]">
                  {section.title}
                </h2>
                {section.list ? (
                  <ul className="list-disc list-inside space-y-1 text-gray-300">
                    {section.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-300">
                    {section.content}
                    {section.link && (
                      <span className="text-[#00caeb] cursor-pointer hover:underline">
                        {section.link}
                      </span>
                    )}
                  </p>
                )}
              </section>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
