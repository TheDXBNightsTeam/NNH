import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { Accessibility, ZoomIn, Type, Contrast, MousePointer2 } from "lucide-react";

const AccessibilityMenu = () => {
  const { t } = useLanguage();
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);
  const [largePointer, setLargePointer] = useState(false);
  
  // Apply font size
  const applyFontSize = (size: number) => {
    document.documentElement.style.fontSize = `${size}%`;
    setFontSize(size);
  };
  
  // Apply high contrast
  const applyHighContrast = (enabled: boolean) => {
    if (enabled) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    setHighContrast(enabled);
  };
  
  // Apply reduced motion
  const applyReducedMotion = (enabled: boolean) => {
    if (enabled) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
    setReducedMotion(enabled);
  };
  
  // Apply focus visible
  const applyFocusVisible = (enabled: boolean) => {
    if (enabled) {
      document.documentElement.classList.add('focus-visible');
    } else {
      document.documentElement.classList.remove('focus-visible');
    }
    setFocusVisible(enabled);
  };
  
  // Apply large pointer
  const applyLargePointer = (enabled: boolean) => {
    if (enabled) {
      document.documentElement.classList.add('large-pointer');
    } else {
      document.documentElement.classList.remove('large-pointer');
    }
    setLargePointer(enabled);
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
          aria-label="Accessibility Options"
        >
          <Accessibility className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('accessibility.title') || "Accessibility Options"}</DialogTitle>
          <DialogDescription>
            {t('accessibility.description') || "Customize the website to meet your accessibility needs."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* Font Size */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Type className="h-4 w-4" />
                <Label htmlFor="font-size">{t('accessibility.fontSize') || "Font Size"}</Label>
              </div>
              <span className="text-sm text-muted-foreground">{fontSize}%</span>
            </div>
            <Slider
              id="font-size"
              min={75}
              max={200}
              step={5}
              value={[fontSize]}
              onValueChange={(value) => applyFontSize(value[0])}
              aria-label="Font Size"
            />
          </div>
          
          {/* High Contrast */}
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <Contrast className="h-4 w-4" />
              <Label htmlFor="high-contrast">{t('accessibility.highContrast') || "High Contrast"}</Label>
            </div>
            <Switch
              id="high-contrast"
              checked={highContrast}
              onCheckedChange={applyHighContrast}
              aria-label="High Contrast Mode"
            />
          </div>
          
          {/* Reduced Motion */}
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <ZoomIn className="h-4 w-4" />
              <Label htmlFor="reduced-motion">{t('accessibility.reducedMotion') || "Reduced Motion"}</Label>
            </div>
            <Switch
              id="reduced-motion"
              checked={reducedMotion}
              onCheckedChange={applyReducedMotion}
              aria-label="Reduced Motion"
            />
          </div>
          
          {/* Focus Visible */}
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <ZoomIn className="h-4 w-4" />
              <Label htmlFor="focus-visible">{t('accessibility.focusVisible') || "Focus Visible"}</Label>
            </div>
            <Switch
              id="focus-visible"
              checked={focusVisible}
              onCheckedChange={applyFocusVisible}
              aria-label="Focus Visible"
            />
          </div>
          
          {/* Large Pointer */}
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <MousePointer2 className="h-4 w-4" />
              <Label htmlFor="large-pointer">{t('accessibility.largePointer') || "Large Pointer"}</Label>
            </div>
            <Switch
              id="large-pointer"
              checked={largePointer}
              onCheckedChange={applyLargePointer}
              aria-label="Large Pointer"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccessibilityMenu;