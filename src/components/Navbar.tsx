import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import "../css/Navbar.css";

// Import the services JSON
import servicesData from "../data/services.json";

export default function Navbar() {

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [servicesOpen, setServicesOpen] = useState<boolean>(false);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  /* ===============================
     SCROLL STATE
  ================================ */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ===============================
     NAVIGATION (HOME SECTIONS)
  ================================ */
  type NavigateOptions = { closeDropdown?: boolean };

  const navigateToSection = (sectionId: string, options: NavigateOptions = {}) => {
    const { closeDropdown = true } = options;

    const scroll = () => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scroll, 100);
    } else {
      scroll();
    }

    if (closeDropdown) handleCloseDropdown();
  };

  /* ===============================
     DROPDOWN CONTROLS
  ================================ */
  const handleOpenDropdown = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesOpen(true);
    setDropdownVisible(true);
  };

  const handleCloseDropdown = () => {
    setDropdownVisible(false);
    timeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 250);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[99] transition-all duration-300 ${
        isScrolled ? "bg-black/30 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* LOGO */}
        <div className="logo-flip-wrapper cursor-pointer" onClick={() => navigateToSection("top")}>
          <div className="logo-flip-inner">
            <img src={logo1} alt="Logo front" className="logo-face logo-front" />
            <img src={logo2} alt="Logo back" className="logo-face logo-back" />
          </div>
        </div>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6">
          {/* SERVICES DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={handleOpenDropdown}
            onMouseLeave={handleCloseDropdown}
          >
            {/* SERVICES BUTTON */}
            <button
              onClick={() => navigateToSection("services", { closeDropdown: false })}
              className="nav-link services-button"
            >
              SERVICES
              <span className="services-underline"></span>
            </button>

            {servicesOpen && (
              <div
                className={`absolute left-1/2 top-full mt-4 -translate-x-1/2 z-50 transition-opacity duration-250 ${
                  dropdownVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="w-[720px] rounded-xl bg-black/90 border border-white/10 shadow-2xl text-white animate-services-menu">
                  {/* HEADER */}
                  <div className="border-b border-white/10 px-6 py-4 text-center">
                    <h3 className="text-sm tracking-widest uppercase text-white/80">
                      Services
                    </h3>
                  </div>

                  {/* CONTENT */}
                  <div className="grid grid-cols-3 gap-10 px-8 py-8 text-sm justify-items-center">
                    {/** Split services into 3 roughly equal columns */}
                    {Array.from({ length: 3 }).map((_, colIdx) => (
                      <ul key={colIdx} className="space-y-4 text-center">
                        {servicesData
                          .filter((_, idx) => idx % 3 === colIdx)
                          .map((service) => (
                            <li
                              key={service.id}
                              onClick={() => navigate(`/service/${service.id}`)}
                              className={`hover:text-white transition cursor-pointer ${
                                colIdx % 2 === 0 ? "animate-option-left" : "animate-option-right"
                              }`}
                            >
                              {service.title}
                            </li>
                          ))}
                      </ul>
                    ))}
                  </div>

                  {/* FOOTER */}
                  <div className="border-t border-white/10 px-6 py-3 text-center">
                    <button
                      onClick={handleCloseDropdown}
                      className="text-xs text-white/60 hover:text-white transition"
                    >
                      Minimize
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ABOUT */}
          <button onClick={() => navigateToSection("AboutUs")} className="nav-link">
            ABOUT US
          </button>

          {/* CONTACT */}
          <button className="contact-btn" onClick={() => navigate("/contact")}>
            <span>CONTACT</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
