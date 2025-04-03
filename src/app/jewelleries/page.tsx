import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Exquisite Jewellery Collection | Transilk',
  description: 'Explore our handcrafted jewelry collection featuring precious gems set in stunning designs. Find necklaces, rings, earrings, and bracelets of unparalleled quality.',
};

// Sample jewelry categories
const categories = [
  {
    name: 'Rings',
    image: 'https://images.pexels.com/photos/1457801/pexels-photo-1457801.jpeg?auto=compress&cs=tinysrgb&w=600',
    count: 28,
  },
  {
    name: 'Necklaces',
    image: 'https://images.pexels.com/photos/1616096/pexels-photo-1616096.jpeg?auto=compress&cs=tinysrgb&w=600',
    count: 34,
  },
  {
    name: 'Earrings',
    image: 'https://images.pexels.com/photos/10874827/pexels-photo-10874827.jpeg?auto=compress&cs=tinysrgb&w=600',
    count: 42,
  },
  {
    name: 'Bracelets',
    image: 'https://images.pexels.com/photos/12456282/pexels-photo-12456282.jpeg?auto=compress&cs=tinysrgb&w=600',
    count: 19,
  },
];

// Sample jewelry collection
const jewelryItems = [
  {
    id: 'j1',
    name: 'Sapphire Halo Diamond Ring',
    category: 'Rings',
    price: 4850,
    image: 'https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=600',
    featured: true,
    materials: 'Platinum, Sapphire, Diamonds',
    rating: 4.9,
    inStock: true,
  },
  {
    id: 'j2',
    name: 'Emerald Tennis Bracelet',
    category: 'Bracelets',
    price: 6200,
    image: 'https://images.pexels.com/photos/12456282/pexels-photo-12456282.jpeg?auto=compress&cs=tinysrgb&w=600',
    featured: true,
    materials: '18K White Gold, Emeralds, Diamonds',
    rating: 4.7,
    inStock: true,
  },
  {
    id: 'j3',
    name: 'Ruby Drop Earrings',
    category: 'Earrings',
    price: 3750,
    image: 'https://images.pexels.com/photos/10874827/pexels-photo-10874827.jpeg?auto=compress&cs=tinysrgb&w=600',
    featured: false,
    materials: '14K Yellow Gold, Rubies, Diamonds',
    rating: 4.8,
    inStock: true,
  },
  {
    id: 'j4',
    name: 'Diamond Eternity Band',
    category: 'Rings',
    price: 5100,
    image: 'https://images.pexels.com/photos/2697516/pexels-photo-2697516.jpeg?auto=compress&cs=tinysrgb&w=600',
    featured: false,
    materials: 'Platinum, Diamonds',
    rating: 5.0,
    inStock: true,
  },
  {
    id: 'j5',
    name: 'Pearl Pendant Necklace',
    category: 'Necklaces',
    price: 2850,
    image: 'https://images.pexels.com/photos/1616096/pexels-photo-1616096.jpeg?auto=compress&cs=tinysrgb&w=600',
    featured: true,
    materials: '18K Rose Gold, South Sea Pearl, Diamonds',
    rating: 4.6,
    inStock: true,
  },
  {
    id: 'j6',
    name: 'Topaz Statement Ring',
    category: 'Rings',
    price: 3200,
    image: 'https://images.pexels.com/photos/10183505/pexels-photo-10183505.jpeg?auto=compress&cs=tinysrgb&w=600',
    featured: false,
    materials: '18K Yellow Gold, Blue Topaz, Diamonds',
    rating: 4.5,
    inStock: false,
  },
  {
    id: 'j7',
    name: 'Diamond Tennis Necklace',
    category: 'Necklaces',
    price: 12500,
    image: 'https://images.pexels.com/photos/9428800/pexels-photo-9428800.jpeg?auto=compress&cs=tinysrgb&w=600',
    featured: true,
    materials: 'Platinum, Diamonds',
    rating: 4.9,
    inStock: true,
  },
  {
    id: 'j8',
    name: 'Amethyst Cocktail Ring',
    category: 'Rings',
    price: 2900,
    image: 'https://images.pexels.com/photos/9428831/pexels-photo-9428831.jpeg?auto=compress&cs=tinysrgb&w=600',
    featured: false,
    materials: '14K White Gold, Amethyst, Diamonds',
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

export default function JewelleriesPage() {
  return (
    <main className="pt-24 pb-16">
      {/* Hero Banner */}
      <section className="relative">
        <div className="h-[70vh] w-full relative">
          <Image
            src="https://images.pexels.com/photos/10937017/pexels-photo-10937017.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
            alt="Luxury jewelry collection"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20"></div>
          
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
                Exquisite <span className="text-gold-gradient">Jewellery</span> Collection
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Handcrafted masterpieces featuring the world&apos;s most precious gems
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
              Browse our extensive collection of fine jewelry by category, each piece meticulously crafted with exceptional gemstones
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                href={`/jewelleries/category/${category.name.toLowerCase()}`}
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
                  <p className="text-white/80">{category.count} pieces</p>
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
            {jewelryItems.map((item) => (
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
                  
                  <p className="text-sm text-gray-500 mb-2">{item.materials}</p>
                  
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
      
      {/* Craftsmanship Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Masterful Craftsmanship</h2>
              <div className="w-16 h-[2px] bg-gold-primary mb-8"></div>
              <p className="text-white/90 mb-6 leading-relaxed text-lg">
                Each piece of jewelry at Transilk is meticulously crafted by master artisans with decades of experience. 
                We combine traditional techniques with modern innovation to create pieces that showcase the natural beauty of our gemstones.
              </p>
              <p className="text-white/90 mb-8 leading-relaxed text-lg">
                Our commitment to excellence means that every setting, prong, and detail is carefully considered and 
                perfectly executed, ensuring jewelry that will be treasured for generations.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center text-gold-primary hover:text-gold-light transition-colors font-medium text-lg"
              >
                Learn more about our process
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden h-40 md:h-48 relative shadow-xl">
                  <Image 
                    src="https://images.pexels.com/photos/5370706/pexels-photo-5370706.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Jewelry crafting"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden h-56 md:h-64 relative shadow-xl">
                  <Image 
                    src="https://images.pexels.com/photos/8989495/pexels-photo-8989495.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Diamond setting"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-6">
                <div className="rounded-lg overflow-hidden h-56 md:h-64 relative shadow-xl">
                  <Image 
                    src="https://images.pexels.com/photos/9628104/pexels-photo-9628104.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Polishing jewelry"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden h-40 md:h-48 relative shadow-xl">
                  <Image 
                    src="https://images.pexels.com/photos/3819538/pexels-photo-3819538.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Jewelry design"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Custom Design CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Bespoke Jewelry Design</h2>
            <div className="w-24 h-[2px] bg-gold-primary mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Can&apos;t find exactly what you&apos;re looking for? Our master jewelers will work with you to create a custom piece 
              that perfectly captures your vision and style.
            </p>
            <Link
              href="/custom-design"
              className="px-8 py-3 bg-secondary hover:bg-secondary-dark text-white rounded-sm transition-colors text-lg font-medium inline-block"
            >
              Start Your Custom Design
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
