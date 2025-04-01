
import React, { useEffect } from 'react';
import { useIsMobile } from '../hooks/use-mobile';

const skills = [
  { 
    name: 'React', 
    level: 90, 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
  },
  { 
    name: 'TypeScript', 
    level: 85, 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
  },
  { 
    name: 'TailwindCSS', 
    level: 95, 
    logo: 'https://seeklogo.com/images/T/tailwind-css-logo-5AD4175897-seeklogo.com.png'
  },
  { 
    name: 'Supabase', 
    level: 80, 
    logo: 'https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png'
  },
  { 
    name: 'Next.js', 
    level: 75, 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg'
  },
  { 
    name: 'Figma', 
    level: 70, 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg'
  },
];

const SkillsSection = () => {
  const isMobile = useIsMobile();

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
    <section id="skills" className="py-16 px-4 md:py-20 md:px-6 bg-background/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 skills-animate hidden-initially">
            Minhas <span className="text-gradient">Habilidades</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-sm md:text-base skills-animate hidden-initially">
            Tecnologias e ferramentas que utilizo para criar soluções web modernas e eficientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 skills-animate hidden-initially">
          <div className="glass-panel p-4 md:p-8 rounded-lg">
            <h3 className="text-lg md:text-xl font-bold mb-6 md:mb-8 text-center">Habilidades Técnicas</h3>
            <div className="space-y-4 md:space-y-6">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img 
                        src={skill.logo} 
                        alt={skill.name} 
                        className="w-5 h-5 md:w-6 md:h-6 object-contain" 
                      />
                      <span className="font-medium text-sm md:text-base">{skill.name}</span>
                    </div>
                    <span className="text-xs md:text-sm text-foreground/70">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 md:h-2 bg-secondary/50 rounded-full overflow-hidden">
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

          <div className="space-y-6 md:space-y-8">
            <div className="glass-panel p-4 md:p-8 rounded-lg">
              <h3 className="text-lg md:text-xl font-bold mb-4 text-center md:text-left">Tecnologias Front-end</h3>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4">
                {[
                  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
                  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
                  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
                  { name: 'TailwindCSS', logo: 'https://seeklogo.com/images/T/tailwind-css-logo-5AD4175897-seeklogo.com.png' },
                  { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
                  { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
                  { name: 'Framer Motion', logo: 'https://seeklogo.com/images/F/framer-motion-logo-DA1E33CAA1-seeklogo.com.png' },
                ].map((tech, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center gap-1 md:gap-2 bg-secondary/30 p-2 md:p-3 rounded-lg"
                  >
                    <img src={tech.logo} alt={tech.name} className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                    <span className="text-[10px] md:text-xs">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-4 md:p-8 rounded-lg">
              <h3 className="text-lg md:text-xl font-bold mb-4 text-center md:text-left">Ferramentas & Backend</h3>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4">
                {[
                  { name: 'Supabase', logo: 'https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png' },
                  { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
                  { name: 'VSCode', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
                  { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
                  { name: 'Vercel', logo: 'https://seeklogo.com/images/V/vercel-logo-F748E39008-seeklogo.com.png' },
                  { name: 'Netlify', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg' },
                  { name: 'GitHub Actions', logo: 'https://seeklogo.com/images/G/github-actions-logo-031704BDC6-seeklogo.com.png' },
                  { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
                  { name: 'Rest API', logo: 'https://www.svgrepo.com/show/375531/api.svg' },
                ].map((tool, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center gap-1 md:gap-2 bg-secondary/30 p-2 md:p-3 rounded-lg"
                  >
                    <img src={tool.logo} alt={tool.name} className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                    <span className="text-[10px] md:text-xs">{tool.name}</span>
                  </div>
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
