"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !stickyRef.current || !bgRef.current) return;

    // Reset states
    gsap.set(glassRef.current, { opacity: 0, scale: 0.9 });
    
    // The ball in the image is roughly at X: 80%, Y: 55%
    gsap.set(bgRef.current, { transformOrigin: "80% 55%" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    // --- 0% to 40%: Slow cinematic parallax / breathing ---
    tl.to(bgRef.current, { 
      scale: 1.1, 
      ease: "none", 
      duration: 0.4 
    }, 0);

    // --- 40% to 90%: Ball launches at camera ---
    // We scale the entire image massively originating from the ball's center
    tl.to(bgRef.current, {
      scale: 20,
      filter: "blur(2px)",
      ease: "power2.in",
      duration: 0.5
    }, 0.4);

    // --- 90% to 100%: Glass Impact ---
    // Glass shatter appears
    tl.to(glassRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.02,
      ease: "steps(1)"
    }, 0.95);

    // Violent camera shake on the wrapper
    tl.to(stickyRef.current, {
      x: () => Math.random() * 30 - 15,
      y: () => Math.random() * 30 - 15,
      duration: 0.05,
      yoyo: true,
      repeat: 5,
      ease: "power1.inOut"
    }, 0.95);

    // Fade to next section
    tl.to(stickyRef.current, { opacity: 0, duration: 0.05 }, 0.98);

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-[#0A0F24]">
      
      {/* Pinned container */}
      <div 
        ref={stickyRef} 
        className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center perspective-[1000px]"
      >
        
        {/* Stadium & Player Background */}
        <div 
          ref={bgRef}
          className="absolute inset-0 z-0 w-full h-full transform"
        >
          <Image 
            src="/bc.png" 
            alt="World Cup Player Kicking" 
            fill 
            className="object-cover opacity-90"
            priority
          />
          {/* Night HDR Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F24] via-transparent to-black/50 pointer-events-none" />
        </div>

        {/* Floating Dust Particles */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-40 mix-blend-screen">
          <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-pulse" />
        </div>

        {/* Glass Crack Effect */}
        <div 
          ref={glassRef}
          className="absolute inset-0 z-50 pointer-events-none opacity-0 flex items-center justify-center mix-blend-screen"
        >
          <svg viewBox="0 0 100 100" className="w-[120vw] h-[120vh] text-white opacity-90 drop-shadow-[0_0_20px_rgba(255,255,255,1)]" fill="none" stroke="currentColor" strokeWidth="0.3">
            <path d="M50 50 L0 0 M50 50 L100 0 M50 50 L0 100 M50 50 L100 100" strokeWidth="0.8"/>
            <path d="M50 50 L20 10 M50 50 L80 15 M50 50 L10 40 M50 50 L90 45 M50 50 L15 80 M50 50 L85 85 M50 50 L40 90"/>
            <path d="M45 45 L55 55 M55 45 L45 55" strokeWidth="1"/>
            <circle cx="50" cy="50" r="8" fill="rgba(255,255,255,0.4)" stroke="none" />
            <path d="M30 30 Q 50 10 70 30 M10 50 Q 50 20 90 50 M30 70 Q 50 90 70 70" strokeDasharray="1,1"/>
          </svg>
        </div>

      </div>
    </div>
  );
}
