import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Checkout: React.FC = () => {
  const { items } = useCart()

  const subtotal = useMemo(() => items.reduce((sum, p) => sum + p.unitPrice * p.quantity, 0), [items])

  return (
    <section className="relative min-h-screen bg-[#f7f7f8] text-[#111827]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-6">
        <Link to="/" className="text-xs uppercase tracking-[0.25em] text-gray-500 hover:text-gray-900">
          ← Back
        </Link>

        <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">Checkout</p>

        <p className="text-xs text-gray-500">{items.length} items</p>
      </header>

      <div className="relative mx-auto mt-6 max-w-6xl px-4 pb-16">
        <div className="pointer-events-none absolute -left-40 top-1/2 hidden -translate-y-1/2 md:block">
          <p className="-rotate-90 text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Transilk · Checkout</p>
        </div>

        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <div className="space-y-8">
            <section className="rounded-3xl bg-white p-6 shadow-[0_18px_40px_-26px_rgba(15,23,42,0.7)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-400">
                Contact Information
              </p>

              <div className="mt-4 grid gap-4">
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:border-gray-500 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:border-gray-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Phone number"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:border-gray-500 focus:outline-none"
                />
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-[0_18px_40px_-26px_rgba(15,23,42,0.7)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-400">Shipping Address</p>

              <div className="mt-4 grid gap-4">
                <input
                  type="text"
                  placeholder="Street address"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:border-gray-500 focus:outline-none"
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="City"
                    className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:border-gray-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Postal code"
                    className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:border-gray-500 focus:outline-none"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Country"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:border-gray-500 focus:outline-none"
                />
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-[0_18px_40px_-26px_rgba(15,23,42,0.7)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-400">Payment Method</p>

              <div className="mt-5 space-y-4">
                <button className="flex w-full items-center justify-between rounded-xl border border-gray-300 bg-gray-50 px-4 py-4 text-sm hover:border-gray-500 transition">
                  Credit / Debit Card
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Enter →</span>
                </button>

                <button className="flex w-full items-center justify-between rounded-xl border border-gray-300 bg-gray-50 px-4 py-4 text-sm hover:border-gray-500 transition">
                  Direct Bank Transfer
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">View →</span>
                </button>

                <button className="flex w-full items-center justify-between rounded-xl border border-gray-300 bg-gray-50 px-4 py-4 text-sm hover:border-gray-500 transition">
                  Cash on Delivery (Local Only)
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Info →</span>
                </button>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl bg-white p-6 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.8)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">Order Summary</p>

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
                to="/paynow"
                className={`mt-6 block w-full rounded-full bg-gray-900 py-3 text-center text-xs font-semibold uppercase tracking-[0.3em] text-white hover:bg-black transition ${
                  items.length === 0 ? 'pointer-events-none bg-gray-400 hover:bg-gray-400' : ''
                }`}
              >
                Pay Now
              </Link>
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Checkout
