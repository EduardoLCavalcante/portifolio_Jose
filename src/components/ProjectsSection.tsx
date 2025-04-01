
import React, { useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '../components/ui/button';

const projects = [
  {
    title: 'Dashboard App',
    description: 'Dashboard administrativo com autenticação Supabase, gráficos e análises em tempo real.',
    tags: ['React', 'TailwindCSS', 'Supabase', 'Recharts'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070',
    demoUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'E-commerce Platform',
    description: 'Plataforma de e-commerce completa com carrinho, pagamentos e gerenciamento de produtos.',
    tags: ['React', 'TypeScript', 'Supabase', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2070',
    demoUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Task Management',
    description: 'Aplicativo de gerenciamento de tarefas com arrastar e soltar, filtros e notificações.',
    tags: ['React', 'TailwindCSS', 'Supabase', 'DnD'],
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=2072',
    demoUrl: '#',
    repoUrl: '#',
  },
];

const ProjectsSection = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.projects-animate');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="projects" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 projects-animate hidden-initially">
            Meus <span className="text-gradient">Projetos</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto projects-animate hidden-initially">
            Uma seleção dos meus trabalhos recentes utilizando React, TailwindCSS e Supabase.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="glass-panel overflow-hidden rounded-lg transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg projects-animate hidden-initially"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-foreground/70 text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="text-xs px-2 py-1 bg-secondary/50 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-3 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center space-x-1 border-primary text-primary hover:bg-primary/10"
                    asChild
                  >
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={14} />
                      <span>Demo</span>
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center space-x-1"
                    asChild
                  >
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      <Github size={14} />
                      <span>Código</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
