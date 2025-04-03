import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Sell Your Gemstones With Us | Transilk',
  description: 'Partner with Transilk to sell your premium gemstones and jewelry. We offer competitive pricing, expert consultation, and secure transactions.',
};

export default function SellWithUsPage() {
  return (
    <main className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative">
        <div className="h-[60vh] w-full relative">
          <Image
            src="https://images.pexels.com/photos/9428809/pexels-photo-9428809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
            alt="Premium gemstones collection"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-indigo-900/70"></div>
          
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 text-white">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                  Sell Your <span className="text-gold-gradient">Premium Gemstones</span> With Us
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-white/90">
                  Turn your precious stones into profit with our expert team
                </p>
                <Link 
                  href="#contact-form"
                  className="inline-block px-8 py-3 bg-gold-primary hover:bg-gold-dark text-white rounded-sm transition-colors text-lg font-medium"
                >
                  Get Started Today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Sell with Transilk?</h2>
            <div className="w-24 h-[2px] bg-gold-primary mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg">
              We offer a premium selling experience with competitive pricing, expert gemologists, 
              and a global network of high-end buyers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Competitive Pricing",
                description: "We offer fair market value for your gemstones based on quality, rarity, and current market trends."
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Expert Authentication",
                description: "Our certified gemologists will authenticate and evaluate your pieces with precision and transparency."
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                ),
                title: "Global Network",
                description: "Access our international network of collectors, jewelers, and enthusiasts looking for premium stones."
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: "Secure Transactions",
                description: "Enjoy peace of mind with our secure handling, insured shipping, and protected payment processes."
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Virtual Consultations",
                description: "Can't visit in person? Schedule a virtual consultation for preliminary evaluations and discussions."
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: "Transparent Process",
                description: "Our step-by-step selling process ensures you're informed at every stage, from evaluation to payment."
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-md transition-shadow">
                <div className="text-gold-primary mb-4 flex justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Selling Process</h2>
            <div className="w-24 h-[2px] bg-gold-primary mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A simple and transparent process designed to maximize value for your precious stones
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gray-200"></div>
              
              {/* Process steps */}
              <div className="space-y-16 relative">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold mb-2 text-gold-primary">Step 1: Initial Submission</h3>
                      <p className="text-gray-600">
                        Fill out our online form with details and photos of your gemstones or jewelry. Our specialists will review and contact you within 48 hours.
                      </p>
                    </div>
                  </div>
                  <div className="z-10 flex-shrink-0 w-10 h-10 rounded-full bg-gold-primary border-4 border-white flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div className="md:w-1/2 md:pl-12 invisible md:visible"></div>
                </div>
                
                {/* Step 2 */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 invisible md:visible"></div>
                  <div className="z-10 flex-shrink-0 w-10 h-10 rounded-full bg-gold-primary border-4 border-white flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div className="md:w-1/2 md:pl-12 md:text-left mb-6 md:mb-0">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold mb-2 text-gold-primary">Step 2: Professional Evaluation</h3>
                      <p className="text-gray-600">
                        Once we receive your items, our gemologists will conduct a thorough assessment to determine authenticity, quality, and market value.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold mb-2 text-gold-primary">Step 3: Pricing Proposal</h3>
                      <p className="text-gray-600">
                        We&apos;ll present you with a detailed pricing proposal, including market analysis and our competitive offer. You&apos;ll have time to consider and discuss.
                      </p>
                    </div>
                  </div>
                  <div className="z-10 flex-shrink-0 w-10 h-10 rounded-full bg-gold-primary border-4 border-white flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div className="md:w-1/2 md:pl-12 invisible md:visible"></div>
                </div>
                
                {/* Step 4 */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 invisible md:visible"></div>
                  <div className="z-10 flex-shrink-0 w-10 h-10 rounded-full bg-gold-primary border-4 border-white flex items-center justify-center">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div className="md:w-1/2 md:pl-12 md:text-left">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold mb-2 text-gold-primary">Step 4: Payment & Documentation</h3>
                      <p className="text-gray-600">
                        Upon agreement, we process your payment through your preferred method and provide complete documentation of the transaction.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Seller Success Stories</h2>
            <div className="w-24 h-[2px] bg-gold-primary mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from sellers who have successfully partnered with us
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "I inherited several gemstones from my grandmother but had no idea of their worth. Transilk provided a thorough evaluation and offered a price that exceeded my expectations.",
                author: "Sarah Johnson",
                location: "New York, USA",
                image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600"
              },
              {
                quote: "As a collector downsizing my investment portfolio, I appreciated Transilk's transparent process and fair pricing. Their global reach helped me get top dollar for my rare sapphires.",
                author: "Michael Chang",
                location: "London, UK",
                image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"
              },
              {
                quote: "The virtual consultation process was seamless. I was able to sell my emerald collection without ever leaving my home, and the team's expertise gave me complete confidence.",
                author: "Priya Patel",
                location: "Mumbai, India",
                image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="mb-6">
                  <svg className="w-8 h-8 text-gold-primary/40" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M10 8c-4.418 0-8 3.582-8 8s3.582 8 8 8c4.418 0 8-3.582 8-8s-3.582-8-8-8zM20 24h4v-4h-4v4zM20 8v4h4v4h4v-8c0-2.2-1.8-4-4-4h-4z" />
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
      
      {/* Contact Form */}
      <section id="contact-form" className="py-16 bg-indigo-900 text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Get Started Today</h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                Fill out the form below to begin the process of selling your gemstones with us.
                Our team will review your submission and contact you within 48 hours.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-5">
                {/* Form Section */}
                <div className="p-8 lg:col-span-3">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Submit Your Gems</h3>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Location
                        </label>
                        <input
                          type="text"
                          id="location"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="City, Country"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="itemType" className="block text-sm font-medium text-gray-700 mb-1">
                        Item Type
                      </label>
                      <select
                        id="itemType"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="">Select item type</option>
                        <option value="loose-gemstones">Loose Gemstones</option>
                        <option value="jewelry">Jewelry with Gemstones</option>
                        <option value="collection">Collection of Items</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Item Description
                      </label>
                      <textarea
                        id="description"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Please describe your items in detail, including type, carat weight, color, clarity, and any certifications you may have."
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Photos (optional)
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-indigo-500 transition-colors">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="mt-1 text-sm text-gray-500">
                          Drag and drop image files, or <span className="text-indigo-600 font-medium">browse</span>
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          Max 5 images, JPG or PNG, up to 5MB each
                        </p>
                        <input type="file" className="hidden" multiple accept="image/*" />
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="terms"
                        className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                        I agree to the Transilk <Link href="/terms" className="text-indigo-600 hover:text-indigo-800">terms and conditions</Link> and acknowledge that my information will be used in accordance with the <Link href="/privacy" className="text-indigo-600 hover:text-indigo-800">privacy policy</Link>.
                      </label>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-indigo-900 hover:bg-indigo-800 text-white font-medium rounded-md transition-colors"
                    >
                      Submit Your Inquiry
                    </button>
                  </form>
                </div>
                
                {/* Info Section */}
                <div className="bg-indigo-800 text-white p-8 lg:col-span-2">
                  <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                  
                  <div className="space-y-6">
                    <p className="text-white/90">
                      For immediate assistance or if you prefer to speak with someone directly:
                    </p>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="h-6 w-6 text-gold-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium">Call Us</h4>
                        <p className="mt-1">
                          <a href="tel:+18005551234" className="hover:text-gold-primary transition-colors">
                            +1 (800) 555-1234
                          </a>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="h-6 w-6 text-gold-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium">Email Us</h4>
                        <p className="mt-1">
                          <a href="mailto:sell@transilk.com" className="hover:text-gold-primary transition-colors">
                            sell@transilk.com
                          </a>
                        </p>
                      </div>
                    </div>
                    
                    <div className="pt-6 mt-6 border-t border-indigo-700">
                      <h4 className="text-lg font-medium mb-4">What Happens Next?</h4>
                      <ol className="space-y-3 text-white/80">
                        <li className="flex items-start">
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-gold-primary/20 text-gold-primary text-sm font-medium mr-3">1</span>
                          <span>We review your submission within 48 hours</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-gold-primary/20 text-gold-primary text-sm font-medium mr-3">2</span>
                          <span>Our specialist contacts you to discuss next steps</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-gold-primary/20 text-gold-primary text-sm font-medium mr-3">3</span>
                          <span>We arrange for secure shipping or in-person evaluation</span>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="w-24 h-[2px] bg-gold-primary mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about selling your gemstones with Transilk
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "What types of gemstones do you purchase?",
                  answer: "We purchase a wide range of high-quality gemstones including but not limited to diamonds, rubies, sapphires, emeralds, alexandrite, spinels, and other precious and semi-precious stones. We are particularly interested in rare, untreated stones of exceptional quality."
                },
                {
                  question: "Do you buy jewelry as well as loose gemstones?",
                  answer: "Yes, we purchase both loose gemstones and fine jewelry pieces that feature quality gemstones. This includes antique and vintage pieces, designer jewelry, and custom creations."
                },
                {
                  question: "How do you determine the value of my gemstones?",
                  answer: "Our valuation process considers multiple factors including the gemstone's type, weight, color, clarity, cut, treatments (if any), origin, rarity, current market demand, and accompanying certification. We use industry-standard grading practices and current market data to ensure fair valuations."
                },
                {
                  question: "Do I need to have my gemstones certified before selling?",
                  answer: "While certification from respected laboratories (like GIA, GRS, AGL) can increase value and expedite the selling process, it's not mandatory. Our gemologists can evaluate uncertified stones, but we may recommend certification for high-value pieces to maximize their value."
                },
                {
                  question: "How long does the selling process take?",
                  answer: "The timeline varies depending on the complexity and value of your items. A straightforward transaction can be completed in 1-2 weeks, while more complex collections or rare pieces may take 3-4 weeks to properly evaluate and market to our network."
                },
                {
                  question: "Is there any cost to me for the evaluation?",
                  answer: "There is no cost for our initial consultation and preliminary evaluation. If your items require detailed laboratory certification or specialized appraisals, we'll discuss these potential costs with you beforehand and obtain your approval."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <p className="text-gray-600 mb-4">
                Have more questions? We&apos;re here to help.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center text-indigo-900 hover:text-indigo-700 transition-colors font-medium"
              >
                Contact our team for more information
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
