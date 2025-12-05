/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Stone } from '../components/Products/Stones'
import type { Jewellery } from '../components/Products/Jewelleries'

export type CartItem = {
  id: number
  cartId: string
  name: string
  image: string
  unitPrice: number
  quantity: number
  kind: 'stone' | 'jewellery'
  detail?: string
  meta?: string
}

type CartContextType = {
  items: CartItem[]
  addItem: (product: Stone | Jewellery, quantity?: number) => void
  removeItem: (cartId: string) => void
  updateQuantity: (cartId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (product: Stone | Jewellery, quantity = 1) => {
    setItems((prev) => {
      const isStone = (p: Stone | Jewellery): p is Stone => 'carat' in p
      const kind: CartItem['kind'] = isStone(product) ? 'stone' : 'jewellery'
      const cartId = `${kind}-${product.id}`

      const existing = prev.find((i) => i.cartId === cartId)
      const unitPrice =
        typeof product.price === 'number'
          ? product.price
          : Number(String(product.price).replace(/[^0-9.]/g, '')) || 0

      if (existing) {
        return prev.map((i) =>
          i.cartId === cartId ? { ...i, quantity: i.quantity + quantity } : i,
        )
      }

      const detail = isStone(product)
        ? `${product.carat} • ${product.clarity}`
        : `${product.metal} • ${product.stones}`
      const meta = isStone(product) ? product.origin : product.origin

      return [
        ...prev,
        {
          id: product.id,
          cartId,
          name: product.name,
          image: product.image,
          unitPrice,
          quantity,
          kind,
          detail,
          meta,
        },
      ]
    })
  }

  const removeItem = (cartId: string) => {
    setItems((prev) => prev.filter((i) => i.cartId !== cartId))
  }

  const updateQuantity = (cartId: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) return prev.filter((i) => i.cartId !== cartId)
      return prev.map((i) => (i.cartId === cartId ? { ...i, quantity } : i))
    })
  }

  const clearCart = () => setItems([])

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
