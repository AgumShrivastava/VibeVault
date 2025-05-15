
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import MainLayout from '@/components/layout/main-layout'; // Import MainLayout

export const metadata: Metadata = {
  title: 'Vibe Vault - Fresh Gear & Munchies',
  description: 'Your one-stop shop for Gen-Z trends in fashion and food.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased">
        {/* Removed MainLayout from here to allow specific layouts per route group if needed */}
        {/* For a global layout, it's better to apply it in the page.tsx or a root (app) layout */}
        {children}
      </body>
    </html>
  );
}
