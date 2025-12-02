import React from 'react'
import SplineHeroViewer from './SplineHeroViewer'

const Hero = () => {
  return (
    <section className="relative overflow-hidden px-2 md:px-8 py-2 min-h-[520px] md:min-h-[720px] bg-gradient-to-b from-white via-[#f2f7f5] to-white">
      {/* Background Spline scene */}
      <SplineHeroViewer />

      <div className="relative z-10 max-w-6xl mx-auto py-6 md:py-10 text-left space-y-2">

        <h1 className="text-6xl mb-4 inset-0 md:text-8xl lg:text-9xl font-semibold tracking-tighter uppercase text-[#01161e]">
          Transilk
        </h1>

        <p className="text-base md:text-lg text-[#598392] max-w-2xl leading-snug">
          Discover refined stones and crafted jewellery in an immersive 3D experience. Explore
          curated collections with clarity and confidence, wherever you are.
        </p>

        <p className="text-lg md:text-xl text-[#124559] font-medium max-w-3xl">
          Rooted in sri lanka’s legendary gem heritage, transilk honors generations of artisanship and ethical sourcing to share ceylon sapphires and rare treasures with the world.
        </p>

        {/* Button */}
        <div className="mt-9">
          <div className="inline-flex rounded-2xl border border-white/30 bg-white/10 backdrop-blur-xl p-1 shadow-[0_12px_40px_-18px_rgba(1,17,30,0.45)]">
            <button
              type="button"
              className="inline-flex items-center justify-center px-7 py-3 rounded-xl border border-white/50 bg-white/30 text-[#01161e] font-medium uppercase tracking-tighter shadow-[0_10px_30px_-12px_rgba(1,17,30,0.35)] backdrop-blur-md hover:bg-white/40 hover:border-white/70 transition"
            >
              Dig more
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero
