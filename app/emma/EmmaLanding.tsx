"use client";

import { useState } from "react";
import Image from "next/image";

const PHONE_NUMBER = "+14155138544";
const IMESSAGE_LINK = `sms:${PHONE_NUMBER}`;

const CTA_SHADOW =
  "rgba(240, 91, 54, 0.84) 0px 4px 30px, rgba(242, 84, 45, 0.15) 0px 0px 60px";

type Sky = "sunset" | "blue";

const SKY_CONFIG = {
  sunset: {
    bg: "/emma-clouds-bg.png",
    bodyBg: "#D4937F",
    fade: "linear-gradient(to top, rgba(228,190,173,0.45) 0%, rgba(228,190,173,0.20) 9%, transparent 100%)",
  },
  blue: {
    bg: "/emma-clouds-bg-blue.png",
    bodyBg: "#7BA7CC",
    fade: "linear-gradient(to top, rgba(160,195,220,0.45) 0%, rgba(160,195,220,0.20) 9%, transparent 100%)",
  },
} as const;

function CTAButton({
  className = "",
  iconColor = "#FFFFFF",
}: {
  className?: string;
  iconColor?: string;
}) {
  return (
    <a href="/emma/onboarding" className={`relative group block ${className}`}>
      <div
        className="flex items-center justify-center gap-3 bg-[#0F110A] border border-black text-white rounded-full w-full py-[18px] font-semibold text-base transition-transform hover:scale-[1.02]"
        style={{ boxShadow: CTA_SHADOW }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.477 2 2 5.813 2 10.5c0 2.71 1.475 5.127 3.77 6.717-.19 1.46-.87 2.87-1.77 3.783h.01c2.16 0 4.15-.86 5.58-2.03.78.14 1.58.23 2.41.23 5.523 0 10-3.813 10-8.5S17.523 2 12 2z" fill={iconColor} />
        </svg>
        Get Started
      </div>
    </a>
  );
}

function SkyToggle({ sky, onToggle }: { sky: Sky; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="relative w-[52px] h-[28px] rounded-full transition-colors duration-300 focus:outline-none"
      style={{
        backgroundColor: sky === "sunset" ? "rgba(26,10,0,0.15)" : "rgba(0,10,26,0.15)",
      }}
      aria-label={`Switch to ${sky === "sunset" ? "blue" : "sunset"} sky`}
    >
      <div
        className="absolute top-[3px] w-[22px] h-[22px] rounded-full transition-transform duration-300 flex items-center justify-center text-[12px]"
        style={{
          transform: sky === "sunset" ? "translateX(3px)" : "translateX(27px)",
          backgroundColor: sky === "sunset" ? "#F2954A" : "#5B9BD5",
        }}
      >
        {sky === "sunset" ? "☀" : "☁"}
      </div>
    </button>
  );
}

export default function EmmaLanding() {
  const [sky, setSky] = useState<Sky>("sunset");
  const config = SKY_CONFIG[sky];

  const toggleSky = () => setSky((s) => (s === "sunset" ? "blue" : "sunset"));

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `html, body { background: ${config.bodyBg}; transition: background 0.5s; }` }} />

      {/* Preload both images */}
      <link rel="preload" as="image" href={SKY_CONFIG.sunset.bg} />
      <link rel="preload" as="image" href={SKY_CONFIG.blue.bg} />

      <main
        className="fixed inset-0 md:relative md:min-h-[100vh] md:min-h-[100dvh] bg-white overflow-hidden"
        style={{
          fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui, sans-serif",
        }}
      >
        {/* Desktop: stacked background layers for crossfade */}
        <div
          className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
          style={{ backgroundImage: `url(${SKY_CONFIG.sunset.bg})`, opacity: sky === "sunset" ? 1 : 0 }}
        />
        <div
          className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
          style={{ backgroundImage: `url(${SKY_CONFIG.blue.bg})`, opacity: sky === "blue" ? 1 : 0 }}
        />

        <div
          className="h-full flex flex-col overflow-hidden pb-1 md:pb-0"
          style={{
            paddingTop: "env(safe-area-inset-top)",
            paddingRight: "env(safe-area-inset-right)",
            paddingLeft: "env(safe-area-inset-left)",
            boxSizing: "border-box",
          }}
        >
          {/* ═══════════════ MOBILE ═══════════════ */}
          <div
            className="md:hidden relative flex-1 flex flex-col min-h-0 mx-4 mt-2 mb-1 rounded-3xl overflow-hidden"
          >
            {/* Mobile: stacked background layers for crossfade */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
              style={{ backgroundImage: `url(${SKY_CONFIG.sunset.bg})`, opacity: sky === "sunset" ? 1 : 0 }}
            />
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
              style={{ backgroundImage: `url(${SKY_CONFIG.blue.bg})`, opacity: sky === "blue" ? 1 : 0 }}
            />
            <nav className="relative z-10 flex items-center justify-between py-4 px-5">
              <div className="flex items-center gap-2.5">
                <span className="font-extrabold text-lg tracking-[-0.02em] text-[#1C1917]">
                  emma
                </span>
                <Image src="/retro-r-logo.png" alt="Retrograde" width={20} height={20} />
              </div>
              <div className="flex items-center gap-3">
                <SkyToggle sky={sky} onToggle={toggleSky} />
                <span
                  className="text-[13px] font-medium bg-[#1C1917]/40 text-[#FFF8F0] rounded-full px-[18px] py-2 cursor-default"
                >
                  Login
                </span>
              </div>
            </nav>

            <div className="relative z-10 flex-1 flex flex-col items-center px-5 min-h-0">
              <div className="h-[10dvh]" />
              <h1 className="text-[clamp(32px,8.5vw,40px)] font-bold text-center leading-[1.1] tracking-[-0.03em] text-[#1C1917]">
                emma wants to
                <br />
                <em className="italic font-bold">close deals.</em> do you?
              </h1>
              <p className="text-[15px] text-[#1A0A00]/50 mt-3">
                It all starts with one text.
              </p>
              <div className="mt-8 w-full">
                <a href="/emma/onboarding" className="block w-full">
                  <div
                    className="flex items-center justify-center gap-3 bg-[#1C1917] text-white rounded-full w-full py-[18px] font-semibold text-base"
                    style={{ boxShadow: CTA_SHADOW }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.477 2 2 5.813 2 10.5c0 2.71 1.475 5.127 3.77 6.717-.19 1.46-.87 2.87-1.77 3.783h.01c2.16 0 4.15-.86 5.58-2.03.78.14 1.58.23 2.41.23 5.523 0 10-3.813 10-8.5S17.523 2 12 2z" fill="#F2542D" />
                    </svg>
                    Get Started
                  </div>
                </a>
              </div>
              <p className="text-[11px] text-[#1A0A00]/35 mt-2.5 text-center">
                By continuing, you agree to our Terms and Privacy.
              </p>
              <div className="flex-1" />
              <Image
                src="/emma-character.png"
                alt="Emma"
                width={279}
                height={258}
                className="w-[60%] h-auto shrink-0"
                priority
              />
            </div>
            {/* Warm fade at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[33%] pointer-events-none transition-[background] duration-500" style={{ background: config.fade }} />

            {/* Mobile footer links — split around Emma */}
            <div className="absolute bottom-4 left-5 z-10">
              <a href="/terms" className="text-[11px] text-[#1A0A00]/35 hover:text-[#1A0A00]/60 transition-colors">Terms</a>
            </div>
            <div className="absolute bottom-4 right-5 flex items-center gap-4 z-10">
              <a href="/privacy" className="text-[11px] text-[#1A0A00]/35 hover:text-[#1A0A00]/60 transition-colors">Privacy</a>
              <a href="mailto:support@getretrograde.com" className="text-[11px] text-[#1A0A00]/35 hover:text-[#1A0A00]/60 transition-colors">Contact</a>
            </div>
          </div>

          {/* ═══════════════ DESKTOP NAV ═══════════════ */}
          <nav className="hidden md:flex items-center justify-between py-8 px-16 relative z-10">
            <span className="font-bold text-[22px] tracking-[-0.02em] text-[#1A0A00]">
              emma
            </span>
            <Image
              src="/retro-r-logo.png"
              alt="Retrograde"
              width={24}
              height={24}
              className="absolute left-[calc(50%-444px)] top-[39px]"
            />
            <div className="flex items-center gap-10">
              <span className="text-[15px] text-[#1A0A00]/45">Features</span>
              <span className="text-[15px] text-[#1A0A00]/45">Pricing</span>
              <span className="text-[15px] text-[#1A0A00]/45">About</span>
              <SkyToggle sky={sky} onToggle={toggleSky} />
              <span
                className="text-[15px] font-medium bg-[#1A0A00]/40 text-[#FFF8F0] rounded-full px-6 py-2.5 cursor-default"
              >
                Login
              </span>
            </div>
          </nav>

          {/* ═══════════════ DESKTOP CONTENT ═══════════════ */}
          <div className="hidden md:flex flex-col items-center absolute inset-x-0 z-10" style={{ top: "24vh" }}>
            <h1 className="text-[72px] font-bold text-center leading-[1.1] tracking-[-0.03em] text-[#1C1917]">
              emma wants to{" "}
              <br />
              <em className="italic font-bold">close deals.</em> do you?
            </h1>
            <div className="mt-[30px]">
              <CTAButton className="w-[387px]" iconColor="#FFFFFF" />
            </div>
          </div>

          {/* Desktop Emma — anchored to bottom of viewport */}
          <div className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px]">
            <Image
              src="/emma-character.png"
              alt="Emma"
              width={400}
              height={370}
              className="w-full h-auto"
            />
          </div>

          {/* Warm fade at bottom */}
          <div className="hidden md:block absolute bottom-0 left-0 right-0 h-[33%] pointer-events-none transition-[background] duration-500" style={{ background: config.fade }} />

          {/* Desktop footer links — bottom right */}
          <div className="hidden md:flex items-center gap-6 absolute bottom-6 right-16 z-10">
            <a href="/terms" className="text-[13px] text-[#1A0A00]/40 hover:text-[#1A0A00]/70 transition-colors">Terms</a>
            <a href="/privacy" className="text-[13px] text-[#1A0A00]/40 hover:text-[#1A0A00]/70 transition-colors">Privacy</a>
            <a href="mailto:support@getretrograde.com" className="text-[13px] text-[#1A0A00]/40 hover:text-[#1A0A00]/70 transition-colors">Contact</a>
          </div>

        </div>
      </main>
    </>
  );
}
