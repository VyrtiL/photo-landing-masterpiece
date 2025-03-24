
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Image, Plus } from 'lucide-react';

// Portfolio categories and images
const categories = ['Все', 'Портреты', 'Пейзажи', 'Свадьбы', 'Коммерческие'];

const portfolioItems = [
  {
    id: 1,
    category: 'Портреты',
    image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=600&h=600&q=80',
    title: 'Городской портрет',
    description: 'Современная фотосессия в городе'
  },
  {
    id: 2,
    category: 'Пейзажи',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&h=600&q=80',
    title: 'Утренний туман',
    description: 'Горный пейзаж на рассвете'
  },
  {
    id: 3,
    category: 'Свадьбы',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=600&h=600&q=80',
    title: 'Вечная любовь',
    description: 'Весенняя свадебная церемония'
  },
  {
    id: 4,
    category: 'Коммерческие',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&h=600&q=80',
    title: 'Креативное рабочее пространство',
    description: 'Современный офис технологической компании'
  },
  {
    id: 5,
    category: 'Портреты',
    image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=600&h=600&q=80',
    title: 'Городские огни',
    description: 'Ночной городской портрет'
  },
  {
    id: 6,
    category: 'Пейзажи',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=600&h=600&q=80',
    title: 'Природное чудо',
    description: 'Дикая природа в естественной среде'
  }
];

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredItems, setFilteredItems] = useState(portfolioItems);
  const [selectedItem, setSelectedItem] = useState<(typeof portfolioItems)[0] | null>(null);
  const [isRevealed, setIsRevealed] = useState<boolean[]>(Array(portfolioItems.length).fill(false));

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredItems(portfolioItems);
    } else {
      setFilteredItems(portfolioItems.filter(item => item.category === activeCategory));
    }
  }, [activeCategory]);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setIsRevealed(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const elements = document.querySelectorAll('.portfolio-item');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, [filteredItems]);

  return (
    <section id="portfolio" className="py-24 bg-secondary/40">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">Портфолио</h2>
          <p className="text-muted-foreground">Исследуйте нашу разнообразную коллекцию фотографических работ</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'px-4 py-2 rounded-full text-sm transition-all duration-300',
                activeCategory === category
                  ? 'bg-primary text-white font-medium'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                'portfolio-item bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md transition-all duration-500',
                isRevealed[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              data-index={index}
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative overflow-hidden group cursor-pointer aspect-square">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Plus className="text-white w-12 h-12" />
                </div>
              </div>
              <div className="p-4">
                <span className="text-xs font-medium bg-secondary px-2 py-1 rounded-full">{item.category}</span>
                <h3 className="mt-2 text-lg font-display font-medium">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="mt-12 text-center">
          <button className="border border-primary text-primary hover:bg-primary/5 px-8 py-3 rounded-full transition-all duration-300">
            Загрузить еще
          </button>
        </div>

        {/* Lightbox Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setSelectedItem(null)}>
            <div className="relative max-w-4xl max-h-screen w-full animate-scale-in"
                onClick={(e) => e.stopPropagation()}>
              <button 
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
                onClick={() => setSelectedItem(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <img 
                src={selectedItem.image.replace('w=600&h=600', 'w=1200&h=900')} 
                alt={selectedItem.title} 
                className="w-full max-h-[80vh] object-contain"
              />
              <div className="bg-white dark:bg-gray-900 p-4">
                <h3 className="text-xl font-display font-semibold">{selectedItem.title}</h3>
                <p className="text-muted-foreground mt-1">{selectedItem.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
