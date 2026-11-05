import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/site.config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name || "Strona w przygotowaniu",
  description: site.description || undefined,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
