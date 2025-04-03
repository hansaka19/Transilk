'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

// Helper function to format price
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

// Sample order history data
const orderHistory = [
  {
    id: 'ORD-2023-1012',
    date: 'Oct 12, 2023',
    status: 'Delivered',
    total: 2499.99,
    items: [
      {
        id: 'p1',
        name: 'Natural Ruby Gemstone',
        image: 'https://images.pexels.com/photos/3685523/pexels-photo-3685523.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 2499.99,
        quantity: 1
      }
    ]
  },
  {
    id: 'ORD-2023-0905',
    date: 'Sep 5, 2023',
    status: 'Delivered',
    total: 3299.99,
    items: [
      {
        id: 'p2',
        name: 'Blue Sapphire Ring',
        image: 'https://images.pexels.com/photos/331958/pexels-photo-331958.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 3299.99,
        quantity: 1
      }
    ]
  }
];

// Define wishlist item type
interface WishlistItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
}

// Sample wishlist data
const wishlistItems: WishlistItem[] = [
  {
    id: 'p3',
    name: 'Emerald Gold Necklace',
    category: 'Jewelry',
    price: 4999.99,
    image: 'https://images.pexels.com/photos/1457801/pexels-photo-1457801.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 5,
  },
  {
    id: 'p4',
    name: 'Diamond Solitaire',
    category: 'Diamonds',
    price: 7999.99,
    image: 'https://images.pexels.com/photos/11706768/pexels-photo-11706768.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.8,
  }
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { addToCart } = useCartStore();
  
  // Handle add to cart from wishlist
  const handleAddToCart = (item: WishlistItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      category: item.category
    });
  };
  
  return (
    <main className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary to-primary-light rounded-lg p-6 md:p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center">
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white mb-4 md:mb-0 md:mr-6">
              <Image 
                src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Profile picture"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold mb-1">John Doe</h1>
              <p className="text-white/80 mb-2">Premium Member since 2023</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Gems Enthusiast</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Collector</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-auto flex flex-col items-center md:items-end">
              <div className="bg-white/20 rounded-lg px-4 py-2 text-center mb-2">
                <span className="block text-sm text-white/80">Loyalty Points</span>
                <span className="block text-2xl font-bold">1,250</span>
              </div>
              <button className="text-white bg-gold-primary hover:bg-gold-dark px-4 py-2 rounded transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        
        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <nav className="flex flex-col">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                  { id: 'orders', label: 'Order History', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
                  { id: 'wishlist', label: 'Wishlist', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
                  { id: 'settings', label: 'Account Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
                  { id: 'logout', label: 'Logout', icon: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center px-4 py-3 border-l-4 ${
                      activeTab === item.id 
                        ? 'border-gold-primary bg-gold-primary/5 text-primary font-medium' 
                        : 'border-transparent hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Dashboard */}
            {activeTab === 'dashboard' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Dashboard
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-primary/5 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Orders</span>
                      <span className="text-primary bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">2</p>
                    <p className="text-sm text-gray-500">Last order on Oct 12, 2023</p>
                  </div>
                  
                  <div className="bg-accent-sapphire/5 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Wishlist</span>
                      <span className="text-accent-sapphire bg-accent-sapphire/10 rounded-full w-8 h-8 flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">2</p>
                    <p className="text-sm text-gray-500">Items in your wishlist</p>
                  </div>
                  
                  <div className="bg-gold-primary/5 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Loyalty Points</span>
                      <span className="text-gold-primary bg-gold-primary/10 rounded-full w-8 h-8 flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">1,250</p>
                    <p className="text-sm text-gray-500">Available points to redeem</p>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Order</h3>
                  {orderHistory.length > 0 ? (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex flex-wrap justify-between mb-2">
                        <div>
                          <span className="text-sm text-gray-500">Order ID:</span>
                          <span className="ml-2 text-primary font-medium">{orderHistory[0].id}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Date:</span>
                          <span className="ml-2">{orderHistory[0].date}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Status:</span>
                          <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">{orderHistory[0].status}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center mt-3">
                        <div className="h-16 w-16 relative flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                          <Image 
                            src={orderHistory[0].items[0].image} 
                            alt={orderHistory[0].items[0].name} 
                            fill 
                            className="object-cover" 
                          />
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium">{orderHistory[0].items[0].name}</h4>
                          <p className="text-gray-500 text-sm">Quantity: {orderHistory[0].items[0].quantity}</p>
                          <p className="text-gold-primary font-medium">{formatPrice(orderHistory[0].items[0].price)}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">No recent orders.</p>
                  )}
                  
                  <div className="mt-4 text-right">
                    <button 
                      onClick={() => setActiveTab('orders')}
                      className="text-gold-primary hover:text-gold-dark text-sm font-medium inline-flex items-center"
                    >
                      View All Orders
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Order History */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  Order History
                </h2>
                
                {orderHistory.length > 0 ? (
                  <div className="space-y-4">
                    {orderHistory.map((order) => (
                      <div key={order.id} className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-50 p-4 flex flex-wrap justify-between items-center">
                          <div>
                            <span className="text-sm text-gray-500">Order ID:</span>
                            <span className="ml-2 text-primary font-medium">{order.id}</span>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Date:</span>
                            <span className="ml-2">{order.date}</span>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Status:</span>
                            <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">{order.status}</span>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Total:</span>
                            <span className="ml-2 font-medium">{formatPrice(order.total)}</span>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center py-2">
                              <div className="h-16 w-16 relative flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                                <Image 
                                  src={item.image} 
                                  alt={item.name} 
                                  fill 
                                  className="object-cover" 
                                />
                              </div>
                              <div className="ml-4 flex-grow">
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-gold-primary font-medium">{formatPrice(item.price)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="bg-gray-50 p-4 text-right">
                          <Link 
                            href={`/orders/${order.id}`}
                            className="text-gold-primary hover:text-gold-dark text-sm font-medium"
                          >
                            View Order Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p className="text-gray-500">You haven&apos;t placed any orders yet.</p>
                    <Link 
                      href="/shop"
                      className="mt-4 inline-block px-4 py-2 bg-gold-primary hover:bg-gold-dark text-white rounded transition-colors text-sm font-medium"
                    >
                      Start Shopping
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            {/* Wishlist */}
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Wishlist
                </h2>
                
                {wishlistItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wishlistItems.map((item) => (
                      <div key={item.id} className="border rounded-lg overflow-hidden p-4 flex">
                        <div className="h-24 w-24 relative flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            fill 
                            className="object-cover" 
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-gray-500 text-sm">{item.category}</p>
                              <p className="text-gold-primary font-medium mt-1">{formatPrice(item.price)}</p>
                            </div>
                            <button 
                              className="text-gray-400 hover:text-red-500"
                              aria-label="Remove from wishlist"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <Link 
                              href={`/product/${item.id}`} 
                              className="text-gold-primary hover:text-gold-dark text-sm font-medium"
                            >
                              View Details
                            </Link>
                            <button 
                              onClick={() => handleAddToCart(item)}
                              className="px-3 py-1 bg-secondary hover:bg-secondary-dark text-white text-sm rounded transition-colors"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <p className="text-gray-500">Your wishlist is empty.</p>
                    <Link 
                      href="/shop"
                      className="mt-4 inline-block px-4 py-2 bg-gold-primary hover:bg-gold-dark text-white rounded transition-colors text-sm font-medium"
                    >
                      Browse Products
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            {/* Account Settings */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  </svg>
                  Account Settings
                </h2>
                
                <div className="border-b pb-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input 
                        type="text" 
                        defaultValue="John" 
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input 
                        type="text" 
                        defaultValue="Doe" 
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        defaultValue="john.doe@example.com" 
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        defaultValue="+1 (555) 123-4567" 
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold-primary"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="px-4 py-2 bg-gold-primary hover:bg-gold-dark text-white rounded transition-colors">
                      Update Information
                    </button>
                  </div>
                </div>
                
                <div className="border-b pb-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <input 
                        type="password" 
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <input 
                        type="password" 
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <input 
                        type="password" 
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold-primary"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="px-4 py-2 bg-gold-primary hover:bg-gold-dark text-white rounded transition-colors">
                      Change Password
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="email-order-updates" 
                        defaultChecked 
                        className="h-4 w-4 text-gold-primary focus:ring-gold-primary border-gray-300 rounded"
                      />
                      <label htmlFor="email-order-updates" className="ml-2 block text-sm text-gray-700">
                        Email me about order updates
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="email-promotions" 
                        defaultChecked 
                        className="h-4 w-4 text-gold-primary focus:ring-gold-primary border-gray-300 rounded"
                      />
                      <label htmlFor="email-promotions" className="ml-2 block text-sm text-gray-700">
                        Email me about promotions and new arrivals
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="sms-updates" 
                        className="h-4 w-4 text-gold-primary focus:ring-gold-primary border-gray-300 rounded"
                      />
                      <label htmlFor="sms-updates" className="ml-2 block text-sm text-gray-700">
                        Send me SMS updates
                      </label>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="px-4 py-2 bg-gold-primary hover:bg-gold-dark text-white rounded transition-colors">
                      Update Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Logout - we just show a confirmation dialog here */}
            {activeTab === 'logout' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-center py-8">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <h3 className="text-xl font-bold mb-2">Are you sure you want to logout?</h3>
                  <p className="text-gray-500 mb-6">You will be returned to the login screen.</p>
                  <div className="flex justify-center space-x-4">
                    <button 
                      onClick={() => setActiveTab('dashboard')}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition-colors"
                    >
                      Cancel
                    </button>
                    <Link
                      href="/login"
                      className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded transition-colors"
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
