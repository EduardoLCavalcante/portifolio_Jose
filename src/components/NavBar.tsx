
import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-4 backdrop-blur-md bg-background/80 shadow-md' 
          : 'py-6 bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-xl font-bold text-primary">dev.frontend</a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-6">
            <a href="#about" className="nav-link">Sobre</a>
            <a href="#skills" className="nav-link">Habilidades</a>
            <a href="#projects" className="nav-link">Projetos</a>
            <a href="#contact" className="nav-link">Contato</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
               className="text-foreground/80 hover:text-primary transition-colors">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
               className="text-foreground/80 hover:text-primary transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="mailto:email@example.com" 
               className="text-foreground/80 hover:text-primary transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground/80 hover:text-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md shadow-lg py-4 px-6 flex flex-col space-y-4 animate-fade-in">
          <a href="#about" className="nav-link" onClick={() => setIsMenuOpen(false)}>Sobre</a>
          <a href="#skills" className="nav-link" onClick={() => setIsMenuOpen(false)}>Habilidades</a>
          <a href="#projects" className="nav-link" onClick={() => setIsMenuOpen(false)}>Projetos</a>
          <a href="#contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contato</a>
          
          <div className="flex items-center space-x-4 pt-2">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
               className="text-foreground/80 hover:text-primary transition-colors">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
               className="text-foreground/80 hover:text-primary transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="mailto:email@example.com" 
               className="text-foreground/80 hover:text-primary transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
