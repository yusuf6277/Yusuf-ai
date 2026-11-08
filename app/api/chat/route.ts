import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
export const runtime = "nodejs";
export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: "Serverda OPENAI_API_KEY sozlanmagan. Vercel Environment Variables bo‘limiga API kalitini kiriting." }, { status: 503 });
    const body = await req.json();
    const message = String(body.message || "").trim();
    const project = String(body.project || "Yangi loyiha").slice(0, 100);
    const history = Array.isArray(body.history) ? body.history.slice(-18).filter((m: any) => ["user","assistant"].includes(m?.role) && typeof m?.content === "string").map((m: any) => ({ role: m.role, content: m.content.slice(0, 12000) })) : [];
    if (!message || message.length > 12000) return NextResponse.json({ error: "Xabar bo‘sh yoki juda uzun." }, { status: 400 });
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-6.1-sol",
      instructions: "Sen YUSUF AI nomli o‘zbek tilida ishlaydigan texnik yordamchisan. Dasturlash, web-ilovalar, BAZIS-Мебельщик skriptlari, mebel konstruksiyasi, 3ds Max va AutoCAD bo‘yicha aniq, amaliy yordam ber. Kodni to‘liq va ishga tushirish ko‘rsatmalari bilan yoz. Ishlamagan kodni ishlaydi deb aytma. Maxfiy kalitlarni so‘rama. Joriy loyiha: " + project + ". Faqat shu loyiha kontekstiga tegishli suhbat tarixidan foydalan.",
      input: [...history, { role: "user", content: message }]
    });
    return NextResponse.json({ answer: response.output_text || "Javob matni qaytmadi." });
  } catch (error) {
    console.error("YUSUF AI API error:", error);
    return NextResponse.json({ error: "AI xizmatida xatolik. API kaliti, model ruxsati va billing holatini tekshiring." }, { status: 500 });
  }
}
