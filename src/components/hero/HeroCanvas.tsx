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

  // Scroll-driven text layers
  const mppLayerRef = useRef<HTMLDivElement>(null);
  const magicblocksLayerRef = useRef<HTMLDivElement>(null);
  const aiAgentsLayerRef = useRef<HTMLDivElement>(null);
  const easyPlayLayerRef = useRef<HTMLDivElement>(null);

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
        opacity: 1, duration: 0.8, ease: 'power2.out',
      }, 0);

      // Character-level title entrance
      const chars = titleRef.current?.querySelectorAll('.hero-char');
      if (chars?.length) {
        entranceTl.fromTo(chars,
          { opacity: 0, y: 50, rotationX: -60, scale: 0.6 },
          {
            opacity: 1, y: 0, rotationX: 0, scale: 1,
            duration: 0.9,
            stagger: 0.035,
            ease: 'back.out(1.7)',
          },
          0.15,
        );
      }

      // Tagline
      entranceTl.to(taglineRef.current!, {
        opacity: 1, y: 0, letterSpacing: '0.12em',
        duration: 0.8, ease: 'power3.out',
      }, 0.6);

      // Buttons
      entranceTl.to(buttonsRef.current!, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.7, ease: 'back.out(1.5)',
      }, 0.8);

      // Scroll hint
      entranceTl.to(scrollHintRef.current!, {
        opacity: 0.7, duration: 0.6,
      }, 1.2);
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
          end: '+=600%',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            scrollProgress.current = self.progress;
          },
        },
      });

      // Phase 1 (0–0.08): Hide scroll hint, vignette intensifies — Dark Frame Rule
      tl.to(scrollHintRef.current!, { opacity: 0, duration: 0.06 }, 0);
      tl.fromTo(vignetteRef.current!,
        { opacity: 0.3 },
        { opacity: 0.85, duration: 0.5 },
        0.05,
      );

      // Phase 2 (0.06–0.18): Initial title/tagline exit
      tl.to(contentRef.current!, {
        opacity: 0, y: -100, scale: 0.85,
        duration: 0.12, ease: 'power3.in',
      }, 0.06);

      const titleChars = titleRef.current?.querySelectorAll('.hero-char');
      if (titleChars?.length) {
        tl.to(titleChars, {
          opacity: 0, y: -50, rotationX: 45, scale: 0.7,
          duration: 0.1, stagger: 0.005, ease: 'power2.in',
        }, 0.08);
      }

      // ===== Layer 1: MPP (Machine Payment Protocol) =====
      tl.fromTo(mppLayerRef.current!,
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.12, ease: 'power3.out' },
        0.20,
      );
      tl.fromTo('.mpp-line',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.04, duration: 0.08, ease: 'power2.out' },
        0.23,
      );
      tl.to(mppLayerRef.current!, {
        y: -80, opacity: 0, scale: 0.88,
        duration: 0.1, ease: 'power3.in',
      }, 0.36);

      // ===== Layer 2: MagicBlocks Private Transactions =====
      tl.fromTo(magicblocksLayerRef.current!,
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.12, ease: 'power3.out' },
        0.40,
      );
      tl.fromTo('.magicblocks-line',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.04, duration: 0.08, ease: 'power2.out' },
        0.43,
      );
      tl.to(magicblocksLayerRef.current!, {
        y: -80, opacity: 0, scale: 0.88,
        duration: 0.1, ease: 'power3.in',
      }, 0.54,
      );

      // ===== Layer 3: AI Agents Can Play =====
      tl.fromTo(aiAgentsLayerRef.current!,
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.12, ease: 'power3.out' },
        0.58,
      );
      tl.fromTo('.ai-agents-line',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.04, duration: 0.08, ease: 'power2.out' },
        0.61,
      );
      tl.to(aiAgentsLayerRef.current!, {
        y: -80, opacity: 0, scale: 0.88,
        duration: 0.1, ease: 'power3.in',
      }, 0.72,
      );

      // ===== Layer 4: Easy to Play (Grand CTA) =====
      tl.fromTo(easyPlayLayerRef.current!,
        { y: 120, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.14, ease: 'elastic.out(1, 0.7)' },
        0.76,
      );

      tl.fromTo('.cta-divider',
        { scaleX: 0 },
        { scaleX: 1, stagger: 0.04, duration: 0.08, ease: 'power3.out' },
        0.78,
      );

      tl.fromTo('.cta-subtitle',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.04, duration: 0.08, ease: 'power2.out' },
        0.80,
      );

      tl.fromTo('.cta-buttons',
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.1, ease: 'back.out(1.8)' },
        0.84,
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

        {/* Vignette — Dark Frame Rule: stronger base for text readability */}
        <div
          ref={vignetteRef}
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, transparent 25%, rgba(7,1,15,0.7) 100%)',
            opacity: 0.3,
          }}
        />

        {/* Bottom gradient — heavier fade for text contrast */}
        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background: 'linear-gradient(to top, rgba(7,1,15,0.7) 0%, transparent 30%, transparent 70%, rgba(7,1,15,0.3) 100%)',
          }}
        />

        {/* Center text backing — Focus Funnel: subtle dark zone behind text */}
        <div
          className="pointer-events-none absolute inset-0 z-[3]"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(7,1,15,0.35) 0%, transparent 55%)',
          }}
        />

        {/* ===== Initial Content (entrance animation) ===== */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-[5] flex flex-col items-center justify-center px-4 pointer-events-none"
          style={{ opacity: 0 }}
        >
          {/* Main Title */}
          <div className="mb-5 text-center" style={{ perspective: '800px' }}>
            <h1
              ref={titleRef}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter font-heading"
              style={{
                fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                background: 'linear-gradient(90deg, #ff4fd8, #6f42ff, #35f2ff, #ff9966, #ff4fd8)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradient-shift 4s linear infinite',
                filter: 'drop-shadow(0 0 40px rgba(255,79,216,0.35))',
              }}
            >
              {titleChars}
            </h1>
          </div>

          {/* Tagline */}
          <div
            ref={taglineRef}
            className="mb-10 text-center"
            style={{ opacity: 0, transform: 'translateY(25px)', letterSpacing: '0.4em' }}
          >
            <p
              className="text-lg sm:text-xl md:text-2xl font-light text-white/80"
              style={{ fontFamily: "'Inter', system-ui", textShadow: '0 2px 24px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.4)' }}
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
            <a href="https://x.com/0xUgly/status/2058998357671231974?s=20" target="_blank" rel="noopener noreferrer" className="btn-neon"><span>PLAY NOW</span></a>
          </div>
        </div>

        {/* ===== Scroll Layer 1: MPP (Machine Payment Protocol) ===== */}
        <div
          ref={mppLayerRef}
          className="absolute inset-0 z-[5] flex flex-col items-center justify-center px-6 pointer-events-none"
          style={{ opacity: 0 }}
        >
          <div className="max-w-3xl text-center">
            <div className="mb-4 mpp-line">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
                style={{
                  background: 'rgba(111,66,255,0.12)',
                  border: '1px solid rgba(111,66,255,0.35)',
                  color: '#a78bfa',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                MACHINE PAYMENT PROTOCOL
              </span>
            </div>

            {/* Single Glow Word Rule: "MPP" is the accent word, rest is solid white */}
            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 mpp-line font-heading text-white"
              style={{
                fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                textShadow: '0 2px 30px rgba(0,0,0,0.8)',
              }}
            >
              <span style={{ color: '#6f42ff', textShadow: '0 0 30px rgba(111,66,255,0.5)' }}>MPP</span>{' '}PROTOCOL
            </h2>

            <p className="text-lg sm:text-xl text-white/65 max-w-2xl mx-auto mb-6 mpp-line leading-relaxed"
              style={{ fontFamily: "'Inter', system-ui", textShadow: '0 2px 20px rgba(0,0,0,0.7), 0 0 30px rgba(0,0,0,0.3)' }}>
              Machine Payment Protocol enables seamless in-game micro-transactions.
              Every race, every upgrade, every reward settled instantly on-chain.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mpp-line">
              <div className="badge-pill">
                <span className="badge-icon">⚡</span> Instant Settlements
              </div>
              <div className="badge-pill">
                <span className="badge-icon">🔗</span> On-Chain Verified
              </div>
              <div className="badge-pill">
                <span className="badge-icon">🛡️</span> Zero Gas Fees
              </div>
            </div>
          </div>
        </div>

        {/* ===== Scroll Layer 2: MagicBlocks Private Transactions ===== */}
        <div
          ref={magicblocksLayerRef}
          className="absolute inset-0 z-[5] flex flex-col items-center justify-center px-6 pointer-events-none"
          style={{ opacity: 0 }}
        >
          <div className="max-w-3xl text-center">
            <div className="mb-4 magicblocks-line">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
                style={{
                  background: 'rgba(53,242,255,0.1)',
                  border: '1px solid rgba(53,242,255,0.3)',
                  color: '#35f2ff',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <path d="M3 9h18" />
                  <path d="M9 3v18" />
                </svg>
                PRIVATE INFRASTRUCTURE
              </span>
            </div>

            {/* Single Glow Word Rule: "MAGICBLOCKS" is the accent word */}
            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 magicblocks-line font-heading text-white"
              style={{
                fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                textShadow: '0 2px 30px rgba(0,0,0,0.8)',
              }}
            >
              PRIVATE{' '}<span style={{ color: '#35f2ff', textShadow: '0 0 30px rgba(53,242,255,0.5)' }}>BLOCKS</span>
            </h2>

            <p className="text-lg sm:text-xl text-white/65 max-w-2xl mx-auto mb-6 magicblocks-line leading-relaxed"
              style={{ fontFamily: "'Inter', system-ui", textShadow: '0 2px 20px rgba(0,0,0,0.7), 0 0 30px rgba(0,0,0,0.3)' }}>
              Private transactions powered by MagicBlocks. Your gameplay data stays yours.
              Encrypted race results, hidden strategies, confidential agent training.
            </p>

            {/* Focus Funnel: badges at lower opacity than description */}
            <div className="flex flex-wrap justify-center gap-3 magicblocks-line">
              <div className="badge-pill" style={{ background: 'rgba(53,242,255,0.05)', borderColor: 'rgba(53,242,255,0.15)', color: 'rgba(224,208,255,0.8)' }}>
                <span className="badge-icon">🔒</span> End-to-End Encrypted
              </div>
              <div className="badge-pill" style={{ background: 'rgba(53,242,255,0.05)', borderColor: 'rgba(53,242,255,0.15)', color: 'rgba(224,208,255,0.8)' }}>
                <span className="badge-icon">🧊</span> MagicBlocks Engine
              </div>
              <div className="badge-pill" style={{ background: 'rgba(53,242,255,0.05)', borderColor: 'rgba(53,242,255,0.15)', color: 'rgba(224,208,255,0.8)' }}>
                <span className="badge-icon">👁️</span> Zero-Knowledge Proofs
              </div>
            </div>
          </div>
        </div>

        {/* ===== Scroll Layer 3: AI Agents Can Play ===== */}
        <div
          ref={aiAgentsLayerRef}
          className="absolute inset-0 z-[5] flex flex-col items-center justify-center px-6 pointer-events-none"
          style={{ opacity: 0 }}
        >
          <div className="max-w-3xl text-center">
            <div className="mb-4 ai-agents-line">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
                style={{
                  background: 'rgba(125,255,114,0.1)',
                  border: '1px solid rgba(125,255,114,0.3)',
                  color: '#7dff72',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
                  <path d="M16 4l2-2" />
                  <path d="M8 4L6 2" />
                </svg>
                AUTONOMOUS RACING
              </span>
            </div>

            {/* Single Glow Word Rule: "AGENTS" is the accent word */}
            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 ai-agents-line font-heading text-white"
              style={{
                fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                textShadow: '0 2px 30px rgba(0,0,0,0.8)',
              }}
            >
              AI{' '}<span style={{ color: '#7dff72', textShadow: '0 0 30px rgba(125,255,114,0.5)' }}>AGENTS</span>{' '}PLAY
            </h2>

            <p className="text-lg sm:text-xl text-white/65 max-w-2xl mx-auto mb-6 ai-agents-line leading-relaxed"
              style={{ fontFamily: "'Inter', system-ui", textShadow: '0 2px 20px rgba(0,0,0,0.7), 0 0 30px rgba(0,0,0,0.3)' }}>
              Train autonomous AI agents that race 24/7 on your behalf.
              They learn, adapt, and earn while you sleep. Your agent. Your strategy.
            </p>

            <div className="flex flex-wrap justify-center gap-3 ai-agents-line">
              <div className="badge-pill badge-green">
                <span className="badge-icon">🧠</span> Self-Learning
              </div>
              <div className="badge-pill badge-green">
                <span className="badge-icon">⚔️</span> Agent vs Agent
              </div>
              <div className="badge-pill badge-green">
                <span className="badge-icon">💰</span> Earn 24/7
              </div>
            </div>
          </div>
        </div>

        {/* ===== Scroll Layer 4: Easy to Play (Grand CTA) ===== */}
        <div
          ref={easyPlayLayerRef}
          className="absolute inset-0 z-[5] flex flex-col items-center justify-center px-6 pointer-events-none"
          style={{ opacity: 0 }}
        >
          <div className="max-w-4xl text-center">
            {/* Single Glow Word Rule: "PLAY" is the accent word. Display size, solid white + one glow. */}
            <h2
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-5 cta-subtitle font-heading text-white"
              style={{
                fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                textShadow: '0 4px 40px rgba(0,0,0,0.85)',
              }}
            >
              CRASH{' '}<span style={{ color: '#ff4fd8', textShadow: '0 0 40px rgba(255,79,216,0.5)' }}>DASH</span>
            </h2>

            <p className="text-lg sm:text-xl text-white/65 max-w-xl mx-auto mb-5 cta-subtitle"
              style={{ fontFamily: "'Inter', system-ui", textShadow: '0 2px 20px rgba(0,0,0,0.7), 0 0 30px rgba(0,0,0,0.3)' }}>
              No complex setup. No steep learning curve. Jump in, race, and earn.
            </p>

            <div className="flex flex-col items-center gap-3 mb-8">
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
              <a href="https://x.com/0xUgly/status/2058998357671231974?s=20" target="_blank" rel="noopener noreferrer" className="btn-neon btn-large">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="8,5 20,12 8,19" />
                </svg>
                <span>START PLAYING</span>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-8 left-1/2 z-[5] flex flex-col items-center gap-2"
          style={{ transform: 'translateX(-50%)', animation: 'scroll-bounce-anim 2s ease-in-out infinite', opacity: 0 }}
        >
          <span className="text-xs text-white/50 tracking-[0.3em] font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif", textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}>
            SCROLL TO EXPLORE
          </span>
          <svg width="20" height="24" viewBox="0 0 20 24" fill="none" stroke="rgba(53,242,255,0.5)" strokeWidth="1.5">
            <path d="M5 9l5 5 5-5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
