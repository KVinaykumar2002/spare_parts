import HeroCarousel from "@/components/sections/hero-carousel";
import TopCategories from "@/components/sections/top-categories";
import FeaturedBanners from "@/components/sections/featured-banners";
import PopularProducts from "@/components/sections/popular-products";
import LifestyleSwitch from "@/components/sections/lifestyle-switch";
import VideoTestimonial from "@/components/sections/video-testimonial";
import TestimonialsCarousel from "@/components/sections/testimonials-carousel";
import NewsletterSubscription from "@/components/sections/newsletter-subscription";

export default function Home() {
  return (
    <div className="bg-white font-body min-h-screen w-full" style={{ backgroundColor: '#ffffff' }}>
      <HeroCarousel />
      <TopCategories />
      {/* <FeaturedBanners /> */}
      {/* <PopularProducts /> */}
      <LifestyleSwitch />
      <VideoTestimonial />
      <TestimonialsCarousel />
      <NewsletterSubscription />
    </div>
  );
}