"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");

  const handleClick = async () => {
    console.log("Klik radi:", input);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    console.log(data);
    alert(data.reply || "No response");
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">Nexify AI</h1>

      <p className="text-gray-400 mb-6 text-center max-w-md">
        Your AI assistant for connecting tools, automations and workflows.
      </p>

      <div className="w-full max-w-md bg-zinc-900 rounded-2xl p-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask: connect Shopify with ChatGPT..."
          className="w-full p-3 rounded-lg bg-black border border-zinc-700 outline-none"
        />

        <button
          onClick={handleClick}
          className="mt-4 w-full bg-white text-black p-3 rounded-lg font-semibold"
        >
          Ask Nexify
        </button>
      </div>
    </main>
  );
}