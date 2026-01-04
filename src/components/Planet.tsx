import { useRef, useEffect, useLayoutEffect, useImperativeHandle, forwardRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import planetImage from "../assets/white_planet.png";

gsap.registerPlugin(ScrollTrigger);

export interface PlanetHandle {
  flyInToServices: () => void;
  resetPlanet: () => void;
}

interface PlanetProps {
  servicesRef: React.RefObject<HTMLDivElement | null>;
  aboutUsRef: React.RefObject<HTMLDivElement | null>;
  founderRef?: React.RefObject<HTMLDivElement | null>;
  feedbackRef: React.RefObject<HTMLDivElement | null>;
  FAQRef: React.RefObject<HTMLDivElement | null>;
  FooterRef: React.RefObject<HTMLDivElement | null>;
  hideOnMobile?: boolean;
}

const Planet = forwardRef<PlanetHandle, PlanetProps>(
  ({ servicesRef, aboutUsRef, founderRef, feedbackRef, FAQRef, FooterRef, hideOnMobile = true }, ref) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    // ---------- MOBILE STATE ----------
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 1025);
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const shouldRender = !(hideOnMobile && isMobile);

    // ---------- FLOAT & ROTATE ----------
    useLayoutEffect(() => {
      if (!imgRef.current) return;

      // Rotation
      gsap.to(imgRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "linear",
      });

      // Floating wrapper
      if (wrapperRef.current) {
        gsap.to(wrapperRef.current, {
          y: "+=12",
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, []);

    // ---------- SCROLL ANIMATIONS ----------
    useLayoutEffect(() => {
      if (!imgRef.current) return;
      const timelines: gsap.core.Timeline[] = [];

      if (servicesRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
        tl.to(imgRef.current, { x: window.innerWidth * 0.25, scale: 0.8, ease: "none" });
        timelines.push(tl);
      }

      if (aboutUsRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: aboutUsRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
        tl.to(imgRef.current, { x: -window.innerWidth * 0.33, scale: 0.8, ease: "none" });
        timelines.push(tl);
      }

      if (founderRef?.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: founderRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
        tl.to(imgRef.current, { x: 0, scale: 1, ease: "none" });
        timelines.push(tl);
      }

      if (feedbackRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: feedbackRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
        tl.to(imgRef.current, { x: -window.innerWidth * 0.5, scale: 0.8, ease: "none" });
        timelines.push(tl);
      }

      if (FAQRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: FAQRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
        tl.to(imgRef.current, { x: window.innerWidth * 0.5, scale: 0.8, ease: "none" });
        timelines.push(tl);
      }

      if (FooterRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: FooterRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        tl.to(imgRef.current, { x: window.innerWidth * 0.5, y: -window.innerHeight * 1, ease: "none" });
        timelines.push(tl);
      }

      return () => timelines.forEach((tl) => tl.kill());
    }, [servicesRef, aboutUsRef, founderRef, feedbackRef, FAQRef, FooterRef]);

    // ---------- IMPERATIVE HANDLE ----------
    useImperativeHandle(ref, () => ({
      flyInToServices() {
        gsap.to(imgRef.current, {
          x: window.innerWidth * 0.25,
          scale: 0.8,
          duration: 1,
          ease: "power3.out",
        });
      },
      resetPlanet() {
        gsap.set(imgRef.current, { x: 0, y: 0, scale: 1 });
      },
    }));

    // ---------- FIX FOR DEPLOYMENT ----------
    useEffect(() => {
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      window.addEventListener("resize", refresh);
      return () => {
        window.removeEventListener("load", refresh);
        window.removeEventListener("resize", refresh);
      };
    }, []);

    // ---------- RENDER ----------
    return (
      <>
        {shouldRender && (
          <div
            ref={wrapperRef}
            className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-10 flex items-center justify-center"
          >
            <img ref={imgRef} src={planetImage} alt="Planet" className="w-[50vw]" />
          </div>
        )}
      </>
    );
  }
);

export default Planet;
