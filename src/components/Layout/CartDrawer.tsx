import React from 'react'
import { HiMiniXMark } from "react-icons/hi2";
import CartContents, { mockCartProducts } from '../Cart/CartContents';

type CartDrawerProps = {
  drawerOpen: boolean;
  toggleCartDrawer: () => void;
};

const CartDrawer: React.FC<CartDrawerProps> = ({ drawerOpen, toggleCartDrawer }) => {
  const subtotal = mockCartProducts.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <div className={`fixed inset-0 z-50 ${drawerOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
      <div
        className={`absolute inset-0 bg-slate-900/40 transition-opacity duration-300 ${drawerOpen ? "opacity-100" : "opacity-0"}`}
        onClick={toggleCartDrawer}
        aria-hidden="true"
      />

      <div className={`absolute top-0 right-0 h-full w-full sm:w-3/4 md:w-2/5 lg:w-1/3 xl:w-1/4 bg-white shadow-2xl transform transition-transform duration-300 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>
        <header className="flex items-center justify-between px-5 py-4 border-b">
          <div>
            <p className="text-xs uppercase tracking-[0.08em] text-slate-500">Cart</p>
            <p className="text-lg font-semibold text-[#124559]">Review your items</p>
          </div>
          <button
            type="button"
            onClick={toggleCartDrawer}
            className="rounded-full border border-slate-200 p-2 text-slate-600 hover:text-[#124559] hover:border-[#124559] transition"
            aria-label="Close cart drawer"
          >
            <HiMiniXMark className="h-5 w-5" />
          </button>
        </header>

        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto px-5">
            <CartContents />
          </div>

          <div className="border-t px-5 py-4 space-y-3 bg-white">
            <div className="flex items-center justify-between text-sm text-slate-700">
              <span>Subtotal</span>
              <span className="text-base font-semibold text-[#124559]">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Shipping, taxes, and discount codes will be calculated at checkout.
            </p>
            <button className="w-full bg-[#124559] text-white py-3 rounded-lg font-semibold hover:bg-[#0f394a] transition">
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartDrawer
