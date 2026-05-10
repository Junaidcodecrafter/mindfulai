"use client";

import { useState } from "react";
import ChatWindow, { Message } from "@/components/ChatWindow";
import VoiceInput from "@/components/VoiceInput";
import Visualizer from "@/components/Visualizer";
import { useSpeech } from "@/hooks/useSpeech";

const SESSION_ID = Math.random().toString(36).substring(7);

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<"idle" | "listening" | "thinking">("idle");
  
  const { isListening, transcript, startListening, stopListening, speak, setTranscript } = useSpeech();

  if (isListening && status !== "listening") setStatus("listening");
  if (!isListening && status === "listening") setStatus("idle");

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setStatus("thinking");

    try {
      const res = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: SESSION_ID, message: text }),
      });
      
      const data = await res.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: data.response,
        isCrisis: data.is_crisis
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      speak(data.response);
      
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages((prev) => [...prev, {
        id: Date.now().toString(),
        role: "ai",
        content: "I'm having trouble connecting right now. Please try again in a moment."
      }]);
    } finally {
      setStatus("idle");
    }
  };

  return (
    <main className="flex flex-col h-screen max-w-3xl mx-auto p-4 md:p-6">
      <header className="py-6 flex flex-col items-center">
        <h1 className="text-3xl font-light tracking-wide text-primary">Aura</h1>
        <p className="text-sm text-slate-400 mt-2">A safe space for your thoughts</p>
      </header>
      
      <div className="flex-1 flex flex-col bg-slate-900/50 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl relative backdrop-blur-sm">
        <ChatWindow messages={messages} />
        
        <div className="p-4 bg-slate-900/80 backdrop-blur-md border-t border-slate-800">
          <Visualizer status={status} />
          <VoiceInput 
            onSendMessage={handleSendMessage}
            isListening={isListening}
            startListening={startListening}
            stopListening={stopListening}
            transcript={transcript}
            setTranscript={setTranscript}
          />
        </div>
      </div>
    </main>
  );
}
