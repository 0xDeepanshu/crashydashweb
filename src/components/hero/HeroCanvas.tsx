'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FloatingParticles } from '@/components/FloatingParticles';

gsap.registerPlugin(ScrollTrigger);

export function HeroCanvas() {
  const scrollProgress = useRef(0);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);

  // New: scroll-driven text layers
  const blockchainLayerRef = useRef<HTMLDivElement>(null);
  const aiLayerRef = useRef<HTMLDivElement>(null);
  const mppLayerRef = useRef<HTMLDivElement>(null);
  const ctaLayerRef = useRef<HTMLDivElement>(null);
  const dividerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const imgRef = useRef<HTMLImageElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const animFrameRef = useRef<number>(0);
  const lastFrameRef = useRef(-1);
  const FRAME_COUNT = 480;

  const getFrameSrc = (index: number) => {
    const padded = index.toString().padStart(5, '0');
    return `/frames/Comp 1/Comp 1_${padded}.jpg`;
  };

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      images.push(img);
    }

    imagesRef.current = images;

    const first = images[0];
    const setFirst = () => {
      if (imgRef.current) imgRef.current.src = first.src;
    };
    if (first.complete) setFirst();
    else first.addEventListener('load', setFirst, { once: true });
  }, []);

  // Frame update loop
  useEffect(() => {
    function updateFrame() {
      const p = Math.max(0, Math.min(1, scrollProgress.current));
      const targetFrame = Math.round(p * (FRAME_COUNT - 1));

      if (targetFrame !== lastFrameRef.current) {
        const img = imagesRef.current[targetFrame];
        if (img?.complete && imgRef.current) {
          imgRef.current.src = img.src;
          lastFrameRef.current = targetFrame;
        }
      }

      animFrameRef.current = requestAnimationFrame(updateFrame);
    }

    animFrameRef.current = requestAnimationFrame(updateFrame);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  // AUTO-PLAY entrance animation
  useEffect(() => {
    const wrapper = pinWrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      const entranceTl = gsap.timeline({ delay: 0.3 });

      // Fade in content container
      entranceTl.to(contentRef.current!, {
        opacity: 1, duration: 0.6, ease: 'power2.out',
      }, 0);

      // Character-level title entrance
      const chars = titleRef.current?.querySelectorAll('.hero-char');
      if (chars?.length) {
        entranceTl.fromTo(chars,
          { opacity: 0, y: 60, rotationX: -90, scale: 0.5 },
          {
            opacity: 1, y: 0, rotationX: 0, scale: 1,
            duration: 0.8,
            stagger: 0.03,
            ease: 'back.out(1.7)',
          },
          0.1,
        );
      }

      // Tagline
      entranceTl.to(taglineRef.current!, {
        opacity: 1, y: 0, letterSpacing: '0.15em',
        duration: 0.7, ease: 'power3.out',
      }, 0.5);

      // Buttons
      entranceTl.to(buttonsRef.current!, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.6, ease: 'back.out(1.5)',
      }, 0.7);

      // Scroll hint
      entranceTl.to(scrollHintRef.current!, {
        opacity: 0.7, duration: 0.5,
      }, 1.0);
    }, wrapper);

    return () => ctx.revert();
  }, []);

  // SCROLL-DRIVEN timeline with layered text reveals
  useEffect(() => {
    const wrapper = pinWrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: '+=600%', // extended for more scroll phases
          scrub: 0.3,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            scrollProgress.current = self.progress;
          },
        },
      });

      // Phase 1 (0–0.08): Hide scroll hint, vignette intensifies
      tl.to(scrollHintRef.current!, { opacity: 0, duration: 0.08 }, 0);
      tl.fromTo(vignetteRef.current!,
        { opacity: 0.2 },
        { opacity: 0.65, duration: 0.5 },
        0.1,
      );

      // Phase 2 (0.08–0.20): Initial title/tagline exit
      tl.to(contentRef.current!, {
        opacity: 0, y: -80, scale: 0.9,
        duration: 0.12, ease: 'power2.in',
      }, 0.08);

      const titleChars = titleRef.current?.querySelectorAll('.hero-char');
      if (titleChars?.length) {
        tl.to(titleChars, {
          opacity: 0, y: -40, rotationX: 45, scale: 0.8,
          duration: 0.1, stagger: 0.004, ease: 'power2.in',
        }, 0.1);
      }

      // Phase 3 (0.20–0.30): Blockchain layer slides in
      tl.fromTo(blockchainLayerRef.current!,
        { y: 80, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.1, ease: 'power3.out' },
        0.20,
      );
      // Blockchain: stagger subtitle lines
      tl.fromTo('.blockchain-line',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.08, ease: 'power2.out' },
        0.22,
      );

      // Phase 4 (0.30–0.40): Blockchain layer exits, AI layer enters
      tl.to(blockchainLayerRef.current!, {
        y: -60, opacity: 0, scale: 0.9,
        duration: 0.1, ease: 'power2.in',
      }, 0.38);

      tl.fromTo(aiLayerRef.current!,
        { y: 80, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.1, ease: 'power3.out' },
        0.40,
      );
      tl.fromTo('.ai-line',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.08, ease: 'power2.out' },
        0.42,
      );

      // Phase 5 (0.48–0.58): AI layer exits, MPP layer enters
      tl.to(aiLayerRef.current!, {
        y: -60, opacity: 0, scale: 0.9,
        duration: 0.1, ease: 'power2.in',
      }, 0.48);

      tl.fromTo(mppLayerRef.current!,
        { y: 80, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.1, ease: 'power3.out' },
        0.50,
      );
      tl.fromTo('.mpp-line',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.08, ease: 'power2.out' },
        0.52,
      );

      // Phase 6 (0.58–0.70): MPP exits, final CTA grand entrance
      tl.to(mppLayerRef.current!, {
        y: -60, opacity: 0, scale: 0.9,
        duration: 0.1, ease: 'power2.in',
      }, 0.58);

      // Bring title back with new epic text (grand re-entry)
      tl.fromTo(ctaLayerRef.current!,
        { y: 100, opacity: 0, scale: 0.85 },
        { y: 0, opacity: 1, scale: 1, duration: 0.12, ease: 'elastic.out(1, 0.7)' },
        0.60,
      );

      // Divider lines
      tl.fromTo('.cta-divider',
        { scaleX: 0 },
        { scaleX: 1, stagger: 0.05, duration: 0.08, ease: 'power3.out' },
        0.62,
      );

      tl.fromTo('.cta-subtitle',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.08, ease: 'power2.out' },
        0.64,
      );

      tl.fromTo('.cta-buttons',
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.1, ease: 'back.out(1.8)' },
        0.68,
      );
    }, wrapper);

    return () => ctx.revert();
  }, []);

  // Split title into individually animated characters
  const titleText = 'CRASHY DASH';
  const titleChars = titleText.split('').map((char, i) => (
    <span
      key={i}
      className="hero-char"
      style={{
        display: char === ' ' ? 'inline' : 'inline-block',
        willChange: 'transform, opacity',
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <div ref={pinWrapperRef} className="relative">
      <div className="relative w-full overflow-hidden" style={{ minHeight: '100vh' }}>
        {/* Frame image */}
        <img
          ref={imgRef}
          alt=""
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 0, objectFit: 'cover', objectPosition: 'center center' }}
          draggable={false}
        />

        {/* Particles */}
        <FloatingParticles />

        {/* Vignette */}
        <div
          ref={vignetteRef}
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(7,1,15,0.6) 100%)',
            opacity: 0.2,
          }}
        />

        {/* Bottom gradient */}
        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background: 'linear-gradient(to top, rgba(7,1,15,0.45) 0%, transparent 35%, transparent 75%, rgba(7,1,15,0.2) 100%)',
          }}
        />

        {/* ===== Initial Content (entrance animation) ===== */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-[5] flex flex-col items-center justify-center px-4 pointer-events-none"
          style={{ opacity: 0 }}
        >
          {/* Main Title */}
          <div className="mb-4 text-center" style={{ perspective: '800px' }}>
            <h1
              ref={titleRef}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter"
              style={{
                background: 'linear-gradient(90deg, #ff4fd8, #6f42ff, #35f2ff, #ff9966, #ff4fd8)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradient-shift 4s linear infinite',
                filter: 'drop-shadow(0 0 40px rgba(255,79,216,0.5)) drop-shadow(0 0 80px rgba(111,66,255,0.3))',
              }}
            >
              {titleChars}
            </h1>
          </div>

          {/* Tagline */}
          <div
            ref={taglineRef}
            className="mb-8 text-center"
            style={{ opacity: 0, transform: 'translateY(25px)', letterSpacing: '0.5em' }}
          >
            <p
              className="text-lg sm:text-xl md:text-2xl font-light text-white/80"
              style={{ fontFamily: 'ui-sans-serif, system-ui', textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
            >
              Dodge. Drift. Survive.
            </p>
          </div>

          {/* Buttons */}
          <div
            ref={buttonsRef}
            className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto"
            style={{ opacity: 0, transform: 'translateY(30px) scale(0.9)' }}
          >
            <button className="btn-neon"><span>PLAY NOW</span></button>
            <button className="btn-outline btn-wallet">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="6" width="20" height="14" rx="2" />
                <path d="M2 10h20" />
                <circle cx="17" cy="15" r="1.5" fill="currentColor" />
              </svg>
              <span>CONNECT WALLET</span>
            </button>
          </div>
        </div>

        {/* ===== Scroll Layer: Blockchain ===== */}
        <div
          ref={blockchainLayerRef}
          className="absolute inset-0 z-[5] flex flex-col items-center justify-center px-6 pointer-events-none"
          style={{ opacity: 0 }}
        >
          <div className="max-w-3xl text-center">
            <div className="mb-3 blockchain-line">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
                style={{
                  background: 'rgba(111,66,255,0.15)',
                  border: '1px solid rgba(111,66,255,0.4)',
                  color: '#a78bfa',
                  fontFamily: 'VT323, monospace',
                }}
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                ON-CHAIN GAMEPLAY
              </span>
            </div>

            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 blockchain-line"
              style={{
                fontFamily: 'ui-sans-serif, system-ui',
                filter: 'drop-shadow(0 0 30px rgba(111,66,255,0.5))',
              }}
            >
              <span className="text-gradient-animated" style={{
                background: 'linear-gradient(90deg, #6f42ff, #35f2ff, #ff4fd8)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                POWERED BY BLOCKCHAIN
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-5 blockchain-line"
              style={{ textShadow: '0 2px 15px rgba(0,0,0,0.5)' }}>
              Every run, every crash, every record — immutably recorded on-chain.
              True ownership. Verifiable scores. Real stakes.
            </p>

            <div className="flex flex-wrap justify-center gap-4 blockchain-line">
              <div className="badge-pill">
                <span className="badge-icon">🔗</span> EVM Compatible
              </div>
              <div className="badge-pill">
                <span className="badge-icon">🏦</span> NFT Vehicles
              </div>
              <div className="badge-pill">
                <span className="badge-icon">💎</span> Token Rewards
              </div>
            </div>
          </div>
        </div>

        {/* ===== Scroll Layer: AI Agents ===== */}
        <div
          ref={aiLayerRef}
          className="absolute inset-0 z-[5] flex flex-col items-center justify-center px-6 pointer-events-none"
          style={{ opacity: 0 }}
        >
          <div className="max-w-3xl text-center">
            <div className="mb-3 ai-line">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
                style={{
                  background: 'rgba(125,255,114,0.1)',
                  border: '1px solid rgba(125,255,114,0.3)',
                  color: '#7dff72',
                  fontFamily: 'VT323, monospace',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
                  <path d="M16 14H8a4 2 0 0 0-4 2v2h16v-2a4 2 0 0 0-4-2z" />
                  <circle cx="18" cy="4" r="2" />
                  <circle cx="6" cy="4" r="2" />
                </svg>
                AI-POWERED AGENTS
              </span>
            </div>

            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 ai-line"
              style={{
                fontFamily: 'ui-sans-serif, system-ui',
                filter: 'drop-shadow(0 0 30px rgba(125,255,114,0.5))',
              }}
            >
              <span className="text-gradient-animated" style={{
                background: 'linear-gradient(90deg, #7dff72, #35f2ff, #ff9966)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                AI AGENTS PLAY 24/7
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-5 ai-line"
              style={{ textShadow: '0 2px 15px rgba(0,0,0,0.5)' }}>
              Train autonomous AI agents to learn your track, master drifts,
              and compete on the global leaderboard. Hire them or challenge them.
            </p>

            <div className="flex flex-wrap justify-center gap-4 ai-line">
              <div className="badge-pill badge-green">
                <span className="badge-icon">🧠</span> Self-Learning
              </div>
              <div className="badge-pill badge-green">
                <span className="badge-icon">⚔️</span> Agent Vs Agent
              </div>
              <div className="badge-pill badge-green">
                <span className="badge-icon">📊</span> Train & Deploy
              </div>
            </div>
          </div>
        </div>

        {/* ===== Scroll Layer: MPP Multiplayer ===== */}
        <div
          ref={mppLayerRef}
          className="absolute inset-0 z-[5] flex flex-col items-center justify-center px-6 pointer-events-none"
          style={{ opacity: 0 }}
        >
          <div className="max-w-3xl text-center">
            <div className="mb-3 mpp-line">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
                style={{
                  background: 'rgba(255,79,216,0.1)',
                  border: '1px solid rgba(255,79,216,0.3)',
                  color: '#ff4fd8',
                  fontFamily: 'VT323, monospace',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="8" r="4" />
                  <circle cx="5" cy="12" r="3" />
                  <circle cx="19" cy="12" r="3" />
                  <path d="M8 9l-1 13h10l-1-13" />
                  <path d="M10 7l-3 3" />
                  <path d="M14 7l3 3" />
                </svg>
                MULTI-PARTY PROTOCOL
              </span>
            </div>

            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 mpp-line"
              style={{
                fontFamily: 'ui-sans-serif, system-ui',
                filter: 'drop-shadow(0 0 30px rgba(255,79,216,0.5))',
              }}
            >
              <span className="text-gradient-animated" style={{
                background: 'linear-gradient(90deg, #ff4fd8, #ff9966, #6f42ff)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                RACE TOGETHER
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-5 mpp-line"
              style={{ textShadow: '0 2px 15px rgba(0,0,0,0.5)' }}>
              Multi-Party Protocol enables real-time multiplayer races with
              on-chain state synchronization. 8 players, zero lag, pure chaos.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mpp-line">
              <div className="badge-pill badge-pink">
                <span className="badge-icon">👥</span> Up to 8 Players
              </div>
              <div className="badge-pill badge-pink">
                <span className="badge-icon">🌐</span> Decentralized Servers
              </div>
              <div className="badge-pill badge-pink">
                <span className="badge-icon">🏆</span> Global Ladder
              </div>
            </div>
          </div>
        </div>

        {/* ===== Scroll Layer: Grand CTA Final ===== */}
        <div
          ref={ctaLayerRef}
          className="absolute inset-0 z-[5] flex flex-col items-center justify-center px-6 pointer-events-none"
          style={{ opacity: 0 }}
        >
          <div className="max-w-4xl text-center">
            <h2
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-4 cta-subtitle"
              style={{
                fontFamily: 'ui-sans-serif, system-ui',
                filter: 'drop-shadow(0 0 50px rgba(255,79,216,0.6)) drop-shadow(0 0 100px rgba(111,66,255,0.4))',
                background: 'linear-gradient(90deg, #ff4fd8, #6f42ff, #35f2ff, #ff9966, #ff4fd8)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradient-shift 4s linear infinite',
              }}
            >
              READY?
            </h2>

            <p className="text-lg sm:text-xl text-white/50 max-w-xl mx-auto mb-4 cta-subtitle"
              style={{ textShadow: '0 2px 15px rgba(0,0,0,0.5)' }}>
              Connect your wallet. Pick your agent. Hit the road.
            </p>

            <div className="flex flex-col items-center gap-3 mb-6">
              <div className="w-24 h-[1px] cta-divider" style={{
                background: 'linear-gradient(90deg, transparent, #ff4fd8, transparent)',
              }} />
              <div className="w-16 h-[1px] cta-divider" style={{
                background: 'linear-gradient(90deg, transparent, #6f42ff, transparent)',
              }} />
              <div className="w-8 h-[1px] cta-divider" style={{
                background: 'linear-gradient(90deg, transparent, #35f2ff, transparent)',
              }} />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto cta-buttons">
              <button className="btn-neon btn-large">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="8,5 20,12 8,19" />
                </svg>
                <span>START ENGINE</span>
              </button>
              <button className="btn-outline btn-large">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="6" width="20" height="14" rx="2" />
                  <path d="M2 10h20" />
                  <circle cx="17" cy="15" r="1.5" fill="currentColor" />
                </svg>
                <span>CONNECT WALLET</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-8 left-1/2 z-[5] flex flex-col items-center gap-2"
          style={{ transform: 'translateX(-50%)', animation: 'scroll-bounce-anim 2s ease-in-out infinite', opacity: 0 }}
        >
          <span className="font-mono text-xs text-white/60 tracking-[0.3em]" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}>
            SCROLL TO EXPLORE
          </span>
          <svg width="20" height="24" viewBox="0 0 20 24" fill="none" stroke="rgba(53,242,255,0.6)" strokeWidth="1.5">
            <path d="M5 9l5 5 5-5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
