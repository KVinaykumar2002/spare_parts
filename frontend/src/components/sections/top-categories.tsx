"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Category {
  name: string;
  items: string;
  image: string;
  bgColor: string;
  href: string;
}

const categoriesData: Category[] = [
  { name: "Fuel Dispensers / Petrol Pump Equipment", items: "12 Items", image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=400&fit=crop", bgColor: "bg-[#E8F4F8]", href: "/collections/fuel-dispensers" },
  { name: "Petrol Pump Spare Parts", items: "15 Items", image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop", bgColor: "bg-[#FBF3D4]", href: "/collections/petrol-pump-spare-parts" },
  { name: "Petrol Pump Accessories", items: "10 Items", image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop", bgColor: "bg-[#DDEFE0]", href: "/collections/petrol-pump-accessories" },
  { name: "Fuel System Spare Parts", items: "14 Items", image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=400&fit=crop", bgColor: "bg-[#FBE5E1]", href: "/collections/fuel-system-spare-parts" },
  { name: "Nozzles & Hoses", items: "18 Items", image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop", bgColor: "bg-[#F1EDFC]", href: "/collections/nozzles-hoses" },
  { name: "MPD / Fuel Metering Accessories", items: "8 Items", image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop", bgColor: "bg-[#E8F4F8]", href: "/collections/mpd-fuel-metering-accessories" },
  { name: "Fire & Safety Equipment", items: "12 Items", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=400&fit=crop", bgColor: "bg-[#FFE5E5]", href: "/collections/fire-safety-equipment" },
  { name: "Uniforms", items: "6 Items", image: "https://images.unsplash.com/photo-1558769132-cb1aeaede002?w=400&h=400&fit=crop", bgColor: "bg-[#DDEFE0]", href: "/collections/uniforms" },
  { name: "Testing & Measurement Equipment", items: "9 Items", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=400&fit=crop", bgColor: "bg-[#FBF3D4]", href: "/collections/testing-measurement-equipment" },
  { name: "Queue Management Systems", items: "5 Items", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop", bgColor: "bg-[#F1EDFC]", href: "/collections/queue-management-systems" },
  { name: "LED / Canopy Lighting", items: "11 Items", image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop", bgColor: "bg-[#FFF8E5]", href: "/collections/led-canopy-lighting" },
];

const CategoryCard = ({ category }: { category: Category }) => (
  <Link 
    href={category.href} 
    className={`group flex-shrink-0 w-[160px] h-[220px] md:w-[200px] md:h-[280px] rounded-xl flex flex-col items-center justify-center p-4 transition-all duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:scale-105 ${category.bgColor}`}
  >
    <div className="relative w-24 h-24 md:w-32 md:h-32 mb-3 md:mb-5">
      <Image
        src={category.image}
        alt={category.name}
        fill
        sizes="(max-width: 768px) 96px, 128px"
        style={{ objectFit: 'contain' }}
        className="transition-transform duration-300"
      />
    </div>
    <h3 className="font-semibold text-center text-base text-dark-gray-alt line-clamp-2" style={{ fontFamily: 'var(--font-display)' }}>{category.name}</h3>
    <p className="text-sm text-medium-gray-alt mt-1" style={{ fontFamily: 'var(--font-body)' }}>{category.items}</p>
  </Link>
);


const TopCategories = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

    const checkScrollPosition = useCallback(() => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            const atStart = scrollLeft < 5;
            const atEnd = scrollLeft + clientWidth >= scrollWidth - 5;
            if (atStart !== isAtStart) setIsAtStart(atStart);
            if (atEnd !== isAtEnd) setIsAtEnd(atEnd);
        }
    }, [isAtStart, isAtEnd]);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            checkScrollPosition();
            container.addEventListener('scroll', checkScrollPosition, { passive: true });
            window.addEventListener('resize', checkScrollPosition);

            return () => {
                container.removeEventListener('scroll', checkScrollPosition);
                window.removeEventListener('resize', checkScrollPosition);
            };
        }
    }, [checkScrollPosition]);

    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = scrollContainerRef.current.clientWidth * 0.75;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="bg-white py-12 md:py-20 font-body">
            <div className="container mx-auto px-4 md:px-10">
                <div className="flex justify-between items-center mb-6 md:mb-8">
                    <h2 className="text-3xl md:text-4xl font-semibold text-dark-gray -tracking-[0.3px]" style={{ fontFamily: 'var(--font-display)' }}>Top Categories</h2>
                    <div className="hidden md:flex items-center space-x-2">
                        <button 
                            onClick={() => handleScroll('left')} 
                            disabled={isAtStart}
                            aria-label="Scroll left"
                            className="bg-light-gray hover:bg-border-gray disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors rounded-full w-10 h-10 flex items-center justify-center text-gray-600"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button 
                            onClick={() => handleScroll('right')}
                            disabled={isAtEnd}
                            aria-label="Scroll right"
                            className="bg-light-gray hover:bg-border-gray disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors rounded-full w-10 h-10 flex items-center justify-center text-gray-600"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <div 
                        ref={scrollContainerRef} 
                        className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {categoriesData.map((category) => (
                            <CategoryCard key={category.name} category={category} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TopCategories;
