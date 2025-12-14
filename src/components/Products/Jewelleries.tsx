/* eslint-disable react-refresh/only-export-components */
import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import FilterStrip from './FilterStrip'
import { formatCarat, formatMoney, type FilterValues, type ShapeKey } from './filterUtils'

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
  shape: ShapeKey
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
    shape: 'cushion',
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
    shape: 'marquise',
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
    shape: 'round',
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
    shape: 'oval',
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
    shape: 'emerald',
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
    shape: 'round',
  },
]

export const jewelleriesData = jewelleries

const defaultFilters: FilterValues = {
  price: { from: 160, to: 105335 },
  carat: { from: 0.18, to: 5.16 },
  shape: null,
}

const navOptions = ['New', 'Featured', 'All metals', 'All stones', 'All cuts'] as const

const Jewelleries = () => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string>('All')
  const [filters, setFilters] = useState<FilterValues>(defaultFilters)
  const [navSelection, setNavSelection] = useState<(typeof navOptions)[number]>('Featured')

  const parsePrice = useCallback((value: Jewellery['price']) => {
    if (typeof value === 'number') return value
    const numeric = Number(String(value).replace(/[^0-9.]/g, ''))
    return Number.isFinite(numeric) ? numeric : 0
  }, [])

  const parseCarat = useCallback((value: string) => {
    const numeric = Number(String(value).replace(/[^0-9.]/g, ''))
    return Number.isFinite(numeric) ? numeric : 0
  }, [])

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(jewelleries.map((j) => j.category)))],
    [],
  )

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    const base = jewelleries.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category
      const matchesSearch =
        !term ||
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.stones.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
      const matchesPrice = parsePrice(item.price) >= filters.price.from && parsePrice(item.price) <= filters.price.to
      const matchesCarat = parseCarat('1.00') >= filters.carat.from && parseCarat('1.00') <= filters.carat.to // jewellery carat proxy
      const matchesShape = !filters.shape || item.shape === filters.shape
      return matchesCategory && matchesSearch && matchesPrice && matchesCarat && matchesShape
    })

    let next = [...base]
    switch (navSelection) {
      case 'New':
        next = next.sort((a, b) => b.id - a.id)
        break
      case 'Featured':
        next = next.filter((item) => item.id <= 3)
        break
      case 'All metals':
        next = next.sort((a, b) => a.metal.localeCompare(b.metal))
        break
      case 'All stones':
        next = next.sort((a, b) => a.stones.localeCompare(b.stones))
        break
      case 'All cuts':
        next = next.sort((a, b) => a.shape.localeCompare(b.shape))
        break
      default:
        break
    }
    return next
  }, [category, search, filters, parseCarat, parsePrice, navSelection])

  const filterChips = useMemo(() => {
    const chips: string[] = []
    if (category !== 'All') chips.push(category)
    if (filters.shape) chips.push(`${filters.shape} cut`)
    chips.push(`${formatCarat(filters.carat.from)} – ${formatCarat(filters.carat.to)}`)
    chips.push(`${formatMoney(filters.price.from)} – ${formatMoney(filters.price.to)}`)
    if (search.trim()) chips.push(`“${search.trim()}”`)
    return chips
  }, [category, filters, search])

  const handleReset = () => {
    setCategory('All')
    setFilters(defaultFilters)
    setSearch('')
  }

  const featured = filtered[0]
  const others = filtered.slice(1)

  return (
    <section className="relative min-h-screen bg-white text-gray-900">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-6">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">Jewelleries Library</p>

        <nav className="hidden gap-8 text-xs font-medium uppercase tracking-[0.25em] text-gray-500 md:flex">
          {navOptions.map((opt) => (
            <button
              key={opt}
              className={`${navSelection === opt ? 'text-gray-900 border-b border-gray-900 pb-1' : 'hover:text-gray-900'}`}
              onClick={() => setNavSelection(opt)}
              type="button"
            >
              {opt}
            </button>
          ))}
        </nav>

        <p className="text-xs text-gray-500">{filtered.length} pieces</p>
      </header>

      <div className="relative mx-auto mt-6 max-w-6xl px-4 pb-16">
        <div className="pointer-events-none absolute -left-50 top-1/2 hidden -translate-y-1/2 md:block">
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

        <div className="mt-6 space-y-2">
          <FilterStrip onChange={(payload) => setFilters(payload)} />
          <div className="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Shape: {filters.shape ?? 'Any shape'} • Carat: {formatCarat(filters.carat.from)} –{' '}
              {formatCarat(filters.carat.to)}
            </span>
            <span>
              Budget: {formatMoney(filters.price.from)} – {formatMoney(filters.price.to)}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {filterChips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-700"
              >
                {chip}
              </span>
            ))}
            <button
              type="button"
              onClick={handleReset}
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500 underline underline-offset-4"
            >
              Reset
            </button>
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
              <div className="relative h-72 w-full max-w-xl overflow-hidden rounded-3xl bg-gradient-to-br from-white via-gray-50 to-gray-200 shadow-[0_30px_80px_-40px_rgba(17,24,39,0.65)]">
                <img
                  src={featured.image}
                  alt={featured.name}
                  className="h-full w-full object-contain md:-translate-y-3 md:-rotate-6"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/30" />
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
                    className="group flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-[0_18px_40px_-26px_rgba(17,24,39,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_52px_-28px_rgba(17,24,39,0.28)]"
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
