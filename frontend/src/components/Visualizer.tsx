"use client";

import { motion } from "framer-motion";

interface VisualizerProps {
  status: "idle" | "listening" | "thinking";
}

export default function Visualizer({ status }: VisualizerProps) {
  if (status === "idle") return null;

  return (
    <div className="flex justify-center items-center py-4">
      <motion.div
        animate={
          status === "listening"
            ? {
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }
            : {
                scale: [1, 1.05, 1],
                opacity: [0.7, 0.9, 0.7],
              }
        }
        transition={{
          duration: status === "listening" ? 1.5 : 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`w-16 h-16 rounded-full blur-xl ${
          status === "listening" ? "bg-primary" : "bg-accent"
        }`}
      />
      <div className="absolute text-sm text-slate-300 font-medium">
        {status === "listening" ? "Listening..." : "Thinking..."}
      </div>
    </div>
  );
}
