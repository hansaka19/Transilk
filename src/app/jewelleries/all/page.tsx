'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const jewelleries = [
  {
    id: 'r1',
    name: 'Classic Ruby Ring',
    category: 'Rings',
    image: 'https://images.pexels.com/photos/1457801/pexels-photo-1457801.jpeg?auto=compress&cs=tinysrgb&w=600',
    material: '18K Gold',
    price: 3200,
  },
  {
    id: 'n1',
    name: 'Emerald Drop Necklace',
    category: 'Necklaces',
    image: 'https://images.pexels.com/photos/1616096/pexels-photo-1616096.jpeg?auto=compress&cs=tinysrgb&w=600',
    material: 'White Gold',
    price: 4100,
  },
  {
    id: 'e1',
    name: 'Diamond Stud Earrings',
    category: 'Earrings',
    image: 'https://images.pexels.com/photos/10874827/pexels-photo-10874827.jpeg?auto=compress&cs=tinysrgb&w=600',
    material: 'Platinum',
    price: 2700,
  },
  {
    id: 'b1',
    name: 'Sapphire Tennis Bracelet',
    category: 'Bracelets',
    image: 'https://images.pexels.com/photos/12456282/pexels-photo-12456282.jpeg?auto=compress&cs=tinysrgb&w=600',
    material: '18K White Gold',
    price: 3900,
  },
  {
    id: 'r2',
    name: 'Vintage Diamond Ring',
    category: 'Rings',
    image: 'https://images.pexels.com/photos/11706768/pexels-photo-11706768.jpeg?auto=compress&cs=tinysrgb&w=600',
    material: 'Rose Gold',
    price: 3500,
  },
  {
    id: 'n2',
    name: 'Pearl Pendant Necklace',
    category: 'Necklaces',
    image: 'https://images.pexels.com/photos/11706768/pexels-photo-11706768.jpeg?auto=compress&cs=tinysrgb&w=600',
    material: 'Sterling Silver',
    price: 2100,
  },
  {
    id: 'e2',
    name: 'Ruby Drop Earrings',
    category: 'Earrings',
    image: 'https://images.pexels.com/photos/1457801/pexels-photo-1457801.jpeg?auto=compress&cs=tinysrgb&w=600',
    material: '18K Gold',
    price: 2500,
  },
  {
    id: 'b2',
    name: 'Emerald Bangle',
    category: 'Bracelets',
    image: 'https://images.pexels.com/photos/12456282/pexels-photo-12456282.jpeg?auto=compress&cs=tinysrgb&w=600',
    material: 'Yellow Gold',
    price: 3300,
  },
];

const categories = ['All', ...Array.from(new Set(jewelleries.map((j) => j.category)))];

const formatPrice = (price: number) => `$${price.toLocaleString(undefined, { minimumFractionDigits: 0 })}`;

export default function AllJewelleriesPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const filteredJewelleries = jewelleries.filter((j) => {
    const matchCategory = selectedCategory === 'All' || j.category === selectedCategory;
    const matchPrice = (!minPrice || j.price >= parseFloat(minPrice)) && (!maxPrice || j.price <= parseFloat(maxPrice));
    const matchSearch = !search || j.name.toLowerCase().includes(search.toLowerCase()) || j.material.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchPrice && matchSearch;
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
          src="https://images.pexels.com/photos/10874827/pexels-photo-10874827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
          alt="All Jewelleries"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-2 drop-shadow-lg">All Jewellery</h1>
          <p className="text-white/90 max-w-2xl mx-auto text-lg">
            Explore exquisite handmade rings, necklaces, earrings, and bracelets crafted from the finest materials.
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
            <input
              type="text"
              placeholder="Search by name or material"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded text-sm"
            />

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
                setSearch('');
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
          {filteredJewelleries.map((jew) => (
            <motion.div
              key={jew.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-gray-200 hover:shadow-md transition-shadow rounded-lg p-4"
            >
              <div className="relative w-full h-52 mb-4 overflow-hidden rounded">
                <Image src={jew.image} alt={jew.name} fill className="object-cover" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-500 uppercase">{jew.category}</span>
                <h3 className="text-base font-medium text-gray-800">{jew.name}</h3>
                <p className="text-sm text-gray-500">{jew.material}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-base font-semibold text-black">{formatPrice(jew.price)}</span>
                  <Link href={`/product/${jew.id}`} className="text-sm text-black hover:underline">
                    Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
          {filteredJewelleries.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-12">
              No jewellery found in this category.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
