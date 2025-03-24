import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { User, Mountain, Heart, Building, Camera, Check } from 'lucide-react';

const services = [
  {
    icon: <User className="w-6 h-6" />,
    title: 'Портретная фотография',
    description: 'Запечатлейте вашу индивидуальность и эмоции в тщательно продуманных профессиональных портретах.',
    features: ['Съемка в помещении/на улице', 'Профессиональная ретушь', 'Смена нескольких образов', 'Цифровая и печатная доставка']
  },
  {
    icon: <Mountain className="w-6 h-6" />,
    title: 'Пейзажная фотография',
    description: 'Потрясающие пейзажные изображения, которые демонстрируют красоту природы в мельчайших деталях.',
    features: ['Съемка в золотой час', 'Панорамные виды', 'Планирование погоды', 'Доступны художественные отпечатки']
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Свадебная фотография',
    description: 'Сохраните ваш особенный день с идеальным сочетанием непринужденных моментов и художественных композиций.',
    features: ['Полный день съемки', 'Второй фотограф', 'Сессия помолвки', 'Индивидуальный свадебный альбом']
  },
  {
    icon: <Building className="w-6 h-6" />,
    title: 'Коммерческая фотография',
    description: 'Профессиональные изображения для бизнеса, которые помогают эффективно представить продукты и услуги.',
    features: ['Продуктовая фотография', 'Корпоративные портреты', 'Недвижимость', 'Контент для социальных сетей']
  }
];

const ServicesSection = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems(prev => prev.includes(index) ? prev : [...prev, index]);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );
    
    const elements = document.querySelectorAll('.service-card');
    elements.forEach(el => observer.observe(el));
    
    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-white to-secondary/40 dark:from-black dark:to-gray-900/40">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">Мои услуги</h2>
          <p className="text-muted-foreground">
            Комплексные фотоуслуги, адаптированные под ваши уникальные потребности
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={cn(
                'service-card bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md border border-border transition-all duration-800',
                visibleItems.includes(index)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              )}
              data-index={index}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="p-6">
                <div className="w-14 h-14 rounded-full bg-secondary/50 flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-display font-medium mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm mb-5">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto pt-4 pb-4 px-6 border-t border-border">
                <a 
                  href="#contact" 
                  className="text-primary font-medium text-sm hover:underline inline-flex items-center gap-1"
                >
                  Заказать эту услугу
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">Нужно что-то особенное? Давайте обсудим ваши индивидуальные фотопотребности</p>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-all duration-300"
          >
            <Camera className="w-5 h-5" />
            Связаться со мной
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
