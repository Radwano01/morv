import { useRef } from "react";
import Homepage from "./Homepage";
import Services from "./Services";
import AboutUs from "./AboutUs";
import Planet from "../components/Planet";
import type { PlanetHandle } from "../components/Planet";
import StoryScroll from "../components/StoryScroll";
import Founder from "./Founder";
import Feedback from "./Feedback";
import FAQ from "./FAQ";
import BrandsMarquee from "../components/BrandsMarquee";
import Footer from "../components/Footer";

export default function MainPage() {
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutUsRef = useRef<HTMLDivElement>(null);
  const planetRef = useRef<PlanetHandle | null>(null);
  const founderRef = useRef<HTMLDivElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const FAQRef = useRef<HTMLDivElement>(null);
  const FooterRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full overflow-x-hidden">
      <StoryScroll />

      {/* Homepage */}
      <section id="top">
        <Homepage />
      </section>

      {/* Services Section */}
      <section ref={servicesRef} id="services">
        <Services />
      </section>

      {/* About Us Section */}
      <section ref={aboutUsRef} id="AboutUs">
        <AboutUs />
      </section>

      {/* Founder Section */}
      <section ref={founderRef} id="Founder">
        <Founder />
      </section>

      {/* Feedback Section */}
      <section ref={feedbackRef} id="Feedback">
        <Feedback />
      </section>

      {/* Brand Section */}
      <section id="Brand" >
        <BrandsMarquee />
      </section>

      {/* FAQ Section */}
      <section ref={FAQRef} id="FAQ">
        <FAQ />
      </section>

      {/* Footer */}
      <section ref={FooterRef} id="footer" className="w-screen h-auto">
        <Footer />
      </section>

      {/* Services Planet */}
      <Planet
        ref={planetRef}
        servicesRef={servicesRef}
        aboutUsRef={aboutUsRef}
        founderRef={founderRef}
        feedbackRef={feedbackRef}
        FAQRef={FAQRef}
        FooterRef={FooterRef}
      />
    </div>
  );
}
