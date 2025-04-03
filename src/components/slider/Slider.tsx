'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface SlideType {
  image: string;
  alt: string;
}

interface SliderProps {
  slides: SlideType[];
  autoplayInterval?: number;
  showDots?: boolean;
  className?: string;
}

const Slider = ({
  slides,
  autoplayInterval = 5000,
  showDots = true,
  className = '',
}: SliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), autoplayInterval);
  };

  // Handle autoplay
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, autoplayInterval);
    return () => clearInterval(interval);
  }, [nextSlide, autoplayInterval, isAutoPlaying]);

  // Pause autoplay when user interacts
  const handleInteraction = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), autoplayInterval);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="flex-shrink-0 w-full h-full relative">
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      {showDots && slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                goToSlide(index);
                handleInteraction();
              }}
              className={`h-3 w-3 rounded-full transition-colors focus:outline-none ${
                currentSlide === index ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Slider;
