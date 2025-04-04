import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Ethical Gemstone Sourcing & Sustainability | Transilk',
  description: 'Learn about our commitment to ethical sourcing, sustainability, and responsible practices in gemstone mining and jewelry creation.',
};

// Values section items
const valueItems = [
  {
    title: 'Ethical Sourcing',
    description: 'We partner only with mines and suppliers that meet our strict ethical standards and provide fair wages and safe working conditions.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    title: 'Sustainability',
    description: 'We minimize environmental impact through responsible mining practices, recycled metals, and eco-friendly packaging.',
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Traceability',
    description: 'Every gemstone is traceable to its source, allowing us to verify its ethical origin and share its journey with you.',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
  },
  {
    title: 'Community Support',
    description: 'We invest in the communities where our gemstones are sourced through education, healthcare, and economic development initiatives.',
    icon: 'M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z',
  },
];

// Sourcing locations
const sourcingLocations = [
  {
    country: 'Sri Lanka',
    gemstones: 'Blue Sapphires, Padparadscha Sapphires',
    image: 'https://images.pexels.com/photos/8989495/pexels-photo-8989495.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Our Ceylon sapphires come from family-owned mines in Ratnapura that have maintained traditional mining methods for generations while implementing modern safety standards.'
  },
  {
    country: 'Myanmar (Burma)',
    gemstones: 'Rubies, Spinel',
    image: 'https://images.pexels.com/photos/4940755/pexels-photo-4940755.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'We source Burmese rubies from selected mines that meet international labor standards and operate with minimal environmental impact.'
  },
  {
    country: 'Colombia',
    gemstones: 'Emeralds',
    image: 'https://images.pexels.com/photos/4940756/pexels-photo-4940756.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Our Colombian emeralds come from the Muzo and Chivor mines, where we work directly with local cooperatives to ensure fair practices.'
  },
  {
    country: 'Botswana',
    gemstones: 'Diamonds',
    image: 'https://images.pexels.com/photos/5370706/pexels-photo-5370706.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Our diamonds are primarily sourced from Botswana, where the industry has transformed the nation\'s economy and supports healthcare and education.'
  },
  {
    country: 'Tanzania',
    gemstones: 'Tanzanite, Tsavorite Garnet',
    image: 'https://images.pexels.com/photos/3819538/pexels-photo-3819538.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'We partner with responsible Tanzanian mines that provide safe working conditions and contribute to local community development.'
  },
  {
    country: 'Australia',
    gemstones: 'Opals, Pink Diamonds',
    image: 'https://images.pexels.com/photos/10673770/pexels-photo-10673770.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Our Australian gems come from operations with leading environmental rehabilitation practices and strong indigenous community engagement.'
  },
];

// Updated certifications section without external placeholder images
const certifications = [
  {
    name: 'Responsible Jewellery Council',
    abbr: 'RJC',
  },
  {
    name: 'Kimberley Process',
    abbr: 'KP',
  },
  {
    name: 'Fairmined',
    abbr: 'FM',
  },
  {
    name: 'Fair Trade Gems',
    abbr: 'FTG',
  },
];

