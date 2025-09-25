import { useEffect } from 'react';
import analytics from '@/lib/analytics';

// Hook for using analytics
export const useAnalytics = () => {
  // Initialize analytics on component mount
  useEffect(() => {
    analytics.init();
  }, []);
  
  return {
    // Track page view
    trackPageView: (path?: string, title?: string) => {
      analytics.trackPageView(path, title);
    },
    
    // Track event
    trackEvent: (category: 'page_view' | 'interaction' | 'form' | 'navigation' | 'media' | 'error', 
                action: string, 
                label?: string, 
                value?: number) => {
      analytics.trackEvent({
        category,
        action,
        label,
        value
      });
    },
    
    // Track form submission
    trackFormSubmission: (formId: string, formName: string, success = true) => {
      analytics.trackFormSubmission(formId, formName, success);
    },
    
    // Track button click
    trackButtonClick: (buttonId: string, buttonText: string) => {
      analytics.trackButtonClick(buttonId, buttonText);
    },
    
    // Track error
    trackError: (errorType: string, errorMessage: string) => {
      analytics.trackError(errorType, errorMessage);
    }
  };
};

export default useAnalytics;