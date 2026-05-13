'use client';

import { useEffect, useRef } from 'react';

const COLORS = ['#ff4fd8', '#35f2ff', '#6f42ff', '#7dff72', '#ff9966', '#ffffff'];

/**
 * Canvas-based floating dust / starfield particles.
 * Lightweight — ~30 particles max, depth-based drift.
 * DPR-aware for crisp rendering on HiDPI screens.
 */

export function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;

    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let W = 0;
    let H = 0;
    let dpr = 1;

    interface P {
      x: number;
      y: number;
      vx: number;
      vy: number;
      s: number;    // size
      color: string;
      life: number;
      maxLife: number;
    }

    const particles: P[] = [];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      (cvs as HTMLCanvasElement).width = W * dpr;
      (cvs as HTMLCanvasElement).height = H * dpr;
      (cvs as HTMLCanvasElement).style.width = W + 'px';
      (cvs as HTMLCanvasElement).style.height = H + 'px';
      (ctx as CanvasRenderingContext2D).setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener('resize', resize);

    function spawn() {
      if (particles.length >= 30) return;
      particles.push({
        x: Math.random() * W,
        y: H + 10,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(0.2 + Math.random() * 0.5),
        s: 1 + Math.random() * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 0,
        maxLife: 300 + Math.random() * 400,
      });
    }

    let tick = 0;

    function draw() {
      const c = ctx as CanvasRenderingContext2D;
      c.clearRect(0, 0, W, H);

      if (tick % 3 === 0) spawn();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx + Math.sin(tick * 0.008 + i) * 0.15;
        p.y += p.vy;
        p.life++;

        const r = p.life / p.maxLife;
        const alpha = r < 0.1 ? r / 0.1 : r > 0.8 ? 1 - (r - 0.8) / 0.2 : 1;

        c.globalAlpha = alpha * 0.5;
        c.fillStyle = p.color;
        c.fillRect(p.x, p.y, p.s, p.s);

        if (p.life >= p.maxLife || p.y < -20) particles.splice(i, 1);
      }

      c.globalAlpha = 1;
      tick++;
      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 2 }}
    />
  );
}
