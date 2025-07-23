'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SellWithUsPage() {
  return (
    <main className="pt-24 pb-0 bg-[#f9f8f6] text-[#2a2a2a] font-light">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#f9f8f6]">
        <Image
          src="https://images.pexels.com/photos/9428809/pexels-photo-9428809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
          alt="Premium gemstones collection"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-indigo-900/70"></div>
        <div className="relative z-10 text-center w-full">
          <h1 className="text-5xl md:text-6xl font-light text-white mb-6 drop-shadow-lg">
            Sell With <span className="text-gold-primary">Transilk</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Turn your precious stones into profit with our expert team and global network.
          </p>
          <Link
            href="#sell-details"
            className="inline-block px-8 py-3 bg-gold-primary hover:bg-gold-dark text-white rounded transition-colors text-lg font-medium shadow-lg"
          >
            Start Selling
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section id="sell-details" className="max-w-5xl mx-auto px-6 md:px-20 py-24">
        {/* Why Sell With Us */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-24"
        >
          <h2 className="text-4xl font-light mb-6 text-center">Why Sell With Transilk?</h2>
          <div className="w-24 h-[2px] bg-gold-primary mx-auto mb-8"></div>
          <p className="text-lg text-[#555] leading-relaxed text-center max-w-3xl mx-auto mb-12">
            We offer a premium, transparent selling experience with competitive pricing, expert gemologists, and a global network of high-end buyers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: (
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "Competitive Pricing",
              description: "We offer fair market value for your gemstones based on quality, rarity, and current market trends.",
            },
            {
              icon: (
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: "Expert Authentication",
              description: "Our certified gemologists will authenticate and evaluate your pieces with precision and transparency.",
            },
            {
              icon: (
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              ),
              title: "Global Network",
              description: "Access our international network of collectors, jewelers, and enthusiasts looking for premium stones.",
            },
          ].map((benefit, index) => (
            <div key={index} className="text-center p-8 rounded-2xl bg-[#f9f8f6] hover:shadow-lg transition-shadow">
              <div className="text-gold-primary mb-4 flex justify-center">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-light mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
          </div>  
        </motion.section>

        {/* Selling Journey Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-24"
        >
          <h2 className="text-4xl font-light mb-6 text-center">Our Selling Process</h2>
          <div className="w-24 h-[2px] bg-gold-primary mx-auto mb-8"></div>
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
          {[
            {
              step: "1",
              title: "Initial Submission",
              description: "Fill out our online form with details and photos of your gemstones or jewelry. Our specialists will review and contact you within 48 hours.",
            },
            {
              step: "2",
              title: "Professional Evaluation",
              description: "Our gemologists conduct a thorough assessment to determine authenticity, quality, and market value.",
            },
            {
              step: "3",
              title: "Pricing Proposal",
              description: "We present you with a detailed pricing proposal, including market analysis and our competitive offer.",
            },
            {
              step: "4",
              title: "Payment & Documentation",
              description: "Upon agreement, we process your payment and provide complete documentation of the transaction.",
            },
          ].map((step, idx) => (
            <div key={step.step} className="flex flex-col items-center text-center max-w-xs">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gold-primary flex items-center justify-center text-white font-bold text-2xl shadow mb-4">
                {step.step}
              </div>
              <h4 className="font-light text-lg mb-1">{step.title}</h4>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-indigo-900 rounded-2xl shadow p-12 text-white text-center"
        >
          <h2 className="text-3xl md:text-4xl font-light mb-6">Ready to Sell?</h2>
          <p className="text-xl mb-8 text-white/80 max-w-2xl mx-auto">
            Start your selling journey with Transilk. Our team is here to guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="#contact-form"
              className="px-8 py-3 bg-gold-primary hover:bg-gold-dark text-white rounded transition-colors text-lg font-medium"
            >
              Submit Your Gems
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white/10 text-white rounded transition-colors text-lg font-medium"
            >
              Contact Us
            </Link>
          </div>
        </motion.section>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-4">Submit Your Gems</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fill out the form below to begin the process of selling your gemstones with us.
              Our team will review your submission and contact you within 48 hours.
            </p>
          </div>
          <div className="bg-[#f9f8f6] rounded-2xl shadow-xl overflow-hidden p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-primary"
                />
                <input
                  type="text"
                  placeholder="Your Location"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-primary"
                />
              </div>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-primary"
                required
              >
                <option value="">Select item type</option>
                <option value="loose-gemstones">Loose Gemstones</option>
                <option value="jewelry">Jewelry with Gemstones</option>
                <option value="collection">Collection of Items</option>
                <option value="other">Other</option>
              </select>
              <textarea
                rows={4}
                placeholder="Describe your items in detail, including type, carat weight, color, clarity, and any certifications."
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-primary"
                required
              ></textarea>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Photos (optional)
                </label>
                <input type="file" multiple accept="image/*" className="block w-full text-sm text-gray-500" />
              </div>
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 h-4 w-4 text-gold-primary focus:ring-gold-primary border-gray-300 rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the Transilk <Link href="/terms" className="text-gold-primary hover:text-gold-dark">terms and conditions</Link> and acknowledge that my information will be used in accordance with the <Link href="/privacy" className="text-gold-primary hover:text-gold-dark">privacy policy</Link>.
                </label>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gold-primary hover:bg-gold-dark text-white font-medium rounded-md transition-colors"
              >
                Submit Your Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
