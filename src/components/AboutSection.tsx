
import React, { useEffect } from 'react';
import { Code, Rocket } from 'lucide-react';

const AboutSection = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const elements = document.querySelectorAll('.about-animate');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="about" className="py-16 px-4 md:py-20 md:px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 about-animate hidden-initially">
            Sobre <span className="text-gradient">Mim</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-sm md:text-base about-animate hidden-initially">
            Desenvolvedor front-end apaixonado por criar interfaces modernas e experiências de usuário excepcionais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div 
            className="glass-panel p-5 md:p-6 rounded-lg about-animate hidden-initially stagger-1 hover:shadow-lg hover:shadow-primary/20 transition-all duration-500 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-400 rounded-lg opacity-0 group-hover:opacity-30 blur-sm group-hover:animate-pulse-slow"></div>
            
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary rounded-full flex items-center justify-center mb-4 group-hover:animate-bounce">
                <Code className="text-primary" size={20} />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2">Desenvolvimento</h3>
              <p className="text-foreground/70 text-sm md:text-base">
                Especialista em React, TailwindCSS e TypeScript para criar interfaces modernas e responsivas.
              </p>
            </div>
          </div>

          <div 
            className="glass-panel p-5 md:p-6 rounded-lg about-animate hidden-initially stagger-2 hover:shadow-lg hover:shadow-purple-400/20 transition-all duration-500 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-primary rounded-lg opacity-0 group-hover:opacity-30 blur-sm group-hover:animate-pulse-slow"></div>
            
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary rounded-full flex items-center justify-center mb-4 group-hover:animate-bounce">
                <Rocket className="text-purple-400" size={20} />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2">Backend Integration</h3>
              <p className="text-foreground/70 text-sm md:text-base">
                Experiência com Supabase para autenticação, banco de dados e integrações de API.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
