
import React, { useEffect } from 'react';
import { Code, Sparkles, Rocket } from 'lucide-react';

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
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 about-animate hidden-initially">
            Sobre <span className="text-gradient">Mim</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto about-animate hidden-initially">
            Desenvolvedor front-end apaixonado por criar interfaces modernas e experiências de usuário excepcionais.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-panel p-6 rounded-lg about-animate hidden-initially stagger-1">
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4">
              <Code className="text-primary" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Desenvolvimento</h3>
            <p className="text-foreground/70">
              Especialista em React, TailwindCSS e TypeScript para criar interfaces modernas e responsivas.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-lg about-animate hidden-initially stagger-2">
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4">
              <Sparkles className="text-blue-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">UI/UX Design</h3>
            <p className="text-foreground/70">
              Criação de experiências visuais intuitivas e atraentes, com foco na satisfação do usuário.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-lg about-animate hidden-initially stagger-3">
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4">
              <Rocket className="text-purple-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Backend Integration</h3>
            <p className="text-foreground/70">
              Experiência com Supabase para autenticação, banco de dados e integrações de API.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
