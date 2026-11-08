import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "YUSUF AI", description: "Yusuf uchun shaxsiy AI Brain" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="uz"><body>{children}</body></html>;
}
