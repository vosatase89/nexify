import OpenAI from "openai";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        { role: "user", content: message },
      ],
    });

    return Response.json({
      reply: response.choices?.[0]?.message?.content || "No response",
    });
  } catch (err: any) {
    return Response.json({
      error: err.message,
    }, { status: 500 });
  }
}
