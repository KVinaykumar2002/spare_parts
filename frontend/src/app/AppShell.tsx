'use client';

import TopBanner from '@/components/sections/top-banner';
import HeaderDesktop from '@/components/sections/header-desktop';
import HeaderMobile from '@/components/sections/header-mobile';
import Footer from '@/components/sections/footer';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white min-h-screen w-full" style={{ backgroundColor: '#ffffff' }}>
      <TopBanner />
      <HeaderDesktop />
      <HeaderMobile />
      <main className="min-h-screen bg-white w-full" style={{ backgroundColor: '#ffffff' }}>{children}</main>
      <Footer />
    </div>
  );
}


