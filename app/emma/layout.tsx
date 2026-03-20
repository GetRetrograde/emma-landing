import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";


const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Emma — Your AI Agent for Brand Deals",
  description:
    "Emma handles brand partnerships end-to-end. Message her on iMessage to get started.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function EmmaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        html, body { margin: 0; padding: 0; background: #D4937F; transition: background 0.5s; }
      `}} />
      <div className={spaceGrotesk.variable}>{children}</div>
    </>
  );
}
