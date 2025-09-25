// Analytics service for tracking user interactions

// Types
type EventCategory = 'page_view' | 'interaction' | 'form' | 'navigation' | 'media' | 'error';

interface AnalyticsEvent {
  category: EventCategory;
  action: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
  timestamp?: number;
}

interface PageViewEvent {
  path: string;
  title: string;
  referrer?: string;
}

// Analytics service
class AnalyticsService {
  private isInitialized = false;
  private userId: string | null = null;
  private sessionId: string;
  private debug: boolean;
  
  constructor(debug = false) {
    this.debug = debug;
    this.sessionId = this.generateSessionId();
    
    // Try to get stored user ID
    try {
      this.userId = localStorage.getItem('analytics_user_id');
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }
  
  // Initialize analytics
  public init(): void {
    if (this.isInitialized) return;
    
    // Generate user ID if not exists
    if (!this.userId) {
      this.userId = this.generateUserId();
      try {
        localStorage.setItem('analytics_user_id', this.userId);
      } catch (error) {
        console.error('Error writing to localStorage:', error);
      }
    }
    
    // Add page view listener
    this.trackPageView();
    
    // Listen for route changes if using a SPA
    window.addEventListener('popstate', () => this.trackPageView());
    
    this.isInitialized = true;
    
    if (this.debug) {
      console.log('Analytics initialized:', {
        userId: this.userId,
        sessionId: this.sessionId
      });
    }
  }
  
  // Track page view
  public trackPageView(customPath?: string, customTitle?: string): void {
    const path = customPath || window.location.pathname + window.location.search;
    const title = customTitle || document.title;
    
    const pageViewEvent: PageViewEvent = {
      path,
      title,
      referrer: document.referrer
    };
    
    this.sendEvent({
      category: 'page_view',
      action: 'view',
      label: title,
      nonInteraction: true
    });
    
    if (this.debug) {
      console.log('Page view tracked:', pageViewEvent);
    }
  }
  
  // Track event
  public trackEvent(event: Omit<AnalyticsEvent, 'timestamp'>): void {
    this.sendEvent({
      ...event,
      timestamp: Date.now()
    });
  }
  
  // Track form submission
  public trackFormSubmission(formId: string, formName: string, success = true): void {
    this.trackEvent({
      category: 'form',
      action: success ? 'submit_success' : 'submit_error',
      label: `${formName} (${formId})`
    });
  }
  
  // Track button click
  public trackButtonClick(buttonId: string, buttonText: string): void {
    this.trackEvent({
      category: 'interaction',
      action: 'click',
      label: `${buttonText} (${buttonId})`
    });
  }
  
  // Track error
  public trackError(errorType: string, errorMessage: string): void {
    this.trackEvent({
      category: 'error',
      action: errorType,
      label: errorMessage
    });
  }
  
  // Send event to analytics endpoint
  private sendEvent(event: AnalyticsEvent): void {
    // In a real implementation, this would send data to your analytics service
    // For now, we'll just log it if debug is enabled
    
    const eventWithMetadata = {
      ...event,
      userId: this.userId,
      sessionId: this.sessionId,
      userAgent: navigator.userAgent,
      language: navigator.language,
      screenSize: `${window.innerWidth}x${window.innerHeight}`,
      timestamp: event.timestamp || Date.now()
    };
    
    // In production, send to your analytics endpoint
    // fetch('https://your-analytics-api.com/events', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(eventWithMetadata),
    // });
    
    if (this.debug) {
      console.log('Analytics event:', eventWithMetadata);
    }
  }
  
  // Generate random user ID
  private generateUserId(): string {
    return 'user_' + Math.random().toString(36).substring(2, 15);
  }
  
  // Generate session ID
  private generateSessionId(): string {
    return 'session_' + Math.random().toString(36).substring(2, 15) + '_' + Date.now();
  }
}

// Create and export analytics instance
const analytics = new AnalyticsService(process.env.NODE_ENV === 'development');

// Export analytics service
export default analytics;