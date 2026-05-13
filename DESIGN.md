---
name: Crashy Dash
description: Blockchain-native voxel racing with AI agents. Own. Race. Earn.
colors:
  hot-magenta: "#ff4fd8"
  ultraviolet: "#6f42ff"
  electric-cyan: "#35f2ff"
  reactor-green: "#7dff72"
  sunset-amber: "#ff9966"
  void-black: "#07010f"
  lavender-white: "#f0e6ff"
  ghost-white: "#e0d0ff"
  wallet-lilac: "#a78bfa"
typography:
  display:
    fontFamily: "'Space Grotesk', 'Inter', sans-serif"
    fontSize: "clamp(3rem, 8vw, 8rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "'Space Grotesk', 'Inter', sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.75rem)"
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "'Space Grotesk', sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.04em"
  body:
    fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 300
    lineHeight: 1.625
    letterSpacing: "-0.01em"
  label:
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.06em"
rounded:
  sm: "2px"
  md: "10px"
  lg: "14px"
  xl: "16px"
  full: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section-y: "112px"
  section-y-sm: "144px"
components:
  button-primary:
    backgroundColor: "{colors.hot-magenta}"
    textColor: "{colors.void-black}"
    typography: "{typography.title}"
    rounded: "{rounded.md}"
    padding: "0.85rem 2.2rem"
  button-primary-hover:
    backgroundColor: "#ff6be5"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.electric-cyan}"
    rounded: "{rounded.md}"
    padding: "0.85rem 2.2rem"
  button-wallet:
    backgroundColor: "transparent"
    textColor: "{colors.wallet-lilac}"
    rounded: "{rounded.md}"
    padding: "0.85rem 2.2rem"
  panel-glass:
    backgroundColor: "rgba(7, 1, 15, 0.5)"
    rounded: "{rounded.xl}"
    padding: "1.75rem"
  badge-pill:
    backgroundColor: "rgba(111, 66, 255, 0.06)"
    textColor: "{colors.ghost-white}"
    rounded: "{rounded.full}"
    padding: "0.55rem 1.1rem"
  stat-card:
    backgroundColor: "rgba(7, 1, 15, 0.6)"
    rounded: "{rounded.lg}"
    padding: "1.5rem"
---

# Design System: Crashy Dash

## 1. Overview

**Creative North Star: "The Neon Runway"**

The visual system is built around the feeling of racing through illuminated lanes at night. Every surface is dark, every accent is a streak of light. The page scrolls like a game trailer: cinematic darkness punctuated by bursts of neon, guiding the eye forward through a story told in color and motion. The scroll itself is the gameplay metaphor; each section is a scene.

This system explicitly rejects generic SaaS landing pages, overly complex DeFi dashboards, and template-feeling crypto sites. No hero-metric templates. No identical card grids. No corporate blue gradients. No cookie-cutter "neon on black with hexagons" that every web3 project defaults to. The interface should feel immersive and playable, not corporate.

The personality is **playful, friendly, fast**. It's a racing game, not a financial instrument. Crypto complexity hides behind simple language. Every element earns its place by contributing to the narrative or driving the visitor toward the single action: go to Twitter and play.

**Key Characteristics:**
- Cinematic darkness as negative space; dark makes neon brighter
- Scroll-driven storytelling with GSAP + Lenis smooth scroll
- Glow-based depth (no drop shadows, never material-style elevation)
- Arcade-tactile component interactions (bouncy, responsive, physical)
- Three-font hierarchy: Space Grotesk (headings), Inter (body), JetBrains Mono (labels)
- Section composition like scenes in a game trailer
- Text readability always takes priority over visual effects

## 2. Colors: The Neon Runway Palette

Five saturated accents on a near-black canvas. The dark background makes every color feel brighter. Glows guide attention, not overpower content. Use contrast intentionally: negative space is what makes the neon work.

