import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Rare & Precious Gemstones Collection | Transilk',
  description: 'Discover our exquisite collection of rare and precious gemstones. From vibrant sapphires to elegant diamonds and mesmerizing emeralds of the highest quality.',
};

// Sample gemstone categories
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

// Sample gemstone collection
const gemstoneItems = [
  {
    id: 'g1',
    name: 'Ceylon Blue Sapphire',
    category: 'Sapphires',
    price: 8750,
    image: 'https://images.pexels.com/photos/5801628/pexels-photo-5801628.jpeg?auto=compress&cs=tinysrgb&w=600',
    featured: true,
    origin: 'Sri Lanka',
    carat: '3.65',
    rating: 4.9,
    inStock: true,
  },
  {
    id: 'g2',
    name: 'Burmese Ruby',
    category: 'Rubies',
    price: 12500,
    image: 'https://images.pexels.com/photos/4940755/pexels-photo-4940755.jpeg?auto=compress&cs=tinysrgb&w=600',
    featured: true,
    origin: 'Myanmar',
    carat: '2.12',
    rating: 4.8,
    inStock: true,
  },
  {
    id: 'g3',
    name: 'Colombian Emerald',
    category: 'Emeralds',
    price: 9400,
    image: 'https://images.pexels.com/photos/4940756/pexels-photo-4940756.jpeg?auto=compress&cs=tinysrgb&w=600',
    featured: false,
    origin: 'Colombia',
    carat: '2.78',
    rating: 4.7,
    inStock: true,
  },
  {
    id: 'g4',
    name: 'African Diamond',
    category: 'Diamonds',
    price: 15200,
    image: 'https://images.pexels.com/photos/5370706/pexels-photo-5370706.jpeg?auto=compress&cs=tinysrgb&w=600',
    featured: false,
    origin: 'Botswana',
    carat: '1.55',
    rating: 5.0,
    inStock: true,
  },
  {
    id: 'g5',
    name: 'Australian Opal',
    category: 'Opals',
    price: 6850,
    image: 'https://images.pexels.com/photos/10673770/pexels-photo-10673770.jpeg?auto=compress&cs=tinysrgb&w=600',
    featured: true,
    origin: 'Australia',
    carat: '4.25',
    rating: 4.6,
    inStock: true,
  },
  {
    id: 'g6',
    name: 'Tanzanian Tanzanite',
    category: 'Tanzanite',
    price: 7200,
    image: 'https://images.pexels.com/photos/3819538/pexels-photo-3819538.jpeg?auto=compress&cs=tinysrgb&w=600',
    featured: false,
    origin: 'Tanzania',
    carat: '3.10',
    rating: 4.5,
    inStock: false,
  },
  {
    id: 'g7',
    name: 'Russian Alexandrite',
    category: 'Alexandrite',
    price: 18500,
    image: 'https://images.pexels.com/photos/8989495/pexels-photo-8989495.jpeg?auto=compress&cs=tinysrgb&w=600',
    featured: true,
    origin: 'Russia',
    carat: '1.85',
    rating: 4.9,
    inStock: true,
  },
  {
    id: 'g8',
    name: 'Brazilian Amethyst',
    category: 'Amethyst',
    price: 3900,
    image: 'https://images.pexels.com/photos/9628104/pexels-photo-9628104.jpeg?auto=compress&cs=tinysrgb&w=600',
    featured: false,
    origin: 'Brazil',
    carat: '5.65',
    rating: 4.7,
    inStock: true,
  }
];

// Format price to currency
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg 
          key={i} 
          className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm text-gray-500 ml-1">({rating})</span>
    </div>
  );
};

export default function GemstonesPage() {
  return (
    <main className="pt-24 pb-16">
      {/* Hero Banner */}
      <section className="relative">
        <div className="h-[70vh] w-full relative">
          <Image
            src="https://images.pexels.com/photos/4940749/pexels-photo-4940749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
            alt="Precious gemstones collection"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20"></div>
          
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
                Rare & Precious <span className="text-gold-gradient">Gemstones</span>
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Discover nature's most extraordinary treasures from around the world
              </p>
              <a 
                href="#collection"
                className="px-8 py-3 bg-gold-primary hover:bg-gold-dark text-white rounded-sm transition-colors text-lg font-medium inline-block"
              >
                Explore Collection
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore By Category</h2>
            <div className="w-24 h-[2px] bg-gold-primary mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our curated collection of exquisite gemstones, ethically sourced from the world's finest mines
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                href={`/gemstones/category/${category.name.toLowerCase()}`}
                className="group overflow-hidden rounded-lg relative"
              >
                <div className="aspect-square relative">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full p-5 text-white">
                  <h3 className="text-xl font-bold">{category.name}</h3>
                  <p className="text-white/80">{category.count} stones</p>
                </div>
                
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-gold-primary/50 transition-all duration-300"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Collection */}
      <section id="collection" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold">Our Collection</h2>
              <div className="w-16 h-[2px] bg-gold-primary mt-4"></div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-500">Sort By:</span>
              <select className="bg-white border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gold-primary text-sm">
                <option>Featured</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {gemstoneItems.map((item) => (
              <div key={item.id} className="group luxury-card rounded-lg overflow-hidden">
                <div className="relative overflow-hidden h-64">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {item.featured && (
                    <div className="absolute top-2 left-2 bg-gold-primary text-white text-xs px-2 py-1 rounded-sm">
                      Featured
                    </div>
                  )}
                  
                  {!item.inStock && (
                    <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-sm">
                      Out of Stock
                    </div>
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-y-0 translate-y-4">
                    <button className="bg-white text-gray-900 px-3 py-1 mx-1 rounded-sm text-sm hover:bg-gold-primary hover:text-white transition-colors">
                      Quick View
                    </button>
                    <button className="bg-white text-gray-900 px-3 py-1 mx-1 rounded-sm text-sm hover:bg-gold-primary hover:text-white transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm text-gray-500">{item.category}</span>
                    <StarRating rating={item.rating} />
                  </div>
                  
                  <h3 className="font-medium text-lg mb-1 group-hover:text-gold-primary transition-colors">
                    {item.name}
                  </h3>
                  
                  <p className="text-sm text-gray-500 mb-2">Origin: {item.origin} | {item.carat} carats</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-gold-primary">
                      {formatPrice(item.price)}
                    </span>
                    
                    <button className="text-gray-400 hover:text-gold-primary">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center gap-1">
              <button className="px-4 py-2 border border-gray-300 rounded text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              {[1, 2, 3, 4].map((page) => (
                <button 
                  key={page} 
                  className={`w-10 h-10 flex items-center justify-center rounded ${
                    page === 1 
                      ? 'bg-gold-primary text-white' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </section>
      
      {/* Sourcing Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Ethical Sourcing & Quality</h2>
              <div className="w-16 h-[2px] bg-gold-primary mb-8"></div>
              <p className="text-white/90 mb-6 leading-relaxed text-lg">
                At Transilk, we source our gemstones through transparent and responsible supply chains. 
                Each stone is carefully selected by our team of gemologists who verify its authenticity, quality, and ethical origin.
              </p>
              <p className="text-white/90 mb-8 leading-relaxed text-lg">
                We believe that true luxury comes with responsibility. That's why we ensure our gemstones are conflict-free and 
                mined with minimal environmental impact while supporting local communities.
              </p>
              <Link
                href="/sourcing"
                className="inline-flex items-center text-gold-primary hover:text-gold-light transition-colors font-medium text-lg"
              >
                Learn more about our sourcing
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden h-40 md:h-48 relative shadow-xl">
                  <Image 
                    src="https://images.pexels.com/photos/9198546/pexels-photo-9198546.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Gemstone selection"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden h-56 md:h-64 relative shadow-xl">
                  <Image 
                    src="https://images.pexels.com/photos/5370711/pexels-photo-5370711.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Quality inspection"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-6">
                <div className="rounded-lg overflow-hidden h-56 md:h-64 relative shadow-xl">
                  <Image 
                    src="https://images.pexels.com/photos/11439492/pexels-photo-11439492.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Gemstone mining"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden h-40 md:h-48 relative shadow-xl">
                  <Image 
                    src="https://images.pexels.com/photos/6044220/pexels-photo-6044220.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Gemstone cutting"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Custom Selection CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Find Your Perfect Gemstone</h2>
            <div className="w-24 h-[2px] bg-gold-primary mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Looking for a specific gemstone? Our gemologists can help you source rare and exceptional stones 
              that meet your exact requirements for color, clarity, cut, and carat weight.
            </p>
            <Link
              href="/gemstone-concierge"
              className="px-8 py-3 bg-secondary hover:bg-secondary-dark text-white rounded-sm transition-colors text-lg font-medium inline-block"
            >
              Speak with a Gemologist
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
