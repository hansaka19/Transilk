import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { stonesData, type Stone } from './Stones'
import { jewelleriesData, type Jewellery } from './Jewelleries'

type FeaturedItem = {
  id: number
  kind: 'stone' | 'jewellery'
  name: string
  description: string
  priceLabel: string
  stats: string[]
  accent: string
  image: string
}

const formatPriceLabel = (price: Stone['price'] | Jewellery['price']) =>
  typeof price === 'number' ? `$${price.toLocaleString()}` : price

const stoneFeatures: Array<{ product: Stone | undefined; accent: string; stats?: string[] }> = [
  {
    product: stonesData.find((stone) => stone.id === 1),
    accent: 'linear-gradient(135deg, rgba(239,246,224,0.85), rgba(89,131,146,0.35), rgba(1,17,30,0.4))',
    stats: ['3.2 ct', 'VVS clarity', 'Unheated'],
  },
  {
    product: stonesData.find((stone) => stone.id === 4),
    accent: 'linear-gradient(140deg, rgba(174,195,176,0.85), rgba(18,69,89,0.35), rgba(1,22,30,0.5))',
    stats: ['2.1 ct', 'VVS clarity', 'Colombian origin'],
  },
  {
    product: stonesData.find((stone) => stone.id === 5),
    accent: 'linear-gradient(145deg, rgba(239,246,224,0.9), rgba(174,195,176,0.5), rgba(89,131,146,0.45))',
    stats: ['3.4 ct', 'VS clarity', 'Bi-color'],
  },
]

const jewelleryFeatures: Array<{ product: Jewellery | undefined; accent: string; stats?: string[] }> = [
  {
    product: jewelleriesData.find((item) => item.id === 1),
    accent: 'linear-gradient(135deg, rgba(89,131,146,0.45), rgba(18,69,89,0.45), rgba(1,17,30,0.5))',
    stats: ['18k platinum', 'GIA report', 'Size 6-8'],
  },
  {
    product: jewelleriesData.find((item) => item.id === 2),
    accent: 'linear-gradient(135deg, rgba(239,246,224,0.85), rgba(89,131,146,0.4), rgba(18,69,89,0.45))',
    stats: ['14k white gold', 'Dual polish', 'Traceable stones'],
  },
  {
    product: jewelleriesData.find((item) => item.id === 3),
    accent: 'linear-gradient(145deg, rgba(239,246,224,0.92), rgba(174,195,176,0.5), rgba(1,17,30,0.35))',
    stats: ['18k yellow', 'VS-G diamonds', '45 ctw'],
  },
]

const featuredItems: FeaturedItem[] = [
  ...stoneFeatures
    .filter((entry): entry is { product: Stone; accent: string; stats?: string[] } => Boolean(entry.product))
    .map(({ product, accent, stats }) => ({
      id: product.id,
      kind: 'stone' as const,
      name: product.name,
      description: product.description,
      priceLabel: formatPriceLabel(product.price),
      stats: (stats ?? [product.carat, `${product.clarity} clarity`, product.origin]).filter(Boolean) as string[],
      accent,
      image: product.image,
    })),
  ...jewelleryFeatures
    .filter(
      (entry): entry is { product: Jewellery; accent: string; stats?: string[] } => Boolean(entry.product),
    )
    .map(({ product, accent, stats }) => ({
      id: product.id,
      kind: 'jewellery' as const,
      name: product.name,
      description: product.description,
      priceLabel: formatPriceLabel(product.price),
      stats: (stats ?? [product.metal, product.stones, product.origin]).filter(Boolean) as string[],
      accent,
      image: product.image,
    })),
]