### Primary
- **Hot Magenta** (#ff4fd8): The CTA color. Primary buttons, neon glows, scrollbar thumb, section divider accents, the gradient-animated hero title. Used in `btn-neon` gradient (`#ff4fd8` to `#ff6be5`), glow halos (`box-shadow: 0 0 15px rgba(255,79,216,0.5)`), and the `panel-glass::before` edge highlight. The color that says "do this now."

### Secondary
- **Ultraviolet** (#6f42ff): The infrastructure color. Blockchain headings, glass panel glow aura, badge-pill default border, stat card hover glow, section divider gradient. Slightly cooler and deeper than Hot Magenta; it reads as "technical foundation" where Magenta reads as "action."
- **Electric Cyan** (#35f2ff): The highlight color. Section heading accent words ("GAME", "CONQUER"), outline button text and border, MagicBlocks layer gradient, scroll hint chevron. Used at lower opacity for subtle accents (badge borders at 20%, button hover glow at 30%).

### Tertiary
- **Reactor Green** (#7dff72): The AI color. AI Agents section heading glow, agent step number circles, badge-green variant, connector lines between steps. Signals autonomy, intelligence, growth. Used exclusively in the AI/agent context; never leaks into other sections.
- **Sunset Amber** (#ff9966): The warmth color. Stat counters (AI Agents Live), gradient title tertiary stop, world card accent (Lava Canyon). The rarest of the five; its warmth breaks the cool-dominant palette when needed.

### Neutral
- **Void Black** (#07010f): The canvas. Body background, glass panel base (`rgba(7,1,15,0.5)`), vignette target, scanline overlay base. Not pure black; the `0f` blue channel gives it a barely-perceptible violet undertone that makes the neon colors feel warmer by contrast.
- **Lavender White** (#f0e6ff): The text default. Body `color` value. A warm-violet tinted white that is softer than pure `#fff` on the dark canvas. Primary text uses `text-white` (full opacity); secondary text uses `text-white/45` to `text-white/55`.
- **Ghost White** (#e0d0ff): Badge pill text, low-emphasis labels. Slightly dimmer than Lavender White, with more purple saturation.
- **Wallet Lilac** (#a78bfa): Connect Wallet button text and border accent. Distinct from Ultraviolet; more pastel, less saturated. Signals "safe action" rather than "primary action."

### Named Rules
**The Glow Budget Rule.** Each section gets one primary glow source (the accent heading), one secondary glow source (a card or badge border on hover), and nothing more. Stacking three or more glows in the same viewport makes the page feel like a Christmas tree. Restrain.

**The 3% Opacity Floor.** Decorative background elements (hexagons, floating dots, radial gradients) never exceed 3% opacity (`opacity-[0.03]`). They're felt, not seen. If you can clearly identify the shape at arm's length, it's too bright.

## 3. Typography

**Display Font:** Space Grotesk (with Inter, sans-serif fallback)
**Body Font:** Inter (with ui-sans-serif, system-ui fallback)
**Label Font:** JetBrains Mono (with ui-monospace fallback)

**Character:** Space Grotesk brings geometric confidence to headings without the rigidity of a pure geometric sans. Its slightly quirky letterforms (the distinctive "G", the open "a") inject playfulness that matches the arcade personality. Inter provides invisible, readable body text that stays out of the way. JetBrains Mono for labels and technical identifiers (token symbols, stat labels) adds a terminal-native credibility to the blockchain layer.

### Hierarchy
- **Display** (900, clamp(3rem, 8vw, 8rem), line-height 1): Hero title "CRASHY DASH" and final CTA "EASY TO PLAY". Gradient-animated via `background-clip: text`. Only two instances on the entire page. Maximum two per screen, ever.
- **Headline** (900, clamp(2rem, 5vw, 3.75rem), line-height 1.1): Section headings ("MORE THAN A GAME", "BUILT ON BLOCKCHAIN", "AI AGENTS"). Includes a single accent-colored word with `text-shadow` glow. Letter-spacing -0.02em.
- **Title** (700, 1.125rem, line-height 1.4): Card headings, step titles, world names. All-caps with tracking-wide (0.04em). Space Grotesk only.
- **Body** (300, 0.875rem, line-height 1.625): Card descriptions, section subtitles. Inter font-light with -0.01em tracking. Max opacity varies by context: `text-white/45` for card descriptions, `text-white/55` for hero scroll layer descriptions, `text-white/80` for the main tagline.
- **Label** (400, 0.75rem, line-height 1.5): Stat labels ("VOLUME TRADED"), token symbols ("ERC-721"), technical identifiers. JetBrains Mono, all-caps, 0.06em tracking, `text-white/35` opacity.

### Named Rules
**The Single Glow Word Rule.** Each headline contains exactly one accent-colored word with a `text-shadow` glow (e.g., "MORE THAN A **GAME**"). The rest of the heading is solid white. Never glow the entire heading; it kills readability and wastes the accent's impact.

**The Opacity Ladder Rule.** Text opacity follows a strict ladder: 100% (headings), 80% (tagline), 55% (scroll layer descriptions), 45% (card descriptions), 40% (section subtitles), 35% (labels/mono). Never use an arbitrary opacity. If a new text role appears, slot it into this ladder.

## 4. Elevation: The Glow Layer

This system uses **glow, not shadow**. Depth comes from neon bloom, layered gradients, backdrop blur, atmospheric lighting, and subtle edge highlights. There are no Material-style drop shadows, no dense floating card stacks. The world feels illuminated, not physically stacked.

Three depth layers exist:

1. **Canvas** (z-0): The Void Black background. Flat, infinite, dark. Scanline overlay sits at z-9999 above everything as a texture film.
2. **Surface** (z-10): Sections, glass panels, cards. Elevated via `backdrop-filter: blur(24px) saturate(180%)` on a `rgba(7,1,15,0.5)` background. A 1px gradient top-edge (`panel-glass::before`) and an `inset 0 1px 0 rgba(255,255,255,0.04)` inner highlight create a ghost bevel. Border at `rgba(255,79,216,0.12)` provides a whisper of Hot Magenta containment.
3. **Focal** (z-5, within pinned hero): Scroll layer text overlays. No glass; pure text on vignette-darkened frame imagery. Readability via `text-shadow: 0 2px 15-20px rgba(0,0,0,0.5-0.8)` and `filter: drop-shadow(0 0 35px rgba(accent,0.5))`.

### Glow Vocabulary
- **Ambient aura** (`box-shadow: 0 0 30px rgba(111,66,255,0.08)`): Resting state on glass panels. Barely visible; creates atmospheric depth around cards without drawing attention.
- **Hover bloom** (`box-shadow: 0 0 40px ${accent}15, 0 12px 40px rgba(0,0,0,0.5)`): Activated on card hover. The accent color bleeds outward while a deep shadow anchors the card.
- **Neon halo** (`box-shadow: 0 0 15px rgba(255,79,216,0.5), 0 0 30px rgba(255,79,216,0.2)`): Button resting state. Dual-layer glow with a tight bright core and a diffuse outer ring.
- **Stat pulse** (`text-shadow: 0 0 20px rgba(accent,0.4)`): Stat card numbers. Each stat value glows in its own accent color.

### Named Rules
**The No-Shadow Rule.** No `box-shadow` in this system casts a downward shadow with positive Y-offset as a depth cue. Every shadow is a centered glow (`0 0 Npx`). If you write `0 4px 12px`, you've broken the Neon Runway. The only exception: `inset 0 -3px 0` on `btn-neon` for the pressed-button bevel effect.

## 5. Components

### Buttons
Arcade-tactile. They should feel like illuminated cabinet controls, not generic SaaS buttons.

- **Shape:** Gently curved edges (10px radius). Not pill-shaped (that's badges), not sharp (that's corporate).
- **Primary (`btn-neon`):** Hot Magenta gradient (135deg, `#ff4fd8` → `#ff6be5`), Void Black text, 600 weight Space Grotesk, uppercase, 0.06em tracking. Neon halo glow at rest. A diagonal shine sweep animation (3s cycle, `btn-shine` keyframes) crosses the surface. `inset 0 -3px 0 rgba(0,0,0,0.2)` creates a physical bevel on the bottom edge.
- **Primary Hover:** `translateY(-2px) scale(1.03)` lift with `cubic-bezier(0.34, 1.56, 0.64, 1)` overshoot easing. Glow intensifies to `0 0 25px` / `0 0 50px`. The button physically lifts and brightens.
- **Primary Active:** `translateY(1px) scale(0.98)` press-down. The button depresses.
- **Outline (`btn-outline`):** Transparent background, Electric Cyan border at 50% opacity, Electric Cyan text. Same radius, same font treatment. On hover: 8% Cyan fill, translateY(-2px) scale(1.03), `0 0 25px rgba(53,242,255,0.3)` glow.
- **Wallet (`btn-wallet`):** Variant of outline. Wallet Lilac border at 40% opacity, Wallet Lilac text. On hover: 8% Lilac fill, `0 0 25px rgba(167,139,250,0.25)` glow. Signals "safe secondary action."
- **Large (`btn-large`):** `1rem 2.5rem` padding, `1.1rem` font-size. Applied additively to primary or outline. Used on the final CTA.

### Badges / Pills (`badge-pill`)
- **Shape:** Full-round (999px radius). Ghost border at 20% accent opacity, 6% accent background fill. Space Grotesk 500 weight, 0.85rem.
- **Variants:** Default (Ultraviolet tint), `.badge-green` (Reactor Green tint), `.badge-pink` (Hot Magenta tint). Each variant adjusts both background and border-color.
- **Hover:** Background doubles to 12%, border intensifies to 35%, `translateY(-1px)` micro-lift.
- **Icon:** Emoji at 1rem, left-aligned inside the pill.

### Glass Panels (`panel-glass`)
- **Background:** `rgba(7,1,15,0.5)` (50% Void Black).
- **Blur:** `backdrop-filter: blur(24px) saturate(180%)`.
- **Border:** 1px solid `rgba(255,79,216,0.12)` (Hot Magenta whisper).
- **Radius:** Softly curved (16px).
- **Edge highlight:** `::before` pseudo-element: 1px horizontal gradient from transparent → `rgba(255,79,216,0.4)` → transparent. Creates a neon seam at the top.
- **Inner light:** `inset 0 1px 0 rgba(255,255,255,0.04)`.
- **Ambient glow:** `0 0 30px rgba(111,66,255,0.08)`, `0 8px 32px rgba(0,0,0,0.4)`.
- **Hover (on cards):** Border intensifies to `accent + 35` hex alpha, glow expands to `0 0 40px`, GSAP `scale(1.03) y: -6` with `power2.out` easing in, `elastic.out(1, 0.6)` easing out.

### Stat Cards (`stat-card`)
- **Background:** `rgba(7,1,15,0.6)`, blur(12px).
- **Radius:** Slightly tighter (14px).
- **Border:** `rgba(111,66,255,0.12)` (Ultraviolet).
- **Hover:** Border to 30%, `translateY(-2px)`, `0 8px 24px rgba(111,66,255,0.1)` glow.
- **Number:** Space Grotesk 900, `text-3xl`, accent-colored with matching `text-shadow` glow.
- **Label:** JetBrains Mono, `text-xs`, `text-white/35`, uppercase.

### Section Dividers
- **Shape:** 1px height, `max-width: 80%`, centered.
- **Color:** Gradient: transparent → `rgba(111,66,255,0.25)` → transparent.
- **Purpose:** Visual breath between sections. The gradient fades the line at both ends so it doesn't feel like a hard rule.

### Scroll Layers (Hero)
- **Structure:** Absolute-positioned full-viewport overlays (z-5) within the pinned hero. Each contains: category badge (pill), headline (gradient text), description paragraph, badge row.
- **Entry:** `y: 100, opacity: 0, scale: 0.9` → `y: 0, opacity: 1, scale: 1` via `power3.out` over 12% of timeline.
- **Exit:** `y: -80, opacity: 0, scale: 0.88` via `power3.in` over 10% of timeline.
- **Line stagger:** Each child line enters 4% later with `y: 40` → `y: 0`.
- **Background:** No glass panel; text sits directly over the frame imagery with vignette and gradient overlays for contrast.

### Floating Particles
- **Canvas-rendered**, fixed position (z-2). ~30 particles max, rectangular (1-3px), multi-colored from the five accent palette. Drift upward with sinusoidal horizontal sway. Fade in over 10% of lifespan, fade out over last 20%. Max opacity 50%.

### VHS Scanlines
- **CSS-only**, fixed overlay (z-9999). Repeating linear gradient: 2px transparent, 2px at 1.2% black opacity. Subtle texture that adds analog character without obscuring content.

## 6. Do's and Don'ts

### Do:
- **Do** use cinematic darkness as negative space. Void Black sections with generous padding (py-28 to py-36) create breathing room that makes neon accents feel brighter.
- **Do** limit each section to one primary glow source. A single accent heading glow per section keeps the visual hierarchy clean.
- **Do** follow the Opacity Ladder for text: 100% → 80% → 55% → 45% → 40% → 35%. Slot new text roles into existing steps.
- **Do** use `power3.out` for entrances and `power3.in` for exits. These are the Neon Runway's velocity curves; they feel fast and directional.
- **Do** use `elastic.out(1, 0.5-0.6)` for hover-leave animations. The slight overshoot bounce makes interactions feel arcade-tactile.
- **Do** keep decorative background elements at 3% opacity or below. Hexagons, floating dots, radial gradients should be felt, not identified.
- **Do** use Space Grotesk for headings and button labels, Inter for body text, JetBrains Mono for technical labels. Never mix roles.
- **Do** let text readability always take priority over visual effects. If a glow or gradient makes text harder to read, reduce the effect.
- **Do** use `backdrop-filter: blur(24px) saturate(180%)` for glass panels. The saturation boost prevents the blur from looking grey and lifeless.
- **Do** compose each section like a scene in a game trailer. Heading establishes the topic, supporting elements build context, the section ends with momentum toward the next.

### Don't:
- **Don't** use drop shadows with positive Y-offset for depth. This is a glow-based system. Every shadow is centered (0 0 Npx), never cast downward.
- **Don't** build hero-metric templates (big number, small label, gradient accent, supporting stats). That is a SaaS cliche, explicitly rejected in PRODUCT.md.
- **Don't** create identical card grids with icon + heading + text repeated endlessly. If cards share a layout, vary their accent colors and internal composition.
- **Don't** use corporate blue gradients or "trusted by 500+ companies" social proof strips. This is a game, not enterprise software.
- **Don't** use cookie-cutter "neon on black with hexagons" as default decoration. The hexagons that exist are at 3% opacity for a reason. Personality over pattern.
- **Don't** put yield tables, tokenomics charts, or DeFi dashboard elements on the landing page. The blockchain layer is a feature, not the headline.
- **Don't** stack more than two glows in the same viewport. The Glow Budget Rule exists for a reason.
- **Don't** use bounce or elastic easing for scroll-driven (scrub) animations. Those curves are for hover interactions only. Scroll motion uses `power2.out` / `power3.out` for velocity.
- **Don't** exceed 65ch line length for body text. The `max-w-xl` and `max-w-2xl` constraints on paragraphs enforce this.
- **Don't** use pure `#000000` or `#ffffff`. All neutrals carry the Void Black violet undertone. Body text is Lavender White (#f0e6ff), not white.
- **Don't** animate CSS layout properties (width, height, top, left). All motion uses transforms and opacity exclusively.
- **Don't** use glassmorphism decoratively or as a default surface. Glass panels are purposeful containers for card content; they are never used for hero overlays, navigation, or floating decorative elements.
