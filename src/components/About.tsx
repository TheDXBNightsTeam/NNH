import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Calendar, Award, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  const stats = [
    { icon: <Users className="w-6 h-6" />, label: t('about.satisfiedClients'), value: "50+" },
    { icon: <Award className="w-6 h-6" />, label: t('about.completedProjects'), value: "100+" },
    { icon: <Calendar className="w-6 h-6" />, label: t('about.yearsExperience'), value: "5+" },
  ];

  const expertise = [
    "React & Next.js",
    "Node.js & Express", 
    "Social Media APIs",
    "Digital Marketing",
    "SEO Optimization",
    "Content Management",
    "Data Analytics",
    "UI/UX Design"
  ];

  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                About Our Company
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  NNH FOR SOCIAL MEDIA APPLICATIONS DEVELOPMENT & MANAGEMENT is a licensed company specializing in social media application development and digital marketing. 
                  We hold a professional license from Dubai Department of Economy and Tourism for social media applications development and management.
                </p>
                <p>
                  We have been working in the technology field for over 5 years, specializing in creating innovative digital solutions 
                  that help companies and individuals achieve their goals in the digital world.
                </p>
                <p>
                  Our passion is transforming ideas into digital reality that meets user needs and achieves business objectives.
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <Card className="bg-[var(--gradient-luxury)] border-primary/20 shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-luxury)] transition-all duration-500">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 space-x-reverse text-muted-foreground">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Dubai, United Arab Emirates</span>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse text-muted-foreground">
                    <Phone className="w-5 h-5 text-primary" />
                    <span dir="ltr">+971-543665548</span>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse text-muted-foreground">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>Contact us for email information</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats and Skills */}
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center p-6 bg-[var(--gradient-luxury)] border-primary/20 hover:shadow-[var(--shadow-luxury)] transition-all duration-500 hover:scale-105">
                  <CardContent className="p-0">
                    <div className="text-primary mb-2 flex justify-center">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Skills */}
            <Card className="bg-[var(--gradient-luxury)] border-primary/20 shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-luxury)] transition-all duration-500">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {expertise.map((skill, index) => (
                    <Badge 
                      key={index}
                      variant="secondary" 
                      className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* License Info */}
            <Card className="bg-gradient-to-br from-primary/10 to-primary-glow/10 border-primary/30 shadow-[var(--shadow-gold-glow)] hover:shadow-[var(--shadow-luxury)] transition-all duration-500">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-primary">Professional License</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p><span className="font-medium">License Number:</span> 1481283</p>
                  <p><span className="font-medium">Activity:</span> Social Media Applications Development & Management</p>
                  <p><span className="font-medium">Issued By:</span> Dubai Department of Economy and Tourism</p>
                  <p><span className="font-medium">Valid Until:</span> 09/03/2026</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;