import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ExternalLink, 
  Github, 
  Users, 
  TrendingUp, 
  Calendar,
  Smartphone,
  Globe,
  BarChart3,
  Star,
  Eye
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const createPortfolioProjects = (t: (key: string) => string) => [
  {
    id: 1,
    title: t('portfolio.project1.title'),
    category: "web",
    description: t('portfolio.project1.description'),
    image: "/placeholder.svg",
    technologies: ["React", "Node.js", "MongoDB", "Chart.js"],
    features: t('portfolio.project1.features').split(','),
    stats: {
      users: "10,000+",
      growth: "+150%",
      rating: 4.9,
      views: "50K+"
    },
    liveUrl: "#",
    githubUrl: "#",
    year: "2024",
    status: t('portfolio.completed')
  },
  {
    id: 2,
    title: t('portfolio.project2.title'),
    category: "mobile",
    description: t('portfolio.project2.description'),
    image: "/placeholder.svg",
    technologies: ["React Native", "Firebase", "Stripe", "Redux"],
    features: t('portfolio.project2.features').split(','),
    stats: {
      users: "25,000+",
      growth: "+200%",
      rating: 4.8,
      views: "75K+"
    },
    liveUrl: "#",
    githubUrl: "#",
    year: "2024",
    status: t('portfolio.completed')
  },
  {
    id: 3,
    title: t('portfolio.project3.title'),
    category: "web",
    description: t('portfolio.project3.description'),
    image: "/placeholder.svg",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    features: t('portfolio.project3.features').split(','),
    stats: {
      users: "5,000+",
      growth: "+120%",
      rating: 4.9,
      views: "30K+"
    },
    liveUrl: "#",
    githubUrl: "#",
    year: "2023",
    status: t('portfolio.completed')
  },
  {
    id: 4,
    title: t('portfolio.project4.title'),
    category: "web",
    description: t('portfolio.project4.description'),
    image: "/placeholder.svg",
    technologies: ["Vue.js", "Laravel", "MySQL", "Socket.io"],
    features: t('portfolio.project4.features').split(','),
    stats: {
      users: "500+",
      growth: "+80%",
      rating: 4.7,
      views: "15K+"
    },
    liveUrl: "#",
    githubUrl: "#",
    year: "2023",
    status: t('portfolio.completed')
  },
  {
    id: 5,
    title: t('portfolio.project5.title'),
    category: "mobile",
    description: t('portfolio.project5.description'),
    image: "/placeholder.svg",
    technologies: ["Flutter", "Firebase", "Google Fit", "Bloc"],
    features: t('portfolio.project5.features').split(','),
    stats: {
      users: "8,000+",
      growth: "+150%",
      rating: 4.6,
      views: "25K+"
    },
    liveUrl: "#",
    githubUrl: "#",
    year: "2023",
    status: t('portfolio.completed')
  },
  {
    id: 6,
    title: t('portfolio.project6.title'),
    category: "web",
    description: t('portfolio.project6.description'),
    image: "/placeholder.svg",
    technologies: ["React", "Node.js", "MongoDB", "Google Maps API"],
    features: t('portfolio.project6.features').split(','),
    stats: {
      users: "3,000+",
      growth: "+100%",
      rating: 4.8,
      views: "20K+"
    },
    liveUrl: "#",
    githubUrl: "#",
    year: "2022",
    status: t('portfolio.completed')
  }
];

const createCategories = (t: (key: string) => string) => [
  { value: "all", label: t('portfolio.all'), icon: <Eye className="w-4 h-4" /> },
  { value: "web", label: t('portfolio.web'), icon: <Globe className="w-4 h-4" /> },
  { value: "mobile", label: t('portfolio.mobile'), icon: <Smartphone className="w-4 h-4" /> }
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const { t } = useLanguage();

  const portfolioProjects = createPortfolioProjects(t);
  const categories = createCategories(t);

  const filteredProjects = activeCategory === "all" 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === activeCategory);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            {t('portfolio.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('portfolio.subtitle')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-3 bg-secondary/50">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.value} 
                  value={category.value}
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category.icon}
                  <span className="hidden sm:inline">{category.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card 
              key={project.id} 
              className="group hover:shadow-[var(--shadow-luxury)] transition-all duration-500 hover:-translate-y-2 bg-[var(--gradient-luxury)] border-primary/20 hover:border-primary/40 relative overflow-hidden"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                    {project.status}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4">
                  <Badge variant="outline" className="bg-background/80 text-foreground border-border">
                    {project.year}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Project Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">{t('portfolio.mainFeatures')}:</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {project.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-primary rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-primary mb-1">
                        <Users className="w-4 h-4" />
                        <span className="text-sm font-medium">{project.stats.users}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{t('portfolio.users')}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-primary mb-1">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">{project.stats.growth}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{t('portfolio.growth')}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            i < Math.floor(project.stats.rating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">
                        {project.stats.rating}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {project.stats.views} views
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t('portfolio.viewProject')}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="hover:bg-primary/10 hover:text-primary transition-colors"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-br from-primary/10 to-primary-glow/10 border-primary/30 shadow-[var(--shadow-gold-glow)] max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-primary">
                {t('portfolio.haveProject')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t('portfolio.turnIdeas')}
              </p>
              <Button variant="hero" size="lg">
                <Calendar className="w-5 h-5 mr-2" />
                {t('portfolio.bookConsultation')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;