
import React, { useEffect, useState } from 'react';
import { Send, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useToast } from "../hooks/use-toast";
import emailjs from 'emailjs-com';

const ContactSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Initialize EmailJS
  useEffect(() => {
    // Initialize EmailJS with a public key (this is safe to expose in client-side code)
    emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS User ID when you create an account
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

    const elements = document.querySelectorAll('.contact-animate');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Prepare the template parameters
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
      to_email: 'eduardocavalcante131@gmail.com', // The recipient email
    };

    // Send the email using EmailJS
    emailjs.send(
      'YOUR_SERVICE_ID', // Replace with your EmailJS Service ID
      'YOUR_TEMPLATE_ID', // Replace with your EmailJS Template ID
      templateParams
    )
      .then(() => {
        toast({
          title: "Mensagem enviada!",
          description: "Obrigado pelo contato. Responderei o mais breve possível.",
        });
        // Reset form fields
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
        toast({
          title: "Erro ao enviar",
          description: "Houve um problema ao enviar sua mensagem. Por favor, tente novamente.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section id="contact" className="py-20 px-6 bg-background/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 contact-animate hidden-initially">
            Entre em <span className="text-gradient">Contato</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto contact-animate hidden-initially">
            Tem um projeto em mente? Vamos conversar sobre como posso ajudar a transformar suas ideias em realidade.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="glass-panel p-8 rounded-lg contact-animate hidden-initially stagger-1">
            <h3 className="text-xl font-bold mb-6">Envie uma mensagem</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Nome</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-secondary/50 rounded-md border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-secondary/50 rounded-md border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Mensagem</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  className="w-full px-4 py-2 bg-secondary/50 rounded-md border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  placeholder="Como posso ajudar?"
                ></textarea>
              </div>
              <Button 
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                <Send size={16} />
              </Button>
            </form>
          </div>

          <div className="contact-animate hidden-initially stagger-2">
            <div className="glass-panel p-8 rounded-lg mb-8">
              <h3 className="text-xl font-bold mb-6">Informações de Contato</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="text-primary mt-1" size={20} />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <a href="mailto:eduardocavalcante131@gmail.com" className="text-foreground/70 hover:text-primary transition-colors">
                      eduardocavalcante131@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="text-primary mt-1" size={20} />
                  <div>
                    <h4 className="font-medium">Localização</h4>
                    <p className="text-foreground/70">Limoeiro do Norte, Brasil</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="text-primary mt-1" size={20} />
                  <div>
                    <h4 className="font-medium">Telefone</h4>
                    <a href="tel:+5511999999999" className="text-foreground/70 hover:text-primary transition-colors">
                      +55 (88) 99316-7357
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Disponibilidade</h3>
              <p className="text-foreground/70 mb-4">
                Atualmente disponível para novos projetos e oportunidades freelance.
              </p>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full animate-pulse-slow" style={{ width: '70%' }}></div>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span>Ocupação atual</span>
                <span>70%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
