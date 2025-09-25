import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, MessageSquare } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ContactForm from "@/components/ContactForm";

const Contact = () => {
  const { t } = useLanguage();
  
  return (
    <section id="contact" className="bg-muted/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold md:text-4xl lg:text-5xl">
            {t('contact.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            {t('contact.subtitle')}
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {/* Contact Information */}
          <div className="space-y-6 md:col-span-1">
            {/* Phone */}
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="mb-1 text-lg">{t('contact.phone')}</CardTitle>
                  <p className="text-muted-foreground">+971-543665548</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Email */}
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="mb-1 text-lg">{t('contact.email')}</CardTitle>
                  <p className="text-muted-foreground">info@nnh-socialmedia.com</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Location */}
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="mb-1 text-lg">{t('contact.location')}</CardTitle>
                  <p className="text-muted-foreground">Dubai, United Arab Emirates</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Free Consultation */}
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="mb-1 text-lg">{t('contact.freeConsultation')}</CardTitle>
                  <p className="text-muted-foreground">{t('contact.sendMessage')}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Form */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{t('contact.sendMessage')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;