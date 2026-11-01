import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "PÓSTERA — Nem toda palavra é para agora.",
  description: "Cartas digitais seladas para um instante futuro.",
  metadataBase: new URL("https://postera-gustapaz.starrylinen.chatgpt.site"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "PÓSTERA",
    description: "Cartas digitais seladas para um instante futuro.",
    type: "website",
    locale: "pt_BR",
  },
  icons: { icon: "/favicon.svg" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
