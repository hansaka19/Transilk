'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CustomDesignPage() {
  return (
    <main className="pt-24 pb-0 bg-[#f9f8f6] text-[#2a2a2a] font-light">
      {/* Hero Banner */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative h-[75vh] w-full flex items-center justify-center bg-[#f9f8f6]"
      >
        <iframe
          src="https://www.youtube.com/embed/0zVDGs2ZioA?autoplay=1&mute=1&loop=1&playlist=0zVDGs2ZioA&controls=0&modestbranding=1&showinfo=0"
          title="Custom Design Cinematic Background"
          className="absolute w-full h-full object-cover pointer-events-none opacity-30"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 to-black/50" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-light leading-tight text-white drop-shadow-lg">
            Bespoke <span className="text-yellow-500">Jewelry Design</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Bring your vision to life with our expert craftsmen and exceptional gemstones
          </p>
          <a
            href="#design-form"
            className="inline-block px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded transition-colors text-lg font-medium shadow-lg mt-6"
          >
            Start Your Design Journey
          </a>
        </div>
      </motion.section>

      {/* Introduction Text */}
      <section className="px-6 md:px-20 py-24 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-light mb-6">Jewelry, Designed for You</h2>
          <p className="text-lg text-[#555] leading-relaxed">
            Our bespoke process is a celebration of your story. From the first sketch to the final polish, every detail is shaped by your vision and our artistry.
          </p>
        </motion.div>
      </section>

      {/* Design Process Section */}
      <section className="py-16 bg-[#f9f8f6]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light mb-4">Our Custom Design Process</h2>
            <div className="w-24 h-[2px] bg-yellow-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From initial concept to final creation, we guide you through every step of crafting your unique piece.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[{
              step: 1,
              title: 'Consultation',
              description:
                'Begin with a personalized consultation to discuss your vision, preferences, and budget. Our designers will help shape your initial concept.',
            },
            {
              step: 2,
              title: 'Design & Sketch',
              description:
                'Our designers create detailed sketches and 3D renderings of your piece, refining until it perfectly matches your vision.',
            },
            {
              step: 3,
              title: 'Gemstone Selection',
              description:
                'Select from our collection of premium gemstones or use one you already own. We ensure every stone meets our exceptional quality standards.',
            },
            {
              step: 4,
              title: 'Creation',
              description:
                'Our master craftsmen meticulously create your piece by hand, employing traditional techniques and modern technology for perfect execution.',
            }].map(({ step, title, description }) => (
              <div key={step} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto text-yellow-600 text-xl font-bold">
                    {step}
                  </div>
                </div>
                <h3 className="text-xl font-light mb-3">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Previous Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light mb-4">Our Bespoke Creations</h2>
            <div className="w-24 h-[2px] bg-yellow-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A glimpse of our custom designed pieces, each crafted to reflect the unique vision of our clients.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{
              title: 'Sapphire Halo Engagement Ring',
              description: 'A 3.5 carat Ceylon sapphire set in platinum with diamond halo',
              image:
                'https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=600',
            },
            {
              title: 'Emerald Art Deco Necklace',
              description:
                'Custom Art Deco inspired emerald and diamond pendant in white gold',
              image:
                'https://images.pexels.com/photos/1457801/pexels-photo-1457801.jpeg?auto=compress&cs=tinysrgb&w=600',
            },
            {
              title: 'Ruby Vintage Earrings',
              description:
                'Burmese ruby drop earrings with antique-inspired diamond settings',
              image:
                'https://images.pexels.com/photos/10874827/pexels-photo-10874827.jpeg?auto=compress&cs=tinysrgb&w=600',
            }].map((item, idx) => (
              <div
                key={idx}
                className="group overflow-hidden rounded-lg bg-[#f9f8f6] shadow relative"
              >
                <div className="aspect-square relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <h3 className="text-white font-display font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-white/80 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="design-form"
        className="py-24 bg-gradient-to-r from-indigo-900 to-purple-900 text-white"
      >
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Start Your Custom Design</h2>
          <p className="text-xl mb-8 text-white/80 max-w-2xl mx-auto">
            Tell us about your vision, and we'll help bring it to life. Fill out the form below
            to begin your bespoke jewelry journey.
          </p>
          <Link
            href="/contact"
            className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded transition-colors text-lg font-medium"
          >
            Contact Our Designers
          </Link>
        </div>
      </section>
    </main>
  );
}
