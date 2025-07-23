'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

// Sample data for demonstration
const auctions = [
  {
    id: 'a1',
    name: 'Natural Unheated Burmese Ruby',
    carat: 3.21,
    category: 'Ruby',
    description: 'A stunning natural Burmese ruby with exceptional clarity and vibrant color.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    currentBid: 12000,
    bids: 2,
    endTime: '2025-08-01T12:00:00Z',
    reserve: false,
    winner: 'Taddeo 🇺🇸',
  },
  {
    id: 'a2',
    name: 'Sri Lankan Blue Sapphire',
    carat: 5.5,
    category: 'Sapphire',
    description: 'Deep blue sapphire from Sri Lanka, prized for its clarity and hue.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    currentBid: 9500,
    bids: 5,
    endTime: '2025-08-02T15:00:00Z',
    reserve: true,
    winner: 'Maria 🇬🇧',
  },
  {
    id: 'a3',
    name: 'Colombian Emerald',
    carat: 4,
    category: 'Emerald',
    description: 'Classic Colombian emerald, vivid green, minor oil.',
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=800&q=80',
    currentBid: 13500,
    bids: 3,
    endTime: '2025-08-03T18:00:00Z',
    reserve: false,
    winner: 'Akira 🇯🇵',
  },
];

function formatPrice(price: number) {
  return `$${price.toLocaleString(undefined, { minimumFractionDigits: 0 })}`;
}

function getTimeLeft(endTime: string): string {
  const end = new Date(endTime).getTime();
  const now = Date.now();
  const diff = Math.max(0, end - now);
  const mins = Math.floor(diff / 60000) % 60;
  const hours = Math.floor(diff / 3600000) % 24;
  const days = Math.floor(diff / 86400000);
  if (diff <= 0) return 'Ended';
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}

// Simulate bid placing (reference: https://www.bids.com/ bidding logic)
function placeBid(auctionId: string, amount: number) {
  // In production, call API and update state
  alert(`Bid of $${amount} placed on auction ${auctionId}!`);
}

