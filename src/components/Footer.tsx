import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-secondary/20 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-4">
              NNH FOR SOCIAL MEDIA APPLICATIONS DEVELOPMENT & MANAGEMENT
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-md">
              {t('footer.description')}
            </p>
            
            <div className="flex space-x-4 space-x-reverse">
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="hover:text-primary transition-colors cursor-pointer">Social Media Development</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Social Media Management</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Digital Marketing</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Brand Identity Design</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Data Analytics</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Phone className="w-4 h-4 text-primary" />
                <span dir="ltr">+971-543665548</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Dubai, UAE</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Mail className="w-4 h-4 text-primary" />
                <span>Contact for email info</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-muted-foreground">
            <p>© 2025 NNH FOR SOCIAL MEDIA APPLICATIONS DEVELOPMENT & MANAGEMENT. All rights reserved.</p>
            <div className="flex space-x-6 space-x-reverse mt-4 md:mt-0">
              <span className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-primary transition-colors cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;