import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body?.message;

    if (!message) {
      return NextResponse.json(
        { reply: "Missing message" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { reply: "Missing OPENAI_API_KEY" },
        { status: 500 }
      );
    }

    const res = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: message,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("OpenAI API error:", data);
      return NextResponse.json(
        { reply: data?.error?.message || "OpenAI request failed" },
        { status: res.status }
      );
    }

    const text =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text?.value ||
      data.output?.[0]?.content?.[0]?.text ||
      "No response";

    return NextResponse.json({ reply: text });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { reply: "Server error" },
      { status: 500 }
    );
  }
}
