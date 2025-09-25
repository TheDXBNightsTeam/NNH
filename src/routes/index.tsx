import { Suspense, lazy } from "react";
import { RouteObject } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";

// Layouts
const MainLayout = lazy(() => import("@/layouts/MainLayout"));

// Pages
const HomePage = lazy(() => import("@/pages/Index"));
const NotFoundPage = lazy(() => import("@/pages/NotFound"));

// Loading component
export const PageLoading = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

// Define routes
export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <Suspense fallback={<PageLoading />}>
          <MainLayout />
        </Suspense>
      </ErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: (
          <ErrorBoundary>
            <Suspense fallback={<PageLoading />}>
              <HomePage />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      // Add more routes here as needed
    ],
  },
  {
    path: "*",
    element: (
      <ErrorBoundary>
        <Suspense fallback={<PageLoading />}>
          <NotFoundPage />
        </Suspense>
      </ErrorBoundary>
    ),
  },
];

export default routes;