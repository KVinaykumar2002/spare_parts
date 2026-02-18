"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Heart, MapPin, ShoppingCart, ChevronDown, X } from "lucide-react";
import { getCartItemCount, getCartUpdateEventName } from "@/lib/cart-functionality";
import { getWishlistCount, getWishlistUpdateEventName } from "@/lib/wishlist-functionality";
import AddressDropdown from "@/components/ui/address-dropdown";
import { getSelectedAddress, getAddressUpdateEventName, type Address } from "@/lib/address-functionality";

// The navItems are derived from the desktop navigation panel in the HTML structure
interface NavItem {
  name: string;
  href: string;
  external?: boolean;
}

const navItems: NavItem[] = [
  { name: 'Browse All Categories', href: '/collections/all' },
  { name: 'Store Locations', href: '/pages/store-locator' },
  { name: 'Deals', href: '/collections/om-deals' },
];

const NavPanel = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
  <>
    {/* Overlay */}
    <div
      className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out z-40 lg:hidden ${isOpen ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none'}`}
      style={{
        display: isOpen ? 'block' : 'none',
        opacity: isOpen ? 0.5 : 0,
        pointerEvents: isOpen ? 'auto' : 'none'
      }}
      onClick={onClose}
      aria-hidden="true"
    />
    {/* Panel */}
    <div className={`fixed top-0 left-0 h-full w-4/5 max-w-[320px] bg-white z-50 p-5 shadow-lg transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex justify-between items-center mb-8">
        <Link href="/" onClick={onClose} className="text-xl font-bold text-primary-green">
          ANANDH BunkStores
        </Link>
        <button onClick={onClose} className="p-1 -mr-1 cursor-pointer" aria-label="Close menu">
          <X size={28} className="text-dark-gray" />
        </button>
      </div>
      <nav>
        <ul className="flex flex-col">
          {navItems.map((item, index) => (
            <li key={index} className="border-b border-border-gray-alt">
              {item.external ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="block py-4 text-dark-gray-alt hover:text-primary-green transition-colors">
                  {item.name}
                </a>
              ) : (
                <Link href={item.href} onClick={onClose} className="block py-4 text-dark-gray-alt hover:text-primary-green transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </>
);

const HeaderMobile = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  useEffect(() => {
    const loadCounts = () => {
      if (typeof window !== 'undefined') {
        setCartCount(getCartItemCount());
        setWishlistCount(getWishlistCount());
        setSelectedAddress(getSelectedAddress());
      }
    };

    loadCounts();

    const cartEvent = getCartUpdateEventName();
    const wishlistEvent = getWishlistUpdateEventName();
    const addressEvent = getAddressUpdateEventName();
    const handleUpdates = () => {
      loadCounts();
    };

    window.addEventListener(cartEvent, handleUpdates);
    window.addEventListener(wishlistEvent, handleUpdates);
    window.addEventListener(addressEvent, handleUpdates);
    window.addEventListener('storage', handleUpdates);

    return () => {
      window.removeEventListener(cartEvent, handleUpdates);
      window.removeEventListener(wishlistEvent, handleUpdates);
      window.removeEventListener(addressEvent, handleUpdates);
      window.removeEventListener('storage', handleUpdates);
    };
  }, []);

  const getAddressDisplay = () => {
    if (selectedAddress) {
      return selectedAddress.pincode;
    }
    return "Pincode";
  };

  return (
    <>
      <header className="sticky top-[36px] left-0 right-0 z-30 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.1)] lg:hidden">
        <div className="relative flex items-center justify-between h-[64px] sm:h-[72px] px-4 sm:px-5">

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button onClick={() => setNavOpen(true)} className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 -ml-1 sm:-ml-2 cursor-pointer touch-manipulation" aria-label="Open menu">
              <Menu size={24} className="sm:w-7 sm:h-7 text-dark-gray" />
            </button>
            <AddressDropdown onAddressChange={setSelectedAddress}>
              <div className="flex items-center gap-1 sm:gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
                <MapPin size={16} className="sm:w-[18px] sm:h-[21px] text-dark-gray flex-shrink-0" aria-hidden />
                <div>
                  <span className="block text-[10px] sm:text-caption text-medium-gray leading-none">Deliver to</span>
                  <div className="flex items-center text-xs sm:text-sm font-semibold text-dark-gray-alt pt-0.5 sm:pt-1">
                    <span className="max-w-[60px] sm:max-w-none truncate">{getAddressDisplay()}</span>
                    <ChevronDown size={14} className="sm:w-4 sm:h-4 ml-0.5" />
                  </div>
                </div>
              </div>
            </AddressDropdown>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link href="/" className="flex flex-col items-center">
              <span className="text-base sm:text-lg font-bold text-primary-green leading-tight" style={{ fontFamily: 'var(--font-display)' }}>ANANDH BunkStores</span>
              <span className="text-[10px] sm:text-xs text-white/90 mt-0.5 hidden sm:block">Petrol Pump Material</span>
            </Link>
          </div>

          <div className="flex items-center">
            <Link href="/wishlist" className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 touch-manipulation" aria-label="Wishlist">
              <Heart size={22} className="sm:w-[25px] sm:h-[25px] text-dark-gray" />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 bg-primary-green text-white text-[9px] sm:text-[10px] font-bold rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 flex items-center justify-center min-w-[14px] sm:min-w-[16px]">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 -mr-1 sm:-mr-2 touch-manipulation" aria-label="Cart">
              <ShoppingCart size={22} className="sm:w-[25px] sm:h-[25px] text-dark-gray" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 bg-primary-green text-white text-[9px] sm:text-[10px] font-bold rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 flex items-center justify-center min-w-[14px] sm:min-w-[16px]">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <NavPanel isOpen={isNavOpen} onClose={() => setNavOpen(false)} />
    </>
  );
};

export default HeaderMobile;