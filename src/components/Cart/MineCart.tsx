import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const MineCart = () => {
  const { items, updateQuantity, removeItem } = useCart()
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)

  return (
    <section className="relative overflow-hidden bg-white px-4 py-10">
      <div className="absolute inset-0 bg-gradient-to-b from-[#eff6e0] via-white to-white" />
      <div className="absolute -left-10 top-10 h-36 w-36 rounded-full bg-[#aec3b0]/40 blur-3xl" />
      <div className="absolute -right-14 bottom-8 h-40 w-40 rounded-full bg-[#598392]/25 blur-3xl" />

      <div className="relative mx-auto max-w-5xl space-y-6 rounded-3xl border border-white/60 bg-white/80 p-6 shadow-[0_14px_50px_-22px_rgba(1,17,30,0.32)] backdrop-blur-xl md:p-10">
        <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-[#124559]/70">Mine cart</p>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#01161e]">
              Stones & jewellery ready for checkout
            </h1>
            <p className="text-sm text-[#598392]">
              Review your picks, adjust quantities, or keep browsing before you confirm.
            </p>
          </div>
          <div className="rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-tight text-[#124559] shadow-[0_10px_26px_-16px_rgba(1,17,30,0.35)]">
            {items.length} items
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4 rounded-2xl border border-[#aec3b0]/60 bg-white p-4 shadow-[0_12px_32px_-20px_rgba(1,17,30,0.28)]">
            {items.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#aec3b0]/70 bg-white/70 px-4 py-8 text-center text-sm text-[#598392]">
                Your tray is empty.{' '}
                <Link to="/stones" className="font-semibold text-[#124559] underline-offset-2 hover:underline">
                  Keep browsing
                </Link>
                .
              </div>
            ) : (
              items.map((item) => (
                <div key={item.cartId} className="flex gap-4 rounded-xl bg-white/70 p-3">
                  <div className="h-20 w-20 overflow-hidden rounded-lg border border-[#aec3b0]/60 bg-[#eff6e0]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#01161e]">{item.name}</p>
                        <p className="text-xs uppercase tracking-wide text-[#124559]">
                          {item.kind === 'stone' ? 'Stone' : 'Jewellery'}
                        </p>
                        {item.detail && <p className="text-xs text-[#598392] line-clamp-2">{item.detail}</p>}
                        {item.meta && <p className="text-[11px] text-[#598392]">{item.meta}</p>}
                      </div>
                      <span className="text-sm font-semibold text-[#124559]">${item.unitPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        className="h-8 w-8 rounded-full border border-[#aec3b0]/70 text-[#01161e] hover:border-[#124559] hover:text-[#124559] transition"
                        onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-sm font-medium text-[#01161e]">{item.quantity}</span>
                      <button
                        className="h-8 w-8 rounded-full border border-[#aec3b0]/70 text-[#01161e] hover:border-[#124559] hover:text-[#124559] transition"
                        onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="self-start rounded-full border border-transparent px-2 py-1 text-[11px] text-[#598392] transition hover:border-[#aec3b0]/80 hover:text-[#01161e]"
                    onClick={() => removeItem(item.cartId)}
                    aria-label="Remove item"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>

          <aside className="space-y-4 rounded-2xl border border-[#aec3b0]/60 bg-white p-4 shadow-[0_12px_32px_-20px_rgba(1,17,30,0.28)]">
            <h2 className="text-lg font-semibold text-[#01161e]">Summary</h2>
            <div className="space-y-2 text-sm text-[#124559]">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>
                  ${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Insured shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            <button className="w-full rounded-full bg-[#124559] px-4 py-3 text-sm font-semibold uppercase tracking-tight text-white transition hover:bg-[#0f394a]" disabled={items.length === 0}>
              Proceed to checkout
            </button>
            <button className="w-full rounded-full border border-[#aec3b0]/70 bg-white px-4 py-3 text-sm font-semibold uppercase tracking-tight text-[#01161e] transition hover:border-[#124559]/80">
              Continue shopping
            </button>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default MineCart