export default function AuctionsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(auctions.map(a => a.category)))];

  const filteredAuctions = auctions.filter((a) => {
    const matchCategory = selectedCategory === 'All' || a.category === selectedCategory;
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <main className="min-h-screen bg-[#f9f8f6] text-[#222] font-light pt-24">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative h-[45vh] w-full flex items-center justify-center bg-[#f9f8f6] mb-10"
      >
        <Image
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1260&q=80"
          alt="Auction Hero"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-2 drop-shadow-lg">
            Auctions
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto text-lg">
            Discover and bid on rare gemstones and jewelry. Every auction is a chance to own a masterpiece.
          </p>
        </div>
      </motion.section>

      {/* Filters */}
      <section className="w-full bg-white px-6 md:px-20 py-8 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-sm rounded-full border transition ${
                  selectedCategory === cat
                    ? 'bg-black text-white border-black'
                    : 'border-gray-300 text-gray-700 hover:border-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex gap-4 flex-wrap">
            <input
              type="text"
              placeholder="Search auctions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded text-sm"
            />
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setSelectedCategory('All');
              }}
              className="text-sm text-gray-600 hover:underline"
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      {/* Auction Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-20 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredAuctions.map((auction) => (
            <motion.div
              key={auction.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-gray-200 hover:shadow-lg transition-shadow rounded-xl p-0 flex flex-col group"
              style={{
                boxShadow: '0 4px 32px 0 rgba(191,155,48,0.08), 0 1.5px 4px 0 rgba(0,0,0,0.03)',
                borderRadius: '2rem',
              }}
            >
              {/* Image */}
              <div className="relative w-full h-64 overflow-hidden rounded-t-2xl">
                <Image src={auction.image} alt={auction.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 flex gap-2">
                  {!auction.reserve && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">NO RESERVE</span>
                  )}
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">HIGHEST BID WINS</span>
                </div>
                <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {getTimeLeft(auction.endTime)} left
                </div>
              </div>
              {/* Info */}
              <div className="flex flex-col gap-2 p-6 flex-1">
                <span className="text-xs text-gray-500 uppercase">{auction.category}</span>
                <h3 className="text-lg font-semibold text-gray-900">{auction.name}</h3>
                {/* Explore More by Category Button */}
                {auction.category === 'Ruby' && (
                  <Link
                    href="/gemstones"
                    className="inline-block mb-2 px-4 py-1 bg-gold-primary hover:bg-gold-dark text-white rounded-full font-medium text-xs transition"
                  >
                    Explore More Gemstones
                  </Link>
                )}
                {auction.category === 'Sapphire' && (
                  <Link
                    href="/gemstones"
                    className="inline-block mb-2 px-4 py-1 bg-gold-primary hover:bg-gold-dark text-white rounded-full font-medium text-xs transition"
                  >
                    Explore More Gemstones
                  </Link>
                )}
                {auction.category === 'Emerald' && (
                  <Link
                    href="/gemstones"
                    className="inline-block mb-2 px-4 py-1 bg-gold-primary hover:bg-gold-dark text-white rounded-full font-medium text-xs transition"
                  >
                    Explore More Gemstones
                  </Link>
                )}
                {auction.category === 'Jewelry' && (
                  <Link
                    href="/jewelleries"
                    className="inline-block mb-2 px-4 py-1 bg-gold-primary hover:bg-gold-dark text-white rounded-full font-medium text-xs transition"
                  >
                    Explore More Jewellery
                  </Link>
                )}
                <p className="text-xs text-gray-500 mb-2 line-clamp-2">{auction.description}</p>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-500 text-xs">Carat:</span>
                  <span className="font-medium">{auction.carat} ct</span>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-500 text-xs">Bids Placed:</span>
                  <span className="font-medium">{auction.bids}</span>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-500 text-xs">Winning Bidder:</span>
                  <span className="font-medium">{auction.winner}</span>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-500 text-xs">Current Bid:</span>
                  <span className="font-bold text-lg">{formatPrice(auction.currentBid)}</span>
                </div>
                <form
                  className="flex gap-2 mt-4"
                  onSubmit={e => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const input = form.elements.namedItem('bid') as HTMLInputElement;
                    const bidValue = Number(input.value);
                    if (bidValue > auction.currentBid) {
                      placeBid(auction.id, bidValue);
                      input.value = '';
                    } else {
                      alert('Bid must be higher than current bid.');
                    }
                  }}
                >
                  <input
                    type="number"
                    name="bid"
                    placeholder="Place your highest bid"
                    min={auction.currentBid + 1}
                    step={100}
                    className="flex-grow px-3 py-2 border rounded text-sm focus:outline-none focus:ring focus:border-blue-300"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition-all duration-200 shadow-md"
                  >
                    BID
                  </button>
                </form>
                {/* BID Button Section */}
                <section className="mt-4 flex justify-end">
                  <Link
                    href={`/auctions/${auction.id}/bid`}
                    className="inline-block px-6 py-2 bg-gold-primary hover:bg-gold-dark text-white text-sm font-semibold rounded-full shadow-lg transition-all duration-200"
                    style={{
                      letterSpacing: '0.05em',
                      boxShadow: '0 2px 12px 0 rgba(191,155,48,0.10)',
                    }}
                  >
                    Go to BID Page
                  </Link>
                </section>
                <div className="flex items-center justify-between mt-6">
                  <span className="text-xs text-gray-500">Sold by <span className="text-blue-600 font-medium">Transilk</span></span>
                  <Link
                    href={`/auctions/${auction.id}`}
                    className="text-xs text-blue-600 hover:underline font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
          {filteredAuctions.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-12">
              No auctions found in this category.
            </div>
          )}
        </div> {/* <-- closes the grid */}
      </section> {/* <-- closes the Auction Grid section */}
    </main>
  );
}