"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CloudRain, Users, Utensils, Bus, Clock, Bot, RefreshCw } from "lucide-react";

interface DashboardData {
  weather?: { temp: string; condition: string };
  crowd?: { level: number; status: string };
  food?: { shortest_queue: string; time_mins: number };
  transport?: { metro: string; taxi: string; bus: string };
  countdown?: { minutes: number };
  ai_recommendation?: string;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/stadium/dashboard");
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error(e);
      // Fallback mock data if backend not running
      setData({
        weather: { temp: "24°C", condition: "Clear" },
        crowd: { level: 75, status: "Busy" },
        food: { shortest_queue: "Food Court C", time_mins: 5 },
        transport: { metro: "Normal", taxi: "Heavy Traffic", bus: "Delayed" },
        countdown: { minutes: 18 },
        ai_recommendation: "Avoid Gate A. Use Food Court C. Metro is fastest."
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => fetchData(), 0);
    const interval = setInterval(fetchData, 10000); // Refresh every 10s
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 }
    })
  };

  if (loading && !data) {
    return (
      <div className="flex h-screen items-center justify-center w-full">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
          <RefreshCw className="w-10 h-10 text-[var(--color-primary)]" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Live Dashboard</h1>
          <p className="text-gray-400">Real-time stadium intelligence</p>
        </div>
        <button onClick={fetchData} className="flex items-center gap-2 text-sm bg-white/5 px-4 py-2 rounded-full hover:bg-white/10 transition-colors">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Weather Card */}
        <motion.div custom={0} initial="hidden" animate="visible" variants={cardVariants} whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }} className="card-glass p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)] opacity-10 blur-[50px] group-hover:opacity-20 transition-opacity" />
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-300">Weather</h2>
            <CloudRain className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-4xl font-bold text-white">{data?.weather?.temp}</div>
          <p className="text-sm text-gray-400">{data?.weather?.condition}</p>
        </motion.div>

        {/* Crowd Level */}
        <motion.div custom={1} initial="hidden" animate="visible" variants={cardVariants} whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }} className="card-glass p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-danger)] opacity-10 blur-[50px] group-hover:opacity-20 transition-opacity" />
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-300">Crowd Level</h2>
            <Users className="w-6 h-6 text-red-400" />
          </div>
          <div className="text-3xl font-bold text-white">{data?.crowd?.status}</div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: `${data?.crowd?.level}%` }} 
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-red-500 h-full rounded-full"
            />
          </div>
        </motion.div>

        {/* Countdown */}
        <motion.div custom={2} initial="hidden" animate="visible" variants={cardVariants} whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }} className="card-glass p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-secondary)] opacity-10 blur-[50px] group-hover:opacity-20 transition-opacity" />
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-300">Match Starts In</h2>
            <Clock className="w-6 h-6 text-[var(--color-secondary)]" />
          </div>
          <div className="text-5xl font-bold text-white flex items-end gap-2">
            {data?.countdown?.minutes} <span className="text-lg text-gray-400 font-normal mb-2">mins</span>
          </div>
        </motion.div>

        {/* Food */}
        <motion.div custom={3} initial="hidden" animate="visible" variants={cardVariants} whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }} className="card-glass p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent)] opacity-10 blur-[50px] group-hover:opacity-20 transition-opacity" />
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-300">Food Queue</h2>
            <Utensils className="w-6 h-6 text-[var(--color-accent)]" />
          </div>
          <div className="text-2xl font-bold text-white">{data?.food?.shortest_queue}</div>
          <p className="text-sm text-gray-400">Current Wait: <span className="text-[var(--color-accent)] font-semibold">{data?.food?.time_mins} mins</span></p>
        </motion.div>

        {/* Transport */}
        <motion.div custom={4} initial="hidden" animate="visible" variants={cardVariants} whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }} className="card-glass p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 opacity-10 blur-[50px] group-hover:opacity-20 transition-opacity" />
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-300">Transport</h2>
            <Bus className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-gray-400">Metro</span><span className="text-[var(--color-secondary)]">{data?.transport?.metro}</span></div>
            <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-gray-400">Taxi</span><span className="text-red-400">{data?.transport?.taxi}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Bus</span><span className="text-[var(--color-warning)]">{data?.transport?.bus}</span></div>
          </div>
        </motion.div>

        {/* AI Recommendation */}
        <motion.div custom={5} initial="hidden" animate="visible" variants={cardVariants} whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }} className="card-glass p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden group border-[var(--color-primary)]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)] opacity-20 blur-[50px] group-hover:opacity-30 transition-opacity" />
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-300">AI Recommendation</h2>
            <Bot className="w-6 h-6 text-[var(--color-primary)]" />
          </div>
          <div className="text-lg font-medium text-white leading-relaxed">
            &quot;{data?.ai_recommendation}&quot;
          </div>
        </motion.div>

      </div>
    </div>
  );
}
