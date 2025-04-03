import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'How Our Auctions Work | Transilk',
  description: 'Learn about the auction process at Transilk, from registration to bidding and winning. Discover our transparent, secure system for acquiring premium gemstones and jewelry.',
};

export default function HowAuctionsWorkPage() {
  return (
    <main className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative">
        <div className="h-[50vh] w-full relative">
          <Image
            src="https://images.pexels.com/photos/3826678/pexels-photo-3826678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
            alt="Auction process"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary/80"></div>
          
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                How Our <span className="text-gold-gradient">Auctions</span> Work
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                A comprehensive guide to participating in our exclusive gemstone and jewelry auctions
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-16 h-[2px] bg-gold-primary mx-auto mb-6"></div>
              <p className="text-gray-700 text-lg leading-relaxed">
                At Transilk, we&apos;ve created a secure, transparent auction system that connects 
                buyers with exceptional gemstones and jewelry pieces. Our curated auctions 
                feature authenticated items, detailed descriptions, and competitive bidding, 
                ensuring a fair and exciting experience for all participants.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gold-primary mb-10">
              <h2 className="text-2xl font-bold mb-3">Why Choose Our Auctions?</h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gold-primary mt-1 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Authenticated Items:</strong> Every piece is verified by our gemologists and comes with proper certification.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gold-primary mt-1 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Transparent Process:</strong> Clear rules, detailed item descriptions, and open bidding history.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gold-primary mt-1 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Exclusive Access:</strong> Opportunities to bid on rare and one-of-a-kind pieces not available elsewhere.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gold-primary mt-1 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Secure Transactions:</strong> Protected payment processing and insured shipping options.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Auction Process Steps */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The Auction Process</h2>
            <div className="w-24 h-[2px] bg-gold-primary mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From registration to receiving your item, here&apos;s our step-by-step guide to participating in Transilk auctions
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            {/* Step 1: Registration & Verification */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 items-center">
              <div className="md:col-span-4 order-2 md:order-1">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <Image 
                    src="https://images.pexels.com/photos/7944165/pexels-photo-7944165.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Registration process"
                    width={500}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              
              <div className="md:col-span-8 order-1 md:order-2">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gold-primary rounded-full flex items-center justify-center mr-4 text-white text-xl font-bold flex-shrink-0">
                    1
                  </div>
                  <h3 className="text-2xl font-bold">Registration & Verification</h3>
                </div>
                
                <div className="pl-16">
                  <p className="text-gray-700 mb-4">
                    Begin by creating a Transilk account and completing our secure verification process. 
                    This protects all participants and ensures the integrity of our auctions.
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-gold-primary/20 text-gold-primary flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                        <span className="text-xs font-medium">•</span>
                      </div>
                      <p className="text-gray-600"><strong>Create Account:</strong> Sign up with your email and basic information</p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-gold-primary/20 text-gold-primary flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                        <span className="text-xs font-medium">•</span>
                      </div>
                      <p className="text-gray-600"><strong>Identity Verification:</strong> Complete our KYC (Know Your Customer) process</p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-gold-primary/20 text-gold-primary flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                        <span className="text-xs font-medium">•</span>
                      </div>
                      <p className="text-gray-600"><strong>Payment Method:</strong> Add a valid payment method to enable bidding</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 italic">
                    Verification typically takes 1-2 business days. You&apos;ll receive email confirmation once approved.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Step 2: Browse & Research */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 items-center">
              <div className="md:col-span-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gold-primary rounded-full flex items-center justify-center mr-4 text-white text-xl font-bold flex-shrink-0">
                    2
                  </div>
                  <h3 className="text-2xl font-bold">Browse & Research</h3>
                </div>
                
                <div className="pl-16">
                  <p className="text-gray-700 mb-4">
                    Explore upcoming and active auctions. Each listing includes detailed information about the item, 
                    including high-resolution images, specifications, provenance, and certification details.
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-gold-primary/20 text-gold-primary flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                        <span className="text-xs font-medium">•</span>
                      </div>
                      <p className="text-gray-600"><strong>Browse Categories:</strong> Filter auctions by gemstone type, jewelry category, price range</p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-gold-primary/20 text-gold-primary flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                        <span className="text-xs font-medium">•</span>
                      </div>
                      <p className="text-gray-600"><strong>Study Details:</strong> Review specifications, certifications, and condition reports</p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-gold-primary/20 text-gold-primary flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                        <span className="text-xs font-medium">•</span>
                      </div>
                      <p className="text-gray-600"><strong>Ask Questions:</strong> Contact our specialists for additional information if needed</p>
                    </div>
                  </div>
                  
                    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                    <h4 className="font-medium text-gold-primary mb-2">Expert Tip</h4>
                    <p className="text-sm text-gray-600">
                      Set up alerts for specific gemstone types or jewelry pieces you&apos;re interested in. 
                      You&apos;ll receive notifications when matching items are listed for auction.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-4">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <Image 
                    src="https://images.pexels.com/photos/5370804/pexels-photo-5370804.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Browsing gemstone details"
                    width={500}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
            
            {/* Step 3: Bidding Process */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 items-center">
              <div className="md:col-span-4 order-2 md:order-1">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <Image 
                    src="https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Online bidding"
                    width={500}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              
              <div className="md:col-span-8 order-1 md:order-2">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gold-primary rounded-full flex items-center justify-center mr-4 text-white text-xl font-bold flex-shrink-0">
                    3
                  </div>
                  <h3 className="text-2xl font-bold">Bidding Process</h3>
                </div>
                
                <div className="pl-16">
                  <p className="text-gray-700 mb-4">
                    Place bids on items that interest you. Our system offers multiple bidding options to suit your preferences.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-5 rounded-lg border border-gray-200">
                      <h4 className="font-semibold mb-2 text-primary">Standard Bidding</h4>
                      <p className="text-gray-600 text-sm">
                        Manually place bids at or above the current minimum bid increment. 
                        Monitor the auction and increase your bid as needed.
                      </p>
                    </div>
                    
                    <div className="bg-white p-5 rounded-lg border border-gray-200">
                      <h4 className="font-semibold mb-2 text-primary">Maximum Bidding</h4>
                      <p className="text-gray-600 text-sm">
                        Set your maximum bid amount and our system will automatically 
                        bid incrementally on your behalf up to your limit.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-gold-primary/20 text-gold-primary flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                        <span className="text-xs font-medium">•</span>
                      </div>
                      <p className="text-gray-600"><strong>Bid Increments:</strong> Predetermined amounts that increase based on the current bid level</p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-gold-primary/20 text-gold-primary flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                        <span className="text-xs font-medium">•</span>
                      </div>
                      <p className="text-gray-600"><strong>Outbid Notifications:</strong> Instant alerts when someone outbids you</p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-gold-primary/20 text-gold-primary flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                        <span className="text-xs font-medium">•</span>
                      </div>
                      <p className="text-gray-600"><strong>Reserve Price:</strong> Some items have a minimum price that must be met for the sale to complete</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Step 4: Winning & Payment */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 items-center">
              <div className="md:col-span-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gold-primary rounded-full flex items-center justify-center mr-4 text-white text-xl font-bold flex-shrink-0">
                    4
                  </div>
                  <h3 className="text-2xl font-bold">Winning & Payment</h3>
                </div>
                
                <div className="pl-16">
                  <p className="text-gray-700 mb-4">
                    If you&apos;re the highest bidder when the auction closes, congratulations! You&apos;ll receive a winning notification 
                    with payment instructions. We offer several secure payment methods for your convenience.
                  </p>
                  
                  <div className="bg-white p-5 rounded-lg border border-gray-200 mb-6">
                    <h4 className="font-semibold mb-3 text-primary">Payment Options</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="text-center p-3 border rounded">
                        <p className="text-sm font-medium">Credit Card</p>
                      </div>
                      <div className="text-center p-3 border rounded">
                        <p className="text-sm font-medium">Wire Transfer</p>
                      </div>
                      <div className="text-center p-3 border rounded">
                        <p className="text-sm font-medium">PayPal</p>
                      </div>
                      <div className="text-center p-3 border rounded">
                        <p className="text-sm font-medium">Crypto</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-gold-primary/20 text-gold-primary flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                        <span className="text-xs font-medium">•</span>
                      </div>
                      <p className="text-gray-600"><strong>Buyer&apos;s Premium:</strong> Standard 15% fee added to the hammer price</p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-gold-primary/20 text-gold-primary flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                        <span className="text-xs font-medium">•</span>
                      </div>
                      <p className="text-gray-600"><strong>Payment Deadline:</strong> Full payment required within 3 business days of auction close</p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-gold-primary/20 text-gold-primary flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                        <span className="text-xs font-medium">•</span>
                      </div>
                      <p className="text-gray-600"><strong>Invoice:</strong> Detailed breakdown of costs including item price, premium, taxes, and shipping</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-4">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <Image 
                    src="https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Payment process"
                    width={500}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
            
            {/* Step 5: Shipping & Delivery */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4 order-2 md:order-1">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <Image 
                    src="https://images.pexels.com/photos/5910953/pexels-photo-5910953.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Secure packaging and shipping"
                    width={500}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              
              <div className="md:col-span-8 order-1 md:order-2">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gold-primary rounded-full flex items-center justify-center mr-4 text-white text-xl font-bold flex-shrink-0">
                    5
                  </div>
                  <h3 className="text-2xl font-bold">Shipping & Delivery</h3>
                </div>
                
                <div className="pl-16">
                  <p className="text-gray-700 mb-4">
                    Upon payment confirmation, we&apos;ll carefully package and ship your item with full insurance.
                    All shipments include tracking information and delivery confirmation.
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-gold-primary/20 text-gold-primary flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                        <span className="text-xs font-medium">•</span>
                      </div>
                      <p className="text-gray-600"><strong>Secure Packaging:</strong> Discreet, cushioned packaging to protect your valuable purchase</p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-gold-primary/20 text-gold-primary flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                        <span className="text-xs font-medium">•</span>
                      </div>
                      <p className="text-gray-600"><strong>Insurance:</strong> Full value insurance included with all shipments</p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-gold-primary/20 text-gold-primary flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                        <span className="text-xs font-medium">•</span>
                      </div>
                      <p className="text-gray-600"><strong>Shipping Options:</strong> Standard and expedited shipping available worldwide</p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-gold-primary/20 text-gold-primary flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                        <span className="text-xs font-medium">•</span>
                      </div>
                      <p className="text-gray-600"><strong>Documentation:</strong> Full gemological certification and authenticity documents included</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600">
                      <strong className="text-primary">International Buyers:</strong> Please note that import duties, taxes, and customs clearance fees 
                      are the responsibility of the buyer. We provide all necessary documentation to facilitate customs clearance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Auction Rules */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Auction Rules & Policies</h2>
              <div className="w-24 h-[2px] bg-gold-primary mx-auto mb-6"></div>
              <p className="text-gray-600">
                To ensure a fair and transparent auction environment, please familiarize yourself with our auction rules
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <svg className="w-5 h-5 text-gold-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Bidding Rules
                  </h3>
                  
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-gold-primary mr-2">•</span>
                      All bids are legally binding commitments to purchase
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold-primary mr-2">•</span>
                      Bids cannot be retracted once placed
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold-primary mr-2">•</span>
                      Minimum bid increments must be followed
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold-primary mr-2">•</span>
                      Sniping (last-second bidding) is permitted, but we recommend using max bids
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold-primary mr-2">•</span>
                      Auctions with reserve prices will not complete if the reserve is not met
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <svg className="w-5 h-5 text-gold-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Payment & Settlement
                  </h3>
                  
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-gold-primary mr-2">•</span>
                      15% buyer&apos;s premium applies to all successful bids
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold-primary mr-2">•</span>
                      Payment due within 3 business days of auction close
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold-primary mr-2">•</span>
                      Non-payment may result in account suspension
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold-primary mr-2">•</span>
                      Sales tax and import duties are buyer&apos;s responsibility
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold-primary mr-2">•</span>
                      No cancellations after successful bidding
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <svg className="w-5 h-5 text-gold-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Item Condition & Return Policy
                </h3>
                
                <div className="text-gray-700 space-y-4">
                  <p>
                    All items are thoroughly inspected and accurately described. Each listing includes detailed condition information 
                    and any known flaws or imperfections are fully disclosed.
                  </p>
                  
                  <p>
                    Due to the unique nature of auction items, all sales are final. However, in the rare event that 
                    an item is significantly misrepresented, we offer a 7-day inspection period after delivery. 
                    If the item does not match its description or certification, please contact us immediately for resolution.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <p className="text-gray-600 mb-6">
                For complete details on our auction terms and conditions, please review our full policy document.
              </p>
              
              <Link
                href="/auctions/terms"
                className="inline-block px-6 py-2 border-2 border-gold-primary text-gold-primary hover:bg-gold-primary hover:text-white rounded-sm transition-colors font-medium"
              >
                View Full Auction Terms & Conditions
              </Link>
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
              Common questions about our auction process
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "How do I know the gemstones are authentic?",
                  answer: "All gemstones offered in our auctions come with certification from respected gemological laboratories such as GIA, GRS, or AGL. Additionally, our in-house gemologists verify each item before listing."
                },
                {
                  question: "What happens if I win multiple auctions?",
                  answer: "If you win multiple auctions that end at similar times, we can combine shipping to reduce costs. You'll receive a single invoice for all won items, with the option to pay for everything at once."
                },
                {
                  question: "Can I inspect items before bidding?",
                  answer: "While physical inspection isn't typically possible due to our global bidder base, we provide high-resolution images, 360° views, and detailed condition reports. For high-value items, we may offer virtual inspections via video call with our gemologists."
                },
                {
                  question: "What is a reserve price?",
                  answer: "A reserve price is the minimum amount the seller will accept for an item. If bidding doesn't reach the reserve price, the item remains unsold. Listings will indicate if a reserve price exists, though the exact amount isn't disclosed."
                },
                {
                  question: "How are shipping costs calculated?",
                  answer: "Shipping costs depend on the item value, destination country, and chosen shipping method. All shipments include full insurance and tracking. Estimated shipping costs are displayed before you place a bid."
                },
                {
                  question: "What if an item is damaged during shipping?",
                  answer: "All shipments are fully insured against loss or damage. In the unlikely event that your item arrives damaged, contact us immediately with photos documenting the condition, and we'll initiate the insurance claim process."
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
                Still have questions about our auction process?
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center text-gold-primary hover:text-gold-dark transition-colors font-medium"
              >
                Contact our auction specialists
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Bidding?</h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Join thousands of collectors worldwide who have found extraordinary gemstones and jewelry through our auctions
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/auctions/register"
                className="px-8 py-3 bg-gold-primary hover:bg-gold-dark text-white rounded-sm transition-colors text-lg font-medium"
              >
                Register for Auctions
              </Link>
              <Link
                href="/auctions"
                className="px-8 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-sm transition-colors text-lg font-medium"
              >
                Browse Current Auctions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
