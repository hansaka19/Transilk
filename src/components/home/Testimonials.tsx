'use client';
import { useState } from 'react';
import Image from 'next/image';

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Jennifer Anderson',
    role: 'Jewelry Collector',
    quote: 'The ruby I purchased from Transilk exceeded all my expectations. The color is vibrant and the certification process gave me complete confidence in my investment.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 2,
    name: 'Michael Roberts',
    role: 'Gemstone Enthusiast',
    quote: "I've been collecting gemstones for over 15 years, and Transilk offers some of the most unique and high-quality specimens I've encountered. Their attention to detail is impeccable.",
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 3,
    name: 'Sarah Thompson',
    role: 'Interior Designer',
    quote: 'Working with Transilk to source statement pieces for my clients has been a pleasure. Their customer service is exceptional and the gemstones are truly works of art.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
      
      {/* Diamond shapes in background */}
      <div className="absolute -top-20 -left-20 w-40 h-40 border border-gold-primary/20 rotate-45 opacity-20"></div>
      <div className="absolute top-40 -right-20 w-60 h-60 border border-gold-primary/10 rotate-45 opacity-10"></div>
      <div className="absolute -bottom-20 left-40 w-40 h-40 border border-gold-primary/30 rotate-45 opacity-30"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-gold-primary font-medium mb-3">TESTIMONIALS</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          
          {/* Decorative line */}
          <div className="w-24 h-[2px] bg-gold-primary mx-auto mb-6"></div>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our satisfied customers about their experience with Transilk&apos;s gemstones and service.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-lg shadow-xl p-8 md:p-12 border border-gold-light">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12">
              <div className="bg-gold-primary rounded-full p-3 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                </svg>
              </div>
            </div>
            
            <div className="flex flex-col items-center text-center mt-6">
              <p className="text-gray-700 text-lg md:text-xl mb-10 italic leading-relaxed">
                &ldquo;{testimonials[activeIndex].quote}&rdquo;
              </p>
              
              <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-gold-light shadow-lg">
                <Image
                  src={testimonials[activeIndex].avatar}
                  alt={testimonials[activeIndex].name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <h4 className="font-bold text-xl text-gray-900 mb-1">{testimonials[activeIndex].name}</h4>
              <p className="text-gold-primary font-medium">{testimonials[activeIndex].role}</p>
              
              <div className="mt-3 flex">
                <div className="flex justify-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-gold-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-10 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors focus:outline-none ${
                    activeIndex === index ? 'bg-gold-primary' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="absolute top-1/2 -left-5 transform -translate-y-1/2">
              <button
                onClick={prevTestimonial}
                className="bg-white rounded-full shadow-lg p-3 hover:bg-gold-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gold-primary"
                aria-label="Previous testimonial"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            
            <div className="absolute top-1/2 -right-5 transform -translate-y-1/2">
              <button
                onClick={nextTestimonial}
                className="bg-white rounded-full shadow-lg p-3 hover:bg-gold-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gold-primary"
                aria-label="Next testimonial"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
