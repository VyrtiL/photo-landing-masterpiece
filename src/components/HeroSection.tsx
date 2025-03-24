
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80',
    title: "Запечатлейте прекрасные моменты жизни",
    subtitle: 'Профессиональная фотография, которая расскажет вашу историю'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1920&q=80',
    title: 'Каждый кадр рассказывает историю',
    subtitle: 'Создание вечных воспоминаний через объектив'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1920&q=80',
    title: 'Искусство через объектив',
    subtitle: 'Где видение встречается со страстью в каждом кадре'
  }
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const nextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(current === slides.length - 1 ? 0 : current + 1);
      setIsTransitioning(false);
    }, 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(current === 0 ? slides.length - 1 : current - 1);
      setIsTransitioning(false);
    }, 500);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    // If swipe is more than 50px, change slide
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    setTouchStart(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [current]);

  return (
    <section 
      id="home" 
      className="relative h-screen w-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            'absolute inset-0 w-full h-full transition-opacity duration-1000',
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          )}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-out"
            style={{ 
              backgroundImage: `url(${slide.image})`,
              transform: index === current ? 'scale(1.05)' : 'scale(1)'
            }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30" />
          
          {/* Content */}
          <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6">
            <h1 
              className={cn(
                'text-4xl md:text-5xl lg:text-7xl text-white font-display font-semibold max-w-4xl leading-tight mb-4 text-balance text-shadow-md',
                index === current ? 'animate-fade-in' : ''
              )}
            >
              {slide.title}
            </h1>
            <p 
              className={cn(
                'text-lg md:text-xl text-white/90 max-w-2xl text-balance text-shadow-sm mt-2 mb-8',
                index === current ? 'animate-fade-in' : ''
              )}
            >
              {slide.subtitle}
            </p>
            <a 
              href="#portfolio" 
              className={cn(
                'mt-8 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3 rounded-full',
                'hover:bg-white/20 transition-all duration-300 transform hover:scale-105',
                index === current ? 'animate-fade-in' : ''
              )}
            >
              Смотреть портфолио
            </a>
          </div>
        </div>
      ))}
      
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/40 transition-all duration-300 focus:outline-none hidden md:block"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/40 transition-all duration-300 focus:outline-none hidden md:block"
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300 focus:outline-none',
              index === current ? 'w-8 bg-white' : 'bg-white/40'
            )}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
