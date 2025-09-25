import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Star, 
  Quote, 
  TrendingUp, 
  Users, 
  Award,
  CheckCircle,
  ArrowRight,
  MessageSquare
} from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const createTestimonials = (t: (key: string) => string) => [
  {
    id: 1,
    name: t('testimonials.testimonial1.name'),
    role: t('testimonials.testimonial1.role'),
    company: t('testimonials.testimonial1.company'),
    image: "/placeholder.svg",
    rating: 5,
    text: t('testimonials.testimonial1.text'),
    project: t('testimonials.testimonial1.project'),
    results: {
      engagement: "+300%",
      followers: "+150%",
      revenue: "+200%"
    },
    verified: true
  },
  {
    id: 2,
    name: t('testimonials.testimonial2.name'),
    role: t('testimonials.testimonial2.role'),
    company: t('testimonials.testimonial2.company'),
    image: "/placeholder.svg",
    rating: 5,
    text: t('testimonials.testimonial2.text'),
    project: t('testimonials.testimonial2.project'),
    results: {
      sales: "+250%",
      users: "+180%",
      rating: "4.9/5"
    },
    verified: true
  },
  {
    id: 3,
    name: t('testimonials.testimonial3.name'),
    role: t('testimonials.testimonial3.role'),
    company: t('testimonials.testimonial3.company'),
    image: "/placeholder.svg",
    rating: 5,
    text: t('testimonials.testimonial3.text'),
    project: t('testimonials.testimonial3.project'),
    results: {
      efficiency: "+180%",
      time: "-60%",
      satisfaction: "95%"
    },
    verified: true
  }
];

const createStats = (t: (key: string) => string) => [
  {
    icon: <Users className="w-8 h-8" />,
    value: "150+",
    label: t('testimonials.satisfiedClients'),
    description: t('testimonials.satisfiedClients')
  },
  {
    icon: <Award className="w-8 h-8" />,
    value: "98%",
    label: t('testimonials.satisfactionRate'),
    description: t('testimonials.satisfactionRate')
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    value: "250%",
    label: t('testimonials.averageGrowth'),
    description: t('testimonials.averageGrowth')
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    value: "100%",
    label: t('testimonials.completedProjects'),
    description: t('testimonials.completedProjects')
  }
];

const Testimonials = () => {
  const { t } = useLanguage();
  const testimonials = createTestimonials(t);
  const stats = createStats(t);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const currentTestimonialData = testimonials[currentTestimonial];

  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center bg-[var(--gradient-luxury)] border-primary/20 hover:shadow-[var(--shadow-luxury)] transition-all duration-500 hover:scale-105">
              <CardContent className="p-6">
                <div className="text-primary mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-[var(--gradient-luxury)] border-primary/20 shadow-[var(--shadow-luxury)] relative overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="text-center">
                {/* Quote Icon */}
                <div className="text-primary/20 mb-6">
                  <Quote className="w-16 h-16 mx-auto" />
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-xl md:text-2xl text-foreground mb-8 leading-relaxed">
                  "{currentTestimonialData.text}"
                </blockquote>

                {/* Client Info */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <Avatar className="w-16 h-16 border-4 border-primary/20">
                    <AvatarImage src={currentTestimonialData.image} alt={currentTestimonialData.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                      {currentTestimonialData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="text-center md:text-left">
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {currentTestimonialData.name}
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      {currentTestimonialData.role}
                    </p>
                    <p className="text-sm text-primary font-medium">
                      {currentTestimonialData.company}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${
                          i < currentTestimonialData.rating 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                </div>

                {/* Project Results */}
                <div className="mt-8 pt-8 border-t border-border/50">
                  <h4 className="text-sm font-medium text-muted-foreground mb-4">
                    {currentTestimonialData.project} - Results:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(currentTestimonialData.results).map(([key, value]) => (
                      <div key={key} className="text-center p-3 bg-primary/5 rounded-lg">
                        <div className="text-2xl font-bold text-primary mb-1">
                          {value}
                        </div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verified Badge */}
                {currentTestimonialData.verified && (
                  <div className="mt-6 flex justify-center">
                    <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {t('testimonials.verified')}
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Testimonial Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-primary scale-125' 
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                title={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-br from-primary/10 to-primary-glow/10 border-primary/30 shadow-[var(--shadow-gold-glow)] max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-primary">
                {t('testimonials.beNext')}
              </h3>
              <p className="text-muted-foreground mb-6">
                Join over 150 satisfied clients and start your journey towards digital success
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Badge variant="hero" className="px-6 py-3 text-base cursor-pointer hover:scale-105 transition-transform">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Start Your Project Now
                </Badge>
                <Badge variant="outline" className="px-6 py-3 text-base cursor-pointer hover:bg-primary/10 transition-colors">
                  Free Consultation
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;