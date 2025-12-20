import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Generator from './components/Generator';
import { NameCategory } from './types';

// Lazy load non-critical components
const InfoSection = React.lazy(() => import('./components/InfoSection'));
const Footer = React.lazy(() => import('./components/Footer'));
const LegalView = React.lazy(() => import('./components/LegalView'));
const BlogList = React.lazy(() => import('./components/BlogList'));
const BlogPost = React.lazy(() => import('./components/BlogPost'));
const NotFound = React.lazy(() => import('./components/NotFound'));

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

  const isHome = location.pathname === '/' || location.pathname.startsWith('/nombres-');

  return (
    <div className="flex flex-col min-h-screen font-sans transition-colors duration-300 bg-[#FDF9FB] dark:bg-slate-900">
      <ScrollToAnchor />
      <Header darkMode={darkMode} onToggleTheme={toggleDarkMode} />
      
      <main className="flex-grow relative flex flex-col w-full">
        {isHome && (
           <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 contain-strict">
              {/* Optimization: Use CSS Gradients on Mobile (Zero GPU cost) vs DOM Blobs on Desktop */}
              
              {/* Desktop Only: Animated Blobs */}
              <div className="hidden md:block absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200/40 dark:bg-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-[80px] animate-blob"></div>
              <div className="hidden md:block absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-pink-200/40 dark:bg-pink-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-[80px] animate-blob animation-delay-2000"></div>
              <div className="hidden md:block absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-blue-100/40 dark:bg-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-[80px] animate-blob animation-delay-4000"></div>
              
              {/* Mobile Only: Static CSS Gradient (Performance Fix) */}
              <div className="md:hidden absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-pink-100/30 via-transparent to-transparent dark:from-pink-900/20"></div>
              <div className="md:hidden absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-100/30 via-transparent to-transparent dark:from-blue-900/20"></div>

              {/* Use local base64 noise pattern instead of external URL */}
              <div className="absolute inset-0 bg-noise-pattern opacity-[0.03]"></div>
            </div>
        )}
        
        <div className="w-full flex-grow flex flex-col">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Default Home */}
              <Route path="/" element={
                <>
                  <Generator />
                  <InfoSection />
                </>
              } />

              {/* SEO Landing Pages (Real Routes) */}
              <Route path="/nombres-para-mujer" element={
                <>
                  <Generator 
                    initialCategory={NameCategory.AESTHETIC}
                    seoTitle="Nombres para Instagram Mujer | Generador Aesthetic 2025"
                    seoDescription="Crea nombres de usuario aesthetic para mujer en Instagram. Ideas originales, lindas y únicas con nuestro generador gratuito."
                  />
                  <InfoSection />
                </>
              } />

              <Route path="/nombres-para-hombre" element={
                <>
                  <Generator 
                    initialCategory={NameCategory.MINIMAL}
                    seoTitle="Nombres para Instagram Hombre | Generador de Usuarios 2025"
                    seoDescription="Generador de nombres para Instagram para hombre. Crea usuarios minimalistas, serios y urbanos para tu perfil personal o marca."
                  />
                  <InfoSection />
                </>
              } />

              <Route path="/nombres-para-empresas" element={
                <>
                  <Generator 
                    initialCategory={NameCategory.BUSINESS}
                    seoTitle="Generador de Nombres para Empresas y Marcas (Instagram/TikTok)"
                    seoDescription="Encuentra el nombre perfecto para tu negocio en Instagram. Nuestro generador optimiza tu usuario para ventas y SEO local."
                  />
                  <InfoSection />
                </>
              } />

              <Route path="/nombres-gamer" element={
                <>
                  <Generator 
                    initialCategory={NameCategory.FUNNY}
                    seoTitle="Generador de Nombres Gamer | Nicks para Juegos y Streamers"
                    seoDescription="Crea nicks gamer épicos para Twitch, Instagram y YouTube. Ideas divertidas y tryhard para destacar en el gaming."
                  />
                  <InfoSection />
                </>
              } />

              <Route path="/nombres-aesthetic" element={
                <>
                  <Generator 
                    initialCategory={NameCategory.AESTHETIC}
                    seoTitle="Generador de Nombres Aesthetic | Ideas Soft & Indie 2025"
                    seoDescription="El mejor generador de nombres aesthetic. Combina palabras soft, indie y vibes para crear el usuario perfecto."
                  />
                  <InfoSection />
                </>
              } />
              
              <Route path="/blog" element={<BlogList />} />
              
              <Route path="/blog/:postId" element={<BlogPost />} />

              <Route path="/about" element={<LegalView page="about" />} />
              
              <Route path="/contact" element={<LegalView page="contact" />} />
              
              <Route path="/privacy" element={<LegalView page="privacy" />} />
              
              <Route path="/terms" element={<LegalView page="terms" />} />
              
              {/* 404 Page (Instead of redirect) */}
              <Route path="*" element={<NotFound />} />
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