"use client";

/**
 * @feature Logical decision making based on user context
 * @persona Sports & Entertainment (Fan Experience)
 * @description The Landing Page leverages AI navigation and live crowd intelligence.
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { Map, Users, Utensils, Bus, Accessibility, Shield, Bell, Languages } from "lucide-react";
import { useEffect, useState } from "react";
import HeroAnimation from "@/components/HeroAnimation";

const TICKER_ITEMS = [
  "🏆 Argentina vs Brazil",
  "⚽ Kickoff in 18 Minutes",
  "🍔 Food Court C Queue 6 Minutes",
  "🚇 Metro Running Normally",
  "🌦 Weather 23°C",
  "🚪 Gate B Less Crowded",
  "♿ Accessible Route Available"
];

const FEATURES = [
  { icon: <Map />, title: "AI Navigation", desc: "Find the fastest route to your seat." },
  { icon: <Users />, title: "Live Crowd Intelligence", desc: "Avoid congestion using AI." },
  { icon: <Utensils />, title: "Food Recommendations", desc: "Find nearby food with the shortest queues." },
  { icon: <Bus />, title: "Transport Assistant", desc: "AI suggests the fastest route home." },
  { icon: <Accessibility />, title: "Accessibility", desc: "Wheelchair-friendly routes." },
  { icon: <Shield />, title: "Emergency Assistance", desc: "Instant AI emergency support." },
  { icon: <Bell />, title: "Live Notifications", desc: "Receive stadium updates instantly." },
  { icon: <Languages />, title: "Multilingual AI", desc: "Speak in your preferred language." },
];

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <main className="flex flex-col w-full overflow-x-clip bg-[var(--color-background)] relative">
      
      {/* GSAP HERO SECTION */}
      <HeroAnimation />

      {/* TICKER SECTION */}
      <section className="w-full bg-white border-y border-[var(--color-border-subtle)] py-4 overflow-hidden relative z-20 shadow-sm">
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite] hover:[animation-play-state:paused]">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="mx-8 text-sm md:text-base font-semibold text-slate-700">
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* FEATURES SECTION (Staggered layout for ball bouncing effect) */}
      <section className="w-full max-w-7xl mx-auto px-4 py-32 z-10">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 text-slate-900"
          >
            Everything You Need Inside The Stadium
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-lg"
          >
            Powered by Artificial Intelligence
          </motion.p>
        </div>

        <div className="flex flex-col gap-24 relative">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-100px", once: true }}
              transition={{ duration: 0.6, type: "spring" }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`card-glass p-8 rounded-2xl flex flex-col items-start gap-4 cursor-pointer w-full md:w-1/2 ${i % 2 === 0 ? "self-start" : "self-end"}`}
            >
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-[var(--color-primary)] shadow-inner">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{feature.title}</h3>
              <p className="text-slate-500 text-base leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FINAL CTA (The Goal) */}
      <section className="w-full relative py-40 overflow-hidden flex flex-col items-center text-center z-10 bg-white border-t border-[var(--color-border-subtle)]">
        {/* Goal Net Graphic */}
        <div className="absolute top-10 w-[300px] h-[150px] border-4 border-slate-300 rounded-t-lg opacity-30 flex items-end justify-center pointer-events-none">
          {/* Netting Pattern */}
          <div className="w-full h-full bg-[radial-gradient(#CBD5E1_2px,transparent_2px)] [background-size:16px_16px]" />
        </div>

        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 z-10 mt-10"
        >
          Ready For Match Day?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-600 mb-10 z-10"
        >
          Join thousands of fans using AI for a seamless experience.
        </motion.p>
        <Link href="/dashboard" className="z-20">
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(0,180,216,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-[var(--color-secondary)] text-white px-10 py-5 rounded-full font-bold text-xl transition-colors hover:bg-cyan-500"
            aria-label="Launch FAN MATE AI Assistant"
          >
            Launch FAN MATE AI
          </motion.button>
        </Link>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </main>
  );
}
