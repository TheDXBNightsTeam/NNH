import React, { Component, ErrorInfo, ReactNode } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

// Error boundary class component
class ErrorBoundaryClass extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback || <DefaultErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

// Default error fallback component
const DefaultErrorFallback = ({ error }: { error: Error | null }) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-4 text-center">
      <div className="mb-4 rounded-full bg-red-100 p-3 text-red-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h2 className="mb-2 text-xl font-bold">{t('common.error') || 'An error occurred'}</h2>
      <p className="mb-4 text-muted-foreground">
        {t('common.errorMessage') || 'Something went wrong. Please try again later.'}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="rounded bg-primary px-4 py-2 text-white hover:bg-primary/90"
      >
        {t('common.refresh') || 'Refresh Page'}
      </button>
      {error && process.env.NODE_ENV === 'development' && (
        <div className="mt-4 max-w-md overflow-auto rounded border border-red-200 bg-red-50 p-4 text-left text-sm text-red-800">
          <p className="font-mono font-bold">{error.name}: {error.message}</p>
          <pre className="mt-2 text-xs">{error.stack}</pre>
        </div>
      )}
    </div>
  );
};

// Wrapper component to use the language context
export const ErrorBoundary: React.FC<Props> = ({ children, fallback }) => {
  return <ErrorBoundaryClass fallback={fallback}>{children}</ErrorBoundaryClass>;
};

export default ErrorBoundary;