export default function SourcingPage() {
  return (
    <main className="pt-24 pb-16">
      {/* Hero Banner */}
      <section className="relative">
        <div className="h-[60vh] w-full relative">
          <Image
            src="https://images.pexels.com/photos/11439492/pexels-photo-11439492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
            alt="Ethical gemstone mining"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>
          
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
                Our Ethical <span className="text-gold-gradient">Sourcing</span> Commitment
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Transparent, responsible, and sustainable practices in every gemstone we source
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Philosophy</h2>
            <div className="w-24 h-[2px] bg-gold-primary mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              At Transilk, we believe that true luxury comes with responsibility. Our commitment to ethical sourcing goes beyond industry standards to ensure that every gemstone in our collection is not only beautiful but also responsibly obtained. 
              We work tirelessly to ensure transparency at every step of the supply chain, from mine to market.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We personally visit mines and cutting facilities around the world to verify working conditions, environmental practices, and fair treatment of workers. Our direct relationships with miners and suppliers allow us to trace each gemstone back to its source, ensuring authenticity and ethical standards.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <div className="w-24 h-[2px] bg-gold-primary mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core principles guide our sourcing practices and business relationships
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 transition-transform hover:translate-y-[-5px]">
                <div className="w-12 h-12 bg-gold-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gold-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Sourcing Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Where Our Gemstones Come From</h2>
            <div className="w-24 h-[2px] bg-gold-primary mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We carefully select our sourcing partners from regions known for producing the finest quality gemstones under ethical conditions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sourcingLocations.map((location, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                <div className="h-48 relative">
                  <Image
                    src={location.image}
                    alt={`Gemstone mining in ${location.country}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{location.country}</h3>
                  <p className="text-gold-primary font-medium mb-3">{location.gemstones}</p>
                  <p className="text-gray-600">{location.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Certifications Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Certifications</h2>
            <div className="w-24 h-[2px] bg-gold-primary mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We adhere to the highest industry standards and are proud members of these ethical certification bodies
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-gold-primary/10 rounded-full flex items-center justify-center mb-3">
                  <span className="font-bold text-gold-primary text-xl">{cert.abbr}</span>
                </div>
                <h3 className="text-center font-medium text-gray-800">{cert.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Sourcing Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Sourcing Process</h2>
              <div className="w-16 h-[2px] bg-gold-primary mb-8"></div>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-8 h-8 bg-gold-primary rounded-full flex items-center justify-center text-white font-bold">1</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Identification & Research</h3>
                    <p className="text-gray-600">We identify potential sources based on gemstone quality, ethical standards, and environmental practices.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-8 h-8 bg-gold-primary rounded-full flex items-center justify-center text-white font-bold">2</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">On-Site Inspection</h3>
                    <p className="text-gray-600">Our team visits each mine to verify conditions, practices, and community impact firsthand.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-8 h-8 bg-gold-primary rounded-full flex items-center justify-center text-white font-bold">3</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Selection & Documentation</h3>
                    <p className="text-gray-600">We carefully select our gemstones and document their origin, characteristics, and journey.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-8 h-8 bg-gold-primary rounded-full flex items-center justify-center text-white font-bold">4</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Ongoing Relationships</h3>
                    <p className="text-gray-600">We maintain long-term partnerships with our suppliers and regularly reassess their practices.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="https://images.pexels.com/photos/6044220/pexels-photo-6044220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                alt="Gemstone inspection and cutting"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Sustainability Initiatives */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Sustainability Initiatives</h2>
            <div className="w-24 h-[2px] bg-gold-primary mx-auto mb-6"></div>
            <p className="text-white/80 max-w-2xl mx-auto">
              Our commitment to sustainability extends beyond responsible sourcing to include these key initiatives
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="w-12 h-12 bg-gold-primary/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gold-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Land Reclamation</h3>
              <p className="text-white/80">
                We partner with mines that restore land after mining operations, replanting native vegetation and rebuilding ecosystems.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="w-12 h-12 bg-gold-primary/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gold-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Renewable Energy</h3>
              <p className="text-white/80">
                We've invested in solar power for our facilities and encourage our partners to adopt renewable energy solutions.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="w-12 h-12 bg-gold-primary/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gold-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Community Investment</h3>
              <p className="text-white/80">
                We reinvest a portion of our profits into educational and healthcare initiatives in the mining communities we work with.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <div className="w-24 h-[2px] bg-gold-primary mx-auto mb-6"></div>
            </div>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold mb-3">What makes a gemstone ethically sourced?</h3>
                <p className="text-gray-600">
                  Ethically sourced gemstones come from mines with fair labor practices, safe working conditions, minimal environmental impact, and transparency throughout the supply chain. They are obtained without funding conflict or exploitation.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold mb-3">How do you verify the origin of your gemstones?</h3>
                <p className="text-gray-600">
                  We maintain direct relationships with our suppliers and miners, personally visit sourcing locations, and document the journey of each gemstone. We also work with independent gemological laboratories that can verify origin through advanced testing methods.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold mb-3">What percentage of your gemstones are traceable to the source?</h3>
                <p className="text-gray-600">
                  We strive for 100% traceability in our gemstone collection. Currently, over 95% of our gemstones can be traced directly to their source mine, and we're working to reach full traceability across our entire inventory.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold mb-3">Do ethically sourced gemstones cost more?</h3>
                <p className="text-gray-600">
                  While ensuring ethical practices throughout the supply chain can sometimes add to costs, we work directly with mines to eliminate unnecessary middlemen, allowing us to offer fair prices while maintaining high ethical standards.
                </p>
              </div>
              
              <div className="pb-6">
                <h3 className="text-xl font-bold mb-3">How can customers learn more about a specific gemstone's origin?</h3>
                <p className="text-gray-600">
                  Each of our gemstones comes with documentation of its origin and journey. For significant purchases, we provide a detailed provenance report. Customers can also request additional information about any stone's sourcing at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6">Experience Our Ethical Difference</h2>
            <p className="text-gray-600 mb-8">
              Browse our collection of ethically sourced gemstones and experience luxury with a clear conscience.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/gemstones"
                className="px-8 py-3 bg-gold-primary hover:bg-gold-dark text-white rounded-sm transition-colors text-lg font-medium inline-block"
              >
                Explore Gemstones
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-white rounded-sm transition-colors text-lg font-medium inline-block"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
