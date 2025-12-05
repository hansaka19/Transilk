import React, { useMemo } from 'react'
import { HiMiniXMark } from 'react-icons/hi2'
import { Link, useNavigate } from 'react-router-dom'
import CartContents from '../Cart/CartContents'
import { useCart } from '../../context/CartContext'

type CartDrawerProps = {
  drawerOpen: boolean;
  toggleCartDrawer: () => void;
};

const CartDrawer: React.FC<CartDrawerProps> = ({ drawerOpen, toggleCartDrawer }) => {
  const { items } = useCart()
  const navigate = useNavigate()
  const subtotal = useMemo(
    () => items.reduce((sum, product) => sum + product.unitPrice * product.quantity, 0),
    [items],
  )
  const itemCount = items.reduce((sum, p) => sum + p.quantity, 0)
  const hasItems = itemCount > 0

  const handleCheckout = () => {
    if (!hasItems) return
    toggleCartDrawer()
    navigate('/checkout')
  }

  return (
    <div className={`fixed inset-0 z-50 ${drawerOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={toggleCartDrawer}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`absolute top-0 right-0 h-full w-full sm:w-3/4 md:w-2/5 lg:w-1/3 xl:w-1/4 transform rounded-l-3xl bg-[#f7f7f8] shadow-[0_20px_80px_-30px_rgba(15,23,42,0.8)] transition-transform duration-300 ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="space-y-1">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-400">Your tray</p>
            <p className="text-base font-semibold tracking-tight text-slate-900">
              {hasItems ? `${itemCount} item${itemCount > 1 ? 's' : ''} selected` : 'No stones yet'}
            </p>
          </div>

          <button
            type="button"
            onClick={toggleCartDrawer}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:border-slate-400 hover:text-slate-800 transition"
            aria-label="Close cart drawer"
          >
            <HiMiniXMark className="h-4 w-4" />
          </button>
        </header>

        {/* Body */}
        <div className="flex h-[calc(100%-4.5rem)] flex-col">
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {hasItems ? (
              <CartContents />
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center text-sm text-slate-500">
                <p className="mb-1 text-base font-semibold text-slate-800">Your tray is empty</p>
                <p className="max-w-xs text-xs text-slate-500">
                  Browse stones and add them here to reserve, compare cuts, and build your next piece.
                </p>
              </div>
            )}
          </div>

          {/* Footer / payment area */}
          <div className="border-t border-slate-200 bg-white/90 px-6 py-4 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="uppercase tracking-[0.25em]">Subtotal</span>
              <span className="text-base font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
            </div>

            <p className="text-[11px] leading-snug text-slate-400">
              Shipping, taxes, and duties are calculated at checkout. Stones are held in your tray for a limited time.
            </p>

            <div className="flex flex-col gap-2 pt-1">
              <button
                className="w-full rounded-full bg-slate-900 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white hover:bg-black transition disabled:cursor-not-allowed disabled:bg-slate-300"
                disabled={!hasItems}
                onClick={handleCheckout}
              >
                Proceed to checkout
              </button>

              <Link
                to="/checkout"
                onClick={() => hasItems && toggleCartDrawer()}
                className={`w-full rounded-full border border-slate-300 bg-white py-3 text-center text-xs font-semibold uppercase tracking-[0.3em] text-slate-900 transition hover:border-slate-500 ${
                  hasItems ? '' : 'pointer-events-none border-slate-200 text-slate-300'
                }`}
              >
                Pay now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartDrawer
