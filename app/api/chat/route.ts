import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    return NextResponse.json({
      reply: "You said: " + message,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
