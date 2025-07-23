'use client';

import { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import SellWithUs from '@/components/home/SellWithUs';
import GetStarted from '@/components/home/GetStarted';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';

export default function Home() {
  // For scroll-based animation on hero text
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const heroControls = useAnimation();

  // For video fade-in animation
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoAnim = useAnimation();

  const sectionRef = useRef<HTMLDivElement>(null);

  // Framer Motion scroll progress for hero section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  // Fade out and scale down as you scroll down
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.96]);

  useEffect(() => {
    if (heroInView) {
      heroControls.start('visible');
      videoAnim.start('visible');
    }
  }, [heroInView, heroControls, videoAnim]);

  return (
    <main className="overflow-hidden text-[#2a2a2a] bg-[#f9f8f6]">
      {/* Fullscreen Video Hero Section */}
      <motion.section
        ref={sectionRef}
        style={{ opacity: sectionOpacity, scale: sectionScale }}
        className="relative h-screen w-full overflow-hidden"
      >
        <motion.video
          ref={videoRef}
          initial="hidden"
          animate={videoAnim}
          variants={{
            hidden: { opacity: 0, scale: 1.05 },
            visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
          }}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/videos/TRANSILK.mp4" type="video/mp4" />
        </motion.video>
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        <div className="relative z-20 flex items-center h-full">
          <div className="flex w-full items-start">
            {/* Left: Hero Text */}
            <div
              className="text-left text-white px-6 max-w-3xl ml-0 md:ml-20 flex-1"
              ref={heroRef}
            >
              <motion.h1
                initial="hidden"
                animate={heroControls}
                variants={{
                  hidden: { opacity: 0, y: 60 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
                  }
                }}
                className="text-4xl md:text-6xl font-light tracking-tight leading-snug"
              >
                <motion.span
                  initial={{ color: "#fff" }}
                  animate={{ color: "var(--gold-primary)" }} // FIX: use CSS variable for gold
                  transition={{ delay: 1.2, duration: 1 }}
                  className="inline-block"
                >
                  Discover the Natural Brilliance
                </motion.span>
                <br />
                <span className="text-[#fff]">of Sri Lankan Gems</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0, transition: { delay: 0.7, duration: 1 } } : {}}
                className="mt-6 text-lg md:text-xl text-gray-200"
              >
                Timeless gemstones curated for elegance, crafted by nature.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={heroInView ? { opacity: 1, scale: 1, transition: { delay: 1.3, duration: 0.7 } } : {}}
                className="mt-10 flex justify-start"
              >
                <a
                  href="#featured"
                  className="px-8 py-3 rounded-full backdrop-blur-sm bg-white/30 text-gray-100 font-semibold text-lg shadow-lg hover:bg-[#d4b36c] transition"
                >
                  Explore Gems
                </a>
              </motion.div>
            </div>
            {/* Right: Small Logo/Image */}
            <motion.div
              initial={{ opacity: 0, x: 80, scale: 0.7 }}
              animate={heroInView ? { opacity: 1, x: 0, scale: 1, transition: { delay: 1.1, duration: 0.8, type: "spring" } } : {}}
              className="hidden md:flex flex-col items-start justify-center flex-shrink-0 ml-auto mt-2 mr-72"
            >
              <img
                src="/images/next.png"
                alt="Logo"
                className="w-40 h- object-contain rounded-full shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured Products Section */}
      <section id="featured" className="min-h-screen bg-[#f9f8f6] px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-4">Featured Gems</h2>
          <p className="text-[#777] text-lg">Our finest handpicked natural treasures</p>
        </motion.div>
        <FeaturedProducts />
      </section>

      {/* Hero Content Section */}
      <section className="min-h-screen bg-[#ffffff] px-6 py-32 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full max-w-6xl"
        >
          <HeroSection />
        </motion.div>
      </section>

      {/* Sell With Us Section */}
      <section className="min-h-screen bg-[#f9f8f6] px-6 py-32 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full max-w-6xl"
        >
          <SellWithUs />
        </motion.div>
      </section>

      {/* Call to Action Section */}
      <section className="min-h-screen bg-[#ffffff] px-6 py-32 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full max-w-5xl"
        >
          <GetStarted />
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-[#f9f8f6] px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Testimonials />
        </motion.div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-[#ffffff] px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Newsletter />
        </motion.div>
      </section>
    </main>
  );
}
