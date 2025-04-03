import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Gemstone & Jewelry Auctions | Transilk',
  description: 'Participate in exclusive online auctions featuring rare gemstones and exquisite jewelry pieces. Bid on unique items from around the world.',
};

// Sample auction items
const auctionItems = [
  {
    id: 'a1',
    name: 'Natural Unheated Burmese Ruby - 3.21 Carats',
    category: 'Gemstones',
    currentBid: 12500,
    startingBid: 8000,
    bids: 18,
    image: 'https://images.pexels.com/photos/3685523/pexels-photo-3685523.jpeg?auto=compress&cs=tinysrgb&w=600',
    endTime: '2023-11-30T14:00:00',
    featured: true,
    description: 'Exceptional pigeon blood red color, excellent clarity with minor inclusions visible under magnification only. GRS certified.',
  },
  {
    id: 'a2',
    name: 'Art Deco Diamond and Sapphire Ring',
    category: 'Jewelry',
    currentBid: 7850,
    startingBid: 5000,
    bids: 12,
    image: 'https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=600',
    endTime: '2023-11-28T21:00:00',
    featured: true,
    description: 'Circa 1925, platinum setting with a 2.1 carat center diamond (G color, VS1 clarity) surrounded by calibré-cut sapphires.',
  },
  {
    id: 'a3',
    name: 'Ceylon Blue Sapphire - 5.78 Carats',
    category: 'Gemstones',
    currentBid: 9600,
    startingBid: 6000,
    bids: 15,
    image: 'https://images.pexels.com/photos/5370794/pexels-photo-5370794.jpeg?auto=compress&cs=tinysrgb&w=600',
    endTime: '2023-12-02T18:00:00',
    featured: false,
    description: 'Classic royal blue color with excellent luster and saturation. No heat treatment, with Swiss laboratory certification.',
  },
  {
    id: 'a4',
    name: 'Colombian Emerald Pendant - 2.45 Carats',
    category: 'Jewelry',
    currentBid: 8200,
    startingBid: 5500,
    bids: 9,
    image: 'https://images.pexels.com/photos/10937029/pexels-photo-10937029.jpeg?auto=compress&cs=tinysrgb&w=600',
    endTime: '2023-12-01T16:00:00',
    featured: false,
    description: '18K yellow gold pendant featuring a vivid green Colombian emerald. Minor garden inclusions typical of fine emeralds.',
  },
  {
    id: 'a5',
    name: 'Antique Pearl and Diamond Necklace',
    category: 'Jewelry',
    currentBid: 16200,
    startingBid: 12000,
    bids: 7,
    image: 'https://images.pexels.com/photos/1616096/pexels-photo-1616096.jpeg?auto=compress&cs=tinysrgb&w=600',
    endTime: '2023-11-29T20:00:00',
    featured: true,
    description: 'Victorian era (circa 1880) pearl necklace with old-cut diamond accents in silver-topped gold setting. Excellent provenance.',
  },
  {
    id: 'a6',
    name: 'Paraíba Tourmaline - 1.82 Carats',
    category: 'Gemstones',
    currentBid: 22500,
    startingBid: 18000,
    bids: 11,
    image: 'https://images.pexels.com/photos/5370804/pexels-photo-5370804.jpeg?auto=compress&cs=tinysrgb&w=600',
    endTime: '2023-12-05T15:00:00',
    featured: true,
    description: 'Rare neon blue-green Paraíba tourmaline from Brazil. Electric color with exceptional brilliance and clarity.',
  },
];

// Format price as currency
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
};

// Calculate time remaining
const getTimeRemaining = (endTime: string) => {
  const total = Date.parse(endTime) - Date.now();
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  
  if (days > 0) {
    return `${days}d ${hours}h`;
  }
  
  const minutes = Math.floor((total / 1000 / 60) % 60);
  return `${hours}h ${minutes}m`;
};

