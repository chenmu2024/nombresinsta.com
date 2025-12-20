import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Generator from './components/Generator';

// Lazy load non-critical components
const InfoSection = React.lazy(() => import('./components/InfoSection'));
const Footer = React.lazy(() => import('./components/Footer'));
const LegalView = React.lazy(() => import('./components/LegalView'));
const BlogList = React.lazy(() => import('./components/BlogList'));
const BlogPost = React.lazy(() => import('./components/BlogPost'));

// Fallback with visual feedback
const LoadingFallback = () => (
  <div className="w-full h-96 bg-slate-50 dark:bg-slate-800/50 animate-pulse rounded-3xl mx-auto max-w-7xl mt-8 opacity-50 flex items-center justify-center">
    <span className="text-slate-400">Cargando...</span>
  </div>
);

// Component to handle hash scrolling on route change
const ScrollToAnchor = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
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

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  // Initialize Dark Mode state
  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    setDarkMode(isDark);
    localStorage.theme = isDark ? 'dark' : 'light';
  };

  const isHome = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen font-sans transition-colors duration-300 bg-[#FDF9FB] dark:bg-slate-900">
      <ScrollToAnchor />
      <Header darkMode={darkMode} onToggleTheme={toggleDarkMode} />
      
      <main className="flex-grow relative flex flex-col w-full">
        {isHome && (
           <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 contain-strict">
              {/* Optimization: Disable animations on mobile (only md:animate-blob) to reduce Main Thread TBT */}
              <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200/40 dark:bg-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-[80px] md:animate-blob opacity-50 md:opacity-100"></div>
              <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-pink-200/40 dark:bg-pink-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-[80px] md:animate-blob animation-delay-2000 opacity-50 md:opacity-100"></div>
              <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-blue-100/40 dark:bg-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-[80px] md:animate-blob animation-delay-4000 opacity-50 md:opacity-100"></div>
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
            </div>
        )}
        
        <div className="w-full flex-grow flex flex-col">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={
                <>
                  <Generator />
                  <InfoSection />
                </>
              } />
              
              <Route path="/blog" element={<BlogList />} />
              
              <Route path="/blog/:postId" element={<BlogPost />} />

              <Route path="/about" element={<LegalView page="about" />} />
              
              <Route path="/contact" element={<LegalView page="contact" />} />
              
              <Route path="/privacy" element={<LegalView page="privacy" />} />
              
              <Route path="/terms" element={<LegalView page="terms" />} />
              
              {/* Catch-all redirect to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
      </main>
      
      <Suspense fallback={<div className="h-20 bg-slate-900"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;