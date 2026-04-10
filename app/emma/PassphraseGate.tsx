"use client";

import { useState } from "react";

const PASSPHRASE = "ELON";

export default function PassphraseGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  if (unlocked) return <>{children}</>;

  return (
    <div className="fixed inset-0 bg-[#D4937F] flex items-center justify-center z-[9999]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim().toUpperCase() === PASSPHRASE) {
            setUnlocked(true);
          } else {
            setError(true);
            setInput("");
          }
        }}
        className="flex flex-col items-center gap-4 px-6"
      >
        <h1 className="text-2xl font-semibold text-[#1A0A00]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          Enter passphrase
        </h1>
        <input
          type="password"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(false);
          }}
          autoFocus
          className="w-64 px-4 py-3 rounded-full border border-[#1A0A00]/20 bg-white/80 text-center text-base outline-none focus:border-[#1A0A00]/50"
          placeholder="Passphrase"
        />
        {error && <p className="text-sm text-red-700">Incorrect passphrase</p>}
        <button
          type="submit"
          className="px-8 py-3 bg-[#0F110A] text-white rounded-full font-semibold text-base hover:scale-[1.02] transition-transform"
        >
          Enter
        </button>
      </form>
    </div>
  );
}
