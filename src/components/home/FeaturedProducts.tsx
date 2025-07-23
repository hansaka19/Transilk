import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
}

const featuredProducts: Product[] = [
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

const FeaturedProducts = () => {
  return (
    <section className="py-28 relative bg-white overflow-hidden">
      <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-gold-primary/10 blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-gold-primary/10 blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-20">
          <span className="text-gold-primary text-sm font-semibold tracking-wider uppercase">Exquisite Picks</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-4">Our Featured Collection</h2>
          <p className="text-gray-600 max-w-xl mx-auto">Elegantly selected gems and jewelry that tell a story of unmatched beauty and craftsmanship.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-3 left-3 text-white font-semibold text-sm bg-black/50 px-3 py-1 rounded-sm">
                  ${product.price.toLocaleString()}
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs uppercase tracking-wide text-gold-primary font-semibold">{product.category}</span>
                <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-1 group-hover:text-gold-primary transition-colors">
                  <Link href={`/product/${product.id}`}>{product.name}</Link>
                </h3>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">Rating: {product.rating}</div>
                  <Link
                    href={`/product/${product.id}`}
                    className="text-sm text-gold-primary hover:text-gold-dark transition-colors"
                  >
                    View More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <Link
            href="/shop"
            className="inline-block px-8 py-3 bg-gold-primary hover:bg-gold-dark text-white rounded-full transition-colors text-lg font-semibold"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
