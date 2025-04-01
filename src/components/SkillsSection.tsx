
import React, { useEffect } from 'react';

const skills = [
  { name: 'React', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'TailwindCSS', level: 95 },
  { name: 'Supabase', level: 80 },
  { name: 'Next.js', level: 75 },
  { name: 'Figma', level: 70 },
];

const SkillsSection = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            
            // Animate skill bars
            setTimeout(() => {
              const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
              skillBars.forEach((bar) => {
                const level = bar.getAttribute('data-level');
                if (bar instanceof HTMLElement && level) {
                  bar.style.width = `${level}%`;
                }
              });
            }, 300);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.skills-animate');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="skills" className="py-20 px-6 bg-background/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 skills-animate hidden-initially">
            Minhas <span className="text-gradient">Habilidades</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto skills-animate hidden-initially">
            Tecnologias e ferramentas que utilizo para criar soluções web modernas e eficientes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 skills-animate hidden-initially">
          <div className="glass-panel p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-8 text-center">Habilidades Técnicas</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-foreground/70">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary/50 rounded-full overflow-hidden">
                    <div 
                      className="skill-bar-fill h-full bg-gradient-to-r from-primary to-blue-400 rounded-full transition-all duration-1000 ease-out"
                      data-level={skill.level}
                      style={{ width: '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="glass-panel p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Tecnologias Front-end</h3>
              <div className="flex flex-wrap gap-3">
                {['React', 'TypeScript', 'JavaScript', 'TailwindCSS', 'HTML5', 'CSS3', 'Redux', 'Framer Motion', 'Jest', 'Storybook'].map((tech, index) => (
                  <span 
                    key={index} 
                    className="inline-block px-3 py-1 bg-secondary/50 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-panel p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Ferramentas & Backend</h3>
              <div className="flex flex-wrap gap-3">
                {['Supabase', 'Git', 'VSCode', 'Figma', 'Vercel', 'Netlify', 'GitHub Actions', 'Firebase', 'Rest API', 'GraphQL'].map((tool, index) => (
                  <span 
                    key={index} 
                    className="inline-block px-3 py-1 bg-secondary/50 rounded-full text-sm"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
