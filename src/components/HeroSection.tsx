
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Layers, Database, Code2 } from 'lucide-react';
import { Button } from '../components/ui/button';

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.hidden-initially');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center px-6 pt-20 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Hero Content */}
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="hidden-initially stagger-1">
              <span className="inline-block text-primary font-mono text-sm md:text-base mb-2 tracking-wide">
                &lt;Olá, mundo /&gt;
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight hidden-initially stagger-2">
              Desenvolvedor <span className="text-gradient">Front-end</span>
            </h1>
            <p className="text-foreground/80 text-lg md:text-xl max-w-lg leading-relaxed hidden-initially stagger-3">
              Criando experiências web modernas e interativas com React, TailwindCSS e Supabase.
            </p>
            <div className="flex flex-wrap gap-4 hidden-initially stagger-4">
              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Entre em contato
              </Button>
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/10 rounded-full px-6"
                onClick={() => {
                  const projectsSection = document.getElementById('projects');
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Ver projetos
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center items-center hidden-initially stagger-4">
            <div className="relative">
              {/* Main code window */}
              <div className="glass-panel w-full max-w-lg p-6 animate-float">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="ml-4 text-xs text-foreground/60 font-mono">App.tsx</div>
                </div>
                <pre className="text-sm text-foreground/90 font-mono overflow-hidden">
                  <code>
                    <div><span className="text-blue-400">import</span> <span className="text-green-400">React</span> <span className="text-blue-400">from</span> <span className="text-green-400">'react'</span>;</div>
                    <div className="text-muted-foreground">// Componente principal</div>
                    <div><span className="text-blue-400">const</span> <span className="text-yellow-400">App</span> = () <span className="text-blue-400">=&gt;</span> {'{'}</div>
                    <div>&nbsp;&nbsp;<span className="text-blue-400">return</span> (</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-yellow-400">div</span> <span className="text-primary">className</span>=<span className="text-green-400">"app"</span>&gt;</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-yellow-400">Header</span> /&gt;</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-yellow-400">Hero</span> /&gt;</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-yellow-400">Projects</span> /&gt;</div>
                    <div className="animate-pulse-slow">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-yellow-400">Contact</span> /&gt;</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-yellow-400">div</span>&gt;</div>
                    <div>&nbsp;&nbsp;);</div>
                    <div>{'}'};</div>
                    <div></div>
                    <div><span className="text-blue-400">export</span> <span className="text-blue-400">default</span> <span className="text-yellow-400">App</span>;</div>
                  </code>
                </pre>
              </div>
              
              {/* Tech icons */}
              <div className="absolute -top-4 -right-4 glass-panel p-3 animate-fade-in-right" style={{ animationDelay: '1s' }}>
                <Layers className="text-primary" size={24} />
              </div>
              <div className="absolute top-1/3 -left-4 glass-panel p-3 animate-fade-in-left" style={{ animationDelay: '1.2s' }}>
                <Code2 className="text-blue-400" size={24} />
              </div>
              <div className="absolute -bottom-4 -left-4 glass-panel p-3 animate-fade-in-left" style={{ animationDelay: '1.5s' }}>
                <Database className="text-purple-400" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Down Button */}
      <div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 cursor-pointer animate-pulse-slow hidden-initially stagger-5"
        style={{animationDelay: '1.8s'}}
        onClick={scrollToNext}
      >
        <span className="text-sm text-foreground/70">Role para baixo</span>
        <ChevronDown className="text-primary" />
      </div>
    </section>
  );
};

export default HeroSection;
