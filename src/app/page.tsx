'use client';

import { SmoothScroll } from '@/components/SmoothScroll';
import { HeroCanvas } from '@/components/hero/HeroCanvas';
import { FeaturesSection } from '@/components/features/FeaturesSection';
import { BlockchainSection } from '@/components/BlockchainSection';
import { AIAgentsSection } from '@/components/AIAgentsSection';
import { WorldsSection } from '@/components/worlds/WorldsSection';
import { Footer } from '@/components/Footer';
import XPlayerCardSection from '@/components/XPlayerCardSection';
export default function Home() {
  return (
    <SmoothScroll>
      <main>
        {/* Scanline overlay */}
        <div className="scanline-overlay" />

        {/* Hero: pinned frame-scroll + scroll-driven text layers */}
        <HeroCanvas />

        <XPlayerCardSection />

        {/* Section divider */}
        <div className="section-divider" />



        {/* AI Agents: train, deploy, earn */}
        <AIAgentsSection />

        {/* Section divider */}
        <div className="section-divider" />

        {/* Worlds showcase */}
        <WorldsSection />

        {/* Footer */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
