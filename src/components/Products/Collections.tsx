import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

type Collection = {
  id: number
  name: string
  description: string
  focus: string
  cta: string
  accent: string
  image: string
  type: string
  priceBand: string
}

const collections: Collection[] = [
  {
    id: 1,
    name: 'Luminous Line',
    description:
      'Icy diamonds with sleek bezels and knife-edge profiles for a modern silhouette.',
    focus: 'Diamonds · Platinum',
    cta: '/jewelleries',
    accent: 'from-white via-gray-50 to-gray-200',
    type: 'Bridal',
    image:
      'https://images.unsplash.com/photo-1504595403659-9088ce801e29?auto=format&fit=crop&w=900&q=80',
    priceBand: '$4k - $12k',
  },
  {
    id: 2,
    name: 'Sapphire Stories',
    description:
      'Cornflower to teal sapphires set in airy prongs and hidden halos.',
    focus: 'Sapphires · White gold',
    cta: '/stones',
    accent: 'from-white via-gray-50 to-gray-200',
    type: 'Gemstone',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
    priceBand: '$2k - $8k',
  },
  {
    id: 3,
    name: 'Heritage Emeralds',
    description:
      'Step-cut emeralds with taper baguettes and cathedral shoulders.',
    focus: 'Emeralds · Yellow gold',
    cta: '/stones',
    accent: 'from-white via-gray-50 to-gray-200',
    type: 'Gemstone',
    image:
      'https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&w=900&q=80',
    priceBand: '$5k - $15k',
  },
  {
    id: 4,
    name: 'Midnight Black Friday',
    description:
      'High-contrast diamond & onyx pieces with mirror-finish metals — bold, limited-time drops.',
    focus: 'Diamonds · Onyx · Rhodium',
    cta: '/jewelleries',
    accent: 'from-gray-100 via-gray-200 to-gray-300',
    type: 'Limited',
    image:
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80',
    priceBand: '$3k - $9k',
  },
  {
    id: 5,
    name: 'Ceylon Winter Lights',
    description:
      'Holiday pairings of sapphires, rubies, and emeralds in warm gold — crafted for gifting season.',
    focus: 'Sapphires · Rubies · Emeralds',
    cta: '/collections/holiday',
    accent: 'from-white via-gray-50 to-gray-200',
    type: 'Seasonal',
    image:
      'https://images.unsplash.com/photo-1543701275-23ccef2d6dd0?auto=format&fit=crop&w=900&q=80',
    priceBand: '$1.5k - $6k',
  },
]

const Collections: React.FC = () => {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('All')

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return collections.filter((collection) => {
      const matchesType = typeFilter === 'All' || collection.type === typeFilter
      const matchesSearch =
        !term ||
        collection.name.toLowerCase().includes(term) ||
        collection.description.toLowerCase().includes(term) ||
        collection.focus.toLowerCase().includes(term)
      return matchesType && matchesSearch
    })
  }, [search, typeFilter])

  const featured = filtered[0]
  const others = filtered.slice(1)
  const activeLabel = featured?.name ?? 'Collections'
  const typeFilters = useMemo(
    () => ['All', ...Array.from(new Set(collections.map((c) => c.type)))],
    [],
  )

  return (
    <section className="relative min-h-screen bg-white text-gray-900">

      {/* Header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-6">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
          Collections
        </p>

        <nav className="hidden gap-8 text-xs font-medium uppercase tracking-[0.25em] text-gray-500 md:flex">
          <button className="text-gray-900 border-b border-gray-900 pb-1">Featured</button>
          <button className="hover:text-gray-900">Stones</button>
          <button className="hover:text-gray-900">Jewellery</button>
          <button className="hover:text-gray-900">Bespoke</button>
        </nav>

        <p className="text-xs text-gray-500">{filtered.length} sets</p>
      </header>

      {/* Page body */}
      <div className="relative mx-auto mt-6 max-w-6xl px-4 pb-16">

        {/* Left vertical label */}
        <div className="pointer-events-none absolute -left-50 top-1/2 hidden -translate-y-1/2 md:block">
          <p className="-rotate-90 text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
            {activeLabel} · Collection Studio
          </p>
        </div>

        {/* Intro */}
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Signature Collections
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-gray-600 md:text-base">
            Ready-made lineups and design languages pairing stones with finishes & silhouettes.
            Choose a base, then we tailor it to your size and preferred center stone.
          </p>
          <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {typeFilters.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTypeFilter(t)}
                  className={`rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] transition ${
                    typeFilter === t
                      ? 'border-gray-900 bg-gray-900 text-white shadow-[0_10px_26px_-18px_rgba(17,24,39,0.6)]'
                      : 'border-gray-200 bg-white text-gray-800 hover:border-gray-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 shadow-[0_10px_26px_-18px_rgba(17,24,39,0.5)]">
              <svg
                className="h-4 w-4 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="16.65" y1="16.65" x2="21" y2="21" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search collections, stones, themes"
                className="w-56 bg-transparent text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Featured collection row */}
        {featured ? (
          <div className="mt-8 flex flex-col gap-8 md:flex-row">

            {/* Left: text */}
            <div className="flex flex-1 flex-col gap-4 md:max-w-md">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-400">
                Featured · {featured.focus}
              </span>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                {featured.name}
              </h2>
              <p className="max-w-sm text-sm leading-relaxed text-gray-600">
                {featured.description}
              </p>
              <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                {featured.priceBand} · {featured.type}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  to={featured.cta}
                  className="rounded-full bg-gray-900 px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-black"
                >
                  View line
                </Link>
                <button className="rounded-full border border-gray-300 bg-white px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-800 transition hover:border-gray-500">
                  Customize
                </button>
              </div>
            </div>

            {/* Right: image */}
            <div className="relative flex flex-1 items-center justify-center">
              <div
                className={`relative h-72 w-full max-w-xl overflow-hidden rounded-3xl bg-gradient-to-br ${featured.accent} shadow-[0_30px_80px_-40px_rgba(15,23,42,0.75)]`}
              >
                <img
                  src={featured.image}
                  alt={featured.name}
                  className="h-full w-full object-cover md:-translate-y-2 md:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/20" />
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white/70 px-4 py-10 text-center text-sm text-gray-500">
            No collections match your filters.
          </div>
        )}

        {/* Other collections grid */}
        {others.length > 0 && (
          <div className="mt-10">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
                More collections
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {others.map((collection) => (
                <article
                  key={collection.id}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_18px_40px_-26px_rgba(15,23,42,0.7)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_52px_-28px_rgba(15,23,42,0.8)]"
                >
                  <div
                    className={`relative h-40 w-full bg-gradient-to-br ${collection.accent}`}
                  >
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/30" />
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-4">
                    <div className="space-y-1">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-400">
                        {collection.focus}
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {collection.name}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {collection.description}
                      </p>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                        {collection.type} · {collection.priceBand}
                      </p>
                    </div>

                    <div className="mt-auto flex flex-wrap items-center gap-3 pt-1">
                      <Link
                        to={collection.cta}
                        className="rounded-full bg-gray-900 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-black"
                      >
                        View line
                      </Link>
                      <button className="rounded-full border border-gray-300 bg-white px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-800 transition hover:border-gray-500">
                        Customize
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Collections
