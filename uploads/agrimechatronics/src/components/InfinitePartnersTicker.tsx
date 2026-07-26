import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  useAnimationFrame,
  useMotionValue
} from "motion/react";

export default function InfinitePartnersTicker() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Monitor the page's vertical scroll positioning to calculate scroll velocity
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Smooth out the scroll velocity to produce elegant transitions when user stops scrolling
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  // Calculate high-magnitude velocity factor mapped into speed modification coefficients
  // Positive velocity (scrolling down) fast-forwards the ticker, making it go faster
  // Negative velocity (scrolling up) reverses the movement
  const velocityFactor = useTransform(smoothVelocity, [-8000, 8000], [-10, 10], {
    clamp: false,
  });

  // Base progress variable as horizontal scroll percentage
  const baseX = useMotionValue(0);

  // Use animation frames to update positions according to both standard speed and scroll velocity
  useAnimationFrame((time, delta) => {
    // Steady ambient autoplay speed (in percent per update step)
    const baseSpeed = 0.05; 
    
    // Scale and add velocity multiplier
    const acceleration = velocityFactor.get() * 0.12;
    
    // Combine base movement and scroll-driven momentum
    const moveBy = baseSpeed + acceleration;

    // Shift leftwards as baseline movement
    const nextX = baseX.get() - moveBy;

    // Wrap position between -20% and 0% for seamless looping of 5 arrays
    const wrapMin = -20;
    const wrapMax = 0;
    const range = wrapMax - wrapMin;
    
    let wrappedX = nextX;
    if (nextX < wrapMin) {
      wrappedX = wrapMax + ((nextX - wrapMin) % range);
    } else if (nextX > wrapMax) {
      wrappedX = wrapMin + (nextX % range);
    }

    baseX.set(wrappedX);
  });

  // Turn percent values into standard translate style strings
  const xTransform = useTransform(baseX, (v) => `${v}%`);

  const partnerList = [
    "Aeon Aerospace",
    "Vela Precision",
    "Apex Automation",
    "Orbit Dynamics",
    "Zeno Controls",
  ];

  // Repeat the core partners array 5 times to form a flawless wrapping cycle
  const repeatedPartners = [
    ...partnerList,
    ...partnerList,
    ...partnerList,
    ...partnerList,
    ...partnerList,
  ];

  return (
    <div className="w-full mt-16 flex flex-col items-center gap-6 overflow-hidden">
      <span className="text-[11px] font-semibold uppercase tracking-widest text-[#a855f7] font-mono leading-none">
        GLOBAL RESEARCH COLLABORATION PARTNERS
      </span>
      
      {/* Scroll-accelerated glass ribbon container */}
      <div 
        ref={containerRef}
        className="w-full relative py-6 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent border-y border-white/5 backdrop-blur-[1.5px] overflow-hidden select-none"
      >
        {/* Soft atmospheric radial edges to fade the boundaries out cinematically */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-48 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

        {/* Scrolling horizontal ribbon */}
        <motion.div 
          style={{ x: xTransform }} 
          className="flex whitespace-nowrap gap-16 md:gap-24 w-[500%] items-center"
        >
          {repeatedPartners.map((partner, index) => (
            <div
              key={`${partner}-${index}`}
              className="flex items-center gap-3.5 group cursor-pointer"
            >
              {/* Little glowing mechatronics dot separator */}
              <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7]/50 group-hover:bg-[#a855f7] group-hover:scale-130 transition-all duration-300 ring-4 ring-purple-500/10" />
              
              <span className="font-heading italic text-xl md:text-2xl text-white/70 tracking-tight group-hover:text-white transition-all duration-300 hover:scale-102">
                {partner}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Aesthetic feedback line */}
      <div className="flex items-center gap-1.5">
        <span className="text-[8px] font-mono tracking-widest text-white/30 uppercase">
          susceptible to scroll momentum
        </span>
        <span className="w-1 h-1 rounded-full bg-[#a855f7]/40 animate-ping" />
      </div>
    </div>
  );
}
