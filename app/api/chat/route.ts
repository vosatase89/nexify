import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const res = await fetchconst res = await fetch("https://nexify-alpha.vercel.app/api/chat", {      method: "POST",
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

   //   let text =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      data.output?.[0]?.content?.[0]?.value ||
      "No response";

    return NextResponse.json({ reply: text });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ reply: "API error" });
  }
}
