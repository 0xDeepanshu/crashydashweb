'use client';

import { HeroCanvas } from '@/components/hero/HeroCanvas';
import { FeaturesSection } from '@/components/features/FeaturesSection';
import { BlockchainSection } from '@/components/BlockchainSection';
import { AIAgentsSection } from '@/components/AIAgentsSection';
import { WorldsSection } from '@/components/worlds/WorldsSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main>
      {/* Scanline overlay */}
      <div className="scanline-overlay" />

      {/* Hero: pinned frame-scroll + scroll-driven text layers */}
      <HeroCanvas />

      {/* Features: the pillars of the game */}
      <FeaturesSection />

      {/* Section divider */}
      <div className="section-divider" />

      {/* Blockchain: on-chain gameplay */}
      <BlockchainSection />

      {/* AI Agents: train, deploy, earn */}
      <AIAgentsSection />

      {/* Section divider */}
      <div className="section-divider" />

      {/* Worlds showcase */}
      <WorldsSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
