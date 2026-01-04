import { useState, useEffect } from "react";

export default function GalaxyClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    let animationFrame: number;

    const update = () => {
      setNow(new Date()); // Always set real system time
      animationFrame = requestAnimationFrame(update); // loop forever
    };

    animationFrame = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Compute angles
  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();

  const hoursDeg = hours * 30 + minutes * 0.5;
  const minutesDeg = minutes * 6 + seconds * 0.1;
  const secondsDeg = seconds * 6 + milliseconds * 0.006;

  const formattedDate = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="relative w-72 h-72 flex items-center justify-center">
        {/* Clock face */}
        <div
          className="relative w-full h-full rounded-full flex items-center justify-center
                     bg-black/40 backdrop-blur-xl border-4 border-cyan-400 shadow-[0_0_50px_rgba(0,255,255,0.3)]"
        >
          {/* Center dot */}
          <div className="absolute w-4 h-4 bg-white rounded-full z-20 shadow-[0_0_15px_rgba(255,255,255,0.9)]" />

          {/* Numeric time */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-6 text-white text-sm font-mono z-20">
            {((now.getHours() % 12) || 12).toString().padStart(2, "0")}:
            {now.getMinutes().toString().padStart(2, "0")}:
            {now.getSeconds().toString().padStart(2, "0")}{" "}
            {now.getHours() >= 12 ? "PM" : "AM"}
          </div>

          {/* Hour hand */}
          <div
            className="absolute w-2 h-20 bg-white rounded origin-bottom shadow-[0_0_25px_cyan]"
            style={{
              transform: `translateX(-50%) rotate(${hoursDeg}deg)`,
              left: "50%",
              bottom: "50%",
            }}
          />

          {/* Minute hand */}
          <div
            className="absolute w-1.5 h-28 bg-cyan-400 rounded origin-bottom shadow-[0_0_30px_cyan]"
            style={{
              transform: `translateX(-50%) rotate(${minutesDeg}deg)`,
              left: "50%",
              bottom: "50%",
            }}
          />

          {/* Seconds hand */}
          <div
            className="absolute w-1 h-32 bg-purple-500 rounded origin-bottom shadow-[0_0_35px_purple]"
            style={{
              transform: `translateX(-50%) rotate(${secondsDeg}deg)`,
              left: "50%",
              bottom: "50%",
            }}
          />
        </div>

        {/* Date below clock */}
        <div className="absolute bottom-[-2.5rem] text-center">
          <p className="text-gray-300 text-lg font-mono">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
}
