import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Custom Jewelry Design | Transilk',
  description: 'Create your dream piece of jewelry with our expert designers. From concept to creation, we bring your vision to life with the finest gemstones and craftsmanship.',
};

export default function CustomDesignPage() {
  return (
    <main className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative">
        <div className="h-[60vh] w-full relative">
          <Image
            src="https://images.pexels.com/photos/9628104/pexels-photo-9628104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
            alt="Jewelry craftsman working on custom design"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/50"></div>
          
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 text-white">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                  Bespoke <span className="text-gold-gradient">Jewelry Design</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-white/90">
                  Bring your vision to life with our expert craftsmen and exceptional gemstones
                </p>
                <a 
                  href="#design-form"
                  className="inline-block px-8 py-3 bg-gold-primary hover:bg-gold-dark text-white rounded-sm transition-colors text-lg font-medium"
                >
                  Start Your Design Journey
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Custom Design Process</h2>
            <div className="w-24 h-[2px] bg-gold-primary mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From initial concept to final creation, we guide you through every step of crafting your unique piece
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Consultation",
                description: "Begin with a personalized consultation to discuss your vision, preferences, and budget. Our designers will help shape your initial concept.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                )
              },
              {
                step: 2,
                title: "Design & Sketch",
                description: "Our designers create detailed sketches and 3D renderings of your piece, refining until it perfectly matches your vision.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                )
              },
              {
                step: 3,
                title: "Gemstone Selection",
                description: "Select from our collection of premium gemstones or use one you already own. We ensure every stone meets our exceptional quality standards.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                  </svg>
                )
              },
              {
                step: 4,
                title: "Creation",
                description: "Our master craftsmen meticulously create your piece by hand, employing traditional techniques and modern technology for perfect execution.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                )
              }
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gold-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <div className="text-gold-primary">
                      {step.icon}
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 -mr-4 bg-gold-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
          
          {/* Process Timeline - Mobile Only */}
          <div className="md:hidden mt-12">
            <div className="h-1 bg-gray-200 relative">
              <div className="absolute left-0 top-0 h-full bg-gold-primary" style={{ width: '75%' }}></div>
              {[25, 50, 75, 100].map((percent, i) => (
                <div 
                  key={i} 
                  className={`absolute top-1/2 transform -translate-y-1/2 h-4 w-4 rounded-full border-2 ${i <= 2 ? 'bg-gold-primary border-gold-primary' : 'bg-white border-gray-300'}`} 
                  style={{ left: `${percent - 1}%` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Previous Work */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Bespoke Creations</h2>
            <div className="w-24 h-[2px] bg-gold-primary mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A glimpse of our custom designed pieces, each crafted to reflect the unique vision of our clients
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Sapphire Halo Engagement Ring",
                description: "A 3.5 carat Ceylon sapphire set in platinum with diamond halo",
                image: "https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=600"
              },
              {
                title: "Emerald Art Deco Necklace",
                description: "Custom Art Deco inspired emerald and diamond pendant in white gold",
                image: "https://images.pexels.com/photos/1457801/pexels-photo-1457801.jpeg?auto=compress&cs=tinysrgb&w=600"
              },
              {
                title: "Ruby Vintage Earrings",
                description: "Burmese ruby drop earrings with antique-inspired diamond settings",
                image: "https://images.pexels.com/photos/10874827/pexels-photo-10874827.jpeg?auto=compress&cs=tinysrgb&w=600"
              },
              {
                title: "Diamond Eternity Band",
                description: "Custom eternity band with alternating princess and baguette diamonds",
                image: "https://images.pexels.com/photos/2697516/pexels-photo-2697516.jpeg?auto=compress&cs=tinysrgb&w=600"
              },
              {
                title: "Multi-Gem Statement Bracelet",
                description: "18K gold bracelet featuring client's family birthstones in a modern design",
                image: "https://images.pexels.com/photos/12456282/pexels-photo-12456282.jpeg?auto=compress&cs=tinysrgb&w=600"
              },
              {
                title: "Bespoke Diamond Solitaire",
                description: "Minimalist 2 carat oval diamond engagement ring with hidden details",
                image: "https://images.pexels.com/photos/11706768/pexels-photo-11706768.jpeg?auto=compress&cs=tinysrgb&w=600"
              }
            ].map((work, index) => (
              <div key={index} className="group overflow-hidden rounded-lg relative luxury-card">
                <div className="aspect-square relative">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <h3 className="text-white font-bold text-lg mb-2">{work.title}</h3>
                    <p className="text-white/80 text-sm">{work.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Expert Craftsmen */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Master Craftsmen</h2>
              <div className="w-16 h-[2px] bg-gold-primary mb-8"></div>
              
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                At Transilk, your custom piece is created by master craftsmen with decades of experience in fine jewelry.
                Our team combines traditional techniques with modern precision to bring your vision to life with
                exceptional quality and attention to detail.
              </p>
              
              <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                Each custom project is personally overseen by our head designer and master jeweler, ensuring
                the highest standards at every stage of creation. From intricate pavé settings to complex metalwork,
                our artisans have the expertise to execute even the most ambitious designs.
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gold-primary">
                <blockquote className="italic text-gray-700">
                  &ldquo;Creating a truly bespoke piece is about understanding not just the design, but the story and meaning behind it.
                  We don&apos;t just craft jewelry – we create heirlooms that will be cherished for generations.&rdquo;
                </blockquote>
                <p className="mt-3 text-gold-primary font-medium">— David Chen, Head of Design</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden h-40 md:h-56 relative shadow-lg">
                  <Image 
                    src="https://images.pexels.com/photos/5370706/pexels-photo-5370706.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Jeweler working on custom piece"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden h-64 md:h-72 relative shadow-lg">
                  <Image 
                    src="https://images.pexels.com/photos/8989495/pexels-photo-8989495.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Setting a diamond"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-10">
                <div className="rounded-lg overflow-hidden h-64 md:h-72 relative shadow-lg">
                  <Image 
                    src="https://images.pexels.com/photos/9628104/pexels-photo-9628104.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Polishing a custom ring"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden h-40 md:h-56 relative shadow-lg">
                  <Image 
                    src="https://images.pexels.com/photos/3819538/pexels-photo-3819538.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Custom jewelry design sketch"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Client Testimonials</h2>
            <div className="w-24 h-[2px] bg-gold-primary mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from clients who have experienced our custom design process
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "The engagement ring Transilk created exceeded all my expectations. They transformed my rough idea into a stunning design that perfectly captures our story.",
                author: "Michael R.",
                location: "New York, USA",
                image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"
              },
              {
                quote: "Working with the design team was a joy from start to finish. They balanced my input with their expertise to create a unique anniversary gift that my wife absolutely adores.",
                author: "James L.",
                location: "London, UK",
                image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600"
              },
              {
                quote: "I had inherited gemstones from my grandmother and wanted to create something modern but respectful of their history. Transilk designed a piece that beautifully honors the past while looking toward the future.",
                author: "Elena T.",
                location: "Milan, Italy",
                image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm luxury-card">
                <div className="mb-6">
                  <svg className="w-8 h-8 text-gold-primary/40" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-6 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image 
                      src={testimonial.image} 
                      alt={testimonial.author}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Start Your Design Form */}
      <section id="design-form" className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Start Your Custom Design</h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                Tell us about your vision, and we&apos;ll help bring it to life. Fill out the form below to begin your
                bespoke jewelry journey.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <form className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                    >
                      <option value="">Select a budget range</option>
                      <option value="1000-3000">$1,000 - $3,000</option>
                      <option value="3000-5000">$3,000 - $5,000</option>
                      <option value="5000-10000">$5,000 - $10,000</option>
                      <option value="10000-25000">$10,000 - $25,000</option>
                      <option value="25000+">$25,000+</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="jewelryType" className="block text-sm font-medium text-gray-700 mb-1">
                    Type of Jewelry
                  </label>
                  <select
                    id="jewelryType"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                  >
                    <option value="">Select jewelry type</option>
                    <option value="ring">Ring (Engagement, Wedding, Fashion)</option>
                    <option value="necklace">Necklace or Pendant</option>
                    <option value="earrings">Earrings</option>
                    <option value="bracelet">Bracelet</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="gemPreference" className="block text-sm font-medium text-gray-700 mb-1">
                    Gemstone Preference
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['Diamond', 'Sapphire', 'Ruby', 'Emerald', 'Other'].map((gem) => (
                      <label key={gem} className="flex items-center">
                        <input
                          type="checkbox"
                          name="gemPreference"
                          value={gem.toLowerCase()}
                          className="h-4 w-4 text-gold-primary focus:ring-gold-primary border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{gem}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Describe Your Vision
                  </label>
                  <textarea
                    id="description"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                    placeholder="Please share details about your design ideas, inspiration, or any specific elements you'd like to include..."
                  ></textarea>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Inspiration Images (optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-gold-primary transition-colors">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-1 text-sm text-gray-500">
                      Drag and drop image files, or <span className="text-gold-primary font-medium">browse</span>
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Max 3 images, JPG or PNG, up to 5MB each
                    </p>
                    <input type="file" className="hidden" multiple accept="image/*" />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">
                    Desired Timeline
                  </label>
                  <select
                    id="timeline"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                  >
                    <option value="">Select timeline</option>
                    <option value="1-2-months">1-2 months</option>
                    <option value="3-4-months">3-4 months</option>
                    <option value="5-6-months">5-6 months</option>
                    <option value="6-plus-months">6+ months</option>
                  </select>
                </div>
                
                <div className="flex items-start mb-8">
                  <input
                    type="checkbox"
                    id="consent"
                    className="mt-1 h-4 w-4 text-gold-primary focus:ring-gold-primary border-gray-300 rounded"
                  />
                  <label htmlFor="consent" className="ml-2 block text-sm text-gray-700">
                    I consent to being contacted by Transilk regarding my custom design inquiry.
                    I understand my information will be handled according to the <Link href="/privacy" className="text-gold-primary hover:text-gold-dark">privacy policy</Link>.
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gold-primary hover:bg-gold-dark text-white rounded-sm transition-colors text-lg font-medium"
                >
                  Submit Design Request
                </button>
              </form>
            </div>
            
            <div className="mt-12 text-center text-white/80">
              <p>
                After submitting your request, a design consultant will contact you within 48 hours to
                discuss your project and schedule an initial consultation, either in person or virtually.
              </p>
              <div className="mt-4 flex justify-center space-x-6">
                <Link href="/contact" className="text-gold-primary hover:text-gold-light">
                  Contact Us Directly
                </Link>
                <Link href="/faq" className="text-gold-primary hover:text-gold-light">
                  FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
