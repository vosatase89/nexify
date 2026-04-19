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
console.log("API KEY:", process.env.OPENAI_API_KEY);
    const res = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.OPENAI_API_KEY,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: message,
      }),
    });

    const data = await res.json();

    const text =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      data.output?.[0]?.content?.[0]?.value ||
      "No response";

    return NextResponse.json({ reply: text });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { reply: "Server error" },
      { status: 500 }
    );
  }
}
