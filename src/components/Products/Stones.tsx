/* eslint-disable react-refresh/only-export-components */
import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import FilterStrip from './FilterStrip'
import { formatCarat, formatMoney, type FilterValues, type ShapeKey } from './filterUtils'

export type Stone = {
  id: number
  name: string
  category: string
  description: string
  carat: string
  clarity: string
  price: string | number
  image: string
  origin?: string
  shape: ShapeKey
}

const stones: Stone[] = [
  {
    id: 1,
    name: 'Ceylon Blue Sapphire',
    category: 'Sapphire',
    description: 'Cornflower hue with sharp facet meets for bright return.',
    carat: '3.2 ct',
    clarity: 'VVS',
    price: '$3,800',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
    origin: 'Sri Lanka',
    shape: 'cushion',
  },
  {
    id: 2,
    name: 'Royal Blue Cushion',
    category: 'Sapphire',
    description: 'Saturated cushion cut with balanced crown height.',
    carat: '2.8 ct',
    clarity: 'VS',
    price: '$2,950',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80&sat=-40',
    origin: 'Sri Lanka',
    shape: 'cushion',
  },
  {
    id: 3,
    name: 'Fiery Ruby Oval',
    category: 'Ruby',
    description: 'Pigeon blood tone with strong silk and lively brilliance.',
    carat: '1.6 ct',
    clarity: 'VS',
    price: '$4,200',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    origin: 'Myanmar',
    shape: 'oval',
  },
  {
    id: 4,
    name: 'Verdant Emerald',
    category: 'Emerald',
    description: 'Classic step cut showing clean jardin and depth.',
    carat: '2.1 ct',
    clarity: 'VVS',
    price: '$5,100',
    image:
      'https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&w=900&q=80',
    origin: 'Colombia',
    shape: 'emerald',
  },
  {
    id: 5,
    name: 'Sunset Tourmaline',
    category: 'Tourmaline',
    description: 'Bi-color shift with crisp Portuguese pavilion.',
    carat: '3.4 ct',
    clarity: 'VS',
    price: '$2,400',
    image:
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=900&q=80',
    origin: 'Mozambique',
    shape: 'radiant',
  },
  {
    id: 6,
    name: 'Icy White Diamond',
    category: 'Diamond',
    description: 'Round brilliant, excellent cut with balanced fire and scintillation.',
    carat: '1.2 ct',
    clarity: 'VVS2',
    price: 6800,
    image:
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80',
    origin: 'Botswana',
    shape: 'round',
  },
  {
    id: 7,
    name: 'Padparadscha Glow',
    category: 'Sapphire',
    description: 'Lotus-toned oval with soft pastel saturation.',
    carat: '2.0 ct',
    clarity: 'VS',
    price: '$3,600',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80&sat=-20',
    origin: 'Sri Lanka',
    shape: 'oval',
  },
  {
    id: 8,
    name: 'Green Beryl Step',
    category: 'Beryl',
    description: 'Linear step cut, crisp corners, cool mint tone.',
    carat: '3.0 ct',
    clarity: 'VVS',
    price: '$1,950',
    image:
      'https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&w=900&q=80&sat=-20',
    origin: 'Brazil',
    shape: 'emerald',
  },
]

export const stonesData = stones

const defaultFilters: FilterValues = {
  price: { from: 160, to: 105335 },
  carat: { from: 0.18, to: 5.16 },
  shape: null,
}

