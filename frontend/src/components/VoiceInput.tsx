"use client";

import { Mic, MicOff, Send } from "lucide-react";

interface VoiceInputProps {
  onSendMessage: (message: string) => void;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  transcript: string;
  setTranscript: (val: string) => void;
}

export default function VoiceInput({
  onSendMessage,
  isListening,
  startListening,
  stopListening,
  transcript,
  setTranscript
}: VoiceInputProps) {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (transcript.trim()) {
      onSendMessage(transcript);
      setTranscript("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 bg-surface rounded-2xl shadow-lg border border-slate-700">
      <button
        type="button"
        onClick={isListening ? stopListening : startListening}
        className={`p-3 rounded-full transition-colors ${
          isListening ? "bg-red-500/20 text-red-400" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
        }`}
      >
        {isListening ? <MicOff size={20} /> : <Mic size={20} />}
      </button>
      
      <input
        type="text"
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        placeholder="How are you feeling today?"
        className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder:text-slate-500 px-2"
      />
      
      <button
        type="submit"
        disabled={!transcript.trim()}
        className="p-3 bg-primary text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-400 transition-colors"
      >
        <Send size={20} />
      </button>
    </form>
  );
}
