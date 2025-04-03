import Link from 'next/link';

const GetStarted = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover how easy it is to find your perfect gemstone or jewelry piece with our simple process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-secondary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-secondary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Our Collection</h3>
              <p className="text-gray-600">
                Explore our extensive catalog of premium gemstones and jewelry pieces, with detailed information about each item.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-secondary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-secondary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Consultation</h3>
              <p className="text-gray-600">
                Schedule a free consultation with our gemologists who can answer your questions and provide personalized recommendations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-secondary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-secondary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Purchase</h3>
              <p className="text-gray-600">
                Complete your purchase with our secure checkout process, including authentication certificates and insurance options.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link
              href="/shop"
              className="inline-block px-8 py-3 bg-secondary hover:bg-secondary-dark text-white rounded-md transition-colors text-lg font-medium"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
