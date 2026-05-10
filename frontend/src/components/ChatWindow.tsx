"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  isCrisis?: boolean;
}

interface ChatWindowProps {
  messages: Message[];
}

export default function ChatWindow({ messages }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {messages.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl font-light"
          >
            I&apos;m here to listen.
          </motion.div>
          <div className="text-sm opacity-60">Speak or type whenever you&apos;re ready.</div>
        </div>
      )}

      {messages.map((msg) => (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[80%] rounded-2xl px-5 py-3 ${
              msg.role === "user"
                ? "bg-primary text-white rounded-br-none"
                : msg.isCrisis
                ? "bg-red-900/40 border border-red-500/50 text-red-100 rounded-bl-none"
                : "bg-surface text-slate-200 rounded-bl-none"
            }`}
          >
            <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
          </div>
        </motion.div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
