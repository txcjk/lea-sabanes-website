import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '#contact' },
  ];

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <header className="bg-linen py-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo & Title */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-teal text-white rounded-full flex items-center justify-center font-serif text-xl font-bold shadow-sm">
              LS
            </div>
            <div>
              <span className="font-serif text-2xl text-charcoal font-bold leading-none block">Léa Sabanès - EI</span>
              <span className="text-sm font-sans text-teal font-medium tracking-wide">Gestion Administrative</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.path.startsWith('#') ? (
                <a 
                  key={link.name} 
                  href={link.path} 
                  onClick={handleScrollToContact}
                  className="font-sans text-charcoal hover:text-peach transition-colors font-medium"
                >
                  {link.name}
                </a>
              ) : (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className="font-sans text-charcoal hover:text-peach transition-colors font-medium"
                >
                  {link.name}
                </Link>
              )
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-charcoal focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 mt-4 overflow-hidden"
          >
            <nav className="flex flex-col px-4 py-4 gap-4" aria-label="Navigation mobile">
              {navLinks.map((link) => (
                link.path.startsWith('#') ? (
                  <a 
                    key={link.name} 
                    href={link.path}
                    onClick={handleScrollToContact}
                    className="font-sans text-charcoal hover:text-peach transition-colors font-medium text-lg"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="font-sans text-charcoal hover:text-peach transition-colors font-medium text-lg"
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
