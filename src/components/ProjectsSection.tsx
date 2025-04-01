
import React, { useEffect, useState } from 'react';
import { ExternalLink, Github, Star, GitFork } from 'lucide-react';
import { Button } from '../components/ui/button';
import { fetchRepositories } from '../utils/githubApi';
import { Skeleton } from '../components/ui/skeleton';

interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  homepage: string | null;
}

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRepositories = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log('Loading repositories...');
        const repos = await fetchRepositories();
        console.log('Repositories loaded:', repos);
        
        if (repos.length === 0) {
          setError('No repositories found');
        } else {
          setProjects(repos);
        }
      } catch (err) {
        console.error('Error in component when fetching repositories:', err);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    loadRepositories();
  }, []);

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
  }, [projects]); // Added projects as dependency to reinitialize animation after loading

  // Placeholder images for repositories that don't have images
  const placeholderImages = [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2070',
    'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=2072',
    'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&q=80&w=2070',
    'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?auto=format&fit=crop&q=80&w=2080',
  ];

  const renderProjectSkeleton = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="glass-panel rounded-lg overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <div className="p-6">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <div className="flex space-x-3 pt-2">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section id="projects" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 projects-animate hidden-initially">
            Meus <span className="text-gradient">Projetos</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto projects-animate hidden-initially">
            Uma seleção dos meus repositórios GitHub recentes.
          </p>
        </div>

        {loading ? (
          renderProjectSkeleton()
        ) : error ? (
          <div className="text-center p-8 bg-destructive/10 rounded-lg">
            <p className="text-destructive mb-2">{error}</p>
            <p className="text-foreground/70">
              Tente novamente mais tarde ou verifique a conexão com a API do GitHub.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className="glass-panel overflow-hidden rounded-lg transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg projects-animate hidden-initially"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={placeholderImages[index % placeholderImages.length]} 
                    alt={project.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                  <p className="text-foreground/70 text-sm mb-4">
                    {project.description || "No description available"}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.language && (
                      <span className="text-xs px-2 py-1 bg-secondary/50 rounded-full flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                        {project.language}
                      </span>
                    )}
                    <span className="text-xs px-2 py-1 bg-secondary/50 rounded-full flex items-center gap-1">
                      <Star size={10} />
                      {project.stargazers_count}
                    </span>
                    <span className="text-xs px-2 py-1 bg-secondary/50 rounded-full flex items-center gap-1">
                      <GitFork size={10} />
                      {project.forks_count}
                    </span>
                  </div>
                  <div className="flex space-x-3 pt-2">
                    {project.homepage && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center space-x-1 border-primary text-primary hover:bg-primary/10"
                        asChild
                      >
                        <a href={project.homepage} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={14} />
                          <span>Demo</span>
                        </a>
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center space-x-1"
                      asChild
                    >
                      <a href={project.html_url} target="_blank" rel="noopener noreferrer">
                        <Github size={14} />
                        <span>Código</span>
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
