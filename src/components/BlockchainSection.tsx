'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOKENS = [
  { name: 'CRASH Token', symbol: '$CRSH', desc: 'Utility token for wagering, upgrades, and governance', icon: '🪙' },
  { name: 'Vehicle NFTs', symbol: 'ERC-721', desc: 'Unique voxel vehicles with stats, skins, and rarity', icon: '🏎️' },
  { name: 'Track Ownership', symbol: 'ERC-1155', desc: 'Own, rent, and monetize custom world tracks', icon: '🌍' },
];

export function BlockchainSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const statsRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading split-line reveal
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        },
      );

      // Cards stagger
      gsap.fromTo('.blockchain-card',
        { opacity: 0, y: 60, scale: 0.92 },
        {
          opacity: 1, y: 0, scale: 1,
          stagger: 0.12, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: cardsContainerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        },
      );

      // Stats counter scale-in
      gsap.fromTo('.stat-card',
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1,
          stagger: 0.1, duration: 0.7, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: statsRowRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        },
      );

      // Hexagonal decorative rotation on hover
      document.querySelectorAll('.blockchain-card').forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { scale: 1.03, y: -5, duration: 0.3, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { scale: 1, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.6)' });
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-[10] py-24 sm:py-32 px-4 sm:px-8 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, rgba(7,1,15,0.95) 0%, rgba(12,3,25,0.98) 50%, rgba(7,1,15,0.95) 100%)' }}>

      {/* Decorative background hexagons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-20 -right-20 opacity-5" width="300" height="300" viewBox="0 0 100 100">
          <polygon points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5" fill="none" stroke="#6f42ff" strokeWidth="1" />
        </svg>
        <svg className="absolute bottom-20 -left-20 opacity-5" width="250" height="250" viewBox="0 0 100 100">
          <polygon points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5" fill="none" stroke="#ff4fd8" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-[1]">
        <div ref={headingRef} className="mb-16">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white"
            style={{ fontFamily: 'ui-sans-serif, system-ui' }}
          >
            BUILT ON <span style={{ color: '#6f42ff', textShadow: '0 0 25px rgba(111,66,255,0.5)' }}>BLOCKCHAIN</span>
          </h2>
          <p className="mt-4 text-lg text-white/50 font-light max-w-xl mx-auto">
            Full transparency. True ownership. Every asset is yours.
          </p>
        </div>

        {/* Token cards */}
        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {TOKENS.map((t) => (
            <div
              key={t.symbol}
              className="blockchain-card panel-glass p-6 cursor-default"
              style={{ borderColor: 'rgba(111,66,255,0.15)' }}
            >
              <div className="text-5xl mb-4">{t.icon}</div>
              <h3 className="font-vt323 text-xl text-white mb-1 tracking-wider">{t.name}</h3>
              <div className="text-xs font-mono mb-3" style={{ color: '#6f42ff' }}>{t.symbol}</div>
              <p className="text-white/45 text-sm leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div ref={statsRowRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="stat-card">
            <div className="text-3xl font-black text-neon-pink font-vt323">$2.4M</div>
            <div className="text-xs text-white/40 mt-1 font-mono">VOLUME TRADED</div>
          </div>
          <div className="stat-card">
            <div className="text-3xl font-black text-neon-cyan font-vt323">14.2K</div>
            <div className="text-xs text-white/40 mt-1 font-mono">ACTIVE WALLETS</div>
          </div>
          <div className="stat-card">
            <div className="text-3xl font-black text-synth-purple font-vt323">8,941</div>
            <div className="text-xs text-white/40 mt-1 font-mono">NFT VEHICLES</div>
          </div>
          <div className="stat-card">
            <div className="text-3xl font-black text-synth-orange font-vt323">247</div>
            <div className="text-xs text-white/40 mt-1 font-mono">AI AGENTS LIVE</div>
          </div>
        </div>
      </div>
    </section>
  );
}
