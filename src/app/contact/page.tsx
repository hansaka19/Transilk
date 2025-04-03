import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Contact Us | Transilk',
  description: 'Get in touch with our expert team for inquiries about our gemstones, jewelry collection, or custom orders. We\'re here to assist you.',
};

export default function ContactPage() {
  return (
    <main className="pt-24 pb-16">
      {/* Hero Banner */}
      <section className="relative">
        <div className="h-64 md:h-80 w-full relative">
          <Image
            src="https://images.pexels.com/photos/3768126/pexels-photo-3768126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
            alt="Transilk customer service"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary/70"></div>
          
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-3">
                Contact <span className="text-gold-primary">Us</span>
              </h1>
              <p className="text-lg text-white/90 max-w-xl mx-auto">
                We&apos;re here to answer your questions and provide expert guidance on your gemstone journey
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and our team will get back to you promptly. 
                Whether you have questions about our collection, need assistance with a purchase, 
                or want to inquire about custom orders, we&apos;re here to help.
              </p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
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
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="product">Product Inquiry</option>
                    <option value="custom">Custom Order</option>
                    <option value="support">Customer Support</option>
                    <option value="wholesale">Wholesale Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                    placeholder="How can we help you today?"
                  ></textarea>
                </div>
                
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="privacy"
                    className="mt-1 h-4 w-4 text-gold-primary focus:ring-gold-primary border-gray-300 rounded"
                  />
                  <label htmlFor="privacy" className="ml-2 block text-sm text-gray-600">
                    I agree to the {' '}
                    <Link href="/privacy-policy" className="text-gold-primary hover:text-gold-dark">
                      privacy policy
                    </Link>
                    {' '} and consent to being contacted regarding my inquiry.
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="px-6 py-3 bg-gold-primary hover:bg-gold-dark text-white rounded-md transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
              <div className="mb-10">
                <p className="text-gray-600 mb-8">
                  We value building relationships with our clients. Feel free to reach out through any of the following methods, 
                  or visit our showroom to explore our collection in person.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-10 w-10 bg-gold-primary/10 rounded-full flex items-center justify-center">
                        <svg className="h-5 w-5 text-gold-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Visit Our Showroom</h3>
                      <address className="mt-2 not-italic text-gray-600">
                        123 Gem Street<br />
                        Colombo, Sri Lanka<br />
                        10300
                      </address>
                      <p className="mt-1 text-gray-600 text-sm">
                        Open Monday - Saturday: 10am - 6pm
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-10 w-10 bg-gold-primary/10 rounded-full flex items-center justify-center">
                        <svg className="h-5 w-5 text-gold-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Call Us</h3>
                      <p className="mt-2 text-gray-600">
                        <a href="tel:+94111234567" className="hover:text-gold-primary transition-colors">
                          +94 11 123 4567
                        </a>
                      </p>
                      <p className="mt-1 text-gray-600 text-sm">
                        Customer support: Monday - Friday 9am - 8pm
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-10 w-10 bg-gold-primary/10 rounded-full flex items-center justify-center">
                        <svg className="h-5 w-5 text-gold-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Email Us</h3>
                      <p className="mt-2 text-gray-600">
                        <a href="mailto:info@transilk.com" className="hover:text-gold-primary transition-colors">
                          info@transilk.com
                        </a>
                      </p>
                      <p className="mt-1 text-gray-600 text-sm">
                        We respond to all inquiries within 24 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map */}
              <div className="rounded-lg overflow-hidden shadow-lg h-80 relative bg-gray-200">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.45932537288!2d79.76756101493651!3d6.922003946226142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1710325701889!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
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
              Find quick answers to common questions about our services, shipping, and gemstone quality
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {[
                {
                  question: "Do you ship internationally?",
                  answer: "Yes, we ship worldwide with fully insured delivery. International shipping typically takes 3-7 business days depending on the destination country."
                },
                {
                  question: "Are your gemstones certified?",
                  answer: "All our gemstones come with proper certification from internationally recognized gemological laboratories such as GIA, GRS, or AGL, ensuring authenticity and quality."
                },
                {
                  question: "Can I customize a jewelry piece?",
                  answer: "Absolutely! We offer bespoke jewelry design services. Our expert craftsmen can work with you to create a unique piece based on your preferences and requirements."
                },
                {
                  question: "What is your return policy?",
                  answer: "We offer a 30-day return policy for unworn items in their original condition. Custom pieces are non-returnable unless there is a manufacturing defect."
                },
                {
                  question: "How do I care for my gemstone jewelry?",
                  answer: "Each gemstone requires specific care. Generally, avoid harsh chemicals, store pieces separately to prevent scratches, and clean gently with mild soap and water. We provide detailed care instructions with each purchase."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <p className="text-gray-600 mb-4">
                Still have questions? We&apos;re here to help.
              </p>
              <Link
                href="mailto:support@transilk.com"
                className="inline-flex items-center text-gold-primary hover:text-gold-dark transition-colors font-medium"
              >
                Contact our support team
                <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-primary py-16 text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
            <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Subscribe to our newsletter for exclusive updates, new arrivals, and expert gemstone insights
            </p>
            
            <form className="flex flex-col sm:flex-row max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-l-md sm:rounded-none focus:outline-none focus:ring-2 focus:ring-gold-primary"
              />
              <button
                type="submit"
                className="mt-2 sm:mt-0 px-6 py-3 bg-gold-primary hover:bg-gold-dark text-white rounded-r-md sm:rounded-none transition-colors"
              >
                Subscribe
              </button>
            </form>
            
            <div className="mt-8 flex justify-center space-x-6">
              <a href="#" className="text-white hover:text-gold-primary transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-gold-primary transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-gold-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
