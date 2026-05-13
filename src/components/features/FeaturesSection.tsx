'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: '🔗',
    title: 'ON-CHAIN RECORDS',
    desc: 'Every run, score, and crash is immutably recorded. Verifiable gameplay you can prove to anyone.',
    accent: '#6f42ff',
  },
  {
    icon: '🤖',
    title: 'AI AGENT TRAINING',
    desc: 'Train autonomous agents to learn tracks, master drifts, and compete in AI-vs-AI tournaments.',
    accent: '#7dff72',
  },
  {
    icon: '👥',
    title: 'MPP MULTIPLAYER',
    desc: 'Multi-Party Protocol enables real-time 8-player races with on-chain state sync.',
    accent: '#ff4fd8',
  },
  {
    icon: '🏦',
    title: 'WALLET NATIVE',
    desc: 'Connect your wallet for true asset ownership. NFT vehicles, tokens, and on-chain cosmetics.',
    accent: '#35f2ff',
  },
];

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      headingTl
        .fromTo(headingRef.current,
          { opacity: 0, y: 60, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' },
        )
        .fromTo(descRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.5',
        );

      // Stagger cards with 3D entrance
      gsap.fromTo('.feature-card',
        { opacity: 0, y: 80, rotationX: -15, scale: 0.9 },
        {
          opacity: 1, y: 0, rotationX: 0, scale: 1,
          duration: 0.9,
          stagger: { each: 0.15, from: 'start' },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      // Icon bounce-in
      gsap.fromTo('.feature-icon',
        { scale: 0, rotation: -20 },
        {
          scale: 1, rotation: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'elastic.out(1, 0.4)',
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      // Neon line reveal
      gsap.fromTo('.neon-line-anim',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      // GSAP-powered hover tilt for cards
      cardRefs.current.forEach((card) => {
        if (!card) return;

        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          gsap.to(card, {
            rotationY: x * 12,
            rotationX: -y * 12,
            duration: 0.4,
            ease: 'power2.out',
            transformPerspective: 600,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)',
          });
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-[10] py-24 sm:py-32 px-4 sm:px-8" style={{ background: 'rgba(7,1,15,0.85)' }}>
      {/* Top fade blend */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, rgba(7,1,15,0.85))' }} />

      <div className="max-w-5xl mx-auto text-center">
        <div ref={headingRef} className="mb-4">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white"
            style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}
          >
            MORE THAN A <span className="text-neon-cyan" style={{ textShadow: '0 0 20px rgba(53,242,255,0.5)' }}>GAME</span>
          </h2>
        </div>
        <p ref={descRef} className="text-lg text-white/50 font-light max-w-xl mx-auto mb-16">
          Blockchain-native racing with AI agents, wallet-based ownership, and decentralized multiplayer.
        </p>

        <div ref={cardsContainerRef} className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6" style={{ perspective: '800px' }}>
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              ref={el => { cardRefs.current[i] = el; }}
              className="feature-card panel-glass p-6 group cursor-default"
              style={{
                borderColor: `${f.accent}20`,
                transition: 'border-color 0.3s, box-shadow 0.3s',
                willChange: 'transform',
                transformStyle: 'preserve-3d',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = `${f.accent}40`;
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px ${f.accent}20, 0 12px 40px rgba(0,0,0,0.5)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = `${f.accent}20`;
                (e.currentTarget as HTMLDivElement).style.boxShadow = '';
              }}
            >
              <div className="feature-icon text-4xl mb-4" style={{ willChange: 'transform' }}>{f.icon}</div>
              <h3 className="font-vt323 text-xl text-white mb-2 tracking-wider">{f.title}</h3>
              <p className="text-white/50 text-sm font-light leading-relaxed">{f.desc}</p>
              <div className="neon-line-anim mt-4" style={{ '--accent': f.accent, transformOrigin: 'left center' } as React.CSSProperties} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