const FeaturedProducts = () => {
  useEffect(() => {
    if (document.querySelector('script[data-spline-gem-shapes]')) return
    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'https://unpkg.com/@splinetool/viewer@1.12.6/build/spline-viewer.js'
    script.dataset.splineGemShapes = 'true'
    document.body.appendChild(script)
  }, [])

  return (
    <section
      id="featured-products"
      className="relative overflow-hidden bg-white px-4 py-14 md:py-16 lg:py-20"
    >
      <div className="absolute -left-14 top-6 h-44 w-44 rounded-full bg-[#eff6e0]/70 blur-3xl" />
      <div className="absolute -right-16 bottom-6 h-48 w-48 rounded-full bg-[#aec3b0]/40 blur-3xl" />

      <div className="relative mx-auto max-w-6xl space-y-10 rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[0_14px_60px_-24px_rgba(1,17,30,0.35)] backdrop-blur-xl md:p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.24em] text-[#124559]/70">Featured product grid</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#01161e]">
              Preview the cut, clarity, and finish before you dive deeper
            </h2>
            <p className="max-w-2xl text-base md:text-lg text-[#598392]">
              A glassy set of highlights across stones and finished jewelry. Hover to see the glow cues that mirror how light dances through each piece.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-2xl border border-white/50 bg-white/30 px-4 py-2 text-sm uppercase tracking-tight text-[#124559] shadow-[0_10px_30px_-14px_rgba(1,17,30,0.35)] backdrop-blur-xl">
            Curated this week
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredItems.map((item) => {
            const href = item.kind === 'stone' ? `/stones/${item.id}` : `/jewelleries/${item.id}`
            const typeLabel = item.kind === 'stone' ? 'Stone' : 'Jewellery'

            return (
              <Link
                key={`${item.kind}-${item.id}`}
                to={href}
                className="group relative block overflow-hidden rounded-2xl bg-white p-5 shadow-[0_18px_36px_-22px_rgba(1,17,30,0.28),0_8px_22px_-18px_rgba(89,131,146,0.22)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_-22px_rgba(1,17,30,0.32),0_10px_26px_-18px_rgba(18,69,89,0.24)]"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35), transparent 42%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.25), transparent 40%)',
                  }}
                />
                <div className="relative flex flex-col gap-4">
                  <div className="relative overflow-hidden rounded-xl border border-[#aec3b0]/50 bg-[#eff6e0]/70 shadow-inner">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-48 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-white/30" />
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-tight ${
                        item.kind === 'stone'
                          ? 'bg-[#eff6e0]/90 text-[#01161e]'
                          : 'bg-[#124559]/90 text-[#eff6e0] shadow-[0_6px_20px_-12px_rgba(1,17,30,0.6)]'
                      }`}
                    >
                      {typeLabel}
                    </span>
                    <span className="rounded-full border border-white/40 bg-white/30 px-3 py-1 text-xs font-medium uppercase tracking-tight text-[#01161e] backdrop-blur">
                      {item.priceLabel}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold leading-tight text-[#01161e]">{item.name}</h3>
                    <p className="text-sm leading-relaxed text-[#124559]">{item.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {item.stats.map((stat) => (
                      <div
                        key={stat}
                        className="rounded-xl border border-[#aec3b0]/60 bg-[#eff6e0]/60 px-3 py-2 text-sm font-medium text-[#01161e] backdrop-blur-md"
                      >
                        {stat}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 text-sm text-[#124559]">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#aec3b0] via-[#598392] to-[#124559] shadow-[0_0_0_6px_rgba(89,131,146,0.25)]" />
                      Light test ready
                    </span>
                    <span className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-tight text-[#01161e] transition group-hover:bg-[#124559] group-hover:text-[#eff6e0]">
                      Inspect
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <div className="relative mx-auto mt-14 max-w-6xl space-y-6 rounded-3xl bg-white p-6 shadow-[0_14px_60px_-24px_rgba(1,17,30,0.35)] backdrop-blur-xl md:p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.24em] text-[#124559]/70">Gem cutting shapes</p>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#01161e]">Shape clarity for sourcing</h3>
            <p className="max-w-2xl text-base md:text-lg text-[#598392]">
              Preview the primary cuts we supply—helps you match parcels to design intent and light performance before confirming orders.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-2xl border border-white/50 bg-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-tight text-[#124559] shadow-[0_10px_30px_-14px_rgba(1,17,30,0.35)] backdrop-blur-lg">
            Supply ready
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-[0_18px_38px_-24px_rgba(1,17,30,0.28)]">
          <div className="relative aspect-[16/9]">
            <spline-viewer
              className="absolute inset-0 h-full w-full"
              url="https://prod.spline.design/wL-3MTEFUci0eiNj/scene.splinecode"
            ></spline-viewer>
            <div className="absolute bottom-4 right-4 z-50 h-15 w-50 bg-white"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
