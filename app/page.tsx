"use client";

import { useState } from "react";

export default function Page() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Hello from Nexify",
        }),
      });

      const data = await res.json();
      setResponse(data.reply);
    } catch (err) {
      setResponse("Error");
    }

    setLoading(false);
  };

  return (
    <main style={{ padding: 40 }}>
      <button onClick={handleClick}>
        Ask Nexify
      </button>

      <div style={{ marginTop: 20 }}>
        {loading ? "Loading..." : response}
      </div>
    </main>
  );
}
