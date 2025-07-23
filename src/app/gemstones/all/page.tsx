'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const gemstones = [
  {
    id: 'd1',
    name: 'Brilliant Cut Diamond',
    category: 'Diamonds',
    image: 'https://images.pexels.com/photos/5370706/pexels-photo-5370706.jpeg?auto=compress&cs=tinysrgb&w=600',
    carat: 2.1,
    price: 12000,
  },
  {
    id: 'r1',
    name: 'Pigeon Blood Ruby',
    category: 'Rubies',
    image: 'https://images.pexels.com/photos/4940755/pexels-photo-4940755.jpeg?auto=compress&cs=tinysrgb&w=600',
    carat: 1.8,
    price: 9500,
  },
  {
    id: 's1',
    name: 'Royal Blue Sapphire',
    category: 'Sapphires',
    image: 'https://images.pexels.com/photos/5801628/pexels-photo-5801628.jpeg?auto=compress&cs=tinysrgb&w=600',
    carat: 3.2,
    price: 11000,
  },
  {
    id: 'e1',
    name: 'Colombian Emerald',
    category: 'Emeralds',
    image: 'https://images.pexels.com/photos/4940756/pexels-photo-4940756.jpeg?auto=compress&cs=tinysrgb&w=600',
    carat: 2.5,
    price: 10500,
  },
];

const categories = ['All', ...Array.from(new Set(gemstones.map((g) => g.category)))];

interface Gemstone {
  id: string;
  name: string;
  category: string;
  image: string;
  carat: number;
  price: number;
}

const formatPrice = (price: number): string =>
  `$${price.toLocaleString(undefined, { minimumFractionDigits: 0 })}`;

export default function AllGemstonesPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minCarat, setMinCarat] = useState('');
  const [maxCarat, setMaxCarat] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Set initial category from URL param
  useEffect(() => {
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const filteredGemstones = gemstones.filter((g) => {
    const matchCategory = selectedCategory === 'All' || g.category === selectedCategory;
    const matchCarat =
      (!minCarat || g.carat >= parseFloat(minCarat)) &&
      (!maxCarat || g.carat <= parseFloat(maxCarat));
    const matchPrice =
      (!minPrice || g.price >= parseFloat(minPrice)) &&
      (!maxPrice || g.price <= parseFloat(maxPrice));
    return matchCategory && matchCarat && matchPrice;
  });

  return (
    <main className="pt-24 pb-0 bg-[#f9f8f6] text-[#2a2a2a] font-light min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative h-[40vh] w-full flex items-center justify-center bg-[#f9f8f6] mb-12"
      >
        <Image
          src="https://images.pexels.com/photos/5801628/pexels-photo-5801628.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
          alt="All Gemstones"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-2 drop-shadow-lg">All Gemstones</h1>
          <p className="text-white/90 max-w-2xl mx-auto text-lg">
            Discover our full collection of rare, natural gemstones — diamonds, rubies, sapphires, emeralds, and more.
          </p>
        </div>
      </motion.section>

      {/* Filters Section */}
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
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-500">Carat</label>
              <input
                type="number"
                placeholder="Min"
                value={minCarat}
                onChange={(e) => setMinCarat(e.target.value)}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
              />
              <span className="text-gray-400">–</span>
              <input
                type="number"
                placeholder="Max"
                value={maxCarat}
                onChange={(e) => setMaxCarat(e.target.value)}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-500">Price</label>
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
              />
              <span className="text-gray-400">–</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setMinCarat('');
                setMaxCarat('');
                setMinPrice('');
                setMaxPrice('');
              }}
              className="text-sm text-gray-600 hover:underline"
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-20 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {filteredGemstones.map((gem) => (
            <motion.div
              key={gem.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-gray-200 hover:shadow-md transition-shadow rounded-lg p-4"
            >
              <div className="relative w-full h-52 mb-4 overflow-hidden rounded">
                <Image src={gem.image} alt={gem.name} fill className="object-cover" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-500 uppercase">{gem.category}</span>
                <h3 className="text-base font-medium text-gray-800">{gem.name}</h3>
                <p className="text-sm text-gray-500">{gem.carat} ct</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-base font-semibold text-black">{formatPrice(gem.price)}</span>
                  <Link href={`/product/${gem.id}`} className="text-sm text-black hover:underline">
                    Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
          {filteredGemstones.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-12">
              No gemstones found in this category.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
