"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  title?: string;
  avatar?: string;
  avatarInitial: string;
  avatarBgColor: string;
  avatarTextColor: string;
};

const testimonials: Testimonial[] = [
  {
    quote: "ANANDH BunkStores is our one-stop shop for all petrol pump material. Quality is consistent and delivery is reliable. We have been sourcing nozzles, hoses and spare parts from them for years.",
    name: "Ramesh",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
    avatarInitial: "R",
    avatarBgColor: "bg-orange-100",
    avatarTextColor: "text-orange-800",
  },
  {
    quote: "We run multiple outlets and need a single supplier we can trust. ANANDH BunkStores has everything—Indian Oil, Bharat, Hindustan, Nayara—all in one place. Saves us time and hassle.",
    name: "Kumar",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
    avatarInitial: "K",
    avatarBgColor: "bg-blue-100",
    avatarTextColor: "text-blue-800",
  },
  {
    quote: "Found them when we were setting up our new pump near Rajahmundry. They helped us with dispensers, uniforms and safety equipment. True one-stop shop for petrol pump material.",
    name: "Padma",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
    avatarInitial: "P",
    avatarBgColor: "bg-pink-100",
    avatarTextColor: "text-pink-800",
  },
  {
    quote: "Good prices, genuine parts, and they deliver on time. We order nozzles and hose assemblies regularly. Co-Op member pricing is a plus. Recommend ANANDH BunkStores to any pump owner.",
    name: "Suresh",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
    avatarInitial: "S",
    avatarBgColor: "bg-teal-100",
    avatarTextColor: "text-teal-800",
  },
  {
    quote: "We needed fire safety equipment and canopy lighting for our station. ANANDH BunkStores had it all. Professional service and fair pricing. Will continue to order from them.",
    name: "Venkat",
    title: "Pump Owner, East Godavari",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop",
    avatarInitial: "V",
    avatarBgColor: "bg-indigo-100",
    avatarTextColor: "text-indigo-800",
  },
];

const scrollAnimation = (direction: "left" | "right" = "left") => ({
  animate: {
    x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
  },
  transition: {
    duration: 30,
    ease: "linear",
    repeat: Infinity,
    repeatType: "loop" as const,
  },
});

export default function TestimonialsCarousel() {
  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = testimonials && testimonials.length > 0 
    ? [...testimonials, ...testimonials] 
    : [];

  return (
    <section className="w-full py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary-green">
          What Our Customers Say
        </h2>

        {/* Row 1 (Left Direction) */}
        <motion.div
          className="flex gap-6 mb-8"
          {...scrollAnimation("left")}
          style={{ willChange: "transform" }}
        >
          {duplicatedTestimonials.map((testimonial, i) => (
            <div
              key={`left-${testimonial.name}-${i}`}
              className="min-w-[320px] md:min-w-[380px] bg-[#f0f9f6] border border-primary-green/20 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start gap-1 mb-3">
                <span className="text-3xl font-serif text-primary-green/30 leading-none">"</span>
                <p className="text-sm md:text-base text-dark-gray leading-relaxed flex-1">
                  {testimonial.quote}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-primary-green/10">
                {testimonial.avatar ? (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm flex-shrink-0",
                      testimonial.avatarBgColor,
                      testimonial.avatarTextColor
                    )}
                  >
                    {testimonial.avatarInitial}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-dark-gray text-sm">
                    {testimonial.name}
                  </p>
                  {testimonial.title && (
                    <p className="text-xs text-medium-gray mt-0.5 line-clamp-1">
                      {testimonial.title}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Row 2 (Right Direction) */}
        <motion.div
          className="flex gap-6"
          {...scrollAnimation("right")}
          style={{ willChange: "transform" }}
        >
          {duplicatedTestimonials.map((testimonial, i) => (
            <div
              key={`right-${testimonial.name}-${i}`}
              className="min-w-[320px] md:min-w-[380px] bg-[#f0f9f6] border border-primary-green/20 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start gap-1 mb-3">
                <span className="text-3xl font-serif text-primary-green/30 leading-none">"</span>
                <p className="text-sm md:text-base text-dark-gray leading-relaxed flex-1">
                  {testimonial.quote}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-primary-green/10">
                {testimonial.avatar ? (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm flex-shrink-0",
                      testimonial.avatarBgColor,
                      testimonial.avatarTextColor
                    )}
                  >
                    {testimonial.avatarInitial}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-dark-gray text-sm">
                    {testimonial.name}
                  </p>
                  {testimonial.title && (
                    <p className="text-xs text-medium-gray mt-0.5 line-clamp-1">
                      {testimonial.title}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
