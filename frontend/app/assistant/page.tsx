"use client";

/**
 * @feature Ability to build a smart, dynamic assistant
 * @persona Sports & Entertainment (Fan Experience)
 * @description The AI Assistant helps fans navigate the stadium and make logical decisions based on context.
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Trash2 } from "lucide-react";

interface Message {
  role: "user" | "ai";
  content: string;
}

const SUGGESTIONS = [
  "Where is my seat?",
  "Best food nearby?",
  "Fastest exit?",
  "Nearest washroom?",
  "Accessible route?",
  "Translate announcement"
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Welcome! I'm FAN MATE AI. Ask me anything about your stadium experience." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;
    
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await res.json();
      
      setMessages((prev) => [...prev, { role: "ai", content: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "ai", content: "Sorry, I couldn't connect to the server." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] w-full max-w-7xl mx-auto px-4 py-6 gap-6">
      
      {/* LEFT: SUGGESTIONS */}
      <div className="hidden md:flex flex-col w-1/4 gap-4">
        <div className="bg-[var(--color-card)] rounded-2xl p-6 border border-[var(--color-border-subtle)] h-full">
          <h2 className="text-xl font-bold text-white mb-6">Suggested Prompts</h2>
          <div className="flex flex-col gap-3">
            {SUGGESTIONS.map((s, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.02, x: 5, backgroundColor: "rgba(255,255,255,0.05)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSend(s)}
                className="text-left px-4 py-3 rounded-xl border border-[var(--color-border-subtle)] text-sm text-gray-300 transition-colors"
              >
                {s}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* CENTER: CHAT */}
      <div className="flex flex-col w-full md:w-3/4 bg-[var(--color-card)] rounded-2xl border border-[var(--color-border-subtle)] shadow-[0_0_40px_rgba(0,0,0,0.2)] overflow-hidden relative">
        
        {/* Chat Header */}
        <div className="h-16 border-b border-[var(--color-border-subtle)] flex items-center justify-between px-6 bg-[var(--color-card)] z-10">
          <div>
            <h2 className="font-bold text-white">FAN MATE AI Assistant</h2>
            <p className="text-xs text-[var(--color-secondary)]">Online • Smart Stadium AI</p>
          </div>
          <button 
            onClick={() => setMessages([{ role: "ai", content: "Welcome! I'm FAN MATE AI. Ask me anything about your stadium experience." }])}
            className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-[var(--color-danger)]"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-6">
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 max-w-[80%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-[var(--color-primary)] text-white" : "bg-white/10 text-[var(--color-secondary)]"}`}>
                  {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user" ? "bg-[var(--color-primary)] text-white rounded-tr-none" : "bg-white/5 text-gray-200 border border-[var(--color-border-subtle)] rounded-tl-none"}`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-4 max-w-[80%]"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 text-[var(--color-secondary)]">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="px-4 py-4 rounded-2xl bg-white/5 border border-[var(--color-border-subtle)] rounded-tl-none flex gap-1">
                  <motion.div animate={{ y: [0,-5,0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                  <motion.div animate={{ y: [0,-5,0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                  <motion.div animate={{ y: [0,-5,0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-[var(--color-card)] border-t border-[var(--color-border-subtle)]">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-2 bg-white/5 rounded-full p-1 border border-white/10 focus-within:border-[var(--color-primary)] focus-within:ring-1 focus-within:ring-[var(--color-primary)] transition-all"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about the stadium..."
              className="flex-grow bg-transparent text-white px-4 py-2 outline-none text-sm placeholder:text-gray-500"
              aria-label="Ask the AI Assistant a question"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2 bg-[var(--color-primary)] text-white rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message to AI"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
