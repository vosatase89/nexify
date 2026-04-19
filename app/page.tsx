"use client";

export default function Page() {

  const handleClick = async () => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "test" }),
      });

      const data = await res.json();

      console.log("RESPONSE:", data);

      if (!data.reply) {
        alert("No response");
      } else {
        alert(data.reply);
      }

    } catch (e) {
      alert("ERROR");
      console.log(e);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <button onClick={handleClick}>
        Ask Nexify
      </button>
    </div>
  );
}      <div className="w-full max-w-md space-y-4">
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
