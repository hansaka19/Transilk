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

  const orders = [
    {
      id: 'ORD-2041',
      item: 'Ceylon Blue Sapphire · 3.2 ct',
      status: 'Processing',
      eta: 'Ships in 3-5 days',
      amount: '$3,800',
      tracking: null,
    },
    {
      id: 'ORD-2035',
      item: 'Lumina Halo Ring · Platinum',
      status: 'Delivered',
      eta: 'Delivered Jun 02',
      amount: '$6,400',
      tracking: 'TRK-8821-SL',
    },
  ]

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)

  return (
    <section className="relative min-h-screen bg-white text-gray-900">
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
        <div className="pointer-events-none absolute -left-50 top-1/2 hidden -translate-y-1/2 md:block">
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

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Tier', value: user.tier, detail: 'Current member level' },
            { label: 'Tray items', value: '0', detail: 'Saved to minecart' },
            { label: 'Wishlist', value: '0', detail: 'Saved favourites' },
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

        {/* Big 3-column app card */}
        <div className="rounded-[32px] border border-gray-200 bg-white shadow-[0_40px_120px_-60px_rgba(17,24,39,0.28)] overflow-hidden mt-6">
          <div className="grid gap-0 md:grid-cols-[260px_minmax(0,1.5fr)_minmax(0,1.2fr)]">
            {/* LEFT: sidebar / mini profile & menu */}
            <aside className="bg-gray-50 px-6 py-6 space-y-6">
              {/* avatar + basic info */}
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-900 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_16px_30px_-18px_rgba(17,24,39,0.7)]">
                  {initials}
                </div>
                <div className="space-y-0.5 text-sm">
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-600">{user.email}</p>
                  <p className="text-[11px] text-gray-500">
                    Member since {user.memberSince}
                  </p>
                </div>
              </div>

              <div className="space-y-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-gray-500">
                <p>Profile menu</p>
              </div>

              <nav className="space-y-2 text-sm text-gray-800">
                <button className="flex w-full items-center justify-between rounded-xl bg-white px-3 py-2 font-medium shadow-[0_8px_24px_-16px_rgba(17,24,39,0.25)]">
                  Overview
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
                    Active
                  </span>
                </button>
                <button className="w-full rounded-xl px-3 py-2 text-left text-gray-600 hover:bg-white hover:text-gray-900 transition">
                  Orders & shipping
                </button>
                <button className="w-full rounded-xl px-3 py-2 text-left text-gray-600 hover:bg-white hover:text-gray-900 transition">
                  Preferences
                </button>
                <button className="w-full rounded-xl px-3 py-2 text-left text-gray-600 hover:bg-white hover:text-gray-900 transition">
                  Saved & wishlist
                </button>
                <button className="w-full rounded-xl px-3 py-2 text-left text-gray-600 hover:bg-white hover:text-gray-900 transition">
                  Security
                </button>
              </nav>

              <div className="pt-4 space-y-2 border-t border-slate-200">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gray-500">
                  Tier
                </p>
                <p className="inline-flex items-center rounded-full bg-gray-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-white shadow-[0_14px_32px_-18px_rgba(17,24,39,0.6)]">
                  {user.tier} collector
                </p>
              </div>
            </aside>

            {/* CENTER */}
            <main className="relative bg-white px-7 py-7">
              <div className="relative flex flex-col gap-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-500">
                      Account overview
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight">
                      {user.name}
                    </h2>
                    <p className="text-xs text-gray-600">
                      {user.country} · Member since {user.memberSince}
                    </p>
                  </div>

                  <div className="flex gap-6 text-sm">
                    <div className="space-y-1 text-right">
                      <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
                        Stones viewed
                      </p>
                      <p className="text-lg font-semibold">0</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
                        Tray items
                      </p>
                      <p className="text-lg font-semibold">0</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-xs leading-relaxed text-gray-700 shadow-[0_18px_40px_-26px_rgba(17,24,39,0.14)]">
                  <p>
                    This profile stores your preferences, trays, and future orders across
                    devices. As you explore stones and collections, we’ll tune recommendations
                    to your favorite cuts, colors, and settings.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 text-xs">
                  <button className="rounded-full border border-gray-300 bg-white px-5 py-2 font-semibold uppercase tracking-[0.25em] text-gray-900 shadow-[0_16px_40px_-26px_rgba(17,24,39,0.14)] transition hover:border-gray-500">
                    Edit profile
                  </button>
                  <button className="rounded-full border border-gray-300 bg-white px-5 py-2 font-semibold uppercase tracking-[0.25em] text-gray-700 shadow-[0_16px_40px_-26px_rgba(17,24,39,0.12)] transition hover:border-gray-500">
                    Change password
                  </button>
                </div>

                <div className="mt-2 grid gap-3 md:grid-cols-3 text-[11px]">
                  {[
                    { label: 'Updates', desc: 'Email about new stones & drops.', status: 'Enabled' },
                    { label: 'Studio news', desc: 'Workshop & behind-the-scenes.', status: 'Off' },
                    { label: 'Early access', desc: 'Limited drops & previews.', status: 'Enabled' },
                  ].map((pref) => (
                    <div key={pref.label} className="rounded-2xl border border-gray-200 bg-white px-3 py-3 shadow-[0_10px_26px_-20px_rgba(17,24,39,0.14)]">
                      <p className="font-semibold uppercase tracking-[0.26em] text-gray-500">
                        {pref.label}
                      </p>
                      <p className="mt-1 text-[11px] text-gray-600">
                        {pref.desc}
                      </p>
                      <p className="mt-2 inline-flex rounded-full bg-gray-100 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-gray-800">
                        {pref.status}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-[0_12px_30px_-22px_rgba(17,24,39,0.16)]">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">Communication</p>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Email</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-600">Primary: {user.email}</p>
                    <button className="mt-3 rounded-full border border-gray-300 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-gray-800 hover:border-gray-500 transition">
                      Update email
                    </button>
                  </div>
                  <div className="rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-[0_12px_30px_-22px_rgba(17,24,39,0.16)]">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">Security</p>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">2FA</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-600">Two-factor authentication not enabled.</p>
                    <button className="mt-3 rounded-full border border-gray-300 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-gray-800 hover:border-gray-500 transition">
                      Enable 2FA
                    </button>
                  </div>
                  <div className="rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-[0_12px_30px_-22px_rgba(17,24,39,0.16)]">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">Shipping</p>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Default</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-600">
                      Colombo, Sri Lanka · Insured courier · Signature required
                    </p>
                    <button className="mt-3 rounded-full border border-gray-300 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-gray-800 hover:border-gray-500 transition">
                      Edit address
                    </button>
                  </div>
                  <div className="rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-[0_12px_30px_-22px_rgba(17,24,39,0.16)]">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">Preferences</p>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Recommendations</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-600">
                      Shapes: Oval, Cushion · Metals: Platinum, 18k · Color palette: Neutral
                    </p>
                    <button className="mt-3 rounded-full border border-gray-300 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-gray-800 hover:border-gray-500 transition">
                      Edit preferences
                    </button>
                  </div>
                </div>
              </div>
            </main>

            {/* RIGHT column */}
            <div className="space-y-4 bg-gray-50 px-6 py-6">
              {/* Recent orders */}
              <section className="rounded-3xl border border-gray-200 bg-white p-4 shadow-[0_18px_40px_-26px_rgba(17,24,39,0.18)]">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                    Recent orders
                  </p>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
                    More
                  </span>
                </div>

                <div className="space-y-3 text-sm text-gray-700">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="rounded-2xl border border-gray-200 bg-gray-50 px-3 py-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{order.item}</p>
                          <p className="text-xs text-gray-500">{order.id}</p>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{order.amount}</p>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-gray-600">
                        <span className="rounded-full bg-gray-200 px-3 py-1 text-gray-800">{order.status}</span>
                        <span>{order.eta}</span>
                        {order.tracking && (
                          <span className="rounded-full bg-white px-3 py-1 border border-gray-300 text-gray-700">
                            {order.tracking}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Saved / wishlist list style */}
              <section className="rounded-3xl border border-gray-200 bg-white p-4 shadow-[0_18px_40px_-26px_rgba(17,24,39,0.18)]">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                    Saved & wishlist
                  </p>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
                    More
                  </span>
                </div>

                <div className="space-y-3 text-sm text-gray-700">
                  {[
                    { title: 'Ceylon Blue Sapphire · 3.2 ct', tag: 'Stone', note: 'Saved from stones page' },
                    { title: 'Lumina Halo Ring · Platinum', tag: 'Jewellery', note: 'Saved from collections' },
                  ].map((item) => (
                    <div key={item.title} className="rounded-2xl border border-gray-200 bg-gray-50 px-3 py-3">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-900">{item.title}</p>
                        <span className="rounded-full bg-white px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gray-700 border border-gray-300">
                          {item.tag}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-gray-600">{item.note}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Quick links */}
              <section className="rounded-3xl border border-gray-200 bg-white p-4 shadow-[0_18px_40px_-26px_rgba(17,24,39,0.18)]">
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

              {/* Security summary */}
              <section className="rounded-3xl border border-gray-200 bg-white p-4 shadow-[0_18px_40px_-26px_rgba(17,24,39,0.18)]">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                    Security
                  </p>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
                    Manage
                  </span>
                </div>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 px-3 py-3">
                    <p className="font-semibold text-gray-900">Two-factor authentication</p>
                    <p className="mt-1 text-xs text-gray-600">Status: Not enabled. Add an authenticator app or SMS.</p>
                    <button className="mt-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-gray-800 hover:border-gray-500 transition">
                      Enable 2FA
                    </button>
                  </div>
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 px-3 py-3">
                    <p className="font-semibold text-gray-900">Login alerts</p>
                    <p className="mt-1 text-xs text-gray-600">Receive an email for new device sign-ins.</p>
                    <div className="mt-2 inline-flex rounded-full bg-white px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-gray-700 border border-gray-300">
                      Enabled
                    </div>
                  </div>
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
