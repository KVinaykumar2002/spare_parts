"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { publicApi } from '@/lib/api';

interface BannerCardProps {
  title: string;
  imageUrl: string;
  href: string;
}

const BannerCard = ({ title, imageUrl, href }: BannerCardProps) => (
  <Link href={href} className="group relative block overflow-hidden rounded-lg aspect-[4/3] md:aspect-[4/3] h-[280px] sm:h-[320px] md:h-auto">
    <Image
      src={imageUrl}
      alt={title}
      fill
      className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    <div className="absolute bottom-0 left-0 p-4 sm:p-5 md:p-6">
      <h4 className="font-semibold text-white text-lg sm:text-xl md:text-xl leading-snug">
        {title}
      </h4>
    </div>
  </Link>
);

const FeaturedBanners = () => {
  const [banners, setBanners] = useState<BannerCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const plugin = Autoplay({ delay: 4000, stopOnInteraction: true });

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await publicApi.banners.getAll({ position: 'middle' });
        if (response.success && response.data) {
          const transformedBanners: BannerCardProps[] = response.data.map((banner: any) => ({
            title: banner.title || banner.subtitle || '',
            imageUrl: banner.image,
            href: banner.link || '#',
          }));
          setBanners(transformedBanners);
        }
      } catch (error) {
        console.error('Failed to fetch banners:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) {
    return (
      <section className="bg-white">
        <div className="container py-8 sm:py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-gray-200 rounded-lg aspect-[4/3]" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (banners.length === 0) {
    return null;
  }

  return (
    <section className="bg-white">
      <div className="container py-8 sm:py-12 md:py-20 px-4 sm:px-5">
        {/* Mobile Carousel View */}
        <div className="md:hidden">
          <Carousel
            plugins={[plugin]}
            opts={{
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {banners.map((banner, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4">
                  <BannerCard {...banner} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 h-8 w-8 opacity-60 hover:opacity-100" />
            <CarouselNext className="right-2 h-8 w-8 opacity-60 hover:opacity-100" />
          </Carousel>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-3 gap-4">
          {banners.map((banner, index) => (
            <BannerCard key={index} {...banner} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBanners;