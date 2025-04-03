import Slider from '@/components/slider/Slider';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import SellWithUs from '@/components/home/SellWithUs';
import GetStarted from '@/components/home/GetStarted';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';
import { heroSlides } from '@/data/sliderImages';

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* Hero Slider with Navbar */}
      <div className="relative h-screen">
        {/* Slider fills the entire viewport height */}
        <div className="h-full">
          <Slider 
            slides={heroSlides} 
            autoplayInterval={6000} 
            showDots={true}
            className="h-full"
          />
          
          {/* Enhanced gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent pointer-events-none"></div>
        </div>
        
        {/* Text overlay in the center of the slider */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto text-center text-white px-4 pt-16">
            {/* Decorative element */}
            <div className="flex justify-center mb-6">
              <div className="w-12 h-[2px] bg-gold-primary relative">
                <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-2 h-2 bg-gold-primary rotate-45"></div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-3 tracking-tight">
              Discover <span className="text-gold-primary">Extraordinary</span> Gemstones
            </h1>
            
            <div className="w-24 h-[1px] bg-gold-primary mx-auto my-6"></div>
            
            <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Exploring the world&apos;s finest natural treasures with unparalleled craftsmanship
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="#featured-products"
                className="px-8 py-3 bg-transparent hover:bg-gold-primary border-2 border-gold-primary text-gold-primary hover:text-white rounded-sm transition-colors text-lg font-medium"
              >
                Explore Collection
              </a>
              <a
                href="/about"
                className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-sm transition-colors text-lg font-medium"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Remove the navbar from here since it's now included in the layout */}
      
      {/* Decorative element between sections */}
      <div className="w-full overflow-hidden">
        <div className="w-24 h-[3px] mx-auto my-12 bg-gradient-to-r from-transparent via-gold-primary to-transparent relative">
          <div className="absolute -top-[4px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-gold-primary rounded-full"></div>
        </div>
      </div>
      
      {/* Display content below the slider */}
      <div id="featured-products">
        <FeaturedProducts />
      </div>
      
      {/* Decorative divider */}
      <div className="luxury-divider max-w-4xl mx-auto"></div>
      
      <div className="mt-16">
        <HeroSection />
      </div>
      
      <div className="mt-16">
        <SellWithUs />
      </div>
      
      <GetStarted />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
