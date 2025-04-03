'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
};

interface CartState {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

// Fix localStorage reference error by checking for window
const isClient = typeof window !== 'undefined';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      
      addToCart: (item) => set((state) => {
        const existingItem = state.cartItems.find((cartItem) => cartItem.id === item.id);
        
        if (existingItem) {
          return {
            cartItems: state.cartItems.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + (item.quantity || 1) }
                : cartItem
            ),
          };
        } else {
          return {
            cartItems: [...state.cartItems, { ...item, quantity: item.quantity || 1 }],
          };
        }
      }),
      
      removeFromCart: (id) => set((state) => ({
        cartItems: state.cartItems.filter((item) => item.id !== id),
      })),
      
      increaseQuantity: (id) => set((state) => ({
        cartItems: state.cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      })),
      
      decreaseQuantity: (id) => set((state) => ({
        cartItems: state.cartItems.map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      })),
      
      clearCart: () => set({ cartItems: [] }),
      
      getCartTotal: () => {
        return get().cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'transilk-cart',
      storage: {
        getItem: (name) => {
          if (!isClient) return null;
          return JSON.parse(localStorage.getItem(name) || 'null');
        },
        setItem: (name, value) => {
          if (!isClient) return;
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          if (!isClient) return;
          localStorage.removeItem(name);
        },
      },
      skipHydration: true,
    }
  )
);

// Function to safely initialize store on the client
export function initializeStore() {
  if (isClient) {
    useCartStore.persist.rehydrate();
  }
}
