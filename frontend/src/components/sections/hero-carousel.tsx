"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

import { publicApi } from '@/lib/api';

const HeroCarousel = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [carouselSlides, setCarouselSlides] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  // Fetch hero banners from API
  React.useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await publicApi.banners.getAll({ position: 'hero' });
        if (response.success && response.data) {
          const slides = response.data.map((banner: any) => ({
            desktopImage: banner.image,
            mobileImage: banner.image, // Use same image for mobile if no separate mobile image
            alt: banner.title || banner.subtitle || 'Banner',
            href: banner.link || '#',
            cta: banner.subtitle ? {
              text: banner.subtitle,
              positionClasses: "bottom-[15%] left-[9%]",
            } : null,
          }));
          setCarouselSlides(slides);
        }
      } catch (error) {
        console.error('Failed to fetch hero banners:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (loading) {
    return (
      <section className="group relative w-full bg-white">
        <div className="w-full aspect-[768/400] md:aspect-[1920/600] bg-gray-200 animate-pulse" />
      </section>
    );
  }

  if (carouselSlides.length === 0) {
    return (
      <section className="group relative w-full bg-white">
        <div className="w-full aspect-[768/400] md:aspect-[1920/600] bg-gray-100" />
      </section>
    );
  }

  return (
    <section
      className="group relative w-full bg-white px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5"
      aria-roledescription="carousel"
      aria-label="Promotional Banners"
    >
      <div className="relative mx-auto max-w-[1920px] rounded-2xl overflow-hidden shadow-sm">
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          onMouseEnter={() => plugin.current.stop()}
          onMouseLeave={() => plugin.current.play()}
          opts={{
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {carouselSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <Link href={slide.href}>
                  <div className="relative w-full aspect-[768/400] md:aspect-[1920/600]">
                    <div className="md:hidden">
                      <Image
                        src={slide.mobileImage}
                        alt={slide.alt}
                        fill
                        priority={index === 0}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 0"
                      />
                    </div>
                    <div className="hidden md:block">
                      <Image
                        src={slide.desktopImage}
                        alt={slide.alt}
                        fill
                        priority={index === 0}
                        className="object-cover"
                        sizes="(min-width: 769px) 100vw, 0"
                      />
                    </div>
                    {slide.cta && (
                      <div className={`absolute ${slide.cta.positionClasses}`}>
                        <Button
                          asChild
                          className="h-auto rounded-xl bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.5px] text-primary-foreground shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:bg-[#0a3d31] md:px-8 md:py-4 md:text-base"
                          aria-label={slide.cta.text}
                        >
                          <span tabIndex={-1}>{slide.cta.text}</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white text-black border-0 shadow-md opacity-0 transition-opacity group-hover:opacity-100 md:left-4 md:h-12 md:w-12 hover:bg-white hover:text-black" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white text-black border-0 shadow-md opacity-0 transition-opacity group-hover:opacity-100 md:right-4 md:h-12 md:w-12 hover:bg-white hover:text-black" />
        </Carousel>

        <div className="absolute bottom-3 sm:bottom-5 left-1/2 z-10 -translate-x-1/2">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            {carouselSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-1.5 w-1.5 sm:h-2 sm:w-2 md:h-2.5 md:w-2.5 rounded-full transition-all duration-300 cursor-pointer touch-manipulation ${current === index
                  ? "bg-stone-800"
                  : "border border-stone-800 bg-transparent"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;