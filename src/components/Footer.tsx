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
        {
          opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out',
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
            CRASH DASH
          </span>
        </h3>


        <div className="flex justify-center mb-10">
          <a
            href="https://x.com/intent/tweet?text=Stack%20blocks.%20Beat%20your%20friends.%20Earn%20onchain.%20%F0%9F%8E%AE%E2%9A%A1%0A%0APlay%20directly%20in%20your%20feed%20%F0%9F%91%87%0Ahttps%3A%2F%2Fstackmon.fun"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-sm text-white/50 hover:text-white transition-all duration-300 border border-white/8 hover:border-white/20 hover:bg-white/5"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Post & Play
          </a>
        </div>


      </div>
    </footer>
  );
}

