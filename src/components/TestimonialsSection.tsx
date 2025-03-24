import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Александра Зеленова',
    role: 'Свадебный клиент',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    quote: 'Работа с этим фотографом была лучшим решением для нашей свадьбы. Фотографии идеально запечатлели каждую эмоцию и особый момент. Настоящий мастер света и композиции!',
    rating: 5
  },
  {
    id: 2,
    name: 'Михаил Романов',
    role: 'Корпоративный клиент',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
    quote: 'Корпоративные портреты превзошли наши ожидания. Каждый член команды выглядел профессионально и в то же время доступно. Время выполнения заказа было впечатляюще быстрым без ущерба для качества.',
    rating: 5
  },
  {
    id: 3,
    name: 'София Чен',
    role: 'Портретная сессия',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80',
    quote: 'Я нервничала перед портретной сессией, но фотограф помог мне почувствовать себя комфортно. Результаты были потрясающими - у меня никогда не было фотографий, которые так хорошо передавали бы мою индивидуальность.',
    rating: 5
  },
  {
    id: 4,
    name: 'Давид Вильсон',
    role: 'Агент по недвижимости',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    quote: 'Фотографии объектов были исключительными. Каждое пространство было запечатлено в идеальном свете, что выделяло наши объявления среди конкурентов. Обязательно воспользуюсь этими услугами снова!',
    rating: 5
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slideTrackRef = useRef<HTMLDivElement>(null);
  const slideWidth = useRef<number>(0);
  
  const nextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  const prevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  useEffect(() => {
    const updateSlideWidth = () => {
      if (slideTrackRef.current) {
        const firstSlide = slideTrackRef.current.querySelector('.testimonial-slide');
        if (firstSlide) {
          slideWidth.current = firstSlide.clientWidth;
        }
      }
    };
    
    updateSlideWidth();
    window.addEventListener('resize', updateSlideWidth);
    
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateSlideWidth);
    };
  }, [isAnimating]);
  
  return (
    <section id="testimonials" className="py-24 bg-primary/5">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">Что говорят клиенты</h2>
          <p className="text-muted-foreground">
            Мнения людей, которые воспользовались моими фотоуслугами
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Testimonial Slider */}
          <div className="overflow-hidden relative">
            <div
              ref={slideTrackRef}
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="testimonial-slide min-w-full px-4 md:px-10"
                >
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg border border-border relative">
                    <Quote className="absolute top-6 right-6 w-12 h-12 text-secondary/40" />
                    
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-secondary/30">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-display font-medium text-lg">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < testimonial.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <blockquote className="text-lg italic mb-4">"{testimonial.quote}"</blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6 bg-white dark:bg-gray-900 shadow-md rounded-full p-2 z-10 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            disabled={isAnimating}
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-6 bg-white dark:bg-gray-900 shadow-md rounded-full p-2 z-10 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            disabled={isAnimating}
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setActiveIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  index === activeIndex ? 'w-8 bg-primary' : 'bg-gray-300 dark:bg-gray-700'
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
