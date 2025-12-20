import React, { Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Generator from './components/Generator';

// Lazy load non-critical components to improve initial load time (LCP/FCP)
const InfoSection = React.lazy(() => import('./components/InfoSection'));
const Footer = React.lazy(() => import('./components/Footer'));
const LegalView = React.lazy(() => import('./components/LegalView'));
const BlogList = React.lazy(() => import('./components/BlogList'));
const BlogPost = React.lazy(() => import('./components/BlogPost'));

// Simple fallback loader for CLS prevention
const LoadingFallback = () => <div className="lazy-placeholder w-full h-96 bg-transparent"></div>;

// Component to handle scroll restoration and hash scrolling
const ScrollHandler = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

// Wrapper for Home Page
const Home = () => (
  <>
    <Generator />
    <Suspense fallback={<LoadingFallback />}>
      <InfoSection />
    </Suspense>
  </>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <ScrollHandler />
      <Header />
      
      <main className="flex-grow relative">
        {/* Persistent Background for all pages to maintain vibe */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 contain-strict">
          {/* Background optimized with will-change in CSS */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-[80px] animate-blob"></div>
          <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-pink-200/40 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-blue-100/40 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-4000"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
        </div>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={
            <Suspense fallback={<LoadingFallback />}>
              <BlogList />
            </Suspense>
          } />
          <Route path="/blog/:id" element={
            <Suspense fallback={<LoadingFallback />}>
              <BlogPost />
            </Suspense>
          } />
          <Route path="/about" element={
            <Suspense fallback={<LoadingFallback />}>
              <LegalView page="about" />
            </Suspense>
          } />
          <Route path="/contact" element={
            <Suspense fallback={<LoadingFallback />}>
              <LegalView page="contact" />
            </Suspense>
          } />
          <Route path="/privacy" element={
            <Suspense fallback={<LoadingFallback />}>
              <LegalView page="privacy" />
            </Suspense>
          } />
          <Route path="/terms" element={
            <Suspense fallback={<LoadingFallback />}>
              <LegalView page="terms" />
            </Suspense>
          } />
          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      
      <Suspense fallback={<div className="h-20 bg-slate-900"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;