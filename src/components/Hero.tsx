import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import profileAvatar from "@/assets/profile-avatar.jpg";
import ScrollReveal from "@/components/ui/scroll-reveal";
import Parallax from "@/components/ui/parallax";
import TypingAnimation from "@/components/ui/typing-animation";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Language Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageToggle />
      </div>
      {/* Background Image */}
      <Parallax speed={0.3} className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroBg})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/95 backdrop-blur-md" />
        </div>
      </Parallax>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="flex flex-col items-center space-y-8">
          {/* Profile Image */}
          <ScrollReveal direction="up" delay={200} duration={800}>
            <div className="relative">
              <img 
                src={profileAvatar}
                alt="NNH Social Media Applications Development"
                className="w-32 h-32 rounded-full border-4 border-primary/40 shadow-[var(--shadow-luxury)] ring-2 ring-primary/20 hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-primary-glow/30 animate-pulse" />
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary/10 to-primary-glow/10 blur-xl animate-pulse" />
            </div>
          </ScrollReveal>
          
          {/* Main Content */}
          <ScrollReveal direction="up" delay={400} duration={800}>
            <div className="space-y-6 max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                <TypingAnimation 
                  text={t('hero.title')}
                  speed={50}
                  delay={600}
                />
              </h1>
              <h2 className="text-2xl md:text-3xl text-muted-foreground font-light">
                {t('hero.subtitle')}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {t('hero.description')}
              </p>
            </div>
          </ScrollReveal>
          
          {/* CTA Buttons */}
          <ScrollReveal direction="up" delay={600} duration={800}>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="hero" size="lg" className="hover:scale-105 transition-transform duration-300">
                <Mail className="w-5 h-5" />
                {t('hero.contact')}
              </Button>
              <Button variant="glow" size="lg" className="hover:scale-105 transition-transform duration-300">
                <ArrowDown className="w-5 h-5" />
                {t('hero.viewWork')}
              </Button>
            </div>
          </ScrollReveal>
          
          {/* Social Links */}
          <ScrollReveal direction="up" delay={800} duration={800}>
            <div className="flex space-x-6 pt-8">
              <Button variant="ghost" size="icon" className="hover:text-primary hover:scale-110 transition-all duration-300">
                <Github className="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary hover:scale-110 transition-all duration-300">
                <Linkedin className="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary hover:scale-110 transition-all duration-300">
                <Mail className="w-6 h-6" />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground animate-bounce">
        <ArrowDown className="w-6 h-6" />
      </div>
    </section>
  );
};

export default Hero;