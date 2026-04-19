import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const res = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: message,
      }),
    });

    const data = await res.json();

    return NextResponse.json({
      reply: data.output?.[0]?.content?.[0]?.text || "No response",
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ reply: "API error" });
  }
}
