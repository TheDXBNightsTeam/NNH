import { Suspense, lazy } from "react";

// Lazy load components
const Hero = lazy(() => import("@/components/Hero"));
const Services = lazy(() => import("@/components/Services"));
const Portfolio = lazy(() => import("@/components/Portfolio"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const Pricing = lazy(() => import("@/components/Pricing"));
const Blog = lazy(() => import("@/components/Blog"));
const About = lazy(() => import("@/components/About"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

// Component loading fallback
const SectionLoading = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<SectionLoading />}>
        <Hero />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <Services />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <Portfolio />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <Testimonials />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <Pricing />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <Blog />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <About />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <Contact />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;