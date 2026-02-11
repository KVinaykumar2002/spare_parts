"use client";

import { motion } from "framer-motion";

const bannerItems = [
  "One Stop shop For All Petrol Pump Material",
  "Get 10% OFF Your First Order – Use Code: EXTRA10",
  "Free Shipping on Orders Above ₹500",
  "Need help? Call Us: 9866309037",
];

export default function TopBanner() {
  // Duplicate items for seamless infinite scroll
  const duplicatedItems = [...bannerItems, ...bannerItems];

  return (
    <div className="bg-primary text-primary-foreground sticky top-0 z-[60] overflow-hidden">
      <div className="relative h-[32px] sm:h-[36px] flex items-center">
        <motion.div
          className="flex items-center gap-8 whitespace-nowrap"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
          style={{ willChange: "transform" }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={`banner-${index}`}
              className="flex items-center gap-8 shrink-0"
            >
              <p className="text-[10px] sm:text-xs md:text-sm font-medium whitespace-nowrap">
                {item}
              </p>
              <span className="text-primary-foreground/50 text-lg">•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
