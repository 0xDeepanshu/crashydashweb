'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { num: '01', title: 'SELECT TRACK', desc: 'Pick a world — Neon Desert, Cyber City, or Midnight Highway.', icon: '🎯' },
  { num: '02', title: 'TRAIN AGENT', desc: 'Your AI agent learns via reinforcement learning through thousands of runs.', icon: '🧠' },
  { num: '03', title: 'DEPLOY & COMPETE', desc: 'Send it into live races. It earns XP, tokens, and leaderboard reputation.', icon: '⚔️' },
  { num: '04', title: 'EARN REWARDS', desc: 'Win races, collect CRSH tokens, and rent your agent to other players.', icon: '🪙' },
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
          duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        },
      );

      // Steps with left-to-right stagger
      gsap.fromTo('.agent-step',
        { opacity: 0, x: -40, scale: 0.95 },
        {
          opacity: 1, x: 0, scale: 1,
          stagger: 0.15, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: stepsContainerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        },
      );

      // Number pop-in
      gsap.fromTo('.agent-step-num',
        { scale: 0, rotation: -90 },
        {
          scale: 1, rotation: 0,
          stagger: 0.15, duration: 0.6, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: stepsContainerRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
        },
      );

      // Connector lines draw in
      gsap.fromTo('.agent-connector',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1, stagger: 0.15, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: stepsContainerRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
        },
      );

      // Hover effect
      document.querySelectorAll('.agent-step').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          gsap.to(el, { y: -5, scale: 1.02, duration: 0.3, ease: 'power2.out' });
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(el, { y: 0, scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.6)' });
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-[10] py-24 sm:py-32 px-4 sm:px-8 overflow-hidden"
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
              background: `radial-gradient(circle, rgba(125,255,114,${0.03 + i * 0.01}) 0%, transparent 70%)`,
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
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white"
            style={{ fontFamily: 'ui-sans-serif, system-ui' }}
          >
            AI <span style={{ color: '#7dff72', textShadow: '0 0 25px rgba(125,255,114,0.5)' }}>AGENTS</span>
          </h2>
          <p className="mt-4 text-lg text-white/50 font-light max-w-xl mx-auto">
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
                  <div className="h-[1px] bg-gradient-to-r from-green-400/20 to-transparent" style={{ borderColor: 'rgba(125,255,114,0.2)' }} />
                </div>
              )}

              <div className="panel-glass p-6" style={{ borderColor: 'rgba(125,255,114,0.15)' }}>
                <div className="agent-step-num inline-flex items-center justify-center rounded-full mb-4"
                  style={{
                    width: '48px',
                    height: '48px',
                    background: 'rgba(125,255,114,0.1)',
                    border: '1px solid rgba(125,255,114,0.3)',
                    color: '#7dff72',
                    fontFamily: 'VT323, monospace',
                    fontSize: '1.25rem',
                  }}
                >
                  {step.num}
                </div>

                <div className="text-3xl mb-3">{step.icon}</div>
                <h3 className="font-vt323 text-xl text-white tracking-wider mb-2">{step.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
