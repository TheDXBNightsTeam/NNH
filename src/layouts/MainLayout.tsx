import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import AccessibilityMenu from "@/components/AccessibilityMenu";

const MainLayout = () => {
  const { language } = useLanguage();
  
  // Update document direction based on language
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <main className="min-h-screen bg-background">
        <Outlet />
      </main>
      <AccessibilityMenu />
    </TooltipProvider>
  );
};

export default MainLayout;