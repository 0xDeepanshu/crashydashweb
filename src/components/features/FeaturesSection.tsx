'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: '⚡',
    title: 'MPP PAYMENTS',
    desc: 'Machine Payment Protocol for instant, gasless micro-transactions settled on-chain in real-time.',
    accent: '#6f42ff',
  },
  {
    icon: '🤖',
    title: 'AI AGENT RACING',
    desc: 'Train autonomous agents that learn tracks, master drifts, and compete 24/7 while you earn.',
    accent: '#7dff72',
  },
  {
    icon: '🔒',
    title: 'MAGICBLOCKS',
    desc: 'Private transactions powered by MagicBlocks. Encrypted race data, confidential strategies.',
    accent: '#35f2ff',
  },
  {
    icon: '🎮',
    title: 'EASY TO PLAY',
    desc: 'No complex setup. Connect wallet, pick your ride, and hit the road in under 30 seconds.',
    accent: '#ff4fd8',
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
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      headingTl
        .fromTo(headingRef.current,
          { opacity: 0, y: 60, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'power3.out' },
        )
        .fromTo(descRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' },
          '-=0.6',
        );

      // Stagger cards with 3D entrance
      gsap.fromTo('.feature-card',
        { opacity: 0, y: 80, rotationX: -12, scale: 0.92 },
        {
          opacity: 1, y: 0, rotationX: 0, scale: 1,
          duration: 1,
          stagger: { each: 0.12, from: 'start' },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      // Icon bounce-in
      gsap.fromTo('.feature-icon',
        { scale: 0, rotation: -15 },
        {
          scale: 1, rotation: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'elastic.out(1, 0.4)',
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      // Neon line reveal
      gsap.fromTo('.neon-line-anim',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 72%',
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
            rotationY: x * 10,
            rotationX: -y * 10,
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
    <section ref={sectionRef} className="relative z-[10] py-28 sm:py-36 px-4 sm:px-8" style={{ background: 'rgba(7,1,15,0.85)' }}>
      {/* Top fade blend */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, rgba(7,1,15,0.85))' }} />

      <div className="max-w-5xl mx-auto text-center">
        <div ref={headingRef} className="mb-5">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white font-heading"
            style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
          >
            MORE THAN A <span className="text-neon-cyan" style={{ textShadow: '0 0 25px rgba(53,242,255,0.5)' }}>GAME</span>
          </h2>
        </div>
        <p ref={descRef} className="text-lg text-white/45 font-light max-w-xl mx-auto mb-16 leading-relaxed"
           style={{ fontFamily: "'Inter', system-ui" }}>
          Blockchain-native racing with AI agents, private transactions, and instant payments.
        </p>

        <div ref={cardsContainerRef} className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6" style={{ perspective: '800px' }}>
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              ref={el => { cardRefs.current[i] = el; }}
              className="feature-card panel-glass p-7 group cursor-default"
              style={{
                borderColor: `${f.accent}15`,
                willChange: 'transform',
                transformStyle: 'preserve-3d',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = `${f.accent}35`;
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px ${f.accent}15, 0 12px 40px rgba(0,0,0,0.5)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = `${f.accent}15`;
                (e.currentTarget as HTMLDivElement).style.boxShadow = '';
              }}
            >
              <div className="feature-icon text-4xl mb-5" style={{ willChange: 'transform' }}>{f.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2 tracking-wide font-heading"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{f.title}</h3>
              <p className="text-white/45 text-sm font-light leading-relaxed"
                 style={{ fontFamily: "'Inter', system-ui" }}>{f.desc}</p>
              <div className="neon-line-anim mt-5" style={{ '--accent': f.accent, transformOrigin: 'left center' } as React.CSSProperties} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
