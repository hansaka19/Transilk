import React from 'react'
import { Link } from 'react-router-dom'

const Journey: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-white text-gray-900">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-6">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">Journey</p>

        <nav className="hidden gap-8 text-xs font-medium uppercase tracking-[0.25em] text-gray-500 md:flex">
          <Link to="/stones" className="hover:text-gray-900">
            Stones
          </Link>
          <Link to="/collections" className="hover:text-gray-900">
            Collections
          </Link>
          <Link to="/support" className="hover:text-gray-900">
            Support
          </Link>
          <button className="text-gray-900 border-b border-gray-900 pb-1">Journey</button>
        </nav>

        <p className="text-xs text-gray-500">From mine to memory</p>
      </header>

      <div className="relative mx-auto mt-6 max-w-6xl px-4 pb-16">
        <div className="pointer-events-none absolute -left-50 top-1/2 hidden -translate-y-1/2 md:block">
          <p className="-rotate-90 text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Transilk · Journey</p>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">The Transilk Journey</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-gray-600 md:text-base">
            Rooted in Sri Lanka’s legendary gem fields, Transilk traces each piece from rough stone to finished heirloom.
            Follow the path your jewel takes — from earth, to artisan hands, to the stories you carry forward.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Traceability', value: 'Tagged', detail: 'Origin noted on intake' },
            { label: 'Turnaround', value: '3–4 weeks', detail: 'typical custom build' },
            { label: 'Aftercare', value: 'Included', detail: 'cleaning + checks' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-[0_12px_28px_-20px_rgba(17,24,39,0.18)]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-500">{stat.label}</p>
              <p className="mt-2 text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_20px_60px_-32px_rgba(17,24,39,0.22)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">Timeline</p>

              <div className="mt-5 space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 flex flex-col items-center">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white">
                      01
                    </div>
                    <div className="h-full w-px flex-1 bg-gray-200" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">Origins</p>
                    <h2 className="text-sm font-semibold text-gray-900">Sourced from Sri Lanka and beyond</h2>
                    <p className="text-xs leading-relaxed text-gray-600">
                      We begin in the gem fields of Sri Lanka — and select partner regions — where rough material is
                      carefully chosen for color, structure, and cutting potential.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 flex flex-col items-center">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white">
                      02
                    </div>
                    <div className="h-full w-px flex-1 bg-gray-200" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">Cut & calibration</p>
                    <h2 className="text-sm font-semibold text-gray-900">Faceting, polish, and proportion</h2>
                    <p className="text-xs leading-relaxed text-gray-600">
                      Rough stones move to our cutters, where proportions, symmetry, and polish are tuned to balance
                      brilliance with each stone’s natural character.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 flex flex-col items-center">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white">
                      03
                    </div>
                    <div className="h-full w-px flex-1 bg-gray-200" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">Design & setting</p>
                    <h2 className="text-sm font-semibold text-gray-900">From virtual tray to physical piece</h2>
                    <p className="text-xs leading-relaxed text-gray-600">
                      Your chosen stone is matched with a setting — either from a signature collection or a bespoke brief
                      — then modeled and refined before metal work begins.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 flex flex-col items-center">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white">
                      04
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">Aftercare</p>
                    <h2 className="text-sm font-semibold text-gray-900">Polishing, checks, and future upgrades</h2>
                    <p className="text-xs leading-relaxed text-gray-600">
                      We stay with you beyond delivery — offering cleaning, prong checks, and upgrade paths as your
                      collection grows.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_18px_40px_-28px_rgba(17,24,39,0.18)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">Why Sri Lanka</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                For centuries, Sri Lanka has been a crossroads for sapphires and colored gems. Transilk draws from this
                heritage while working with modern, traceable supply routes and small workshops that honor both craft
                and community.
              </p>
            </section>
          </div>

          <div className="space-y-6">
            <section className="overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-gray-50 to-gray-200 shadow-[0_24px_70px_-40px_rgba(17,24,39,0.24)]">
              <div className="relative h-56 w-full">
                <img
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1100&q=80"
                  alt="Sri Lankan landscape"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 space-y-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-200">Sri Lanka · Ratnapura</p>
                  <p className="text-sm font-semibold text-white">Where the journey begins</p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_18px_40px_-28px_rgba(17,24,39,0.18)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">Craft & commitment</p>

              <div className="mt-4 grid gap-4 text-sm text-gray-700 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-2xl font-semibold text-gray-900">3–4 weeks</p>
                  <p className="text-xs text-gray-500">Typical timeline from stone reservation to finished piece.</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-semibold text-gray-900">1:1</p>
                  <p className="text-xs text-gray-500">Direct guidance with a gem specialist for bespoke work.</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-semibold text-gray-900">100%</p>
                  <p className="text-xs text-gray-500">Stones individually inspected before entering the Transilk tray.</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-semibold text-gray-900">Ongoing</p>
                  <p className="text-xs text-gray-500">Aftercare for cleaning, resizing, and long-term wear.</p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_18px_40px_-28px_rgba(17,24,39,0.18)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">Continue the journey</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                Start by reserving a stone in your virtual tray, or step straight into a signature collection and adapt
                it to your story.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  to="/stones"
                  className="rounded-full bg-gray-900 px-7 py-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-white hover:bg-black transition"
                >
                  Explore stones
                </Link>
                <Link
                  to="/collections"
                  className="rounded-full border border-gray-300 bg-white px-7 py-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-800 hover:border-gray-500 transition"
                >
                  View collections
                </Link>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_18px_40px_-28px_rgba(17,24,39,0.18)] md:flex md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-500">Ready to begin?</p>
            <h3 className="text-2xl font-semibold tracking-tight text-gray-900">Plan your parcel or design in one call</h3>
            <p className="max-w-2xl text-sm leading-relaxed text-gray-600">
              Share your budget, preferred shapes, and timeline—we’ll outline sourcing options and a build schedule in the first conversation.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 md:mt-0 md:ml-6">
            <Link
              to="/minecart"
              className="rounded-full bg-gray-900 px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-white hover:bg-black transition"
            >
              Start a tray
            </Link>
            <Link
              to="/support"
              className="rounded-full border border-gray-300 bg-white px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-800 hover:border-gray-500 transition"
            >
              Talk to support
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Journey
