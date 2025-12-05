import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { stonesData, type Stone } from '../components/Products/Stones'
import { jewelleriesData, type Jewellery } from '../components/Products/Jewelleries'
import { useCart } from '../context/CartContext'

type Product =
  | (Stone & { kind: 'stone' })
  | (Jewellery & { kind: 'jewellery' })

const caratBucket = (carat?: string) => {
  if (!carat) return undefined
  const parsed = parseFloat(carat.replace(/[^0-9.]/g, ''))
  if (!Number.isFinite(parsed)) return undefined
  return Math.floor(parsed)
}

const findProduct = (id?: string, preferredKind?: 'stone' | 'jewellery'): Product | undefined => {
  if (!id) return undefined
  const numericId = Number(id)
  if (Number.isNaN(numericId)) return undefined
  const searchOrder: Array<'stone' | 'jewellery'> = preferredKind
    ? [preferredKind, preferredKind === 'stone' ? 'jewellery' : 'stone']
    : ['stone', 'jewellery']

  for (const kind of searchOrder) {
    if (kind === 'stone') {
      const stone = stonesData.find((s) => s.id === numericId)
      if (stone) return { ...stone, kind }
    } else {
      const jewel = jewelleriesData.find((j) => j.id === numericId)
      if (jewel) return { ...jewel, kind }
    }
  }

  return undefined
}

