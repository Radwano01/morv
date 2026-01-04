import { useEffect } from "react";
import ProfessionalCalendar from "../components/ProfessionalCalendar";
import GalaxyClock from "../components/GalaxyClock";
import Footer from "../components/Footer";

export default function Contact() {

  useEffect(() => {
    window.scrollTo(0, 0);

  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <section className="flex-1 flex flex-col md:flex-row gap-10 p-10 justify-center items-center overflow-hidden">

        {/* Calendar */}
        <div className="flex-1 flex justify-center z-20">
          <ProfessionalCalendar />
        </div>

        {/* Clock */}
        <div className="flex-1 flex justify-center items-center h-[600px] z-20">
          <GalaxyClock />
        </div>

      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
