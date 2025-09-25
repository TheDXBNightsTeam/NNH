import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AppProvider } from "@/contexts/AppContext";
import routes from "@/routes";

// Create a React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Router component
const Router = () => {
  return useRoutes(routes);
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </LanguageProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;