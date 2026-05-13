'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WORLDS = [
  {
    name: 'NEON DESERT',
    subtitle: 'Voxel sand dunes & synthwave sunsets',
    gradient: 'linear-gradient(135deg, #1a0030, #ff4f38)',
    accent: '#ff4fd8',
    emoji: '🏜️',
  },
  {
    name: 'CYBER CITY',
    subtitle: 'Pixel neon towers & holographic billboards',
    gradient: 'linear-gradient(135deg, #0a0018, #6f42ff)',
    accent: '#35f2ff',
    emoji: '🌃',
  },
  {
    name: 'MIDNIGHT HIGHWAY',
    subtitle: 'Endless road of light through the void',
    gradient: 'linear-gradient(135deg, #07010f, #35f2ff)',
    accent: '#ffffff',
    emoji: '🌌',
  },
  {
    name: 'LAVA CANYON',
    subtitle: 'Molten pixel rivers & crumbling bridges',
    gradient: 'linear-gradient(135deg, #1a0000, #ff6b35)',
    accent: '#ff9966',
    emoji: '🌋',
  },
];

export function WorldsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading reveal with scale pulse
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 1.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      // Cards stagger with 3D depth entrance
      const cards = Array.from(trackRef.current?.querySelectorAll('.world-card') || []);
      gsap.fromTo(cards,
        { opacity: 0, y: 100, scale: 0.85, rotationY: 12 },
        {
          opacity: 1, y: 0, scale: 1, rotationY: 0,
          stagger: { each: 0.1, from: 'start' },
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      // Emoji float-up entrance
      gsap.fromTo('.world-emoji',
        { y: 40, scale: 0, rotation: -10 },
        {
          y: 0, scale: 1, rotation: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      // GSAP hover effects for cards
      cardRefs.current.forEach((card) => {
        if (!card) return;

        const emoji = card.querySelector('.world-emoji');
        const info = card.querySelector('.world-info');

        const handleEnter = () => {
          gsap.to(card, {
            scale: 1.04, y: -10,
            duration: 0.4, ease: 'power2.out',
          });
          if (emoji) {
            gsap.to(emoji, {
              scale: 1.15, rotation: 5, y: -10,
              duration: 0.5, ease: 'back.out(1.5)',
            });
          }
          if (info) {
            gsap.to(info, {
              y: -4, duration: 0.3, ease: 'power2.out',
            });
          }
        };

        const handleLeave = () => {
          gsap.to(card, {
            scale: 1, y: 0,
            duration: 0.5, ease: 'elastic.out(1, 0.6)',
          });
          if (emoji) {
            gsap.to(emoji, {
              scale: 1, rotation: 0, y: 0,
              duration: 0.5, ease: 'elastic.out(1, 0.6)',
            });
          }
          if (info) {
            gsap.to(info, {
              y: 0, duration: 0.4, ease: 'power2.out',
            });
          }
        };

        card.addEventListener('mouseenter', handleEnter);
        card.addEventListener('mouseleave', handleLeave);
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-[10] py-28 sm:py-36 px-4 sm:px-8" style={{ background: 'rgba(7,1,15,0.95)' }}>
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, rgba(7,1,15,0.95))' }} />
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to top, transparent, rgba(7,1,15,0.95))' }} />

      <div ref={headingRef} className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white font-heading"
            style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}>
          WORLDS TO <span className="text-neon-cyan" style={{ textShadow: '0 0 25px rgba(53,242,255,0.5)' }}>CONQUER</span>
        </h2>
        <p className="mt-5 text-lg text-white/40 font-light max-w-xl mx-auto leading-relaxed"
           style={{ fontFamily: "'Inter', system-ui" }}>
          Each world is a handcrafted voxel playground of deadly beauty.
        </p>
      </div>

      <div ref={trackRef} className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" style={{ perspective: '1000px' }}>
        {WORLDS.map((w, i) => (
          <div
            key={w.name}
            ref={el => { cardRefs.current[i] = el; }}
            className="world-card relative rounded-2xl overflow-hidden cursor-pointer"
            style={{
              aspectRatio: '3/4',
              border: `1px solid ${w.accent}15`,
              willChange: 'transform',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Gradient background */}
            <div className="absolute inset-0" style={{ background: w.gradient }} />

            {/* Decorative radial glow */}
            <div
              className="absolute inset-0 opacity-15"
              style={{ background: `radial-gradient(circle at 50% 80%, ${w.accent}20 0%, transparent 60%)` }}
            />

            {/* Emoji art */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="world-emoji text-7xl sm:text-8xl"
                style={{ filter: `drop-shadow(0 0 30px ${w.accent}40)`, willChange: 'transform' }}
              >
                {w.emoji}
              </span>
            </div>

            {/* Bottom info */}
            <div className="world-info absolute bottom-0 left-0 right-0 p-5" style={{ background: 'linear-gradient(to top, rgba(7,1,15,0.9) 0%, transparent 100%)' }}>
              <h3 className="text-base font-bold text-white tracking-wide mb-1 font-heading"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{w.name}</h3>
              <p className="text-white/35 text-xs font-light"
                 style={{ fontFamily: "'Inter', system-ui" }}>{w.subtitle}</p>
            </div>

            {/* Hover glow */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ boxShadow: `inset 0 0 40px ${w.accent}15, 0 0 25px ${w.accent}08` }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
