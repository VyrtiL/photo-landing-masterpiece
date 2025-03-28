import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Camera, Award, Users, Heart } from 'lucide-react';

const stats = [
  { icon: <Camera className="w-6 h-6" />, value: '10+', label: 'Лет опыта' },
  { icon: <Award className="w-6 h-6" />, value: '150+', label: 'Выполненных проектов' },
  { icon: <Users className="w-6 h-6" />, value: '80+', label: 'Довольных клиентов' },
  { icon: <Heart className="w-6 h-6" />, value: '15+', label: 'Полученных наград' },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Parallax effect for the image
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      
      const section = sectionRef.current;
      const { left, top, width, height } = section.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      const elements = section.querySelectorAll('.parallax-layer');
      elements.forEach(element => {
        const el = element as HTMLElement;
        const speed = parseFloat(el.getAttribute('data-speed') || '5');
        el.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    };
    
    // Intersection observer for stats animation
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          statsRef.current?.classList.add('animate-fade-in');
        }
      },
      { threshold: 0.2 }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);
  
  return (
    <section id="about" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative parallax">
            <div className="relative rounded-lg overflow-hidden shadow-xl image-reveal">
              <img 
                src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80" 
                alt="Фотограф за работой" 
                className="w-full h-auto object-cover aspect-[3/4]"
              />
              
              {/* Decorative elements */}
              <div 
                className="absolute w-40 h-40 border-2 border-primary/20 rounded-lg -bottom-6 -left-6 parallax-layer" 
                data-speed="8"
              ></div>
              <div 
                className="absolute w-40 h-40 border-2 border-primary/20 rounded-lg -top-6 -right-6 parallax-layer" 
                data-speed="5"
              ></div>
              <div 
                className="absolute w-20 h-20 bg-secondary rounded-lg -top-4 -left-4 parallax-layer" 
                data-speed="10"
              ></div>
            </div>
          </div>
          
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6">Обо мне</h2>
            <p className="text-muted-foreground mb-6">
              Я увлеченный фотограф с более чем 10-летним профессиональным опытом. Мой подход сочетает техническое со��ершенство с художественным видением, чтобы создавать изображения, которые передают суть каждого момента.
            </p>
            <p className="text-muted-foreground mb-8">
              Будь то съемка пейзажей, портретов или мероприятий, я стремлюсь рассказать увлекательную визуальную историю, которая находит отклик у зрителей. Мои работы были представлены в различных публикациях и получили признание на международных фотоконкурсах.
            </p>
            
            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 opacity-0">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3">
                    {stat.icon}
                  </div>
                  <div className="font-display font-semibold text-2xl">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
