"use client";
import { useState } from "react";

type Message = { role: "user" | "assistant"; content: string };
const starters = [
  { icon: "⌘", title: "Kod yozish", desc: "Dastur va skriptlar yaratish", prompt: "Menga yangi dasturiy loyiha tuzishda yordam ber." },
  { icon: "▦", title: "BAZIS skriptlari", desc: "Mebel konstruksiyasi va avtomatlashtirish", prompt: "BAZIS-Мебельщик uchun skript yozishda yordam ber." },
  { icon: "◇", title: "3D loyihalash", desc: "3ds Max, AutoCAD va vizualizatsiya", prompt: "3ds Max va AutoCAD bo‘yicha texnik yordam ber." },
  { icon: "▤", title: "Mebel Studio", desc: "Parametrik mebel va web ilova", prompt: "Mebel Studio loyihamni rivojlantirish rejasini tuz." }
];

export default function Home() {
  const [project, setProject] = useState("Yangi loyiha");
  const [projects, setProjects] = useState(["Yangi loyiha", "BAZIS skriptlari", "Mebel Studio"]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  function newProject() {
    const name = "Loyiha " + (projects.length + 1);
    setProjects(p => [name, ...p]); setProject(name); setMessages([]); setMobileMenu(false);
  }
  async function send(text = input) {
    const prompt = text.trim();
    if (!prompt || busy) return;
    setInput(""); setMessages(m => [...m, { role: "user", content: prompt }]); setBusy(true);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: prompt, project }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Server xatosi");
      setMessages(m => [...m, { role: "assistant", content: data.answer }]);
    } catch (e) {
      setMessages(m => [...m, { role: "assistant", content: "Ulanishda xatolik: " + (e as Error).message }]);
    } finally { setBusy(false); }
  }
  return <main className="app">
    <aside className={mobileMenu ? "sidebar open" : "sidebar"}>
      <div className="brand"><span className="brandMark">Y</span><div><b>YUSUF AI</b><small>PERSONAL AI BRAIN</small></div></div>
      <button className="newProject" onClick={newProject}>＋　Yangi loyiha</button>
      <div className="sectionLabel">LOYIHALAR</div>
      <nav>{projects.map(p => <button key={p} className={project === p ? "navItem selected" : "navItem"} onClick={() => {setProject(p);setMessages([]);setMobileMenu(false);}}><span>▧</span>{p}</button>)}</nav>
      <div className="sidebarBottom"><div className="statusDot"/> AI CORE <span>v0.1</span></div>
    </aside>
    <section className="workspace">
      <header className="topbar"><button className="menuButton" onClick={() => setMobileMenu(v => !v)}>☰</button><div className="crumb">Ish maydoni <span>/</span> {project}</div><div className="topRight"><span className="online"><i/> Tizim tayyor</span><div className="avatar">Y</div></div></header>
      <div className="content">
        {messages.length === 0 ? <div className="welcome">
          <div className="eyebrow"><span/> SHAXSIY AI YORDAMCHING</div>
          <h1>Salom, Yusuf<span>.</span><br/><em>Bugun nimani yaratamiz?</em></h1>
          <p className="lead">G‘oyalaringni kodga aylantir. Texnik loyihalaringni tahlil qil. Har bir ishing uchun alohida AI xotirasi.</p>
          <div className="cards">{starters.map(s => <button className="starter" key={s.title} onClick={() => send(s.prompt)}><span className="starterIcon">{s.icon}</span><b>{s.title}</b><small>{s.desc}</small><span className="cardArrow">↗</span></button>)}</div>
        </div> : <div className="conversation">{messages.map((m,i) => <div className={"message " + m.role} key={i}><div className="msgAvatar">{m.role === "user" ? "Y" : "✦"}</div><div className="msgBody"><small>{m.role === "user" ? "YUSUF" : "YUSUF AI"}</small><p>{m.content}</p></div></div>)}{busy && <div className="message assistant"><div className="msgAvatar">✦</div><div className="msgBody"><small>YUSUF AI</small><p className="typing">Javob tayyorlanmoqda…</p></div></div>}</div>}
        <div className="composerWrap"><div className="composer"><textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => {if(e.key === "Enter" && !e.shiftKey){e.preventDefault();send();}}} placeholder="YUSUF AI ga savolingizni yozing..." rows={2}/><button disabled={busy || !input.trim()} onClick={() => send()} aria-label="Yuborish">↑</button></div><div className="composerHint">Enter — yuborish　·　Shift + Enter — yangi qator　·　YUSUF AI xatolarga yo‘l qo‘yishi mumkin</div></div>
      </div>
    </section>
  </main>;
}
