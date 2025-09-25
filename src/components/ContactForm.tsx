import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import useAnalytics from "@/hooks/use-analytics";

// Define form schema with Zod
const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(20, { message: "Message must be at least 20 characters" }),
});

// Define form data type
type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });
  
  // Get analytics hook
  const analytics = useAnalytics();
  
  // Form submission handler
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Log form data (in production, send to API)
      console.log("Form submitted:", data);
      
      // Track successful form submission
      analytics.trackFormSubmission('contact-form', 'Contact Form', true);
      
      // Show success toast
      toast({
        title: t('common.messageSent') || "Message sent successfully!",
        description: t('common.weWillContactYou') || "We will contact you as soon as possible.",
        variant: "default",
      });
      
      // Reset form
      reset();
    } catch (error) {
      // Track form submission error
      analytics.trackFormSubmission('contact-form', 'Contact Form', false);
      analytics.trackError('form_submission', error instanceof Error ? error.message : 'Unknown error');
      
      // Show error toast
      toast({
        title: t('common.error') || "An error occurred",
        description: t('common.errorMessage') || "Something went wrong. Please try again later.",
        variant: "destructive",
      });
      
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Full Name */}
        <div className="space-y-2">
          <Input
            id="fullName"
            placeholder={t('contact.fullName') || "Full Name"}
            {...register("fullName")}
            className={errors.fullName ? "border-red-500" : ""}
          />
          {errors.fullName && (
            <p className="text-sm text-red-500">{t('common.nameRequired') || errors.fullName.message}</p>
          )}
        </div>
        
        {/* Email */}
        <div className="space-y-2">
          <Input
            id="email"
            type="email"
            placeholder={t('contact.email') || "Email"}
            {...register("email")}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{t('common.emailInvalid') || errors.email.message}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Phone */}
        <div className="space-y-2">
          <Input
            id="phone"
            placeholder={t('contact.phoneNumber') || "Phone Number"}
            {...register("phone")}
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{t('common.phoneRequired') || errors.phone.message}</p>
          )}
        </div>
        
        {/* Subject */}
        <div className="space-y-2">
          <Input
            id="subject"
            placeholder={t('contact.messageSubject') || "Message Subject"}
            {...register("subject")}
            className={errors.subject ? "border-red-500" : ""}
          />
          {errors.subject && (
            <p className="text-sm text-red-500">{t('common.subjectRequired') || errors.subject.message}</p>
          )}
        </div>
      </div>
      
      {/* Message */}
      <div className="space-y-2">
        <Textarea
          id="message"
          placeholder={t('contact.projectDetails') || "Project Details"}
          rows={6}
          {...register("message")}
          className={errors.message ? "border-red-500" : ""}
        />
        {errors.message && (
          <p className="text-sm text-red-500">{t('common.messageRequired') || errors.message.message}</p>
        )}
      </div>
      
      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-white hover:bg-primary/90 md:w-auto"
      >
        {isSubmitting ? (
          <>
            <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {t('contact.sending') || "Sending..."}
          </>
        ) : (
          t('contact.send') || "Send Message"
        )}
      </Button>
    </form>
  );
};

export default ContactForm;