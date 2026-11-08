# YUSUF AI

Yusuf uchun shaxsiy AI developer workspace. Next.js + OpenAI Responses API.

## Ishga tushirish
- Node.js 20+
- `npm install`
- `.env.example` nusxasini `.env.local` deb saqlang
- `OPENAI_API_KEY` va hisobingizda mavjud `OPENAI_MODEL` qiymatini kiriting
- `npm run dev`

## Vercel deploy
GitHub repository'ni Vercel'ga import qiling. Framework: Next.js. Environment Variables:
- `OPENAI_API_KEY` — maxfiy OpenAI API key
- `OPENAI_MODEL` — API hisobingizda mavjud model ID

Keyin Deploy bosing.

## MVP holati
Chat interfeysi va server API mavjud. Hozircha loyiha ro‘yxati/xabarlari brauzer sessiyasida saqlanadi; doimiy loyiha xotirasi, login, fayl yuklash va Telegram bot keyingi bosqichda qo‘shiladi. Ommaga chiqarishdan oldin autentifikatsiya va rate limiting qo‘shish kerak.
