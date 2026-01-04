export default function BrandsMarquee() {
  const brands = [
    "Google",
    "Meta",
    "Amazon",
    "Netflix",
    "Apple",
    "Microsoft",
    "Adobe",
    "Spotify",
  ];

  return (
    <div className="relative left-1/2 right-1/2 -ml-[50vw] w-screen py-14 overflow-hidden bg-white">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      {/* TRACK */}
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {Array(4)
          .fill(null)
          .flatMap((_, setIndex) =>
            brands.map((brand, i) => (
              <span
                key={`${setIndex}-${i}`}
                className="text-black text-lg font-medium mx-10"
              >
                {brand}
              </span>
            ))
          )}
      </div>

      {/* Marquee animation */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          display: inline-flex;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
