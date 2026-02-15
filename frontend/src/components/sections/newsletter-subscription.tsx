"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import LottiePlayer from "@/components/ui/lottie-player";
// As no asset URLs were provided for this section, placeholder divs are used
// to replicate the layout and feel without using broken or unverified image links,
// adhering to the project's asset handling guidelines.

const WHATSAPP_NUMBER = "919866309037";

const NewsletterSubscription = () => {
  const [email, setEmail] = useState("");

  const openWhatsApp = () => {
    const message = email
      ? `Hi, I'd like to connect. My email: ${email}`
      : "Hi, I'd like to connect with ANANDH BunkStores.";
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="bg-[#dff2e8] py-16 lg:py-24 overflow-hidden font-body">
      <div className="container px-5 md:px-10">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:gap-x-8">
          <div className="w-full lg:w-[55%] xl:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <h2 className="font-display font-bold text-[#1a1a1a] text-3xl md:text-4xl xl:text-[40px] leading-tight mb-4">
              Stay home &amp; get your daily needs from our shop
            </h2>
            <p className="text-[#666666] text-base md:text-lg mb-8">
              One Stop shop For All Petrol Pump Material — ANANDH BunkStores
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                openWhatsApp();
              }}
              className="max-w-lg mx-auto lg:mx-0"
              aria-label="Connect via WhatsApp"
            >
              <div className="flex rounded-full shadow-lg overflow-hidden">
                <div className="relative flex-grow">
                  <label htmlFor="email-input" className="sr-only">
                    Email address
                  </label>
                  <Mail
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 z-10"
                    size={20}
                    aria-hidden="true"
                  />
                  <input
                    id="email-input"
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 bg-white border-0 focus:ring-2 focus:ring-primary/50 focus:outline-none text-base text-dark-gray-alt placeholder:text-medium-gray-alt relative rounded-l-full"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground font-semibold px-6 md:px-8 h-14 rounded-r-full whitespace-nowrap hover:bg-opacity-90 transition-colors duration-300 text-sm uppercase tracking-[0.5px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer"
                >
                  WhatsApp
                </button>
              </div>
            </form>
          </div>

          <div className="w-full lg:w-[45%] xl:w-1/2 min-h-[280px] lg:min-h-[400px] relative mt-16 lg:mt-0 flex items-center justify-center">
            <LottiePlayer
              url="/lottie_files/Share.json"
              className="w-full h-full max-w-[400px] max-h-[400px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSubscription;