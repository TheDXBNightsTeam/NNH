import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Check, 
  X, 
  Star, 
  Zap, 
  Crown, 
  Rocket,
  Calendar,
  MessageSquare,
  Phone,
  Mail,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const createPricingPlans = (t: (key: string) => string) => [
  {
    id: "basic",
    name: t('pricing.basic'),
    description: t('pricing.basicDescription'),
    price: {
      monthly: 2500,
      yearly: 24000
    },
    features: [
      t('pricing.feature1'),
      t('pricing.feature2'),
      t('pricing.feature3'),
      "Contact Form",
      "Basic SEO",
      "3 Months Support",
      "2-3 Weeks Delivery"
    ],
    notIncluded: [
      "Mobile App",
      "Advanced CMS",
      "Advanced Analytics",
      "24/7 Support"
    ],
    popular: false,
    cta: t('pricing.startNow')
  },
  {
    id: "professional",
    name: t('pricing.professional'),
    description: t('pricing.professionalDescription'),
    price: {
      monthly: 5000,
      yearly: 48000
    },
    features: [
      "Everything in Basic Plan",
      t('pricing.feature4'),
      "Advanced CMS",
      "10 Pages",
      "Advanced Analytics",
      "Social Media Integration",
      "6 Months Support",
      "4-6 Weeks Delivery",
      "Team Training"
    ],
    notIncluded: [
      "24/7 Support",
      "Advanced Custom Development"
    ],
    popular: true,
    cta: t('pricing.choosePlan')
  },
  {
    id: "enterprise",
    name: t('pricing.enterprise'),
    description: t('pricing.enterpriseDescription'),
    price: {
      monthly: 10000,
      yearly: 96000
    },
    features: [
      "Everything in Professional Plan",
      t('pricing.feature7'),
      "Unlimited Pages",
      "Advanced Management System",
      "External System Integration",
      "Advanced Security",
      t('pricing.feature8'),
      "8-12 Weeks Delivery",
      t('pricing.feature10'),
      "Detailed Monthly Reports",
      "Strategic Consultation"
    ],
    notIncluded: [],
    popular: false,
    cta: t('pricing.contactUs')
  }
];

const createAdditionalServices = (t: (key: string) => string) => [
  {
    name: "Mobile App Development",
    description: "Custom iOS and Android applications",
    price: "15,000 - 35,000 AED",
    icon: <Rocket className="w-6 h-6" />
  },
  {
    name: "Comprehensive Digital Marketing",
    description: "Advertising campaigns and social media management",
    price: "3,000 - 8,000 AED/month",
    icon: <Sparkles className="w-6 h-6" />
  },
  {
    name: "Maintenance & Technical Support",
    description: "Regular maintenance and continuous technical support",
    price: "1,500 - 3,000 AED/month",
    icon: <MessageSquare className="w-6 h-6" />
  },
  {
    name: "Technical Consultation",
    description: "Consultation on development and digital strategy",
    price: "500 - 1,500 AED/hour",
    icon: <Calendar className="w-6 h-6" />
  }
];

const Pricing = () => {
  const { t } = useLanguage();
  const [isYearly, setIsYearly] = useState(false);
  const pricingPlans = createPricingPlans(t);
  const additionalServices = createAdditionalServices(t);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
    }).format(price);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            {t('pricing.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {t('pricing.subtitle')}
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm font-medium ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
              {t('pricing.monthly')}
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-primary"
            />
            <span className={`text-sm font-medium ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
              {t('pricing.yearly')}
            </span>
            {isYearly && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {t('pricing.save')}
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {pricingPlans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative hover:shadow-[var(--shadow-luxury)] transition-all duration-500 hover:-translate-y-2 ${
                plan.popular 
                  ? 'bg-gradient-to-br from-primary/10 to-primary-glow/10 border-primary/40 shadow-[var(--shadow-gold-glow)] scale-105' 
                  : 'bg-[var(--gradient-luxury)] border-primary/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Star className="w-4 h-4 mr-1" />
                    {t('pricing.mostPopular')}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground mb-4">
                  {plan.description}
                </CardDescription>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-primary">
                    {formatPrice(isYearly ? plan.price.yearly : plan.price.monthly)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {isYearly ? 'per year' : 'per month'}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">{t('pricing.features')}:</h4>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Not Included */}
                {plan.notIncluded.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">{t('pricing.notIncluded')}:</h4>
                    {plan.notIncluded.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA Button */}
                <Button 
                  variant={plan.popular ? "hero" : "outline"} 
                  className="w-full"
                  size="lg"
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Services */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              {t('pricing.additionalServices')}
            </h3>
            <p className="text-muted-foreground">
              Custom services to meet your specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index} className="text-center bg-[var(--gradient-luxury)] border-primary/20 hover:shadow-[var(--shadow-luxury)] transition-all duration-500 hover:scale-105">
                <CardContent className="p-6">
                  <div className="text-primary mb-4 flex justify-center">
                    {service.icon}
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {service.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <div className="text-lg font-bold text-primary">
                    {service.price}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              {t('pricing.faq')}
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="bg-[var(--gradient-luxury)] border-primary/20">
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-2">
                  Can I change my plan later?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Yes, you can upgrade or change your plan at any time. We will adjust the billing according to the remaining period.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[var(--gradient-luxury)] border-primary/20">
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-2">
                  What is the warranty period?
                </h4>
                <p className="text-sm text-muted-foreground">
                  We offer a 30-day warranty on all our services. If you're not satisfied, we'll refund the full amount.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[var(--gradient-luxury)] border-primary/20">
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-2">
                  Do the prices include hosting?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Yes, all plans include free hosting for one year with full technical support.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[var(--gradient-luxury)] border-primary/20">
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-2">
                  How can I pay?
                </h4>
                <p className="text-sm text-muted-foreground">
                  We accept bank transfers, credit cards, and electronic payments. You can pay in cash or installments.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Custom Plan CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-br from-primary/10 to-primary-glow/10 border-primary/30 shadow-[var(--shadow-gold-glow)] max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-primary">
                {t('pricing.customPlan')}
              </h3>
              <p className="text-muted-foreground mb-6">
                Contact us for a custom quote for your project
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us Now
                </Button>
                <Button variant="outline" size="lg">
                  <Mail className="w-5 h-5 mr-2" />
                  Request Quote
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;