const Stones = () => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string>('All')
  const [filters, setFilters] = useState<FilterValues>(defaultFilters)

  const parsePrice = useCallback((value: Stone['price']) => {
    if (typeof value === 'number') return value
    const numeric = Number(String(value).replace(/[^0-9.]/g, ''))
    return Number.isFinite(numeric) ? numeric : 0
  }, [])

  const parseCarat = useCallback((value: string) => {
    const numeric = Number(String(value).replace(/[^0-9.]/g, ''))
    return Number.isFinite(numeric) ? numeric : 0
  }, [])

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(stones.map((s) => s.category)))],
    []
  )

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return stones.filter((stone) => {
      const matchesCategory = category === 'All' || stone.category === category
      const matchesSearch =
        !term ||
        stone.name.toLowerCase().includes(term) ||
        stone.description.toLowerCase().includes(term) ||
        stone.category.toLowerCase().includes(term)
      const priceValue = parsePrice(stone.price)
      const caratValue = parseCarat(stone.carat)
      const matchesPrice = priceValue >= filters.price.from && priceValue <= filters.price.to
      const matchesCarat = caratValue >= filters.carat.from && caratValue <= filters.carat.to
      const matchesShape = !filters.shape || stone.shape === filters.shape
      return matchesCategory && matchesSearch && matchesPrice && matchesCarat && matchesShape
    })
  }, [category, search, filters, parsePrice, parseCarat])

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
      {/* top bar similar to product page */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-6">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
          Stones Library
        </p>

        <nav className="hidden gap-8 text-xs font-medium uppercase tracking-[0.25em] text-gray-500 md:flex">
          <button className="hover:text-gray-900">New</button>
          <button className="text-gray-900 border-b border-gray-900 pb-1">
            Featured
          </button>
          <button className="hover:text-gray-900">All style</button>
          <button className="hover:text-gray-900">All origins</button>
          <button className="hover:text-gray-900">All colors</button>
        </nav>

        <p className="text-xs text-gray-500">{filtered.length} items</p>
      </header>

      <div className="relative mx-auto mt-6 max-w-6xl px-4 pb-16">
        {/* left vertical label */}
        <div className="pointer-events-none absolute -left-50 top-1/2 hidden -translate-y-1/2 md:block">
          <p className="-rotate-90 text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
            Stones · Library
          </p>
        </div>

        {/* filters row */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Curated stones for every setting
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-gray-600 md:text-base">
              Filter by cut family or species, then search descriptors to find the exact
              material for your next piece.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            {/* category pills */}
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

            {/* search bar */}
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
                placeholder="Search stones, cuts, notes"
                className="w-52 bg-transparent text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none md:w-64"
              />
            </div>
            <Link
              to="/jewelleries"
              className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-800 transition hover:border-gray-500"
            >
              View jewelleries
            </Link>
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

        {/* main featured + grid, Nike-style feeling */}
        {featured ? (
          <>
            {/* featured hero row */}
            <div className="mt-8 flex flex-col gap-8 md:flex-row">
              {/* text */}
              <div className="flex flex-1 flex-col gap-4 md:max-w-md">
                <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-gray-500">
                  Featured stone
                </span>
                <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  {featured.name}
                </h3>
                <p className="max-w-sm text-sm leading-relaxed text-gray-600">
                  {featured.description}
                </p>
                <div className="mt-1 text-2xl font-semibold text-gray-900">
                  {typeof featured.price === 'number'
                    ? `$${featured.price.toLocaleString()}`
                    : featured.price}
                </div>

                <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
                  <span className="rounded-full bg-gray-900 px-3 py-1 text-white">
                    {featured.carat}
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-800">
                    {featured.clarity}
                  </span>
                  {featured.origin && (
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-800">
                      {featured.origin}
                    </span>
                  )}
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link
                    to={`/stones/${featured.id}`}
                    className="rounded-full bg-gray-900 px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-black"
                  >
                    View details
                  </Link>
                  <button className="rounded-full border border-gray-300 bg-white px-7 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-gray-800 transition hover:border-gray-500">
                    Quick reserve
                  </button>
                </div>
              </div>

              {/* hero image */}
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

            {/* other stones strip / grid */}
            <div className="mt-10">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
                  More in this parcel
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {others.map((stone) => (
                  <Link
                    to={`/stones/${stone.id}`}
                    key={stone.id}
                    className="group flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-[0_18px_40px_-26px_rgba(17,24,39,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_52px_-28px_rgba(17,24,39,0.28)]"
                  >
                    <div className="relative h-36 w-full overflow-hidden rounded-xl bg-gray-50">
                      <img
                        src={stone.image}
                        alt={stone.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400">
                          {stone.category}
                        </span>
                        <span className="text-sm font-semibold text-gray-900">
                          {typeof stone.price === 'number'
                            ? `$${stone.price.toLocaleString()}`
                            : stone.price}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 line-clamp-1">
                        {stone.name}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {stone.description}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-gray-500">
                        <span>{stone.carat}</span>
                        <span>•</span>
                        <span>{stone.clarity}</span>
                        {stone.origin && (
                          <>
                            <span>•</span>
                            <span>{stone.origin}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}

                {filtered.length <= 1 && (
                  <div className="col-span-full rounded-2xl border border-dashed border-gray-300 bg-white/70 px-4 py-8 text-center text-sm text-gray-500">
                    No more stones match your filters.
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-gray-300 bg-white/70 px-4 py-10 text-center text-sm text-gray-500">
            No stones match your filters.
          </div>
        )}
      </div>
    </section>
  )
}

export default Stones
