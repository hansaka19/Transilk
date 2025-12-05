/* eslint-disable react-refresh/only-export-components */
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

export type Jewellery = {
  id: number
  name: string
  category: string
  description: string
  metal: string
  stones: string
  price: string | number
  image: string
  origin?: string
}

const jewelleries: Jewellery[] = [
  {
    id: 1,
    name: 'Lumina Halo Ring',
    category: 'Ring',
    description: 'Platinum knife-edge shank with sapphire center and icy diamond halo.',
    metal: 'Platinum',
    stones: 'Sapphire · Diamond',
    price: '$6,400',
    image: 'https://images.unsplash.com/photo-1504595403659-9088ce801e29?auto=format&fit=crop&w=900&q=80',
    origin: 'Handmade in Sri Lanka',
  },
  {
    id: 2,
    name: 'North Star Pendant',
    category: 'Pendant',
    description: 'Pear teal sapphire in a prong constellation with hidden halo.',
    metal: '14k White Gold',
    stones: 'Teal Sapphire · Diamond',
    price: '$3,800',
    image: 'https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=900&q=80',
    origin: 'Made to order',
  },
  {
    id: 3,
    name: 'Lineaire Tennis',
    category: 'Bracelet',
    description: 'Sleek bezel-set diamonds that appear to float on the wrist.',
    metal: '18k Yellow Gold',
    stones: 'Diamond',
    price: 12400,
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80&sat=-10',
    origin: 'Limited run',
  },
  {
    id: 4,
    name: 'Verdant Cascade Earrings',
    category: 'Earrings',
    description: 'Graduated emerald drops on articulated links for fluid movement.',
    metal: '18k Gold',
    stones: 'Emerald · Diamond',
    price: '$5,600',
    image: 'https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&w=900&q=80',
    origin: 'Colombian stones',
  },
  {
    id: 5,
    name: 'Aurora Collar',
    category: 'Necklace',
    description: 'Sweeping collar with alternating sapphires and mirrored diamond bars.',
    metal: 'Platinum',
    stones: 'Sapphire · Diamond',
    price: '$9,200',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80&sat=-30',
    origin: 'Atelier edition',
  },
  {
    id: 6,
    name: 'Celeste Band',
    category: 'Ring',
    description: 'Comfort-fit band with tapering channel of teal sapphires.',
    metal: '18k Rose Gold',
    stones: 'Teal Sapphire',
    price: '$2,450',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80&sat=20',
    origin: 'Sri Lankan sapphires',
  },
]

export const jewelleriesData = jewelleries

const Jewelleries = () => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string>('All')

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(jewelleries.map((j) => j.category)))],
    [],
  )

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return jewelleries.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category
      const matchesSearch =
        !term ||
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.stones.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
      return matchesCategory && matchesSearch
    })
  }, [category, search])

  const featured = filtered[0]
  const others = filtered.slice(1)

  return (
    <section className="relative min-h-screen bg-[#f7f7f8] text-[#111827]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-6">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">Jewelleries Library</p>

        <nav className="hidden gap-8 text-xs font-medium uppercase tracking-[0.25em] text-gray-500 md:flex">
          <button className="hover:text-gray-900">New</button>
          <button className="border-b border-gray-900 pb-1 text-gray-900">Featured</button>
          <button className="hover:text-gray-900">All metals</button>
          <button className="hover:text-gray-900">All stones</button>
          <button className="hover:text-gray-900">All cuts</button>
        </nav>

        <p className="text-xs text-gray-500">{filtered.length} pieces</p>
      </header>

      <div className="relative mx-auto mt-6 max-w-6xl px-4 pb-16">
        <div className="pointer-events-none absolute left-2 top-1/2 hidden -translate-y-1/2 md:block">
          <p className="-rotate-90 text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
            Jewels · Library
          </p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Curated jewellery line</h2>
            <p className="max-w-xl text-sm leading-relaxed text-gray-600 md:text-base">
              Browse signature rings, pendants, and bracelets. Filter by type or search by stone mix.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] transition ${
                    category === cat
                      ? 'bg-gray-900 text-white shadow-[0_10px_30px_-18px_rgba(15,23,42,0.8)]'
                      : 'bg-white text-gray-800 border border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 shadow-[0_10px_26px_-18px_rgba(15,23,42,0.6)]">
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
                placeholder="Search jewellery, stones, notes"
                className="w-52 bg-transparent text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none md:w-64"
              />
            </div>
          </div>
        </div>

        {featured ? (
          <>
            <div className="mt-8 flex flex-col gap-8 md:flex-row">
              <div className="flex flex-1 flex-col gap-4 md:max-w-md">
                <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-gray-500">
                  Featured piece
                </span>
                <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">{featured.name}</h3>
                <p className="max-w-sm text-sm leading-relaxed text-gray-600">{featured.description}</p>
                <div className="mt-1 text-2xl font-semibold text-gray-900">
                  {typeof featured.price === 'number'
                    ? `$${featured.price.toLocaleString()}`
                    : featured.price}
                </div>

                <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
                  <span className="rounded-full bg-gray-900 px-3 py-1 text-white">{featured.metal}</span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-800">{featured.stones}</span>
                  {featured.origin && (
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-800">{featured.origin}</span>
                  )}
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link
                    to={`/jewelleries/${featured.id}`}
                    className="rounded-full bg-gray-900 px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-black"
                  >
                    View details
                  </Link>
                  <button className="rounded-full border border-gray-300 bg-white px-7 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-gray-800 transition hover:border-gray-500">
                    Quick reserve
                  </button>
                </div>
              </div>

              <div className="relative flex flex-1 items-center justify-center">
                <div className="relative h-72 w-full max-w-xl overflow-hidden rounded-3xl bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.75)]">
                  <img
                    src={featured.image}
                    alt={featured.name}
                    className="h-full w-full object-contain md:-translate-y-3 md:-rotate-6"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
                  More pieces
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {others.map((item) => (
                  <Link
                    to={`/jewelleries/${item.id}`}
                    key={item.id}
                    className="group flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-[0_16px_40px_-26px_rgba(15,23,42,0.7)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_50px_-28px_rgba(15,23,42,0.8)]"
                  >
                    <div className="relative h-36 w-full overflow-hidden rounded-xl bg-gray-50">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400">
                          {item.category}
                        </span>
                        <span className="text-sm font-semibold text-gray-900">
                          {typeof item.price === 'number' ? `$${item.price.toLocaleString()}` : item.price}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-gray-500">
                        <span>{item.metal}</span>
                        <span>•</span>
                        <span>{item.stones}</span>
                        {item.origin && (
                          <>
                            <span>•</span>
                            <span>{item.origin}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}

                {filtered.length <= 1 && (
                  <div className="col-span-full rounded-2xl border border-dashed border-gray-300 bg-white/70 px-4 py-8 text-center text-sm text-gray-500">
                    No more pieces match your filters.
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-gray-300 bg-white/70 px-4 py-10 text-center text-sm text-gray-500">
            No jewellery matches your filters.
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 bg-white/90">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-500">
              Design your jewellery
            </p>
            <h3 className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
              Pair your stones with a custom setting
            </h3>
            <p className="max-w-2xl text-sm leading-relaxed text-gray-600 md:text-base">
              Share your preferred metal, silhouette, and timeline—we’ll mock up a bespoke ring, pendant, or bracelet built around your chosen stone or parcel.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button className="rounded-full bg-gray-900 px-7 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-black">
              Start a design brief
            </button>
            <button className="rounded-full border border-gray-300 bg-white px-7 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-gray-800 transition hover:border-gray-500">
              Book a consult
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Jewelleries
