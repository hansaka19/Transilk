'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '../../store/cartStore';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-[#f5f5f5] text-[#1c1c1c] pt-24 pb-10 px-6 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-gray-300 pt-10">
        <div className="text-sm">
          <h3 className="text-lg font-semibold tracking-wide mb-4">About TRANSILK</h3>
          <p className="text-gray-500">
            TRANSILK offers ethically sourced and masterfully cut gemstones from Sri Lanka. We combine tradition with timeless beauty.
          </p>
        </div>
        <div className="text-sm">
          <h3 className="text-lg font-semibold tracking-wide mb-4">Quick Links</h3>
          <ul className="space-y-3">
            {[
              { href: '/', label: 'Home' },
              { href: '/gemstones', label: 'Gemstones' },
              { href: '/jewelleries', label: 'Jewelleries' },
              { href: '/auctions', label: 'Auctions' },
              { href: '/contact', label: 'Contact Us' }
            ].map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <h3 className="text-lg font-semibold tracking-wide mb-4">Get In Touch</h3>
          <ul className="space-y-3 text-gray-500">
            <li>123 Gem Street, Colombo, Sri Lanka</li>
            <li>info@transilk.com</li>
            <li>+94 11 123 4567</li>
          </ul>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center text-center text-gray-400 text-xs">
        <div className="flex space-x-4 mb-4">
          {['Facebook', 'Instagram', 'Twitter'].map((social) => (
            <a
              key={social}
              href="#"
              className="hover:text-black transition-colors"
            >
              {social}
            </a>
          ))}
        </div>
        <div className="border-t border-gray-300 w-full max-w-5xl pt-6">
          <p>&copy; {new Date().getFullYear()} TRANSILK. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
