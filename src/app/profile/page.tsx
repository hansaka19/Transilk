'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

const formatPrice = (price: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

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
        quantity: 1,
      },
    ],
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
        quantity: 1,
      },
    ],
  },
];

interface WishlistItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
}

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
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showEditModal, setShowEditModal] = useState(false);
  const { addToCart, cartItems } = useCartStore(); // <-- get cartItems from store

  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
  });

  const [profileImage, setProfileImage] = useState("https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddToCart = (item: WishlistItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      category: item.category,
    });
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowEditModal(false);
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) setProfileImage(ev.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Order count stays the same
  function getOrderCount() {
    return orderHistory.length;
  }

  // Wishlist count is now cart item count
  function getWishlistCount() {
    return cartItems.length;
  }

  return (
    <main className="bg-[#f9f8f6] min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="relative h-[35vh] flex items-center justify-center overflow-hidden bg-[#f9f8f6] mb-12">
        <Image
          src={profileImage}
          alt="Profile Banner"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center w-full">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-2 drop-shadow-lg">
            My Profile
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto text-lg">
            Manage your account, orders, and wishlist.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar */}
          <aside className="w-full md:w-1/4 mb-10 md:mb-0">
            <div className="bg-white rounded-2xl shadow p-6 sticky top-32">
              <div className="flex flex-col items-center mb-8">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-gold-primary mb-3 group">
                  <Image
                    src={profileImage}
                    alt="Profile picture"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                    onClick={() => fileInputRef.current?.click()}
                    aria-label="Change profile image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m-2 2h6" />
                    </svg>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-semibold">{profile.firstName} {profile.lastName}</h2>
                  <p className="text-gray-500 text-sm">{profile.email}</p>
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="mt-3 px-4 py-2 bg-gold-primary hover:bg-gold-dark text-white rounded transition-colors text-sm font-medium"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
              <nav className="flex flex-col gap-2">
                {[
                  {
                    id: 'dashboard',
                    label: 'Dashboard',
                  },
                  {
                    id: 'orders',
                    label: 'Order History',
                  },
                  {
                    id: 'wishlist',
                    label: 'Wishlist',
                  },
                  {
                    id: 'settings',
                    label: 'Account Settings',
                  },
                  {
                    id: 'logout',
                    label: 'Logout',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-3 py-2 rounded transition-colors ${
                      activeTab === item.id
                        ? 'bg-gold-primary text-white font-semibold'
                        : 'hover:bg-gold-primary/10'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Dashboard */}
            {activeTab === 'dashboard' && (
              <div className="bg-white rounded-2xl shadow p-8">
                <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gold-primary/10 rounded-lg p-6 text-center">
                    <div className="text-gold-primary text-3xl font-bold mb-2">{getOrderCount()}</div>
                    <div className="text-gray-700">Orders</div>
                  </div>
                  <div className="bg-accent-sapphire/10 rounded-lg p-6 text-center">
                    <div className="text-accent-sapphire text-3xl font-bold mb-2">{getWishlistCount()}</div>
                    <div className="text-gray-700">Wishlist</div>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-6 text-center">
                    <div className="text-primary text-3xl font-bold mb-2">1,250</div>
                    <div className="text-gray-700">Loyalty Points</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Recent Order</h3>
                  {orderHistory.length > 0 ? (
                    <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
                      <div className="h-16 w-16 relative flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                        <Image
                          src={orderHistory[0].items[0].image}
                          alt={orderHistory[0].items[0].name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{orderHistory[0].items[0].name}</h4>
                        <p className="text-gray-500 text-sm">Quantity: {orderHistory[0].items[0].quantity}</p>
                        <p className="text-gold-primary font-medium">{formatPrice(orderHistory[0].items[0].price)}</p>
                      </div>
                      <div className="ml-auto text-right">
                        <button
                          type="button"
                          onClick={() => setActiveTab('orders')}
                          className="text-gold-primary hover:text-gold-dark text-sm font-medium"
                        >
                          View All Orders
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">No recent orders.</p>
                  )}
                </div>
              </div>
            )}

            {/* Order History */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl shadow p-8">
                <h2 className="text-2xl font-semibold mb-6">Order History</h2>
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
                            href={order.id === 'ORD-2023-1012' ? '/product/p1' : `/orders/${order.id}`}
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
                    <p className="text-gray-500">You haven't placed any orders yet.</p>
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
              <div className="bg-white rounded-2xl shadow p-8">
                <h2 className="text-2xl font-semibold mb-6">Wishlist</h2>
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
              <div className="bg-white rounded-2xl shadow p-8">
                <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleProfileChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleProfileChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={profile.phone}
                        onChange={handleProfileChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold-primary"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gold-primary hover:bg-gold-dark text-white rounded transition-colors"
                    >
                      Update Information
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Logout */}
            {activeTab === 'logout' && (
              <div className="bg-white rounded-2xl shadow p-8 text-center">
                <h2 className="text-2xl font-semibold mb-4">Logout</h2>
                <p className="text-gray-500 mb-6">Are you sure you want to logout?</p>
                <div className="flex justify-center gap-4">
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
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              onClick={() => setShowEditModal(false)}
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="flex flex-col items-center">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-gold-primary mb-3 group">
                  <Image
                    src={profileImage}
                    alt="Profile picture"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                    onClick={() => fileInputRef.current?.click()}
                    aria-label="Change profile image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m-2 2h6" />
                    </svg>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleProfileChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleProfileChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold-primary"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold-primary"
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-gold-primary hover:bg-gold-dark text-white rounded transition-colors font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}