'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { num: '01', title: 'CONNECT WALLET', desc: 'Link your wallet in one click — Phantom, MetaMask, or any EVM-compatible wallet.', icon: '🔗' },
  { num: '02', title: 'TRAIN AGENT', desc: 'Your AI agent learns via reinforcement learning through thousands of autonomous runs.', icon: '🧠' },
  { num: '03', title: 'DEPLOY & RACE', desc: 'Send it into live races. AI agents compete 24/7 on tracks worldwide.', icon: '⚔️' },
  { num: '04', title: 'EARN REWARDS', desc: 'Win races, collect tokens via MPP, and earn from private MagicBlocks transactions.', icon: '💰' },
];

export function AIAgentsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 82%', toggleActions: 'play none none reverse' },
        },
      );

      // Steps with left-to-right stagger
      gsap.fromTo('.agent-step',
        { opacity: 0, x: -40, scale: 0.95 },
        {
          opacity: 1, x: 0, scale: 1,
          stagger: 0.12, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: stepsContainerRef.current, start: 'top 82%', toggleActions: 'play none none reverse' },
        },
      );

      // Number pop-in
      gsap.fromTo('.agent-step-num',
        { scale: 0, rotation: -90 },
        {
          scale: 1, rotation: 0,
          stagger: 0.12, duration: 0.7, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: stepsContainerRef.current, start: 'top 78%', toggleActions: 'play none none reverse' },
        },
      );

      // Connector lines draw in
      gsap.fromTo('.agent-connector',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1, stagger: 0.12, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: stepsContainerRef.current, start: 'top 72%', toggleActions: 'play none none reverse' },
        },
      );

      // Hover effect
      document.querySelectorAll('.agent-step').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          gsap.to(el, { y: -6, scale: 1.02, duration: 0.35, ease: 'power2.out' });
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(el, { y: 0, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.6)' });
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-[10] py-28 sm:py-36 px-4 sm:px-8 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, rgba(7,1,15,0.98) 0%, rgba(2,10,5,0.95) 50%, rgba(7,1,15,0.98) 100%)' }}>

      {/* Decorative floating dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="rounded-full glow-pulse"
            style={{
              position: 'absolute',
              width: `${40 + i * 30}px`,
              height: `${40 + i * 30}px`,
              background: `radial-gradient(circle, rgba(125,255,114,${0.02 + i * 0.008}) 0%, transparent 70%)`,
              top: `${10 + i * 15}%`,
              left: `${5 + i * 18}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-[1]">
        <div ref={headingRef} className="text-center mb-16">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white font-heading"
            style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
          >
            AI <span style={{ color: '#7dff72', textShadow: '0 0 30px rgba(125,255,114,0.5)' }}>AGENTS</span>
          </h2>
          <p className="mt-5 text-lg text-white/40 font-light max-w-xl mx-auto leading-relaxed"
             style={{ fontFamily: "'Inter', system-ui" }}>
            Train, deploy, and earn with autonomous AI agents that race on your behalf.
          </p>
        </div>

        <div ref={stepsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <div key={step.num} className="agent-step relative">
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="absolute top-8 right-0 translate-x-1/2 w-full hidden lg:block agent-connector"
                  style={{ width: 'calc(100% - 32px)', left: '50%' }}>
                  <div className="h-[1px] bg-gradient-to-r from-green-400/15 to-transparent" style={{ borderColor: 'rgba(125,255,114,0.15)' }} />
                </div>
              )}

              <div className="panel-glass p-7" style={{ borderColor: 'rgba(125,255,114,0.1)' }}>
                <div className="agent-step-num inline-flex items-center justify-center rounded-full mb-5"
                  style={{
                    width: '48px',
                    height: '48px',
                    background: 'rgba(125,255,114,0.08)',
                    border: '1px solid rgba(125,255,114,0.25)',
                    color: '#7dff72',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '1rem',
                    fontWeight: 600,
                  }}
                >
                  {step.num}
                </div>

                <div className="text-3xl mb-4">{step.icon}</div>
                <h3 className="text-base font-bold text-white tracking-wide mb-2 font-heading"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{step.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed"
                   style={{ fontFamily: "'Inter', system-ui" }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
