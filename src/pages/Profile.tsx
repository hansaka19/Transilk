import React from 'react'
import { Link } from 'react-router-dom'

const Profile: React.FC = () => {
  const user = {
    name: 'Guest Collector',
    email: 'guest@example.com',
    memberSince: '2024',
    country: 'Sri Lanka',
    tier: 'Explorer',
  }

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)

  return (
    <section className="relative min-h-screen bg-[#f7f7f8] text-[#111827]">
      {/* Top header (kept simple) */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-6">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
          Profile
        </p>

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
          <button className="text-gray-900 border-b border-gray-900 pb-1">
            Profile
          </button>
        </nav>

        <p className="text-xs text-gray-500">Account & preferences</p>
      </header>

      {/* Main content frame (Dribbble-style app card) */}
      <div className="relative mx-auto mt-8 max-w-6xl px-4 pb-16">
        {/* vertical label */}
        <div className="pointer-events-none absolute -left-32 top-1/2 hidden -translate-y-1/2 md:block">
          <p className="-rotate-90 text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
            Transilk · Profile
          </p>
        </div>

        <div className="mb-6 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Welcome back, {user.name}
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-gray-600 md:text-base">
            Manage your details, review past orders, and fine-tune how we recommend stones
            and collections for you.
          </p>
        </div>

        {/* Big 3-column app card */}
        <div className="rounded-[32px] border border-white/70 bg-white shadow-[0_40px_120px_-50px_rgba(15,23,42,0.95)] overflow-hidden">
          <div className="grid gap-0 md:grid-cols-[260px_minmax(0,1.5fr)_minmax(0,1.2fr)]">
            {/* LEFT: sidebar / mini profile & menu */}
            <aside className="bg-[#f3f4f6] px-6 py-6 space-y-6">
              {/* avatar + basic info */}
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#01161e] text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_16px_30px_-18px_rgba(1,17,30,0.9)]">
                  {initials}
                </div>
                <div className="space-y-0.5 text-sm">
                  <p className="font-semibold text-[#01161e]">{user.name}</p>
                  <p className="text-xs text-[#598392]">{user.email}</p>
                  <p className="text-[11px] text-[#7c8a99]">
                    Member since {user.memberSince}
                  </p>
                </div>
              </div>

              <div className="space-y-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7c8a99]">
                <p>Profile menu</p>
              </div>

              <nav className="space-y-2 text-sm text-[#124559]">
                <button className="flex w-full items-center justify-between rounded-xl bg-white px-3 py-2 font-medium shadow-[0_8px_24px_-16px_rgba(15,23,42,0.55)]">
                  Overview
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#7c8a99]">
                    Active
                  </span>
                </button>
                <button className="w-full rounded-xl px-3 py-2 text-left text-[#598392] hover:bg-white hover:text-[#124559] transition">
                  Orders & shipping
                </button>
                <button className="w-full rounded-xl px-3 py-2 text-left text-[#598392] hover:bg-white hover:text-[#124559] transition">
                  Preferences
                </button>
                <button className="w-full rounded-xl px-3 py-2 text-left text-[#598392] hover:bg-white hover:text-[#124559] transition">
                  Saved & wishlist
                </button>
                <button className="w-full rounded-xl px-3 py-2 text-left text-[#598392] hover:bg-white hover:text-[#124559] transition">
                  Security
                </button>
              </nav>

              <div className="pt-4 space-y-2 border-t border-slate-200">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7c8a99]">
                  Tier
                </p>
                <p className="inline-flex items-center rounded-full bg-[#01161e] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-white shadow-[0_14px_32px_-18px_rgba(1,17,30,0.9)]">
                  {user.tier} collector
                </p>
              </div>
            </aside>

            {/* CENTER: dark main profile panel (like big card in screenshot) */}
            <main className="relative bg-gradient-to-b from-[#01161e] via-[#01161e] to-[#022534] px-7 py-7 text-white">
              {/* subtle background accents */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-16 top-10 h-40 w-40 rounded-full bg-[#598392]/20 blur-3xl" />
                <div className="absolute right-0 bottom-0 h-40 w-40 rounded-full bg-[#aec3b0]/20 blur-3xl" />
              </div>

              <div className="relative flex flex-col gap-6">
                {/* name + primary stats */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#aec3b0]">
                      Account overview
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight">
                      {user.name}
                    </h2>
                    <p className="text-xs text-[#c6d6cc]">
                      {user.country} · Member since {user.memberSince}
                    </p>
                  </div>

                  <div className="flex gap-6 text-sm">
                    <div className="space-y-1 text-right">
                      <p className="text-xs uppercase tracking-[0.25em] text-[#aec3b0]">
                        Stones viewed
                      </p>
                      <p className="text-lg font-semibold">0</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-xs uppercase tracking-[0.25em] text-[#aec3b0]">
                        Tray items
                      </p>
                      <p className="text-lg font-semibold">0</p>
                    </div>
                  </div>
                </div>

                {/* “about” text */}
                <div className="rounded-2xl bg-white/5 p-4 text-xs leading-relaxed text-[#d6e3dd] border border-white/10 shadow-[0_18px_40px_-26px_rgba(0,0,0,0.75)]">
                  <p>
                    This profile stores your preferences, trays, and future orders across
                    devices. As you explore stones and collections, we’ll tune recommendations
                    to your favorite cuts, colors, and settings.
                  </p>
                </div>

                {/* buttons row */}
                <div className="flex flex-wrap gap-3 text-xs">
                  <button className="rounded-full border border-white/40 bg-white/15 px-5 py-2 font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-md shadow-[0_16px_40px_-26px_rgba(0,0,0,0.9)] transition hover:border-white/70 hover:bg-white/25">
                    Edit profile
                  </button>
                  <button className="rounded-full border border-white/40 bg-white/10 px-5 py-2 font-semibold uppercase tracking-[0.25em] text-[#e5f0e9] backdrop-blur-md shadow-[0_16px_40px_-26px_rgba(0,0,0,0.7)] transition hover:border-white/70 hover:bg-white/20 hover:text-white">
                    Change password
                  </button>
                </div>

                {/* center bottom: Preferences preview (3 toggles) */}
                <div className="mt-2 grid gap-3 md:grid-cols-3 text-[11px]">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
                    <p className="font-semibold uppercase tracking-[0.26em] text-[#aec3b0]">
                      Updates
                    </p>
                    <p className="mt-1 text-[11px] text-[#d6e3dd]">
                      Email about new stones & drops.
                    </p>
                    <p className="mt-2 inline-flex rounded-full bg-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.24em]">
                      Enabled
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
                    <p className="font-semibold uppercase tracking-[0.26em] text-[#aec3b0]">
                      Studio news
                    </p>
                    <p className="mt-1 text-[11px] text-[#d6e3dd]">
                      Workshop & behind-the-scenes.
                    </p>
                    <p className="mt-2 inline-flex rounded-full bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.24em]">
                      Off
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
                    <p className="font-semibold uppercase tracking-[0.26em] text-[#aec3b0]">
                      Early access
                    </p>
                    <p className="mt-1 text-[11px] text-[#d6e3dd]">
                      Limited drops & previews.
                    </p>
                    <p className="mt-2 inline-flex rounded-full bg-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.24em]">
                      Enabled
                    </p>
                  </div>
                </div>
              </div>
            </main>

            {/* RIGHT: “cards column” like streams/blogs in screenshot */}
            <div className="space-y-4 bg-[#f9fafb] px-6 py-6">
              {/* Recent orders */}
              <section className="rounded-3xl bg-white p-4 shadow-[0_18px_40px_-26px_rgba(15,23,42,0.7)]">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                    Recent orders
                  </p>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
                    More
                  </span>
                </div>

                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-3 py-3">
                    <div>
                      <p className="font-semibold text-gray-900">
                        No completed orders yet
                      </p>
                      <p className="text-xs text-gray-600">
                        Once your first piece ships, you’ll see tracking and history here.
                      </p>
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
                      Soon
                    </span>
                  </div>
                </div>
              </section>

              {/* Saved / wishlist list style */}
              <section className="rounded-3xl bg-white p-4 shadow-[0_18px_40px_-26px_rgba(15,23,42,0.7)]">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                    Saved & wishlist
                  </p>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
                    More
                  </span>
                </div>

                <div className="space-y-3 text-sm text-gray-700">
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 px-3 py-3">
                    <p className="font-semibold text-gray-900">No saved stones yet</p>
                    <p className="mt-1 text-xs text-gray-600">
                      Tap “Add to tray” on any stone detail page, then mark pieces you want to
                      revisit as favourites.
                    </p>
                  </div>
                </div>
              </section>

              {/* Quick links */}
              <section className="rounded-3xl bg-white p-4 shadow-[0_18px_40px_-26px_rgba(15,23,42,0.7)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                  Continue exploring
                </p>
                <div className="mt-3 flex flex-col gap-2 text-xs">
                  <Link
                    to="/stones"
                    className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 hover:border-gray-400 hover:bg-white transition"
                  >
                    <span>Explore stones</span>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
                      View
                    </span>
                  </Link>
                  <Link
                    to="/collections"
                    className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 hover:border-gray-400 hover:bg-white transition"
                  >
                    <span>Browse collections</span>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
                      Open
                    </span>
                  </Link>
                  <Link
                    to="/journey"
                    className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 hover:border-gray-400 hover:bg-white transition"
                  >
                    <span>Learn the journey</span>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
                      Read
                    </span>
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile
