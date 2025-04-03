import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Shop | Transilk',
  description: 'Browse our collection of exquisite gemstones and fine jewelry. From rare rubies to diamond rings, find stunning pieces for any occasion.',
};

// Sample product categories
const categories = [
  { name: 'All', count: 124 },
  { name: 'Gemstones', count: 57 },
  { name: 'Rings', count: 28 },
  { name: 'Necklaces', count: 22 },
  { name: 'Earrings', count: 19 },
  { name: 'Bracelets', count: 15 },
  { name: 'Pendants', count: 13 }
];

// Sample sorting options
const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Best Rated', value: 'rating_desc' }
];

// Sample filter groups
const filterGroups = [
  {
    name: 'Stone Type',
    options: [
      { value: 'ruby', label: 'Ruby', count: 18 },
      { value: 'sapphire', label: 'Sapphire', count: 23 },
      { value: 'emerald', label: 'Emerald', count: 15 },
      { value: 'diamond', label: 'Diamond', count: 32 },
      { value: 'amethyst', label: 'Amethyst', count: 11 },
      { value: 'topaz', label: 'Topaz', count: 9 },
      { value: 'pearl', label: 'Pearl', count: 7 },
    ]
  },
  {
    name: 'Price Range',
    options: [
      { value: 'under-1000', label: 'Under $1,000', count: 14 },
      { value: '1000-2500', label: '$1,000 - $2,500', count: 22 },
      { value: '2500-5000', label: '$2,500 - $5,000', count: 28 },
      { value: '5000-10000', label: '$5,000 - $10,000', count: 19 },
      { value: 'over-10000', label: 'Over $10,000', count: 41 },
    ]
  },
  {
    name: 'Metal Type',
    options: [
      { value: 'gold-18k', label: '18K Gold', count: 42 },
      { value: 'white-gold', label: 'White Gold', count: 37 },
      { value: 'rose-gold', label: 'Rose Gold', count: 25 },
      { value: 'platinum', label: 'Platinum', count: 31 },
      { value: 'silver', label: 'Silver', count: 15 },
    ]
  }
];

// Sample products
const products = [
  {
    id: 'p1',
    name: 'Natural Ruby Gemstone',
    category: 'Gemstones',
    price: 2499.99,
    image: 'https://images.pexels.com/photos/3685523/pexels-photo-3685523.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 5,
    isNew: true,
    isFeatured: true,
  },
  {
    id: 'p2',
    name: 'Blue Sapphire Ring',
    category: 'Rings',
    price: 3299.99,
    image: 'https://images.pexels.com/photos/331958/pexels-photo-331958.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.5,
    isNew: false,
    isFeatured: true,
  },
  {
    id: 'p3',
    name: 'Emerald Gold Necklace',
    category: 'Necklaces',
    price: 4999.99,
    image: 'https://images.pexels.com/photos/1457801/pexels-photo-1457801.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 5,
    isNew: false,
    isFeatured: false,
  },
  {
    id: 'p4',
    name: 'Diamond Solitaire',
    category: 'Rings',
    price: 7999.99,
    image: 'https://images.pexels.com/photos/11706768/pexels-photo-11706768.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.8,
    isNew: true,
    isFeatured: false,
  },
  {
    id: 'p5',
    name: 'Pearl Stud Earrings',
    category: 'Earrings',
    price: 1299.99,
    image: 'https://images.pexels.com/photos/9428831/pexels-photo-9428831.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.3,
    isNew: false,
    isFeatured: false,
  },
  {
    id: 'p6',
    name: 'Amethyst Pendant',
    category: 'Pendants',
    price: 899.99,
    image: 'https://images.pexels.com/photos/5370804/pexels-photo-5370804.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.7,
    isNew: false,
    isFeatured: false,
  },
  {
    id: 'p7',
    name: 'Topaz Tennis Bracelet',
    category: 'Bracelets',
    price: 1899.99,
    image: 'https://images.pexels.com/photos/12456282/pexels-photo-12456282.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.9,
    isNew: false,
    isFeatured: true,
  },
  {
    id: 'p8',
    name: 'Ceylon Blue Sapphire',
    category: 'Gemstones',
    price: 5499.99,
    image: 'https://images.pexels.com/photos/5370794/pexels-photo-5370794.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 5,
    isNew: true,
    isFeatured: false,
  },
  {
    id: 'p9',
    name: 'Ruby Earrings',
    category: 'Earrings',
    price: 3699.99,
    image: 'https://images.pexels.com/photos/10874827/pexels-photo-10874827.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.6,
    isNew: false,
    isFeatured: false,
  },
  {
    id: 'p10',
    name: 'Emerald Cut Diamond',
    category: 'Gemstones',
    price: 12999.99,
    image: 'https://images.pexels.com/photos/5370785/pexels-photo-5370785.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.9,
    isNew: false,
    isFeatured: true,
  },
  {
    id: 'p11',
    name: 'Pearl Necklace',
    category: 'Necklaces',
    price: 2799.99,
    image: 'https://images.pexels.com/photos/1616096/pexels-photo-1616096.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.4,
    isNew: false,
    isFeatured: false,
  },
  {
    id: 'p12',
    name: 'Rose Gold Diamond Ring',
    category: 'Rings',
    price: 4299.99,
    image: 'https://images.pexels.com/photos/10183505/pexels-photo-10183505.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.7,
    isNew: true,
    isFeatured: false,
  },
];

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

// Format price to currency
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
};

export default function ShopPage() {
  return (
    <main className="pt-24 pb-16">
      {/* Hero Banner */}
      <section className="relative">
        <div className="h-64 md:h-80 w-full relative">
          <Image
            src="https://images.pexels.com/photos/2252000/pexels-photo-2252000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
            alt="Transilk Collection"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary/70"></div>
          
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-3">
                Our <span className="text-gold-primary">Collection</span>
              </h1>
              <p className="text-lg text-white/90 max-w-xl mx-auto">
                Browse our exquisite selection of gemstones and fine jewelry
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Shop Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Filters */}
            <div className="lg:w-1/4 w-full">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold border-b border-gray-200 pb-4 mb-4">Filter Products</h2>
                
                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Categories</h3>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category.name} className="flex justify-between items-center group">
                        <a href="#" className="text-gray-700 hover:text-gold-primary transition-colors group-hover:translate-x-1 transform duration-200 inline-block">
                          {category.name}
                        </a>
                        <span className="text-gray-500 text-sm">{category.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Price Range Slider */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <div className="px-2">
                    <div className="h-2 bg-gray-200 rounded-full mb-6 relative">
                      <div className="absolute h-full bg-gold-primary rounded-full" style={{width: '60%', left: '10%'}}></div>
                      <div className="absolute w-5 h-5 bg-white rounded-full border-2 border-gold-primary top-1/2 transform -translate-y-1/2 cursor-pointer" style={{left: '10%'}}></div>
                      <div className="absolute w-5 h-5 bg-white rounded-full border-2 border-gold-primary top-1/2 transform -translate-y-1/2 cursor-pointer" style={{left: '70%'}}></div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">$100</span>
                      <span className="text-sm font-medium text-gray-700">$50,000</span>
                    </div>
                  </div>
                </div>
                
                {/* Filter Groups */}
                {filterGroups.map((group) => (
                  <div key={group.name} className="mb-6 border-t border-gray-100 pt-6">
                    <h3 className="font-semibold mb-3">{group.name}</h3>
                    <ul className="space-y-2">
                      {group.options.map((option) => (
                        <li key={option.value} className="flex items-center">
                          <input 
                            type="checkbox" 
                            id={option.value} 
                            className="h-4 w-4 text-gold-primary rounded border-gray-300 focus:ring-gold-primary"
                          />
                          <label htmlFor={option.value} className="ml-2 text-gray-700 text-sm flex justify-between w-full">
                            <span>{option.label}</span>
                            <span className="text-gray-500">({option.count})</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                
                {/* Apply Filters Button */}
                <button className="w-full bg-gold-primary text-white py-2 rounded hover:bg-gold-dark transition-colors font-medium">
                  Apply Filters
                </button>
                
                {/* Reset Filters Link */}
                <div className="text-center mt-3">
                  <a href="#" className="text-sm text-gray-500 hover:text-gold-primary transition-colors">
                    Reset All Filters
                  </a>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:w-3/4 w-full">
              {/* Sorting and View Options */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Sort by:</span>
                  <select className="border-gray-300 rounded focus:ring-gold-primary focus:border-gold-primary text-sm">
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mt-4 sm:mt-0 text-gray-500 text-sm">
                  Showing 1-12 of 124 products
                </div>
              </div>
              
              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {products.map((product) => (
                  <div key={product.id} className="group luxury-card rounded-lg overflow-hidden">
                    <div className="relative overflow-hidden h-64">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {product.isNew && (
                        <div className="absolute top-2 left-2 bg-accent-emerald text-white text-xs px-2 py-1 rounded-sm">
                          New
                        </div>
                      )}
                      
                      {product.isFeatured && (
                        <div className="absolute top-2 right-2 bg-gold-primary text-white text-xs px-2 py-1 rounded-sm">
                          Featured
                        </div>
                      )}
                      
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-24 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      
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
                        <span className="text-sm text-gray-500">{product.category}</span>
                        <StarRating rating={product.rating} />
                      </div>
                      
                      <Link href={`/product/${product.id}`}>
                        <h3 className="font-medium text-lg mb-1 group-hover:text-gold-primary transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <div className="flex justify-between items-center mt-3">
                        <span className="font-bold text-gold-primary">
                          {formatPrice(product.price)}
                        </span>
                        
                        <button className="text-gray-400 hover:text-gold-primary transition-colors">
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
              <div className="flex justify-center">
                <nav className="flex items-center gap-1">
                  <button className="px-4 py-2 border border-gray-300 rounded text-gray-500 hover:bg-gray-50">
                    Previous
                  </button>
                  {[1, 2, 3, 4, 5].map((page) => (
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
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="mt-16 bg-primary text-white py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-white/80 mb-6">
              Subscribe to our newsletter to receive updates on new arrivals, special offers, and exclusive events.
            </p>
            
            <form className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-l-md sm:rounded-none focus:outline-none focus:ring-2 focus:ring-gold-primary"
              />
              <button
                type="submit"
                className="mt-2 sm:mt-0 px-6 py-3 bg-gold-primary hover:bg-gold-dark text-white rounded-r-md sm:rounded-none transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
