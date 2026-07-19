"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Globe, Bell, User } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "AI Assistant", href: "/assistant" },
    { name: "Stadium Map", href: "/map" },
    { name: "About", href: "/about" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 w-full z-50 bg-glass text-[var(--color-foreground)] transition-all duration-300"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left Section - Logo */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="Go to FAN MATE AI Homepage">
          <div className="w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white group-hover:rotate-12 transition-transform duration-300 shadow-[0_0_15px_rgba(0,102,255,0.3)]">
            <span className="font-bold text-lg">FM</span>
          </div>
          <div>
            <h1 className="font-bold text-xl leading-tight">FAN MATE AI</h1>
            <p className="text-xs text-slate-500">FIFA World Cup 2026</p>
          </div>
        </Link>

        {/* Center Section - Nav Links */}
        <nav className="hidden md:flex gap-6" aria-label="Desktop Navigation">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-2 py-1 text-sm font-medium transition-colors hover:text-[var(--color-primary)] ${
                  isActive ? "text-[var(--color-primary)]" : "text-slate-600"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-[var(--color-primary)] rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Section - Icons */}
        <div className="flex items-center gap-4 text-slate-600">
          <button aria-label="Search" className="p-2 hover:bg-slate-100 rounded-full transition-colors group">
            <Search className="w-5 h-5 group-hover:text-[var(--color-primary)] transition-colors" />
          </button>
          <button aria-label="Change Language" className="p-2 hover:bg-slate-100 rounded-full transition-colors group">
            <Globe className="w-5 h-5 group-hover:text-[var(--color-primary)] transition-colors" />
          </button>
          <button aria-label="Notifications" className="relative p-2 hover:bg-slate-100 rounded-full transition-colors group">
            <Bell className="w-5 h-5 group-hover:text-[var(--color-primary)] transition-colors" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--color-danger)] rounded-full animate-pulse"></span>
          </button>
          <button aria-label="User Profile" className="p-2 hover:bg-slate-100 rounded-full transition-colors group">
            <User className="w-5 h-5 group-hover:text-[var(--color-primary)] transition-colors" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
