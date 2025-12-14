import React from 'react'
import { Link } from 'react-router-dom'

const Support: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-white text-gray-900">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-6">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">Support</p>

        <nav className="hidden gap-8 text-xs font-medium uppercase tracking-[0.25em] text-gray-500 md:flex">
          <Link to="/stones" className="hover:text-gray-900">
            Stones
          </Link>
          <Link to="/collections" className="hover:text-gray-900">
            Collections
          </Link>
          <Link to="/jewelleries" className="hover:text-gray-900">
            Jewellery
          </Link>
          <button className="text-gray-900 border-b border-gray-900 pb-1 uppercase">Support</button>
        </nav>

        <p className="text-xs text-gray-500">We’re here to help</p>
      </header>

      <div className="relative mx-auto mt-6 max-w-6xl px-4 pb-16">
        <div className="pointer-events-none absolute -left-50 top-1/2 hidden -translate-y-1/2 md:block">
          <p className="-rotate-90 text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
            Transilk · Service
          </p>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Support & Aftercare</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-gray-600 md:text-base">
            From stone selection to long-term care, Transilk support is here to guide your journey. Find answers,
            request adjustments, or speak directly with our studio team.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Avg. response', value: '< 2h', detail: 'Colombo studio hours' },
            { label: 'Service window', value: '7 days', detail: 'post-delivery checks' },
            { label: 'Logistics', value: 'Insured', detail: 'global carriers' },
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

        <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-[0_20px_60px_-32px_rgba(17,24,39,0.22)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">Contact the studio</p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-gray-900">Talk to a gem specialist</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Share reference images, budgets, or existing stones. We’ll help you choose the right material, setting,
                and timeline.
              </p>

              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <p>
                  Email:{' '}
                  <a
                    href="mailto:support@transilk.studio"
                    className="font-medium text-gray-900 underline-offset-2 hover:underline"
                  >
                    support@transilk.studio
                  </a>
                </p>
                <p>
                  WhatsApp: <span className="font-medium text-gray-900">+94 7X XXX XXXX</span>
                </p>
                <p>
                  Studio hours: <span className="font-medium text-gray-900">Mon – Sat, 10:00 – 18:00 (IST)</span>
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button className="rounded-full bg-gray-900 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-white hover:bg-black transition">
                  Message support
                </button>
                <button className="rounded-full border border-gray-300 bg-white px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-800 hover:border-gray-500 transition">
                  Book a call
                </button>
              </div>
            </section>

            <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-[0_18px_40px_-28px_rgba(17,24,39,0.18)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">Quick help</p>
              <div className="mt-4 grid gap-3 text-sm text-gray-700">
                {[
                  ['Order status & shipping', 'View'],
                  ['Resizing & adjustments', 'Learn'],
                  ['Gem certification & reports', 'View'],
                  ['Returns & exchanges', 'Policy'],
                ].map(([label, action]) => (
                  <button
                    key={label}
                    className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-left hover:border-gray-400 hover:bg-white transition"
                    type="button"
                  >
                    <span>{label}</span>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400">{action}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-5">
            <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-[0_18px_40px_-28px_rgba(17,24,39,0.18)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">Orders & shipping</p>
              <div className="mt-3 space-y-3 text-sm text-gray-700">
                <details className="group rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                  <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-gray-800">
                    How long does an order usually take?
                    <span className="ml-3 text-[11px] uppercase tracking-[0.2em] text-gray-400 group-open:rotate-90 transition-transform">
                      →
                    </span>
                  </summary>
                  <p className="mt-2 text-xs leading-relaxed text-gray-600">
                    Ready pieces typically ship within 3–5 business days. Bespoke settings or custom sizing may take 2–4
                    weeks depending on workshop load and stone selection.
                  </p>
                </details>

                <details className="group rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                  <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-gray-800">
                    Do you ship internationally?
                    <span className="ml-3 text-[11px] uppercase tracking-[0.2em] text-gray-400 group-open:rotate-90 transition-transform">
                      →
                    </span>
                  </summary>
                  <p className="mt-2 text-xs leading-relaxed text-gray-600">
                    Yes. We ship from Sri Lanka with insured logistics partners. Duties and import taxes may apply
                    depending on your country&apos;s regulations.
                  </p>
                </details>
              </div>
            </section>

            <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-[0_18px_40px_-28px_rgba(17,24,39,0.18)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">Stones & certification</p>
              <div className="mt-3 space-y-3 text-sm text-gray-700">
                <details className="group rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                  <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-gray-800">
                    Are your stones certified?
                    <span className="ml-3 text-[11px] uppercase tracking-[0.2em] text-gray-400 group-open:rotate-90 transition-transform">
                      →
                    </span>
                  </summary>
                  <p className="mt-2 text-xs leading-relaxed text-gray-600">
                    Many of our stones include documentation from recognized labs. For high-value sapphires and diamonds,
                    we can arrange certification on request before final setting.
                  </p>
                </details>

                <details className="group rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                  <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-gray-800">
                    Can I send my own stone?
                    <span className="ml-3 text-[11px] uppercase tracking-[0.2em] text-gray-400 group-open:rotate-90 transition-transform">
                      →
                    </span>
                  </summary>
                  <p className="mt-2 text-xs leading-relaxed text-gray-600">
                    Yes, in many cases we can design and set using your existing stone. Our team will first review photos,
                    measurements, and condition before confirming feasibility.
                  </p>
                </details>
              </div>
            </section>

            <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-[0_18px_40px_-28px_rgba(17,24,39,0.18)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">Care & aftercare</p>
              <div className="mt-3 space-y-3 text-sm text-gray-700">
                <details className="group rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                  <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-gray-800">
                    How do I care for my piece?
                    <span className="ml-3 text-[11px] uppercase tracking-[0.2em] text-gray-400 group-open:rotate-90 transition-transform">
                      →
                    </span>
                  </summary>
                  <p className="mt-2 text-xs leading-relaxed text-gray-600">
                    Remove jewellery during impact-heavy activities, store pieces separately, and clean gently with mild
                    soap and a soft brush. Avoid harsh chemicals and sudden temperature shifts.
                  </p>
                </details>

                <details className="group rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                  <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-gray-800">
                    Do you offer polishing or maintenance?
                    <span className="ml-3 text-[11px] uppercase tracking-[0.2em] text-gray-400 group-open:rotate-90 transition-transform">
                      →
                    </span>
                  </summary>
                  <p className="mt-2 text-xs leading-relaxed text-gray-600">
                    We can assist with professional cleaning, prong checks, and surface refinishing. Reach out with
                    photos and we&apos;ll recommend the right service path.
                  </p>
                </details>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_18px_40px_-28px_rgba(17,24,39,0.18)] md:flex md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-500">Need a person?</p>
            <h3 className="text-2xl font-semibold tracking-tight text-gray-900">Get routed to the right specialist</h3>
            <p className="max-w-2xl text-sm leading-relaxed text-gray-600">
              Share your order ID, stone preference, or sizing notes and we’ll assign a dedicated teammate for faster replies.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 md:mt-0 md:ml-6">
            <button className="rounded-full bg-gray-900 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-white hover:bg-black transition">
              Start chat
            </button>
            <a
              href="mailto:support@transilk.studio"
              className="rounded-full border border-gray-300 bg-white px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-800 hover:border-gray-500 transition"
            >
              Email us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Support
