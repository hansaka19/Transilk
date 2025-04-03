import Image from 'next/image';
import Link from 'next/link';

// Sample gem types for filtering
const gemTypes = [
  'All',
  'Ruby',
  'Sapphire',
  'Emerald',
  'Diamond',
  'Topaz',
  'Amethyst',
  'Aquamarine',
];

// Sample gemstone data
const gemstones = [
  {
    id: 'g1',
    name: 'Ceylon Blue Sapphire',
    type: 'Sapphire',
    price: 3799.99,
    image: 'https://images.pexels.com/photos/991063/pexels-photo-991063.jpeg?auto=compress&cs=tinysrgb&w=600',
    carat: 2.5,
    color: 'Royal Blue',
    cut: 'Oval',
    clarity: 'Eye Clean',
  },
  {
    id: 'g2',
    name: 'Burmese Pigeon Blood Ruby',
    type: 'Ruby',
    price: 5299.99,
    image: 'https://images.pexels.com/photos/17577617/pexels-photo-17577617/free-photo-of-photo-of-a-ruby-gemstone.jpeg?auto=compress&cs=tinysrgb&w=600',
    carat: 1.8,
    color: 'Vibrant Red',
    cut: 'Cushion',
    clarity: 'Slightly Included',
  },
  {
    id: 'g3',
    name: 'Colombian Emerald',
    type: 'Emerald',
    price: 4599.99,
    image: 'https://images.pexels.com/photos/14013415/pexels-photo-14013415.jpeg?auto=compress&cs=tinysrgb&w=600',
    carat: 1.5,
    color: 'Deep Green',
    cut: 'Rectangular',
    clarity: 'Moderately Included',
  },
  {
    id: 'g4',
    name: 'South African Diamond',
    type: 'Diamond',
    price: 9999.99,
    image: 'https://images.pexels.com/photos/996952/pexels-photo-996952.jpeg?auto=compress&cs=tinysrgb&w=600',
    carat: 2.0,
    color: 'D',
    cut: 'Round Brilliant',
    clarity: 'VVS1',
  },
  {
    id: 'g5',
    name: 'Brazilian Aquamarine',
    type: 'Aquamarine',
    price: 1899.99,
    image: 'https://images.pexels.com/photos/6044095/pexels-photo-6044095.jpeg?auto=compress&cs=tinysrgb&w=600',
    carat: 3.2,
    color: 'Sky Blue',
    cut: 'Emerald',
    clarity: 'Eye Clean',
  },
  {
    id: 'g6',
    name: 'Madagascan Amethyst',
    type: 'Amethyst',
    price: 1299.99,
    image: 'https://images.pexels.com/photos/5368828/pexels-photo-5368828.jpeg?auto=compress&cs=tinysrgb&w=600',
    carat: 4.5,
    color: 'Deep Purple',
    cut: 'Pear',
    clarity: 'Clean',
  }
];

export default function GemstonesPage() {
  // Format price to currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <main className="bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-8">
        {/* Hero section */}
        <div className="relative bg-primary rounded-lg overflow-hidden mb-8">
          <div className="absolute inset-0 opacity-20">
            <Image 
              src="https://images.pexels.com/photos/1457801/pexels-photo-1457801.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
              alt="Gemstones background" 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="relative z-10 py-12 px-6 md:px-12 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Exquisite Gemstones</h1>
            <p className="text-lg md:text-xl max-w-2xl text-white/80">
              Discover our collection of rare and beautiful gemstones, carefully sourced from the finest mines around the world.
            </p>
          </div>
        </div>
        
        {/* Filtering options */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Filter by Type</h2>
              <div className="flex flex-wrap gap-2">
                {gemTypes.map((type) => (
                  <button 
                    key={type} 
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      type === 'All' 
                        ? 'bg-gold-primary text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-gray-500">Sort by:</span>
              <select className="bg-gray-100 border-none rounded px-3 py-2 focus:ring-2 focus:ring-gold-primary">
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Popular</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {gemstones.map((gem) => (
            <div key={gem.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
              <div className="relative h-64 bg-gray-100 overflow-hidden">
                <Image 
                  src={gem.image} 
                  alt={gem.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute top-0 left-0 bg-gold-primary text-white px-3 py-1 text-sm font-medium">
                  {gem.type}
                </div>
              </div>
              
              <div className="p-5">
                <Link href={`/gemstones/${gem.id}`}>
                  <h3 className="text-lg font-bold mb-1 group-hover:text-gold-primary transition-colors">
                    {gem.name}
                  </h3>
                </Link>
                
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gold-primary text-lg font-semibold">
                    {formatPrice(gem.price)}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {gem.carat} Carats
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-1">Color:</span>
                    <span className="font-medium">{gem.color}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-1">Cut:</span>
                    <span className="font-medium">{gem.cut}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-1">Clarity:</span>
                    <span className="font-medium">{gem.clarity}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 bg-primary hover:bg-primary-light text-white py-2 rounded transition-colors text-sm font-medium">
                    Quick View
                  </button>
                  <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors">
                    <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            {[1, 2, 3].map((page) => (
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
    </main>
  );
}
