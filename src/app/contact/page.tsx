"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ContactClient() {
  const [banner, setBanner] = useState<{ image?: string; alt?: string } | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/admin/banners');
        if (!res.ok) throw new Error('no api');
        const j = await res.json();
        if (!mounted) return;
        const arr = Array.isArray(j.data) ? j.data : [];
        const match = arr.find((b: any) => b.page === 'Contact');
        if (match) setBanner({ image: match.image, alt: match.alt });
      } catch (e) {
        try { const raw = localStorage.getItem('admin_banners_v1'); if (raw) {
          const arr = JSON.parse(raw); const match = arr.find((b: any) => b.page === 'Contact'); if (match) setBanner({ image: match.image, alt: match.alt });
        } } catch {}
      }
    })();
    return () => { mounted = false; };
  }, []);
  return (
    <main className="min-h-screen bg-[#f9f8f6] text-[#2c2c2c] pt-32 pb-16">
      {/* Hero Banner */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative mb-20"
      >
        <div className="relative w-full h-[40vh] md:h-[50vh]">
          <Image
            src={banner?.image || 'https://images.pexels.com/photos/3768126/pexels-photo-3768126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'}
            alt={banner?.alt || 'Contact Banner'}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-light text-white mb-2 tracking-tight"
              >
                Contact
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-white/90 max-w-2xl mx-auto text-lg"
              >
                We are happy to help you with all your questions and requests.
              </motion.p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Info + Form */}
      <section className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-16 flex flex-col md:flex-row gap-12">
        {/* Info Column */}
        <div className="w-full md:w-1/2 flex flex-col gap-8 justify-center">
          <div>
            <h2 className="text-2xl font-light mb-2 text-gold-primary">Contact Information</h2>
            <div className="mb-4 text-gray-700">
              <div className="mb-2">
                <span className="font-semibold">Phone:</span>{' '}
                <a href="tel:+94111234567" className="hover:text-gold-primary transition">
                  +94 11 123 4567
                </a>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Email:</span>{' '}
                <a href="mailto:info@transilk.com" className="hover:text-gold-primary transition">
                  info@transilk.com
                </a>
              </div>
              <div>
                <span className="font-semibold">Address:</span>
                <div>123 Gem Street, Colombo, Sri Lanka 10300</div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gold-primary">Opening Hours</h3>
            <div className="text-gray-700">
              Monday - Saturday: 10:00 - 18:00<br />
              Sunday: Closed
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gold-primary">Follow Us</h3>
            <div className="flex gap-4 mt-2">
              <a href="#" className="text-gold-primary hover:text-gold-dark font-medium">Facebook</a>
              <a href="#" className="text-gold-primary hover:text-gold-dark font-medium">Instagram</a>
              <a href="#" className="text-gold-primary hover:text-gold-dark font-medium">Twitter</a>
            </div>
          </div>
        </div>
        {/* Form Column */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-light mb-6 text-gold-primary">Send Us a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-primary"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-primary"
                required
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-primary"
              required
            />
            <textarea
              rows={6}
              placeholder="Message"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-primary"
              required
            ></textarea>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="bg-gold-primary hover:bg-gold-dark text-white px-8 py-3 rounded-md font-medium transition-colors w-full"
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-6xl mx-auto mt-16 rounded-2xl overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.45932537288!2d79.76756101493651!3d6.922003946226142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2us!4v1710325701889!5m2!1sen!2us"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </main>
  );
}
