import Image from 'next/image';
import Link from 'next/link';

// Featured product type
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
}

// Sample products data
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

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      
      {hasHalfStar && (
        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path fill="url(#half-gradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
      
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-gold-primary/5 blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-gold-primary/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 relative">
          <span className="inline-block text-gold-primary font-medium mb-3">EXQUISITE COLLECTION</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Stones & Jewelry</h2>
          
          {/* Decorative line */}
          <div className="w-24 h-[2px] bg-gold-primary mx-auto mb-6"></div>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked collection of exquisite gemstones and finely crafted jewelry pieces 
            that showcase exceptional quality and extraordinary beauty.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group luxury-card rounded-lg overflow-hidden">
              <div className="relative overflow-hidden rounded-t-lg bg-gray-100 aspect-square">
                <div className="h-full w-full relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gold overlay on hover */}
                  <div className="absolute inset-0 bg-gold-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Price tag */}
                <div className="absolute bottom-3 left-3 bg-white/90 px-3 py-1 text-sm font-semibold text-gray-900">
                  ${product.price.toLocaleString()}
                </div>
                
                {/* Wishlist button */}
                <button className="absolute top-3 right-3 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-gold-primary hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                
                {/* Quick view button */}
                <div className="absolute inset-x-0 bottom-0 flex justify-center pb-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="bg-white/90 hover:bg-gold-primary text-gray-900 hover:text-white px-4 py-2 rounded-sm text-sm font-medium transition-colors">
                    Quick View
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center mb-1">
                  <span className="text-xs text-gray-500 font-medium">{product.category}</span>
                  <StarRating rating={product.rating} />
                </div>
                
                <Link href={`/product/${product.id}`} className="block">
                  <h3 className="font-medium text-lg mb-1 group-hover:text-gold-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>
                
                <div className="mt-3">
                  <a 
                    href={`/product/${product.id}`} 
                    className="text-sm font-medium text-gold-primary hover:text-gold-dark transition-colors inline-flex items-center"
                  >
                    View Details
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Link
            href="/shop"
            className="inline-block px-8 py-3 bg-gold-primary hover:bg-gold-dark text-white rounded-sm transition-colors text-lg font-medium"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
