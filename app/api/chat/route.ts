import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body?.message || "";

    if (!message) {
      return NextResponse.json({ reply: "No message provided" }, { status: 400 });
    }

    return NextResponse.json({ reply: `Received: ${message}` });

  } catch (error) {
    return NextResponse.json({ reply: "Server error" }, { status: 500 });
  }
}
