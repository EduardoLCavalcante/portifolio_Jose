
import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Mouse position
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Create particles
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }
    
    const particles: Particle[] = [];
    const particleCount = 50;
    
    const colors = [
      'rgba(142, 69, 223, 0.3)',
      'rgba(74, 222, 128, 0.3)',
      'rgba(59, 130, 246, 0.3)',
      'rgba(99, 102, 241, 0.3)'
    ];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 10 + 2,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    // Animation loop
    const animate = () => {
      // Clear canvas with slight fade effect for trails
      ctx.fillStyle = 'rgba(10, 10, 20, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Move particles
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Mouse interaction - gentle attraction
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 300;
        
        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          p.speedX += dx * force * 0.02;
          p.speedY += dy * force * 0.02;
        }
        
        // Speed limit
        p.speedX = Math.min(Math.max(p.speedX, -3), 3);
        p.speedY = Math.min(Math.max(p.speedY, -3), 3);
        
        // Boundary check with bounce
        if (p.x < 0 || p.x > canvas.width) {
          p.speedX *= -1;
        }
        if (p.y < 0 || p.y > canvas.height) {
          p.speedY *= -1;
        }
        
        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-20 bg-gradient-to-br from-background via-secondary/30 to-background"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default AnimatedBackground;
