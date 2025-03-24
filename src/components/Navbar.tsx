import React, { useState, useEffect } from 'react';
import { Menu, X, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Главная', href: '#home' },
    { name: 'Портфолио', href: '#portfolio' },
    { name: 'Обо мне', href: '#about' },
    { name: 'Услуги', href: '#services' },
    { name: 'Отзывы', href: '#testimonials' },
    { name: 'Контакты', href: '#contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a 
          href="#home" 
          className="flex items-center gap-2 text-xl font-display font-medium tracking-tight"
        >
          <Camera size={24} className="text-primary" />
          <span className={cn(
            'transition-colors duration-300',
            isScrolled ? 'text-primary' : 'text-white text-shadow-sm'
          )}>ФотоАрт</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-all duration-300 hover:text-primary relative',
                'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary',
                'after:transition-all after:duration-300 hover:after:w-full',
                isScrolled ? 'text-primary/80' : 'text-white/90 text-shadow-sm'
              )}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'md:hidden focus:outline-none transition-colors duration-300',
            isScrolled ? 'text-primary' : 'text-white'
          )}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 bg-white dark:bg-black z-40 transform transition-transform duration-300 ease-in-out md:hidden pt-20',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col items-center gap-8 pt-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-primary hover:text-primary/70 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
