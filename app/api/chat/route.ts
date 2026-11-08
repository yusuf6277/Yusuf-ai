import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
export const runtime = "nodejs";
export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: "Serverda OPENAI_API_KEY sozlanmagan. Vercel Environment Variables bo‘limiga API kalitini kiriting." }, { status: 503 });
    const body = await req.json();
    const message = String(body.message || "").trim();
    const project = String(body.project || "Yangi loyiha").slice(0, 100);
    if (!message || message.length > 12000) return NextResponse.json({ error: "Xabar bo‘sh yoki juda uzun." }, { status: 400 });
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-6",
      instructions: "Sen YUSUF AI nomli o‘zbek tilida ishlaydigan texnik yordamchisan. Dasturlash, web-ilovalar, BAZIS-Мебельщик skriptlari, mebel konstruksiyasi, 3ds Max va AutoCAD bo‘yicha aniq, amaliy yordam ber. Kodni to‘liq va ishga tushirish ko‘rsatmalari bilan yoz. Ishlamagan kodni ishlaydi deb aytma. Maxfiy kalitlarni so‘rama. Joriy loyiha: " + project + ". Faqat shu loyiha kontekstiga tegishli javob ber.",
      input: message
    });
    return NextResponse.json({ answer: response.output_text || "Javob matni qaytmadi." });
  } catch (error) {
    console.error("YUSUF AI API error:", error);
    return NextResponse.json({ error: "AI xizmatida xatolik. Model nomi va API sozlamalarini tekshiring." }, { status: 500 });
  }
}
