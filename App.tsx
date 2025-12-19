import React, { useState } from 'react';
import Header from './components/Header';
import Generator from './components/Generator';
import InfoSection from './components/InfoSection';
import Footer from './components/Footer';
import LegalView from './components/LegalView';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';

export type ViewState = 'home' | 'about' | 'contact' | 'privacy' | 'terms' | 'blog' | 'blog-post';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const handleNavigate = (view: ViewState, param?: string) => {
    // If navigating to a specific blog post
    if (view === 'blog-post' && param) {
      setSelectedPostId(param);
      setCurrentView('blog-post');
      window.scrollTo(0, 0);
      return;
    }

    setCurrentView(view);
    
    // Handle hash navigation if strictly staying on home or moving to it
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
            <InfoSection />
          </>
        );
      case 'blog':
        return <BlogList onReadPost={(id) => handleNavigate('blog-post', id)} />;
      case 'blog-post':
        return (
          <BlogPost 
            postId={selectedPostId || ''} 
            onBack={() => handleNavigate('blog')} 
            onGoToGenerator={() => handleNavigate('home', '#generator')}
          />
        );
      case 'about':
      case 'contact':
      case 'privacy':
      case 'terms':
        return <LegalView page={currentView} onBack={() => handleNavigate('home')} />;
      default:
        return <Generator />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header onNavigate={handleNavigate} />
      
      <main className="flex-grow relative">
        {currentView === 'home' && (
           <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
              {/* More subtle, larger gradient blobs for a premium feel */}
              <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-[80px] animate-blob"></div>
              <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-pink-200/40 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-2000"></div>
              <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-blue-100/40 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-4000"></div>
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
            </div>
        )}
        
        {renderContent()}
      </main>
      
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;