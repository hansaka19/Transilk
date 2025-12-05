import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const PayNow: React.FC = () => {
  const { items } = useCart()

  const subtotal = useMemo(() => items.reduce((sum, p) => sum + p.unitPrice * p.quantity, 0), [items])

  const hasItems = items.length > 0

  return (
    <section className="relative min-h-screen bg-[#f7f7f8] text-[#111827]">
      {/* header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-6">
        <Link to="/checkout" className="text-xs uppercase tracking-[0.25em] text-gray-500 hover:text-gray-900">
          ← Back
        </Link>

        <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">Payment</p>

        <p className="text-xs text-gray-500">
          {items.length} item{items.length !== 1 && 's'}
        </p>
      </header>

      <div className="relative mx-auto mt-6 max-w-6xl px-4 pb-16">
        {/* left label */}
        <div className="pointer-events-none absolute -left-40 top-1/2 hidden -translate-y-1/2 md:block">
          <p className="-rotate-90 text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Transilk · Pay Now</p>
        </div>

        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
          {/* LEFT: card/payment form */}
          <div className="space-y-8">
            <section className="rounded-3xl bg-white p-6 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.8)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-400">Card details</p>

              <div className="mt-5 space-y-4">
                <input
                  type="text"
                  placeholder="Name on card"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:border-gray-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Card number"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:border-gray-500 focus:outline-none"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:border-gray-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:border-gray-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-3 text-xs text-gray-500">
                <p>Your payment details are encrypted. We do not store full card numbers on Transilk servers.</p>
                <p>
                  By confirming payment, you agree to our{' '}
                  <button className="underline underline-offset-2 hover:text-gray-800">terms</button> and{' '}
                  <button className="underline underline-offset-2 hover:text-gray-800">refund policy</button>.
                </p>
              </div>

              <button
                className="mt-6 w-full rounded-full bg-gray-900 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white hover:bg-black transition disabled:bg-gray-400"
                disabled={!hasItems}
              >
                Confirm & Pay
              </button>
            </section>

            {/* alternative methods / info */}
            <section className="rounded-3xl bg-white p-6 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.7)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-400">Other options</p>

              <div className="mt-4 space-y-3 text-sm text-gray-700">
                <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                  <p className="font-medium text-gray-900">Direct bank transfer</p>
                  <p className="mt-1 text-xs text-gray-600">
                    Place your order and receive bank details via email. Your stones are held for 24 hours while payment
                    clears.
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                  <p className="font-medium text-gray-900">In-studio payment</p>
                  <p className="mt-1 text-xs text-gray-600">
                    Visit the Transilk studio in Sri Lanka to confirm stones in person and finalize payment on-site.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT: order summary */}
          <div className="space-y-6">
            <section className="rounded-3xl bg-white p-6 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.7)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">Order summary</p>

              <div className="mt-5 space-y-4">
                {items.length === 0 ? (
                  <p className="text-sm text-gray-500">No items in cart.</p>
                ) : (
                  items.map((item) => (
                    <div key={item.cartId} className="flex items-center justify-between border-b border-gray-200 pb-4">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="h-14 w-14 rounded-xl object-cover" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>

                      <p className="text-sm font-semibold text-gray-900">${(item.unitPrice * item.quantity).toFixed(2)}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6 space-y-2 border-t pt-4 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-900">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="mt-4 inline-flex items-center text-xs font-medium uppercase tracking-[0.25em] text-gray-500 hover:text-gray-900"
              >
                ← Edit details
              </Link>
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PayNow
