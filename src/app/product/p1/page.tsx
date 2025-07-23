'use client';
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";

const product = {
  id: "p1",
  name: "Natural Ruby Gemstone",
  category: "Gemstones",
  price: 2499.99,
  description: "A rare, natural ruby gemstone with vibrant color and clarity.",
  images: [
    "https://images.pexels.com/photos/3685523/pexels-photo-3685523.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1457801/pexels-photo-1457801.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/331958/pexels-photo-331958.jpeg?auto=compress&cs=tinysrgb&w=600",
  ],
  video: "https://www.youtube.com/embed/PtBYBrVye4w?list=RDoFNS7B21LAA&autoplay=1&mute=1&loop=1&playlist=PtBYBrVye4w",
  certificateImage: "https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg?auto=compress&cs=tinysrgb&w=600",
};

// Sample similar products (could be fetched from /shop or imported from data)
const similarProducts = [
  {
    id: 'p2',
    name: 'Blue Sapphire Ring',
    image: 'https://images.pexels.com/photos/331958/pexels-photo-331958.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 3299.99,
  },
  {
    id: 'p3',
    name: 'Emerald Gold Necklace',
    image: 'https://images.pexels.com/photos/11706768/pexels-photo-11706768.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 4999.99,
  },
  {
    id: 'p4',
    name: 'Diamond Solitaire',
    image: 'https://images.pexels.com/photos/11706768/pexels-photo-11706768.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 7999.99,
  },
];

export default function ProductView() {
  const [activeIndex, setActiveIndex] = useState(0);
  const addToCart = useCartStore((state) => state.addToCart);

  // Extract YouTube video ID for thumbnail
  const youtubeId = "PtBYBrVye4w";
  const videoThumbnail = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
      quantity: 1,
    });
  };

  return (
    <main className="min-h-screen w-full bg-[#f9f8f6] text-[#222] font-light">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Media Gallery + Similar Products */}
          <div className="relative">
            <div className="relative aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden shadow-xl border border-[#e5e1d8] bg-white flex items-center justify-center">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full flex items-center justify-center"
              >
                {activeIndex < product.images.length ? (
                  <Image
                    src={product.images[activeIndex]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <iframe
                    src={product.video}
                    title="Product Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full object-cover rounded-[2.5rem] border-none"
                  />
                )}
              </motion.div>
            </div>
            {/* Thumbnails */}
            <div className="flex gap-4 mt-8 justify-center">
              {product.images.map((img, idx) => (
                <button
                  key={img}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-20 h-20 rounded-xl border-2 transition-all duration-300 overflow-hidden relative shadow-sm ${
                    activeIndex === idx
                      ? "border-[var(--gold-primary)] ring-2 ring-[var(--gold-primary)]"
                      : "border-gray-300"
                  }`}
                  aria-label={`Show image ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
              {/* YouTube video thumbnail */}
              <button
                onClick={() => setActiveIndex(product.images.length)}
                className={`w-20 h-20 rounded-xl border-2 transition-all duration-300 overflow-hidden relative flex items-center justify-center shadow-sm ${
                  activeIndex === product.images.length
                    ? "border-[var(--gold-primary)] ring-2 ring-[var(--gold-primary)]"
                    : "border-gray-300"
                }`}
                aria-label="Show product video"
              >
                <Image
                  src={videoThumbnail}
                  alt="Video thumbnail"
                  fill
                  className="object-cover"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white drop-shadow-lg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="12" fill="rgba(0,0,0,0.45)" />
                    <polygon points="10,8 16,12 10,16" fill="#fff" />
                  </svg>
                </span>
              </button>
            </div>
            {/* Similar Products Block (after images & video thumbnails) */}
            <div className="mt-10 w-full">
              <div className="bg-white/90 rounded-2xl shadow-lg border border-[#e5e1d8] p-4">
                <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--gold-primary)" }}>
                  Similar Products
                </h3>
                <div className="space-y-4">
                  {similarProducts.map((item) => (
                    <Link
                      key={item.id}
                      href={`/product/${item.id}`}
                      className="flex items-center gap-3 group hover:bg-gold-primary/10 rounded-lg p-2 transition"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 relative">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 group-hover:text-gold-primary transition-colors text-sm">
                          {item.name}
                        </div>
                        <div className="text-xs text-gray-500">${item.price.toLocaleString()}</div>
                      </div>
                    </Link>
                  ))}
                  <Link
                    href="/shop"
                    className="block mt-4 text-xs font-medium text-[var(--gold-primary)] hover:underline text-center"
                  >
                    View All Products
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="bg-white/90 rounded-[2.5rem] shadow-xl border border-[#e5e1d8] p-12 flex flex-col gap-8"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-display mb-2 text-[#222] tracking-tight">
                {product.name}
              </h1>
              <span className="font-medium uppercase tracking-widest text-sm" style={{ color: "var(--gold-primary)" }}>
                {product.category}
              </span>
            </div>
            <p className="mt-2 text-lg text-gray-600 leading-relaxed">
              {product.description}
            </p>
            {/* Gemstone Certificate Section */}
            <div className="mt-4 bg-[#f9f7f3] border rounded-xl p-5 flex items-center gap-4 shadow-sm" style={{ borderColor: "var(--gold-primary)" }}>
              <Image
                src={product.certificateImage}
                alt="Gemstone Certificate"
                width={80}
                height={80}
                className="rounded-lg object-cover border border-gray-200"
              />
              <div>
                <div className="font-semibold text-base mb-1" style={{ color: "var(--gold-primary)" }}>
                  Gemstone Verification Certificate
                </div>
                <div className="text-gray-700 text-sm">
                  This gemstone is certified for authenticity and quality by an
                  independent gemological laboratory.
                </div>
                <a
                  href="https://www.gia.edu/report-check"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-xs text-blue-700 hover:underline font-medium"
                >
                  View Certificate Details
                </a>
              </div>
            </div>
            <div className="mt-4 text-3xl font-extrabold" style={{ color: "var(--gold-primary)" }}>
              ${product.price.toLocaleString()}
            </div>
            <motion.button
              className="mt-6 px-10 py-4 text-white rounded-full font-semibold tracking-wide text-lg transition-all duration-300 shadow-lg hover:shadow-2xl"
              style={{ background: "var(--gold-primary)" }}
              onClick={handleAddToCart}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Add to Cart
            </motion.button>
            {/* Item Story Section */}
            <div className="mt-8 bg-white border-l-4 rounded-xl p-6 shadow-sm" style={{ borderLeftColor: "var(--gold-primary)" }}>
              <div className="font-semibold mb-2 text-lg" style={{ color: "var(--gold-primary)" }}>
                The Story Behind This Ruby
              </div>
              <p className="text-gray-700 text-base leading-relaxed">
                Discovered deep within the legendary Mogok Valley, this ruby was
                unearthed by local miners who have passed down their craft for
                generations. Its vibrant hue and clarity are a testament to the
                rare geological conditions of the region. For decades, it remained
                part of a private collection, admired for its natural beauty and
                storied past. Now, this remarkable gemstone is ready to begin a
                new chapter with its next fortunate owner.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
