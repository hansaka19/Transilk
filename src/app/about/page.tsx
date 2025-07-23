'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <main className="pt-24 pb-0 bg-[#f9f8f6] text-[#2a2a2a] font-light">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#f9f8f6]">
        <Image
          src="https://images.pexels.com/photos/1573236/pexels-photo-1573236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
          alt="About Transilk"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-indigo-900/70"></div>
        <div className="relative z-10 text-center w-full">
          <h1 className="text-5xl md:text-6xl font-light text-white mb-6 drop-shadow-lg">
            About <span className="text-gold-primary">Transilk</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our story, mission, and commitment to ethical gemstones and jewelry.
          </p>
          <Link
            href="#about-details"
            className="inline-block px-8 py-3 bg-gold-primary hover:bg-gold-dark text-white rounded transition-colors text-lg font-medium shadow-lg"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section id="about-details" className="max-w-5xl mx-auto px-6 md:px-20 py-24">
        {/* Mission & Values */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-24"
        >
          <h2 className="text-4xl font-light mb-6 text-center">Our Mission & Values</h2>
          <div className="w-24 h-[2px] bg-gold-primary mx-auto mb-8"></div>
          <p className="text-lg text-[#555] leading-relaxed text-center max-w-3xl mx-auto mb-12">
            At Transilk, we connect people with the earth’s most precious treasures. Our mission is to source and offer exceptional gemstones and jewelry pieces that celebrate natural beauty and ethical practices.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                ),
                title: "Quality Without Compromise",
                description: "Every gemstone in our collection meets the highest standards of quality and authenticity.",
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                ),
                title: "Global Reach, Local Impact",
                description: "Supporting local communities in Sri Lanka through sustainable and ethical sourcing practices.",
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Ethical Sourcing",
                description: "We ensure all gemstones are ethically sourced and support sustainable mining practices.",
              }
            ]
            .map((benefit, index) => (
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

        {/* Journey Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-24"
        >
          <h2 className="text-4xl font-light mb-6 text-center">Our Journey</h2>
          <div className="w-24 h-[2px] bg-gold-primary mx-auto mb-8"></div>
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
            {[
              {
                year: "2021",
                title: "Foundation",
                description: "Transilk was founded with a vision to connect fine gemstone collectors with the exceptional stones of Sri Lanka."
              },
              {
                year: "2022",
                title: "International Expansion",
                description: "We expanded our operations globally, reaching collectors and enthusiasts across Europe and North America."
              },
              {
                year: "2023",
                title: "Bespoke Jewelry Launch",
                description: "Introduced our custom jewelry design service, allowing clients to create unique pieces with our exceptional gemstones."
              },
              {
                year: "Today",
                title: "Expanding Our Vision",
                description: "Continuing to grow while maintaining our commitment to quality, ethics, and exceptional customer experiences."
              }
            ].map((step, idx) => (
              <div key={step.year} className="flex flex-col items-center text-center max-w-xs">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gold-primary flex items-center justify-center text-white font-bold text-xl shadow mb-4">
                  {step.year}
                </div>
                <h4 className="font-light text-lg mb-1">{step.title}</h4>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Meet the Team */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-24"
        >
          <h2 className="text-4xl font-light mb-6 text-center">Meet Our Team</h2>
          <div className="w-24 h-[2px] bg-gold-primary mx-auto mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Alexander Mitchell",
                title: "Founder & CEO",
                image: "https://images.pexels.com/photos/5792641/pexels-photo-5792641.jpeg?auto=compress&cs=tinysrgb&w=600",
                bio: "With over 20 years in the gemstone industry, Alexander founded Transilk to share his passion for exceptional stones."
              },
              {
                name: "Samantha Perera",
                title: "Lead Gemologist",
                image: "https://images.pexels.com/photos/1586973/pexels-photo-1586973.jpeg?auto=compress&cs=tinysrgb&w=600",
                bio: "GIA-certified gemologist with expertise in identifying and grading precious stones from Sri Lanka and beyond."
              },
              {
                name: "David Chen",
                title: "Head of Design",
                image: "https://images.pexels.com/photos/3767392/pexels-photo-3767392.jpeg?auto=compress&cs=tinysrgb&w=600",
                bio: "Award-winning jewelry designer who transforms raw gemstones into breathtaking wearable art."
              },
              {
                name: "Amara Jayawardene",
                title: "Ethically Sourcing Director",
                image: "https://images.pexels.com/photos/3746314/pexels-photo-3746314.jpeg?auto=compress&cs=tinysrgb&w=600",
                bio: "Leads our efforts to ensure all gemstones are ethically sourced and supports sustainable mining practices."
              }
            ].map((member, index) => (
              <div key={index} className="rounded-2xl overflow-hidden group bg-[#f9f8f6] shadow hover:shadow-lg transition-shadow">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-light mb-1">{member.name}</h3>
                  <p className="text-gold-primary mb-3">{member.title}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-indigo-900 rounded-2xl shadow p-12 text-white text-center"
        >
          <h2 className="text-3xl md:text-4xl font-light mb-6">Begin Your Journey With Us</h2>
          <p className="text-xl mb-8 text-white/80 max-w-2xl mx-auto">
            Whether you&apos;re looking for a special gemstone, custom jewelry design, or investment opportunities,
            we&apos;re here to guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/gemstones"
              className="px-8 py-3 bg-gold-primary hover:bg-gold-dark text-white rounded transition-colors text-lg font-medium"
            >
              Explore Our Collection
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
    </main>
  );
}
