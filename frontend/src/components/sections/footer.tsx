"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  ChevronDown,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";

const SocialIcon = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white/10 rounded-full h-8 w-8 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
  >
    {children}
  </a>
);

interface FooterLink {
  name: string;
  href: string;
}

interface LinkGroup {
  title: string;
  links: FooterLink[];
}

const linkGroups: LinkGroup[] = [
  {
    title: "Company",
    links: [
      { name: "Store Locations", href: "/pages/store-locator" },
      { name: "Our Blog", href: "/pages/blog" },
      { name: "Lab Test Reports", href: "https://trust.eversol.com" },
      { name: "About Us", href: "/pages/about-us" },
      { name: "Our Team", href: "/pages/our-team" },
      { name: "All Products", href: "/collections/all" },
      { name: "Our Videos", href: "https://www.youtube.com/channel/UCx_Aiys8c1Vx3fLF1r6yc2Q" },
    ],
  },
  {
    title: "Account",
    links: [
      { name: "Contact Us", href: "mailto:support@anandhbunkstores.com" },
      { name: "Become a Co-Op Member", href: "/pages/membership" },
    ],
  },
  {
    title: "Store Policy",
    links: [
      { name: "Privacy Policy", href: "/pages/privacy-policy" },
      { name: "Return and Refund Policy", href: "/pages/return-and-refund-policy" },
      { name: "Shipping Policy", href: "/pages/shipping-policy" },
      { name: "Terms of Service", href: "/pages/terms-of-service" },
      { name: "Sitemap", href: "/pages/sitemap" },
    ],
  },
];


const FooterLinkColumn = ({ title, links }: { title: string; links: FooterLink[] }) => (
  <div>
    <h3 className="font-bold text-base text-zinc-900 mb-4">{title}</h3>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.name}>
          <Link href={link.href} className="text-sm text-zinc-600 hover:text-primary-green">
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const AccordionItem = ({ title, children, isOpen, onClick }: { title: string; children: React.ReactNode; isOpen: boolean; onClick: () => void; }) => (
  <div className="border-b border-zinc-200">
    <button
      className="flex justify-between items-center w-full py-4 text-left font-bold text-base text-zinc-900 cursor-pointer"
      onClick={onClick}
    >
      <span>{title}</span>
      <ChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={20} />
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen py-4' : 'max-h-0'}`}
    >
      {children}
    </div>
  </div>
);

const Footer = () => {
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);

    const handleAccordionToggle = (title: string) => {
        setOpenAccordion(openAccordion === title ? null : title);
    };

  const footerVideoSrc = "https://cdn.shopify.com/videos/c/o/v/2f74fc9020624fb09059c766e538177a.mp4";

  return (
    <>
      <footer className="relative text-zinc-800 font-body overflow-hidden">
        {/* Background video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden
          >
            <source src={footerVideoSrc} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-white/40" aria-hidden />
        </div>

        <div className="container mx-auto px-5 py-16 lg:px-10 relative z-10">
          
          {/* Top section for large screens */}
          <div className="hidden lg:grid lg:grid-cols-6 gap-8">
            <div className="space-y-4">
              <Link href="/" className="inline-block mb-4">
                <span className="text-xl font-bold text-primary-green" style={{ fontFamily: 'var(--font-display)' }}>ANANDH BunkStores</span>
                <span className="block text-xs text-zinc-600 mt-1">One Stop shop For All Petrol Pump Material</span>
              </Link>
              <p className="text-sm text-zinc-600">#45-22-25, Beside Jupudy Tyres, Bypass Road, Thadithota Rajahmundry - 533103</p>
              <p className="text-sm text-zinc-600">
                Call Us: <a href="tel:+919866309037" className="hover:text-primary-green">9866309037</a>
              </p>
              <p className="text-sm text-zinc-600">
                Email: <a href="mailto:support@anandhbunkstores.com" className="hover:text-primary-green">support@anandhbunkstores.com</a>
              </p>
            </div>
            {linkGroups.map((group) => (
                <FooterLinkColumn key={group.title} title={group.title} links={group.links} />
            ))}
          </div>
          
          {/* Content for small screens */}
          <div className="lg:hidden">
              <div className="space-y-4 mb-8">
                <Link href="/" className="inline-block mb-4">
                  <span className="text-xl font-bold text-primary-green" style={{ fontFamily: 'var(--font-display)' }}>ANANDH BunkStores</span>
                  <span className="block text-xs text-zinc-600 mt-1">One Stop shop For All Petrol Pump Material</span>
                </Link>
                <p className="text-sm text-zinc-600">#45-22-25, Beside Jupudy Tyres, Bypass Road, Thadithota Rajahmundry - 533103</p>
                <p className="text-sm text-zinc-600">Call Us: <a href="tel:+919866309037" className="hover:text-primary-green">9866309037</a></p>
                <p className="text-sm text-zinc-600">Email: <a href="mailto:support@anandhbunkstores.com" className="hover:text-primary-green">support@anandhbunkstores.com</a></p>
              </div>

              {linkGroups.map(group => (
                  <AccordionItem 
                    key={group.title} 
                    title={group.title}
                    isOpen={openAccordion === group.title}
                    onClick={() => handleAccordionToggle(group.title)}
                  >
                      <ul className="space-y-3">
                          {group.links.map(link => (
                              <li key={link.name}><a href={link.href} className="text-sm text-zinc-600 hover:text-primary-green">{link.name}</a></li>
                          ))}
                      </ul>
                  </AccordionItem>
              ))}
          </div>

        </div>
      </footer>
      <div className="bg-primary-green text-primary-foreground">
        <div className="container mx-auto px-5 py-4 lg:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-sm">&copy; 2024, ANANDH BunkStores</p>
            <a href="tel:+919866309037" className="text-sm flex items-center gap-2">
              <Phone size={16} />
              9866309037
            </a>
            <div className="flex items-center gap-4">
              <span className="text-sm">Follow Us</span>
              <div className="flex items-center gap-2">
                <SocialIcon href="https://www.facebook.com/">
                  <Facebook size={16} />
                </SocialIcon>
                <SocialIcon href="https://twitter.com/">
                  <Twitter size={16} />
                </SocialIcon>
                <SocialIcon href="https://instagram.com/">
                  <Instagram size={16} />
                </SocialIcon>
                <SocialIcon href="https://www.youtube.com/channel/UCx_Aiys8c1Vx3fLF1r6yc2Q">
                  <Youtube size={16} />
                </SocialIcon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;