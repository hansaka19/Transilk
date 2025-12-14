import { useEffect, useState } from 'react'
import Hero from '../components/Layout/Hero'
import FeaturedProducts from '../components/Products/FeaturedProducts'

const processSteps = [
  {
    title: 'Responsible intake',
    body: 'Partners across Ratnapura, Bogawantalawa, and ethically aligned African sites; each parcel logged with origin notes.',
    badge: 'Origin tagged',
  },
  {
    title: 'Optics-first sorting',
    body: 'Brightness, leakage, and facet meet quality are checked before any weight/value conversation to keep performance honest.',
    badge: 'Light graded',
  },
  {
    title: 'Reports & media',
    body: 'HD loops, daylight videos, and lab paperwork prepared together—no missing links when you present to a client.',
    badge: 'Delivery ready',
  },
  {
    title: 'Logistics & care',
    body: 'Insured handoffs, discreet packaging, and a 7-day verification window for repeat buyers.',
    badge: 'Protected',
  },
]

const Home = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#0b1a24] via-[#0f2533] to-[#0b1a24] text-white">
          <div className="flex flex-col items-center gap-5">
            <div className="relative h-18 w-40 overflow-hidden">
              <div className="absolute left-0 top-[48%] h-0.5 w-full bg-gradient-to-r from-cyan-200/30 via-cyan-300/50 to-cyan-200/30" />
              <div className="absolute left-0 top-[58%] h-0.5 w-full bg-gradient-to-r from-cyan-200/20 via-cyan-300/40 to-cyan-200/20" />

              <div className="absolute inset-0 flex items-center">
                <div className="relative flex items-center gap-2 animate-[minecart_1.4s_ease-in-out_infinite]">
                  <div className="h-9 w-12 rounded-sm border border-cyan-100/70 bg-gradient-to-br from-cyan-50 via-sky-200 to-cyan-100 shadow-[0_10px_30px_-14px_rgba(94,234,212,0.7)]" />
                  <div className="flex items-end gap-2">
                    <div className="h-3 w-3 rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.12)] animate-[wheelspin_0.9s_linear_infinite]" />
                    <div className="h-3 w-3 rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.12)] animate-[wheelspin_0.9s_linear_infinite]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-1 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100">Loading your minecart</p>
              <p className="text-xs text-cyan-200/80">We are collecting gems for your tray…</p>
            </div>
          </div>
        </div>
      )}

      <Hero />
      <FeaturedProducts />

      {/* PATHWAYS */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white px-4 py-16 text-gray-900">
        <div className="absolute left-10 top-8 h-36 w-36 rounded-full bg-gray-100 blur-3xl" />
        <div className="absolute right-12 bottom-6 h-40 w-40 rounded-full bg-gray-200 blur-3xl" />

        <div className="relative mx-auto max-w-6xl space-y-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">Choose your path</p>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Browse solo or work with a concierge
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-gray-600">
                Three entry points depending on how you like to source. Every route shares the same studio lighting,
                reporting cadence, and insured delivery.
              </p>
            </div>

            <a
              href="/journey"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-tight text-gray-900 shadow-[0_12px_38px_-24px_rgba(17,24,39,0.25)] backdrop-blur transition hover:border-gray-300 hover:bg-gray-50"
            >
              See the full journey →
            </a>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Stone library',
                description:
                  'Filter by cut family, carat band, or origin. Request light tests before checkout.',
                href: '/stones',
                tag: 'Live filtered',
                chips: ['Video-on-request', 'Lab reports', 'Parcel ready'],
              },
              {
                title: 'Studio jewellery',
                description: 'Preview finished work and ready-to-set mountings tuned for modern proportions.',
                href: '/jewelleries',
                tag: 'Made to order',
                chips: ['Balanced proportions', 'Ethical metals', 'Comfort fit'],
              },
              {
                title: 'Minecart concierge',
                description: 'Build a tray with a specialist. We shortlist stones and keep your cart aligned.',
                href: '/minecart',
                tag: 'Guided',
                chips: ['Traceability', 'Try-ons', 'Insured delivery'],
              },
            ].map((card) => (
              <a
                key={card.title}
                href={card.href}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_18px_36px_-20px_rgba(17,24,39,0.24)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_-22px_rgba(17,24,39,0.28)]"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.2), transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.15), transparent 40%)',
                  }}
                />

                <div className="relative flex items-center justify-between">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-tight text-gray-800">
                    {card.tag}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">Start</span>
                </div>

                <div className="relative mt-4 space-y-3">
                  <h3 className="text-2xl font-semibold leading-snug">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{card.description}</p>
                </div>

                <div className="relative mt-5 flex flex-wrap gap-2">
                  {card.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700 backdrop-blur"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="relative mt-6 flex items-center justify-between text-sm text-gray-600">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-gradient-to-r from-gray-200 via-gray-400 to-gray-700 shadow-[0_0_0_6px_rgba(156,163,175,0.25)]" />
                    Live availability
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-tight text-gray-900 transition group-hover:bg-gray-200">
                    Enter
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Gems vetted weekly', value: '120+', detail: 'rotating parcels' },
              { label: 'Avg. handoff speed', value: '48h', detail: 'express in-region' },
              { label: 'Return window', value: '7 days', detail: 'with verification' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-gray-200 bg-white px-5 py-4 text-left shadow-[0_12px_32px_-20px_rgba(17,24,39,0.22)]"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">{stat.label}</p>
                <div className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</div>
                <p className="text-sm text-gray-600">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="bg-gray-50 px-4 py-16 text-gray-900">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">Workflow</p>
              <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">
                How we move parcels from mine to handoff
              </h3>
              <p className="max-w-3xl text-base text-gray-600">
                A short, transparent path that keeps you informed. No hidden steps—every milestone is documented and
                shareable with your own clients.
              </p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white px-4 py-2 text-sm font-semibold uppercase tracking-tight text-gray-800 shadow-[0_14px_38px_-26px_rgba(17,24,39,0.2)]">
              Sourcing desk · Colombo
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-[1.05fr_1fr]">
            <div className="space-y-6 rounded-3xl border border-white/80 bg-white/90 p-6 shadow-[0_18px_44px_-24px_rgba(17,24,39,0.2)] backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Assurance</p>
                  <h4 className="text-2xl font-semibold">Clarity-first quality controls</h4>
                </div>
                <span className="shrink-0 rounded-full bg-gray-900 px-4 py-1 text-xs font-semibold uppercase tracking-tight text-white">
                  QA panel
                </span>
              </div>

              <p className="text-sm leading-relaxed text-gray-700">
                We prioritize how the stone looks in motion. Optical tests use balanced daylight and angled highlights so
                you can sense extinction, windowing, or leakage before any lab work. Reports and HD media are synced so
                you never chase a missing file.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { title: 'Lighting lab', copy: '5000K calibrated video, daylight booth, macro stills.' },
                  { title: 'Reporting', copy: 'GIA, NGTC, or local lab options; paperwork bundled with media.' },
                  { title: 'Client-ready decks', copy: 'Shareable selects with origin tags and pricing bands.' },
                  { title: 'Logistics', copy: 'Insured shipping, sealed packets, optional in-person pickup.' },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-[#dee2e6]/60 bg-[#f8fbf9] px-4 py-3 shadow-[0_10px_24px_-20px_rgba(17,24,39,0.16)]"
                  >
                    <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                    <p className="mt-1 text-xs text-gray-600">{item.copy}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 rounded-3xl border border-white/80 bg-white/90 p-6 shadow-[0_18px_44px_-24px_rgba(17,24,39,0.2)] backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Milestones</p>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-tight text-gray-800">
                  Shared updates
                </span>
              </div>

              <div className="space-y-4">
                {processSteps.map((step, index) => (
                  <div key={step.title} className="relative pl-9">
                    {index !== processSteps.length - 1 && (
                      <span className="absolute left-3 top-6 h-full w-px bg-gradient-to-b from-gray-500 via-gray-300 to-transparent" />
                    )}
                    <span className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-gray-200 via-gray-400 to-gray-700 text-xs font-semibold text-white shadow-[0_0_0_6px_rgba(156,163,175,0.22)]">
                      {index + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      <h5 className="text-lg font-semibold">{step.title}</h5>
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-tight text-gray-700">
                        {step.badge}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-gray-700">{step.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white px-4 pb-16 pt-10">
        <div className="absolute left-12 top-6 h-40 w-40 rounded-full bg-gray-100 blur-3xl" />
        <div className="absolute right-10 bottom-4 h-44 w-44 rounded-full bg-gray-200 blur-3xl" />

        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_14px_48px_-24px_rgba(17,24,39,0.22)] backdrop-blur-xl md:flex-row md:items-center md:justify-between md:p-8">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">Concierge invite</p>
            <h4 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
              Need a curated tray in under 24 hours?
            </h4>
            <p className="text-base leading-relaxed text-gray-700">
              Tell us the brief—budget, shape, metal preference—and we will stage a shortlist with pricing bands, lab
              options, and daylight footage. No obligation until you approve the parcel.
            </p>

            <div className="flex flex-wrap gap-3 text-sm text-gray-700">
              <span className="rounded-full bg-gray-100 px-3 py-1 font-semibold uppercase tracking-tight">Video previews</span>
              <span className="rounded-full bg-gray-100 px-3 py-1 font-semibold uppercase tracking-tight">Hold window</span>
              <span className="rounded-full bg-gray-100 px-3 py-1 font-semibold uppercase tracking-tight">Studio QA</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="/support"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#124559] via-[#0f394a] to-[#01161e] px-6 py-3 text-sm font-semibold uppercase tracking-tight text-white shadow-[0_14px_30px_-16px_rgba(1,17,30,0.5)] transition hover:scale-[1.01]"
            >
              Talk to support
            </a>
            <a
              href="/checkout"
              className="inline-flex items-center justify-center rounded-xl border border-[#124559]/20 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-tight text-[#01161e] shadow-[0_10px_26px_-18px_rgba(1,17,30,0.3)] transition hover:border-[#124559]/40"
            >
              Skip to checkout
            </a>
            <p className="text-xs text-[#124559]">We respond within 2 hours during Colombo business time.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
