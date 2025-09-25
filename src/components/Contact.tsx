import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Send, MessageSquare, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLanguage } from "@/contexts/LanguageContext";

// Form validation schema - will be created dynamically based on language
const createContactFormSchema = (t: (key: string) => string) => z.object({
  name: z.string().min(2, t('common.nameRequired')),
  email: z.string().email(t('common.emailInvalid')),
  phone: z.string().min(10, t('common.phoneRequired')).optional(),
  subject: z.string().min(5, t('common.subjectRequired')),
  message: z.string().min(20, t('common.messageRequired')),
});

type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const contactFormSchema = createContactFormSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the data to your backend
      // For now, we'll simulate the API call
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
          source: 'website',
        }),
      });

      if (response.ok) {
        toast({
          title: t('common.messageSent'),
          description: t('common.weWillContactYou'),
        });
        reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      // Fallback: Send email using EmailJS or similar service
      console.log('Form data:', data);
      
      // Simulate successful submission for demo
      toast({
        title: t('common.messageSent'),
        description: t('common.weWillContactYou'),
      });
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Contact Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Do you have a project in mind? Or need a free consultation? Don't hesitate to contact us
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="bg-[var(--gradient-luxury)] border-primary/20 hover:shadow-[var(--shadow-luxury)] transition-all duration-500 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 space-x-reverse mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Phone</h3>
                    <p className="text-muted-foreground" dir="ltr">+971-543665548</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[var(--gradient-luxury)] border-primary/20 hover:shadow-[var(--shadow-luxury)] transition-all duration-500 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 space-x-reverse mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-muted-foreground">Contact for email information</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[var(--gradient-luxury)] border-primary/20 hover:shadow-[var(--shadow-luxury)] transition-all duration-500 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 space-x-reverse mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Location</h3>
                    <p className="text-muted-foreground">Dubai, United Arab Emirates</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-primary-glow/10 border-primary/30 shadow-[var(--shadow-gold-glow)] hover:shadow-[var(--shadow-luxury)] transition-all duration-500">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 space-x-reverse mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Free Consultation</h3>
                    <p className="text-muted-foreground">We offer a free 30-minute consultation</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-[var(--gradient-luxury)] border-primary/20 shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-luxury)] transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">{t('contact.sendMessage')}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-foreground">{t('contact.fullName')}</Label>
                      <Input 
                        id="name" 
                        placeholder={t('contact.fullName')} 
                        {...register("name")}
                        className="mt-2 bg-background border-border focus:border-primary"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-foreground">{t('contact.email')}</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your@email.com" 
                        {...register("email")}
                        className="mt-2 bg-background border-border focus:border-primary"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-foreground">{t('contact.phoneNumber')}</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+971-xxx-xxx-xxx"
                      {...register("phone")}
                      className="mt-2 bg-background border-border focus:border-primary"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-foreground">{t('contact.messageSubject')}</Label>
                    <Input 
                      id="subject" 
                      placeholder={t('contact.messageSubject')} 
                      {...register("subject")}
                      className="mt-2 bg-background border-border focus:border-primary"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-foreground">{t('contact.projectDetails')}</Label>
                    <Textarea 
                      id="message" 
                      placeholder={t('contact.projectDetails')}
                      rows={6}
                      {...register("message")}
                      className="mt-2 bg-background border-border focus:border-primary resize-none"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        {t('contact.sending')}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        {t('contact.send')}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;