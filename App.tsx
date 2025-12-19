import React, { useState, Suspense } from 'react';
import Header from './components/Header';
import Generator from './components/Generator';

// Lazy load non-critical components to improve initial load time (LCP/FCP)
const InfoSection = React.lazy(() => import('./components/InfoSection'));
const Footer = React.lazy(() => import('./components/Footer'));
const LegalView = React.lazy(() => import('./components/LegalView'));
const BlogList = React.lazy(() => import('./components/BlogList'));
const BlogPost = React.lazy(() => import('./components/BlogPost'));

export type ViewState = 'home' | 'about' | 'contact' | 'privacy' | 'terms' | 'blog' | 'blog-post';

// Simple fallback loader for CLS prevention
const LoadingFallback = () => <div className="lazy-placeholder w-full h-96 bg-transparent"></div>;

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const handleNavigate = (view: ViewState, param?: string) => {
    if (view === 'blog-post' && param) {
      setSelectedPostId(param);
      setCurrentView('blog-post');
      window.scrollTo(0, 0);
      return;
    }

    setCurrentView(view);
    
    if (view === 'home' && param && param.startsWith('#')) {
      setTimeout(() => {
        const element = document.querySelector(param);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            <Generator />
            <Suspense fallback={<LoadingFallback />}>
              <InfoSection />
            </Suspense>
          </>
        );
      case 'blog':
        return (
          <Suspense fallback={<LoadingFallback />}>
             <BlogList onReadPost={(id) => handleNavigate('blog-post', id)} />
          </Suspense>
        );
      case 'blog-post':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <BlogPost 
              postId={selectedPostId || ''} 
              onBack={() => handleNavigate('blog')} 
              onGoToGenerator={() => handleNavigate('home', '#generator')}
            />
          </Suspense>
        );
      case 'about':
      case 'contact':
      case 'privacy':
      case 'terms':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <LegalView page={currentView} onBack={() => handleNavigate('home')} />
          </Suspense>
        );
      default:
        return <Generator />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header onNavigate={handleNavigate} />
      
      <main className="flex-grow relative">
        {currentView === 'home' && (
           <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 contain-strict">
              {/* Background optimized with will-change in CSS */}
              <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-[80px] animate-blob"></div>
              <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-pink-200/40 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-2000"></div>
              <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-blue-100/40 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-4000"></div>
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
            </div>
        )}
        
        {renderContent()}
      </main>
      
      <Suspense fallback={<div className="h-20 bg-slate-900"></div>}>
        <Footer onNavigate={handleNavigate} />
      </Suspense>
    </div>
  );
};

export default App;