import type { Metadata } from "next";
import { Consent } from "@/components/consent/Consent";
import { StructuredData } from "@/components/StructuredData";
import { site } from "@/site.config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // Each page sets its own title, description and sharing details (lib/metadata.ts)
  description: site.description || undefined,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <StructuredData />
        {/* Each proposal has its own header and footer (components/proposals/) */}
        {children}
        <Consent />
      </body>
    </html>
  );
}
