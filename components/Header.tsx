import React from 'react';
import { Instagram, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, onToggleTheme }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Function to determine if we should scroll or navigate
  const getLinkTarget = (hash?: string) => {
    return isHome && hash ? hash : `/${hash ? hash : ''}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-white/50 dark:border-slate-800 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 md:h-20">
          <Link 
            to="/"
            className="group flex items-center space-x-2.5 transition transform active:scale-95"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 blur opacity-70 group-hover:opacity-100 transition duration-500 rounded-xl"></div>
              <div className="relative bg-white dark:bg-slate-800 text-transparent bg-clip-text bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 p-1.5 rounded-xl border border-white/50 dark:border-slate-700">
                <Instagram size={26} className="text-pink-600 dark:text-pink-500" />
              </div>
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
              NombresInsta
            </span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <nav className="hidden md:flex space-x-1 items-center mr-4">
                <Link 
                    to="/#generator"
                    className="px-4 py-2 text-slate-600 dark:text-slate-300 text-sm font-semibold rounded-full hover:bg-pink-50 dark:hover:bg-slate-800 hover:text-pink-600 dark:hover:text-pink-400 transition duration-300"
                >
                    Generador
                </Link>
                <Link 
                    to="/blog"
                    className="px-4 py-2 text-slate-600 dark:text-slate-300 text-sm font-semibold rounded-full hover:bg-pink-50 dark:hover:bg-slate-800 hover:text-pink-600 dark:hover:text-pink-400 transition duration-300"
                >
                    Blog
                </Link>
                <Link 
                    to="/#tips"
                    className="px-4 py-2 text-slate-600 dark:text-slate-300 text-sm font-semibold rounded-full hover:bg-pink-50 dark:hover:bg-slate-800 hover:text-pink-600 dark:hover:text-pink-400 transition duration-300"
                >
                    Consejos
                </Link>
                <Link 
                    to="/#faq"
                    className="px-4 py-2 text-slate-600 dark:text-slate-300 text-sm font-semibold rounded-full hover:bg-pink-50 dark:hover:bg-slate-800 hover:text-pink-600 dark:hover:text-pink-400 transition duration-300"
                >
                    FAQ
                </Link>
            </nav>

            {/* Dark Mode Toggle */}
            <button
                onClick={onToggleTheme}
                className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle Dark Mode"
            >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {/* Mobile Action */}
            <Link 
                to="/#generator"
                className="md:hidden bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-full text-xs font-bold"
            >
                Generar
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;