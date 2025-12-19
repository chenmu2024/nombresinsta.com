import React, { useState } from 'react';
import Header from './components/Header';
import Generator from './components/Generator';
import InfoSection from './components/InfoSection';
import Footer from './components/Footer';
import LegalView from './components/LegalView';

export type ViewState = 'home' | 'about' | 'contact' | 'privacy' | 'terms';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const handleNavigate = (view: ViewState, hash?: string) => {
    setCurrentView(view);
    
    // Handle hash navigation if strictly staying on home or moving to it
    if (view === 'home' && hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header onNavigate={handleNavigate} />
      
      <main className="flex-grow">
        {currentView === 'home' ? (
          <>
            {/* Background blobs for visual flair - only on home */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>
            
            <Generator />
            <InfoSection />
          </>
        ) : (
          <LegalView page={currentView} onBack={() => handleNavigate('home')} />
        )}
      </main>
      
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;