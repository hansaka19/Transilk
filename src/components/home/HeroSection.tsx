import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="relative bg-gray-100">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Discover the Earth&apos;s Most Precious Treasures
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              At Transilk, we source the rarest and most exquisite gemstones from around the world. 
              Each stone is carefully selected for its exceptional quality, color, and character.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-secondary/10 p-3 mb-4">
                  <svg className="w-7 h-7 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-1">Ethically Sourced</h3>
                <p className="text-sm text-gray-600">Responsibly mined gemstones</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-secondary/10 p-3 mb-4">
                  <svg className="w-7 h-7 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-1">Certified Quality</h3>
                <p className="text-sm text-gray-600">GIA and AGS certified stones</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-secondary/10 p-3 mb-4">
                  <svg className="w-7 h-7 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-1">Value Assurance</h3>
                <p className="text-sm text-gray-600">Fair pricing and transparency</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-secondary/10 p-3 mb-4">
                  <svg className="w-7 h-7 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-1">Custom Orders</h3>
                <p className="text-sm text-gray-600">Tailored to your preferences</p>
              </div>
            </div>
            
            <Link
              href="/about"
              className="inline-flex items-center text-secondary hover:text-secondary-dark transition-colors font-medium"
            >
              Learn more about our process
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          
          {/* Image Grid */}
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden h-40 bg-gray-300 relative">
                <Image 
                  src="https://images.pexels.com/photos/1573242/pexels-photo-1573242.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Close-up of gemstones" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-56 bg-gray-300 relative">
                <Image 
                  src="https://images.pexels.com/photos/10347832/pexels-photo-10347832.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Gemstone crafting" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-6">
              <div className="rounded-lg overflow-hidden h-56 bg-gray-300 relative">
                <Image 
                  src="https://images.pexels.com/photos/4046718/pexels-photo-4046718.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Diamond jewelry" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-40 bg-gray-300 relative">
                <Image 
                  src="https://images.pexels.com/photos/8016930/pexels-photo-8016930.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Gemstone sorting" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
