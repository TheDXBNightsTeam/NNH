import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  Globe, 
  TrendingUp, 
  Users, 
  Palette, 
  BarChart3,
  MessageSquare,
  Zap
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const createServices = (t: (key: string) => string) => [
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: t('services.service1.title'),
    description: t('services.service1.description'),
    features: t('services.service1.features').split(',')
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: t('services.service2.title'),
    description: t('services.service2.description'),
    features: t('services.service2.features').split(',')
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: t('services.service3.title'),
    description: t('services.service3.description'),
    features: t('services.service3.features').split(',')
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: t('services.service4.title'),
    description: t('services.service4.description'),
    features: t('services.service4.features').split(',')
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: t('services.service5.title'),
    description: t('services.service5.description'),
    features: t('services.service5.features').split(',')
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: t('services.service6.title'),
    description: t('services.service6.description'),
    features: t('services.service6.features').split(',')
  }
];

const Services = () => {
  const { t } = useLanguage();
  const services = createServices(t);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            {t('services.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-[var(--shadow-luxury)] transition-all duration-500 hover:-translate-y-2 bg-[var(--gradient-luxury)] border-primary/20 hover:border-primary/40 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-primary/5 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000"
            >
              <CardHeader>
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-lg text-primary group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-glow group-hover:text-primary-foreground transition-all duration-500 shadow-lg group-hover:shadow-[var(--shadow-gold-glow)]">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, featureIndex) => (
                    <Badge 
                      key={featureIndex} 
                      variant="secondary" 
                      className="text-xs bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;