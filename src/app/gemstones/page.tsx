"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const categories = [
	{
		name: 'Diamonds',
		image: 'https://images.pexels.com/photos/5370706/pexels-photo-5370706.jpeg?auto=compress&cs=tinysrgb&w=600',
		count: 32,
	},
	{
		name: 'Rubies',
		image: 'https://images.pexels.com/photos/4940755/pexels-photo-4940755.jpeg?auto=compress&cs=tinysrgb&w=600',
		count: 24,
	},
	{
		name: 'Sapphires',
		image: 'https://images.pexels.com/photos/5801628/pexels-photo-5801628.jpeg?auto=compress&cs=tinysrgb&w=600',
		count: 28,
	},
	{
		name: 'Emeralds',
		image: 'https://images.pexels.com/photos/4940756/pexels-photo-4940756.jpeg?auto=compress&cs=tinysrgb&w=600',
		count: 22,
	},
];

export default function GemstonesPage() {
	const router = useRouter();
	const [banner, setBanner] = useState<{ image?: string; alt?: string } | null>(null);

	useEffect(() => {
		let mounted = true;
		(async () => {
			try {
				const res = await fetch('/api/admin/banners');
				if (!res.ok) throw new Error('no api');
				const j = await res.json();
				if (!mounted) return;
				const arr = Array.isArray(j.data) ? j.data : [];
				const match = arr.find((b: any) => b.page === 'Gemstones');
				if (match) setBanner({ image: match.image, alt: match.alt });
			} catch (e) {
				try { const raw = localStorage.getItem('admin_banners_v1'); if (raw) {
					const arr = JSON.parse(raw); const match = arr.find((b: any) => b.page === 'Gemstones'); if (match) setBanner({ image: match.image, alt: match.alt });
				} } catch {}
			}
		})();
		return () => { mounted = false; };
	}, []);

	const handleViewCategory = (categoryName: string) => {
		const param = encodeURIComponent(categoryName);
		router.push(`/gemstones/all?category=${param}`);
	};

	return (
		<main className="pt-24 pb-0 bg-[#f9f8f6] text-[#2a2a2a] font-light">
			{/* Hero Banner */}
					<motion.section
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7 }}
						className="relative h-[75vh] w-full flex items-center justify-center bg-[#f9f8f6]"
					>
						<Image
							src={banner?.image || 'https://images.pexels.com/photos/5801628/pexels-photo-5801628.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'}
							alt={banner?.alt || 'Hero'}
							fill
							className="object-cover opacity-30"
							priority
						/>
				<div className="relative z-10 text-center px-6">
					<h1 className="text-5xl md:text-6xl font-light leading-tight">
						Pure. Precious. <br /> Naturally Yours.
					</h1>
					<p className="mt-6 text-lg md:text-xl text-[#444] max-w-2xl mx-auto">
						A celebration of the rarest Sri Lankan gemstones — ethically sourced, elegantly curated.
					</p>
				</div>
			</motion.section>

			{/* Introduction Text */}
			<section className="px-6 md:px-20 py-24 bg-white">
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="max-w-4xl mx-auto text-center"
				>
					<h2 className="text-4xl font-light mb-6">Crafted by Nature, Honored by Us</h2>
					<p className="text-lg text-[#555] leading-relaxed">
						At Transilk, we honor the earth’s most exquisite creations. Each gemstone we present tells a story
						— of pressure, time, and unparalleled brilliance. Our mission is to bring these stories to life in
						the most respectful and refined way.
					</p>
				</motion.div>
				<div className="mt-12 flex justify-center">
					<Link
						href="/gemstones/all"
						className="px-8 py-3 bg-gold-primary hover:bg-gold-dark text-white rounded transition-colors text-lg font-medium shadow"
					>
						View All Gemstones
					</Link>
				</div>
			</section>

			{/* Alternating Image + Text Sections for Categories */}
			{categories.map((category, i) => (
				<section
					key={category.name}
					className={`py-20 px-6 md:px-20 ${i % 2 === 0 ? 'bg-[#f9f8f6]' : 'bg-white'}`}
				>
					<div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center justify-between">
						<motion.div
							initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.7 }}
							className={`w-full md:w-1/2 ${i % 2 !== 0 ? 'order-2 md:order-1' : ''}`}
						>
							<Image
								src={category.image}
								alt={category.name}
								width={600}
								height={400}
								className="rounded-2xl shadow-md"
							/>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.1 }}
							className="w-full md:w-1/2"
						>
							<h3 className="text-3xl font-light mb-4">{category.name}</h3>
							<p className="text-[#555] text-lg leading-relaxed mb-4">
								Explore our {category.name.toLowerCase()} collection — {category.count} uniquely radiant stones sourced for clarity and prestige.
							</p>
							<button
								type="button"
								onClick={() => handleViewCategory(category.name)}
								className="inline-block mt-4 text-gold-primary font-medium hover:underline"
							>
								View {category.name}
							</button>
						</motion.div>
					</div>
				</section>
			))}

			{/* Final Call to Action Section */}
			<section className="bg-white px-6 md:px-20 py-24 text-center">
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="max-w-4xl mx-auto"
				>
					<h2 className="text-4xl font-light mb-4">Begin Your Journey</h2>
					<p className="text-lg text-[#555] mb-8">
						Connect with the beauty of our earth’s most timeless treasures. Browse the full collection or speak
						with a specialist to discover your perfect match.
					</p>
					<Link
						href="/contact"
						className="px-6 py-3 bg-gold-primary text-white text-lg rounded hover:bg-gold-dark transition"
					>
						Contact Us
					</Link>
				</motion.div>
			</section>
		</main>
	);
}
