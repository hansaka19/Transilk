import { useMemo, useRef, useState } from 'react'
import {
  clamp,
  defaultShapes,
  formatCarat,
  formatMoney,
  type FilterValues,
  type ShapeItem,
  type ShapeKey,
} from './filterUtils'

const DoubleRange = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  ariaLabel,
}: {
  min: number
  max: number
  step?: number
  value: { from: number; to: number }
  onChange: (v: { from: number; to: number }) => void
  ariaLabel: string
}) => {
  const from = clamp(value.from, min, max)
  const to = clamp(value.to, min, max)
  const safeFrom = Math.min(from, to - step)
  const safeTo = Math.max(to, safeFrom + step)
  const leftPct = ((safeFrom - min) / (max - min)) * 100
  const rightPct = ((safeTo - min) / (max - min)) * 100

  return (
    <div className="relative h-6">
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
        <div className="h-[2.5px] rounded-full bg-gray-900/20" />
        <div
          className="absolute h-[2.5px] rounded-full bg-gray-900/50"
          style={{ left: `${leftPct}%`, width: `${rightPct - leftPct}%` }}
        />
      </div>

      <input
        aria-label={`${ariaLabel} minimum`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={safeFrom}
        onChange={(e) => {
          const nextFrom = Number(e.target.value)
          onChange({ from: clamp(nextFrom, min, safeTo - step), to: safeTo })
        }}
        className="absolute inset-0 w-full appearance-none bg-transparent
                   [&::-webkit-slider-thumb]:appearance-none
                   [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5
                   [&::-webkit-slider-thumb]:rounded-full
                   [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-gray-900/70
                   [&::-webkit-slider-thumb]:bg-white
                   [&::-webkit-slider-thumb]:shadow-[0_6px_16px_-10px_rgba(15,23,42,0.65)]
                   [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5
                   [&::-moz-range-thumb]:rounded-full
                   [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-gray-900/70
                   [&::-moz-range-thumb]:bg-white"
      />
      <input
        aria-label={`${ariaLabel} maximum`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={safeTo}
        onChange={(e) => {
          const nextTo = Number(e.target.value)
          onChange({ from: safeFrom, to: clamp(nextTo, safeFrom + step, max) })
        }}
        className="absolute inset-0 w-full appearance-none bg-transparent
                   [&::-webkit-slider-thumb]:appearance-none
                   [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5
                   [&::-webkit-slider-thumb]:rounded-full
                   [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-gray-900/70
                   [&::-webkit-slider-thumb]:bg-white
                   [&::-webkit-slider-thumb]:shadow-[0_6px_16px_-10px_rgba(15,23,42,0.65)]
                   [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5
                   [&::-moz-range-thumb]:rounded-full
                   [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-gray-900/70
                   [&::-moz-range-thumb]:bg-white"
      />
    </div>
  )
}

const ArrowIcon = ({ dir }: { dir: 'left' | 'right' }) => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
    {dir === 'left' ? (
      <path d="M14.5 5.5 8 12l6.5 6.5" strokeLinecap="round" strokeLinejoin="round" />
    ) : (
      <path d="M9.5 18.5 16 12 9.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
    )}
  </svg>
)

const ShapeSVG = ({ shape }: { shape: ShapeKey }) => {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.4,
    strokeLinejoin: 'round' as const,
    strokeLinecap: 'round' as const,
  }

  switch (shape) {
    case 'round':
      return (
        <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
          <circle cx="24" cy="24" r="16" {...common} />
          <path d="M24 8v32M8 24h32M13 13l22 22M35 13 13 35" {...common} opacity=".55" />
        </svg>
      )
    case 'oval':
      return (
        <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
          <ellipse cx="24" cy="24" rx="14" ry="18" {...common} />
          <path d="M24 6v36M12 24h24M14 14l20 20M34 14 14 34" {...common} opacity=".55" />
        </svg>
      )
    case 'marquise':
      return (
        <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
          <path d="M24 6c7 6 12 12 12 18s-5 12-12 18C17 36 12 30 12 24S17 12 24 6Z" {...common} />
          <path d="M24 8v32M14 24h20M16 16l16 16M32 16 16 32" {...common} opacity=".55" />
        </svg>
      )
    case 'radiant':
      return (
        <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
          <path d="M16 10h16l6 6v16l-6 6H16l-6-6V16l6-6Z" {...common} />
          <path d="M24 10v28M10 24h28M16 16l16 16M32 16 16 32" {...common} opacity=".55" />
        </svg>
      )
    case 'cushion':
      return (
        <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
          <path
            d="M16 11h16c3 0 5 2 5 5v16c0 3-2 5-5 5H16c-3 0-5-2-5-5V16c0-3 2-5 5-5Z"
            {...common}
          />
          <path d="M24 11v26M11 24h26M16 16l16 16M32 16 16 32" {...common} opacity=".55" />
        </svg>
      )
    case 'princess':
      return (
        <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
          <rect x="12" y="12" width="24" height="24" rx="2" {...common} />
          <path d="M24 12v24M12 24h24M12 12l24 24M36 12 12 36" {...common} opacity=".55" />
        </svg>
      )
    case 'emerald':
      return (
        <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
          <path d="M16 10h16l4 4v20l-4 4H16l-4-4V14l4-4Z" {...common} />
          <path d="M18 14h12l2 2v16l-2 2H18l-2-2V16l2-2Z" {...common} opacity=".55" />
          <path d="M24 10v28M10 24h28" {...common} opacity=".45" />
        </svg>
      )
    default:
      return null
  }
}

const FilterStrip = ({
  shapes = defaultShapes,
  onChange,
}: {
  shapes?: ShapeItem[]
  onChange?: (filters: FilterValues) => void
}) => {
  const [price, setPrice] = useState({ from: 160, to: 105335 })
  const [carat, setCarat] = useState({ from: 0.18, to: 5.16 })
  const [shape, setShape] = useState<ShapeKey | null>(null)
  const scrollerRef = useRef<HTMLDivElement | null>(null)

  const emit = (next?: Partial<FilterValues>) => {
    const payload = {
      price: next?.price ?? price,
      carat: next?.carat ?? carat,
      shape: next?.shape ?? shape,
    }
    onChange?.(payload)
  }

  const priceDisplay = useMemo(
    () => ({ min: formatMoney(price.from), max: formatMoney(price.to) }),
    [price],
  )
  const caratDisplay = useMemo(
    () => ({ min: formatCarat(carat.from), max: formatCarat(carat.to) }),
    [carat],
  )

  return (
    <div className="w-full max-w-5xl rounded-3xl border border-gray-200 bg-white px-4 py-3 shadow-[0_14px_30px_-20px_rgba(15,23,42,0.35)] sm:px-5 sm:py-4">
      <div className="grid gap-5 lg:grid-cols-[1.05fr_1.6fr] lg:items-start">
        <div className="space-y-4">
          <div className="space-y-2.5">
            <div className="text-[13px] font-semibold text-gray-900">Shop by Price</div>

            <div className="flex items-center justify-between gap-3">
              <div className="min-w-[100px] rounded-lg border border-gray-200 bg-white px-3 py-2 text-[13px] text-gray-900">
                {priceDisplay.min}
              </div>
              <div className="min-w-[100px] rounded-lg border border-gray-200 bg-white px-3 py-2 text-[13px] text-gray-900 text-right">
                {priceDisplay.max}
              </div>
            </div>

            <DoubleRange
              min={0}
              max={120000}
              step={25}
              value={price}
              ariaLabel="Price range"
              onChange={(v) => {
                setPrice(v)
                emit({ price: v })
              }}
            />
          </div>

          <div className="space-y-2.5">
            <div className="text-[13px] font-semibold text-gray-900">Shop by Carat Weight</div>

            <div className="flex items-center justify-between gap-3">
              <div className="min-w-[100px] rounded-lg border border-gray-200 bg-white px-3 py-2 text-[13px] text-gray-900">
                {caratDisplay.min}
              </div>
              <div className="min-w-[100px] rounded-lg border border-gray-200 bg-white px-3 py-2 text-[13px] text-gray-900 text-right">
                {caratDisplay.max}
              </div>
            </div>

            <DoubleRange
              min={0.05}
              max={10}
              step={0.01}
              value={carat}
              ariaLabel="Carat range"
              onChange={(v) => {
                setCarat(v)
                emit({ carat: v })
              }}
            />
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="text-[13px] font-semibold text-gray-900">Shop by Stone Shape</div>

            <div className="flex items-center gap-2 text-gray-900/60">
              <button
                type="button"
                onClick={() => scrollerRef.current?.scrollBy({ left: -280, behavior: 'smooth' })}
                className="grid h-8 w-8 place-items-center rounded-full border border-gray-200 bg-white hover:bg-gray-100"
                aria-label="Scroll shapes left"
              >
                <ArrowIcon dir="left" />
              </button>
              <button
                type="button"
                onClick={() => scrollerRef.current?.scrollBy({ left: 280, behavior: 'smooth' })}
                className="grid h-8 w-8 place-items-center rounded-full border border-gray-200 bg-white hover:bg-gray-100"
                aria-label="Scroll shapes right"
              >
                <ArrowIcon dir="right" />
              </button>
            </div>
          </div>

          <div
            ref={scrollerRef}
            className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {shapes.map((s) => {
              const active = shape === s.key
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => {
                    const next = active ? null : s.key
                    setShape(next)
                    emit({ shape: next })
                  }}
                  className={[
                    'min-w-[84px] rounded-2xl px-3 py-2.5 text-center transition',
                    'border bg-white',
                    active
                      ? 'border-gray-400 shadow-[0_10px_20px_-18px_rgba(15,23,42,0.5)]'
                      : 'border-gray-200 hover:border-gray-300',
                  ].join(' ')}
                >
                  <div className="mx-auto grid place-items-center text-gray-900/65">
                    <ShapeSVG shape={s.key} />
                  </div>
                  <div className="mt-1.5 text-[11px] font-semibold text-gray-900">{s.label}</div>
                  {typeof s.count === 'number' && (
                    <div className="text-[10px] text-gray-500">({s.count.toLocaleString()})</div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterStrip
