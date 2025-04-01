
import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="py-12 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="border-t border-border pt-8 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <a href="#" className="text-xl font-bold text-primary">dev.frontend</a>
              <p className="text-foreground/60 text-sm mt-2 max-w-xs">
                Desenvolvedor Front-end especializado em criar experiências web modernas e interativas.
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end">
              <div className="flex space-x-4 mb-4">
                <a href="https://github.com/EduardoLCavalcante" target="_blank" rel="noopener noreferrer" 
                   className="text-foreground/60 hover:text-primary transition-colors p-2">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/joseecavalcante/" target="_blank" rel="noopener noreferrer" 
                   className="text-foreground/60 hover:text-primary transition-colors p-2">
                  <Linkedin size={20} />
                </a>
                <a href="mailto:eduardocavalcante131@gmail.com" 
                   className="text-foreground/60 hover:text-primary transition-colors p-2">
                  <Mail size={20} />
                </a>
              </div>
              <button 
                onClick={scrollToTop}
                className="flex items-center space-x-2 text-sm text-foreground/60 hover:text-primary transition-colors"
              >
                <span>Voltar ao topo</span>
                <ArrowUp size={16} />
              </button>
            </div>
          </div>
          
          <div className="text-center text-foreground/60 text-sm mt-8 pt-4 border-t border-border">
            <p>© {new Date().getFullYear()} dev.frontend. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
