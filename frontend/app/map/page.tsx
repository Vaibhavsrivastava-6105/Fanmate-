"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const MapWithNoSSR = dynamic(() => import("@/components/StadiumMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[var(--color-card)] rounded-2xl border border-[var(--color-border-subtle)]">
      <div className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
});

export default function MapPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 h-[calc(100vh-80px)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Stadium Map</h1>
        <p className="text-gray-400">Interactive map powered by live stadium data</p>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow w-full relative"
      >
        <MapWithNoSSR />
      </motion.div>
    </div>
  );
}
