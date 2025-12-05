import { useCart } from '../../context/CartContext'
import { Link } from 'react-router-dom'

const CartContents = () => {
  const { items, updateQuantity, removeItem } = useCart()

  if (items.length === 0) {
    return (
      <div className="py-6 text-center text-sm text-slate-500">
        Your cart is empty.{' '}
        <Link to="/stones" className="font-semibold text-[#124559] hover:underline underline-offset-2">
          Continue shopping
        </Link>
        .
      </div>
    )
  }

  return (
    <div className="divide-y divide-slate-100">
      {items.map((product) => (
        <div key={product.cartId} className="flex gap-4 py-4">
          <div className="w-20 h-24 overflow-hidden rounded-lg bg-slate-100">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800">{product.name}</p>
                {product.detail && <p className="text-xs text-slate-500 mt-1 line-clamp-2">{product.detail}</p>}
                {product.meta && <p className="text-[11px] text-slate-500 mt-1">{product.meta}</p>}
              </div>
              <span className="text-sm font-semibold text-[#124559]">
                ${product.unitPrice.toFixed(2)}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  className="h-8 w-8 rounded-full border border-slate-200 text-slate-700 hover:border-[#124559] hover:text-[#124559] transition"
                  type="button"
                  aria-label={`Decrease quantity of ${product.name}`}
                  onClick={() => updateQuantity(product.cartId, product.quantity - 1)}
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
                  onClick={() => updateQuantity(product.cartId, product.quantity + 1)}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="text-xs font-semibold text-slate-500 hover:text-[#124559] transition"
                aria-label={`Remove ${product.name} from cart`}
                onClick={() => removeItem(product.cartId)}
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
