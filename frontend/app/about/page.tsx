"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, Globe, Rocket } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16 min-h-[calc(100vh-80px)]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About FAN MATE AI</h1>
        <p className="text-xl text-gray-400 mb-12 leading-relaxed">
          FAN MATE AI is a premium, AI-powered smart stadium companion designed specifically 
          for football fans attending the FIFA World Cup 2026. Our goal is to provide a seamless, 
          accessible, and intelligent experience from the moment you step into the stadium.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="card-glass p-8 rounded-2xl border-t-4 border-[var(--color-primary)]">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Cpu className="text-[var(--color-primary)]" /> Core Features
            </h2>
            <ul className="space-y-3 text-gray-300">
              <li>• Interactive Stadium Maps</li>
              <li>• Real-time Crowd Intelligence</li>
              <li>• Live Match Dashboards</li>
              <li>• Multilingual AI Assistant</li>
              <li>• Accessibility routing</li>
            </ul>
          </div>
          
          <div className="card-glass p-8 rounded-2xl border-t-4 border-[var(--color-secondary)]">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Code2 className="text-[var(--color-secondary)]" /> Technology Stack
            </h2>
            <ul className="space-y-3 text-gray-300">
              <li>• Frontend: Next.js, React, Tailwind CSS</li>
              <li>• Animations: Framer Motion</li>
              <li>• Backend: Python, FastAPI</li>
              <li>• Map integration: Leaflet</li>
              <li>• Artificial Intelligence: OpenAI API</li>
            </ul>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-6">Future Scope</h2>
        <div className="bg-white/5 rounded-2xl p-8 mb-16 border border-white/10">
          <p className="text-gray-300 leading-relaxed mb-6">
            The platform is designed to scale dynamically. In the future, we plan to integrate 
            with official FIFA ticketing APIs, live broadcast feeds, and augmented reality (AR) 
            stadium navigation to guide fans to their seats through their phone camera.
          </p>
          <div className="flex items-center gap-4 text-[var(--color-accent)] font-semibold">
            <Rocket className="w-5 h-5" />
            Preparing for 2026
          </div>
        </div>

        <div className="flex justify-center border-t border-[var(--color-border-subtle)] pt-12">
          <a 
            href="https://github.com/vaibhav9250" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[var(--color-card)] hover:bg-white/10 border border-[var(--color-border-subtle)] text-white px-6 py-3 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            View GitHub Repository
          </a>
        </div>
      </motion.div>
    </div>
  );
}
