"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CartItem, useCartStore, initializeStore } from '@/store/cartStore';

// Client-side only component to prevent hydration issues
function SafeHydrate({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Initialize store when component mounts (client-side only)
    initializeStore();
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <>{children}</>;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  
  // Move cart functionality to client-side only
  useEffect(() => {
    // Get cart item count from store
    const unsubscribe = useCartStore.subscribe(
      state => setCartItemCount(state.cartItems?.length || 0)
    );
    return () => unsubscribe();
  }, []);
  
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/gemstones', label: 'Gemstones' },
    { href: '/jewelleries', label: 'Jewellery' },
    { href: '/auctions', label: 'Auctions' },
    { href: '/contact', label: 'Contact' },
  ];
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  // Add scroll event listener to detect when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <SafeHydrate>
      <header className={`fixed w-full top-0 left-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-primary/95 shadow-lg backdrop-blur-sm'
          : 'bg-gradient-to-b from-black/70 via-black/40 to-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl md:text-3xl font-display font-bold text-white">
                <span className="text-gold-primary">TRAN</span>SILK
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white hover:text-gold-primary font-medium tracking-wide transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-5">
              {/* Search button */}
              <button 
                className="text-white hover:text-gold-primary p-1 transition-colors"
                onClick={toggleSearch}
                aria-label="Search"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              {/* Account */}
              <Link 
                href="/profile" 
                className="text-white hover:text-gold-primary p-1 transition-colors"
                aria-label="Profile"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>

              {/* Cart with client-side rendering for the count */}
              <button 
                className="text-white hover:text-gold-primary p-1 relative transition-colors"
                onClick={toggleCart}
                aria-label="Cart"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
              
              {/* Mobile menu button */}
              <button
                className="md:hidden text-white hover:text-secondary p-1 transition-colors"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={
                    isMenuOpen 
                      ? "M6 18L18 6M6 6l12 12" 
                      : "M4 6h16M4 12h16m-7 6h7"
                  } />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden backdrop-blur-md bg-primary/95 transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 border-t border-white/10' : 'max-h-0 invisible'
          } overflow-hidden`}
        >
          <nav className="container mx-auto px-4 py-3 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-white hover:text-secondary py-2 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="fixed inset-0 bg-black/70 flex items-start justify-center pt-20 px-4 z-50 backdrop-blur-md animate-fade-in">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl p-6">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search for gemstones, jewelry..."
                  className="w-full p-3 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-gold-primary"
                />
                <button className="bg-gold-primary hover:bg-gold-dark text-white py-3 px-5 rounded-r transition-colors font-medium">
                  Search
                </button>
                <button 
                  className="ml-4 text-gray-500 hover:text-gray-700"
                  onClick={toggleSearch}
                  aria-label="Close search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">POPULAR SEARCHES</h3>
                <div className="flex flex-wrap gap-2">
                  {['Ruby', 'Sapphire', 'Emerald', 'Diamond Ring', 'Gold Necklace'].map((term) => (
                    <button key={term} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm">
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cart Sidebar with SafeHydrate wrapper */}
        {isCartOpen && (
          <SafeHydrate>
            <CartSidebar onClose={() => setIsCartOpen(false)} />
          </SafeHydrate>
        )}
      </header>
    </SafeHydrate>
  );
};

// Separate cart sidebar component to be wrapped with SafeHydrate
const CartSidebar = ({ onClose }: { onClose: () => void }) => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, getCartTotal } = useCartStore();
  
  // Format price to currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md h-full flex flex-col animate-slide-in-right text-gray-800">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold">Your Cart ({cartItems.length})</h2>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Cart items */}
        <div className="flex-grow overflow-auto p-4">
          {cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item: CartItem) => (
                <div key={item.id} className="flex items-center border-b pb-4">
                  <div className="h-16 w-16 relative flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                    {item.image && (
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-cover" 
                      />
                    )}
                  </div>
                  <div className="ml-4 flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border rounded">
                        <button 
                          onClick={() => decreaseQuantity(item.id)}
                          className="px-2 py-1 hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button 
                          onClick={() => increaseQuantity(item.id)}
                          className="px-2 py-1 hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-gray-500">Your cart is empty</p>
              <Link 
                href="/gemstones" 
                className="mt-4 px-4 py-2 bg-secondary text-white rounded hover:bg-secondary-dark transition-colors"
                onClick={onClose}
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="p-4 border-t">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Subtotal:</span>
              <span className="font-bold">{formatPrice(getCartTotal())}</span>
            </div>
            <Link
              href="/checkout"
              className="w-full py-2 bg-secondary hover:bg-secondary-dark text-white text-center rounded block transition-colors"
              onClick={onClose}
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
