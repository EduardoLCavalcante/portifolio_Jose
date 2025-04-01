
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Star, GitFork, Code, Globe, Layers, Database, Github, Zap, Award } from 'lucide-react';
import { Button } from '../components/ui/button';
import { fetchGithubProfile, fetchRepositories } from '../utils/githubApi';

interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

interface GithubProfile {
  name: string;
  bio: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGithubData = async () => {
      const profileData = await fetchGithubProfile();
      const repositories = await fetchRepositories();
      
      setProfile(profileData);
      setRepos(repositories);
      setLoading(false);
    };

    loadGithubData();
  }, []);

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

  // Tech icons for the floating bubbles
  const techIcons = [
    { icon: <Code size={24} />, name: 'JavaScript', color: 'bg-yellow-400/20 text-yellow-400' },
    { icon: <Layers size={24} />, name: 'React', color: 'bg-blue-400/20 text-blue-400' },
    { icon: <Zap size={24} />, name: 'TypeScript', color: 'bg-blue-500/20 text-blue-500' },
    { icon: <Database size={24} />, name: 'Supabase', color: 'bg-green-400/20 text-green-400' },
    { icon: <Globe size={24} />, name: 'Web', color: 'bg-purple-400/20 text-purple-400' },
    { icon: <Github size={24} />, name: 'GitHub', color: 'bg-gray-400/20 text-gray-400' },
    { icon: <Award size={24} />, name: 'CSS', color: 'bg-pink-400/20 text-pink-400' },
  ];

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center px-6 pt-20 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Gradient blob 1 */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary/20 to-blue-500/20 blur-[80px] animate-float opacity-60"></div>
        
        {/* Gradient blob 2 */}
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-purple-500/20 to-primary/20 blur-[80px] animate-float opacity-50" style={{ animationDelay: '2s' }}></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute rounded-full bg-primary/10 w-2 h-2"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Tech floating bubbles */}
        {techIcons.map((tech, index) => (
          <motion.div
            key={index}
            className={`absolute p-3 rounded-full ${tech.color} flex items-center justify-center`}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0 
            }}
            animate={{ 
              x: [
                Math.random() * window.innerWidth * 0.8,
                Math.random() * window.innerWidth * 0.8,
                Math.random() * window.innerWidth * 0.8
              ],
              y: [
                Math.random() * window.innerHeight * 0.8,
                Math.random() * window.innerHeight * 0.8,
                Math.random() * window.innerHeight * 0.8
              ],
              opacity: 0.8
            }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: 20 + Math.random() * 10,
              delay: index * 0.5,
              ease: "easeInOut" 
            }}
          >
            <div className="relative group cursor-pointer">
              {tech.icon}
              <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs px-2 py-1 rounded -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                {tech.name}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text Content */}
          <div className="space-y-8">
            <div className="hidden-initially stagger-1">
              <motion.span 
                className="inline-block text-primary font-mono text-sm md:text-base mb-2 tracking-wide"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                &lt;Olá, mundo /&gt;
              </motion.span>
            </div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold tracking-tight hidden-initially stagger-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Desenvolvedor <span className="text-gradient">Front-end</span>
            </motion.h1>
            
            <motion.p 
              className="text-foreground/80 text-lg md:text-xl max-w-lg leading-relaxed hidden-initially stagger-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Criando experiências web modernas e interativas com React, TailwindCSS e Supabase.
            </motion.p>
            
            {profile && (
              <motion.div 
                className="glass-panel p-4 rounded-lg hidden-initially"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-center gap-4">
                  <img 
                    src={profile.avatar_url} 
                    alt={profile.name} 
                    className="w-16 h-16 rounded-full border-2 border-primary"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{profile.name}</h3>
                    <p className="text-sm text-foreground/70">{profile.bio || "Desenvolvedor Front-end"}</p>
                    <div className="flex gap-4 mt-2 text-xs text-foreground/60">
                      <span className="flex items-center gap-1">
                        <Database size={12} />
                        {profile.public_repos} repos
                      </span>
                      <span className="flex items-center gap-1">
                        <Star size={12} />
                        {profile.followers} seguidores
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
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
          
          {/* Right side - GitHub Repos & Code */}
          <div className="relative">
            {/* Main code window */}
            <motion.div 
              className="glass-panel w-full max-w-lg p-6 animate-float relative z-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
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
            </motion.div>
            
            {/* GitHub repositories */}
            {repos.length > 0 && (
              <motion.div 
                className="glass-panel p-4 absolute -bottom-16 -right-16 w-full max-w-xs z-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Github size={16} className="text-primary" />
                  <h3 className="text-sm font-bold">Repositórios Recentes</h3>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-none">
                  {repos.slice(0, 3).map((repo) => (
                    <a 
                      key={repo.id} 
                      href={repo.html_url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-2 hover:bg-secondary/30 rounded transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="font-mono text-xs font-medium text-primary">{repo.name}</div>
                        <div className="flex items-center gap-2 text-xs text-foreground/60">
                          <span className="flex items-center gap-1">
                            <Star size={10} />
                            {repo.stargazers_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork size={10} />
                            {repo.forks_count}
                          </span>
                        </div>
                      </div>
                      {repo.description && (
                        <p className="text-xs text-foreground/70 mt-1 truncate">{repo.description}</p>
                      )}
                      {repo.language && (
                        <div className="mt-1 flex items-center gap-1 text-xs">
                          <span className="w-2 h-2 rounded-full bg-primary"></span>
                          <span className="text-foreground/60">{repo.language}</span>
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Tech icons */}
            <motion.div 
              className="absolute -top-10 -left-10 glass-panel p-3 animate-fade-in-left z-30" 
              style={{ animationDelay: '1.2s' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <Code className="text-blue-400" size={24} />
            </motion.div>
            
            <motion.div 
              className="absolute top-1/3 -right-4 glass-panel p-3 animate-fade-in-right z-30" 
              style={{ animationDelay: '1.5s' }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              <Database className="text-purple-400" size={24} />
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll Down Button */}
      <motion.div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 cursor-pointer animate-pulse-slow hidden-initially stagger-5"
        style={{animationDelay: '1.8s'}}
        onClick={scrollToNext}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.8 }}
      >
        <span className="text-sm text-foreground/70">Role para baixo</span>
        <ChevronDown className="text-primary" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
