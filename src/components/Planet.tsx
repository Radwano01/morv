import { useRef, useEffect, useImperativeHandle, forwardRef, useState } from "react";
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
  hideOnMobile?: boolean; // optional prop
}

const Planet = forwardRef<PlanetHandle, PlanetProps>(
  (
    { servicesRef, aboutUsRef, founderRef, feedbackRef, FAQRef, FooterRef, hideOnMobile = true },
    ref
  ) => {
    const wrapperRef = useRef<HTMLDivElement>(null); // 🌊 floating wrapper
    const imgRef = useRef<HTMLImageElement>(null);   // 🚀 planet image

    // -----------------------------
    // MOBILE STATE
    // -----------------------------
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 1025);
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);

    /* -----------------------------------
       IDLE ANIMATIONS
    ----------------------------------- */

    // 🌍 Rotation (planet image only)
    useEffect(() => {
      if (!imgRef.current) return;
      gsap.to(imgRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "linear",
      });
    }, []);

    // 🌊 Floating (wrapper only)
    useEffect(() => {
      if (!wrapperRef.current) return;
      gsap.to(wrapperRef.current, {
        y: "+=12",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, []);

    /* -----------------------------------
       SCROLL SECTIONS
    ----------------------------------- */

    // SERVICES → right
    useEffect((): (() => void) | void => {
      if (!imgRef.current || !servicesRef.current) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });
      tl.to(imgRef.current, { x: window.innerWidth * 0.25, scale: 0.8, ease: "none" });
      return () => tl.kill();
    }, [servicesRef]);

    // ABOUT US → left
    useEffect((): (() => void) | void => {
      if (!imgRef.current || !aboutUsRef.current) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutUsRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });
      tl.to(imgRef.current, { x: -window.innerWidth * 0.33, scale: 0.8, ease: "none" });
      return () => tl.kill();
    }, [aboutUsRef]);

    // FOUNDER → center
    useEffect((): (() => void) | void => {
      if (!imgRef.current || !founderRef?.current) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: founderRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });
      tl.to(imgRef.current, { x: 0, scale: 1, ease: "none" });
      return () => tl.kill();
    }, [founderRef]);

    // FEEDBACK → mid-left
    useEffect((): (() => void) | void => {
      if (!imgRef.current || !feedbackRef.current) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: feedbackRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });
      tl.to(imgRef.current, { x: -window.innerWidth * 0.5, scale: 0.8, ease: "none" });
      return () => tl.kill();
    }, [feedbackRef]);

    // FAQ → mid-right
    useEffect((): (() => void) | void => {
      if (!imgRef.current || !FAQRef.current) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: FAQRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });
      tl.to(imgRef.current, { x: window.innerWidth * 0.5, scale: 0.8, ease: "none" });
      return () => tl.kill();
    }, [FAQRef]);

    // FOOTER → fly UP + disappear
    useEffect((): (() => void) | void => {
      if (!imgRef.current || !FooterRef.current) return;
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
      return () => tl.kill();
    }, [FooterRef]);

    /* -----------------------------------
       IMPERATIVE API
    ----------------------------------- */
    useImperativeHandle(ref, () => ({
      flyInToServices() {
        gsap.to(imgRef.current, { x: window.innerWidth * 0.25, scale: 0.8, duration: 1, ease: "power3.out" });
      },
      resetPlanet() {
        gsap.set(imgRef.current, { x: 0, y: 0, scale: 1 });
      },
    }));

    /* -----------------------------------
       RENDER
    ----------------------------------- */

    // ⚠️ Conditional render **after hooks**
    if (hideOnMobile && isMobile) return <></>;

    return (
      <div ref={wrapperRef} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
        <img ref={imgRef} src={planetImage} alt="Planet" className="block w-[50vw]" />
      </div>
    );
  }
);

export default Planet;
