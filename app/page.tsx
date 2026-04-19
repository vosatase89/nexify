"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");

  const handleClick = async () => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
        }),
      });

      const data = await res.json();

      alert(data.reply || "No response");
    } catch (err) {
      console.error(err);
      alert("Error connecting to API");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">Nexify AI</h1>

      <p className="text-gray-400 mb-6 text-center max-w-md">
        Your AI assistant for connecting tools and automations
      </p>

      <div className="w-full max-w-md space-y-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
        />

        <button
          onClick={handleClick}
          className="w-full bg-white text-black p-3 rounded-lg"
        >
          Ask Nexify
        </button>
      </div>
    </main>
  );
}
