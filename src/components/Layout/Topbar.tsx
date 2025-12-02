import React from "react";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";

const Topbar = () => {
  return (
    // Lightweight top strip with social links, promo text, and contact number.
    <div className="bg-white/80 backdrop-blur text-[#01161e]">
      <div className="container mx-auto flex justify-between items-center py-2 text-xs sm:text-sm px-4 sm:px-0">
        <div className="hidden md:flex items-center space-x-3">
          <a
            href="#"
            className="hover:text-[#598392] flex items-center rounded-full px-2 py-1 transition"
            aria-label="Visit Meta page"
            title="Visit Meta page"
          >
            <TbBrandMeta className="h-5 w-5" aria-hidden />
          </a>
          <a
            href="#"
            className="hover:text-[#598392] flex items-center rounded-full px-2 py-1 transition"
            aria-label="Visit Instagram profile"
            title="Visit Instagram profile"
          >
            <IoLogoInstagram className="h-5 w-5" aria-hidden />
          </a>
          <a
            href="#"
            className="hover:text-[#598392] flex items-center rounded-full px-2 py-1 transition"
            aria-label="Visit X profile"
            title="Visit X profile"
          >
            <RiTwitterXLine className="h-4 w-4" aria-hidden />
          </a>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-[#124559]">
            <span className="h-2 w-2 rounded-full bg-[#124559]" />
            <span className="font-medium">Worldwide shipping</span>
            <span className="text-slate-500">Fast, reliable delivery</span>
          </div>
        </div>
        <div className="hidden md:flex items-center">
          <a
            href="tel:+94767472467"
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 hover:text-[#598392] transition"
          >
            <span className="text-xs uppercase tracking-wide text-slate-500">Call</span>
            <span className="font-semibold">+94 76 747 2467</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