export default function AuctionsPage() {
  return (
    <main className="pt-24 pb-16">
      {/* Hero Banner */}
      <section className="relative">
        <div className="h-[60vh] w-full relative">
          <Image
            src="https://images.pexels.com/photos/6044096/pexels-photo-6044096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
            alt="Luxury gemstone auction"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>
          
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
                Exclusive <span className="text-gold-gradient">Auctions</span>
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Bid on rare, high-quality gemstones and jewelry pieces from around the world
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="#live-auctions"
                  className="px-8 py-3 bg-gold-primary hover:bg-gold-dark text-white rounded-sm transition-colors text-lg font-medium"
                >
                  View Current Auctions
                </a>
                <Link 
                  href="/auctions/how-it-works"
                  className="px-8 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-sm transition-colors text-lg font-medium"
                >
                  How Auctions Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Auction Highlight */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Highlight</h2>
            <div className="w-24 h-[2px] bg-gold-primary mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don&apos;t miss our most exceptional piece currently open for bidding
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-96 lg:h-auto">
                <Image
                  src="https://images.pexels.com/photos/5370804/pexels-photo-5370804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
                  alt="Paraíba Tourmaline"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-gold-primary text-white text-sm px-3 py-1 rounded-sm">
                  Featured
                </div>
              </div>
              
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center mb-4">
                  <span className="text-xs text-white px-2 py-1 bg-primary rounded-full">Gemstones</span>
                  <div className="ml-auto flex items-center text-red-500">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Ends in 2 days 4 hours</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4">Paraíba Tourmaline - 1.82 Carats</h3>
                
                <p className="text-gray-600 mb-6">
                  Rare neon blue-green Paraíba tourmaline from Brazil. Electric color with exceptional brilliance and clarity. 
                  This gem represents one of the rarest and most sought-after varieties in the colored gemstone market.
                </p>
                
                <div className="flex items-end justify-between mb-8">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Current Bid</p>
                    <p className="text-3xl font-bold text-gold-primary">{formatPrice(22500)}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-1">Bids</p>
                    <p className="text-xl font-semibold">11</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/auctions/a6"
                    className="flex-1 bg-primary hover:bg-primary-light text-white text-center py-3 rounded-sm transition-colors font-medium"
                  >
                    View Details
                  </Link>
                  <button
                    className="flex-1 bg-gold-primary hover:bg-gold-dark text-white py-3 rounded-sm transition-colors font-medium"
                  >
                    Place Bid
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Live Auctions */}
      <section id="live-auctions" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Current Auctions</h2>
              <div className="w-16 h-[2px] bg-gold-primary"></div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-500">Filter By:</span>
              <select className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold-primary text-sm">
                <option>All Categories</option>
                <option>Gemstones</option>
                <option>Jewelry</option>
                <option>Watches</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {auctionItems.map((item) => (
              <div key={item.id} className="group luxury-card rounded-lg overflow-hidden bg-white">
                <div className="relative overflow-hidden h-64">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {item.featured && (
                    <div className="absolute top-3 left-3 bg-gold-primary text-white text-xs px-2 py-1 rounded-sm">
                      Featured
                    </div>
                  )}
                  
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-sm">
                    {getTimeRemaining(item.endTime)} left
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-24"></div>
                  
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white/80 text-sm">{item.category}</p>
                    <p className="text-white font-medium">{formatPrice(item.currentBid)}</p>
                  </div>
                  
                  <div className="absolute bottom-3 right-3">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white">
                      {item.bids} bids
                    </div>
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-gold-primary transition-colors">
                    {item.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/auctions/${item.id}`}
                      className="text-gold-primary hover:text-gold-dark font-medium text-sm flex items-center"
                    >
                      View Details
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                    
                    <button
                      className="px-3 py-1 bg-gold-primary hover:bg-gold-dark text-white text-sm rounded-sm transition-colors"
                    >
                      Place Bid
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
      </section>
      
      {/* How Auctions Work */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Our Auctions Work</h2>
            <div className="w-24 h-[2px] bg-gold-primary mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Participate in our transparent and secure bidding process to acquire exceptional gemstones and jewelry
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-gold-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gold-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Register & Verify</h3>
              <p className="text-gray-600">
                Create an account and complete our verification process to gain access to our exclusive auctions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gold-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gold-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse & Bid</h3>
              <p className="text-gray-600">
                Explore current auctions and place bids on items that catch your interest. Receive notifications as auctions progress.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gold-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gold-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Win & Receive</h3>
              <p className="text-gray-600">
                If you&apos;re the highest bidder when an auction ends, complete payment and receive your authenticated item with full documentation.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link
              href="/auctions/register"
              className="px-8 py-3 bg-primary hover:bg-primary-light text-white rounded-sm transition-colors text-lg font-medium inline-block"
            >
              Register for Auctions
            </Link>
          </div>
        </div>
      </section>
      
      {/* Auction Calendar */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Upcoming Auctions</h2>
            <div className="w-24 h-[2px] bg-gold-primary mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Plan ahead and prepare for these exciting upcoming gemstone and jewelry auctions
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full mb-2">December 15, 2023</span>
                  <h3 className="text-xl font-bold">Royal Blue Sapphire Collection</h3>
                  <p className="text-gray-600 mt-1">A rare collection of unheated Ceylon sapphires, including a 15.8 carat specimen</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <button className="inline-block px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-sm transition-colors">
                    Set Reminder
                  </button>
                </div>
              </div>
              
              <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <span className="inline-block bg-accent-ruby/10 text-accent-ruby text-xs px-2 py-1 rounded-full mb-2">January 10, 2024</span>
                  <h3 className="text-xl font-bold">Antique Diamond Jewelry</h3>
                  <p className="text-gray-600 mt-1">Exquisite pieces from the Art Deco and Victorian eras with historical provenance</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <button className="inline-block px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-sm transition-colors">
                    Set Reminder
                  </button>
                </div>
              </div>
              
              <div className="p-6 flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <span className="inline-block bg-accent-emerald/10 text-accent-emerald text-xs px-2 py-1 rounded-full mb-2">February 5, 2024</span>
                  <h3 className="text-xl font-bold">Colored Gemstone Spectacular</h3>
                  <p className="text-gray-600 mt-1">Featuring emeralds, rubies, spinels, and alexandrites of exceptional quality</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <button className="inline-block px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-sm transition-colors">
                    Set Reminder
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link
              href="/auctions/calendar"
              className="inline-flex items-center text-gold-primary hover:text-gold-dark transition-colors font-medium"
            >
              View Full Auction Calendar
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Consign Your Items</h2>
              <p className="text-white/90 mb-8 text-lg">
                Do you own exceptional gemstones or jewelry pieces that you&apos;d like to sell through our auctions? 
                Our consignment process offers you access to our global network of collectors and enthusiasts.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 text-gold-primary">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p>Professional appraisal and documentation of your items</p>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 text-gold-primary">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p>Strategic marketing to our international collector base</p>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 text-gold-primary">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p>Competitive commission rates and transparent process</p>
                </div>
              </div>
              <div className="mt-8">
                <Link
                  href="/auctions/consign"
                  className="inline-block px-6 py-3 bg-gold-primary hover:bg-gold-dark text-white rounded-sm transition-colors font-medium"
                >
                  Learn About Consignment
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="rounded-lg overflow-hidden">
                <Image 
                  src="https://images.pexels.com/photos/7010076/pexels-photo-7010076.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Gemstone evaluation"
                  width={600}
                  height={400}
                  className="object-cover"
                />
              </div>
              
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-lg overflow-hidden shadow-lg">
                <Image 
                  src="https://images.pexels.com/photos/8044148/pexels-photo-8044148.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Diamond inspection"
                  width={150}
                  height={150}
                  className="object-cover"
                />
              </div>
              
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-lg overflow-hidden shadow-lg hidden md:block">
                <Image 
                  src="https://images.pexels.com/photos/5370785/pexels-photo-5370785.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Ruby gemstone"
                  width={150}
                  height={150}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
