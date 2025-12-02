import React from 'react'

// Temporary mocked cart data; replace with live cart state when available.
export const mockCartProducts = [
  {
    productId: 1,
    name: "Blue Sapphire",
    size: "5 carat",
    Discription: "Natural Blue Sapphire from Sri Lanka",
    price: 500.0,
    quantity: 1,
    ImageUrl: "https://picsum.photos/200?random=1"
  },
  {
    productId: 2,
    name: "Ruby",
    size: "1 carat",
    Discription: "Natural Ruby from Sri Lanka",
    price: 500.0,
    quantity: 1,
    ImageUrl: "https://picsum.photos/200?random=2"
  },
  {
    productId: 3,
    name: "Emerald",
    size: "5 carat",
    Discription: "Natural Emerald from Sri Lanka",
    price: 500.0,
    quantity: 1,
    ImageUrl: "https://picsum.photos/200?random=3"
  },
  {
    productId: 4,
    name: "Yellow Sapphire",
    size: "5 carat",
    Discription: "Natural Yellow Sapphire from Sri Lanka",
    price: 500.0,
    quantity: 1,
    ImageUrl: "https://picsum.photos/200?random=4"
  }
];

const CartContents = () => {
  return (
    // Each product row shows thumbnail, info, quantity controls, and a remove action.
    <div className="divide-y divide-slate-100">
      {mockCartProducts.map((product, index) => (
        <div key={product.productId ?? index} className="flex gap-4 py-4">
          <div className="w-20 h-24 overflow-hidden rounded-lg bg-slate-100">
            <img
              src={product.ImageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800">{product.name}</p>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{product.Discription}</p>
                <p className="text-xs text-slate-500 mt-1">Size: {product.size}</p>
              </div>
              <span className="text-sm font-semibold text-[#124559]">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  className="h-8 w-8 rounded-full border border-slate-200 text-slate-700 hover:border-[#124559] hover:text-[#124559] transition"
                  type="button"
                  aria-label={`Decrease quantity of ${product.name}`}
                >
                  -
                </button>
                <span className="text-sm font-medium text-slate-800 w-6 text-center">
                  {product.quantity}
                </span>
                <button
                  className="h-8 w-8 rounded-full border border-slate-200 text-slate-700 hover:border-[#124559] hover:text-[#124559] transition"
                  type="button"
                  aria-label={`Increase quantity of ${product.name}`}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="text-xs font-semibold text-slate-500 hover:text-[#124559] transition"
                aria-label={`Remove ${product.name} from cart`}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CartContents
