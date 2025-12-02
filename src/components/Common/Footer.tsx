import React from "react";
import { Link } from "react-router-dom";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";

const Footer = () => {
  return (
    // Modern footer with brand, quick links, socials, and newsletter form.
    <footer className="bg-[#01161e] text-slate-100 mt-16">
      <div className="container mx-auto px-6 py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Brand block */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-semibold tracking-tight text-white">
              Transilk
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed">
              Curated stones and crafted jewellery, sourced responsibly and delivered worldwide.
            </p>
            <div className="flex items-center gap-3">
              {/* Social icons */}
              {[TbBrandMeta, IoLogoInstagram, RiTwitterXLine].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 grid place-items-center transition"
                  aria-label="Social link"
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-white tracking-wide">Shop</p>
            <div className="flex flex-col gap-2 text-sm text-slate-300">
              <Link to="#" className="hover:text-white transition">Stones</Link>
              <Link to="#" className="hover:text-white transition">Jewelleries</Link>
              <Link to="#" className="hover:text-white transition">Collections</Link>
              <Link to="#" className="hover:text-white transition">Gifting</Link>
            </div>
          </div>

          {/* Support links */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-white tracking-wide">Support</p>
            <div className="flex flex-col gap-2 text-sm text-slate-300">
              <Link to="#" className="hover:text-white transition">Contact</Link>
              <Link to="#" className="hover:text-white transition">FAQ</Link>
              <Link to="#" className="hover:text-white transition">Shipping</Link>
              <Link to="#" className="hover:text-white transition">Returns</Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-white tracking-wide">Stay in the loop</p>
            <p className="text-sm text-slate-300">
              Exclusive drops, care guides, and the stories behind each stone.
            </p>
            <form className="space-y-3">
              <div className="flex items-center gap-2 rounded-lg bg-white/5 p-2 border border-white/10 focus-within:border-[#598392] transition">
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold rounded-md bg-[#124559] hover:bg-[#0f394a] transition"
                >
                  Join
                </button>
              </div>
              <p className="text-xs text-slate-400">
                By subscribing you agree to receive updates. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>

        {/* Legal strip */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Transilk. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="#" className="hover:text-white transition">Privacy</Link>
            <Link to="#" className="hover:text-white transition">Terms</Link>
            <Link to="#" className="hover:text-white transition">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
