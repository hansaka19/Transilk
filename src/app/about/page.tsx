import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'About Transilk - Our Story and Values',
  description: 'Learn about Transilk\'s mission, history, and commitment to providing the finest quality gemstones and jewelry from Sri Lanka.',
};

export default function AboutPage() {
  return (
    <main className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative">
        <div className="h-96 w-full relative">
          <Image
            src="https://images.pexels.com/photos/1573236/pexels-photo-1573236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
            alt="Transilk Gemstone Collection"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/40"></div>
        </div>
        
        <div className="container mx-auto px-4 relative -mt-20">
          <div className="bg-white shadow-xl rounded-lg p-8 md:p-12 max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-[2px] bg-gold-primary relative">
                <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-2 h-2 bg-gold-primary rotate-45"></div>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Story</h1>
            <p className="text-gray-600 text-lg text-center max-w-3xl mx-auto">
              Dedicated to uncovering the world&apos;s most extraordinary gemstones and transforming them into timeless pieces of art.
            </p>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Mission</h2>
              <div className="w-16 h-[2px] bg-gold-primary mb-8"></div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                At Transilk, we are passionate about connecting people with the earth&apos;s most precious treasures. 
                Our mission is to source and offer exceptional gemstones and jewelry pieces that celebrate the natural 
                beauty of these rare minerals while ensuring ethical practices throughout our supply chain.
              </p>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                We believe that every gemstone tells a story – of the earth&apos;s geological wonders, of the artisans who 
                reveal their beauty, and ultimately of the individuals who cherish them. Our goal is to help you find 
                pieces that resonate with your personal story and stand as enduring symbols of life&apos;s most meaningful moments.
              </p>
              
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 rounded-full bg-gold-primary/10 flex items-center justify-center flex-shrink-0 mr-6">
                  <svg className="w-8 h-8 text-gold-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Quality Without Compromise</h3>
                  <p className="text-gray-600">Every gemstone in our collection meets the highest standards of quality and authenticity.</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-gold-primary/10 flex items-center justify-center flex-shrink-0 mr-6">
                  <svg className="w-8 h-8 text-gold-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Global Reach, Local Impact</h3>
                  <p className="text-gray-600">Supporting local communities in Sri Lanka through sustainable and ethical sourcing practices.</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-5">
                <div className="rounded-lg overflow-hidden h-40 md:h-56 relative shadow-lg">
                  <Image 
                    src="https://images.pexels.com/photos/5370706/pexels-photo-5370706.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Gemstone mining in Sri Lanka"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden h-64 md:h-80 relative shadow-lg">
                  <Image 
                    src="https://images.pexels.com/photos/11879349/pexels-photo-11879349.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Craftsman working on jewelry"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-5 pt-10">
                <div className="rounded-lg overflow-hidden h-64 md:h-80 relative shadow-lg">
                  <Image 
                    src="https://images.pexels.com/photos/9992119/pexels-photo-9992119.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Gemstone selection process"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden h-40 md:h-56 relative shadow-lg">
                  <Image 
                    src="https://images.pexels.com/photos/10347828/pexels-photo-10347828.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Finished jewelry pieces"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Journey Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <div className="w-24 h-[2px] bg-gold-primary mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From humble beginnings to becoming a premier destination for fine gemstones and jewelry.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gray-200"></div>
              
              {/* Timeline items */}
              <div className="space-y-16 relative">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                      <h3 className="text-xl font-bold mb-2 text-gold-primary">2021</h3>
                      <h4 className="font-bold mb-2">Foundation</h4>
                      <p className="text-gray-600">
                        Transilk was founded with a vision to connect fine gemstone collectors with the exceptional stones of Sri Lanka.
                      </p>
                    </div>
                  </div>
                  <div className="z-10 flex-shrink-0 w-8 h-8 rounded-full bg-gold-primary border-4 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-12 invisible md:visible"></div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 invisible md:visible"></div>
                  <div className="z-10 flex-shrink-0 w-8 h-8 rounded-full bg-gold-primary border-4 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-12 md:text-left mb-6 md:mb-0">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                      <h3 className="text-xl font-bold mb-2 text-gold-primary">2022</h3>
                      <h4 className="font-bold mb-2">International Expansion</h4>
                      <p className="text-gray-600">
                        We expanded our operations globally, reaching collectors and enthusiasts across Europe and North America.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                      <h3 className="text-xl font-bold mb-2 text-gold-primary">2023</h3>
                      <h4 className="font-bold mb-2">Bespoke Jewelry Launch</h4>
                      <p className="text-gray-600">
                        Introduced our custom jewelry design service, allowing clients to create unique pieces with our exceptional gemstones.
                      </p>
                    </div>
                  </div>
                  <div className="z-10 flex-shrink-0 w-8 h-8 rounded-full bg-gold-primary border-4 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-12 invisible md:visible"></div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 invisible md:visible"></div>
                  <div className="z-10 flex-shrink-0 w-8 h-8 rounded-full bg-gold-primary border-4 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-12 md:text-left">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                      <h3 className="text-xl font-bold mb-2 text-gold-primary">Today</h3>
                      <h4 className="font-bold mb-2">Expanding Our Vision</h4>
                      <p className="text-gray-600">
                        Continuing to grow while maintaining our commitment to quality, ethics, and exceptional customer experiences.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <div className="w-24 h-[2px] bg-gold-primary mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team of experts brings decades of combined experience in gemology, jewelry design, and ethical sourcing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Alexander Mitchell",
                title: "Founder & CEO",
                image: "https://images.pexels.com/photos/5792641/pexels-photo-5792641.jpeg?auto=compress&cs=tinysrgb&w=600",
                bio: "With over 20 years in the gemstone industry, Alexander founded Transilk to share his passion for exceptional stones."
              },
              {
                name: "Samantha Perera",
                title: "Lead Gemologist",
                image: "https://images.pexels.com/photos/1586973/pexels-photo-1586973.jpeg?auto=compress&cs=tinysrgb&w=600",
                bio: "GIA-certified gemologist with expertise in identifying and grading precious stones from Sri Lanka and beyond."
              },
              {
                name: "David Chen",
                title: "Head of Design",
                image: "https://images.pexels.com/photos/3767392/pexels-photo-3767392.jpeg?auto=compress&cs=tinysrgb&w=600",
                bio: "Award-winning jewelry designer who transforms raw gemstones into breathtaking wearable art."
              },
              {
                name: "Amara Jayawardene",
                title: "Ethically Sourcing Director",
                image: "https://images.pexels.com/photos/3746314/pexels-photo-3746314.jpeg?auto=compress&cs=tinysrgb&w=600",
                bio: "Leads our efforts to ensure all gemstones are ethically sourced and supports sustainable mining practices."
              }
            ].map((member, index) => (
              <div key={index} className="luxury-card rounded-lg overflow-hidden group">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-gold-primary mb-3">{member.title}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        {/* Background diamond pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="diamond-pattern-light" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M25 0L50 25L25 50L0 25Z" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diamond-pattern-light)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Begin Your Journey With Us</h2>
            <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Whether you&apos;re looking for a special gemstone, custom jewelry design, or investment opportunities,
              we&apos;re here to guide you every step of the way.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/gemstones"
                className="px-8 py-3 bg-gold-primary hover:bg-gold-dark text-white rounded-sm transition-colors text-lg font-medium"
              >
                Explore Our Collection
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white/10 text-white rounded-sm transition-colors text-lg font-medium"
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
