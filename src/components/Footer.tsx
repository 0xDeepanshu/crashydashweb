'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(logoRef.current,
        { opacity: 0, y: 40, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 88%', toggleActions: 'play none none reverse' },
        },
      );

      gsap.fromTo('.footer-link',
        { opacity: 0, y: 15 },
        {
          opacity: 1, y: 0,
          stagger: 0.08, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 85%', toggleActions: 'play none none reverse' },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} className="relative z-[10] py-24 px-4 text-center" style={{ background: 'rgba(7,1,15,0.98)' }}>
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="max-w-5xl mx-auto">
        <h3 ref={logoRef} className="text-4xl sm:text-5xl font-black tracking-tight mb-5 font-heading" style={{ opacity: 0 }}>
          <span className="text-gradient-animated" style={{
            background: 'linear-gradient(90deg, #ff4fd8, #6f42ff, #35f2ff, #ff9966, #ff4fd8)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
          }}>
            CRASHY DASH
          </span>
        </h3>
        <p className="text-white/35 text-sm font-light mb-10 leading-relaxed"
           style={{ fontFamily: "'Inter', system-ui" }}>
          Blockchain-native voxel racing with AI agents. Own. Race. Earn.
        </p>

        <div className="flex flex-wrap justify-center gap-8 text-sm text-white/40 mb-10"
             style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
          <a href="#" className="footer-link hover:text-neon-pink transition-colors duration-300">Discord</a>
          <a href="#" className="footer-link hover:text-neon-cyan transition-colors duration-300">Twitter</a>
          <a href="#" className="footer-link hover:text-synth-purple transition-colors duration-300">Whitepaper</a>
          <a href="#" className="footer-link hover:text-synth-orange transition-colors duration-300">Community</a>
          <a href="#" className="footer-link hover:text-neon-cyan transition-colors duration-300">Docs</a>
          <a href="#" className="footer-link hover:text-neon-pink transition-colors duration-300">GitHub</a>
        </div>

        <div className="text-white/15 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          &copy; 2026 CRASHY DASH. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
