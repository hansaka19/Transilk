import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Register for Auctions | Transilk',
  description: 'Register to participate in our exclusive gemstone and jewelry auctions. Gain access to rare pieces and competitive bidding opportunities.',
};

export default function AuctionRegistrationPage() {
  return (
    <main className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative">
        <div className="h-[40vh] w-full relative">
          <Image
            src="https://images.pexels.com/photos/5797997/pexels-photo-5797997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
            alt="Auction registration"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary/70"></div>
          
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 text-white">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                  Register for <span className="text-gold-gradient">Auctions</span>
                </h1>
                <p className="text-xl text-white/90">
                  Join our exclusive auction community and bid on extraordinary gemstones and jewelry pieces
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Registration Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Form Column */}
              <div className="lg:col-span-8">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold mb-6">Create Your Auction Account</h2>
                  
                  <form className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b">Personal Information</h3>
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Address Information */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b">Address Information</h3>
                      <div className="grid grid-cols-1 gap-6">
                        <div>
                          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                            Street Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="address"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                              City <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="city"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                              State/Province <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="state"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                              Postal/ZIP Code <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="postalCode"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                              Country <span className="text-red-500">*</span>
                            </label>
                            <select
                              id="country"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                              required
                            >
                              <option value="">Select Country</option>
                              <option value="US">United States</option>
                              <option value="CA">Canada</option>
                              <option value="GB">United Kingdom</option>
                              <option value="AU">Australia</option>
                              <option value="LK">Sri Lanka</option>
                              {/* More countries would go here */}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Account Security */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b">Account Security</h3>
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                            required
                          />
                          <p className="mt-1 text-xs text-gray-500">
                            Minimum 8 characters, at least one uppercase letter, one number, and one special character
                          </p>
                        </div>
                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Bidding Preferences */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b">Bidding Preferences</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">
                            Types of Items You&apos;re Interested In
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {['Gemstones', 'Jewelry', 'Diamonds', 'Colored Stones', 'Vintage', 'Modern Design'].map((item) => (
                              <label key={item} className="flex items-center">
                                <input
                                  type="checkbox"
                                  name="interests"
                                  value={item.toLowerCase().replace(' ', '-')}
                                  className="h-4 w-4 text-gold-primary focus:ring-gold-primary border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-700">{item}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="bidRange" className="block text-sm font-medium text-gray-700 mb-1">
                            Typical Bid Range
                          </label>
                          <select
                            id="bidRange"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                          >
                            <option value="">Select Range</option>
                            <option value="under-1000">Under $1,000</option>
                            <option value="1000-5000">$1,000 - $5,000</option>
                            <option value="5000-10000">$5,000 - $10,000</option>
                            <option value="10000-25000">$10,000 - $25,000</option>
                            <option value="25000-50000">$25,000 - $50,000</option>
                            <option value="over-50000">Over $50,000</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="notifications" className="block text-sm font-medium text-gray-700 mb-1">
                            Notification Preferences
                          </label>
                          <div className="space-y-2">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                name="notifications"
                                value="auction-start"
                                className="h-4 w-4 text-gold-primary focus:ring-gold-primary border-gray-300 rounded"
                                defaultChecked
                              />
                              <span className="ml-2 text-sm text-gray-700">Notify me when auctions begin</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                name="notifications"
                                value="outbid"
                                className="h-4 w-4 text-gold-primary focus:ring-gold-primary border-gray-300 rounded"
                                defaultChecked
                              />
                              <span className="ml-2 text-sm text-gray-700">Notify me when I am outbid</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                name="notifications"
                                value="new-items"
                                className="h-4 w-4 text-gold-primary focus:ring-gold-primary border-gray-300 rounded"
                                defaultChecked
                              />
                              <span className="ml-2 text-sm text-gray-700">Notify me of new items matching my interests</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Terms and Conditions */}
                    <div className="space-y-4 border-t border-gray-200 pt-6">
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          className="mt-1 h-4 w-4 text-gold-primary focus:ring-gold-primary border-gray-300 rounded"
                          required
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          I agree to the <Link href="/auctions/terms" className="text-gold-primary hover:text-gold-dark">Auction Terms & Conditions</Link> and acknowledge that all bids are legally binding commitments to purchase.
                        </span>
                      </label>
                      
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          className="mt-1 h-4 w-4 text-gold-primary focus:ring-gold-primary border-gray-300 rounded"
                          required
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          I confirm that I am at least 18 years of age and have the legal capacity to enter into binding contracts.
                        </span>
                      </label>
                      
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          className="mt-1 h-4 w-4 text-gold-primary focus:ring-gold-primary border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          I would like to receive email newsletters about upcoming auctions, special events, and exclusive offers.
                        </span>
                      </label>
                    </div>
                    
                    <div className="text-center pt-4">
                      <button
                        type="submit"
                        className="px-8 py-3 bg-gold-primary hover:bg-gold-dark text-white rounded-sm transition-colors text-lg font-medium"
                      >
                        Register Now
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              
              {/* Information Column */}
              <div className="lg:col-span-4">
                <div className="sticky top-24">
                  {/* Benefits of Registration */}
                  <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h3 className="text-xl font-bold mb-4 text-gray-900">Benefits of Registration</h3>
                    <ul className="space-y-3">
                      {[
                        'Access to exclusive auction events',
                        'Ability to bid on rare and exceptional gemstones',
                        'Email notifications for items matching your interests',
                        'Detailed auction history and tracking',
                        'Early access to upcoming auction catalogs'
                      ].map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-gold-primary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Verification Process */}
                  <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h3 className="text-xl font-bold mb-4 text-gray-900">Verification Process</h3>
                    <p className="text-gray-700 mb-4">
                      After registration, we&apos;ll verify your account through the following steps:
                    </p>
                    <ol className="space-y-3 pl-6 list-decimal text-gray-700">
                      <li>Email verification (immediate)</li>
                      <li>Identity verification (1-2 business days)</li>
                      <li>Payment method verification (depends on method)</li>
                    </ol>
                    <p className="mt-4 text-sm text-gray-600">
                      Note: Some high-value auctions may require additional verification steps.
                    </p>
                  </div>
                  
                  {/* Need Help? */}
                  <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-bold mb-3 text-gray-900">Need Help?</h3>
                    <p className="text-gray-700 mb-4">
                      If you have any questions about the registration process or need assistance, our team is here to help.
                    </p>
                    <div className="space-y-3">
                      <a href="tel:+18005551234" className="flex items-center text-gold-primary hover:text-gold-dark">
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        +1 (800) 555-1234
                      </a>
                      <a href="mailto:auctions@transilk.com" className="flex items-center text-gold-primary hover:text-gold-dark">
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        auctions@transilk.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Upcoming Auctions Teaser */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Upcoming Auctions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Preview some of our exciting upcoming auctions that you&apos;ll be able to participate in after registration
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Rare Sapphires Collection",
                date: "October 15, 2023",
                image: "https://images.pexels.com/photos/5370794/pexels-photo-5370794.jpeg?auto=compress&cs=tinysrgb&w=600",
                items: 24
              },
              {
                title: "Estate Jewelry Auction",
                date: "October 28, 2023",
                image: "https://images.pexels.com/photos/1616096/pexels-photo-1616096.jpeg?auto=compress&cs=tinysrgb&w=600",
                items: 38
              },
              {
                title: "Investment Grade Diamonds",
                date: "November 5, 2023",
                image: "https://images.pexels.com/photos/11706768/pexels-photo-11706768.jpeg?auto=compress&cs=tinysrgb&w=600",
                items: 16
              }
            ].map((auction, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 relative">
                  <Image
                    src={auction.image}
                    alt={auction.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-1">{auction.title}</h3>
                  <div className="flex justify-between text-sm text-gray-600 mb-3">
                    <span>{auction.date}</span>
                    <span>{auction.items} items</span>
                  </div>
                  <Link 
                    href="/auctions"
                    className="text-gold-primary hover:text-gold-dark text-sm font-medium inline-flex items-center"
                  >
                    View Preview
                    <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link
              href="/auctions"
              className="px-6 py-2 border-2 border-gold-primary text-gold-primary hover:bg-gold-primary hover:text-white rounded-sm transition-colors font-medium inline-flex items-center"
            >
              View All Upcoming Auctions
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
