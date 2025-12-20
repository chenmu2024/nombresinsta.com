import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Sun, Moon, Menu, X } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, onToggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Generador', path: '/#generator' },
    { label: 'Blog', path: '/blog' },
    { label: 'Consejos', path: '/#tips' },
    { label: 'FAQ', path: '/#faq' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-white/50 dark:border-slate-800 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link 
            to="/"
            className="group flex items-center space-x-2.5 transition transform active:scale-95"
            aria-label="Ir al inicio"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 blur opacity-70 group-hover:opacity-100 transition duration-500 rounded-xl"></div>
              <div className="relative bg-white dark:bg-slate-800 text-transparent bg-clip-text bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 p-1.5 rounded-xl border border-white/50 dark:border-slate-700">
                <Instagram size={24} className="md:w-[26px] md:h-[26px] text-pink-600 dark:text-pink-500" />
              </div>
            </div>
            <span className="text-xl md:text-2xl font-bold tracking-tight text-slate-800 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
              NombresInsta
            </span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2">
            <nav className="flex space-x-1 items-center mr-4">
                {navItems.map((item) => (
                    <Link 
                      key={item.label}
                      to={item.path}
                      className="px-4 py-2 text-slate-600 dark:text-slate-300 text-sm font-semibold rounded-full hover:bg-pink-50 dark:hover:bg-slate-800 hover:text-pink-600 dark:hover:text-pink-400 transition duration-300"
                    >
                      {item.label}
                    </Link>
                ))}
            </nav>

            <button
                onClick={onToggleTheme}
                className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle Dark Mode"
            >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center space-x-3 md:hidden">
            <button
                onClick={onToggleTheme}
                className="p-2 rounded-full text-slate-500 dark:text-slate-400 active:bg-slate-100 dark:active:bg-slate-800 transition-colors"
            >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-800 dark:text-white"
                aria-label="Abrir menú"
            >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-xl py-4 px-4 flex flex-col space-y-2 animate-fade-in-up">
            {navItems.map((item) => (
                <Link 
                    key={item.label}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-pink-600 dark:hover:text-pink-400 transition"
                >
                    {item.label}
                </Link>
            ))}
            <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800">
                <Link 
                    to="/#generator"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center bg-pink-600 text-white font-bold py-3 rounded-xl hover:bg-pink-700 transition"
                >
                    Generar Nombres Ahora
                </Link>
            </div>
        </div>
      )}
    </header>
  );
};

export default Header;