const ProductDetail = () => {
  const { id } = useParams()
  const location = useLocation()
  const preferredKind =
    location.pathname.includes('/jewelleries/') || location.pathname.includes('/jewelries/')
      ? 'jewellery'
      : location.pathname.includes('/stones/')
        ? 'stone'
        : undefined
  const product = findProduct(id, preferredKind)
  const { addItem } = useCart()

  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const currentBucket = useMemo(() => {
    if (!product || product.kind !== 'stone') return undefined
    return caratBucket(product.carat)
  }, [product])
  const [selectedBucket, setSelectedBucket] = useState<number | undefined>(currentBucket)
  const galleryImages = useMemo(() => {
    const base = product.image
    const desaturated = base.includes('?') ? `${base}&sat=-35` : `${base}?sat=-35`
    return [base, desaturated]
  }, [product.image])
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    setSelectedBucket(currentBucket)
  }, [currentBucket])

  useEffect(() => {
    setActiveImage(0)
  }, [product.id])

  const handlePrevImage = () =>
    setActiveImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  const handleNextImage = () => setActiveImage((prev) => (prev + 1) % galleryImages.length)

  if (!product) {
    return (
      <section className="px-4 py-20 text-center">
        <div className="mx-auto max-w-lg rounded-3xl bg-white p-8 shadow-[0_14px_50px_-24px_rgba(1,17,30,0.32)]">
          <p className="text-lg font-semibold text-[#01161e]">Product not found</p>
          <p className="mt-2 text-sm text-[#598392]">We could not locate that item.</p>
          <Link
            to="/stones"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#124559] px-4 py-2 text-sm font-semibold uppercase tracking-tight text-white hover:bg-[#0f394a] transition"
          >
            Back to browse
          </Link>
        </div>
      </section>
    )
  }

  const unitPriceNumber =
    typeof product.price === 'number'
      ? product.price
      : Number(String(product.price).replace(/[^0-9.]/g, '')) || 0

  const totalPriceText = useMemo(() => {
    if (!unitPriceNumber) return product.price
    return `$${(unitPriceNumber * quantity).toLocaleString()}`
  }, [unitPriceNumber, quantity, product.price])

  const handleDec = () => setQuantity((q) => (q > 1 ? q - 1 : q))
  const handleInc = () => setQuantity((q) => q + 1)

  const handleAddToCart = () => {
    addItem(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const availableBuckets = useMemo(() => {
    if (!product || product.kind !== 'stone') return []
    const buckets = stonesData
      .filter((s) => s.category === product.category)
      .map((s) => caratBucket(s.carat))
      .filter((b): b is number => b !== undefined)
    return Array.from(new Set(buckets)).sort((a, b) => a - b)
  }, [product])

  const bucketStones = useMemo(() => {
    if (!product || product.kind !== 'stone') return []
    return stonesData.filter(
      (s) =>
        s.id !== product.id &&
        s.category === product.category &&
        selectedBucket !== undefined &&
        caratBucket(s.carat) === selectedBucket,
    )
  }, [product, selectedBucket])

  const related =
    product.kind === 'stone'
      ? bucketStones.length > 0
        ? bucketStones
        : stonesData.filter((s) => s.id !== product.id).slice(0, 4)
      : jewelleriesData.filter((j) => j.id !== product.id && j.category === product.category).slice(0, 4)

  return (
    <section className="relative min-h-screen bg-[#f7f7f8] text-[#111827]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-6">
        <Link
          to={product.kind === 'stone' ? '/stones' : '/jewelleries'}
          className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500 hover:text-gray-800"
        >
          ← Back
        </Link>

        <nav className="hidden gap-8 text-xs font-medium uppercase tracking-[0.25em] text-gray-500 md:flex">
          <button className="hover:text-gray-900">New</button>
          <button className="border-b border-gray-900 pb-1 text-gray-900">Featured</button>
          <button className="hover:text-gray-900">All style</button>
          <button className="hover:text-gray-900">All origins</button>
          <button className="hover:text-gray-900">All colors</button>
        </nav>

        <p className="text-xs text-gray-500">Your tray has {quantity} item(s)</p>
      </header>

      <div className="relative mx-auto mt-6 flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-4 md:flex-row">
        <div className="pointer-events-none absolute -left-30 top-1/2 hidden -translate-y-1/2 md:block">
          <p className="-rotate-90 text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
            {product.category} · Collection
          </p>
        </div>

        <div className="pointer-events-none absolute bottom-8 right-0 hidden flex-col gap-3 pr-2 text-xs text-gray-400 md:flex">
          <span>FB</span>
          <span>IG</span>
          <span>X</span>
          <span>IN</span>
        </div>

        <div className="flex flex-1 flex-col gap-6 md:max-w-md">

          <div>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{product.name}</h1>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-600">{product.description}</p>
          </div>

          <div className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">{totalPriceText}</div>

          <div className="mt-2 flex flex-wrap gap-3 text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
            {product.kind === 'stone' ? (
              <>
                <span className="rounded-full bg-gray-900 px-3 py-1 text-white">{product.carat}</span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-800">{product.clarity}</span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-800">
                  Origin: {product.origin ?? 'Sri Lanka'}
                </span>
              </>
            ) : (
              <>
                <span className="rounded-full bg-gray-900 px-3 py-1 text-white">{product.metal}</span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-800">{product.stones}</span>
                {product.origin && (
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-800">{product.origin}</span>
                )}
              </>
            )}
          </div>

          <div className="mt-5 flex flex-col gap-4">
            <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-2 text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
              <button
                type="button"
                onClick={handleDec}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-lg leading-none hover:border-gray-400"
              >
                −
              </button>
              <span className="mx-6 text-base tracking-[0.3em] text-gray-900">{quantity.toString().padStart(2, '0')}</span>
              <button
                type="button"
                onClick={handleInc}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-lg leading-none hover:border-gray-400"
              >
                +
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleAddToCart}
                className="rounded-full bg-gray-900 px-10 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-black"
              >
                {added ? 'Added!' : 'Add to tray'}
              </button>

              <button className="rounded-full border border-gray-300 bg-white px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-gray-800 transition hover:border-gray-500">
                Reserve {product.kind === 'stone' ? 'stone' : 'piece'}
              </button>
            </div>
          </div>
        </div>

        <div className="relative flex flex-1 flex-col items-center justify-center gap-4">
          {product.kind === 'stone' && availableBuckets.length > 0 && (
            <div className="absolute -right-8 top-10 hidden flex-col text-xs font-medium uppercase tracking-[0.25em] text-gray-400 md:flex">
              {availableBuckets.map((bucket) => (
                <button
                  key={bucket}
                  type="button"
                  onClick={() => setSelectedBucket(bucket)}
                  className={`py-1 text-left transition ${bucket === selectedBucket ? 'text-gray-900 font-semibold' : ''}`}
                >
                  0{bucket}
                </button>
              ))}
            </div>
          )}

          <div className="relative h-72 w-full max-w-xl overflow-hidden rounded-3xl bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.75)]">
            <img
              src={galleryImages[activeImage]}
              alt={product.name}
              className="h-full w-full object-contain md:-translate-y-4 md:-rotate-6 transition duration-300"
            />

            {galleryImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.5)] transition hover:bg-white"
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.5)] transition hover:bg-white"
                  aria-label="Next image"
                >
                  ›
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.25em] text-gray-500 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.4)]">
            {galleryImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImage(idx)}
                className={`h-1.5 rounded-full transition ${
                  idx === activeImage ? 'w-6 bg-gray-900' : 'w-4 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`View image ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-white/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
            {product.kind === 'stone' && selectedBucket !== undefined
              ? `Other ${selectedBucket}ct stones in ${product.category}`
              : `Related ${product.kind === 'stone' ? 'stones' : 'jewellery'}`}
          </p>
          <div className="flex w-full gap-4 overflow-x-auto pb-2">
            {related.length > 0 ? (
              related.map((item) => (
                <Link
                  key={item.id}
                  to={`/${product.kind === 'stone' ? 'stones' : 'jewelleries'}/${item.id}`}
                  className="flex min-w-[150px] max-w-[170px] flex-col gap-2 rounded-2xl bg-[#f7f7f8] p-3 transition hover:bg-gray-100"
                >
                  <div className="h-20 w-full overflow-hidden rounded-xl bg-white">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <p className="text-xs font-semibold text-gray-900 line-clamp-1">{item.name}</p>
                  <p className="text-[11px] text-gray-500">{item.price}</p>
                </Link>
              ))
            ) : (
              <div className="text-[11px] text-gray-500">No other items in this range.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail
