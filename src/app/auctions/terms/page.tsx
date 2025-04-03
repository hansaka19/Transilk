import Link from 'next/link';

export const metadata = {
  title: 'Auction Terms & Conditions | Transilk',
  description: 'Detailed terms and conditions for participating in Transilk gemstone and jewelry auctions. Learn about bidding rules, buyer responsibilities, and payment policies.',
};

const AuctionTermsPage = () => {
  return (
    <main className="pt-24 pb-16">
      {/* Header Section */}
      <section className="bg-primary py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Auction Terms & Conditions</h1>
            <div className="w-24 h-[2px] bg-gold-primary mx-auto mb-6"></div>
            <p className="text-white/80">
              Please review these terms carefully before participating in our auctions.
            </p>
          </div>
        </div>
      </section>
      
      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-500 italic mb-8">
                Last updated: October 15, 2023
              </p>
              
              <p>
                These Auction Terms and Conditions (&ldquo;Terms&rdquo;) govern your participation in any auction (&ldquo;Auction&rdquo;) 
                conducted by Transilk (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By registering to bid, you agree to be bound by these Terms.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4 pb-2 border-b border-gray-200">
                1. Registration and Eligibility
              </h2>
              
              <div className="pl-4 space-y-3">
                <p>
                  <strong>1.1 Age Requirement:</strong> You must be at least 18 years of age to register and participate in our Auctions.
                </p>
                <p>
                  <strong>1.2 Registration Process:</strong> All bidders must complete our registration process, which includes:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Providing accurate personal information</li>
                  <li>Verifying your identity through our KYC (Know Your Customer) process</li>
                  <li>Providing valid payment information</li>
                  <li>Accepting these Terms</li>
                </ul>
                <p>
                  <strong>1.3 Account Security:</strong> You are responsible for maintaining the confidentiality of your account information and password. You are responsible for all activities that occur under your account.
                </p>
                <p>
                  <strong>1.4 Right to Refuse:</strong> We reserve the right to refuse registration, suspend, or terminate the account of any user at our sole discretion.
                </p>
              </div>
              
              <h2 className="text-2xl font-bold mt-8 mb-4 pb-2 border-b border-gray-200">
                2. Bidding Rules and Procedures
              </h2>
              
              <div className="pl-4 space-y-3">
                <p>
                  <strong>2.1 Binding Bids:</strong> All bids are legally binding offers to purchase the item at the bid price. Once placed, bids cannot be retracted.
                </p>
                <p>
                  <strong>2.2 Bid Increments:</strong> Bids must follow the predetermined increment schedule for each auction. The current bid increment will be displayed on the auction page.
                </p>
                <p>
                  <strong>2.3 Reserve Prices:</strong> Some items may have a reserve price. If the reserve price is not met, the item will not be sold. The existence of a reserve price will be indicated on the auction listing, though the exact amount will not be disclosed.
                </p>
                <p>
                  <strong>2.4 Maximum Bidding:</strong> Our system allows you to set a maximum bid amount. The system will automatically bid on your behalf up to your maximum amount as needed.
                </p>
                <p>
                  <strong>2.5 Auction Closing:</strong> An auction closes at the scheduled end time. However, if a bid is placed within the last 2 minutes of an auction, the closing time will be extended by 2 minutes to prevent sniping.
                </p>
                <p>
                  <strong>2.6 Technical Issues:</strong> While we strive to ensure a smooth auction experience, we are not responsible for technical difficulties you may encounter when placing bids. We recommend placing bids well in advance of auction closing.
                </p>
              </div>
              
              <h2 className="text-2xl font-bold mt-8 mb-4 pb-2 border-b border-gray-200">
                3. Winning Bids and Payment
              </h2>
              
              <div className="pl-4 space-y-3">
                <p>
                  <strong>3.1 Winning Notification:</strong> If you are the highest bidder when an auction closes and any reserve price has been met, you will receive a winning notification and invoice by email.
                </p>
                <p>
                  <strong>3.2 Buyer&apos;s Premium:</strong> A buyer&apos;s premium of 15% will be added to the hammer price (final bid amount). The buyer&apos;s premium is part of the total purchase price.
                </p>
                <p>
                  <strong>3.3 Payment Deadline:</strong> Payment must be received within 3 business days of auction close. Failure to pay within this timeframe may result in:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Forfeiture of the item</li>
                  <li>Account suspension</li>
                  <li>Being banned from future auctions</li>
                  <li>Liability for the difference if the item sells for less in a subsequent auction</li>
                </ul>
                <p>
                  <strong>3.4 Payment Methods:</strong> We accept the following payment methods:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Credit Card (Visa, MasterCard, American Express)</li>
                  <li>Wire Transfer</li>
                  <li>PayPal</li>
                  <li>Cryptocurrency (Bitcoin, Ethereum)</li>
                </ul>
                <p>
                  <strong>3.5 Taxes and Duties:</strong> The buyer is responsible for all applicable taxes, import duties, and customs fees. These are not included in the purchase price.
                </p>
              </div>
              
              <h2 className="text-2xl font-bold mt-8 mb-4 pb-2 border-b border-gray-200">
                4. Item Condition and Authentication
              </h2>
              
              <div className="pl-4 space-y-3">
                <p>
                  <strong>4.1 Item Descriptions:</strong> We strive to describe all items accurately. All gemstones and jewelry pieces come with detailed condition reports and certification information.
                </p>
                <p>
                  <strong>4.2 Authentication:</strong> All items are authenticated by qualified gemologists. Relevant certificates from recognized laboratories (GIA, GRS, AGL, etc.) will be provided where available.
                </p>
                <p>
                  <strong>4.3 Photographs:</strong> While we make every effort to accurately represent items in photographs, variations in color and appearance may occur due to lighting and display differences.
                </p>
                <p>
                  <strong>4.4 Inspection Period:</strong> Upon receipt of your item, you have 7 days to inspect it and notify us of any significant discrepancies between the item and its description.
                </p>
              </div>
              
              <h2 className="text-2xl font-bold mt-8 mb-4 pb-2 border-b border-gray-200">
                5. Shipping and Delivery
              </h2>
              
              <div className="pl-4 space-y-3">
                <p>
                  <strong>5.1 Shipping Methods:</strong> All items are shipped via secure, insured courier services. Tracking information will be provided upon shipment.
                </p>
                <p>
                  <strong>5.2 Shipping Costs:</strong> Shipping costs are additional to the purchase price and will be included in your invoice. Costs vary based on destination, value, and shipping method.
                </p>
                <p>
                  <strong>5.3 Insurance:</strong> All shipments are fully insured for the purchase price. In the event of loss or damage during shipping, you must notify us immediately for claim processing.
                </p>
                <p>
                  <strong>5.4 Delivery Timeline:</strong> While we strive for prompt shipping, delivery timelines can vary based on destination and customs processing. We are not responsible for delays caused by customs or carrier issues.
                </p>
                <p>
                  <strong>5.5 International Shipments:</strong> For international shipments, the buyer is responsible for all duties, taxes, and customs fees. We will provide all necessary documentation to facilitate customs clearance.
                </p>
              </div>
              
              <h2 className="text-2xl font-bold mt-8 mb-4 pb-2 border-b border-gray-200">
                6. Returns and Refunds
              </h2>
              
              <div className="pl-4 space-y-3">
                <p>
                  <strong>6.1 Limited Return Policy:</strong> Due to the unique nature of auction items, all sales are generally final. However, returns may be accepted under the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Significant misrepresentation of the item in the listing</li>
                  <li>Authenticity concerns verified by an independent expert</li>
                  <li>Item damaged during shipping (subject to inspection)</li>
                </ul>
                <p>
                  <strong>6.2 Return Process:</strong> To initiate a return, you must contact us within 7 days of receiving the item with detailed information about the issue and supporting documentation.
                </p>
                <p>
                  <strong>6.3 Refund Processing:</strong> If a return is approved, we will issue a refund once the item is received and inspected. The refund will be processed using the original payment method.
                </p>
                <p>
                  <strong>6.4 Restocking Fee:</strong> A restocking fee of 5% may apply to returned items unless the return is due to our error.
                </p>
              </div>
              
              <h2 className="text-2xl font-bold mt-8 mb-4 pb-2 border-b border-gray-200">
                7. Privacy and Data Protection
              </h2>
              
              <div className="pl-4 space-y-3">
                <p>
                  <strong>7.1 Data Collection:</strong> We collect personal information necessary for auction participation, including but not limited to name, address, contact information, and payment details.
                </p>
                <p>
                  <strong>7.2 Data Usage:</strong> Your data will be used to:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Process bids and payments</li>
                  <li>Ship purchased items</li>
                  <li>Communicate about auctions and purchases</li>
                  <li>Verify identity and prevent fraud</li>
                </ul>
                <p>
                  <strong>7.3 Data Protection:</strong> We implement appropriate security measures to protect your personal information. For more details, please review our <Link href="/privacy" className="text-gold-primary hover:underline">Privacy Policy</Link>.
                </p>
              </div>
              
              <h2 className="text-2xl font-bold mt-8 mb-4 pb-2 border-b border-gray-200">
                8. Dispute Resolution
              </h2>
              
              <div className="pl-4 space-y-3">
                <p>
                  <strong>8.1 Good Faith Resolution:</strong> We strive to resolve all disputes in good faith. Please contact our customer service team with any concerns.
                </p>
                <p>
                  <strong>8.2 Arbitration:</strong> If a dispute cannot be resolved through direct communication, the matter will be referred to binding arbitration in accordance with the laws of Sri Lanka.
                </p>
                <p>
                  <strong>8.3 Governing Law:</strong> These Terms are governed by the laws of Sri Lanka, without regard to its conflict of law principles.
                </p>
              </div>
              
              <h2 className="text-2xl font-bold mt-8 mb-4 pb-2 border-b border-gray-200">
                9. Limitation of Liability
              </h2>
              
              <div className="pl-4 space-y-3">
                <p>
                  <strong>9.1 Liability Cap:</strong> Our maximum liability for any claim related to these Terms or an auction shall not exceed the purchase price paid for the item.
                </p>
                <p>
                  <strong>9.2 Excluded Damages:</strong> We shall not be liable for any indirect, special, incidental, or consequential damages.
                </p>
                <p>
                  <strong>9.3 Force Majeure:</strong> We are not liable for any failure to perform due to causes beyond our reasonable control, including but not limited to acts of God, war, terrorism, pandemic, natural disaster, or significant market disruption.
                </p>
              </div>
              
              <h2 className="text-2xl font-bold mt-8 mb-4 pb-2 border-b border-gray-200">
                10. Modifications to Terms
              </h2>
              
              <div className="pl-4 space-y-3">
                <p>
                  <strong>10.1 Updates:</strong> We may update these Terms from time to time. The most current version will always be posted on our website.
                </p>
                <p>
                  <strong>10.2 Notice:</strong> Significant changes will be communicated via email to registered users. Your continued participation in our auctions after such changes constitutes acceptance of the updated Terms.
                </p>
              </div>
              
              <div className="mt-10 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold mb-3">Contact Information</h3>
                <p className="mb-4">
                  If you have any questions about these Terms, please contact us:
                </p>
                <ul className="space-y-2">
                  <li><strong>Email:</strong> <a href="mailto:auctions@transilk.com" className="text-gold-primary hover:underline">auctions@transilk.com</a></li>
                  <li><strong>Phone:</strong> <a href="tel:+94112345678" className="text-gold-primary hover:underline">+94 11 234 5678</a></li>
                  <li><strong>Address:</strong> 123 Gem Street, Colombo, Sri Lanka</li>
                </ul>
              </div>
              
              <div className="mt-10 text-center">
                <p className="text-gray-500 text-sm italic">
                  By registering for our auctions, you acknowledge that you have read, understood, and agree to these Terms and Conditions.
                </p>
                
                <div className="mt-6">
                  <Link
                    href="/auctions/register"
                    className="inline-block px-6 py-3 bg-gold-primary hover:bg-gold-dark text-white rounded-sm transition-colors font-medium"
                  >
                    Register for Auctions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AuctionTermsPage;
