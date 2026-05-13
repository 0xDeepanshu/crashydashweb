import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CRASHY DASH — Blockchain Racing with AI Agents",
  description:
    "A blockchain-powered voxel racing game. Train AI agents, own NFT vehicles, compete in multiplayer, and earn on-chain rewards.",
  keywords: ["racing game", "voxel", "arcade", "blockchain", "AI agents", "NFT", "multiplayer", "web3"],
  openGraph: {
    title: "CRASHY DASH",
    description: "Own. Race. Earn.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
