import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowRight, 
  BookOpen,
  Code,
  TrendingUp,
  Smartphone,
  Globe,
  MessageSquare,
  Eye,
  Heart,
  Share2
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const createBlogPosts = (t: (key: string) => string) => [
  {
    id: 1,
    title: t('blog.post1.title'),
    excerpt: t('blog.post1.excerpt'),
    content: t('blog.post1.content'),
    author: t('blog.author'),
    authorImage: "/placeholder.svg",
    publishDate: "2024-01-15",
    readTime: t('blog.readTime1'),
    category: t('blog.appDevelopment'),
    tags: ["React Native", "Flutter", "Mobile Development", "Latest Technologies"],
    image: "/placeholder.svg",
    views: 1250,
    likes: 89,
    featured: true
  },
  {
    id: 2,
    title: t('blog.post2.title'),
    excerpt: t('blog.post2.excerpt'),
    content: t('blog.post2.content'),
    author: t('blog.author'),
    authorImage: "/placeholder.svg",
    publishDate: "2024-01-12",
    readTime: t('blog.readTime2'),
    category: t('blog.digitalMarketing'),
    tags: ["Social Media", "Customer Engagement", "Digital Marketing", "Strategies"],
    image: "/placeholder.svg",
    views: 980,
    likes: 67,
    featured: false
  }
];

const createCategories = (t: (key: string) => string) => [
  { value: "all", label: t('blog.all'), icon: <BookOpen className="w-4 h-4" /> },
  { value: t('blog.appDevelopment'), label: t('blog.appDevelopment'), icon: <Smartphone className="w-4 h-4" /> },
  { value: t('blog.webDevelopment'), label: t('blog.webDevelopment'), icon: <Globe className="w-4 h-4" /> },
  { value: t('blog.digitalMarketing'), label: t('blog.digitalMarketing'), icon: <TrendingUp className="w-4 h-4" /> },
  { value: t('blog.design'), label: t('blog.design'), icon: <Code className="w-4 h-4" /> }
];

const Blog = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const blogPosts = createBlogPosts(t);
  const categories = createCategories(t);

  const filteredPosts = activeCategory === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            {t('blog.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Category Filter */}
            <div className="flex justify-center mb-8">
              <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full max-w-2xl">
                <TabsList className="grid w-full grid-cols-5 bg-secondary/50">
                  {categories.map((category) => (
                    <TabsTrigger 
                      key={category.value} 
                      value={category.value}
                      className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      {category.icon}
                      <span className="hidden sm:inline text-xs">{category.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Featured Posts */}
            {activeCategory === "all" && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6 text-foreground">{t('blog.featured')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredPosts.map((post) => (
                    <Card key={post.id} className="group hover:shadow-[var(--shadow-luxury)] transition-all duration-500 hover:-translate-y-2 bg-[var(--gradient-luxury)] border-primary/20 hover:border-primary/40 relative overflow-hidden">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                        <Badge className="absolute top-4 right-4 bg-primary/90 text-primary-foreground">
                          {t('blog.featured')}
                        </Badge>
                      </div>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {post.excerpt}
                            </p>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {post.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(post.publishDate)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readTime}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {post.category}
                            </Badge>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {post.views}
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="w-3 h-3" />
                                {post.likes}
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary">
                            {t('blog.readMore')}
                            <ArrowRight className="w-3 h-3 mr-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* All Posts */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">
                {activeCategory === "all" ? t('blog.all') : `${t('blog.all')} - ${activeCategory}`}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="group hover:shadow-[var(--shadow-luxury)] transition-all duration-500 hover:-translate-y-2 bg-[var(--gradient-luxury)] border-primary/20 hover:border-primary/40 relative overflow-hidden">
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {post.excerpt}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.publishDate)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {post.category}
                          </Badge>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {post.views}
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              {post.likes}
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary">
                          {t('blog.readMore')}
                          <ArrowRight className="w-3 h-3 mr-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Recent Posts */}
            <Card className="bg-[var(--gradient-luxury)] border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg text-primary">{t('blog.recentPosts')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="flex gap-3 group cursor-pointer">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(post.publishDate)}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="bg-[var(--gradient-luxury)] border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg text-primary">{t('blog.categories')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.slice(1).map((category) => (
                  <div 
                    key={category.value}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-primary/10 cursor-pointer transition-colors"
                    onClick={() => setActiveCategory(category.value)}
                  >
                    <div className="flex items-center gap-2">
                      {category.icon}
                      <span className="text-sm">{category.label}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {blogPosts.filter(post => post.category === category.value).length}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card className="bg-gradient-to-br from-primary/10 to-primary-glow/10 border-primary/30 shadow-[var(--shadow-gold-glow)]">
              <CardContent className="p-6 text-center">
                <MessageSquare className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">
                  {t('blog.newsletter')}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('blog.newsletterSubtitle')}
                </p>
                <Button variant="hero" size="sm" className="w-full">
                  {t('blog.subscribe')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;