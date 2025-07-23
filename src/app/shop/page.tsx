'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '../../store/cartStore';
import { motion } from 'framer-motion';
import { useState } from 'react';

const products = [
	{
		id: 'p1',
		name: 'Natural Ruby Gemstone',
		category: 'Gemstones',
		price: 2499.99,
		image: 'https://images.pexels.com/photos/3685523/pexels-photo-3685523.jpeg?auto=compress&cs=tinysrgb&w=600',
		rating: 5,
	},
	{
		id: 'p2',
		name: 'Blue Sapphire Ring',
		category: 'Jewelry',
		price: 3299.99,
		image: 'https://images.pexels.com/photos/331958/pexels-photo-331958.jpeg?auto=compress&cs=tinysrgb&w=600',
		rating: 4.5,
	},
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

// Remove productCategories and use fixed categories for the navbar
const navCategories = [
	{ label: 'Gemstones', value: 'Gemstones' },
	{ label: 'Jewellery', value: 'Jewelry' },
	{ label: 'Auctions', value: 'Auctions' },
];

const formatPrice = (price: number) =>
	price.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });

export default function ShopPage() {
	const addToCart = useCartStore((state) => state.addToCart);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	// Filter products by fixed nav categories
	const filteredProducts = selectedCategory
		? products.filter((p) =>
				selectedCategory === 'Auctions'
					? false // Auctions are not in this shop list, but you can link to /auctions
					: p.category === selectedCategory
		  )
		: products;

	const handleAddToCart = (product: typeof products[0]) => {
		addToCart({
			id: product.id,
			name: product.name,
			price: product.price,
			image: product.image,
			category: product.category,
			quantity: 1,
		});
	};

	return (
		<main className="pt-24 pb-0 bg-[#f9f8f6] text-[#2a2a2a] font-light min-h-screen">
			{/* Hero Banner */}
			<motion.section
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7 }}
				className="relative h-[55vh] w-full flex items-center justify-center bg-[#f9f8f6]"
			>
				<Image
					src="https://images.pexels.com/photos/3685523/pexels-photo-3685523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
					alt="Shop Hero"
					fill
					className="object-cover opacity-30"
					priority
				/>
				<div className="relative z-10 text-center px-6">
					<h1 className="text-4xl md:text-5xl font-light leading-tight">
						Shop Our Collection
					</h1>
					<p className="mt-6 text-lg md:text-xl text-[#444] max-w-2xl mx-auto">
						Discover our curated selection of fine gemstones and jewelry, crafted
						for those who appreciate true beauty.
					</p>
				</div>
			</motion.section>

			{/* Category Navbar */}
			<nav className="w-full bg-white border-b border-gray-200 sticky top-[72px] z-30">
				<div className="max-w-6xl mx-auto px-4 flex gap-4 md:gap-8 py-4 justify-center">
					<button
						className={`px-5 py-2 rounded-full text-base font-medium transition-colors ${
							!selectedCategory
								? 'bg-gold-primary text-white'
								: 'hover:bg-gold-primary/10 text-gold-primary'
						}`}
						onClick={() => setSelectedCategory(null)}
					>
						All
					</button>
					{navCategories.map((cat) =>
						cat.value === 'Auctions' ? (
							<Link
								key={cat.value}
								href="/auctions"
								className="px-5 py-2 rounded-full text-base font-medium bg-white border border-gold-primary text-gold-primary hover:bg-gold-primary/10 transition-colors"
							>
								{cat.label}
							</Link>
						) : (
							<button
								key={cat.value}
								className={`px-5 py-2 rounded-full text-base font-medium transition-colors ${
									selectedCategory === cat.value
										? 'bg-gold-primary text-white'
										: 'hover:bg-gold-primary/10 text-gold-primary'
								}`}
								onClick={() => setSelectedCategory(cat.value)}
							>
								{cat.label}
							</button>
						)
					)}
				</div>
			</nav>

			{/* Product List */}
			<section className="px-6 md:px-20 py-24 bg-white">
				<div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
					{/* Remove old sidebar */}
					{/* Product Cards */}
					<div className="flex-1 w-full">
						<div className="mb-12 text-center">
							<h2 className="text-3xl font-light mb-4">Featured Products</h2>
							<p className="text-lg text-[#555] leading-relaxed max-w-2xl mx-auto">
								Each piece is hand-selected for its quality, uniqueness, and story.
								Find your next treasure below.
							</p>
						</div>
						<div className="flex flex-col gap-12">
							{filteredProducts.length === 0 && (
								<div className="text-center text-gray-400 py-16 text-xl">
									No products found in this category.
								</div>
							)}
							{filteredProducts.map((product, idx) => (
								<motion.div
									key={product.id}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, delay: idx * 0.1 }}
									className={`flex flex-col md:flex-row items-center gap-8 rounded-2xl shadow-md bg-[#f9f8f6] p-6 md:p-10 ${
										idx % 2 !== 0 ? 'md:flex-row-reverse' : ''
									}`}
								>
									<div className="w-full md:w-1/3 flex-shrink-0">
										<div className="relative aspect-square w-full h-64 md:h-56 rounded-xl overflow-hidden shadow">
											<Image
												src={product.image}
												alt={product.name}
												fill
												className="object-cover"
											/>
										</div>
									</div>
									<div className="w-full md:w-2/3">
										<div className="flex flex-col h-full justify-between">
											<div>
												<p className="text-xs uppercase tracking-wide text-gold-primary font-semibold mb-2">
													{product.category}
												</p>
												<h3 className="text-2xl font-light mb-2">
													{product.name}
												</h3>
												{/* Explore More by Category Button */}
												{product.category === 'Gemstones' && (
													<Link
														href="/gemstones"
														className="inline-block mb-2 px-5 py-2 bg-gold-primary hover:bg-gold-dark text-white rounded-full font-medium text-sm transition"
													>
														Explore More Gemstones
													</Link>
												)}
												{product.category === 'Jewelry' && (
													<Link
														href="/jewelleries"
														className="inline-block mb-2 px-5 py-2 bg-gold-primary hover:bg-gold-dark text-white rounded-full font-medium text-sm transition"
													>
														Explore More Jewellery
													</Link>
												)}
												{product.category === 'Diamonds' && (
													<Link
														href="/diamonds"
														className="inline-block mb-2 px-5 py-2 bg-gold-primary hover:bg-gold-dark text-white rounded-full font-medium text-sm transition"
													>
														Explore More Diamonds
													</Link>
												)}
												<p className="text-[#555] text-base mb-4">
													{/* Placeholder for product description */}
													Lorem ipsum dolor sit amet, consectetur adipiscing
													elit. Etiam euismod, urna eu tincidunt consectetur,
													nisi nisl aliquam enim.
												</p>
											</div>
											<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
												<span className="text-2xl font-semibold text-gold-primary">
													{formatPrice(product.price)}
												</span>
												<div className="flex gap-3">
													<button
														onClick={() => handleAddToCart(product)}
														className="px-6 py-2 bg-gold-primary hover:bg-gold-dark text-white rounded transition-colors text-base font-medium"
													>
														Add to Cart
													</button>
													<Link
														href={`/product/${product.id}`}
														className="px-6 py-2 border border-gold-primary text-gold-primary hover:bg-gold-primary hover:text-white rounded transition-colors text-base font-medium"
													>
														View Details
													</Link>
												</div>
											</div>
											<div className="mt-3 text-sm text-gray-500">
												Rating: {product.rating} / 5
											</div>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
