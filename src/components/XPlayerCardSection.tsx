"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Inline SVG icons (isolated, no dependency on Icons.tsx) ─── */
const XLogo = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const PlayIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const HeartIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const RetweetIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <path d="M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>
);

const ChatIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const ShareIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" />
  </svg>
);

const ZapFill = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

/* ─── Feature pill data ─── */
const features = [
  { label: "Instant Play", color: "text-secondary" },
  { label: "Onchain Rewards", color: "text-accent" },
  { label: "Share Anywhere", color: "text-primary-light" },
  { label: "Play Inside X", color: "text-secondary" },
  { label: "One Click Txns", color: "text-accent" },
];

/* ─── Main Component ─── */
export default function XPlayerCardSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1px)", () => {
        /* Section entrance timeline */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".xpc-section",
            start: "top 80%",
            toggleActions: "play none none none",
          },
          defaults: { ease: "power3.out" },
        });

        tl.from(".xpc-badge", { y: 20, autoAlpha: 0, duration: 0.5 })
          .from(".xpc-heading", { y: 40, autoAlpha: 0, duration: 0.7 }, "<0.1")
          .from(".xpc-subtext", { y: 30, autoAlpha: 0, duration: 0.6 }, "<0.15")
          .from(".xpc-pill", {
            y: 20,
            autoAlpha: 0,
            duration: 0.4,
            stagger: 0.06,
          }, "<0.2")
          .from(".xpc-mockup", {
            y: 60,
            autoAlpha: 0,
            scale: 0.95,
            duration: 0.9,
          }, "<0.15")
          .from(".xpc-cta", { y: 20, autoAlpha: 0, duration: 0.5 }, "<0.2");

        /* Floating idle on the tweet card */
        gsap.to(".xpc-float", {
          y: -8,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        /* Ambient orbs */
        gsap.to(".xpc-orb-1", {
          x: 30,
          y: -20,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(".xpc-orb-2", {
          x: -25,
          y: 15,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        /* Glow pulse on play button */
        gsap.to(".xpc-play-glow", {
          scale: 1.3,
          autoAlpha: 0.3,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        /* Activity ticker slide */
        gsap.to(".xpc-ticker", {
          xPercent: -50,
          duration: 20,
          repeat: -1,
          ease: "none",
        });

        /* Stat counters — subtle pulse */
        gsap.to(".xpc-stat-val", {
          textShadow: "0 0 12px rgba(0,245,212,0.5)",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.3,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="xpc-section py-24 md:py-32 px-6 relative z-10 overflow-hidden"
    >
      <div className="section-divider mb-24" />

      {/* ── Ambient BG orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="xpc-orb-1 absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-primary/6 blur-[100px]" />
        <div className="xpc-orb-2 absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/3 blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ── Header ── */}
        <div className="text-center mb-16">
          <div className="xpc-badge inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-foreground-muted mb-6">
            <XLogo className="w-4 h-4 text-foreground" />
            <span>X Player Cards</span>
          </div>

          <h2 className="xpc-heading text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
            Post a Link.<br />
            <span className="gradient-text">Launch a Game.</span>
          </h2>

          <p className="xpc-subtext text-foreground-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Post <span className="text-secondary font-medium">crashdash.xyz</span> on X and
            your followers can play, compete, and earn — without ever leaving their feed.
          </p>
        </div>

        {/* ── Feature pills ── */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {features.map((f, i) => (
            <div
              key={i}
              className={`xpc-pill flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-medium tracking-wide border border-white/5 ${f.color}`}
            >
              <ZapFill className="w-3 h-3" />
              {f.label}
            </div>
          ))}
        </div>

        {/* ── X Post Mockup ── */}
        <div className="xpc-mockup max-w-2xl mx-auto mb-14">
          <div className="xpc-float">
            {/* Tweet container */}
            <div className="rounded-2xl border border-white/8 overflow-hidden"
              style={{ background: "rgba(22, 24, 28, 0.85)", backdropFilter: "blur(24px)" }}>

              {/* Tweet header */}
              <div className="flex items-center gap-3 px-5 pt-5 pb-3">
                {/* Avatar — actual profile image */}
                <div className="w-11 h-11 rounded-full flex-shrink-0 overflow-hidden border border-white/10">
                  <img
                    src="https://pbs.twimg.com/profile_images/2056399997147787264/LFgJl_DU_normal.jpg"
                    alt="Ugly"
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-foreground truncate">Ugly</span>
                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="#1d9bf0">
                      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5a.749.749 0 01-1.041.208l-.115-.094-2.415-2.415a.749.749 0 111.06-1.06l1.77 1.767 3.825-5.74a.75.75 0 011.25.833z" />
                    </svg>
                  </div>
                  <span className="text-xs text-foreground-muted">@0xUgly</span>
                </div>
                <XLogo className="w-5 h-5 text-foreground-muted/40 flex-shrink-0" />
              </div>

              {/* Tweet text */}
              <div className="px-5 pb-4">
                <p className="text-sm text-foreground leading-relaxed">
                  Dodge. Drift. Survive. Earn onchain. 🎮⚡<br />
                  Play directly in your feed 👇<br />
                  <span className="text-primary-light">crashdash.xyz</span>
                </p>
              </div>

              {/* ── Playable Card embed ── */}
              <a href="https://x.com/0xUgly/status/2058998357671231974?s=20" target="_blank" rel="noopener noreferrer" className="block mx-5 mb-4 rounded-xl overflow-hidden border border-white/8 relative group cursor-pointer no-underline">
                {/* Card background — game preview */}
                <div className="relative aspect-video overflow-hidden">

                  {/* Game screenshot */}
                  <img
                    src="/frames/Comp 1/Comp 1_00120.jpg"
                    alt="Crashy Dash gameplay"
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                  />
                  {/* Dark overlay for readability */}
                  <div className="absolute inset-0 bg-black/30" />

                  {/* Score overlay */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="glass px-3 py-1.5 rounded-lg border border-white/10">
                      <span className="text-[10px] text-foreground-muted/70 uppercase tracking-wider">Score</span>
                      <div className="xpc-stat-val text-lg font-bold text-secondary font-mono leading-none">2,847</div>
                    </div>
                  </div>

                  {/* Combo overlay */}
                  <div className="absolute top-4 right-4">
                    <div className="glass px-3 py-1.5 rounded-lg border border-white/10">
                      <span className="text-[10px] text-foreground-muted/70 uppercase tracking-wider">Combo</span>
                      <div className="xpc-stat-val text-lg font-bold text-accent font-mono leading-none">x7</div>
                    </div>
                  </div>

                  {/* Center play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="xpc-play-glow absolute inset-0 rounded-full bg-primary/40 blur-xl" />
                      <div className="relative w-16 h-16 rounded-full glass border border-primary/40 flex items-center justify-center shadow-[0_0_30px_rgba(139,124,255,0.4)] group-hover:scale-110 transition-transform duration-300">
                        <PlayIcon className="w-7 h-7 text-white ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Live badge */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-1.5 glass px-2.5 py-1 rounded-full border border-secondary/20">
                    <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    <span className="text-[10px] font-mono text-secondary uppercase tracking-wider">Live</span>
                  </div>

                  {/* Transaction activity ticker */}
                  <div className="absolute bottom-4 left-4 max-w-[55%] overflow-hidden">
                    <div className="xpc-ticker flex gap-4 whitespace-nowrap">
                      <span className="text-[9px] font-mono text-secondary/60">⚡ 0.002 SOL earned</span>
                      <span className="text-[9px] font-mono text-primary-light/60">🎯 Block placed #42</span>
                      <span className="text-[9px] font-mono text-accent/60">🏆 New high score</span>
                      <span className="text-[9px] font-mono text-secondary/60">⚡ 0.001 SOL reward</span>
                      <span className="text-[9px] font-mono text-primary-light/60">🎯 Perfect stack!</span>
                      <span className="text-[9px] font-mono text-accent/60">🏆 Combo x12</span>
                      {/* Duplicate for seamless loop */}
                      <span className="text-[9px] font-mono text-secondary/60">⚡ 0.002 SOL earned</span>
                      <span className="text-[9px] font-mono text-primary-light/60">🎯 Block placed #42</span>
                      <span className="text-[9px] font-mono text-accent/60">🏆 New high score</span>
                      <span className="text-[9px] font-mono text-secondary/60">⚡ 0.001 SOL reward</span>
                    </div>
                  </div>
                </div>

                {/* Card footer */}
                <div className="px-4 py-3 flex items-center justify-between"
                  style={{ background: "rgba(22, 24, 28, 0.95)" }}>
                  <div>
                    <div className="text-xs font-semibold text-foreground">Crashy Dash — Play Now</div>
                    <div className="text-[10px] text-foreground-muted">crashdash.xyz · Instant Play</div>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-white text-[11px] font-bold shadow-[0_0_15px_rgba(139,124,255,0.3)]">
                    <PlayIcon className="w-3 h-3" />
                    Play
                  </div>
                </div>
              </a>

              {/* Tweet engagement bar */}
              <div className="flex items-center justify-between px-5 py-3 border-t border-white/5">
                <button className="flex items-center gap-1.5 text-foreground-muted/50 hover:text-primary-light transition-colors text-xs group/btn">
                  <ChatIcon className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                  <span>247</span>
                </button>
                <button className="flex items-center gap-1.5 text-foreground-muted/50 hover:text-secondary transition-colors text-xs group/btn">
                  <RetweetIcon className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                  <span>1.2K</span>
                </button>
                <button className="flex items-center gap-1.5 text-foreground-muted/50 hover:text-accent transition-colors text-xs group/btn">
                  <HeartIcon className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                  <span>4.8K</span>
                </button>
                <button className="flex items-center gap-1.5 text-foreground-muted/50 hover:text-primary-light transition-colors text-xs group/btn">
                  <ShareIcon className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="xpc-cta text-center">
          <a
            href="https://x.com/0xUgly/status/2058998357671231974?s=20"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
          >
            <span className="flex items-center gap-2">
              <XLogo className="w-5 h-5" />
              Share Crashy Dash on X
            </span>
          </a>
          <p className="text-xs text-foreground-muted/40 mt-4">
            Just post <span className="text-foreground-muted/60">crashdash.xyz</span> — it becomes a playable game card in the X feed
          </p>
        </div>
      </div>
    </section>
  );
}
